import { CheckCircle2, XCircle, Loader2, GitBranch, GitCommit, Package, FileText, ChevronRight, Rocket } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid } from 'recharts'
import data from './data.json'

type Job = { name: string; status: string }
type Stage = {
  key: string
  name: string
  status: string
  duration: string
  durationSec: number
  jobs: Job[]
}
type Artifact = { name: string; type: string; size: string }
type Deploy = { env: string; version: string; time: string; status: string }

type PipelineData = {
  repo: string
  branch: string
  commit: string
  pipelineStatus: string
  stages: Stage[]
  artifacts: Artifact[]
  recentDeploys: Deploy[]
}

const pipeline = data as PipelineData

const statusColors: Record<string, { color: string; bg: string }> = {
  success: { color: '#4ade80', bg: 'rgba(34,197,94,0.15)' },
  running: { color: '#60a5fa', bg: 'rgba(96,165,250,0.15)' },
  failed: { color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
  'rolled-back': { color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
}

function StatusIcon({ status, size = 14 }: { status: string; size?: number }) {
  if (status === 'success') return <CheckCircle2 size={size} color="#4ade80" />
  if (status === 'running') return <Loader2 size={size} color="#60a5fa" />
  if (status === 'failed') return <XCircle size={size} color="#f87171" />
  return <CheckCircle2 size={size} color="#64748b" />
}

function StatusDot({ status }: { status: string }) {
  const sc = statusColors[status] || statusColors.success
  return (
    <span style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: sc.color,
      display: 'inline-block',
      flexShrink: 0,
    }} />
  )
}

const stageBarColors: Record<string, string> = {
  build: '#818cf8',
  test: '#34d399',
  staging: '#fbbf24',
  prod: '#f472b6',
}

export default function Widget() {
  const chartData = pipeline.stages.map((s) => ({
    name: s.name,
    duration: s.durationSec,
    color: stageBarColors[s.key] || '#818cf8',
  }))

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
        style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
      >
        <Rocket size={18} color="#818cf8" />
        <div data-eid="repo-name" style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>
          {pipeline.repo}
        </div>
        <span
          data-eid="branch-badge"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 8,
            color: '#a5b4fc',
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <GitBranch size={10} />
          {pipeline.branch}
        </span>
        <span
          data-eid="commit-badge"
          style={{
            background: 'rgba(148,163,184,0.1)',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: 8,
            color: '#94a3b8',
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            fontFamily: 'monospace',
          }}
        >
          <GitCommit size={10} />
          {pipeline.commit}
        </span>
        <span
          data-eid="pipeline-status"
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
          {pipeline.pipelineStatus}
        </span>
      </header>

      <div
        data-eid="pipeline-flow"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr',
          gap: 4,
          alignItems: 'start',
        }}
      >
        {pipeline.stages.map((stage, si) => {
          const sc = statusColors[stage.status] || statusColors.success
          const stageKey = stage.key
          return (
            <div key={stageKey} style={{ display: 'contents' }}>
              <div
                data-eid={`stage-${stageKey}`}
                style={{
                  background: sc.bg,
                  border: `1px solid ${sc.color}33`,
                  borderRadius: 12,
                  padding: 10,
                  display: 'grid',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span data-eid={`stage-${stageKey}-icon`}>
                    <StatusIcon status={stage.status} size={14} />
                  </span>
                  <div data-eid={`stage-${stageKey}-name`} style={{ fontSize: 11, fontWeight: 700, flex: 1 }}>
                    {stage.name}
                  </div>
                </div>
                <span data-eid={`stage-${stageKey}-duration`} style={{ fontSize: 10, color: '#94a3b8' }}>
                  {stage.duration}
                </span>
                {stage.jobs.map((job, ji) => (
                  <div
                    key={ji}
                    data-eid={`stage-${stageKey}-job-${ji}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '3px 0',
                    }}
                  >
                    <span data-eid={`stage-${stageKey}-job-${ji}-status`}>
                      <StatusDot status={job.status} />
                    </span>
                    <span
                      data-eid={`stage-${stageKey}-job-${ji}-name`}
                      style={{ fontSize: 9, color: '#cbd5e1' }}
                    >
                      {job.name}
                    </span>
                  </div>
                ))}
              </div>
              {si < pipeline.stages.length - 1 && (
                <div
                  data-eid={`connector-${si}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    color: '#475569',
                  }}
                >
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div data-eid="pipeline-chart" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="pipeline-chart-title" style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>
          Stage Durations (seconds)
        </div>
        <div style={{ height: 100, width: '100%' }}>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="duration" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="artifacts-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="artifacts-title" style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>
          Build Artifacts
        </div>
        {pipeline.artifacts.map((art, i) => (
          <div
            key={i}
            data-eid={`artifact-${i}`}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
            }}
          >
            <span data-eid={`artifact-${i}-icon`}>
              {art.type === 'docker' ? (
                <Package size={14} color="#818cf8" />
              ) : (
                <FileText size={14} color="#fbbf24" />
              )}
            </span>
            <span data-eid={`artifact-${i}-name`} style={{ fontSize: 11, color: '#cbd5e1', flex: 1, fontFamily: 'monospace' }}>
              {art.name}
            </span>
            <span data-eid={`artifact-${i}-size`} style={{ fontSize: 10, color: '#64748b' }}>
              {art.size}
            </span>
          </div>
        ))}
      </div>

      <div data-eid="deploys-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="deploys-title" style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>
          Recent Deploys
        </div>
        {pipeline.recentDeploys.map((dep, i) => {
          const sc = statusColors[dep.status] || statusColors.success
          return (
            <div
              key={i}
              data-eid={`deploy-${i}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
              }}
            >
              <span
                data-eid={`deploy-${i}-env`}
                style={{
                  background: dep.env === 'Production' ? 'rgba(239,68,68,0.12)' : 'rgba(251,191,36,0.12)',
                  border: `1px solid ${dep.env === 'Production' ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.3)'}`,
                  borderRadius: 6,
                  color: dep.env === 'Production' ? '#fca5a5' : '#fde68a',
                  fontSize: 9,
                  fontWeight: 600,
                  padding: '2px 6px',
                }}
              >
                {dep.env}
              </span>
              <span data-eid={`deploy-${i}-version`} style={{ fontSize: 11, color: '#cbd5e1', flex: 1, fontFamily: 'monospace' }}>
                {dep.version}
              </span>
              <span data-eid={`deploy-${i}-time`} style={{ fontSize: 10, color: '#64748b' }}>
                {dep.time}
              </span>
              <span data-eid={`deploy-${i}-status`}>
                <StatusDot status={dep.status} />
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
