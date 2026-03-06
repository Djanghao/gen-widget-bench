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
  source: string
  widgetFileName: string
  widgetFiles: string[]
}

const LOCAL_WIDGET_KEY = 'playground:widget-source'
const LOCAL_DATA_KEY = 'playground:data-source'

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
  return {
    examples: examples.map((e) => ({ id: e.id, name: e.name })),
  }
}

export async function fetchWidgetExampleSource(
  exampleId: string,
  widgetFileName?: string,
): Promise<WidgetExampleSourceResponse> {
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
