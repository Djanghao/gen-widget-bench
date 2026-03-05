import { Shield, Server, Database, ChevronDown, AlertCircle, AlertTriangle, Info, Activity } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import data from './data.json'

type NodeData = {
  hostname: string
  ip: string
  status: string
  cpu: number
  memory: number
  connections: number
  healthPct: number
}

type TierData = {
  name: string
  icon: string
  nodes: NodeData[]
}

type IncidentData = {
  severity: string
  message: string
  time: string
}

type WidgetData = {
  title: string
  datacenter: string
  healthPct: number
  tiers: TierData[]
  networkStats: { bandwidth: string; activeConnections: string; packetLoss: string }
  incidents: IncidentData[]
  bandwidthHistory: number[]
}

const d = data as WidgetData

const statusColors: Record<string, string> = {
  healthy: '#4ade80',
  warning: '#fbbf24',
  critical: '#ef4444',
}

const severityStyles: Record<string, { bg: string; border: string; text: string }> = {
  critical: { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', text: '#fca5a5' },
  warning: { bg: 'rgba(245,158,11,0.15)', border: '#f59e0b', text: '#fcd34d' },
  info: { bg: 'rgba(59,130,246,0.15)', border: '#3b82f6', text: '#93c5fd' },
}

const tierIcons: Record<string, React.ReactNode> = {
  shield: <Shield size={14} color="#818cf8" />,
  server: <Server size={14} color="#818cf8" />,
  database: <Database size={14} color="#818cf8" />,
}

const tierPrefixes = ['lb', 'app', 'db']

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === 'critical') return <AlertCircle size={13} color="#ef4444" />
  if (severity === 'warning') return <AlertTriangle size={13} color="#f59e0b" />
  return <Info size={13} color="#3b82f6" />
}

function NodeCard({ node, prefix, index }: { node: NodeData; prefix: string; index: number }) {
  const sc = statusColors[node.status] || statusColors.healthy
  const barColor = node.healthPct >= 90 ? '#4ade80' : node.healthPct >= 70 ? '#fbbf24' : '#ef4444'

  return (
    <div
      data-eid={`${prefix}-node-${index}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: 10,
        display: 'grid',
        gap: 5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          data-eid={`${prefix}-node-${index}-status`}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: sc,
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <div
          data-eid={`${prefix}-node-${index}-hostname`}
          style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', flex: 1 }}
        >
          {node.hostname}
        </div>
        <span
          data-eid={`${prefix}-node-${index}-ip`}
          style={{ fontSize: 10, color: '#64748b', fontFamily: 'monospace' }}
        >
          {node.ip}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, fontSize: 10 }}>
        <span data-eid={`${prefix}-node-${index}-cpu`} style={{ color: '#94a3b8' }}>
          CPU <span style={{ color: '#c7d2fe', fontWeight: 600 }}>{node.cpu}%</span>
        </span>
        <span data-eid={`${prefix}-node-${index}-mem`} style={{ color: '#94a3b8' }}>
          Mem <span style={{ color: '#c7d2fe', fontWeight: 600 }}>{node.memory}%</span>
        </span>
        <span data-eid={`${prefix}-node-${index}-conn`} style={{ color: '#94a3b8' }}>
          Conn <span style={{ color: '#c7d2fe', fontWeight: 600 }}>{node.connections.toLocaleString()}</span>
        </span>
      </div>
      <div
        data-eid={`${prefix}-node-${index}-bar`}
        style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 4,
          height: 5,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          data-eid={`${prefix}-node-${index}-bar-fill`}
          style={{
            background: barColor,
            borderRadius: 4,
            height: '100%',
            width: `${node.healthPct}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}

export default function Widget() {
  const chartData = d.bandwidthHistory.map((v, i) => ({ i, v }))

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
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
      {/* Header */}
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
      >
        <Activity size={20} color="#818cf8" />
        <div data-eid="title" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          {d.title}
        </div>
        <span
          data-eid="datacenter-badge"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.datacenter}
        </span>
        <span
          data-eid="health-pct"
          style={{
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.4)',
            borderRadius: 12,
            color: '#4ade80',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.healthPct}% Health
        </span>
      </header>

      {/* Tiers */}
      <div data-eid="tiers-section" style={{ display: 'grid', gap: 8 }}>
        {d.tiers.map((tier, ti) => (
          <div key={ti}>
            <div
              data-eid={`tier-${tierPrefixes[ti]}`}
              style={{
                background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 12,
                padding: 10,
                display: 'grid',
                gap: 8,
              }}
            >
              <div
                data-eid={`tier-${tierPrefixes[ti]}-label`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#a5b4fc',
                }}
              >
                {tierIcons[tier.icon]}
                {tier.name}
              </div>
              <div
                data-eid={`tier-${tierPrefixes[ti]}-nodes`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: tier.nodes.length > 2 ? '1fr 1fr 1fr' : '1fr 1fr',
                  gap: 8,
                }}
              >
                {tier.nodes.map((node, ni) => (
                  <NodeCard key={ni} node={node} prefix={tierPrefixes[ti]} index={ni} />
                ))}
              </div>
            </div>
            {ti < d.tiers.length - 1 && (
              <div
                data-eid={`tier-arrow-${ti + 1}`}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '4px 0',
                  color: '#475569',
                }}
              >
                <ChevronDown size={18} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Network Stats */}
      <div
        data-eid="network-stats"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}
      >
        <div
          data-eid="stat-bandwidth"
          style={{
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: 10,
            padding: 10,
            textAlign: 'center',
          }}
        >
          <span data-eid="stat-bandwidth-label" style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>
            Bandwidth
          </span>
          <span data-eid="stat-bandwidth-value" style={{ fontSize: 16, fontWeight: 700, color: '#c7d2fe' }}>
            {d.networkStats.bandwidth}
          </span>
        </div>
        <div
          data-eid="stat-connections"
          style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.15)',
            borderRadius: 10,
            padding: 10,
            textAlign: 'center',
          }}
        >
          <span data-eid="stat-connections-label" style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>
            Active Conn.
          </span>
          <span data-eid="stat-connections-value" style={{ fontSize: 16, fontWeight: 700, color: '#a7f3d0' }}>
            {d.networkStats.activeConnections}
          </span>
        </div>
        <div
          data-eid="stat-packet-loss"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.15)',
            borderRadius: 10,
            padding: 10,
            textAlign: 'center',
          }}
        >
          <span data-eid="stat-packet-loss-label" style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>
            Packet Loss
          </span>
          <span data-eid="stat-packet-loss-value" style={{ fontSize: 16, fontWeight: 700, color: '#fde68a' }}>
            {d.networkStats.packetLoss}
          </span>
        </div>
      </div>

      {/* Bandwidth Chart */}
      <div
        data-eid="bandwidth-chart"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 10,
        }}
      >
        <div
          data-eid="bandwidth-chart-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 8 }}
        >
          Bandwidth (24h)
        </div>
        <div style={{ height: 80, width: '100%' }}>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="bwGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#818cf8" strokeWidth={2} fill="url(#bwGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incidents */}
      <div data-eid="incidents-section" style={{ display: 'grid', gap: 8 }}>
        <div data-eid="incidents-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>
          Recent Incidents
        </div>
        {d.incidents.map((inc, i) => {
          const s = severityStyles[inc.severity] || severityStyles.info
          return (
            <div
              key={i}
              data-eid={`incident-${i}`}
              style={{
                background: s.bg,
                border: `1px solid ${s.border}33`,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
              }}
            >
              <SeverityIcon severity={inc.severity} />
              <span
                data-eid={`incident-${i}-severity`}
                style={{
                  background: s.bg,
                  border: `1px solid ${s.border}55`,
                  borderRadius: 6,
                  color: s.text,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 6px',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                }}
              >
                {inc.severity}
              </span>
              <span
                data-eid={`incident-${i}-message`}
                style={{
                  color: '#cbd5e1',
                  flex: 1,
                  fontSize: 11,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {inc.message}
              </span>
              <span
                data-eid={`incident-${i}-time`}
                style={{ color: '#64748b', fontSize: 10, whiteSpace: 'nowrap' }}
              >
                {inc.time}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
