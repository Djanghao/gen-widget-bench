import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from './data.json'

const { alerts, condition, hourly, location, now } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'radial-gradient(circle at 10% 0%, rgba(56, 189, 248, 0.4) 0%, rgba(15, 23, 42, 0.94) 46%, #050913 100%)',
        border: '1px solid rgba(125, 211, 252, 0.3)',
        borderRadius: 16,
        boxShadow: '0 14px 34px rgba(8, 47, 73, 0.45)',
        color: '#e2e8f0',
        display: 'grid',
        gap: 8,
        maxWidth: 540,
        overflow: 'hidden',
        padding: 12,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid', gap: 2 }}>
          <h2 style={{ fontSize: 15, margin: 0 }}>{location}</h2>
          <p style={{ color: '#a5f3fc', fontSize: 10, letterSpacing: '0.07em', margin: 0, textTransform: 'uppercase' }}>{condition}</p>
        </div>
        <strong style={{ color: '#7dd3fc', fontSize: 22, lineHeight: 1 }}>{now.temp}</strong>
      </header>

      <div style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <Metric label="Feels" value={now.feels} />
        <Metric label="Humidity" value={now.humidity} />
        <Metric label="Wind" value={now.wind} />
        <Metric label="UV" value={now.uv} />
      </div>

      <article
        style={{
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(180deg, rgba(14, 116, 144, 0.2) 0%, rgba(15, 23, 42, 0.55) 100%)',
          border: '1px solid rgba(125, 211, 252, 0.24)',
          borderRadius: 12,
          display: 'grid',
          gap: 6,
          padding: 8,
        }}
      >
        <div style={{ color: '#bae6fd', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Night Forecast</div>
        <div style={{ height: 158 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourly}>
              <defs>
                <linearGradient id="aurora-temp-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.42} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.3)" strokeDasharray="4 4" />
              <XAxis axisLine={false} dataKey="time" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} />
              <YAxis axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  color: '#e2e8f0',
                }}
              />
              <Area dataKey="temp" fill="url(#aurora-temp-fill)" stroke="#22d3ee" strokeWidth={2.2} type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>

      <div style={{ display: 'grid', gap: 4 }}>
        {alerts.map((item) => (
          <div
            key={item}
            style={{
              background: 'rgba(14, 116, 144, 0.16)',
              border: '1px solid rgba(125, 211, 252, 0.26)',
              borderRadius: 8,
              color: '#cffafe',
              fontSize: 10,
              padding: '5px 8px',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

function Metric(props: { label: string; value: string }) {
  return (
    <article
      style={{
        background: 'rgba(8, 47, 73, 0.34)',
        border: '1px solid rgba(125, 211, 252, 0.2)',
        borderRadius: 9,
        display: 'grid',
        gap: 1,
        padding: '5px 6px',
      }}
    >
      <span style={{ color: '#bae6fd', fontSize: 9 }}>{props.label}</span>
      <strong style={{ color: '#f0f9ff', fontSize: 11 }}>{props.value}</strong>
    </article>
  )
}
