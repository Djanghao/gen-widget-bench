// @vitest-environment node

import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  deleteLocalWidgetSource,
  readWidgetDataSource,
  readWidgetSource,
  resolveWidgetStorePaths,
  saveNamedWidgetSource,
  writeWidgetSource,
} from './widgetStore'

const tempDirs: string[] = []

async function createTempProject(exampleSource: string, exampleDataSource: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), 'widget-store-'))
  await Promise.all([
    writeFile(path.join(root, 'widget.example.tsx'), exampleSource, 'utf8'),
    writeFile(path.join(root, 'data.example.json'), exampleDataSource, 'utf8'),
  ])
  tempDirs.push(root)
  return root
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { force: true, recursive: true })))
})

describe('widgetStore', () => {
  it('falls back to example source and data when local files are missing', async () => {
    const projectRoot = await createTempProject(
      'export default function Widget() { return null }',
      '{"title":"example"}',
    )
    const paths = resolveWidgetStorePaths(projectRoot)

    const widget = await readWidgetSource(paths)
    const dataSource = await readWidgetDataSource(paths, widget.origin)
    expect(widget.origin).toBe('example')
    expect(widget.source).toContain('export default function Widget')
    expect(dataSource).toContain('example')
  })

  it('prefers local source and data after save', async () => {
    const projectRoot = await createTempProject(
      'export default function Example() { return null }',
      '{"title":"example"}',
    )
    const paths = resolveWidgetStorePaths(projectRoot)
    const localSource = 'export default function LocalWidget() { return <div>Local</div> }'
    const localDataSource = '{"title":"local"}'

    await writeWidgetSource(paths, localSource, localDataSource)

    const widget = await readWidgetSource(paths)
    const dataSource = await readWidgetDataSource(paths, widget.origin)
    expect(widget.origin).toBe('local')
    expect(widget.source).toContain('LocalWidget')
    expect(dataSource).toContain('local')
  })

  it('deletes local files and falls back to example files after reset', async () => {
    const projectRoot = await createTempProject(
      'export default function Example() { return null }',
      '{"title":"example"}',
    )
    const paths = resolveWidgetStorePaths(projectRoot)

    await writeWidgetSource(
      paths,
      'export default function Local() { return <div>Local</div> }',
      '{"title":"local"}',
    )
    await deleteLocalWidgetSource(paths)

    const widget = await readWidgetSource(paths)
    const dataSource = await readWidgetDataSource(paths, widget.origin)
    expect(widget.origin).toBe('example')
    expect(widget.source).toContain('Example')
    expect(dataSource).toContain('example')
  })

  it('saves named snapshot directory with widget and data files', async () => {
    const projectRoot = await createTempProject(
      'export default function Example() { return null }',
      '{"title":"example"}',
    )
    const paths = resolveWidgetStorePaths(projectRoot)
    const savedSource = 'export default function Saved() { return <div>Saved</div> }'
    const savedDataSource = '{"title":"saved"}'
    const fixedNow = new Date('2026-02-19T08:09:10')

    const snapshot = await saveNamedWidgetSource(paths, savedSource, savedDataSource, 'my test file', fixedNow)
    expect(snapshot.snapshotDirName).toBe('20260219-080910-my-test-file')

    const savedSnapshotSource = await readFile(snapshot.widgetFilePath, 'utf8')
    expect(savedSnapshotSource).toContain('Saved')
    const savedSnapshotData = await readFile(snapshot.dataFilePath, 'utf8')
    expect(savedSnapshotData).toContain('saved')

    const currentWidgetSource = await readFile(paths.localFilePath, 'utf8')
    expect(currentWidgetSource).toContain('Saved')
    const currentDataSource = await readFile(paths.localDataFilePath, 'utf8')
    expect(currentDataSource).toContain('saved')
  })
})
