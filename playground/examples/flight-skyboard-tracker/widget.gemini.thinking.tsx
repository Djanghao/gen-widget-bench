import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import data from './data.json'

const { airport, delayByHour, departures, onTimeRate, window } = data

export default function PremiumWidget() {
  return (
    <section
      style={{
        background: 'linear-gradient(165deg, #0f172a 0%, #020617 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 480,
        overflow: 'hidden',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ 
            fontSize: 20, 
            fontWeight: 700, 
            margin: 0, 
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to bottom, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {airport}
          </h2>
          <p style={{ 
            color: '#64748b', 
            fontSize: 11, 
            fontWeight: 600, 
            letterSpacing: '0.1em', 
            margin: '4px 0 0', 
            textTransform: 'uppercase' 
          }}>
            {window}
          </p>
        </div>
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: 12,
          padding: '6px 12px',
          textAlign: 'right'
        }}>
          <span style={{ display: 'block', color: '#fbbf24', fontSize: 9, fontWeight: 700, opacity: 0.8 }}>ON-TIME RATE</span>
          <span style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700 }}>{onTimeRate}</span>
        </div>
      </header>

      {/* Flight List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {departures.map((flight) => (
          <article
            key={flight.code}
            style={{
              alignItems: 'center',
              background: 'rgba(30, 41, 59, 0.4)',
              borderLeft: '3px solid #f59e0b',
              borderRadius: '8px 12px 12px 8px',
              display: 'grid',
              gap: 12,
              gridTemplateColumns: '60px 1fr auto auto',
              padding: '12px 16px',
              transition: 'transform 0.2s ease',
            }}
          >
            <strong style={{ 
              color: '#fff', 
              fontFamily: 'JetBrains Mono, monospace', 
              fontSize: 13 
            }}>
              {flight.code}
            </strong>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ 
                color: '#e2e8f0', 
                fontSize: 13, 
                fontWeight: 500, 
                display: 'block',
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}>
                {flight.route}
              </span>
              <span style={{ color: '#f59e0b', fontSize: 10, fontWeight: 600 }}>{flight.status}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#94a3b8', fontSize: 9, display: 'block', marginBottom: 2 }}>GATE</span>
              <span style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{flight.gate}</span>
            </div>
            <div style={{ textAlign: 'right', minWidth: 50 }}>
              <span style={{ color: '#94a3b8', fontSize: 9, display: 'block', marginBottom: 2 }}>DEPART</span>
              <span style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700 }}>{flight.time}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Analytics Section */}
      <article
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 20,
          padding: '16px 12px 8px',
        }}
      >
        <div style={{ 
          color: '#94a3b8', 
          fontSize: 10, 
          fontWeight: 700, 
          letterSpacing: '0.1em', 
          marginBottom: 16,
          paddingLeft: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
          HOURLY DELAY TREND (MINS)
        </div>
        <div style={{ height: 160, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={delayByHour} margin={{ top: 0, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity={1} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 10 }} 
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)',
                  fontSize: 12,
                  padding: '8px 12px',
                }}
                itemStyle={{ color: '#fbbf24', fontWeight: 700 }}
              />
              <Bar 
                dataKey="minutes" 
                fill="url(#barGradient)" 
                radius={[4, 4, 0, 0]} 
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}