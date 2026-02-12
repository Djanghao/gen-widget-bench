export type WidgetOrigin = 'example' | 'local'

export interface WidgetSourceResponse {
  exampleSource: string
  origin: WidgetOrigin
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

export async function saveWidgetSource(source: string): Promise<void> {
  const response = await fetch('/api/widget/source', {
    body: JSON.stringify({ source }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }
}
