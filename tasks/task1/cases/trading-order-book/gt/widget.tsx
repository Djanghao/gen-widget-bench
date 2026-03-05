import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts'
import data from './data.json'

type OrderLevel = {
  price: number
  amount: number
  total: number
}

type OrderBookData = {
  pair: string
  currentPrice: number
  priceUsd: string
  change24h: number
  spread: { value: number; pct: number }
  asks: OrderLevel[]
  bids: OrderLevel[]
  volume24h: string
  high24h: number
  low24h: number
}

const book = data as OrderBookData

const maxAskTotal = Math.max(...book.asks.map((a) => a.total))
const maxBidTotal = Math.max(...book.bids.map((b) => b.total))

function formatPrice(p: number) {
  return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function OrderRow({
  level,
  index,
  side,
  maxTotal,
}: {
  level: OrderLevel
  index: number
  side: 'ask' | 'bid'
  maxTotal: number
}) {
  const fillPct = (level.total / maxTotal) * 100
  const color = side === 'ask' ? '#ef4444' : '#22c55e'
  const bgColor = side === 'ask' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)'

  return (
    <div
      data-eid={`${side}-${index}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 4,
        padding: '4px 8px',
        position: 'relative',
        overflow: 'hidden',
        fontSize: 11,
      }}
    >
      <div
        data-eid={`${side}-${index}-bar`}
        style={{
          position: 'absolute',
          top: 0,
          right: side === 'ask' ? 0 : undefined,
          left: side === 'bid' ? 0 : undefined,
          bottom: 0,
          width: `${fillPct}%`,
          background: bgColor,
          zIndex: 0,
        }}
      />
      <span
        data-eid={`${side}-${index}-price`}
        style={{ color, fontWeight: 600, zIndex: 1, fontFamily: 'monospace' }}
      >
        {formatPrice(level.price)}
      </span>
      <span
        data-eid={`${side}-${index}-amount`}
        style={{ color: '#cbd5e1', textAlign: 'center', zIndex: 1, fontFamily: 'monospace' }}
      >
        {level.amount.toFixed(3)}
      </span>
      <span
        data-eid={`${side}-${index}-total`}
        style={{ color: '#94a3b8', textAlign: 'right', zIndex: 1, fontFamily: 'monospace' }}
      >
        {level.total.toFixed(3)}
      </span>
    </div>
  )
}

export default function Widget() {
  const isUp = book.change24h >= 0

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 460,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{ display: 'grid', gap: 4 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={18} color="#f59e0b" />
          <div data-eid="pair-label" style={{ fontSize: 18, fontWeight: 700 }}>
            {book.pair}
          </div>
          <span
            data-eid="price-change-24h"
            style={{
              background: isUp ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${isUp ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
              borderRadius: 8,
              color: isUp ? '#4ade80' : '#f87171',
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {isUp ? '+' : ''}{book.change24h.toFixed(2)}%
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div data-eid="current-price" style={{ fontSize: 28, fontWeight: 700, color: isUp ? '#4ade80' : '#f87171' }}>
            {formatPrice(book.currentPrice)}
          </div>
          <span data-eid="price-usd" style={{ fontSize: 12, color: '#64748b' }}>
            {book.priceUsd}
          </span>
        </div>
      </header>

      <div data-eid="asks-section" style={{ display: 'grid', gap: 2 }}>
        <div data-eid="asks-title" style={{ fontSize: 12, fontWeight: 600, color: '#ef4444', marginBottom: 4 }}>
          Asks
        </div>
        <div
          data-eid="asks-col-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 4,
            padding: '2px 8px',
            fontSize: 9,
            color: '#475569',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          <span>Price (USDT)</span>
          <span style={{ textAlign: 'center' }}>Amount (BTC)</span>
          <span style={{ textAlign: 'right' }}>Total</span>
        </div>
        {[...book.asks].reverse().map((level, i) => (
          <OrderRow key={i} level={level} index={7 - i} side="ask" maxTotal={maxAskTotal} />
        ))}
      </div>

      <div
        data-eid="spread-indicator"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: '6px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span data-eid="spread-label" style={{ fontSize: 10, color: '#475569', fontWeight: 600 }}>
          SPREAD
        </span>
        <span data-eid="spread-value" style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, fontFamily: 'monospace' }}>
          ${formatPrice(book.spread.value)}
        </span>
        <span data-eid="spread-pct" style={{ fontSize: 10, color: '#64748b' }}>
          ({book.spread.pct.toFixed(3)}%)
        </span>
      </div>

      <div data-eid="bids-section" style={{ display: 'grid', gap: 2 }}>
        <div data-eid="bids-title" style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', marginBottom: 4 }}>
          Bids
        </div>
        <div
          data-eid="bids-col-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 4,
            padding: '2px 8px',
            fontSize: 9,
            color: '#475569',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          <span>Price (USDT)</span>
          <span style={{ textAlign: 'center' }}>Amount (BTC)</span>
          <span style={{ textAlign: 'right' }}>Total</span>
        </div>
        {book.bids.map((level, i) => (
          <OrderRow key={i} level={level} index={i} side="bid" maxTotal={maxBidTotal} />
        ))}
      </div>

      <div
        data-eid="footer"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
          padding: '10px 0 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'grid', gap: 2 }}>
          <span data-eid="footer-volume-label" style={{ fontSize: 9, color: '#475569', fontWeight: 600, textTransform: 'uppercase' }}>
            24h Volume
          </span>
          <span data-eid="footer-volume-value" style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>
            {book.volume24h}
          </span>
        </div>
        <div style={{ display: 'grid', gap: 2, textAlign: 'center' }}>
          <span data-eid="footer-high-label" style={{ fontSize: 9, color: '#475569', fontWeight: 600, textTransform: 'uppercase' }}>
            24h High
          </span>
          <span data-eid="footer-high-value" style={{ fontSize: 12, color: '#4ade80', fontWeight: 600 }}>
            {formatPrice(book.high24h)}
          </span>
        </div>
        <div style={{ display: 'grid', gap: 2, textAlign: 'right' }}>
          <span data-eid="footer-low-label" style={{ fontSize: 9, color: '#475569', fontWeight: 600, textTransform: 'uppercase' }}>
            24h Low
          </span>
          <span data-eid="footer-low-value" style={{ fontSize: 12, color: '#f87171', fontWeight: 600 }}>
            {formatPrice(book.low24h)}
          </span>
        </div>
      </div>
    </section>
  )
}
