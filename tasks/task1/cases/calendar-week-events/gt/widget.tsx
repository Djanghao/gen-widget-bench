import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import data from './data.json'

type CalendarData = {
  month: string
  weekNumber: number
  currentDayIndex: number
  days: Array<{ name: string; date: number }>
  timeSlots: string[]
  events: Array<{
    id: number
    title: string
    dayIndex: number
    startHour: number
    startMin: number
    endHour: number
    endMin: number
    category: string
  }>
  categories: Record<string, string>
}

const cal = data as CalendarData

const START_HOUR = 8
const END_HOUR = 18
const HOUR_HEIGHT = 44
const TOTAL_HOURS = END_HOUR - START_HOUR
const GRID_HEIGHT = TOTAL_HOURS * HOUR_HEIGHT

function formatEventTime(h: number, m: number) {
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return m === 0 ? `${h12} ${ampm}` : `${h12}:${m.toString().padStart(2, '0')} ${ampm}`
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1a1040 40%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 10,
        maxWidth: 480,
        padding: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <Calendar size={18} color="#a78bfa" />
        <div data-eid="month-title" style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>
          {cal.month}
        </div>
        <span
          data-eid="week-badge"
          style={{
            background: 'rgba(167,139,250,0.15)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: 10,
            color: '#c4b5fd',
            fontSize: 11,
            fontWeight: 600,
            padding: '2px 8px',
          }}
        >
          W{cal.weekNumber}
        </span>
        <span data-eid="nav-prev" style={{ cursor: 'pointer', display: 'inline-flex', padding: 2 }}>
          <ChevronLeft size={18} color="#94a3b8" />
        </span>
        <span data-eid="nav-next" style={{ cursor: 'pointer', display: 'inline-flex', padding: 2 }}>
          <ChevronRight size={18} color="#94a3b8" />
        </span>
      </header>

      {/* Day Headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '40px repeat(5, 1fr)', gap: 2 }}>
        <div />
        {cal.days.map((day, i) => (
          <div
            key={day.name}
            data-eid={`day-col-${i}`}
            style={{
              textAlign: 'center',
              padding: '4px 0',
              borderRadius: 8,
              background: i === cal.currentDayIndex ? 'rgba(167,139,250,0.2)' : 'transparent',
              border: i === cal.currentDayIndex ? '1px solid rgba(167,139,250,0.3)' : '1px solid transparent',
            }}
          >
            <div style={{ fontSize: 10, color: i === cal.currentDayIndex ? '#c4b5fd' : '#64748b', fontWeight: 500 }}>
              {day.name}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: i === cal.currentDayIndex ? '#e9d5ff' : '#cbd5e1' }}>
              {day.date}
            </div>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', position: 'relative' }}>
        {/* Time Axis */}
        <div
          data-eid="time-axis"
          style={{ display: 'flex', flexDirection: 'column', height: GRID_HEIGHT }}
        >
          {cal.timeSlots.map((slot, i) => {
            const eidMap: Record<string, string> = {
              '8 AM': 'time-8am', '9 AM': 'time-9am', '10 AM': 'time-10am',
              '11 AM': 'time-11am', '12 PM': 'time-12pm', '1 PM': 'time-1pm',
              '2 PM': 'time-2pm', '3 PM': 'time-3pm', '4 PM': 'time-4pm',
              '5 PM': 'time-5pm', '6 PM': 'time-6pm',
            }
            return (
              <span
                key={slot}
                data-eid={eidMap[slot]}
                style={{
                  color: '#64748b',
                  fontSize: 9,
                  height: HOUR_HEIGHT,
                  lineHeight: `${HOUR_HEIGHT}px`,
                  textAlign: 'right',
                  paddingRight: 6,
                }}
              >
                {slot}
              </span>
            )
          })}
        </div>

        {/* Day Columns with Events */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, position: 'relative', height: GRID_HEIGHT }}>
          {cal.days.map((_, di) => (
            <div
              key={di}
              style={{
                position: 'relative',
                borderLeft: '1px solid rgba(148,163,184,0.08)',
                height: '100%',
              }}
            >
              {/* Hour gridlines */}
              {cal.timeSlots.map((_, hi) => (
                <div
                  key={hi}
                  style={{
                    position: 'absolute',
                    top: hi * HOUR_HEIGHT,
                    left: 0,
                    right: 0,
                    borderTop: '1px solid rgba(148,163,184,0.06)',
                    height: 1,
                  }}
                />
              ))}

              {/* Events for this day */}
              {cal.events
                .filter((e) => e.dayIndex === di)
                .map((event) => {
                  const topOffset = ((event.startHour - START_HOUR) + event.startMin / 60) * HOUR_HEIGHT
                  const durationHours = (event.endHour - event.startHour) + (event.endMin - event.startMin) / 60
                  const height = durationHours * HOUR_HEIGHT
                  const color = cal.categories[event.category] || '#6366f1'

                  return (
                    <div
                      key={event.id}
                      data-eid={`event-${event.id}`}
                      style={{
                        position: 'absolute',
                        top: topOffset,
                        left: 2,
                        right: 2,
                        height: height - 2,
                        background: `${color}22`,
                        borderLeft: `3px solid ${color}`,
                        borderRadius: 6,
                        padding: '3px 4px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: 9, fontWeight: 600, color, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {event.title}
                      </div>
                      <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 1 }}>
                        {formatEventTime(event.startHour, event.startMin)}
                      </div>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div data-eid="legend" style={{ display: 'flex', gap: 14, justifyContent: 'center', paddingTop: 4 }}>
        {Object.entries(cal.categories).map(([name, color]) => (
          <span
            key={name}
            data-eid={`legend-${name.toLowerCase()}`}
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#94a3b8' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color as string, display: 'inline-block' }} />
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
