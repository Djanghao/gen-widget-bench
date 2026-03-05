import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { TrendingUp } from 'lucide-react'
import data from './data.json'

type ChartPoint = {
  month: string
  portfolio: number
  sp500: number
  bonds: number
}

type Metric = {
  label: string
  value: string
}

type InvestmentData = {
  portfolioName: string
  dateRange: string
  chartData: ChartPoint[]
  metrics: Metric[]
}

const investment = data as InvestmentData

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(150deg, #0b0b1a 0%, #141428 50%, #0e0e1c 100%)',
        borderRadius: 20,
        color: '#e4e4ed',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        maxWidth: 460,
        padding: 22,
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={20} color="#818cf8" />
          <div data-eid="portfolio-name" style={{ fontSize: 18, fontWeight: 700 }}>
            {investment.portfolioName}
          </div>
        </div>
        <div data-eid="date-range" style={{ fontSize: 13, color: '#6b7280' }}>
          {investment.dateRange}
        </div>
      </div>

      {/* Line Chart */}
      <div data-eid="chart-section" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div data-eid="line-chart" style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={investment.chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[96, 128]}
              />
              <Tooltip
                contentStyle={{
                  background: '#1e1e2e',
                  border: '1px solid #333',
                  borderRadius: 8,
                  color: '#e8e8f0',
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="portfolio" stroke="#818cf8" strokeWidth={2.5} dot={false} name="Portfolio" />
              <Line type="monotone" dataKey="sp500" stroke="#4ade80" strokeWidth={2} dot={false} name="S&P 500" />
              <Line type="monotone" dataKey="bonds" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="Bonds" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div data-eid="legend" style={{ display: 'flex', justifyContent: 'center', gap: 20, fontSize: 12 }}>
          <span data-eid="legend-portfolio" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 12, height: 3, background: '#818cf8', borderRadius: 2, display: 'inline-block' }} />
            Portfolio
          </span>
          <span data-eid="legend-sp500" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 12, height: 3, background: '#4ade80', borderRadius: 2, display: 'inline-block' }} />
            S&P 500
          </span>
          <span data-eid="legend-bonds" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 12, height: 3, background: '#f59e0b', borderRadius: 2, display: 'inline-block' }} />
            Bonds
          </span>
        </div>
      </div>

      {/* Summary Metrics */}
      <div data-eid="summary-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="summary-title" style={{ fontSize: 13, color: '#8b8fa3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          Performance Summary
        </div>
        {investment.metrics.map((metric, i) => (
          <div
            key={metric.label}
            data-eid={`metric-row-${i}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10,
              padding: '10px 14px',
            }}
          >
            <span data-eid={`metric-label-${i}`} style={{ fontSize: 13, color: '#9ca3af' }}>
              {metric.label}
            </span>
            <span
              data-eid={`metric-value-${i}`}
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: metric.value.startsWith('+') ? '#4ade80' : metric.value.startsWith('-') ? '#f87171' : '#e4e4ed',
              }}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
