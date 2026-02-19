import { useEffect, useRef } from 'react'
import Editor, { type OnMount } from '@monaco-editor/react'
import type { editor as MonacoEditor } from 'monaco-editor'

type EditorFile = 'data' | 'widget'

interface WidgetExampleOption {
  id: string
  name: string
}

interface WidgetEditorProps {
  activeFile: EditorFile
  dataSource: string
  exampleId: string
  exampleWidgetFile: string
  exampleWidgetFiles: string[]
  examples: WidgetExampleOption[]
  isExampleLoading: boolean
  onExampleChange: (exampleId: string) => void
  onExampleWidgetFileChange: (widgetFileName: string) => void
  onActiveFileChange: (file: EditorFile) => void
  onDataSourceChange: (nextSource: string) => void
  onWidgetSourceChange: (nextSource: string) => void
  widgetSource: string
}

export function WidgetEditor({
  activeFile,
  dataSource,
  exampleId,
  exampleWidgetFile,
  exampleWidgetFiles,
  examples,
  isExampleLoading,
  onExampleChange,
  onExampleWidgetFileChange,
  onActiveFileChange,
  onDataSourceChange,
  onWidgetSourceChange,
  widgetSource,
}: WidgetEditorProps) {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null)
  const isWidgetTab = activeFile === 'widget'
  const resolvedWidgetFileName = exampleWidgetFile || 'widget.tsx'
  const filename = isWidgetTab ? resolvedWidgetFileName : 'data.json'

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    window.requestAnimationFrame(() => {
      editorRef.current?.focus()
    })
  }, [activeFile])

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor
    window.requestAnimationFrame(() => {
      editor.focus()
    })
  }

  return (
    <div className="panel editor-panel">
      <div className="panel-header">
        <h2>Editor</h2>
        <div className="editor-header-controls">
          <div className="editor-example-picker">
            <select
              aria-label="Select example"
              className="editor-example-select"
              disabled={isExampleLoading}
              id="example-select"
              onChange={(event) => onExampleChange(event.target.value)}
              value={exampleId}
            >
              <option value="">Select example...</option>
              {examples.map((example) => (
                <option key={example.id} value={example.id}>
                  {example.name}
                </option>
              ))}
            </select>
          </div>
          <div className="editor-example-picker">
            <select
              aria-label="Select widget file"
              className="editor-example-select"
              disabled={isExampleLoading || !exampleId || exampleWidgetFiles.length === 0}
              onChange={(event) => onExampleWidgetFileChange(event.target.value)}
              value={exampleWidgetFile}
            >
              <option value="">{exampleId ? 'Select .tsx file...' : 'Pick folder first'}</option>
              {exampleWidgetFiles.map((widgetFileName) => (
                <option key={widgetFileName} value={widgetFileName}>
                  {widgetFileName}
                </option>
              ))}
            </select>
          </div>
          <div className="editor-file-tabs">
            <button
              className={`editor-file-tab${isWidgetTab ? ' is-active' : ''}`}
              onClick={() => onActiveFileChange('widget')}
              type="button"
            >
              widget.tsx
            </button>
            <button
              className={`editor-file-tab${!isWidgetTab ? ' is-active' : ''}`}
              onClick={() => onActiveFileChange('data')}
              type="button"
            >
              data.json
            </button>
          </div>
        </div>
        <span className="filename">{filename}</span>
      </div>
      <div className="panel-body">
        <Editor
          defaultLanguage={isWidgetTab ? 'typescript' : 'json'}
          language={isWidgetTab ? 'typescript' : 'json'}
          onMount={handleEditorMount}
          onChange={(value) => {
            if (isWidgetTab) {
              onWidgetSourceChange(value ?? '')
              return
            }
            onDataSourceChange(value ?? '')
          }}
          options={{
            automaticLayout: true,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
          path={filename}
          theme="vs-light"
          value={isWidgetTab ? widgetSource : dataSource}
        />
      </div>
    </div>
  )
}
