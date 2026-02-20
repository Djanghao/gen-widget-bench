import data from './data.json'

type Departure = {
  scheduledISO: string
  delayMin: number
  canceled: boolean
  crowd: 'low' | 'mid' | 'high'
}

type Line = {
  id: string
  name: string
  destination: string
  departures: Departure[]
}

type TransitData = {
  station: string
  lines: Line[]
}

const transit = data as TransitData

function toExpectedTime(dep: Departure) {
  const expected = new Date(dep.scheduledISO)
  expected.setMinutes(expected.getMinutes() + dep.delayMin)
  return expected
}

function formatTime(date: Date) {
  const hour24 = date.getHours()
  const minute = String(date.getMinutes()).padStart(2, '0')
  const suffix = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = ((hour24 + 11) % 12) + 1
  return `${hour12}:${minute}${suffix}`
}

function nextDeparture(line: Line) {
  const valid = line.departures.filter((dep) => !dep.canceled)
  valid.sort((a, b) => toExpectedTime(a).getTime() - toExpectedTime(b).getTime())
  return valid[0] ?? null
}

function crowdTone(crowd: Departure['crowd']) {
  if (crowd === 'high') return '#ffb020'
  if (crowd === 'mid') return '#7ec7ff'
  return '#7effab'
}

export default function Widget() {
  const lines = transit.lines.slice(0, 2)

  return (
    <section
      style={{
        background:
          'radial-gradient(circle at 70% 8%, rgba(59, 111, 204, 0.62) 0%, rgba(25, 44, 93, 0.95) 45%, #14203f 100%)',
        borderRadius: 24,
        color: '#eaf1ff',
        display: 'grid',
        gap: 10,
        maxWidth: 420,
        overflow: 'hidden',
        padding: 14,
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          background:
            'repeating-linear-gradient(25deg, rgba(159, 189, 255, 0.07) 0 2px, transparent 2px 9px)',
          inset: 0,
          pointerEvents: 'none',
          position: 'absolute',
        }}
      />

      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <div style={{ color: '#bcd1ff', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Station</div>
          <strong style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{transit.station}</strong>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              border: 'none',
              borderRadius: '50%',
              color: '#fff',
              fontSize: 18,
              height: 44,
              width: 44,
            }}
            type="button"
          >
            ◯
          </button>
          <button
            style={{
              background: '#ff9a1f',
              border: 'none',
              borderRadius: '50%',
              color: '#fff',
              fontSize: 18,
              height: 44,
              width: 44,
            }}
            type="button"
          >
            ↗
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gap: 8, position: 'relative' }}>
        {lines.map((line) => {
          const dep = nextDeparture(line)
          if (!dep) {
            return (
              <article
                key={line.id}
                style={{
                  background: 'rgba(8, 17, 41, 0.64)',
                  border: '1px solid rgba(140, 173, 244, 0.3)',
                  borderRadius: 12,
                  padding: '10px 12px',
                }}
              >
                <strong style={{ display: 'block', fontSize: 14 }}>{line.name}</strong>
                <span style={{ color: '#b7c8f2', fontSize: 12 }}>No departures</span>
              </article>
            )
          }

          const expected = toExpectedTime(dep)
          const delayed = dep.delayMin > 10

          return (
            <article
              key={line.id}
              style={{
                alignItems: 'center',
                background: 'rgba(8, 17, 41, 0.64)',
                border: `1px solid ${delayed ? 'rgba(255, 145, 86, 0.72)' : 'rgba(140, 173, 244, 0.3)'}`,
                borderRadius: 12,
                display: 'grid',
                gap: 8,
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                padding: '10px 12px',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <strong style={{ display: 'block', fontSize: 14 }}>{line.name}</strong>
                <span
                  style={{
                    color: '#bed0f8',
                    display: 'block',
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {line.destination}
                </span>
                <span style={{ color: crowdTone(dep.crowd), display: 'block', fontSize: 11, marginTop: 3 }}>
                  Crowd: {dep.crowd}
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{formatTime(expected)}</div>
                <div style={{ color: delayed ? '#ff9156' : '#9dc0ff', fontSize: 11, fontWeight: 700 }}>
                  {dep.delayMin > 0 ? `+${dep.delayMin}m` : 'On time'}
                </div>
                {delayed ? (
                  <div
                    style={{
                      background: 'rgba(255, 145, 86, 0.2)',
                      borderRadius: 999,
                      color: '#ffc3a8',
                      fontSize: 10,
                      fontWeight: 700,
                      marginTop: 4,
                      padding: '2px 6px',
                    }}
                  >
                    Delayed
                  </div>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

