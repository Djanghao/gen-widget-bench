import { type ComponentType, useEffect, useMemo, useRef, useState } from 'react'
import { WidgetEditor } from './components/WidgetEditor'
import { WidgetViewer } from './components/WidgetViewer'
import { compileWidget, WidgetCompileError } from './lib/compileWidget'
import {
  fetchWidgetExampleSource,
  fetchWidgetExamples,
  fetchWidgetSource,
  resetWidgetSource,
  saveWidgetSource,
  type WidgetExample,
  type WidgetOrigin,
} from './lib/widgetApi'

const COMPILE_DEBOUNCE_MS = 400

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

type EditorFile = 'data' | 'widget'

function App() {
  const [widgetSource, setWidgetSource] = useState('')
  const [dataSource, setDataSource] = useState('{}')
  const [activeEditorFile, setActiveEditorFile] = useState<EditorFile>('widget')
  const [examples, setExamples] = useState<WidgetExample[]>([])
  const [exampleWidgetFiles, setExampleWidgetFiles] = useState<string[]>([])
  const [selectedExampleId, setSelectedExampleId] = useState('')
  const [selectedExampleWidgetFile, setSelectedExampleWidgetFile] = useState('')
  const [isExampleLoading, setIsExampleLoading] = useState(false)
  const [exampleError, setExampleError] = useState<string | null>(null)
  const [origin, setOrigin] = useState<WidgetOrigin>('example')
  const [component, setComponent] = useState<ComponentType | null>(null)
  const [compileError, setCompileError] = useState<string | null>(null)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [refreshToken, setRefreshToken] = useState(0)
  const [rechartsComponents, setRechartsComponents] = useState<string[]>([])
  const [guideLoadError, setGuideLoadError] = useState<string | null>(null)
  const [isGuideLoading, setIsGuideLoading] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)
  const [lastSavedPath, setLastSavedPath] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const compileRequestId = useRef(0)

  useEffect(() => {
    let isCancelled = false

    async function loadSource(): Promise<void> {
      try {
        const payload = await fetchWidgetSource()
        let loadedExamples: WidgetExample[] = []
        let loadedExampleError: string | null = null

        try {
          const examplesPayload = await fetchWidgetExamples()
          loadedExamples = examplesPayload.examples
        } catch (error) {
          loadedExampleError = error instanceof Error ? error.message : 'Failed to load examples.'
        }

        if (isCancelled) {
          return
        }

        setWidgetSource(payload.source)
        setDataSource(payload.dataSource)
        setExamples(loadedExamples)
        setExampleWidgetFiles([])
        setSelectedExampleId('')
        setSelectedExampleWidgetFile('')
        setExampleError(loadedExampleError)
        setOrigin(payload.origin)
        setLoadingError(null)
        setSaveError(null)
        setLastSavedPath(null)
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
      void compileWidget(widgetSource, dataSource)
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
              : 'Failed to compile widget.tsx with data.json.'

          setComponent(null)
          setCompileError(message)
        })
    }, COMPILE_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [dataSource, isLoaded, widgetSource])

  useEffect(() => {
    if (!isGuideOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsGuideOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isGuideOpen])

  useEffect(() => {
    if (!isGuideOpen) {
      return
    }

    if (rechartsComponents.length > 0) {
      return
    }

    let isCancelled = false
    setIsGuideLoading(true)
    setGuideLoadError(null)

    void import('recharts')
      .then((rechartsModule) => {
        if (isCancelled) {
          return
        }

        const loadedRecharts = Object.keys(rechartsModule)
          .filter((name) => /^[A-Z]/.test(name))
          .sort((left, right) => left.localeCompare(right))

        setRechartsComponents(loadedRecharts)
      })
      .catch((error: unknown) => {
        if (isCancelled) {
          return
        }

        const message = error instanceof Error
          ? error.message
          : 'Failed to load recharts component list.'
        setGuideLoadError(message)
      })
      .finally(() => {
        if (isCancelled) {
          return
        }
        setIsGuideLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [isGuideOpen, rechartsComponents.length])

  const originLabel = useMemo(() => {
    return origin === 'local' ? 'Loaded from local widget.tsx + data.json' : 'Loaded from widget.example.tsx + data.example.json'
  }, [origin])
  const statusMessage = `${originLabel}${lastSavedAt ? ` • Saved at ${formatTimestamp(lastSavedAt)}` : ''}${lastSavedPath ? ` • File: ${lastSavedPath}` : ''}${saveError ? ` • Action failed: ${saveError}` : ''}${exampleError ? ` • Examples: ${exampleError}` : ''}`

  async function onSave(): Promise<void> {
    const name = window.prompt('Enter a file name. It will be saved as "timestamp-name/widget.tsx + data.json".')
    if (name === null) {
      return
    }

    const trimmedName = name.trim()
    if (!trimmedName) {
      setSaveError('Please provide a non-empty file name before saving.')
      return
    }

    setIsSaving(true)
    try {
      const payload = await saveWidgetSource(widgetSource, dataSource, trimmedName)
      setOrigin('local')
      setLastSavedAt(Date.now())
      setLastSavedPath(payload.snapshotPath ?? null)
      setSaveError(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save widget files.'
      setSaveError(message)
    } finally {
      setIsSaving(false)
    }
  }

  async function onReset(): Promise<void> {
    setIsResetting(true)
    try {
      const payload = await resetWidgetSource()
      setWidgetSource(payload.source)
      setDataSource(payload.dataSource)
      setExampleWidgetFiles([])
      setSelectedExampleId('')
      setSelectedExampleWidgetFile('')
      setOrigin(payload.origin)
      setLastSavedAt(null)
      setLastSavedPath(null)
      setSaveError(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to reset widget files.'
      setSaveError(message)
    } finally {
      setIsResetting(false)
    }
  }

  function onRefresh(): void {
    setRefreshToken((prev) => prev + 1)
  }

  async function onExampleChange(exampleId: string): Promise<void> {
    if (exampleId === selectedExampleId) {
      return
    }

    if (!exampleId) {
      setExampleWidgetFiles([])
      setSelectedExampleId('')
      setSelectedExampleWidgetFile('')
      setExampleError(null)
      return
    }

    const previousExampleId = selectedExampleId
    const previousWidgetFiles = exampleWidgetFiles
    const previousWidgetFile = selectedExampleWidgetFile
    setSelectedExampleId(exampleId)
    setExampleWidgetFiles([])
    setSelectedExampleWidgetFile('')
    setIsExampleLoading(true)
    setExampleError(null)

    try {
      const payload = await fetchWidgetExampleSource(exampleId)
      setExampleWidgetFiles(payload.widgetFiles)
      setSelectedExampleWidgetFile(payload.widgetFileName)
      setWidgetSource(payload.source)
      setDataSource(payload.dataSource)
      setActiveEditorFile('widget')
      setOrigin('example')
      setLastSavedAt(null)
      setLastSavedPath(null)
      setSaveError(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load selected example.'
      setExampleWidgetFiles(previousWidgetFiles)
      setSelectedExampleId(previousExampleId)
      setSelectedExampleWidgetFile(previousWidgetFile)
      setExampleError(message)
    } finally {
      setIsExampleLoading(false)
    }
  }

  async function onExampleWidgetFileChange(widgetFileName: string): Promise<void> {
    if (!selectedExampleId || !widgetFileName || widgetFileName === selectedExampleWidgetFile) {
      return
    }

    const previousWidgetFile = selectedExampleWidgetFile
    const previousWidgetFiles = exampleWidgetFiles
    setSelectedExampleWidgetFile(widgetFileName)
    setIsExampleLoading(true)
    setExampleError(null)

    try {
      const payload = await fetchWidgetExampleSource(selectedExampleId, widgetFileName)
      setExampleWidgetFiles(payload.widgetFiles)
      setSelectedExampleWidgetFile(payload.widgetFileName)
      setWidgetSource(payload.source)
      setDataSource(payload.dataSource)
      setActiveEditorFile('widget')
      setOrigin('example')
      setLastSavedAt(null)
      setLastSavedPath(null)
      setSaveError(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load selected widget file.'
      setSelectedExampleWidgetFile(previousWidgetFile)
      setExampleWidgetFiles(previousWidgetFiles)
      setExampleError(message)
    } finally {
      setIsExampleLoading(false)
    }
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
          <button disabled={isSaving || isResetting || isExampleLoading} onClick={() => void onSave()} type="button">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button disabled={isSaving || isResetting || isExampleLoading} onClick={() => setIsGuideOpen(true)} type="button">
            Widget Guide
          </button>
          <button disabled={isSaving || isResetting || isExampleLoading} onClick={onRefresh} type="button">
            Refresh
          </button>
          <button disabled={isSaving || isResetting || isExampleLoading} onClick={() => void onReset()} type="button">
            {isResetting ? 'Resetting...' : 'Reset to Example'}
          </button>
        </div>
      </header>

      <section className="playground-grid">
        <WidgetEditor
          activeFile={activeEditorFile}
          dataSource={dataSource}
          exampleId={selectedExampleId}
          exampleWidgetFile={selectedExampleWidgetFile}
          exampleWidgetFiles={exampleWidgetFiles}
          examples={examples}
          isExampleLoading={isExampleLoading}
          onExampleChange={(exampleId) => void onExampleChange(exampleId)}
          onExampleWidgetFileChange={(widgetFileName) => void onExampleWidgetFileChange(widgetFileName)}
          onActiveFileChange={setActiveEditorFile}
          onDataSourceChange={setDataSource}
          onWidgetSourceChange={setWidgetSource}
          widgetSource={widgetSource}
        />
        <WidgetViewer compileError={compileError} component={component} refreshToken={refreshToken} />
      </section>

      {isGuideOpen ? (
        <div
          aria-labelledby="widget-guide-title"
          aria-modal="true"
          className="guide-modal-backdrop"
          onClick={() => setIsGuideOpen(false)}
          role="dialog"
        >
          <div className="guide-modal" onClick={(event) => event.stopPropagation()}>
            <div className="guide-modal-header">
              <h2 id="widget-guide-title">Widget Guide</h2>
              <button onClick={() => setIsGuideOpen(false)} type="button">
                Close
              </button>
            </div>
            <div className="guide-modal-body">
              <section className="guide-section">
                <h3 className="guide-subtitle">recharts components</h3>
                <p className="guide-text">{rechartsComponents.length} components</p>
                {isGuideLoading ? <p className="guide-text">Loading components...</p> : null}
                <div className="guide-chip-list">
                  {rechartsComponents.map((name) => (
                    <code className="guide-chip" key={name}>{name}</code>
                  ))}
                </div>
              </section>

              {guideLoadError ? <p className="guide-text guide-error">{guideLoadError}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default App
