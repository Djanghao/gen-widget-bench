import { TrendingUp, Calendar, BarChart3, Activity } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts'
import data from './data.json'

type OptionRow = {
  strike: number
  bid: number
  ask: number
  last: number
  volume: string
  oi: string
  iv: string
  delta: number
  itm: boolean
}

type OptionsData = {
  symbol: string
  currentPrice: number
  expiration: string
  optionType: string
  strikes: number[]
  calls: OptionRow[]
  puts: OptionRow[]
  greeks: { avgIV: string; putCallRatio: number }
  totals: { volume: string; oi: string }
}

const options = data as OptionsData

const cols = ['Bid', 'Ask', 'Last', 'Vol', 'OI', 'IV', 'Delta']

function OptionRowComponent({ row, prefix, index }: { row: OptionRow; prefix: string; index: number }) {
  const itmBg = row.itm ? 'rgba(129,140,248,0.08)' : 'transparent'
  const itmBorder = row.itm ? '1px solid rgba(129,140,248,0.15)' : '1px solid rgba(255,255,255,0.04)'
  const values = [
    { key: 'bid', val: row.bid.toFixed(2) },
    { key: 'ask', val: row.ask.toFixed(2) },
    { key: 'last', val: row.last.toFixed(2) },
    { key: 'vol', val: row.volume },
    { key: 'oi', val: row.oi },
    { key: 'iv', val: row.iv },
    { key: 'delta', val: row.delta.toFixed(2) },
  ]

  return (
    <div
      data-eid={`${prefix}-${index}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2,
        background: itmBg,
        border: itmBorder,
        borderRadius: 6,
        padding: '5px 6px',
        alignItems: 'center',
      }}
    >
      {values.map((v) => (
        <span
          key={v.key}
          data-eid={`${prefix}-${index}-${v.key}`}
          style={{
            fontSize: 9,
            color: v.key === 'delta'
              ? (row.delta > 0 ? '#4ade80' : '#f87171')
              : '#cbd5e1',
            fontWeight: 600,
            textAlign: 'center',
            fontFamily: 'monospace',
          }}
        >
          {v.val}
        </span>
      ))}
    </div>
  )
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0a0f1e 0%, #131629 50%, #0a0f1e 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 10,
        maxWidth: 460,
        padding: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
      >
        <TrendingUp size={20} color="#818cf8" />
        <div data-eid="stock-symbol" style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>
          {options.symbol}
        </div>
        <div data-eid="stock-price" style={{ fontSize: 16, fontWeight: 700, color: '#4ade80', flex: 1 }}>
          ${options.currentPrice.toFixed(2)}
        </div>
        <span
          data-eid="expiry-badge"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Calendar size={9} color="#a5b4fc" />
          {options.expiration}
        </span>
        <span
          data-eid="type-badge"
          style={{
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.3)',
            borderRadius: 12,
            color: '#fcd34d',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
          }}
        >
          {options.optionType}
        </span>
      </header>

      <div data-eid="calls-section" style={{ display: 'grid', gap: 4 }}>
        <div
          data-eid="calls-title"
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: '#4ade80',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          CALLS
        </div>
        <div
          data-eid="calls-header-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
            padding: '0 6px',
          }}
        >
          {cols.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 8,
                color: '#64748b',
                fontWeight: 700,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              {c}
            </span>
          ))}
        </div>
        {options.calls.map((call, i) => (
          <OptionRowComponent key={i} row={call} prefix="call" index={i} />
        ))}
      </div>

      <div
        data-eid="strike-divider"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 4,
          padding: '6px 0',
          borderTop: '1px solid rgba(129,140,248,0.2)',
          borderBottom: '1px solid rgba(129,140,248,0.2)',
        }}
      >
        {options.strikes.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              fontSize: 10,
              fontWeight: 800,
              color: s <= options.currentPrice ? '#c7d2fe' : '#94a3b8',
              background: s <= options.currentPrice ? 'rgba(129,140,248,0.1)' : 'transparent',
              borderRadius: 4,
              padding: '2px 0',
            }}
          >
            ${s}
          </div>
        ))}
      </div>

      <div data-eid="puts-section" style={{ display: 'grid', gap: 4 }}>
        <div
          data-eid="puts-title"
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: '#f87171',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          PUTS
        </div>
        <div
          data-eid="puts-header-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
            padding: '0 6px',
          }}
        >
          {cols.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 8,
                color: '#64748b',
                fontWeight: 700,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              {c}
            </span>
          ))}
        </div>
        {options.puts.map((put, i) => (
          <OptionRowComponent key={i} row={put} prefix="put" index={i} />
        ))}
      </div>

      <div
        data-eid="greeks-summary"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          background: 'rgba(129,140,248,0.06)',
          border: '1px solid rgba(129,140,248,0.15)',
          borderRadius: 10,
          padding: '8px 10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            data-eid="greeks-iv-label"
            style={{ fontSize: 9, color: '#64748b', fontWeight: 600 }}
          >
            Avg IV
          </span>
          <span
            data-eid="greeks-iv-value"
            style={{ fontSize: 11, color: '#a5b4fc', fontWeight: 700 }}
          >
            {options.greeks.avgIV}
          </span>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            data-eid="greeks-pcr-label"
            style={{ fontSize: 9, color: '#64748b', fontWeight: 600 }}
          >
            P/C Ratio
          </span>
          <span
            data-eid="greeks-pcr-value"
            style={{ fontSize: 11, color: '#fbbf24', fontWeight: 700 }}
          >
            {options.greeks.putCallRatio}
          </span>
        </div>
      </div>

      <div
        data-eid="volume-summary"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10,
          padding: '8px 10px',
        }}
      >
        <div
          data-eid="total-volume"
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>
            {options.totals.volume}
          </div>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>Total Volume</div>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
        <div
          data-eid="total-oi"
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>
            {options.totals.oi}
          </div>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>Total Open Interest</div>
        </div>
      </div>
    </section>
  )
}
