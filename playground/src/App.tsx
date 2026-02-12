import { type ComponentType, useEffect, useMemo, useRef, useState } from 'react'
import { WidgetEditor } from './components/WidgetEditor'
import { WidgetViewer } from './components/WidgetViewer'
import { compileWidget, WidgetCompileError } from './lib/compileWidget'
import { fetchWidgetSource, saveWidgetSource, type WidgetOrigin } from './lib/widgetApi'

const COMPILE_DEBOUNCE_MS = 400

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

function App() {
  const [source, setSource] = useState('')
  const [exampleSource, setExampleSource] = useState('')
  const [origin, setOrigin] = useState<WidgetOrigin>('example')
  const [component, setComponent] = useState<ComponentType | null>(null)
  const [compileError, setCompileError] = useState<string | null>(null)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const compileRequestId = useRef(0)

  useEffect(() => {
    let isCancelled = false

    async function loadSource(): Promise<void> {
      try {
        const payload = await fetchWidgetSource()
        if (isCancelled) {
          return
        }

        setSource(payload.source)
        setExampleSource(payload.exampleSource)
        setOrigin(payload.origin)
        setLoadingError(null)
        setSaveError(null)
        setIsLoaded(true)
      } catch (error) {
        if (isCancelled) {
          return
        }

        const message = error instanceof Error ? error.message : 'Failed to load widget source.'
        setLoadingError(message)
      }
    }

    void loadSource()

    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    const requestId = ++compileRequestId.current
    const timeoutId = window.setTimeout(() => {
      void compileWidget(source)
        .then((result) => {
          if (requestId !== compileRequestId.current) {
            return
          }

          setComponent(() => result.component)
          setCompileError(null)
        })
        .catch((error: unknown) => {
          if (requestId !== compileRequestId.current) {
            return
          }

          const message = error instanceof WidgetCompileError
            ? error.message
            : error instanceof Error
              ? error.message
              : 'Failed to compile widget.tsx.'

          setComponent(null)
          setCompileError(message)
        })
    }, COMPILE_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isLoaded, source])

  const originLabel = useMemo(() => {
    return origin === 'local' ? 'Loaded from local widget.tsx' : 'Loaded from widget.example.tsx'
  }, [origin])
  const statusMessage = `${originLabel}${lastSavedAt ? ` • Saved at ${formatTimestamp(lastSavedAt)}` : ''}${saveError ? ` • Save failed: ${saveError}` : ''}`

  async function onSave(): Promise<void> {
    setIsSaving(true)
    try {
      await saveWidgetSource(source)
      setOrigin('local')
      setLastSavedAt(Date.now())
      setSaveError(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save widget.tsx.'
      setSaveError(message)
    } finally {
      setIsSaving(false)
    }
  }

  function onReset(): void {
    setSource(exampleSource)
    setOrigin('example')
    setSaveError(null)
  }

  if (loadingError) {
    return (
      <main className="app-shell app-loading-error">
        <h1>Widget Playground</h1>
        <p>{loadingError}</p>
      </main>
    )
  }

  if (!isLoaded) {
    return (
      <main className="app-shell app-loading">
        <h1>Widget Playground</h1>
        <p>Loading widget source...</p>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="toolbar">
        <h1>Widget Playground</h1>
        <p className="status-text" title={statusMessage}>
          {statusMessage}
        </p>
        <div className="toolbar-actions">
          <button disabled={isSaving} onClick={() => void onSave()} type="button">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={onReset} type="button">
            Reset to Example
          </button>
        </div>
      </header>

      <section className="playground-grid">
        <WidgetEditor onChange={setSource} source={source} />
        <WidgetViewer compileError={compileError} component={component} />
      </section>
    </main>
  )
}

export default App
