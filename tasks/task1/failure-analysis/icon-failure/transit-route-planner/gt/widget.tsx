import data from './data.json'
import { Footprints, Bus, Train, ArrowRight, Clock, MapPin } from 'lucide-react'

type Segment = {
  mode: string
  duration: number
  from: string
  to: string
  details: {
    routeName: string
    routeColor: string
    stops: number
    departTime: string
    arriveTime: string
    frequency: string
  } | null
}

type Alternative = {
  label: string
  totalMinutes: number
  departureTime: string
  modes: string[]
  cost: string
}

type TransitData = {
  origin: string
  destination: string
  totalMinutes: number
  departureTime: string
  arrivalTime: string
  segments: Segment[]
  alternatives: Alternative[]
}

const transit = data as TransitData

function ModeIcon({ mode, size = 16 }: { mode: string; size?: number }) {
  switch (mode) {
    case 'walk': return <Footprints size={size} />
    case 'bus': return <Bus size={size} />
    case 'train': return <Train size={size} />
    default: return <Footprints size={size} />
  }
}

function modeColor(mode: string) {
  switch (mode) {
    case 'walk': return '#a3e635'
    case 'bus': return '#2E86DE'
    case 'train': return '#f59e0b'
    default: return '#94a3b8'
  }
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(170deg, #0f172a 0%, #1a1a2e 60%, #0f172a 100%)',
        borderRadius: 22,
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 400,
        overflow: 'hidden',
        padding: 18,
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
          <span data-eid="origin-label" style={{ fontSize: 18, fontWeight: 800 }}>
            {transit.origin}
          </span>
          <span data-eid="route-arrow" style={{ color: '#60a5fa' }}>
            <ArrowRight size={18} />
          </span>
          <span data-eid="dest-label" style={{ fontSize: 18, fontWeight: 800 }}>
            {transit.destination}
          </span>
        </div>
        <div style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
          <div
            data-eid="total-time"
            style={{
              background: 'rgba(59, 130, 246, 0.2)',
              borderRadius: 8,
              color: '#60a5fa',
              fontSize: 14,
              fontWeight: 700,
              padding: '3px 10px',
            }}
          >
            {transit.totalMinutes} min
          </div>
          <div
            data-eid="departure-time"
            style={{ alignItems: 'center', color: '#94a3b8', display: 'flex', fontSize: 12, gap: 4 }}
          >
            <Clock size={12} />
            Depart {transit.departureTime} — Arrive {transit.arrivalTime}
          </div>
        </div>
      </header>

      <div
        data-eid="route-timeline"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          position: 'relative',
        }}
      >
        <div
          data-eid="timeline-line"
          style={{
            background: 'linear-gradient(to bottom, #a3e635, #2E86DE, #a3e635)',
            borderRadius: 2,
            height: 'calc(100% - 20px)',
            left: 18,
            position: 'absolute',
            top: 10,
            width: 3,
            zIndex: 0,
          }}
        />

        {transit.segments.map((seg, i) => {
          const color = modeColor(seg.mode)
          return (
            <div
              key={i}
              data-eid={`segment-${i}`}
              style={{
                display: 'flex',
                gap: 14,
                padding: '10px 0',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#0f172a',
                  border: `2px solid ${color}`,
                  borderRadius: '50%',
                  color,
                  display: 'flex',
                  flexShrink: 0,
                  height: 36,
                  justifyContent: 'center',
                  width: 36,
                }}
              >
                <span data-eid={`segment-${i}-icon`}>
                  <ModeIcon mode={seg.mode} size={16} />
                </span>
              </div>

              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4 }}>
                <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                  <span
                    data-eid={seg.details ? `segment-${i}-route` : `segment-${i}-mode`}
                    style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 700 }}
                  >
                    {seg.details ? seg.details.routeName : seg.mode === 'walk' ? 'Walk' : seg.mode}
                  </span>
                  <span
                    data-eid={`segment-${i}-duration`}
                    style={{
                      background: `${color}22`,
                      borderRadius: 6,
                      color,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '1px 7px',
                    }}
                  >
                    {seg.duration} min
                  </span>
                  {seg.details && (
                    <span
                      data-eid={`segment-${i}-stops`}
                      style={{ color: '#64748b', fontSize: 11 }}
                    >
                      {seg.details.stops} stops
                    </span>
                  )}
                </div>

                <div style={{ color: '#94a3b8', display: 'flex', flexDirection: 'column', fontSize: 11, gap: 2 }}>
                  <div style={{ alignItems: 'center', display: 'flex', gap: 4 }}>
                    <MapPin size={10} />
                    <span data-eid={`segment-${i}-from`}>{seg.from}</span>
                  </div>
                  <div style={{ alignItems: 'center', display: 'flex', gap: 4 }}>
                    <MapPin size={10} />
                    <span data-eid={`segment-${i}-to`}>{seg.to}</span>
                  </div>
                </div>

                {seg.details && (
                  <div style={{ color: '#64748b', display: 'flex', fontSize: 10, gap: 10 }}>
                    <span data-eid={`segment-${i}-depart-time`}>Dep: {seg.details.departTime}</span>
                    <span data-eid={`segment-${i}-arrive-time`}>Arr: {seg.details.arriveTime}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div
        data-eid="alternatives-section"
        style={{
          background: 'rgba(30, 41, 59, 0.4)',
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: 14,
        }}
      >
        <div
          data-eid="alt-title"
          style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}
        >
          Alternative Routes
        </div>

        {transit.alternatives.map((alt, i) => (
          <div
            key={i}
            data-eid={`alt-${i}`}
            style={{
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.5)',
              borderRadius: 10,
              display: 'flex',
              gap: 8,
              justifyContent: 'space-between',
              padding: '8px 12px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 600 }}>{alt.label}</span>
              <div style={{ alignItems: 'center', color: '#64748b', display: 'flex', fontSize: 10, gap: 6 }}>
                <span>{alt.departureTime}</span>
                <span>{alt.cost}</span>
                <div style={{ display: 'flex', gap: 3 }}>
                  {alt.modes.map((m, mi) => (
                    <span key={mi} style={{ color: modeColor(m) }}>
                      <ModeIcon mode={m} size={10} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span
              data-eid={`alt-${i}-time`}
              style={{
                background: 'rgba(99, 102, 241, 0.15)',
                borderRadius: 6,
                color: '#a5b4fc',
                fontSize: 12,
                fontWeight: 700,
                padding: '2px 8px',
              }}
            >
              {alt.totalMinutes} min
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
