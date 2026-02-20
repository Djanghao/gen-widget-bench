import data from './data.json'

type Task = {
  id: string
  title: string
  completed: boolean
  priority: number
  dueISO: string | null
}

type ReminderData = {
  listName: string
  date: {
    day: number
    month: string
    year: number
  }
  tasks: Task[]
}

const reminders = data as ReminderData

const monthMap: Record<string, string> = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12',
}

function scoreTask(task: Task, now: Date) {
  if (task.completed) return 4
  if (!task.dueISO) return 3
  const due = new Date(task.dueISO)
  if (due.getTime() < now.getTime()) return 0
  const sameDay =
    due.getFullYear() === now.getFullYear() && due.getMonth() === now.getMonth() && due.getDate() === now.getDate()
  if (sameDay) return 1
  return 2
}

export default function Widget() {
  const month = monthMap[reminders.date.month] ?? '01'
  const day = String(reminders.date.day).padStart(2, '0')
  const now = new Date(`${reminders.date.year}-${month}-${day}T12:00:00-08:00`)

  const sorted = [...reminders.tasks].sort((a, b) => {
    const scoreA = scoreTask(a, now)
    const scoreB = scoreTask(b, now)
    if (scoreA !== scoreB) return scoreA - scoreB
    if (a.priority !== b.priority) return a.priority - b.priority
    if (!a.dueISO && !b.dueISO) return a.title.localeCompare(b.title)
    if (!a.dueISO) return 1
    if (!b.dueISO) return -1
    return new Date(a.dueISO).getTime() - new Date(b.dueISO).getTime()
  })

  const visible = sorted.slice(0, 7)
  const completedCount = reminders.tasks.filter((task) => task.completed).length

  return (
    <section
      style={{
        background: '#f0f0f3',
        border: '1px solid #d0d1d7',
        borderRadius: 24,
        color: '#2a2d34',
        display: 'grid',
        gap: 10,
        maxWidth: 780,
        padding: 18,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'end', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid', gap: 1 }}>
          <strong style={{ fontSize: 56, fontWeight: 500, lineHeight: 0.85 }}>{reminders.date.day}</strong>
          <span style={{ color: '#ff453a', fontSize: 42, fontWeight: 700, letterSpacing: '0.01em' }}>
            {reminders.listName}
          </span>
        </div>
        <div style={{ color: '#5a6070', fontSize: 16, fontWeight: 600 }}>
          {completedCount}/{reminders.tasks.length} done
        </div>
      </header>

      <div style={{ borderTop: '3px solid #c4c5cb', display: 'grid', gap: 6, paddingTop: 10 }}>
        {visible.map((task) => {
          const overdue = scoreTask(task, now) === 0
          return (
            <article
              key={task.id}
              style={{
                alignItems: 'center',
                borderBottom: '1px dashed #cdced6',
                color: task.completed ? '#9ba1ae' : overdue ? '#ca2f2f' : '#3f444d',
                display: 'grid',
                gap: 12,
                gridTemplateColumns: '34px minmax(0, 1fr)',
                padding: '2px 0 8px',
              }}
            >
              <span
                style={{
                  border: `3px solid ${task.completed ? '#b7bcc8' : overdue ? '#ff3b30' : '#bfc3cf'}`,
                  borderRadius: '50%',
                  display: 'inline-grid',
                  height: 24,
                  placeItems: 'center',
                  width: 24,
                }}
              >
                {task.completed ? (
                  <span
                    style={{
                      background: '#b7bcc8',
                      borderRadius: '50%',
                      display: 'block',
                      height: 10,
                      width: 10,
                    }}
                  />
                ) : null}
              </span>
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.04,
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}

