import defaultWidgetSource from '../../widget.example.tsx?raw'
import defaultDataSource from '../../data.example.json?raw'

export interface BundledExample {
  id: string
  name: string
  widgetFiles: string[]
  sources: Record<string, string>
  dataSource: string
}

const widgetModules = import.meta.glob(
  '../../examples/*/*.tsx',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>

const dataModules = import.meta.glob(
  '../../examples/*/data.json',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>

function extractPathParts(globPath: string): { exampleId: string; fileName: string } | null {
  const match = globPath.match(/examples\/([^/]+)\/(.+)$/)
  if (!match) return null
  return { exampleId: match[1], fileName: match[2] }
}

function formatExampleName(exampleId: string): string {
  return exampleId
    .split('-')
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join(' ')
}

function sortWidgetFileNames(fileNames: string[]): string[] {
  return [...fileNames].sort((a, b) => {
    if (a === 'widget.tsx') return -1
    if (b === 'widget.tsx') return 1
    return a.localeCompare(b)
  })
}

const exampleMap = new Map<string, BundledExample>()

for (const [path, source] of Object.entries(widgetModules)) {
  const parts = extractPathParts(path)
  if (!parts) continue

  let example = exampleMap.get(parts.exampleId)
  if (!example) {
    example = {
      id: parts.exampleId,
      name: formatExampleName(parts.exampleId),
      widgetFiles: [],
      sources: {},
      dataSource: '{}',
    }
    exampleMap.set(parts.exampleId, example)
  }

  example.sources[parts.fileName] = source
  example.widgetFiles.push(parts.fileName)
}

for (const [path, source] of Object.entries(dataModules)) {
  const parts = extractPathParts(path)
  if (!parts) continue

  const example = exampleMap.get(parts.exampleId)
  if (example) {
    example.dataSource = source
  }
}

for (const example of exampleMap.values()) {
  example.widgetFiles = sortWidgetFileNames(example.widgetFiles)
}

const examples: BundledExample[] = [...exampleMap.values()].sort((a, b) => a.id.localeCompare(b.id))

export { defaultDataSource, defaultWidgetSource, examples }
