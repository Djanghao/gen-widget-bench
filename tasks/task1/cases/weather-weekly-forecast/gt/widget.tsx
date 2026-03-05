import data from './data.json'
import { Sun, Cloud, CloudRain, CloudSun, Sunrise, Sunset, Droplets, ShieldAlert } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type WeatherDay = {
  name: string
  high: number
  low: number
  precipPct: number
  icon: string
}

type ForecastData = {
  city: string
  currentTemp: number
  condition: string
  days: WeatherDay[]
  sunrise: string
  sunset: string
  humidity: number
  uvIndex: number
}

const forecast = data as ForecastData

function WeatherIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const props = { size, strokeWidth: 1.8 }
  switch (icon) {
    case 'sun': return <Sun {...props} color="#facc15" />
    case 'cloud': return <Cloud {...props} color="#94a3b8" />
    case 'cloud-rain': return <CloudRain {...props} color="#60a5fa" />
    case 'cloud-sun': return <CloudSun {...props} color="#fbbf24" />
    default: return <Sun {...props} color="#facc15" />
  }
}

export default function Widget() {
  const chartData = forecast.days.map(d => ({
    name: d.name,
    high: d.high,
    low: d.low,
  }))

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)',
        borderRadius: 22,
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        maxWidth: 440,
        overflow: 'hidden',
        padding: 18,
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div data-eid="city-name" style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 600 }}>
            {forecast.city}
          </div>
          <div
            data-eid="current-temp"
            style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}
          >
            {forecast.currentTemp}°F
          </div>
        </div>
        <div style={{ alignItems: 'center', display: 'flex', gap: 6, marginTop: 6 }}>
          <span data-eid="condition-icon">
            <WeatherIcon icon="cloud-sun" size={22} />
          </span>
          <div data-eid="condition-text" style={{ color: '#a5b4fc', fontSize: 13, fontWeight: 500 }}>
            {forecast.condition}
          </div>
        </div>
      </header>

      <div
        data-eid="temp-chart"
        style={{
          background: 'rgba(15, 23, 42, 0.5)',
          borderRadius: 14,
          padding: '12px 4px 4px 0',
        }}
      >
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={chartData} margin={{ top: 5, right: 16, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 8,
                color: '#e2e8f0',
                fontSize: 11,
              }}
            />
            <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2.5} dot={{ fill: '#f97316', r: 3 }} name="High" />
            <Line type="monotone" dataKey="low" stroke="#38bdf8" strokeWidth={2.5} dot={{ fill: '#38bdf8', r: 3 }} name="Low" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        data-eid="day-grid"
        style={{
          display: 'grid',
          gap: 5,
          gridTemplateColumns: 'repeat(7, 1fr)',
        }}
      >
        {forecast.days.map((day, i) => (
          <div
            key={day.name}
            data-eid={`day-${i}`}
            style={{
              alignItems: 'center',
              background: 'rgba(30, 27, 75, 0.4)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: '8px 4px',
            }}
          >
            <span
              data-eid={`day-${i}-name`}
              style={{ color: '#94a3b8', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}
            >
              {day.name}
            </span>
            <span data-eid={i <= 1 ? `day-${i}-icon` : undefined}>
              <WeatherIcon icon={day.icon} size={16} />
            </span>
            <span
              data-eid={`day-${i}-high`}
              style={{ color: '#f8fafc', fontSize: 12, fontWeight: 700 }}
            >
              {day.high}°
            </span>
            <span
              data-eid={i <= 1 ? `day-${i}-low` : undefined}
              style={{ color: '#64748b', fontSize: 11 }}
            >
              {day.low}°
            </span>
            {i <= 1 && (
              <span
                data-eid={`day-${i}-precip`}
                style={{ color: '#60a5fa', fontSize: 9 }}
              >
                {day.precipPct}%
              </span>
            )}
          </div>
        ))}
      </div>

      <div data-eid="footer-divider" style={{ background: 'rgba(71, 85, 105, 0.3)', height: 1 }} />

      <footer
        data-eid="footer"
        style={{
          color: '#64748b',
          display: 'grid',
          fontSize: 11,
          gap: 8,
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Sunrise size={14} color="#f59e0b" />
          <span style={{ color: '#94a3b8', fontSize: 9 }}>Sunrise</span>
          <span data-eid="sunrise-time" style={{ color: '#e2e8f0', fontWeight: 600 }}>
            {forecast.sunrise}
          </span>
        </div>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Sunset size={14} color="#f97316" />
          <span style={{ color: '#94a3b8', fontSize: 9 }}>Sunset</span>
          <span data-eid="sunset-time" style={{ color: '#e2e8f0', fontWeight: 600 }}>
            {forecast.sunset}
          </span>
        </div>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Droplets size={14} color="#38bdf8" />
          <span style={{ color: '#94a3b8', fontSize: 9 }}>Humidity</span>
          <span data-eid="humidity-value" style={{ color: '#e2e8f0', fontWeight: 600 }}>
            {forecast.humidity}%
          </span>
        </div>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ShieldAlert size={14} color="#a78bfa" />
          <span style={{ color: '#94a3b8', fontSize: 9 }}>UV Index</span>
          <span data-eid="uv-index" style={{ color: '#e2e8f0', fontWeight: 600 }}>
            {forecast.uvIndex}
          </span>
        </div>
      </footer>
    </section>
  )
}
