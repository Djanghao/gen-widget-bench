import data from './data.json'
import { Plane, Clock, MapPin, RefreshCw, Cloud, Sun, CloudRain, CloudSnow, Wind, CloudFog } from 'lucide-react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts'

const statusColors: Record<string, { bg: string; text: string }> = {
  'On Time': { bg: 'rgba(34,197,94,0.12)', text: '#16a34a' },
  'Delayed': { bg: 'rgba(220,38,38,0.1)', text: '#dc2626' },
  'Boarding': { bg: 'rgba(37,99,235,0.1)', text: '#2563eb' },
  'Landed': { bg: 'rgba(107,114,128,0.12)', text: '#6b7280' },
}

const scatterData = data.airports.map(a => ({ x: a.lng, y: a.lat, z: 100, name: a.code }))

export default function Widget() {
  const flights = data.flights
  const onTime = flights.filter(f => f.status === 'On Time').length
  const delayed = flights.filter(f => f.status === 'Delayed').length
  const landed = flights.filter(f => f.status === 'Landed').length

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #f8f9fa 0%, #f1f3f5 50%, #f8f9fa 100%)',
        borderRadius: 20,
        color: '#1a1a2e',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        maxWidth: 480,
        overflow: 'hidden',
        padding: 16,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 data-eid="title" style={{ fontSize: 18, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plane size={20} color="#2563eb" /> Flight Tracker
        </h1>
        <div data-eid="header-stats" style={{ display: 'flex', gap: 8 }}>
          <span data-eid="stat-total" style={{ background: 'rgba(37,99,235,0.1)', color: '#2563eb', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
            {flights.length} Total
          </span>
          <span data-eid="stat-ontime" style={{ background: statusColors['On Time'].bg, color: statusColors['On Time'].text, padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
            {onTime} On Time
          </span>
          <span data-eid="stat-delayed" style={{ background: statusColors['Delayed'].bg, color: statusColors['Delayed'].text, padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
            {delayed} Delayed
          </span>
          <span data-eid="stat-landed" style={{ background: statusColors['Landed'].bg, color: statusColors['Landed'].text, padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
            {landed} Landed
          </span>
        </div>
      </header>

      <div data-eid="map-section" style={{ background: '#ffffff', borderRadius: 12, padding: 12, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 data-eid="map-title" style={{ fontSize: 13, fontWeight: 600, margin: '0 0 8px 0', color: '#6b7280' }}>
          <MapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Airport Locations
        </h2>
        <div data-eid="map-chart" style={{ width: '100%', height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 5, right: 15, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis type="number" dataKey="x" domain={[-160, -70]} tick={{ fontSize: 9, fill: '#9ca3af' }} tickFormatter={(v: number) => `${v}W`} />
              <YAxis type="number" dataKey="y" domain={[20, 50]} tick={{ fontSize: 9, fill: '#9ca3af' }} tickFormatter={(v: number) => `${v}N`} />
              <ZAxis type="number" dataKey="z" range={[60, 60]} />
              <Tooltip content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const d = payload[0].payload as { name: string }
                  return <div style={{ background: '#ffffff', padding: '4px 8px', borderRadius: 6, fontSize: 11, color: '#1a1a2e', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>{d.name}</div>
                }
                return null
              }} />
              <Scatter data={scatterData} fill="#2563eb" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="flights-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h2 data-eid="flights-title" style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#6b7280' }}>
          <Plane size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Active Flights
        </h2>
        {flights.map((flight, i) => {
          const sc = statusColors[flight.status] || statusColors['On Time']
          return (
            <div
              key={flight.flightNumber}
              data-eid={`flight-${i}`}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                padding: '8px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span data-eid={`flight-${i}-number`} style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>
                  {flight.flightNumber}
                </span>
                <span
                  data-eid={`flight-${i}-status`}
                  style={{
                    background: sc.bg,
                    color: sc.text,
                    padding: '1px 8px',
                    borderRadius: 8,
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {flight.status}
                </span>
              </div>
              <div data-eid={`flight-${i}-route`} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <span style={{ fontWeight: 600, color: '#2563eb' }}>{flight.departure.airport}</span>
                <span style={{ color: '#d1d5db' }}>---</span>
                <Plane size={12} color="#d1d5db" />
                <span style={{ color: '#d1d5db' }}>---</span>
                <span style={{ fontWeight: 600, color: '#2563eb' }}>{flight.arrival.airport}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280' }}>
                <span data-eid={`flight-${i}-depart-time`}>Dep: {flight.departure.time}</span>
                <span data-eid={`flight-${i}-arrive-time`}>Arr: {flight.arrival.time}</span>
                <span data-eid={`flight-${i}-gate`}>Gate: {flight.departure.gate}</span>
              </div>
              <div
                data-eid={`flight-${i}-progress`}
                style={{
                  background: '#e5e7eb',
                  borderRadius: 4,
                  height: 6,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    background: flight.status === 'Delayed' ? '#dc2626' : flight.status === 'Landed' ? '#6b7280' : '#2563eb',
                    borderRadius: 4,
                    height: '100%',
                    width: `${flight.progress}%`,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#9ca3af' }}>
                <span data-eid={`flight-${i}-weather-dep`}>
                  <Cloud size={9} style={{ marginRight: 2, verticalAlign: 'middle' }} />
                  {flight.departure.airport}: {flight.weatherDep}
                </span>
                <span data-eid={`flight-${i}-weather-arr`}>
                  <Cloud size={9} style={{ marginRight: 2, verticalAlign: 'middle' }} />
                  {flight.arrival.airport}: {flight.weatherArr}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div data-eid="timeline-section" style={{ background: '#ffffff', borderRadius: 12, padding: 12, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 data-eid="timeline-title" style={{ fontSize: 13, fontWeight: 600, margin: '0 0 8px 0', color: '#6b7280' }}>
          <Clock size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Flight Timeline
        </h2>
        <div data-eid="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, paddingLeft: 60 }}>
          {data.timelineHours.map((h, i) => (
            <span key={h} data-eid={`timeline-hour-${i}`} style={{ fontSize: 9, color: '#9ca3af' }}>{h}</span>
          ))}
        </div>
        {flights.map((flight, i) => {
          const totalRange = 18
          const startOffset = 6
          const leftPct = ((flight.timelineStart - startOffset) / totalRange) * 100
          const widthPct = ((flight.timelineEnd - flight.timelineStart) / totalRange) * 100
          const barColor = flight.status === 'Delayed' ? '#dc2626' : flight.status === 'Landed' ? '#6b7280' : flight.status === 'Boarding' ? '#2563eb' : '#16a34a'
          return (
            <div
              key={flight.flightNumber}
              data-eid={`timeline-bar-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 4,
                height: 18,
              }}
            >
              <span data-eid={`timeline-bar-${i}-label`} style={{ fontSize: 9, color: '#6b7280', width: 60, flexShrink: 0, fontWeight: 600 }}>
                {flight.flightNumber}
              </span>
              <div style={{ flex: 1, position: 'relative', height: 12, background: '#e5e7eb', borderRadius: 3 }}>
                <div
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: '100%',
                    background: barColor,
                    borderRadius: 3,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div data-eid="weather-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2 data-eid="weather-title" style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#6b7280' }}>
          <Cloud size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Airport Weather
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {data.airports.map((airport, i) => (
            <div
              key={airport.code}
              data-eid={`weather-airport-${i}`}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: '6px 8px',
                textAlign: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>{airport.code}</div>
              <span data-eid={`weather-airport-${i}-temp`} style={{ fontSize: 14, fontWeight: 700, color: '#2563eb' }}>
                {airport.temp}
              </span>
              <br />
              <span data-eid={`weather-airport-${i}-cond`} style={{ fontSize: 9, color: '#6b7280' }}>
                {airport.condition}
              </span>
            </div>
          ))}
        </div>
      </div>

      <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: 8 }}>
        <span data-eid="footer-text" style={{ fontSize: 10, color: '#9ca3af' }}>
          Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </span>
        <span data-eid="footer-refresh" style={{ cursor: 'pointer' }}>
          <RefreshCw size={14} color="#9ca3af" />
        </span>
      </footer>
    </section>
  )
}
