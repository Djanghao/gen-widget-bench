import data from './data.json'

type WeatherData = {
  city: string
  condition: string
  current: {
    tempF: number
    feelsF: number
    highF: number
    lowF: number
    humidityPct: number
    windMph: number
    icon: string
  }
  hourly: Array<{
    time: string
    tempF: number | null
    precipPct: number
    icon: string
  }>
  alerts: Array<{
    level: string
    title: string
    untilISO: string
  }>
}

const weather = data as WeatherData

function iconGlyph(icon: string) {
  if (icon.includes('moon')) return '◔'
  if (icon.includes('sun')) return '◉'
  return '◌'
}

export default function Widget() {
  const alert = weather.alerts[0]

  return (
    <section
      style={{
        background:
          'radial-gradient(circle at 18% 12%, rgba(75, 132, 255, 0.48) 0%, rgba(15, 25, 56, 0.95) 52%, #0a0f22 100%)',
        borderRadius: 24,
        color: '#f8fbff',
        display: 'grid',
        gap: 10,
        maxWidth: 360,
        overflow: 'hidden',
        padding: 14,
        width: '100%',
      }}
    >
      {alert ? (
        <div
          style={{
            background: 'rgba(255, 196, 102, 0.2)',
            border: '1px solid rgba(255, 196, 102, 0.5)',
            borderRadius: 10,
            color: '#ffe7b8',
            fontSize: 11,
            fontWeight: 600,
            padding: '6px 8px',
          }}
        >
          {alert.title}
        </div>
      ) : null}

      <header style={{ alignItems: 'start', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid', gap: 2 }}>
          <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{weather.current.tempF}F</div>
          <div style={{ color: '#dbe7ff', fontSize: 12 }}>
            H:{weather.current.highF}F L:{weather.current.lowF}F
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, lineHeight: 1 }}>{iconGlyph(weather.current.icon)}</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{weather.city}</div>
          <div style={{ color: '#dbe7ff', fontSize: 12 }}>{weather.condition}</div>
        </div>
      </header>

      <div style={{ color: '#b7cdfb', display: 'flex', fontSize: 11, gap: 12 }}>
        <span>Feels {weather.current.feelsF}F</span>
        <span>Humidity {weather.current.humidityPct}%</span>
        <span>Wind {weather.current.windMph}mph</span>
      </div>

      <div style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
        {weather.hourly.slice(0, 6).map((hour) => (
          <div
            key={hour.time}
            style={{
              background: 'rgba(11, 21, 45, 0.5)',
              border: '1px solid rgba(143, 181, 255, 0.22)',
              borderRadius: 10,
              display: 'grid',
              gap: 4,
              justifyItems: 'center',
              padding: '6px 4px',
            }}
          >
            <span style={{ color: '#bbd0ff', fontSize: 10 }}>{hour.time}</span>
            <span style={{ fontSize: 13, lineHeight: 1 }}>{iconGlyph(hour.icon)}</span>
            <strong style={{ fontSize: 12, lineHeight: 1 }}>{hour.tempF == null ? '--' : `${hour.tempF}F`}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

