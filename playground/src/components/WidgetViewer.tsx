import { type ComponentType, type ErrorInfo, type ReactNode } from 'react'
import { Component, createElement } from 'react'

interface WidgetViewerProps {
  compileError: string | null
  component: ComponentType | null
}

interface RuntimeBoundaryState {
  error: string | null
}

class RuntimeBoundary extends Component<{ children: ReactNode }, RuntimeBoundaryState> {
  override state: RuntimeBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): RuntimeBoundaryState {
    return {
      error: error.message,
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Intentionally empty. UI state handles runtime error display.
    void error
    void errorInfo
  }

  override componentDidUpdate(prevProps: { children: ReactNode }): void {
    if (prevProps.children !== this.props.children && this.state.error) {
      this.setState({ error: null })
    }
  }

  override render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="error-panel">
          <h3>Runtime Error</h3>
          <pre>{this.state.error}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

export function WidgetViewer({ compileError, component }: WidgetViewerProps) {
  return (
    <div className="panel viewer-panel">
      <div className="panel-header">
        <h2>Widget Viewer</h2>
      </div>
      <div className="panel-body viewer-body">
        {compileError ? (
          <div className="error-panel">
            <h3>Compile Error</h3>
            <pre>{compileError}</pre>
          </div>
        ) : null}
        {!compileError && !component ? (
          <div className="empty-state">Write a valid default component export in widget.tsx to render it.</div>
        ) : null}
        {!compileError && component ? (
          <RuntimeBoundary>{createElement(component)}</RuntimeBoundary>
        ) : null}
      </div>
    </div>
  )
}
