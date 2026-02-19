import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from './data.json'

const { airport, delayByHour, departures, onTimeRate, window } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #111827 0%, #030712 100%)',
        border: '1px solid rgba(251, 191, 36, 0.32)',
        borderRadius: 16,
        boxShadow: '0 16px 34px rgba(2, 6, 23, 0.58)',
        color: '#f8fafc',
        display: 'grid',
        gap: 8,
        maxWidth: 540,
        overflow: 'hidden',
        padding: 12,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 15, margin: 0 }}>{airport}</h2>
          <p style={{ color: '#fcd34d', fontSize: 10, letterSpacing: '0.08em', margin: '2px 0 0', textTransform: 'uppercase' }}>{window}</p>
        </div>
        <div
          style={{
            background: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.35)',
            borderRadius: 8,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            padding: '4px 7px',
          }}
        >
          On-time {onTimeRate}
        </div>
      </header>

      <div style={{ display: 'grid', gap: 5 }}>
        {departures.map((flight) => (
          <article
            key={flight.code}
            style={{
              alignItems: 'center',
              background: '#0f172a',
              border: '1px solid rgba(251, 191, 36, 0.23)',
              borderRadius: 9,
              display: 'grid',
              gap: 4,
              gridTemplateColumns: 'auto minmax(0, 1fr) auto auto',
              padding: '6px 7px',
            }}
          >
            <strong
              style={{
                background: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.35)',
                borderRadius: 6,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                padding: '2px 4px',
              }}
            >
              {flight.code}
            </strong>
            <span style={{ color: '#d1d5db', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{flight.route}</span>
            <span style={{ color: '#93c5fd', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{flight.gate}</span>
            <span style={{ color: '#fef3c7', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{flight.time}</span>
            <span
              style={{
                background: 'rgba(251, 191, 36, 0.14)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: 999,
                color: '#fde68a',
                fontSize: 9,
                gridColumn: '2 / 5',
                justifySelf: 'start',
                padding: '1px 7px',
              }}
            >
              {flight.status}
            </span>
          </article>
        ))}
      </div>

      <article
        style={{
          background: '#0b1222',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          borderRadius: 12,
          padding: 8,
        }}
      >
        <div style={{ color: '#fcd34d', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, marginBottom: 6 }}>
          DELAY MINUTES
        </div>
        <div style={{ height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={delayByHour}>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.25)" strokeDasharray="4 4" />
              <XAxis dataKey="hour" tick={{ fill: '#fcd34d', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} />
              <YAxis tick={{ fill: '#fcd34d', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} />
              <Tooltip
                contentStyle={{
                  background: '#020617',
                  border: '1px solid rgba(251, 191, 36, 0.35)',
                  borderRadius: 8,
                  color: '#fef3c7',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                }}
              />
              <Bar dataKey="minutes" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}
