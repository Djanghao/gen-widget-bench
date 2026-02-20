import data from './data.json'

type EventItem = {
  id: string
  title: string
  startISO: string
  endISO: string
  calendar: string
}

type CalendarData = {
  date: {
    weekday: string
    day: number
  }
  events: EventItem[]
  emptyMessage: string
}

const calendar = data as CalendarData

function parseClock(iso: string): { hour12: number; minute: string; suffix: 'AM' | 'PM' } {
  const parts = iso.match(/T(\d{2}):(\d{2})/)
  if (parts) {
    const hour24 = Number(parts[1])
    const minute = parts[2]
    const suffix: 'AM' | 'PM' = hour24 >= 12 ? 'PM' : 'AM'
    const hour12 = ((hour24 + 11) % 12) + 1
    return { hour12, minute, suffix }
  }

  const d = new Date(iso)
  const hour24 = d.getHours()
  const minute = String(d.getMinutes()).padStart(2, '0')
  const suffix: 'AM' | 'PM' = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = ((hour24 + 11) % 12) + 1
  return { hour12, minute, suffix }
}

function formatTimeRange(startISO: string, endISO: string) {
  const start = parseClock(startISO)
  const end = parseClock(endISO)
  const startText = `${start.hour12}:${start.minute}`
  const endText = `${end.hour12}:${end.minute}`

  if (start.suffix === end.suffix) {
    return `${startText}-${endText}${end.suffix}`
  }

  return `${startText}${start.suffix}-${endText}${end.suffix}`
}

function colorByCalendar(name: string) {
  if (name === 'Personal') return { bar: '#cfb33b', bg: '#73620f' }
  if (name === 'Work') return { bar: '#66da78', bg: '#2c703f' }
  return { bar: '#5aaeff', bg: '#2d4f83' }
}

export default function Widget() {
  const visible = calendar.events.slice(0, 2)

  const eventCards = visible.map((event) => {
    const palette = colorByCalendar(event.calendar)
    const timeRange = formatTimeRange(event.startISO, event.endISO)

    return (
      <article
        key={event.id}
        style={{
          background: `linear-gradient(90deg, ${palette.bar} 0, ${palette.bar} 3px, ${palette.bg} 3px, ${palette.bg} 100%)`,
          borderRadius: 7,
          display: 'grid',
          gap: 3,
          minHeight: 34,
          padding: '5px 8px 4px',
        }}
      >
        <strong style={{ color: '#f5f6f9', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>{event.title}</strong>
        <span style={{ color: '#7ecbff', fontSize: 10, fontWeight: 700, lineHeight: 1 }}>{timeRange}</span>
      </article>
    )
  })

  return (
    <section
      style={{
        aspectRatio: '1 / 1',
        background: 'linear-gradient(180deg, #1d212b 0%, #1b1f29 100%)',
        borderRadius: 22,
        color: '#f4f6fb',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 160,
        overflow: 'hidden',
        padding: 12,
        width: '100%',
      }}
    >
      <header style={{ display: 'grid', gap: 2 }}>
        <span style={{ color: '#ff453a', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>
          {calendar.date.weekday}
        </span>
        <strong style={{ fontSize: 48, fontWeight: 500, lineHeight: 0.78 }}>{calendar.date.day}</strong>
      </header>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: '0.48 1 0' }} />
        <div style={{ display: 'grid', gap: 6 }}>
          {eventCards.length > 0 ? (
            eventCards
          ) : (
            <div
              style={{
                borderRadius: 7,
                color: '#a6adbc',
                fontSize: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                padding: '8px 7px',
              }}
            >
              {calendar.emptyMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
