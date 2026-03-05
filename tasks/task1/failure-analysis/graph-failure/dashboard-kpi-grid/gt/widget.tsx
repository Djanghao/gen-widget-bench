import { DollarSign, Users, TrendingUp, Clock, Ticket, Smile, Rocket, AlertTriangle, ArrowUp, ArrowDown, Building2, RefreshCw } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import data from './data.json'

type KpiItem = {
  label: string
  value: string
  change: number
  direction: string
  target: string
  targetPct: number
  color: string
  sparkline: number[]
}

type DashboardData = {
  companyName: string
  department: string
  period: string
  refreshedAt: string
  kpis: KpiItem[]
  summary: {
    totalRevenue: string
    growthRate: string
    teamSize: string
  }
}

const dashboard = data as DashboardData

const kpiIcons = [DollarSign, Users, TrendingUp, Clock, Ticket, Smile, Rocket, AlertTriangle]

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a1035 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 14,
        maxWidth: 460,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
      >
        <Building2 size={20} color="#818cf8" />
        <div style={{ flex: 1 }}>
          <div data-eid="company-name" style={{ fontSize: 18, fontWeight: 700 }}>
            {dashboard.companyName}
          </div>
          <div data-eid="subtitle" style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>
            Engineering Dashboard
          </div>
        </div>
        <span
          data-eid="department-badge"
          style={{
            background: 'rgba(129,140,248,0.15)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {dashboard.department}
        </span>
        <span
          data-eid="period-badge"
          style={{
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 12,
            color: '#4ade80',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {dashboard.period}
        </span>
        <span
          data-eid="refresh-timestamp"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: '#64748b',
            fontSize: 10,
            width: '100%',
            marginTop: 2,
          }}
        >
          <RefreshCw size={10} color="#64748b" />
          {dashboard.refreshedAt}
        </span>
      </header>

      <div
        data-eid="kpi-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
      >
        {dashboard.kpis.map((kpi, i) => {
          const Icon = kpiIcons[i]
          const isPositiveChange = kpi.change > 0
          const isLowerBetter = ['Avg Response Time', 'Support Tickets', 'Error Rate'].includes(kpi.label)
          const isGood = isLowerBetter ? kpi.change < 0 : kpi.change > 0
          const changeColor = isGood ? '#4ade80' : '#f87171'
          const sparkData = kpi.sparkline.map((v, j) => ({ i: j, v }))

          return (
            <div
              key={i}
              data-eid={`kpi-${i}`}
              style={{
                background: `${kpi.color}12`,
                border: `1px solid ${kpi.color}30`,
                borderRadius: 14,
                padding: 12,
                display: 'grid',
                gap: 4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span data-eid={`kpi-${i}-icon`}>
                  <Icon size={14} color={kpi.color} />
                </span>
                <span
                  data-eid={`kpi-${i}-label`}
                  style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500 }}
                >
                  {kpi.label}
                </span>
              </div>
              <div
                data-eid={`kpi-${i}-value`}
                style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}
              >
                {kpi.value}
              </div>
              <div
                data-eid={`kpi-${i}-change`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 11,
                  fontWeight: 600,
                  color: changeColor,
                }}
              >
                {isPositiveChange ? (
                  <ArrowUp size={12} color={changeColor} />
                ) : (
                  <ArrowDown size={12} color={changeColor} />
                )}
                {isPositiveChange ? '+' : ''}{kpi.change}%
              </div>
              <div data-eid={`kpi-${i}-sparkline`} style={{ height: 36, width: '100%' }}>
                <ResponsiveContainer width="100%" height={36}>
                  <AreaChart data={sparkData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={`kpiGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={kpi.color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={kpi.color} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={kpi.color}
                      strokeWidth={1.5}
                      fill={`url(#kpiGrad${i})`}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div
                data-eid={`kpi-${i}-target`}
                style={{ fontSize: 9, color: '#64748b', fontWeight: 500 }}
              >
                Target: {kpi.target}
              </div>
              <div
                data-eid={`kpi-${i}-progress`}
                style={{
                  height: 4,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <div
                  data-eid={`kpi-${i}-progress-fill`}
                  style={{
                    width: `${kpi.targetPct}%`,
                    height: '100%',
                    background: kpi.color,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div
        data-eid="summary-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '10px 8px',
        }}
      >
        <div data-eid="summary-revenue" style={{ textAlign: 'center' }}>
          <div data-eid="summary-revenue-value" style={{ fontSize: 14, fontWeight: 700, color: '#c7d2fe' }}>
            {dashboard.summary.totalRevenue}
          </div>
          <div data-eid="summary-revenue-label" style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
            Total Revenue
          </div>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
        <div data-eid="summary-growth" style={{ textAlign: 'center' }}>
          <div data-eid="summary-growth-value" style={{ fontSize: 14, fontWeight: 700, color: '#a7f3d0' }}>
            {dashboard.summary.growthRate}
          </div>
          <div data-eid="summary-growth-label" style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
            Growth Rate
          </div>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
        <div data-eid="summary-team" style={{ textAlign: 'center' }}>
          <div data-eid="summary-team-value" style={{ fontSize: 14, fontWeight: 700, color: '#fde68a' }}>
            {dashboard.summary.teamSize}
          </div>
          <div data-eid="summary-team-label" style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
            Team Size
          </div>
        </div>
      </div>
    </section>
  )
}
