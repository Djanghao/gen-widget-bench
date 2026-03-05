import { CalendarDays, CheckCircle2, Clock, Target } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import data from './data.json'

type Task = {
  name: string
  assignee: string
  assigneeColor: string
  category: string
  startWeek: number
  durationWeeks: number
  progressPct: number
  status: string
  indent: number
}

type Milestone = {
  name: string
  week: number
  date: string
}

type ProjectData = {
  projectName: string
  subtitle: string
  dateRange: string
  progressPct: number
  months: string[]
  tasks: Task[]
  milestones: Milestone[]
  summary: { totalTasks: number; completed: number; inProgress: number; onTrackPct: number }
  categoryColors: Record<string, string>
  todayWeek: number
  taskDateRanges: string[]
  team: Array<{ initials: string; name: string; role: string; color: string }>
}

const project = data as ProjectData

const totalWeeks = 16
const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  Complete: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', text: '#4ade80' },
  'In Progress': { bg: 'rgba(96,165,250,0.15)', border: 'rgba(96,165,250,0.4)', text: '#93c5fd' },
  'Not Started': { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)', text: '#94a3b8' },
}

export default function Widget() {
  const radialData = [{ value: project.progressPct }]

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 480,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div data-eid="header-left" style={{ display: 'grid', gap: 2 }}>
          <div data-eid="project-name" style={{ fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CalendarDays size={20} color="#818cf8" />
            {project.projectName}
          </div>
          <div data-eid="project-subtitle" style={{ fontSize: 12, color: '#94a3b8' }}>{project.subtitle}</div>
        </div>
        <div data-eid="header-right" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div data-eid="progress-ring" style={{ width: 52, height: 52, position: 'relative' }}>
            <ResponsiveContainer width={52} height={52}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                data={radialData}
                startAngle={90}
                endAngle={-270}
                barSize={6}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={4}
                  fill="#818cf8"
                  background={{ fill: 'rgba(255,255,255,0.08)' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 11, fontWeight: 700, color: '#c7d2fe' }}>
              {project.progressPct}%
            </div>
          </div>
          <div data-eid="date-range" style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} color="#94a3b8" />
            {project.dateRange}
          </div>
        </div>
      </header>

      {/* Legend Row */}
      <div data-eid="legend-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['design', 'dev', 'qa', 'launch'] as const).map((cat) => {
          const labels: Record<string, string> = { design: 'Design', dev: 'Development', qa: 'QA', launch: 'Launch' }
          return (
            <span
              key={cat}
              data-eid={`legend-${cat}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 10,
                color: '#cbd5e1',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: project.categoryColors[cat], display: 'inline-block' }} />
              {labels[cat]}
            </span>
          )
        })}
      </div>

      {/* Timeline Column Headers */}
      <div
        data-eid="timeline-header"
        style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr 1fr 1fr 1fr',
          gap: 0,
          borderBottom: '1px solid rgba(148,163,184,0.15)',
          paddingBottom: 6,
        }}
      >
        <span data-eid="timeline-col-task" style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Task</span>
        {project.months.map((m, i) => (
          <span key={m} data-eid={`timeline-col-${m.toLowerCase()}`} style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {m}
          </span>
        ))}
      </div>

      {/* Timeline Grid with Tasks */}
      <div data-eid="timeline-grid" style={{ display: 'grid', gap: 6, position: 'relative' }}>
        {project.tasks.map((task, i) => {
          const barLeft = `${(task.startWeek / totalWeeks) * 100}%`
          const barWidth = `${(task.durationWeeks / totalWeeks) * 100}%`
          const sc = statusColors[task.status] || statusColors['Not Started']
          const catColor = project.categoryColors[task.category]

          return (
            <div
              key={i}
              data-eid={`task-${i}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                alignItems: 'center',
                gap: 8,
                padding: '4px 0',
                borderBottom: '1px solid rgba(148,163,184,0.06)',
              }}
            >
              {/* Task name + avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: task.indent * 12 }}>
                <span
                  data-eid={`task-${i}-avatar`}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: task.assigneeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 8,
                    fontWeight: 700,
                    color: '#0f172a',
                    flexShrink: 0,
                  }}
                >
                  {task.assignee}
                </span>
                <span data-eid={`task-${i}-name`} style={{ fontSize: 11, fontWeight: 500, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {task.name}
                </span>
              </div>

              {/* Gantt bar area */}
              <div style={{ position: 'relative', height: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 4 }}>
                {/* Vertical grid lines for months */}
                {[0.25, 0.5, 0.75].map((p) => (
                  <div key={p} style={{ position: 'absolute', left: `${p * 100}%`, top: 0, bottom: 0, width: 1, background: 'rgba(148,163,184,0.08)' }} />
                ))}
                <div
                  data-eid={`task-${i}-bar`}
                  style={{
                    position: 'absolute',
                    left: barLeft,
                    width: barWidth,
                    top: 2,
                    bottom: 2,
                    background: `${catColor}33`,
                    border: `1px solid ${catColor}55`,
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    data-eid={`task-${i}-bar-fill`}
                    style={{
                      height: '100%',
                      width: `${task.progressPct}%`,
                      background: `${catColor}aa`,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>

              {/* Status badge + date range */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span
                  data-eid={`task-${i}-status`}
                  style={{
                    background: sc.bg,
                    border: `1px solid ${sc.border}`,
                    borderRadius: 8,
                    color: sc.text,
                    fontSize: 9,
                    fontWeight: 600,
                    padding: '2px 6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {task.status}
                </span>
                <span
                  data-eid={`task-${i}-dates`}
                  style={{ fontSize: 8, color: '#64748b', whiteSpace: 'nowrap' }}
                >
                  {project.taskDateRanges[i]}
                </span>
              </div>
            </div>
          )
        })}

        {/* Milestones */}
        {project.milestones.map((ms, i) => {
          const left = `${(ms.week / totalWeeks) * 100}%`
          return (
            <div
              key={i}
              data-eid={`milestone-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                paddingLeft: 120,
              }}
            >
              <div style={{ position: 'relative', flex: 1, height: 20 }}>
                <div style={{ position: 'absolute', left, top: '50%', transform: 'translate(-50%, -50%) rotate(45deg)', width: 10, height: 10, background: '#fbbf24', border: '2px solid #f59e0b' }} />
                <span
                  data-eid={`milestone-${i}-label`}
                  style={{
                    position: 'absolute',
                    left,
                    top: '50%',
                    transform: 'translate(10px, -50%)',
                    fontSize: 9,
                    color: '#fbbf24',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ms.name} ({ms.date})
                </span>
              </div>
            </div>
          )
        })}

        {/* Today Marker */}
        <div
          data-eid="today-marker"
          style={{
            position: 'absolute',
            left: `calc(120px + ${(project.todayWeek / totalWeeks) * 100}% * (1 - 120 / 480))`,
            top: 0,
            bottom: 0,
            width: 2,
            background: '#ef4444',
            opacity: 0.6,
            zIndex: 2,
          }}
        >
          <span
            data-eid="today-label"
            style={{
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 8,
              color: '#ef4444',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Today
          </span>
        </div>
      </div>

      {/* Team Section */}
      <div data-eid="team-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="team-title" style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>Team</div>
        {project.team.map((member, i) => (
          <div
            key={i}
            data-eid={`team-member-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 0',
            }}
          >
            <span
              data-eid={`team-member-${i}-avatar`}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: member.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              {member.initials}
            </span>
            <span data-eid={`team-member-${i}-name`} style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{member.name}</span>
            <span data-eid={`team-member-${i}-role`} style={{ fontSize: 10, color: '#94a3b8' }}>{member.role}</span>
          </div>
        ))}
      </div>

      {/* Summary Row */}
      <div
        data-eid="summary-row"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          borderTop: '1px solid rgba(148,163,184,0.15)',
          paddingTop: 10,
        }}
      >
        <div data-eid="summary-total" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#c7d2fe' }}>{project.summary.totalTasks}</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>Tasks</div>
        </div>
        <div data-eid="summary-completed" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#4ade80' }}>{project.summary.completed}</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>Done</div>
        </div>
        <div data-eid="summary-in-progress" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#60a5fa' }}>{project.summary.inProgress}</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>Active</div>
        </div>
        <div data-eid="summary-on-track" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fbbf24' }}>{project.summary.onTrackPct}%</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>On Track</div>
        </div>
      </div>
    </section>
  )
}
