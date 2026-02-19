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

const { services, stats, stream } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'radial-gradient(circle at 20% 0%, #1f3254 0%, #0b1323 62%, #070d18 100%)',
        border: '1px solid #1f3456',
        borderRadius: 16,
        color: '#e2e8f0',
        display: 'grid',
        gap: 10,
        maxWidth: 540,
        padding: 12,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 16, margin: 0 }}>Neon Ops Mini</h2>
          <p style={{ color: '#93c5fd', fontSize: 12, margin: '3px 0 0' }}>Runtime pressure snapshot</p>
        </div>
        <span
          style={{
            background: '#0b2d4b',
            border: '1px solid #155e75',
            borderRadius: 999,
            color: '#67e8f9',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 8px',
          }}
        >
          LIVE
        </span>
      </header>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <Metric label="RPM" value={stats.rpm} />
        <Metric label="CPU" value={stats.cpu} />
        <Metric label="Errors" value={stats.errorRate} />
      </div>

      <article
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.62) 0%, rgba(15, 23, 42, 0.34) 100%)',
          border: '1px solid #1e3a5f',
          borderRadius: 12,
          padding: 8,
        }}
      >
        <div style={{ color: '#bae6fd', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Requests Trend</div>
        <div style={{ height: 170 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stream}>
              <defs>
                <linearGradient id="requests-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1f2f4b" strokeDasharray="4 4" />
              <XAxis axisLine={false} dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} />
              <YAxis axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  color: '#e2e8f0',
                }}
              />
              <Area dataKey="requests" fill="url(#requests-fill)" stroke="#38bdf8" strokeWidth={2.2} type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>

      <div style={{ display: 'grid', gap: 4 }}>
        {services.map((item) => (
          <div
            key={item.name}
            style={{
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.36)',
              border: '1px solid #1e3a5f',
              borderRadius: 10,
              color: '#cbd5e1',
              display: 'flex',
              fontSize: 12,
              gap: 8,
              padding: '5px 8px',
            }}
          >
            <span style={{ background: item.color, borderRadius: 999, display: 'inline-block', height: 8, width: 8 }} />
            <span>{item.name}</span>
            <strong style={{ marginLeft: 'auto' }}>{item.value}%</strong>
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
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.5) 100%)',
        border: '1px solid #1e3a5f',
        borderRadius: 10,
        display: 'grid',
        gap: 3,
        padding: '7px 8px',
      }}
    >
      <span style={{ color: '#94a3b8', fontSize: 11 }}>{props.label}</span>
      <strong style={{ color: '#67e8f9', fontSize: 16 }}>{props.value}</strong>
    </article>
  )
}
