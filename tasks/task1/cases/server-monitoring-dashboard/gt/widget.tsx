import { Cpu, MemoryStick, HardDrive, Wifi, AlertTriangle, AlertCircle, Info, Activity } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import data from './data.json'

type ServerData = {
  clusterName: string
  status: string
  uptimePct: number
  cpu: { currentPct: number; history: number[] }
  memory: { usedGB: number; totalGB: number }
  disk: { usedGB: number; totalGB: number }
  network: { currentMbps: number; history: number[] }
  alerts: Array<{ severity: string; message: string; timestamp: string; timeAgo: string }>
}

const server = data as ServerData

const severityColors: Record<string, { bg: string; border: string; text: string }> = {
  critical: { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', text: '#fca5a5' },
  warning: { bg: 'rgba(245,158,11,0.15)', border: '#f59e0b', text: '#fcd34d' },
  info: { bg: 'rgba(59,130,246,0.15)', border: '#3b82f6', text: '#93c5fd' },
}

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === 'critical') return <AlertCircle size={14} color="#ef4444" />
  if (severity === 'warning') return <AlertTriangle size={14} color="#f59e0b" />
  return <Info size={14} color="#3b82f6" />
}

export default function Widget() {
  const cpuData = server.cpu.history.map((v, i) => ({ i, v }))
  const netData = server.network.history.map((v, i) => ({ i, v }))
  const memPct = (server.memory.usedGB / server.memory.totalGB) * 100
  const diskPct = (server.disk.usedGB / server.disk.totalGB) * 100

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
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
      >
        <Activity size={20} color="#818cf8" />
        <div data-eid="cluster-name" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          {server.clusterName}
        </div>
        <span
          data-eid="status-badge"
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
          {server.status}
        </span>
        <span
          data-eid="uptime-badge"
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
          {server.uptimePct}% uptime
        </span>
      </header>

      <div
        data-eid="metrics-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
      >
        {/* CPU Card */}
        <div
          data-eid="card-cpu"
          style={{
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 14,
            padding: 12,
            display: 'grid',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span data-eid="cpu-icon"><Cpu size={15} color="#818cf8" /></span>
            <span data-eid="cpu-label" style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>CPU Usage</span>
          </div>
          <div data-eid="cpu-value" style={{ fontSize: 26, fontWeight: 700, color: '#c7d2fe' }}>
            {server.cpu.currentPct}%
          </div>
          <div data-eid="cpu-sparkline" style={{ height: 40, width: '100%' }}>
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={cpuData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#818cf8" strokeWidth={2} fill="url(#cpuGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Card */}
        <div
          data-eid="card-memory"
          style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 14,
            padding: 12,
            display: 'grid',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span data-eid="memory-icon"><MemoryStick size={15} color="#34d399" /></span>
            <span data-eid="memory-label" style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Memory</span>
          </div>
          <div data-eid="memory-value" style={{ fontSize: 20, fontWeight: 700, color: '#a7f3d0' }}>
            {server.memory.usedGB} <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 400 }}>/ {server.memory.totalGB} GB</span>
          </div>
          <div
            data-eid="memory-bar"
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 6,
              height: 8,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <div
              data-eid="memory-bar-fill"
              style={{
                background: 'linear-gradient(90deg, #10b981, #34d399)',
                borderRadius: 6,
                height: '100%',
                width: `${memPct.toFixed(1)}%`,
              }}
            />
          </div>
        </div>

        {/* Disk Card */}
        <div
          data-eid="card-disk"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 14,
            padding: 12,
            display: 'grid',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span data-eid="disk-icon"><HardDrive size={15} color="#fbbf24" /></span>
            <span data-eid="disk-label" style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Disk</span>
          </div>
          <div data-eid="disk-value" style={{ fontSize: 20, fontWeight: 700, color: '#fde68a' }}>
            {server.disk.usedGB} <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 400 }}>/ {server.disk.totalGB} GB</span>
          </div>
          <div
            data-eid="disk-bar"
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 6,
              height: 8,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <div
              data-eid="disk-bar-fill"
              style={{
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                borderRadius: 6,
                height: '100%',
                width: `${diskPct.toFixed(1)}%`,
              }}
            />
          </div>
        </div>

        {/* Network Card */}
        <div
          data-eid="card-network"
          style={{
            background: 'rgba(236,72,153,0.08)',
            border: '1px solid rgba(236,72,153,0.2)',
            borderRadius: 14,
            padding: 12,
            display: 'grid',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span data-eid="network-icon"><Wifi size={15} color="#f472b6" /></span>
            <span data-eid="network-label" style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Network</span>
          </div>
          <div data-eid="network-value" style={{ fontSize: 20, fontWeight: 700, color: '#fbcfe8' }}>
            {server.network.currentMbps} <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 400 }}>Mbps</span>
          </div>
          <div data-eid="network-sparkline" style={{ height: 40, width: '100%' }}>
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={netData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#f472b6" strokeWidth={2} fill="url(#netGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div data-eid="alerts-section" style={{ display: 'grid', gap: 8 }}>
        <div data-eid="alerts-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>
          Recent Alerts
        </div>
        {server.alerts.map((alert, i) => {
          const sc = severityColors[alert.severity] || severityColors.info
          return (
            <div
              key={i}
              data-eid={`alert-${i}`}
              style={{
                background: sc.bg,
                border: `1px solid ${sc.border}33`,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
              }}
            >
              <SeverityIcon severity={alert.severity} />
              <span
                data-eid={`alert-${i}-severity`}
                style={{
                  background: sc.bg,
                  border: `1px solid ${sc.border}55`,
                  borderRadius: 6,
                  color: sc.text,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 6px',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                }}
              >
                {alert.severity}
              </span>
              <span
                data-eid={`alert-${i}-message`}
                style={{
                  color: '#cbd5e1',
                  flex: 1,
                  fontSize: 11,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {alert.message}
              </span>
              <span
                data-eid={`alert-${i}-time`}
                style={{ color: '#64748b', fontSize: 10, whiteSpace: 'nowrap' }}
              >
                {alert.timeAgo}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
