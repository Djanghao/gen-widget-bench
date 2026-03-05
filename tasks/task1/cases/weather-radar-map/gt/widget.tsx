import { CloudRain, AlertTriangle, Droplets, Sun, CloudLightning } from 'lucide-react'
import { ComposedChart, Line, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts'
import data from './data.json'

type ConditionData = {
  temperature: { value: number; unit: string }
  humidity: { value: number; unit: string }
  pressure: { value: number; unit: string }
  wind: { value: string; direction: string }
  visibility: { value: number; unit: string }
  dewPoint: { value: number; unit: string }
}

type HourlyData = {
  hour: string
  temp: number
  precip: number
}

type OutlookData = {
  day: string
  high: number
  low: number
  condition: string
  precip: number
}

type WidgetData = {
  city: string
  updateTime: string
  alert: string
  radarGrid: number[]
  conditions: ConditionData
  hourlyForecast: HourlyData[]
  outlook: OutlookData[]
}

const d = data as WidgetData

const intensityColors: Record<number, string> = {
  0: 'rgba(255,255,255,0.03)',
  1: 'rgba(173,216,230,0.5)',
  2: 'rgba(100,149,237,0.6)',
  3: 'rgba(30,80,200,0.7)',
  4: 'rgba(128,0,200,0.8)',
}

const conditionIcons: Record<string, React.ReactNode> = {
  'Partly Cloudy': <Sun size={14} color="#fbbf24" />,
  'Sunny': <Sun size={14} color="#fbbf24" />,
  'Scattered Storms': <CloudLightning size={14} color="#a78bfa" />,
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a2744 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 14,
        maxWidth: 460,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
      >
        <CloudRain size={20} color="#60a5fa" />
        <div data-eid="city-name" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          {d.city}
        </div>
        <span
          data-eid="update-time"
          style={{
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.updateTime}
        </span>
        <span
          data-eid="alert-badge"
          style={{
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: 12,
            color: '#fca5a5',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <AlertTriangle size={11} color="#fca5a5" />
          {d.alert}
        </span>
      </header>

      {/* Radar Grid */}
      <div
        data-eid="radar-section"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 12,
          display: 'grid',
          gap: 8,
        }}
      >
        <div
          data-eid="radar-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc' }}
        >
          Precipitation Radar
        </div>
        <div
          data-eid="radar-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 2,
          }}
        >
          {d.radarGrid.map((intensity, i) => (
            <div
              key={i}
              data-eid={`radar-cell-${i}`}
              style={{
                background: intensityColors[intensity] || intensityColors[0],
                borderRadius: 3,
                aspectRatio: '1',
                minHeight: 20,
              }}
            />
          ))}
        </div>
        <div
          data-eid="legend-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            justifyContent: 'center',
            marginTop: 4,
          }}
        >
          {[
            { label: 'None', color: 'rgba(255,255,255,0.03)', eid: 'none' },
            { label: 'Light', color: 'rgba(173,216,230,0.5)', eid: 'light' },
            { label: 'Moderate', color: 'rgba(100,149,237,0.6)', eid: 'moderate' },
            { label: 'Heavy', color: 'rgba(30,80,200,0.7)', eid: 'heavy' },
            { label: 'Severe', color: 'rgba(128,0,200,0.8)', eid: 'severe' },
          ].map((item) => (
            <span
              key={item.eid}
              data-eid={`legend-label-${item.eid}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 9,
                color: '#94a3b8',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: item.color,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'inline-block',
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Current Conditions */}
      <div
        data-eid="conditions-card"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 12,
          display: 'grid',
          gap: 8,
        }}
      >
        <div
          data-eid="conditions-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc' }}
        >
          Current Conditions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <div
            data-eid="metric-temp"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: 8,
              textAlign: 'center',
            }}
          >
            <span data-eid="metric-temp-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Temperature
            </span>
            <span data-eid="metric-temp-value" style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24' }}>
              {d.conditions.temperature.value} {d.conditions.temperature.unit}
            </span>
          </div>
          <div
            data-eid="metric-humidity"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: 8,
              textAlign: 'center',
            }}
          >
            <span data-eid="metric-humidity-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Humidity
            </span>
            <span data-eid="metric-humidity-value" style={{ fontSize: 16, fontWeight: 700, color: '#60a5fa' }}>
              {d.conditions.humidity.value}{d.conditions.humidity.unit}
            </span>
          </div>
          <div
            data-eid="metric-pressure"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: 8,
              textAlign: 'center',
            }}
          >
            <span data-eid="metric-pressure-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Pressure
            </span>
            <span data-eid="metric-pressure-value" style={{ fontSize: 16, fontWeight: 700, color: '#c7d2fe' }}>
              {d.conditions.pressure.value} <span style={{ fontSize: 10 }}>{d.conditions.pressure.unit}</span>
            </span>
          </div>
          <div
            data-eid="metric-wind"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: 8,
              textAlign: 'center',
            }}
          >
            <span data-eid="metric-wind-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Wind
            </span>
            <span data-eid="metric-wind-value" style={{ fontSize: 16, fontWeight: 700, color: '#a7f3d0' }}>
              {d.conditions.wind.value} <span style={{ fontSize: 10 }}>{d.conditions.wind.direction}</span>
            </span>
          </div>
          <div
            data-eid="metric-visibility"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: 8,
              textAlign: 'center',
            }}
          >
            <span data-eid="metric-visibility-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Visibility
            </span>
            <span data-eid="metric-visibility-value" style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>
              {d.conditions.visibility.value} {d.conditions.visibility.unit}
            </span>
          </div>
          <div
            data-eid="metric-dewpoint"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: 8,
              textAlign: 'center',
            }}
          >
            <span data-eid="metric-dewpoint-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Dew Point
            </span>
            <span data-eid="metric-dewpoint-value" style={{ fontSize: 16, fontWeight: 700, color: '#93c5fd' }}>
              {d.conditions.dewPoint.value} {d.conditions.dewPoint.unit}
            </span>
          </div>
        </div>
      </div>

      {/* 24-Hour Forecast Chart */}
      <div
        data-eid="forecast-chart"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 12,
        }}
      >
        <div
          data-eid="forecast-chart-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc', marginBottom: 8 }}
        >
          24-Hour Forecast
        </div>
        <div style={{ height: 120, width: '100%' }}>
          <ResponsiveContainer width="100%" height={120}>
            <ComposedChart data={d.hourlyForecast} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="hour" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="temp" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[65, 95]} />
              <YAxis yAxisId="precip" orientation="right" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  fontSize: 11,
                  color: '#e2e8f0',
                }}
              />
              <Bar yAxisId="precip" dataKey="precip" fill="rgba(96,165,250,0.3)" radius={[2, 2, 0, 0]} />
              <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="#fbbf24" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3-Day Outlook */}
      <div data-eid="outlook-section" style={{ display: 'grid', gap: 8 }}>
        <div
          data-eid="outlook-title"
          style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}
        >
          3-Day Outlook
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {d.outlook.map((day, i) => (
            <div
              key={i}
              data-eid={`outlook-day-${i}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: 10,
                textAlign: 'center',
                display: 'grid',
                gap: 4,
              }}
            >
              <div
                data-eid={`outlook-day-${i}-name`}
                style={{ fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}
              >
                {day.day}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0' }}>
                {conditionIcons[day.condition] || <Sun size={14} color="#fbbf24" />}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, fontSize: 13 }}>
                <span
                  data-eid={`outlook-day-${i}-high`}
                  style={{ fontWeight: 700, color: '#fbbf24' }}
                >
                  {day.high}°
                </span>
                <span
                  data-eid={`outlook-day-${i}-low`}
                  style={{ fontWeight: 500, color: '#64748b' }}
                >
                  {day.low}°
                </span>
              </div>
              <span
                data-eid={`outlook-day-${i}-condition`}
                style={{ fontSize: 9, color: '#94a3b8' }}
              >
                {day.condition}
              </span>
              <span
                data-eid={`outlook-day-${i}-precip`}
                style={{
                  fontSize: 10,
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Droplets size={10} color="#60a5fa" />
                {day.precip}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
