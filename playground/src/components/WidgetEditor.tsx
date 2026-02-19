import Editor from '@monaco-editor/react'

type EditorFile = 'data' | 'widget'

interface WidgetEditorProps {
  activeFile: EditorFile
  dataSource: string
  onActiveFileChange: (file: EditorFile) => void
  onDataSourceChange: (nextSource: string) => void
  onWidgetSourceChange: (nextSource: string) => void
  widgetSource: string
}

export function WidgetEditor({
  activeFile,
  dataSource,
  onActiveFileChange,
  onDataSourceChange,
  onWidgetSourceChange,
  widgetSource,
}: WidgetEditorProps) {
  const isWidgetTab = activeFile === 'widget'
  const filename = isWidgetTab ? 'widget.tsx' : 'data.json'

  return (
    <div className="panel editor-panel">
      <div className="panel-header">
        <h2>Editor</h2>
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
        <span className="filename">{filename}</span>
      </div>
      <div className="panel-body">
        <Editor
          defaultLanguage={isWidgetTab ? 'typescript' : 'json'}
          language={isWidgetTab ? 'typescript' : 'json'}
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
