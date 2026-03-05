import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import data from './data.json'

type StockInfo = {
  symbol: string
  name: string
  color: string
  currentPrice: number
  changePct: number
  open: number
  close: number
  high: number
  low: number
  volume: string
  marketCap: string
  peRatio: number
  perfPct: number
}

type PortfolioData = {
  portfolioName: string
  portfolioValue: string
  portfolioChangePct: number
  activeRange: string
  lastUpdated: string
  stocks: StockInfo[]
  chartData: Array<{ date: string; aapl: number; googl: number; msft: number }>
}

const portfolio = data as PortfolioData

const ranges = ['1W', '1M', '3M', '1Y']

const metricRows: Array<{ key: string; label: string; field: keyof StockInfo; format?: (v: unknown) => string }> = [
  { key: 'open', label: 'Open', field: 'open', format: (v) => `$${(v as number).toFixed(2)}` },
  { key: 'close', label: 'Close', field: 'close', format: (v) => `$${(v as number).toFixed(2)}` },
  { key: 'high', label: 'High', field: 'high', format: (v) => `$${(v as number).toFixed(2)}` },
  { key: 'low', label: 'Low', field: 'low', format: (v) => `$${(v as number).toFixed(2)}` },
  { key: 'volume', label: 'Volume', field: 'volume' },
  { key: 'mktcap', label: 'Market Cap', field: 'marketCap' },
  { key: 'pe', label: 'P/E Ratio', field: 'peRatio', format: (v) => (v as number).toFixed(1) },
]

export default function Widget() {
  const [aapl, googl, msft] = portfolio.stocks
  const isPortfolioUp = portfolio.portfolioChangePct >= 0

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a1040 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 14,
        maxWidth: 480,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{ display: 'grid', gap: 6 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart3 size={18} color="#818cf8" />
          <div data-eid="portfolio-name" style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>
            {portfolio.portfolioName}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div data-eid="portfolio-value" style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>
            {portfolio.portfolioValue}
          </div>
          <span
            data-eid="portfolio-change"
            style={{
              background: isPortfolioUp ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${isPortfolioUp ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
              borderRadius: 8,
              color: isPortfolioUp ? '#4ade80' : '#f87171',
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {isPortfolioUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {isPortfolioUp ? '+' : ''}{portfolio.portfolioChangePct.toFixed(2)}%
          </span>
          <div style={{ flex: 1 }} />
          {ranges.map((r) => (
            <span
              key={r}
              data-eid={`date-range-${r.toLowerCase()}`}
              style={{
                background: r === portfolio.activeRange ? 'rgba(129,140,248,0.25)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${r === portfolio.activeRange ? 'rgba(129,140,248,0.5)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 8,
                color: r === portfolio.activeRange ? '#a5b4fc' : '#94a3b8',
                fontSize: 10,
                fontWeight: 600,
                padding: '3px 8px',
                cursor: 'pointer',
              }}
            >
              {r}
            </span>
          ))}
        </div>
      </header>

      <div data-eid="chart-section" style={{ display: 'grid', gap: 8 }}>
        <div data-eid="chart-container" style={{ height: 200, width: '100%' }}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolio.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="gradAapl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradGoogl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradMsft" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area type="monotone" dataKey="aapl" stroke="#3b82f6" strokeWidth={2} fill="url(#gradAapl)" dot={false} name="AAPL" />
              <Area type="monotone" dataKey="googl" stroke="#10b981" strokeWidth={2} fill="url(#gradGoogl)" dot={false} name="GOOGL" />
              <Area type="monotone" dataKey="msft" stroke="#a855f7" strokeWidth={2} fill="url(#gradMsft)" dot={false} name="MSFT" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div data-eid="legend" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          {portfolio.stocks.map((s) => (
            <span
              key={s.symbol}
              data-eid={`legend-${s.symbol.toLowerCase()}`}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#cbd5e1' }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
              {s.symbol}
            </span>
          ))}
        </div>
      </div>

      <div data-eid="summary-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {portfolio.stocks.map((s) => {
          const isUp = s.changePct >= 0
          return (
            <div
              key={s.symbol}
              data-eid={`summary-${s.symbol.toLowerCase()}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${s.color}33`,
                borderRadius: 12,
                padding: '8px 10px',
                display: 'grid',
                gap: 2,
              }}
            >
              <span
                data-eid={`summary-${s.symbol.toLowerCase()}-symbol`}
                style={{ fontSize: 11, fontWeight: 600, color: s.color }}
              >
                {s.symbol}
              </span>
              <span
                data-eid={`summary-${s.symbol.toLowerCase()}-name`}
                style={{ fontSize: 9, color: '#64748b' }}
              >
                {s.name}
              </span>
              <span
                data-eid={`summary-${s.symbol.toLowerCase()}-price`}
                style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}
              >
                ${s.currentPrice.toFixed(2)}
              </span>
              <span
                data-eid={`summary-${s.symbol.toLowerCase()}-change`}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isUp ? '#4ade80' : '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {isUp ? '+' : ''}{s.changePct.toFixed(2)}%
              </span>
            </div>
          )
        })}
      </div>

      <div data-eid="table-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="table-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>
          Key Metrics
        </div>
        <div
          data-eid="table-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 4,
            padding: '6px 8px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span data-eid="table-header-metric" style={{ fontSize: 10, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Metric</span>
          <span data-eid="table-header-aapl" style={{ fontSize: 10, fontWeight: 600, color: '#3b82f6', textAlign: 'right' }}>AAPL</span>
          <span data-eid="table-header-googl" style={{ fontSize: 10, fontWeight: 600, color: '#10b981', textAlign: 'right' }}>GOOGL</span>
          <span data-eid="table-header-msft" style={{ fontSize: 10, fontWeight: 600, color: '#a855f7', textAlign: 'right' }}>MSFT</span>
        </div>
        {metricRows.map((row, i) => {
          const fmt = row.format || ((v: unknown) => String(v))
          const aaplVal = aapl[row.field]
          const googlVal = googl[row.field]
          const msftVal = msft[row.field]
          return (
            <div
              key={row.key}
              data-eid={`table-row-${row.key}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: 4,
                padding: '5px 8px',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                borderRadius: 6,
              }}
            >
              <span data-eid={`table-row-${row.key}-label`} style={{ fontSize: 11, color: '#94a3b8' }}>
                {row.label}
              </span>
              <span data-eid={`table-row-${row.key}-aapl`} style={{ fontSize: 11, color: '#e2e8f0', textAlign: 'right', fontWeight: 500 }}>
                {fmt(aaplVal)}
              </span>
              <span data-eid={`table-row-${row.key}-googl`} style={{ fontSize: 11, color: '#e2e8f0', textAlign: 'right', fontWeight: 500 }}>
                {fmt(googlVal)}
              </span>
              <span data-eid={`table-row-${row.key}-msft`} style={{ fontSize: 11, color: '#e2e8f0', textAlign: 'right', fontWeight: 500 }}>
                {fmt(msftVal)}
              </span>
            </div>
          )
        })}
      </div>

      <div data-eid="performance-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="performance-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>
          1M Performance
        </div>
        {portfolio.stocks.map((s) => (
          <div
            key={s.symbol}
            data-eid={`perf-${s.symbol.toLowerCase()}`}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span
              data-eid={`perf-${s.symbol.toLowerCase()}-label`}
              style={{ fontSize: 11, color: s.color, fontWeight: 600, width: 46 }}
            >
              {s.symbol}
            </span>
            <div
              data-eid={`perf-${s.symbol.toLowerCase()}-bar`}
              style={{
                flex: 1,
                height: 8,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                data-eid={`perf-${s.symbol.toLowerCase()}-fill`}
                style={{
                  width: `${Math.min(s.perfPct * 10, 100)}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                  borderRadius: 4,
                }}
              />
            </div>
            <span
              data-eid={`perf-${s.symbol.toLowerCase()}-value`}
              style={{ fontSize: 11, color: s.perfPct >= 0 ? '#4ade80' : '#f87171', fontWeight: 600, width: 44, textAlign: 'right' }}
            >
              +{s.perfPct.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div data-eid="footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span data-eid="footer-timestamp" style={{ fontSize: 9, color: '#475569' }}>
          Last updated: {portfolio.lastUpdated}
        </span>
      </div>
    </section>
  )
}
