import data from './data.json'
import { Car, Clock, TrendingUp, MapPin } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type Floor = {
  id: string
  label: string
  total: number
  available: number
  ratePerHour: number
}

type GarageData = {
  garageName: string
  address: string
  status: string
  floors: Floor[]
  summary: {
    totalSpots: number
    availableSpots: number
    hourlyRate: number
  }
  quickStats: {
    avgStayHours: number
    busiestHour: string
  }
  hourlyOccupancy: Array<{ hour: string; pct: number }>
}

const garage = data as GarageData

function floorColor(available: number, total: number) {
  const pct = available / total
  if (pct > 0.5) return '#4ade80'
  if (pct > 0.2) return '#facc15'
  return '#ef4444'
}

function barColor(pct: number) {
  if (pct > 85) return '#ef4444'
  if (pct > 60) return '#facc15'
  return '#4ade80'
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(165deg, #0f172a 0%, #18181b 50%, #0f172a 100%)',
        borderRadius: 22,
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        maxWidth: 440,
        overflow: 'hidden',
        padding: 18,
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ alignItems: 'center', display: 'flex', gap: 6 }}>
            <Car size={18} color="#60a5fa" />
            <h2
              data-eid="garage-name"
              style={{ fontSize: 20, fontWeight: 800, margin: 0 }}
            >
              {garage.garageName}
            </h2>
          </div>
          <div
            data-eid="garage-address"
            style={{ alignItems: 'center', color: '#64748b', display: 'flex', fontSize: 11, gap: 4, marginTop: 4 }}
          >
            <MapPin size={11} />
            {garage.address}
          </div>
        </div>
        <span
          data-eid="status-badge"
          style={{
            background: garage.status === 'Open' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            borderRadius: 8,
            color: garage.status === 'Open' ? '#4ade80' : '#ef4444',
            fontSize: 12,
            fontWeight: 700,
            padding: '4px 12px',
          }}
        >
          {garage.status}
        </span>
      </header>

      <div
        data-eid="floors-section"
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {garage.floors.map((floor) => {
          const color = floorColor(floor.available, floor.total)
          const fillPct = ((floor.total - floor.available) / floor.total) * 100
          return (
            <div
              key={floor.id}
              data-eid={`floor-${floor.id.toLowerCase()}`}
              style={{
                alignItems: 'center',
                background: 'rgba(30, 41, 59, 0.4)',
                borderRadius: 12,
                display: 'grid',
                gap: 8,
                gridTemplateColumns: '36px 1fr auto auto',
                padding: '10px 14px',
              }}
            >
              <span
                data-eid={`floor-${floor.id.toLowerCase()}-label`}
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                {floor.label}
              </span>
              <div
                data-eid={`floor-${floor.id.toLowerCase()}-bar`}
                style={{
                  background: 'rgba(51, 65, 85, 0.4)',
                  borderRadius: 6,
                  height: 10,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    background: color,
                    borderRadius: 6,
                    height: '100%',
                    opacity: 0.7,
                    transition: 'width 0.3s',
                    width: `${fillPct}%`,
                  }}
                />
              </div>
              <span
                data-eid={`floor-${floor.id.toLowerCase()}-spots`}
                style={{ color: '#cbd5e1', fontSize: 11, fontWeight: 600, minWidth: 50, textAlign: 'right' }}
              >
                {floor.available}/{floor.total}
              </span>
              <span
                data-eid={`floor-${floor.id.toLowerCase()}-rate`}
                style={{ color: '#64748b', fontSize: 10, minWidth: 40, textAlign: 'right' }}
              >
                ${floor.ratePerHour.toFixed(2)}/hr
              </span>
            </div>
          )
        })}
      </div>

      <div
        data-eid="summary-section"
        style={{
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: 14,
          display: 'grid',
          gap: 0,
          gridTemplateColumns: 'repeat(3, 1fr)',
          overflow: 'hidden',
        }}
      >
        <div style={{ borderRight: '1px solid rgba(59, 130, 246, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '12px 8px' }}>
          <span style={{ color: '#64748b', fontSize: 9, fontWeight: 600, textTransform: 'uppercase' }}>Total</span>
          <span data-eid="total-spots" style={{ fontSize: 18, fontWeight: 800 }}>
            {garage.summary.totalSpots}
          </span>
        </div>
        <div style={{ borderRight: '1px solid rgba(59, 130, 246, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '12px 8px' }}>
          <span style={{ color: '#64748b', fontSize: 9, fontWeight: 600, textTransform: 'uppercase' }}>Available</span>
          <span data-eid="available-spots" style={{ color: '#4ade80', fontSize: 18, fontWeight: 800 }}>
            {garage.summary.availableSpots}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '12px 8px' }}>
          <span style={{ color: '#64748b', fontSize: 9, fontWeight: 600, textTransform: 'uppercase' }}>Rate</span>
          <span data-eid="hourly-rate" style={{ color: '#60a5fa', fontSize: 18, fontWeight: 800 }}>
            ${garage.summary.hourlyRate.toFixed(2)}
          </span>
        </div>
      </div>

      <div
        data-eid="quick-stats"
        style={{
          color: '#94a3b8',
          display: 'flex',
          fontSize: 11,
          gap: 16,
        }}
      >
        <span data-eid="avg-stay" style={{ alignItems: 'center', display: 'flex', gap: 4 }}>
          <Clock size={12} />
          Avg Stay: {garage.quickStats.avgStayHours}h
        </span>
        <span data-eid="busiest-hour" style={{ alignItems: 'center', display: 'flex', gap: 4 }}>
          <TrendingUp size={12} />
          Busiest: {garage.quickStats.busiestHour}
        </span>
      </div>

      <div
        data-eid="occupancy-chart"
        style={{
          background: 'rgba(15, 23, 42, 0.5)',
          borderRadius: 14,
          padding: '12px 4px 4px 0',
        }}
      >
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={garage.hourlyOccupancy} margin={{ top: 5, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.25)" />
            <XAxis dataKey="hour" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 8,
                color: '#e2e8f0',
                fontSize: 11,
              }}
              formatter={(value: number) => [`${value}%`, 'Occupancy']}
            />
            <Bar dataKey="pct" radius={[3, 3, 0, 0]}>
              {garage.hourlyOccupancy.map((entry, index) => (
                <Cell key={index} fill={barColor(entry.pct)} fillOpacity={0.75} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
