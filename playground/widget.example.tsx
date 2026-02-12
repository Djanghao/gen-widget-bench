import type { ReactNode } from 'react'
import { AlertTriangle, DollarSign, TrendingUp, Users } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const revenueTrend = [
  { day: 'Mon', orders: 82, revenue: 12400 },
  { day: 'Tue', orders: 95, revenue: 14800 },
  { day: 'Wed', orders: 88, revenue: 13600 },
  { day: 'Thu', orders: 112, revenue: 17200 },
  { day: 'Fri', orders: 126, revenue: 19500 },
  { day: 'Sat', orders: 119, revenue: 18400 },
  { day: 'Sun', orders: 134, revenue: 20900 },
]

const channelMix = [
  { channel: 'Organic', users: 5200 },
  { channel: 'Paid', users: 3600 },
  { channel: 'Social', users: 2900 },
  { channel: 'Referral', users: 1700 },
]

const deviceSplit = [
  { name: 'Desktop', value: 49, color: '#0f766e' },
  { name: 'Mobile', value: 41, color: '#2563eb' },
  { name: 'Tablet', value: 10, color: '#f59e0b' },
]

const alerts = [
  { level: 'High', message: 'Checkout drop-off increased 11% today.' },
  { level: 'Medium', message: 'API latency crossed 350ms for 8 mins.' },
  { level: 'Low', message: 'Email click-through slightly below target.' },
]

const tasks = [
  { label: 'Launch seasonal banner', progress: 92 },
  { label: 'Retargeting experiment', progress: 68 },
  { label: 'Checkout UX polish', progress: 54 },
]

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #ffffff 0%, #f8fbff 100%)',
        border: '1px solid #dce7f5',
        borderRadius: 20,
        boxShadow: '0 24px 48px rgba(15, 23, 42, 0.08)',
        color: '#0b1a35',
        display: 'grid',
        gap: 16,
        maxWidth: 920,
        padding: 22,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
          <TrendingUp size={18} />
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Performance Dashboard</h2>
        </div>
        <span
          style={{
            background: '#e7f9f3',
            border: '1px solid #b7ecd9',
            borderRadius: 999,
            color: '#0f766e',
            fontSize: 12,
            fontWeight: 700,
            padding: '4px 10px',
          }}
        >
          LIVE
        </span>
      </header>

      <div
        data-testid="revenue-mini-cards"
        style={{
          display: 'grid',
          gap: 10,
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        }}
      >
        <MetricCard
          testId="revenue-mini-card-1"
          color="#0f766e"
          icon={<DollarSign size={16} />}
          title="Revenue"
          trend="+14.8%"
          value="$20.9k"
        />
        <MetricCard
          testId="revenue-mini-card-2"
          color="#2563eb"
          icon={<Users size={16} />}
          title="Active Users"
          trend="+9.2%"
          value="13.4k"
        />
        <MetricCard
          testId="revenue-mini-card-3"
          color="#7c3aed"
          icon={<TrendingUp size={16} />}
          title="Orders"
          trend="+6.1%"
          value="134"
        />
        <MetricCard
          testId="revenue-mini-card-4"
          color="#dc2626"
          icon={<AlertTriangle size={16} />}
          title="Open Alerts"
          trend="-2 today"
          value="3"
        />
      </div>

      <div
        data-testid="dashboard-alignment-grid"
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <Panel dataTestId="card-revenue-vs-orders-7d" title="Revenue vs Orders (7d)">
          <div style={{ height: 220, width: '100%' }}>
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis orientation="right" yAxisId="right" />
                <Tooltip />
                <Line dataKey="revenue" dot={false} stroke="#0f766e" strokeWidth={3} yAxisId="left" />
                <Line dataKey="orders" dot={false} stroke="#2563eb" strokeWidth={2} yAxisId="right" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel dataTestId="card-device-split" title="Device Split">
          <div style={{ height: 220, width: '100%' }}>
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={deviceSplit}
                  dataKey="value"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={2}
                >
                  {deviceSplit.map((entry) => (
                    <Cell fill={entry.color} key={entry.name} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {deviceSplit.map((entry) => (
              <LegendItem color={entry.color} key={entry.name} label={`${entry.name} ${entry.value}%`} />
            ))}
          </div>
        </Panel>
        <Panel dataTestId="card-traffic-channels" title="Traffic Channels">
          <div style={{ height: 210, width: '100%' }}>
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={channelMix}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#1d4ed8" radius={[7, 7, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel dataTestId="card-alerts-tasks" title="Alerts & Tasks">
          <div style={{ display: 'grid', gap: 10 }}>
            {alerts.map((alert) => (
              <div
                key={alert.message}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  display: 'grid',
                  gap: 3,
                  padding: '8px 10px',
                }}
              >
                <span style={{ color: '#b45309', fontSize: 12, fontWeight: 700 }}>{alert.level}</span>
                <span style={{ color: '#334155', fontSize: 13 }}>{alert.message}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px dashed #d1d9e6', display: 'grid', gap: 9, marginTop: 10, paddingTop: 10 }}>
            {tasks.map((task) => (
              <div key={task.label} style={{ display: 'grid', gap: 4 }}>
                <div style={{ display: 'flex', fontSize: 12, justifyContent: 'space-between' }}>
                  <span>{task.label}</span>
                  <strong>{task.progress}%</strong>
                </div>
                <div style={{ background: '#e2e8f0', borderRadius: 999, height: 7, overflow: 'hidden' }}>
                  <div
                    style={{
                      background: 'linear-gradient(90deg, #0f766e 0%, #2563eb 100%)',
                      borderRadius: 999,
                      height: '100%',
                      width: `${task.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  )
}

function Panel(props: { children: ReactNode; dataTestId?: string; title: string }) {
  return (
    <article
      data-testid={props.dataTestId}
      style={{
        background: '#ffffff',
        border: '1px solid #dbe3ef',
        borderRadius: 14,
        display: 'grid',
        gap: 10,
        minHeight: 110,
        padding: 12,
      }}
    >
      <h3 style={{ fontSize: 13, letterSpacing: '0.03em', margin: 0, textTransform: 'uppercase' }}>{props.title}</h3>
      {props.children}
    </article>
  )
}

function MetricCard(props: {
  color: string
  icon: ReactNode
  testId?: string
  title: string
  trend: string
  value: string
}) {
  return (
    <article
      data-testid={props.testId}
      style={{
        background: '#fff',
        border: '1px solid #dbe3ef',
        borderRadius: 12,
        display: 'grid',
        gap: 6,
        minHeight: 86,
        padding: '10px 12px',
      }}
    >
      <div style={{ alignItems: 'center', color: props.color, display: 'flex', gap: 7, fontSize: 12, fontWeight: 700 }}>
        {props.icon}
        <span>{props.title}</span>
      </div>
      <strong style={{ fontSize: 20, letterSpacing: '0.02em' }}>{props.value}</strong>
      <p style={{ color: '#475569', margin: 0 }}>{props.trend}</p>
    </article>
  )
}

function LegendItem(props: { color: string; label: string }) {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
      <span style={{ background: props.color, borderRadius: 999, display: 'inline-block', height: 10, width: 10 }} />
      <span style={{ color: '#334155', fontSize: 12 }}>{props.label}</span>
    </div>
  )
}
