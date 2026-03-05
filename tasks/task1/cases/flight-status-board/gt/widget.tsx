import data from './data.json'
import { Plane } from 'lucide-react'

type FlightData = {
  airport: string
  airportName: string
  terminal: string
  currentTime: string
  lastUpdated: string
  flights: Array<{
    flightNumber: string
    destination: string
    scheduled: string
    actual: string
    gate: string
    status: string
  }>
}

const flightData = data as FlightData

const statusColors: Record<string, { bg: string; text: string }> = {
  'On Time': { bg: 'rgba(34, 197, 94, 0.2)', text: '#4ade80' },
  'Delayed': { bg: 'rgba(250, 204, 21, 0.2)', text: '#facc15' },
  'Boarding': { bg: 'rgba(59, 130, 246, 0.25)', text: '#60a5fa' },
  'Departed': { bg: 'rgba(148, 163, 184, 0.2)', text: '#94a3b8' },
}

export default function Widget() {
  const colStyle = (flex: number): React.CSSProperties => ({
    flex,
    fontSize: 12,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0c1222 0%, #111a2e 50%, #0a0f1c 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        gap: 0,
        maxWidth: 460,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{
          alignItems: 'center',
          background: 'linear-gradient(90deg, rgba(59,130,246,0.15) 0%, rgba(15,23,42,0) 100%)',
          borderBottom: '1px solid rgba(59,130,246,0.2)',
          display: 'flex',
          gap: 10,
          justifyContent: 'space-between',
          padding: '14px 16px',
        }}
      >
        <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
          <span data-eid="plane-icon" style={{ color: '#60a5fa' }}>
            <Plane size={18} />
          </span>
          <div
            data-eid="airport-code"
            style={{ color: '#f8fafc', fontSize: 22, fontWeight: 800, letterSpacing: 2 }}
          >
            {flightData.airport}
          </div>
        </div>
        <div
          data-eid="board-title"
          style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}
        >
          Departures
        </div>
        <div
          data-eid="current-time"
          style={{ color: '#60a5fa', fontSize: 14, fontWeight: 700 }}
        >
          {flightData.currentTime}
        </div>
      </header>

      <div
        data-eid="column-headers"
        style={{
          alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.5)',
          borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
          color: '#64748b',
          display: 'flex',
          fontSize: 10,
          fontWeight: 700,
          gap: 4,
          letterSpacing: 1,
          padding: '6px 16px',
          textTransform: 'uppercase',
        }}
      >
        <span data-eid="col-flight" style={colStyle(1.2)}>Flight</span>
        <span data-eid="col-destination" style={colStyle(1.8)}>Destination</span>
        <span data-eid="col-scheduled" style={colStyle(1)}>Sched.</span>
        <span data-eid="col-actual" style={colStyle(1)}>Actual</span>
        <span data-eid="col-gate" style={colStyle(0.7)}>Gate</span>
        <span data-eid="col-status" style={{ ...colStyle(1.1), textAlign: 'right' }}>Status</span>
      </div>

      <div data-eid="flight-list" style={{ display: 'flex', flexDirection: 'column' }}>
        {flightData.flights.map((flight, i) => {
          const sc = statusColors[flight.status] || statusColors['On Time']
          return (
            <div
              key={flight.flightNumber}
              data-eid={`flight-${i}`}
              style={{
                alignItems: 'center',
                borderBottom: i < flightData.flights.length - 1 ? '1px solid rgba(51, 65, 85, 0.3)' : 'none',
                display: 'flex',
                gap: 4,
                padding: '10px 16px',
              }}
            >
              <span
                data-eid={`flight-${i}-number`}
                style={{ ...colStyle(1.2), color: '#f1f5f9', fontWeight: 700 }}
              >
                {flight.flightNumber}
              </span>
              <span style={{ ...colStyle(1.8), color: '#cbd5e1' }}>{flight.destination}</span>
              <span style={{ ...colStyle(1), color: '#94a3b8' }}>{flight.scheduled}</span>
              <span
                style={{
                  ...colStyle(1),
                  color: flight.status === 'Delayed' ? '#facc15' : '#94a3b8',
                }}
              >
                {flight.actual}
              </span>
              <span style={{ ...colStyle(0.7), color: '#94a3b8', fontWeight: 600 }}>{flight.gate}</span>
              <span
                data-eid={`flight-${i}-status`}
                style={{
                  background: sc.bg,
                  borderRadius: 10,
                  color: sc.text,
                  flex: 1.1,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 8px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {flight.status}
              </span>
            </div>
          )
        })}
      </div>

      <footer
        data-eid="footer"
        style={{
          alignItems: 'center',
          borderTop: '1px solid rgba(51, 65, 85, 0.3)',
          color: '#475569',
          display: 'flex',
          fontSize: 10,
          justifyContent: 'space-between',
          padding: '8px 16px',
        }}
      >
        <span data-eid="last-updated">Updated {flightData.lastUpdated}</span>
        <span>{flightData.terminal}</span>
      </footer>
    </section>
  )
}
