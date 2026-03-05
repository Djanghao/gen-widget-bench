import { BarChart3 } from 'lucide-react'
import data from './data.json'

type StockData = {
  ticker: string
  company: string
  price: number
  changePct: number
}

type MarketData = {
  indexName: string
  indexValue: number
  indexChange: number
  indexChangePct: number
  lastUpdated: string
  stocks: StockData[]
}

const market = data as MarketData

function getHeatColor(pct: number): string {
  if (pct > 2.5) return 'rgba(34, 197, 94, 0.55)'
  if (pct > 1.0) return 'rgba(34, 197, 94, 0.35)'
  if (pct > 0) return 'rgba(34, 197, 94, 0.18)'
  if (pct > -1.0) return 'rgba(239, 68, 68, 0.18)'
  if (pct > -2.5) return 'rgba(239, 68, 68, 0.35)'
  return 'rgba(239, 68, 68, 0.55)'
}

function formatPrice(n: number) {
  return '$' + n.toFixed(2)
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0c0c1d 0%, #131328 50%, #0a0a18 100%)',
        borderRadius: 20,
        color: '#e4e4ed',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 460,
        padding: 20,
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart3 size={20} color="#818cf8" />
          <div data-eid="index-name" style={{ fontSize: 18, fontWeight: 700 }}>
            {market.indexName}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span data-eid="index-value" style={{ fontSize: 28, fontWeight: 700 }}>
            {market.indexValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span
            data-eid="index-change"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: market.indexChangePct >= 0 ? '#4ade80' : '#f87171',
            }}
          >
            {market.indexChangePct >= 0 ? '+' : ''}{market.indexChange.toFixed(2)} ({market.indexChangePct >= 0 ? '+' : ''}{market.indexChangePct.toFixed(2)}%)
          </span>
        </div>
        <div data-eid="last-updated" style={{ fontSize: 11, color: '#6b7280' }}>
          {market.lastUpdated}
        </div>
      </div>

      {/* Heatmap Grid */}
      <div
        data-eid="heatmap-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
        }}
      >
        {market.stocks.map((stock, i) => (
          <div
            key={stock.ticker}
            data-eid={`stock-cell-${i}`}
            style={{
              background: getHeatColor(stock.changePct),
              borderRadius: 10,
              padding: '10px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div data-eid={`stock-ticker-${i}`} style={{ fontSize: 14, fontWeight: 700 }}>
              {stock.ticker}
            </div>
            <div
              data-eid={`stock-company-${i}`}
              style={{
                fontSize: 9,
                color: '#9ca3af',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              {stock.company}
            </div>
            <div data-eid={`stock-price-${i}`} style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>
              {formatPrice(stock.price)}
            </div>
            <div
              data-eid={`stock-change-${i}`}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: stock.changePct >= 0 ? '#4ade80' : '#f87171',
              }}
            >
              {stock.changePct >= 0 ? '+' : ''}{stock.changePct.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
