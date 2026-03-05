import { Satellite, Zap, Radio, Thermometer, Navigation, Signal } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import data from './data.json'

type PassData = {
  time: string
  duration: string
  maxElevation: string
  direction: string
}

type SubsystemData = {
  name: string
  key: string
  value: string
  status: string
}

type WidgetData = {
  missionName: string
  orbitType: string
  elapsedTime: string
  orbitalParams: Record<string, { value: number; unit: string }>
  groundTrack: { currentLat: number; currentLon: number; positionPct: number }
  passes: PassData[]
  subsystems: SubsystemData[]
  signal: { dBm: number; quality: string; strengthPct: number }
  altitudeHistory: number[]
}

const d = data as WidgetData

const paramKeys = ['altitude', 'velocity', 'inclination', 'period', 'eccentricity']

const subsysIcons: Record<string, React.ReactNode> = {
  power: <Zap size={14} color="#fbbf24" />,
  comms: <Radio size={14} color="#60a5fa" />,
  thermal: <Thermometer size={14} color="#f87171" />,
  adcs: <Navigation size={14} color="#a78bfa" />,
}

const statusColors: Record<string, { bg: string; text: string }> = {
  nominal: { bg: 'rgba(34,197,94,0.15)', text: '#4ade80' },
  warning: { bg: 'rgba(245,158,11,0.15)', text: '#fbbf24' },
  critical: { bg: 'rgba(239,68,68,0.15)', text: '#f87171' },
}

export default function Widget() {
  const altData = d.altitudeHistory.map((v, i) => ({ i, v }))

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a1033 50%, #0f172a 100%)',
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
        <Satellite size={20} color="#a78bfa" />
        <div data-eid="mission-name" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          {d.missionName}
        </div>
        <span
          data-eid="orbit-badge"
          style={{
            background: 'rgba(167,139,250,0.15)',
            border: '1px solid rgba(167,139,250,0.4)',
            borderRadius: 12,
            color: '#c4b5fd',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.orbitType}
        </span>
        <span
          data-eid="elapsed-time"
          style={{
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.elapsedTime}
        </span>
      </header>

      {/* Orbital Parameters */}
      <div
        data-eid="orbital-params"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 12,
          display: 'grid',
          gap: 8,
        }}
      >
        <div
          data-eid="orbital-params-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc' }}
        >
          Orbital Parameters
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {paramKeys.map((key) => {
            const p = d.orbitalParams[key]
            return (
              <div
                key={key}
                data-eid={`param-${key}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 8,
                  padding: 8,
                  textAlign: 'center',
                }}
              >
                <span
                  data-eid={`param-${key}-label`}
                  style={{ fontSize: 9, color: '#94a3b8', display: 'block', marginBottom: 4 }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <span
                  data-eid={`param-${key}-value`}
                  style={{ fontSize: 13, fontWeight: 700, color: '#c7d2fe', display: 'block' }}
                >
                  {p.value}
                  {p.unit && (
                    <span style={{ fontSize: 9, color: '#94a3b8', marginLeft: 2 }}>{p.unit}</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ground Track */}
      <div
        data-eid="ground-track"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 12,
          display: 'grid',
          gap: 8,
        }}
      >
        <div
          data-eid="ground-track-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc' }}
        >
          Ground Track
        </div>
        <div
          data-eid="ground-track-bar"
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 6,
            height: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Grid lines */}
          {[25, 50, 75].map((pct) => (
            <div
              key={pct}
              style={{
                position: 'absolute',
                left: `${pct}%`,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'rgba(255,255,255,0.08)',
              }}
            />
          ))}
          <div
            data-eid="ground-track-marker"
            style={{
              position: 'absolute',
              left: `${d.groundTrack.positionPct}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#a78bfa',
              boxShadow: '0 0 8px rgba(167,139,250,0.6)',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#64748b' }}>
          <span data-eid="ground-track-label-start">-180 deg</span>
          <span data-eid="ground-track-label-end">+180 deg</span>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
          <span data-eid="ground-track-lat" style={{ color: '#94a3b8' }}>
            Lat: <span style={{ color: '#c7d2fe', fontWeight: 600 }}>{d.groundTrack.currentLat} deg</span>
          </span>
          <span data-eid="ground-track-lon" style={{ color: '#94a3b8' }}>
            Lon: <span style={{ color: '#c7d2fe', fontWeight: 600 }}>{d.groundTrack.currentLon} deg</span>
          </span>
        </div>
      </div>

      {/* Next Passes */}
      <div data-eid="passes-section" style={{ display: 'grid', gap: 8 }}>
        <div
          data-eid="passes-title"
          style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}
        >
          Next Passes
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 4,
            fontSize: 9,
            color: '#64748b',
            fontWeight: 600,
            padding: '0 8px',
          }}
        >
          <span>TIME</span>
          <span>DURATION</span>
          <span>MAX ELEV.</span>
          <span>DIR</span>
        </div>
        {d.passes.map((pass, i) => (
          <div
            key={i}
            data-eid={`pass-${i}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: 4,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 8,
              padding: '7px 8px',
              fontSize: 11,
            }}
          >
            <span data-eid={`pass-${i}-time`} style={{ color: '#e2e8f0', fontWeight: 600 }}>
              {pass.time}
            </span>
            <span data-eid={`pass-${i}-duration`} style={{ color: '#94a3b8' }}>
              {pass.duration}
            </span>
            <span data-eid={`pass-${i}-elevation`} style={{ color: '#c4b5fd' }}>
              {pass.maxElevation}
            </span>
            <span data-eid={`pass-${i}-direction`} style={{ color: '#94a3b8' }}>
              {pass.direction}
            </span>
          </div>
        ))}
      </div>

      {/* Telemetry */}
      <div data-eid="telemetry-section" style={{ display: 'grid', gap: 8 }}>
        <div
          data-eid="telemetry-title"
          style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}
        >
          Subsystem Telemetry
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {d.subsystems.map((sub) => {
            const sc = statusColors[sub.status] || statusColors.nominal
            return (
              <div
                key={sub.key}
                data-eid={`subsys-${sub.key}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {subsysIcons[sub.key]}
                <div style={{ flex: 1 }}>
                  <span
                    data-eid={`subsys-${sub.key}-label`}
                    style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}
                  >
                    {sub.name}
                  </span>
                  <span
                    data-eid={`subsys-${sub.key}-value`}
                    style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}
                  >
                    {sub.value}
                  </span>
                </div>
                <span
                  data-eid={`subsys-${sub.key}-status`}
                  style={{
                    background: sc.bg,
                    borderRadius: 6,
                    color: sc.text,
                    fontSize: 9,
                    fontWeight: 600,
                    padding: '2px 6px',
                    textTransform: 'capitalize',
                  }}
                >
                  {sub.status}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Signal Strength */}
      <div
        data-eid="signal-section"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Signal size={16} color="#a78bfa" />
        <div
          data-eid="signal-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc', flex: 0 }}
        >
          Signal
        </div>
        <div
          data-eid="signal-bar"
          style={{
            flex: 1,
            height: 10,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 5,
            overflow: 'hidden',
          }}
        >
          <div
            data-eid="signal-bar-fill"
            style={{
              height: '100%',
              width: `${d.signal.strengthPct}%`,
              background: 'linear-gradient(90deg, #a78bfa, #818cf8)',
              borderRadius: 5,
            }}
          />
        </div>
        <span
          data-eid="signal-value"
          style={{ fontSize: 12, fontWeight: 700, color: '#c7d2fe', whiteSpace: 'nowrap' }}
        >
          {d.signal.dBm} dBm
        </span>
        <span
          data-eid="signal-quality"
          style={{
            background: 'rgba(34,197,94,0.15)',
            borderRadius: 6,
            color: '#4ade80',
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
          }}
        >
          {d.signal.quality}
        </span>
      </div>

      {/* Altitude Chart */}
      <div
        data-eid="altitude-chart"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 10,
        }}
      >
        <div
          data-eid="altitude-chart-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 8 }}
        >
          Altitude History
        </div>
        <div style={{ height: 70, width: '100%' }}>
          <ResponsiveContainer width="100%" height={70}>
            <AreaChart data={altData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="altGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#a78bfa" strokeWidth={2} fill="url(#altGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
