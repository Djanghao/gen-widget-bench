import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from './data.json'

const { change, market, price, series, ticker, volume, watchlist } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #04070f 0%, #081226 100%)',
        border: '1px solid #16304d',
        borderRadius: 16,
        boxShadow: '0 14px 32px rgba(2, 6, 23, 0.7)',
        color: '#d1fae5',
        display: 'grid',
        gap: 8,
        maxWidth: 540,
        padding: 12,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'center', display: 'flex', fontFamily: 'JetBrains Mono, monospace', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid', gap: 2 }}>
          <h2 style={{ color: '#34d399', fontSize: 15, margin: 0 }}>{ticker}</h2>
          <p style={{ color: '#86efac', fontSize: 10, margin: 0 }}>{market}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <strong style={{ color: '#22c55e', fontSize: 18, lineHeight: 1 }}>{price}</strong>
          <p style={{ color: '#4ade80', fontSize: 10, margin: '2px 0 0' }}>{change}</p>
        </div>
      </header>

      <article
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.72) 0%, rgba(15, 23, 42, 0.46) 100%)',
          border: '1px solid #1f3a5f',
          borderRadius: 12,
          padding: 8,
        }}
      >
        <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: '#86efac', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Intraday Tape
          </span>
          <span style={{ color: '#67e8f9', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>VOL {volume}</span>
        </div>
        <div style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid stroke="#1f2f4b" strokeDasharray="4 4" />
              <XAxis dataKey="time" tick={{ fill: '#86efac', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} />
              <YAxis tick={{ fill: '#86efac', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} />
              <Tooltip
                contentStyle={{
                  background: '#020617',
                  border: '1px solid #14532d',
                  borderRadius: 8,
                  color: '#dcfce7',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                }}
              />
              <Line dataKey="ma" dot={false} name="MA" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth={1.6} type="monotone" />
              <Line dataKey="price" dot={false} name="Price" stroke="#22c55e" strokeWidth={2.4} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <div style={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {watchlist.map((item) => (
          <div
            key={item.symbol}
            style={{
              background: 'rgba(15, 23, 42, 0.62)',
              border: '1px solid #1f3a5f',
              borderRadius: 8,
              display: 'grid',
              gap: 1,
              padding: '5px 6px',
            }}
          >
            <span style={{ color: '#a7f3d0', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{item.symbol}</span>
            <strong
              style={{
                color: item.move.startsWith('-') ? '#f87171' : '#4ade80',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
              }}
            >
              {item.move}
            </strong>
          </div>
        ))}
      </div>
    </section>
  )
}
