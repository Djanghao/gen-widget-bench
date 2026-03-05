import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { RefreshCw } from 'lucide-react'
import data from './data.json'

type CurrencyItem = {
  code: string
  name: string
  flag: string
  rate: number
  change: number
}

type StrengthItem = {
  code: string
  strength: number
}

type ExchangeData = {
  baseCurrency: string
  baseAmount: number
  lastUpdated: string
  currencies: CurrencyItem[]
  strengthData: StrengthItem[]
}

const exchange = data as ExchangeData

function formatRate(rate: number): string {
  if (rate >= 100) return rate.toFixed(4)
  if (rate >= 10) return rate.toFixed(4)
  return rate.toFixed(4)
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #0d0d1b 0%, #151530 50%, #0b0b18 100%)',
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
          <RefreshCw size={18} color="#818cf8" />
          <div data-eid="base-currency" style={{ fontSize: 18, fontWeight: 700 }}>
            Exchange Rates
          </div>
        </div>
        <div data-eid="base-amount" style={{ fontSize: 26, fontWeight: 700 }}>
          {exchange.baseAmount.toFixed(2)} {exchange.baseCurrency}
        </div>
        <div data-eid="last-updated" style={{ fontSize: 11, color: '#6b7280' }}>
          Updated: {exchange.lastUpdated}
        </div>
      </div>

      {/* Currency List */}
      <div data-eid="currency-list" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {exchange.currencies.map((cur, i) => (
          <div
            key={cur.code}
            data-eid={`currency-row-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <span data-eid={`currency-flag-${i}`} style={{ fontSize: 20, flexShrink: 0 }}>
              {cur.flag}
            </span>
            <span data-eid={`currency-code-${i}`} style={{ fontSize: 14, fontWeight: 700, minWidth: 36 }}>
              {cur.code}
            </span>
            <span data-eid={`currency-name-${i}`} style={{ fontSize: 12, color: '#8b8fa3', flex: 1 }}>
              {cur.name}
            </span>
            <span data-eid={`currency-rate-${i}`} style={{ fontSize: 14, fontWeight: 600, minWidth: 80, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
              {formatRate(cur.rate)}
            </span>
            <span
              data-eid={`currency-change-${i}`}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: cur.change >= 0 ? '#4ade80' : '#f87171',
                minWidth: 52,
                textAlign: 'right',
              }}
            >
              {cur.change >= 0 ? '+' : ''}{cur.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div data-eid="chart-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="chart-title" style={{ fontSize: 13, color: '#8b8fa3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          Relative Strength (24h)
        </div>
        <div data-eid="bar-chart" style={{ width: '100%', height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={exchange.strengthData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="code" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e1e2e', border: '1px solid #333', borderRadius: 8, color: '#e8e8f0', fontSize: 12 }}
                formatter={(value: number) => [`${value >= 0 ? '+' : ''}${value.toFixed(2)}%`, 'Change']}
              />
              <Bar dataKey="strength" radius={[4, 4, 0, 0]}>
                {exchange.strengthData.map((entry, idx) => (
                  <Cell key={entry.code} fill={entry.strength >= 0 ? '#4ade80' : '#f87171'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
