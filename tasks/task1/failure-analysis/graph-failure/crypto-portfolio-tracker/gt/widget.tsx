import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import data from './data.json'

type CoinData = {
  name: string
  symbol: string
  color: string
  price: number
  change24h: number
  holdingsAmount: number
  holdingsValue: number
}

type PortfolioData = {
  portfolioName: string
  totalValue: number
  totalChange24h: number
  totalChangeAmount: number
  chartData: Array<{ day: string; value: number }>
  coins: CoinData[]
}

const portfolio = data as PortfolioData

function formatUsd(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 50%, #0d1117 100%)',
        borderRadius: 20,
        color: '#e8e8f0',
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
      <div data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          data-eid="portfolio-title"
          style={{ fontSize: 13, color: '#8b8fa3', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          {portfolio.portfolioName}
        </div>
        <div data-eid="total-value" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>
          {formatUsd(portfolio.totalValue)}
        </div>
        <div
          data-eid="total-change"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            color: portfolio.totalChange24h >= 0 ? '#4ade80' : '#f87171',
            fontWeight: 600,
          }}
        >
          {portfolio.totalChange24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {portfolio.totalChange24h >= 0 ? '+' : ''}{portfolio.totalChange24h.toFixed(2)}% ({formatUsd(portfolio.totalChangeAmount)}) 24h
        </div>
      </div>

      {/* Chart */}
      <div data-eid="chart-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="chart-label" style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>
          7-Day Performance
        </div>
        <div data-eid="area-chart" style={{ width: '100%', height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolio.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />
              <Tooltip
                contentStyle={{ background: '#1e1e2e', border: '1px solid #333', borderRadius: 8, color: '#e8e8f0', fontSize: 12 }}
                formatter={(value: number) => [formatUsd(value), 'Value']}
              />
              <Area type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} fill="url(#portfolioGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings */}
      <div data-eid="holdings-header" style={{ fontSize: 13, color: '#8b8fa3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
        Holdings
      </div>

      {portfolio.coins.map((coin, i) => (
        <div
          key={coin.symbol}
          data-eid={`coin-row-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 12,
            padding: '12px 14px',
          }}
        >
          <div
            data-eid={`coin-icon-${i}`}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: coin.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Wallet size={18} color="#fff" />
          </div>
          <div data-eid={`coin-name-${i}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{coin.name}</span>
            <span style={{ fontSize: 11, color: '#6b7280' }}>{coin.symbol}</span>
          </div>
          <div data-eid={`coin-price-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{formatUsd(coin.price)}</span>
            <div
              data-eid={`coin-change-${i}`}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: coin.change24h >= 0 ? '#4ade80' : '#f87171',
              }}
            >
              {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
            </div>
          </div>
          <div
            data-eid={`coin-holdings-${i}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 2,
              minWidth: 90,
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              paddingLeft: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>{formatUsd(coin.holdingsValue)}</span>
            <span style={{ fontSize: 11, color: '#6b7280' }}>{coin.holdingsAmount.toFixed(4)} {coin.symbol}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
