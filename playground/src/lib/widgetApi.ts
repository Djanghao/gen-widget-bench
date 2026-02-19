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
}

interface ApiErrorPayload {
  error?: string
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as ApiErrorPayload
    if (payload.error) {
      return payload.error
    }
  } catch {
    // noop: fall back to generic message
  }

  return `Request failed with status ${response.status}.`
}

export async function fetchWidgetSource(): Promise<WidgetSourceResponse> {
  const response = await fetch('/api/widget/source')
  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  return response.json() as Promise<WidgetSourceResponse>
}

export async function saveWidgetSource(
  source: string,
  dataSource: string,
  name?: string,
): Promise<SaveWidgetResponse> {
  const response = await fetch('/api/widget/source', {
    body: JSON.stringify(name ? { dataSource, name, source } : { dataSource, source }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  return response.json() as Promise<SaveWidgetResponse>
}

export async function resetWidgetSource(): Promise<WidgetSourceResponse> {
  const response = await fetch('/api/widget/source', {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  return response.json() as Promise<WidgetSourceResponse>
}

export async function fetchWidgetExamples(): Promise<WidgetExamplesResponse> {
  const response = await fetch('/api/widget/examples')
  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  return response.json() as Promise<WidgetExamplesResponse>
}

export async function fetchWidgetExampleSource(exampleId: string): Promise<WidgetExampleSourceResponse> {
  const response = await fetch(`/api/widget/examples/${encodeURIComponent(exampleId)}`)
  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  return response.json() as Promise<WidgetExampleSourceResponse>
}
