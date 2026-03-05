import { LayoutDashboard, CheckCircle2 } from 'lucide-react'
import data from './data.json'

type KanbanData = {
  sprintName: string
  completionPct: number
  totalTasks: number
  columns: Array<{
    name: string
    color: string
    tasks: Array<{
      id: number
      title: string
      priority: string
      assignee: string
      assigneeColor: string
      due: string
    }>
  }>
  priorityColors: Record<string, string>
}

const board = data as KanbanData

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #0f172a 0%, #18122b 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 480,
        padding: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LayoutDashboard size={18} color="#a78bfa" />
          <div data-eid="sprint-name" style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>
            {board.sprintName}
          </div>
          <span
            data-eid="progress-pct"
            style={{ color: '#a78bfa', fontSize: 14, fontWeight: 700 }}
          >
            {board.completionPct}%
          </span>
        </div>
        <div
          data-eid="progress-bar"
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 6,
            height: 6,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
              borderRadius: 6,
              height: '100%',
              width: `${board.completionPct}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </header>

      {/* Summary */}
      <div data-eid="summary-row" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <CheckCircle2 size={14} color="#64748b" />
        <span data-eid="total-tasks" style={{ fontSize: 12, color: '#94a3b8' }}>
          {board.totalTasks} tasks
        </span>
      </div>

      {/* Columns */}
      <div
        data-eid="columns-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}
      >
        {board.columns.map((col, ci) => {
          const colEid = ci === 0 ? 'col-todo' : ci === 1 ? 'col-inprogress' : 'col-done'
          return (
            <div
              key={col.name}
              data-eid={colEid}
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 12,
                borderTop: `3px solid ${col.color}`,
                display: 'grid',
                gap: 6,
                padding: 8,
              }}
            >
              {/* Column Header */}
              <div
                data-eid={`${colEid}-header`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 4,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1' }}>{col.name}</span>
                <span
                  data-eid={`${colEid}-count`}
                  style={{
                    background: `${col.color}22`,
                    border: `1px solid ${col.color}44`,
                    borderRadius: 6,
                    color: col.color,
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 18,
                    padding: '1px 5px',
                    textAlign: 'center',
                  }}
                >
                  {col.tasks.length}
                </span>
              </div>

              {/* Task Cards */}
              {col.tasks.map((task) => {
                const pColor = board.priorityColors[task.priority] || '#94a3b8'
                const bgShade = ci === 2 ? 'rgba(34,197,94,0.04)' : ci === 1 ? 'rgba(245,158,11,0.04)' : 'rgba(99,102,241,0.04)'
                return (
                  <div
                    key={task.id}
                    data-eid={`task-${task.id}`}
                    style={{
                      background: bgShade,
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8,
                      display: 'grid',
                      gap: 5,
                      padding: '7px 8px',
                    }}
                  >
                    <div
                      data-eid={`task-${task.id}-title`}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#e2e8f0',
                        lineHeight: 1.3,
                      }}
                    >
                      {task.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span
                        data-eid={`task-${task.id}-priority`}
                        style={{
                          background: `${pColor}18`,
                          border: `1px solid ${pColor}44`,
                          borderRadius: 4,
                          color: pColor,
                          fontSize: 9,
                          fontWeight: 600,
                          padding: '1px 4px',
                        }}
                      >
                        {task.priority}
                      </span>
                      <span style={{ flex: 1 }} />
                      <div
                        data-eid={`task-${task.id}-avatar`}
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: task.assigneeColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 8,
                          fontWeight: 700,
                          color: '#fff',
                        }}
                      >
                        {task.assignee}
                      </div>
                    </div>
                    <span
                      data-eid={`task-${task.id}-due`}
                      style={{ fontSize: 9, color: '#64748b' }}
                    >
                      {task.due}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </section>
  )
}
