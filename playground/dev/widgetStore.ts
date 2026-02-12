import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export type WidgetOrigin = 'local' | 'example'

export interface WidgetStorePaths {
  exampleFilePath: string
  localFilePath: string
}

export interface WidgetSourceResult {
  origin: WidgetOrigin
  source: string
}

export function resolveWidgetStorePaths(rootDir: string): WidgetStorePaths {
  return {
    exampleFilePath: path.resolve(rootDir, 'widget.example.tsx'),
    localFilePath: path.resolve(rootDir, '.local', 'widget.tsx'),
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
