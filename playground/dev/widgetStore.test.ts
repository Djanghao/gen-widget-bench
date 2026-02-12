// @vitest-environment node

import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  readWidgetSource,
  resolveWidgetStorePaths,
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
})
