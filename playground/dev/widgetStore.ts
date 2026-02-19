import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

export type WidgetOrigin = 'local' | 'example'

export interface WidgetStorePaths {
  exampleFilePath: string
  localFilePath: string
  snapshotsDirPath: string
}

export interface WidgetSourceResult {
  origin: WidgetOrigin
  source: string
}

export interface NamedWidgetSaveResult {
  fileName: string
  filePath: string
}

export function resolveWidgetStorePaths(rootDir: string): WidgetStorePaths {
  return {
    exampleFilePath: path.resolve(rootDir, 'widget.example.tsx'),
    localFilePath: path.resolve(rootDir, '.local', 'widget.tsx'),
    snapshotsDirPath: path.resolve(rootDir, '.local', 'snapshots'),
  }
}

export async function readExampleSource(paths: WidgetStorePaths): Promise<string> {
  return readFile(paths.exampleFilePath, 'utf8')
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

export async function writeWidgetSource(paths: WidgetStorePaths, source: string): Promise<void> {
  await mkdir(path.dirname(paths.localFilePath), { recursive: true })
  await writeFile(paths.localFilePath, source, 'utf8')
}

function sanitizeSnapshotName(name: string): string {
  const normalized = name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^\.+/, '')
    .replace(/[.\-]+$/, '')

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
  name: string,
  now: Date = new Date(),
): Promise<NamedWidgetSaveResult> {
  const safeName = sanitizeSnapshotName(name)
  const timestamp = formatSnapshotTimestamp(now)
  const fileName = `${timestamp}-${safeName}.tsx`
  const filePath = path.join(paths.snapshotsDirPath, fileName)

  await Promise.all([
    writeWidgetSource(paths, source),
    mkdir(paths.snapshotsDirPath, { recursive: true }),
  ])
  await writeFile(filePath, source, 'utf8')

  return {
    fileName,
    filePath,
  }
}

export async function deleteLocalWidgetSource(paths: WidgetStorePaths): Promise<void> {
  try {
    await unlink(paths.localFilePath)
  } catch (error) {
    const asNodeError = error as NodeJS.ErrnoException
    if (asNodeError.code !== 'ENOENT') {
      throw error
    }
  }
}
