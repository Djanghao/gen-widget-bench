import { Activity, Clock, Zap, Gauge } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import data from './data.json'

type Endpoint = {
  method: string
  path: string
  status: string
  avgLatency: number
  p99Latency: number
  errorRate: number
  rpm: number
  latencyHistory: number[]
}

type ApiData = {
  apiName: string
  apiVersion: string
  healthScore: number
  uptimePct: number
  totalRequests: string
  lastChecked: string
  overallAvgLatency: number
  overallErrorRate: number
  overallRpm: number
  responseCodes: { '2xx': number; '4xx': number; '5xx': number }
  endpoints: Endpoint[]
}

const api = data as ApiData

const methodColors: Record<string, { bg: string; border: string; text: string }> = {
  GET: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', text: '#4ade80' },
  POST: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', text: '#60a5fa' },
  PUT: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', text: '#fbbf24' },
  DELETE: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#f87171' },
}

const statusColors: Record<string, string> = {
  healthy: '#4ade80',
  degraded: '#fbbf24',
  critical: '#ef4444',
}

function HealthRing({ score }: { score: number }) {
  const ringData = [{ value: score, fill: score > 90 ? '#4ade80' : score > 70 ? '#fbbf24' : '#ef4444' }]
  return (
    <div style={{ width: 56, height: 56, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          data={ringData}
          startAngle={90}
          endAngle={-270}
          barSize={6}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: 'rgba(255,255,255,0.08)' }}
            dataKey="value"
            angleAxisId={0}
            cornerRadius={4}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a1033 50%, #0f172a 100%)',
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
        style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
      >
        <Zap size={18} color="#818cf8" />
        <div data-eid="api-name" style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>
          {api.apiName}
        </div>
        <span
          data-eid="api-version"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 8,
            color: '#a5b4fc',
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
            fontFamily: 'monospace',
          }}
        >
          {api.apiVersion}
        </span>
        <div data-eid="health-score" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HealthRing score={api.healthScore} />
          <span
            data-eid="health-score-value"
            style={{
              position: 'absolute',
              fontSize: 11,
              fontWeight: 700,
              color: '#f1f5f9',
            }}
          >
            {api.healthScore}%
          </span>
        </div>
        <span
          data-eid="uptime-badge"
          style={{
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.4)',
            borderRadius: 8,
            color: '#4ade80',
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
          }}
        >
          {api.uptimePct}% uptime
        </span>
      </header>

      <div data-eid="summary-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <div
          data-eid="stat-avg-latency"
          style={{
            background: 'rgba(129,140,248,0.08)',
            border: '1px solid rgba(129,140,248,0.2)',
            borderRadius: 10,
            padding: '8px 10px',
            display: 'grid',
            gap: 2,
          }}
        >
          <span data-eid="stat-avg-latency-label" style={{ fontSize: 9, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Avg Latency
          </span>
          <span data-eid="stat-avg-latency-value" style={{ fontSize: 18, fontWeight: 700, color: '#a5b4fc' }}>
            {api.overallAvgLatency}ms
          </span>
        </div>
        <div
          data-eid="stat-error-rate"
          style={{
            background: 'rgba(251,191,36,0.08)',
            border: '1px solid rgba(251,191,36,0.2)',
            borderRadius: 10,
            padding: '8px 10px',
            display: 'grid',
            gap: 2,
          }}
        >
          <span data-eid="stat-error-rate-label" style={{ fontSize: 9, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Error Rate
          </span>
          <span data-eid="stat-error-rate-value" style={{ fontSize: 18, fontWeight: 700, color: '#fbbf24' }}>
            {api.overallErrorRate}%
          </span>
        </div>
        <div
          data-eid="stat-rpm"
          style={{
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 10,
            padding: '8px 10px',
            display: 'grid',
            gap: 2,
          }}
        >
          <span data-eid="stat-rpm-label" style={{ fontSize: 9, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Requests/min
          </span>
          <span data-eid="stat-rpm-value" style={{ fontSize: 18, fontWeight: 700, color: '#4ade80' }}>
            {api.overallRpm.toLocaleString()}
          </span>
        </div>
      </div>

      <div data-eid="endpoints-section" style={{ display: 'grid', gap: 8 }}>
        <div data-eid="endpoints-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>
          Endpoints
        </div>
        {api.endpoints.map((ep, i) => {
          const mc = methodColors[ep.method] || methodColors.GET
          const sc = statusColors[ep.status] || '#4ade80'
          const sparkData = ep.latencyHistory.map((v, j) => ({ i: j, v }))

          return (
            <div
              key={i}
              data-eid={`endpoint-${i}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 10,
                display: 'grid',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span
                  data-eid={`endpoint-${i}-method`}
                  style={{
                    background: mc.bg,
                    border: `1px solid ${mc.border}`,
                    borderRadius: 6,
                    color: mc.text,
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '2px 6px',
                    fontFamily: 'monospace',
                  }}
                >
                  {ep.method}
                </span>
                <span
                  data-eid={`endpoint-${i}-path`}
                  style={{ fontSize: 11, color: '#cbd5e1', fontFamily: 'monospace', flex: 1 }}
                >
                  {ep.path}
                </span>
                <span
                  data-eid={`endpoint-${i}-status`}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: sc,
                    display: 'inline-block',
                    boxShadow: `0 0 6px ${sc}`,
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'grid', gap: 1 }}>
                  <span data-eid={`endpoint-${i}-avg-latency-label`} style={{ fontSize: 8, color: '#475569', fontWeight: 600, textTransform: 'uppercase' }}>Avg</span>
                  <span
                    data-eid={`endpoint-${i}-avg-latency`}
                    style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}
                  >
                    {ep.avgLatency}ms
                  </span>
                </div>
                <div style={{ display: 'grid', gap: 1 }}>
                  <span data-eid={`endpoint-${i}-p99-latency-label`} style={{ fontSize: 8, color: '#475569', fontWeight: 600, textTransform: 'uppercase' }}>P99</span>
                  <span
                    data-eid={`endpoint-${i}-p99-latency`}
                    style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8' }}
                  >
                    {ep.p99Latency}ms
                  </span>
                </div>
                <div
                  data-eid={`endpoint-${i}-sparkline`}
                  style={{ flex: 1, height: 30 }}
                >
                  <ResponsiveContainer width="100%" height={30}>
                    <AreaChart data={sparkData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id={`epGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={mc.text} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={mc.text} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={mc.text}
                        strokeWidth={1.5}
                        fill={`url(#epGrad${i})`}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'grid', gap: 1, textAlign: 'right' }}>
                  <span data-eid={`endpoint-${i}-error-rate-label`} style={{ fontSize: 8, color: '#475569', fontWeight: 600, textTransform: 'uppercase' }}>Errors</span>
                  <span
                    data-eid={`endpoint-${i}-error-rate`}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: ep.errorRate > 2 ? '#f87171' : ep.errorRate > 1 ? '#fbbf24' : '#4ade80',
                    }}
                  >
                    {ep.errorRate.toFixed(2)}%
                  </span>
                </div>
                <span
                  data-eid={`endpoint-${i}-rpm`}
                  style={{ fontSize: 10, color: '#64748b', textAlign: 'right', minWidth: 36 }}
                >
                  {ep.rpm.toLocaleString()} rpm
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div data-eid="response-codes-section" style={{ display: 'grid', gap: 8 }}>
        <div data-eid="response-codes-title" style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>
          Response Code Distribution
        </div>
        <div
          data-eid="response-codes-bar"
          style={{
            display: 'flex',
            height: 12,
            borderRadius: 6,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <div
            data-eid="response-codes-2xx-fill"
            style={{
              width: `${api.responseCodes['2xx']}%`,
              background: 'linear-gradient(90deg, #22c55e, #4ade80)',
              height: '100%',
            }}
          />
          <div
            data-eid="response-codes-4xx-fill"
            style={{
              width: `${api.responseCodes['4xx']}%`,
              background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              height: '100%',
            }}
          />
          <div
            data-eid="response-codes-5xx-fill"
            style={{
              width: `${api.responseCodes['5xx']}%`,
              background: 'linear-gradient(90deg, #ef4444, #f87171)',
              height: '100%',
            }}
          />
        </div>
        <div
          data-eid="response-codes-legend"
          style={{ display: 'flex', gap: 16, fontSize: 10, color: '#94a3b8' }}
        >
          <span data-eid="response-codes-2xx-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#4ade80', display: 'inline-block' }} />
            2xx: {api.responseCodes['2xx']}%
          </span>
          <span data-eid="response-codes-4xx-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#fbbf24', display: 'inline-block' }} />
            4xx: {api.responseCodes['4xx']}%
          </span>
          <span data-eid="response-codes-5xx-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#f87171', display: 'inline-block' }} />
            5xx: {api.responseCodes['5xx']}%
          </span>
        </div>
      </div>

      <div
        data-eid="footer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 8,
        }}
      >
        <span data-eid="footer-total-requests" style={{ fontSize: 10, color: '#64748b' }}>
          Total: {api.totalRequests} requests
        </span>
        <span data-eid="footer-last-checked" style={{ fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Clock size={10} />
          {api.lastChecked}
        </span>
      </div>
    </section>
  )
}
