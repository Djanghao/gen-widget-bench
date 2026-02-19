import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

export type WidgetOrigin = 'local' | 'example'

export interface WidgetStorePaths {
  examplesDirPath: string
  exampleFilePath: string
  exampleDataFilePath: string
  localFilePath: string
  localDataFilePath: string
  snapshotsDirPath: string
}

export interface WidgetSourceResult {
  origin: WidgetOrigin
  source: string
}

export interface NamedWidgetSaveResult {
  dataFilePath: string
  snapshotDirName: string
  snapshotDirPath: string
  widgetFilePath: string
}

export interface WidgetExampleListItem {
  id: string
  name: string
}

export interface WidgetExampleSource {
  dataSource: string
  id: string
  name: string
  source: string
  widgetFileName: string
  widgetFiles: string[]
}

export function resolveWidgetStorePaths(rootDir: string): WidgetStorePaths {
  return {
    examplesDirPath: path.resolve(rootDir, 'examples'),
    exampleDataFilePath: path.resolve(rootDir, 'data.example.json'),
    exampleFilePath: path.resolve(rootDir, 'widget.example.tsx'),
    localDataFilePath: path.resolve(rootDir, '.local', 'data.json'),
    localFilePath: path.resolve(rootDir, '.local', 'widget.tsx'),
    snapshotsDirPath: path.resolve(rootDir, '.local', 'snapshots'),
  }
}

function formatExampleName(exampleId: string): string {
  return exampleId
    .split('-')
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join(' ')
}

function validateExampleId(exampleId: string): boolean {
  return /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(exampleId)
}

function validateWidgetFileName(widgetFileName: string): boolean {
  return /^[A-Za-z0-9][A-Za-z0-9._-]*\.tsx$/.test(widgetFileName) && !widgetFileName.endsWith('.d.ts')
}

function sortWidgetFileNames(fileNames: string[]): string[] {
  return [...fileNames].sort((left, right) => {
    if (left === 'widget.tsx') {
      return -1
    }
    if (right === 'widget.tsx') {
      return 1
    }
    return left.localeCompare(right)
  })
}

function resolveWidgetExampleDirPath(paths: WidgetStorePaths, exampleId: string): string {
  if (!validateExampleId(exampleId)) {
    throw new Error('Invalid example id.')
  }

  return path.join(paths.examplesDirPath, exampleId)
}

export async function listWidgetExamples(paths: WidgetStorePaths): Promise<WidgetExampleListItem[]> {
  const entries = await readdir(paths.examplesDirPath, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      id: entry.name,
      name: formatExampleName(entry.name),
    }))
    .sort((left, right) => left.id.localeCompare(right.id))
}

export async function listWidgetExampleWidgetFiles(
  paths: WidgetStorePaths,
  exampleId: string,
): Promise<string[]> {
  const exampleDirPath = resolveWidgetExampleDirPath(paths, exampleId)
  const entries = await readdir(exampleDirPath, { withFileTypes: true })

  const widgetFiles = sortWidgetFileNames(
    entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => validateWidgetFileName(name)),
  )

  if (widgetFiles.length === 0) {
    throw new Error(`No .tsx files found in example "${exampleId}".`)
  }

  return widgetFiles
}

export async function readWidgetExample(
  paths: WidgetStorePaths,
  exampleId: string,
  widgetFileName?: string,
): Promise<WidgetExampleSource> {
  const exampleDirPath = resolveWidgetExampleDirPath(paths, exampleId)
  const widgetFiles = await listWidgetExampleWidgetFiles(paths, exampleId)
  const requestedWidgetFileName = widgetFileName?.trim() ?? ''
  const selectedWidgetFileName = requestedWidgetFileName || widgetFiles[0]

  if (requestedWidgetFileName && !validateWidgetFileName(requestedWidgetFileName)) {
    throw new Error('Invalid widget file name.')
  }
  if (!widgetFiles.includes(selectedWidgetFileName)) {
    throw new Error(`Widget file "${selectedWidgetFileName}" not found in example "${exampleId}".`)
  }

  const [source, dataSource] = await Promise.all([
    readFile(path.join(exampleDirPath, selectedWidgetFileName), 'utf8'),
    readFile(path.join(exampleDirPath, 'data.json'), 'utf8'),
  ])

  return {
    dataSource,
    id: exampleId,
    name: formatExampleName(exampleId),
    source,
    widgetFileName: selectedWidgetFileName,
    widgetFiles,
  }
}

export async function readExampleSource(paths: WidgetStorePaths): Promise<string> {
  return readFile(paths.exampleFilePath, 'utf8')
}

export async function readExampleDataSource(paths: WidgetStorePaths): Promise<string> {
  return readFile(paths.exampleDataFilePath, 'utf8')
}

export async function readWidgetSource(paths: WidgetStorePaths): Promise<WidgetSourceResult> {
  try {
    const localSource = await readFile(paths.localFilePath, 'utf8')
    return {
      origin: 'local',
      source: localSource,
    }
  } catch (error) {
    const asNodeError = error as NodeJS.ErrnoException
    if (asNodeError.code !== 'ENOENT') {
      throw error
    }
  }

  const exampleSource = await readExampleSource(paths)
  return {
    origin: 'example',
    source: exampleSource,
  }
}

export async function readWidgetDataSource(
  paths: WidgetStorePaths,
  origin: WidgetOrigin,
): Promise<string> {
  if (origin === 'local') {
    try {
      return await readFile(paths.localDataFilePath, 'utf8')
    } catch (error) {
      const asNodeError = error as NodeJS.ErrnoException
      if (asNodeError.code !== 'ENOENT') {
        throw error
      }
    }
  }

  return readExampleDataSource(paths)
}

export async function writeWidgetSource(
  paths: WidgetStorePaths,
  source: string,
  dataSource: string,
): Promise<void> {
  await mkdir(path.dirname(paths.localFilePath), { recursive: true })
  await Promise.all([
    writeFile(paths.localFilePath, source, 'utf8'),
    writeFile(paths.localDataFilePath, dataSource, 'utf8'),
  ])
}

function sanitizeSnapshotName(name: string): string {
  const normalized = name
    .trim()
    .replace(/[^a-zA-Z0-9._\s-]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^\.+/, '')
    .replace(/[.-]+$/, '')

  return normalized || 'widget'
}

function formatSnapshotTimestamp(value: Date): string {
  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, '0')
  const day = `${value.getDate()}`.padStart(2, '0')
  const hours = `${value.getHours()}`.padStart(2, '0')
  const minutes = `${value.getMinutes()}`.padStart(2, '0')
  const seconds = `${value.getSeconds()}`.padStart(2, '0')
  return `${year}${month}${day}-${hours}${minutes}${seconds}`
}

export async function saveNamedWidgetSource(
  paths: WidgetStorePaths,
  source: string,
  dataSource: string,
  name: string,
  now: Date = new Date(),
): Promise<NamedWidgetSaveResult> {
  const safeName = sanitizeSnapshotName(name)
  const timestamp = formatSnapshotTimestamp(now)
  const snapshotDirName = `${timestamp}-${safeName}`
  const snapshotDirPath = path.join(paths.snapshotsDirPath, snapshotDirName)
  const widgetFilePath = path.join(snapshotDirPath, 'widget.tsx')
  const dataFilePath = path.join(snapshotDirPath, 'data.json')

  await Promise.all([
    writeWidgetSource(paths, source, dataSource),
    mkdir(snapshotDirPath, { recursive: true }),
  ])
  await Promise.all([
    writeFile(widgetFilePath, source, 'utf8'),
    writeFile(dataFilePath, dataSource, 'utf8'),
  ])

  return {
    dataFilePath,
    snapshotDirName,
    snapshotDirPath,
    widgetFilePath,
  }
}

async function deleteIfExists(filePath: string): Promise<void> {
  try {
    await unlink(filePath)
  } catch (error) {
    const asNodeError = error as NodeJS.ErrnoException
    if (asNodeError.code !== 'ENOENT') {
      throw error
    }
  }
}

export async function deleteLocalWidgetSource(paths: WidgetStorePaths): Promise<void> {
  await Promise.all([
    deleteIfExists(paths.localFilePath),
    deleteIfExists(paths.localDataFilePath),
  ])
}
