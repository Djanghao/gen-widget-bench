import { defaultDataSource, defaultWidgetSource, examples } from './exampleStore'

export type WidgetOrigin = 'example' | 'local'

export interface WidgetSourceResponse {
  dataSource: string
  exampleDataSource: string
  exampleSource: string
  origin: WidgetOrigin
  source: string
}

export interface SaveWidgetResponse {
  ok: true
  snapshotPath?: string
}

export interface WidgetExample {
  id: string
  name: string
}

export interface WidgetExamplesResponse {
  examples: WidgetExample[]
}

export interface WidgetExampleSourceResponse {
  dataSource: string
  id: string
  name: string
  prompt?: string
  source: string
  widgetFileName: string
  widgetFiles: string[]
}

export interface SavedWidget {
  id: string
  name: string
  widgetSource: string
  dataSource: string
  prompt?: string
}

const LOCAL_WIDGET_KEY = 'playground:widget-source'
const LOCAL_DATA_KEY = 'playground:data-source'
const SAVED_WIDGETS_KEY = 'playground:saved-widgets'

export function getSavedWidgets(): SavedWidget[] {
  const raw = localStorage.getItem(SAVED_WIDGETS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as SavedWidget[]
  } catch {
    return []
  }
}

export function hasSavedWidget(name: string): boolean {
  return getSavedWidgets().some((w) => w.id === `saved:${name}`)
}

export function saveNewWidget(name: string, widgetSource: string, dataSource: string, prompt?: string): void {
  const saved = getSavedWidgets()
  const id = `saved:${name}`
  const existing = saved.findIndex((w) => w.id === id)
  const entry: SavedWidget = { id, name, widgetSource, dataSource, prompt: prompt || undefined }
  if (existing >= 0) {
    saved[existing] = entry
  } else {
    saved.push(entry)
  }
  localStorage.setItem(SAVED_WIDGETS_KEY, JSON.stringify(saved))
}

export function deleteSavedWidget(id: string): void {
  const saved = getSavedWidgets().filter((w) => w.id !== id)
  localStorage.setItem(SAVED_WIDGETS_KEY, JSON.stringify(saved))
}

export async function fetchWidgetSource(): Promise<WidgetSourceResponse> {
  const localWidget = localStorage.getItem(LOCAL_WIDGET_KEY)
  const localData = localStorage.getItem(LOCAL_DATA_KEY)

  if (localWidget) {
    return {
      dataSource: localData ?? defaultDataSource,
      exampleDataSource: defaultDataSource,
      exampleSource: defaultWidgetSource,
      origin: 'local',
      source: localWidget,
    }
  }

  return {
    dataSource: defaultDataSource,
    exampleDataSource: defaultDataSource,
    exampleSource: defaultWidgetSource,
    origin: 'example',
    source: defaultWidgetSource,
  }
}

export async function saveWidgetSource(
  source: string,
  dataSource: string,
  name?: string,
): Promise<SaveWidgetResponse> {
  localStorage.setItem(LOCAL_WIDGET_KEY, source)
  localStorage.setItem(LOCAL_DATA_KEY, dataSource)

  if (name) {
    return { ok: true, snapshotPath: name }
  }

  return { ok: true }
}

export async function resetWidgetSource(): Promise<WidgetSourceResponse> {
  localStorage.removeItem(LOCAL_WIDGET_KEY)
  localStorage.removeItem(LOCAL_DATA_KEY)

  return {
    dataSource: defaultDataSource,
    exampleDataSource: defaultDataSource,
    exampleSource: defaultWidgetSource,
    origin: 'example',
    source: defaultWidgetSource,
  }
}

export async function fetchWidgetExamples(): Promise<WidgetExamplesResponse> {
  const bundled = examples.map((e) => ({ id: e.id, name: e.name }))
  const saved = getSavedWidgets().map((w) => ({ id: w.id, name: `[Saved] ${w.name}` }))
  return {
    examples: [...bundled, ...saved],
  }
}

export async function fetchWidgetExampleSource(
  exampleId: string,
  widgetFileName?: string,
): Promise<WidgetExampleSourceResponse> {
  if (exampleId.startsWith('saved:')) {
    const saved = getSavedWidgets().find((w) => w.id === exampleId)
    if (!saved) {
      throw new Error(`Saved widget "${exampleId}" not found.`)
    }
    return {
      dataSource: saved.dataSource,
      id: saved.id,
      name: saved.name,
      prompt: saved.prompt,
      source: saved.widgetSource,
      widgetFileName: 'widget.tsx',
      widgetFiles: ['widget.tsx'],
    }
  }

  const example = examples.find((e) => e.id === exampleId)
  if (!example) {
    throw new Error(`Example "${exampleId}" not found.`)
  }

  const selectedFile = widgetFileName ?? example.widgetFiles[0]
  const source = example.sources[selectedFile]
  if (!source) {
    throw new Error(`Widget file "${selectedFile}" not found in example "${exampleId}".`)
  }

  return {
    dataSource: example.dataSource,
    id: example.id,
    name: example.name,
    source,
    widgetFileName: selectedFile,
    widgetFiles: example.widgetFiles,
  }
}
