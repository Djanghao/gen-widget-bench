import { Music, Volume2, Headphones } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts'
import data from './data.json'

type Channel = {
  name: string
  number: number
  levelPct: number
  pan: string
  panValue: number
  muted: boolean
  solo: boolean
  db: number
  color: string
}
type MixData = {
  title: string
  projectName: string
  bpm: number
  channels: Channel[]
  master: { levelPct: number; db: number }
  output: { left: { levelPct: number; db: number }; right: { levelPct: number; db: number } }
}

const mix = data as MixData

function meterGradient(pct: number) {
  if (pct > 85) return 'linear-gradient(to top, #22c55e 0%, #eab308 60%, #ef4444 90%)'
  if (pct > 60) return 'linear-gradient(to top, #22c55e 0%, #eab308 80%)'
  return 'linear-gradient(to top, #22c55e 0%, #4ade80 100%)'
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0a0f1a 0%, #151525 50%, #0a0f1a 100%)',
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
        <Music size={20} color="#818cf8" />
        <div data-eid="console-title" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          {mix.title}
        </div>
        <span
          data-eid="project-name"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.25)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {mix.projectName}
        </span>
        <span
          data-eid="bpm-badge"
          style={{
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.3)',
            borderRadius: 12,
            color: '#fcd34d',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {mix.bpm} BPM
        </span>
      </header>

      <div
        data-eid="channels-row"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}
      >
        {mix.channels.map((ch, i) => {
          const panPct = 50 + (ch.panValue / 100) * 50
          return (
            <div
              key={i}
              data-eid={`ch-${i}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${ch.color}30`,
                borderRadius: 12,
                padding: '8px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                data-eid={`ch-${i}-number`}
                style={{ fontSize: 8, color: '#64748b', fontWeight: 600 }}
              >
                CH {ch.number}
              </div>
              <div
                data-eid={`ch-${i}-name`}
                style={{ fontSize: 10, color: ch.color, fontWeight: 700 }}
              >
                {ch.name}
              </div>

              <div
                data-eid={`ch-${i}-meter`}
                style={{
                  width: 16,
                  height: 100,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <div
                  data-eid={`ch-${i}-meter-fill`}
                  style={{
                    width: '100%',
                    height: `${ch.levelPct}%`,
                    background: meterGradient(ch.levelPct),
                    borderRadius: 4,
                    transition: 'height 0.3s',
                  }}
                />
              </div>

              <div
                data-eid={`ch-${i}-pan`}
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 8, color: '#94a3b8', marginBottom: 2 }}>{ch.pan}</div>
                <div
                  data-eid={`ch-${i}-pan-bar`}
                  style={{
                    width: '100%',
                    height: 4,
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 2,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -1,
                      left: `${panPct}%`,
                      width: 6,
                      height: 6,
                      background: ch.color,
                      borderRadius: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 3 }}>
                <span
                  data-eid={`ch-${i}-mute`}
                  style={{
                    background: ch.muted ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)',
                    border: ch.muted ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    color: ch.muted ? '#fca5a5' : '#64748b',
                    fontSize: 8,
                    fontWeight: 700,
                    padding: '2px 4px',
                  }}
                >
                  M
                </span>
                <span
                  data-eid={`ch-${i}-solo`}
                  style={{
                    background: ch.solo ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.06)',
                    border: ch.solo ? '1px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    color: ch.solo ? '#fde68a' : '#64748b',
                    fontSize: 8,
                    fontWeight: 700,
                    padding: '2px 4px',
                  }}
                >
                  S
                </span>
              </div>

              <div
                data-eid={`ch-${i}-db`}
                style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1' }}
              >
                {ch.db > 0 ? '+' : ''}{ch.db.toFixed(1)} dB
              </div>
            </div>
          )
        })}
      </div>

      <div
        data-eid="master"
        style={{
          background: 'rgba(129,140,248,0.08)',
          border: '1px solid rgba(129,140,248,0.25)',
          borderRadius: 14,
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          <Volume2 size={16} color="#818cf8" />
          <div
            data-eid="master-label"
            style={{ fontSize: 13, fontWeight: 700, color: '#c7d2fe' }}
          >
            MASTER
          </div>
        </div>
        <div
          data-eid="master-meter"
          style={{
            flex: 3,
            height: 14,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            data-eid="master-meter-fill"
            style={{
              width: `${mix.master.levelPct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #22c55e 0%, #eab308 70%, #ef4444 95%)',
              borderRadius: 4,
            }}
          />
        </div>
        <div
          data-eid="master-db"
          style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', minWidth: 50, textAlign: 'right' }}
        >
          {mix.master.db.toFixed(1)} dB
        </div>
      </div>

      <div
        data-eid="output-section"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: 10,
          display: 'grid',
          gap: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Headphones size={14} color="#94a3b8" />
          <div
            data-eid="output-label"
            style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}
          >
            Stereo Out
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            data-eid="output-left-label"
            style={{ fontSize: 10, fontWeight: 700, color: '#64748b', width: 12 }}
          >
            L
          </span>
          <div
            data-eid="output-left"
            style={{
              flex: 1,
              height: 10,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              data-eid="output-left-fill"
              style={{
                width: `${mix.output.left.levelPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #22c55e, #eab308)',
                borderRadius: 3,
              }}
            />
          </div>
          <span
            data-eid="output-db-left"
            style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, minWidth: 40, textAlign: 'right' }}
          >
            {mix.output.left.db.toFixed(1)} dB
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            data-eid="output-right-label"
            style={{ fontSize: 10, fontWeight: 700, color: '#64748b', width: 12 }}
          >
            R
          </span>
          <div
            data-eid="output-right"
            style={{
              flex: 1,
              height: 10,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              data-eid="output-right-fill"
              style={{
                width: `${mix.output.right.levelPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #22c55e, #eab308)',
                borderRadius: 3,
              }}
            />
          </div>
          <span
            data-eid="output-db-right"
            style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, minWidth: 40, textAlign: 'right' }}
          >
            {mix.output.right.db.toFixed(1)} dB
          </span>
        </div>
      </div>
    </section>
  )
}
