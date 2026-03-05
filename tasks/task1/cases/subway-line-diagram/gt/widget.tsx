import { TrainFront, ArrowRight, Accessibility, AlertTriangle, Info, Clock, Timer } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, CartesianGrid } from 'recharts'
import data from './data.json'

type Transfer = { line: string; color: string }
type Station = {
  name: string
  zone: number
  type: string
  transfers: Transfer[]
  accessible: boolean
  isOrigin: boolean
  isDestination: boolean
  isTerminus: boolean
  timing: string | null
}
type Alert = { severity: string; message: string }
type TravelSegment = { from: string; to: string; minutes: number }
type TransitData = {
  lineName: string
  lineColor: string
  lineLetter: string
  direction: string
  status: string
  tripOrigin: string
  tripDestination: string
  tripTime: string
  stations: Station[]
  alerts: Alert[]
  ridership: Array<{ hour: string; riders: number }>
  travelSegments: TravelSegment[]
  nextTrainMin: number
  frequencyMin: number
  lastUpdated: string
}

const transit = data as TransitData

const severityColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  Warning: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fcd34d', icon: '#f59e0b' },
  Info: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#93c5fd', icon: '#3b82f6' },
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #0c1222 0%, #111b33 50%, #0c1222 100%)',
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
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div
          data-eid="line-indicator"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: transit.lineColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: '#fff',
          }}
        >
          {transit.lineLetter}
        </div>
        <div style={{ flex: 1 }}>
          <div data-eid="line-name" style={{ fontSize: 18, fontWeight: 700 }}>{transit.lineName}</div>
          <div data-eid="direction-label" style={{ fontSize: 11, color: '#94a3b8' }}>{transit.direction}</div>
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
          {transit.status}
        </span>
      </header>

      {/* Trip Info */}
      <div
        data-eid="trip-info"
        style={{
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          justifyContent: 'center',
        }}
      >
        <span data-eid="trip-origin" style={{ fontSize: 12, fontWeight: 600, color: '#93c5fd' }}>{transit.tripOrigin}</span>
        <span data-eid="trip-arrow"><ArrowRight size={14} color="#60a5fa" /></span>
        <span data-eid="trip-destination" style={{ fontSize: 12, fontWeight: 600, color: '#93c5fd' }}>{transit.tripDestination}</span>
        <span data-eid="trip-time" style={{ fontSize: 11, color: '#60a5fa', marginLeft: 8, fontWeight: 500 }}>
          <Timer size={12} color="#60a5fa" style={{ verticalAlign: 'middle', marginRight: 3 }} />
          {transit.tripTime}
        </span>
      </div>

      {/* Station List */}
      <div data-eid="station-list" style={{ display: 'grid', gap: 0, position: 'relative' }}>
        {transit.stations.map((station, i) => {
          const isHighlighted = station.isOrigin || station.isDestination
          const isLast = i === transit.stations.length - 1

          return (
            <div
              key={i}
              data-eid={`station-${i}`}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '8px 0',
                position: 'relative',
                background: isHighlighted ? 'rgba(59,130,246,0.06)' : 'transparent',
                borderRadius: isHighlighted ? 8 : 0,
                paddingLeft: isHighlighted ? 8 : 0,
                paddingRight: isHighlighted ? 8 : 0,
              }}
            >
              {/* Track line and dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
                <div
                  data-eid={`station-${i}-dot`}
                  style={{
                    width: isHighlighted ? 16 : 12,
                    height: isHighlighted ? 16 : 12,
                    borderRadius: '50%',
                    background: isHighlighted ? transit.lineColor : 'transparent',
                    border: `3px solid ${transit.lineColor}`,
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />
                {!isLast && (
                  <div style={{ width: 3, flex: 1, minHeight: 20, background: transit.lineColor, opacity: 0.5 }} />
                )}
              </div>

              {/* Station info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span
                    data-eid={`station-${i}-name`}
                    style={{
                      fontSize: isHighlighted ? 13 : 12,
                      fontWeight: isHighlighted ? 700 : 500,
                      color: isHighlighted ? '#e2e8f0' : '#cbd5e1',
                    }}
                  >
                    {station.name}
                  </span>
                  <span
                    data-eid={`station-${i}-zone`}
                    style={{
                      background: 'rgba(148,163,184,0.1)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 6,
                      color: '#94a3b8',
                      fontSize: 9,
                      fontWeight: 500,
                      padding: '1px 5px',
                    }}
                  >
                    Zone {station.zone}
                  </span>
                  <span
                    data-eid={`station-${i}-type`}
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: station.type === 'Express' ? '#fbbf24' : '#94a3b8',
                    }}
                  >
                    {station.type}
                  </span>
                  {station.accessible && (
                    <span data-eid={`station-${i}-accessibility`}>
                      <Accessibility size={12} color="#60a5fa" />
                    </span>
                  )}
                </div>
                {/* Transfers */}
                {station.transfers.length > 0 && (
                  <div data-eid={`station-${i}-transfers`} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {station.transfers.map((t) => (
                      <span
                        key={t.line}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: t.color,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 7,
                          fontWeight: 800,
                          color: '#fff',
                        }}
                      >
                        {t.line[0]}
                      </span>
                    ))}
                    <span style={{ fontSize: 9, color: '#64748b' }}>Transfer</span>
                  </div>
                )}
                {/* Timing info */}
                {station.timing && (
                  <span
                    data-eid={`station-${i}-time`}
                    style={{ fontSize: 10, color: '#60a5fa', fontWeight: 600 }}
                  >
                    {station.timing}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Service Alerts */}
      <div data-eid="alerts-section" style={{ display: 'grid', gap: 8 }}>
        <div data-eid="alerts-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>
          Service Alerts
        </div>
        {transit.alerts.map((alert, i) => {
          const sc = severityColors[alert.severity] || severityColors.Info
          return (
            <div
              key={i}
              data-eid={`alert-${i}`}
              style={{
                background: sc.bg,
                border: `1px solid ${sc.border}`,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '8px 10px',
              }}
            >
              {alert.severity === 'Warning' ? (
                <AlertTriangle size={14} color={sc.icon} style={{ flexShrink: 0, marginTop: 1 }} />
              ) : (
                <Info size={14} color={sc.icon} style={{ flexShrink: 0, marginTop: 1 }} />
              )}
              <span
                data-eid={`alert-${i}-severity`}
                style={{
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  borderRadius: 6,
                  color: sc.text,
                  fontSize: 9,
                  fontWeight: 600,
                  padding: '1px 5px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {alert.severity}
              </span>
              <span data-eid={`alert-${i}-message`} style={{ fontSize: 11, color: '#cbd5e1', lineHeight: 1.4 }}>
                {alert.message}
              </span>
            </div>
          )
        })}
      </div>

      {/* Ridership Chart */}
      <div data-eid="ridership-section" style={{ display: 'grid', gap: 4 }}>
        <div data-eid="ridership-title" style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>Today's Ridership</div>
        <div data-eid="ridership-chart" style={{ height: 80 }}>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={transit.ridership} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="riderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} interval={2} />
              <Area type="monotone" dataKey="riders" stroke="#3b82f6" strokeWidth={2} fill="url(#riderGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Travel Times */}
      <div data-eid="travel-times" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="travel-times-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>Travel Times</div>
        {transit.travelSegments.map((seg, i) => (
          <div
            key={i}
            data-eid={`travel-segment-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 8px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 6,
            }}
          >
            <span data-eid={`travel-segment-${i}-from`} style={{ fontSize: 10, color: '#94a3b8', flex: 1 }}>{seg.from}</span>
            <ArrowRight size={10} color="#64748b" />
            <span data-eid={`travel-segment-${i}-to`} style={{ fontSize: 10, color: '#94a3b8', flex: 1 }}>{seg.to}</span>
            <span data-eid={`travel-segment-${i}-time`} style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa' }}>{seg.minutes} min</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        data-eid="footer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(148,163,184,0.12)',
          paddingTop: 10,
          flexWrap: 'wrap',
          gap: 6,
        }}
      >
        <div data-eid="next-train" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrainFront size={16} color="#60a5fa" />
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Next train:</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa' }}>{transit.nextTrainMin} min</span>
        </div>
        <div data-eid="frequency" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={14} color="#94a3b8" />
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Every {transit.frequencyMin} min</span>
        </div>
        <div data-eid="last-updated" style={{ fontSize: 10, color: '#64748b' }}>
          Updated {transit.lastUpdated}
        </div>
      </div>
    </section>
  )
}
