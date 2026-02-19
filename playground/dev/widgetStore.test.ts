// @vitest-environment node

import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  deleteLocalWidgetSource,
  readWidgetSource,
  resolveWidgetStorePaths,
  saveNamedWidgetSource,
  writeWidgetSource,
} from './widgetStore'

const tempDirs: string[] = []

async function createTempProject(exampleSource: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), 'widget-store-'))
  await writeFile(path.join(root, 'widget.example.tsx'), exampleSource, 'utf8')
  tempDirs.push(root)
  return root
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { force: true, recursive: true })))
})

describe('widgetStore', () => {
  it('falls back to example source when local file is missing', async () => {
    const projectRoot = await createTempProject('export default function Widget() { return null }')
    const paths = resolveWidgetStorePaths(projectRoot)

    const result = await readWidgetSource(paths)
    expect(result.origin).toBe('example')
    expect(result.source).toContain('export default function Widget')
  })

  it('prefers local source after save', async () => {
    const projectRoot = await createTempProject('export default function Example() { return null }')
    const paths = resolveWidgetStorePaths(projectRoot)
    const localSource = 'export default function LocalWidget() { return <div>Local</div> }'

    await writeWidgetSource(paths, localSource)

    const result = await readWidgetSource(paths)
    expect(result.origin).toBe('local')
    expect(result.source).toContain('LocalWidget')
  })

  it('deletes local source and falls back to example after reset', async () => {
    const projectRoot = await createTempProject('export default function Example() { return null }')
    const paths = resolveWidgetStorePaths(projectRoot)

    await writeWidgetSource(paths, 'export default function Local() { return <div>Local</div> }')
    await deleteLocalWidgetSource(paths)

    const result = await readWidgetSource(paths)
    expect(result.origin).toBe('example')
    expect(result.source).toContain('Example')
  })

  it('saves named snapshot with timestamp plus name', async () => {
    const projectRoot = await createTempProject('export default function Example() { return null }')
    const paths = resolveWidgetStorePaths(projectRoot)
    const savedSource = 'export default function Saved() { return <div>Saved</div> }'
    const fixedNow = new Date('2026-02-19T08:09:10')

    const snapshot = await saveNamedWidgetSource(paths, savedSource, 'my test file', fixedNow)
    expect(snapshot.fileName).toBe('20260219-080910-my-test-file.tsx')

    const savedSnapshotSource = await readFile(snapshot.filePath, 'utf8')
    expect(savedSnapshotSource).toContain('Saved')

    const currentWidgetSource = await readFile(paths.localFilePath, 'utf8')
    expect(currentWidgetSource).toContain('Saved')
  })
})
