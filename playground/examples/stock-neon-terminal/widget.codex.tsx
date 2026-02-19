import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from './data.json'

const { change, market, price, series, ticker, volume, watchlist } = data

const trendDown = String(change).trim().startsWith('-')
const trendColor = trendDown ? '#fb7185' : '#34d399'
const trendGlow = trendDown ? 'rgba(251, 113, 133, 0.28)' : 'rgba(16, 185, 129, 0.28)'

function TapeTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  const pricePoint = payload.find((p) => p.dataKey === 'price')?.value
  const maPoint = payload.find((p) => p.dataKey === 'ma')?.value
  const fmt = (v) => (typeof v === 'number' ? v.toFixed(2) : v)

  return (
    <div
      style={{
        background: 'rgba(2, 6, 23, 0.92)',
        border: `1px solid ${trendColor}88`,
        borderRadius: 10,
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        color: '#e2e8f0',
        fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
        fontSize: 10,
        minWidth: 120,
        padding: '8px 10px',
      }}
    >
      <div style={{ color: '#94a3b8', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ color: '#67e8f9' }}>Price</span>
        <strong style={{ color: '#e2e8f0' }}>{fmt(pricePoint)}</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#93c5fd' }}>MA</span>
        <strong style={{ color: '#e2e8f0' }}>{fmt(maPoint)}</strong>
      </div>
    </div>
  )
}

export default function Widget() {
  return (
    <section
      style={{
        background:
          'radial-gradient(120% 140% at 100% -20%, rgba(56,189,248,0.18) 0%, transparent 45%), linear-gradient(180deg, #050a16 0%, #0a1326 100%)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: 18,
        boxShadow: '0 18px 40px rgba(2, 6, 23, 0.65), inset 0 1px 0 rgba(255,255,255,0.05)',
        color: '#dbeafe',
        maxWidth: 560,
        overflow: 'hidden',
        padding: 14,
        position: 'relative',
        width: '100%',
      }}
    >
      <div style={{ inset: 0, pointerEvents: 'none', position: 'absolute' }}>
        <div
          style={{
            background: trendGlow,
            borderRadius: '50%',
            filter: 'blur(42px)',
            height: 180,
            position: 'absolute',
            right: -50,
            top: -70,
            width: 180,
          }}
        />
        <div
          style={{
            background: 'rgba(56,189,248,0.22)',
            borderRadius: '50%',
            filter: 'blur(46px)',
            height: 160,
            left: -60,
            position: 'absolute',
            top: 130,
            width: 160,
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: 10, position: 'relative' }}>
        <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'grid', gap: 4 }}>
            <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
              <h2
                style={{
                  color: '#f8fafc',
                  fontFamily: "'Sora', 'SF Pro Display', 'Segoe UI', sans-serif",
                  fontSize: 19,
                  letterSpacing: '0.02em',
                  margin: 0,
                }}
              >
                {ticker}
              </h2>
              <span
                style={{
                  background: trendDown ? 'rgba(251,113,133,0.14)' : 'rgba(16,185,129,0.14)',
                  border: `1px solid ${trendColor}66`,
                  borderRadius: 999,
                  color: trendColor,
                  fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                  fontSize: 10,
                  padding: '2px 8px',
                }}
              >
                {trendDown ? 'Downtrend' : 'Uptrend'}
              </span>
            </div>
            <p
              style={{
                color: '#93c5fd',
                fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.06em',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              {market}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <strong
              style={{
                color: '#f8fafc',
                display: 'block',
                fontFamily: "'Sora', 'SF Pro Display', 'Segoe UI', sans-serif",
                fontSize: 24,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {price}
            </strong>
            <span
              style={{
                color: trendColor,
                fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                fontSize: 11,
              }}
            >
              {change}
            </span>
          </div>
        </header>

        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          <div
            style={{
              backdropFilter: 'blur(4px)',
              background: 'rgba(15, 23, 42, 0.48)',
              border: '1px solid rgba(148,163,184,0.2)',
              borderRadius: 10,
              display: 'grid',
              gap: 4,
              padding: '8px 10px',
            }}
          >
            <span
              style={{
                color: '#94a3b8',
                fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                fontSize: 10,
                textTransform: 'uppercase',
              }}
            >
              Market
            </span>
            <strong style={{ color: '#e2e8f0', fontFamily: "'Sora', 'SF Pro Display', 'Segoe UI', sans-serif", fontSize: 13 }}>
              {market}
            </strong>
          </div>
          <div
            style={{
              backdropFilter: 'blur(4px)',
              background: 'rgba(15, 23, 42, 0.48)',
              border: '1px solid rgba(148,163,184,0.2)',
              borderRadius: 10,
              display: 'grid',
              gap: 4,
              padding: '8px 10px',
            }}
          >
            <span
              style={{
                color: '#94a3b8',
                fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                fontSize: 10,
                textTransform: 'uppercase',
              }}
            >
              Volume
            </span>
            <strong style={{ color: '#e2e8f0', fontFamily: "'Sora', 'SF Pro Display', 'Segoe UI', sans-serif", fontSize: 13 }}>
              {volume}
            </strong>
          </div>
        </div>

        <article
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.52) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.28)',
            borderRadius: 12,
            padding: 10,
          }}
        >
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span
              style={{
                color: '#bae6fd',
                fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Intraday Tape
            </span>
            <span style={{ color: '#7dd3fc', fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", fontSize: 10 }}>
              Price vs MA
            </span>
          </div>

          <div style={{ height: 188 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={series} margin={{ bottom: 0, left: -10, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={trendColor} stopOpacity={0.32} />
                    <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="priceStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor={trendColor} />
                  </linearGradient>
                  <filter id="priceShadow" x="-20%" y="-40%" width="160%" height="220%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={trendColor} floodOpacity="0.55" />
                  </filter>
                </defs>

                <CartesianGrid stroke="rgba(148,163,184,0.16)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="time"
                  minTickGap={18}
                  tick={{ fill: '#9fb5d1', fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", fontSize: 9 }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  tick={{ fill: '#9fb5d1', fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", fontSize: 9 }}
                  tickFormatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
                  tickLine={false}
                  width={44}
                />
                <Tooltip content={<TapeTooltip />} cursor={{ stroke: '#64748b', strokeDasharray: '4 4', strokeOpacity: 0.5 }} />
                <Area dataKey="price" fill="url(#priceFill)" isAnimationActive={false} stroke="none" type="monotone" />
                <Line
                  dataKey="ma"
                  dot={false}
                  isAnimationActive={false}
                  name="MA"
                  stroke="#93c5fd"
                  strokeDasharray="4 4"
                  strokeWidth={1.6}
                  type="monotone"
                />
                <Line
                  dataKey="price"
                  dot={false}
                  filter="url(#priceShadow)"
                  isAnimationActive={false}
                  name="Price"
                  stroke="url(#priceStroke)"
                  strokeWidth={2.8}
                  type="monotone"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </article>

        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))' }}>
          {watchlist.map((item) => {
            const down = String(item.move).startsWith('-')
            return (
              <div
                key={item.symbol}
                style={{
                  background: 'rgba(15, 23, 42, 0.56)',
                  border: `1px solid ${down ? 'rgba(248,113,113,0.36)' : 'rgba(74,222,128,0.34)'}`,
                  borderRadius: 10,
                  display: 'grid',
                  gap: 3,
                  padding: '7px 8px',
                }}
              >
                <span
                  style={{
                    color: '#cbd5e1',
                    fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.03em',
                  }}
                >
                  {item.symbol}
                </span>
                <strong
                  style={{
                    color: down ? '#fda4af' : '#86efac',
                    fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
                    fontSize: 11,
                  }}
                >
                  {item.move}
                </strong>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
