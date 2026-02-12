import Editor from '@monaco-editor/react'

interface WidgetEditorProps {
  onChange: (nextSource: string) => void
  source: string
}

export function WidgetEditor({ onChange, source }: WidgetEditorProps) {
  return (
    <div className="panel editor-panel">
      <div className="panel-header">
        <h2>Editor</h2>
        <span className="filename">widget.tsx</span>
      </div>
      <div className="panel-body">
        <Editor
          defaultLanguage="typescript"
          language="typescript"
          onChange={(value) => onChange(value ?? '')}
          options={{
            automaticLayout: true,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
          path="widget.tsx"
          theme="vs-light"
          value={source}
        />
      </div>
    </div>
  )
}
