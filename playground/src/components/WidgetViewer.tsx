import { type ComponentType, type ErrorInfo, type MouseEvent as ReactMouseEvent, type ReactNode, useEffect, useState } from 'react'
import { Component, createElement } from 'react'

interface WidgetViewerProps {
  compileError: string | null
  component: ComponentType | null
}

interface RuntimeBoundaryState {
  error: string | null
}

type ResizeDirection = 'e' | 'n' | 'ne' | 'nw' | 's' | 'se' | 'sw' | 'w'

interface FrameSize {
  height: number
  width: number
}

interface ResizeSession {
  direction: ResizeDirection
  startMouseX: number
  startMouseY: number
  startSize: FrameSize
}

const RESIZE_DIRECTIONS: ResizeDirection[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']
const DEFAULT_MODAL_WIDTH = 960
const DEFAULT_MODAL_HEIGHT = 620
const MIN_MODAL_WIDTH = 360
const MIN_MODAL_HEIGHT = 260
const MODAL_MARGIN = 24

function getBounds() {
  if (typeof window === 'undefined') {
    return {
      maxHeight: DEFAULT_MODAL_HEIGHT,
      maxWidth: DEFAULT_MODAL_WIDTH,
      minHeight: MIN_MODAL_HEIGHT,
      minWidth: MIN_MODAL_WIDTH,
    }
  }

  const maxWidth = Math.max(260, window.innerWidth - MODAL_MARGIN * 2)
  const maxHeight = Math.max(220, window.innerHeight - MODAL_MARGIN * 2)

  return {
    maxHeight,
    maxWidth,
    minHeight: Math.min(MIN_MODAL_HEIGHT, maxHeight),
    minWidth: Math.min(MIN_MODAL_WIDTH, maxWidth),
  }
}

function clampFrameSize(size: FrameSize): FrameSize {
  const bounds = getBounds()
  return {
    height: Math.max(bounds.minHeight, Math.min(bounds.maxHeight, size.height)),
    width: Math.max(bounds.minWidth, Math.min(bounds.maxWidth, size.width)),
  }
}

function getDefaultFrameSize(): FrameSize {
  return clampFrameSize({
    height: DEFAULT_MODAL_HEIGHT,
    width: DEFAULT_MODAL_WIDTH,
  })
}

function getCursorByDirection(direction: ResizeDirection): string {
  switch (direction) {
    case 'n':
    case 's':
      return 'ns-resize'
    case 'e':
    case 'w':
      return 'ew-resize'
    case 'ne':
    case 'sw':
      return 'nesw-resize'
    case 'nw':
    case 'se':
      return 'nwse-resize'
  }
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [frameSize, setFrameSize] = useState<FrameSize>(() => getDefaultFrameSize())
  const [resizeSession, setResizeSession] = useState<ResizeSession | null>(null)
  const modalOpenDisabled = Boolean(compileError) || !component

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    const handleWindowResize = () => {
      setFrameSize((prev) => clampFrameSize(prev))
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setResizeSession(null)
        setIsModalOpen(false)
      }
    }

    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!resizeSession) {
      return
    }

    const previousUserSelect = document.body.style.userSelect
    const previousCursor = document.body.style.cursor

    document.body.style.userSelect = 'none'
    document.body.style.cursor = getCursorByDirection(resizeSession.direction)

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - resizeSession.startMouseX
      const deltaY = event.clientY - resizeSession.startMouseY

      let nextWidth = resizeSession.startSize.width
      let nextHeight = resizeSession.startSize.height

      if (resizeSession.direction.includes('e')) {
        nextWidth += deltaX
      }
      if (resizeSession.direction.includes('w')) {
        nextWidth -= deltaX
      }
      if (resizeSession.direction.includes('s')) {
        nextHeight += deltaY
      }
      if (resizeSession.direction.includes('n')) {
        nextHeight -= deltaY
      }

      setFrameSize(clampFrameSize({ height: nextHeight, width: nextWidth }))
    }

    const handleMouseUp = () => {
      setResizeSession(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.body.style.userSelect = previousUserSelect
      document.body.style.cursor = previousCursor
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizeSession])

  const openModal = () => {
    setFrameSize(getDefaultFrameSize())
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setResizeSession(null)
    setIsModalOpen(false)
  }

  const startResize = (direction: ResizeDirection, event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    setResizeSession({
      direction,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      startSize: frameSize,
    })
  }

  const renderWidget = (stageClassName: string): ReactNode => {
    if (compileError) {
      return (
        <div className="error-panel">
          <h3>Compile Error</h3>
          <pre>{compileError}</pre>
        </div>
      )
    }

    if (!component) {
      return <div className="empty-state">Write a valid default component export in widget.tsx to render it.</div>
    }

    return (
      <div className={stageClassName}>
        <RuntimeBoundary>{createElement(component)}</RuntimeBoundary>
      </div>
    )
  }

  return (
    <div className="panel viewer-panel">
      <div className="panel-header">
        <h2>Widget Viewer</h2>
        <button
          className="viewer-modal-trigger"
          disabled={modalOpenDisabled}
          onClick={openModal}
          type="button"
        >
          Responsive Preview
        </button>
      </div>
      <div className="panel-body viewer-body">{renderWidget('viewer-widget-stage')}</div>

      {isModalOpen ? (
        <div className="widget-modal-backdrop" role="dialog" aria-modal="true">
          <div className="widget-modal-shell">
            <div className="widget-modal-toolbar">
              <span className="widget-modal-size">
                {Math.round(frameSize.width)} x {Math.round(frameSize.height)}
              </span>
              <button className="widget-modal-close" onClick={closeModal} type="button">
                Close
              </button>
            </div>
            <div
              className={`widget-modal-frame${resizeSession ? ' is-resizing' : ''}`}
              style={{
                height: `${frameSize.height}px`,
                width: `${frameSize.width}px`,
              }}
            >
              <div className="widget-modal-content">{renderWidget('widget-modal-widget-stage')}</div>
              {RESIZE_DIRECTIONS.map((direction) => (
                <div
                  className={`resize-handle resize-handle-${direction}`}
                  key={direction}
                  onMouseDown={(event) => startResize(direction, event)}
                  role="presentation"
                />
              ))}
            </div>
            <p className="widget-modal-hint">
              Drag the edges or corners to inspect responsive behavior. The preview stays centered.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
