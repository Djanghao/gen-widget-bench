import { Home, Wifi, Lightbulb, Thermometer, Activity, Sofa, ChefHat, Bed, Car, Shield, Camera } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts'
import data from './data.json'

type DeviceStatus = { status: string }

type RoomData = {
  name: string
  icon: string
  tempCurrent: number
  tempTarget: number | null
  devices: {
    light: DeviceStatus
    thermostat: DeviceStatus
    sensor: DeviceStatus
  }
  energyPct: number
}

type CameraData = {
  name: string
  status: string
}

type EnergyData = {
  day: string
  kwh: number
}

type WidgetData = {
  title: string
  homeName: string
  wifiStrength: number
  deviceCount: number
  rooms: RoomData[]
  energyUsage: EnergyData[]
  weeklyCost: string
  security: {
    alarmStatus: string
    cameras: CameraData[]
  }
  environment: {
    indoorTemp: number
    outdoorTemp: number
    aqi: number
    aqiLabel: string
    humidity: number
  }
}

const d = data as WidgetData

const roomIcons: Record<string, React.ReactNode> = {
  sofa: <Sofa size={13} color="#818cf8" />,
  chefHat: <ChefHat size={13} color="#f59e0b" />,
  bed: <Bed size={13} color="#a78bfa" />,
  car: <Car size={13} color="#60a5fa" />,
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a1a3e 50%, #0f172a 100%)',
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
        <Home size={20} color="#818cf8" />
        <div data-eid="title" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          {d.title}
        </div>
        <span
          data-eid="home-name"
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
          {d.homeName}
        </span>
        <span
          data-eid="wifi-indicator"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Wifi size={15} color="#4ade80" />
        </span>
        <span
          data-eid="device-count"
          style={{
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 12,
            color: '#86efac',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.deviceCount} devices
        </span>
      </header>

      {/* Rooms Grid */}
      <div
        data-eid="rooms-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
      >
        {d.rooms.map((room, ri) => {
          const energyColor = room.energyPct > 70 ? '#f59e0b' : room.energyPct > 40 ? '#60a5fa' : '#4ade80'
          return (
            <div
              key={ri}
              data-eid={`room-${ri}`}
              style={{
                background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 12,
                padding: 10,
                display: 'grid',
                gap: 6,
              }}
            >
              <div
                data-eid={`room-${ri}-name`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#e2e8f0',
                }}
              >
                {roomIcons[room.icon]}
                {room.name}
              </div>
              <div style={{ display: 'flex', gap: 8, fontSize: 10 }}>
                <span data-eid={`room-${ri}-temp-current`} style={{ color: '#fbbf24', fontWeight: 600 }}>
                  {room.tempCurrent}°F
                </span>
                <span data-eid={`room-${ri}-temp-target`} style={{ color: '#64748b' }}>
                  Target: {room.tempTarget !== null ? `${room.tempTarget}°F` : '--'}
                </span>
              </div>
              <div style={{ display: 'grid', gap: 4 }}>
                <div
                  data-eid={`room-${ri}-device-light`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 6px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 5,
                  }}
                >
                  <Lightbulb size={10} color={room.devices.light.status === 'Off' ? '#475569' : '#fbbf24'} />
                  <span style={{ fontSize: 9, color: '#94a3b8', flex: 1 }}>Light</span>
                  <span
                    data-eid={`room-${ri}-device-light-status`}
                    style={{
                      fontSize: 9,
                      color: room.devices.light.status === 'Off' ? '#64748b' : '#fbbf24',
                      fontWeight: 600,
                    }}
                  >
                    {room.devices.light.status}
                  </span>
                </div>
                <div
                  data-eid={`room-${ri}-device-thermostat`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 6px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 5,
                  }}
                >
                  <Thermometer size={10} color={room.devices.thermostat.status === 'Cooling' ? '#60a5fa' : '#475569'} />
                  <span style={{ fontSize: 9, color: '#94a3b8', flex: 1 }}>Thermo</span>
                  <span
                    data-eid={`room-${ri}-device-thermostat-status`}
                    style={{
                      fontSize: 9,
                      color: room.devices.thermostat.status === 'Cooling' ? '#60a5fa' : '#64748b',
                      fontWeight: 600,
                    }}
                  >
                    {room.devices.thermostat.status}
                  </span>
                </div>
                <div
                  data-eid={`room-${ri}-device-sensor`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 6px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 5,
                  }}
                >
                  <Activity size={10} color="#a78bfa" />
                  <span style={{ fontSize: 9, color: '#94a3b8', flex: 1 }}>Sensor</span>
                  <span
                    data-eid={`room-${ri}-device-sensor-status`}
                    style={{ fontSize: 9, color: '#c4b5fd', fontWeight: 600 }}
                  >
                    {room.devices.sensor.status}
                  </span>
                </div>
              </div>
              <div
                data-eid={`room-${ri}-energy-bar`}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  height: 4,
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                <div
                  data-eid={`room-${ri}-energy-bar-fill`}
                  style={{
                    background: energyColor,
                    borderRadius: 4,
                    height: '100%',
                    width: `${room.energyPct}%`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Energy Section */}
      <div
        data-eid="energy-section"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 12,
          display: 'grid',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            data-eid="energy-title"
            style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc' }}
          >
            Daily Energy Usage
          </div>
          <div data-eid="energy-cost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span data-eid="energy-cost-label" style={{ fontSize: 10, color: '#94a3b8' }}>
              This Week
            </span>
            <span data-eid="energy-cost-value" style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>
              {d.weeklyCost}
            </span>
          </div>
        </div>
        <div data-eid="energy-chart" style={{ height: 90, width: '100%' }}>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={d.energyUsage} margin={{ top: 0, right: 0, bottom: 0, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  fontSize: 11,
                  color: '#e2e8f0',
                }}
                formatter={(value: number) => [`${value} kWh`, 'Usage']}
              />
              <Bar dataKey="kwh" fill="rgba(129,140,248,0.5)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Security Section */}
      <div data-eid="security-section" style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Shield size={14} color="#818cf8" />
          <div
            data-eid="security-title"
            style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', flex: 1 }}
          >
            Security
          </div>
          <span
            data-eid="alarm-status"
            style={{
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: 12,
              color: '#4ade80',
              fontSize: 10,
              fontWeight: 600,
              padding: '3px 10px',
            }}
          >
            {d.security.alarmStatus}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {d.security.cameras.map((cam, i) => {
            const isOnline = cam.status === 'Online'
            return (
              <div
                key={i}
                data-eid={`camera-${i}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isOnline ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
                  borderRadius: 10,
                  padding: 10,
                  textAlign: 'center',
                  display: 'grid',
                  gap: 4,
                }}
              >
                <Camera size={14} color={isOnline ? '#4ade80' : '#ef4444'} style={{ margin: '0 auto' }} />
                <span
                  data-eid={`camera-${i}-name`}
                  style={{ fontSize: 10, color: '#e2e8f0', fontWeight: 600 }}
                >
                  {cam.name}
                </span>
                <span
                  data-eid={`camera-${i}-status`}
                  style={{
                    fontSize: 9,
                    color: isOnline ? '#4ade80' : '#ef4444',
                    fontWeight: 600,
                  }}
                >
                  {cam.status}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Environment Section */}
      <div data-eid="environment-section" style={{ display: 'grid', gap: 8 }}>
        <div
          data-eid="environment-title"
          style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}
        >
          Environment
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
          <div
            data-eid="env-indoor-temp"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 10,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <span data-eid="env-indoor-temp-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Indoor
            </span>
            <span data-eid="env-indoor-temp-value" style={{ fontSize: 16, fontWeight: 700, color: '#60a5fa' }}>
              {d.environment.indoorTemp}°F
            </span>
          </div>
          <div
            data-eid="env-outdoor-temp"
            style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: 10,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <span data-eid="env-outdoor-temp-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Outdoor
            </span>
            <span data-eid="env-outdoor-temp-value" style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24' }}>
              {d.environment.outdoorTemp}°F
            </span>
          </div>
          <div
            data-eid="env-aqi"
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.15)',
              borderRadius: 10,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <span data-eid="env-aqi-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              AQI
            </span>
            <span data-eid="env-aqi-value" style={{ fontSize: 16, fontWeight: 700, color: '#4ade80' }}>
              {d.environment.aqi}
              <span style={{ fontSize: 9, color: '#94a3b8', marginLeft: 3 }}>{d.environment.aqiLabel}</span>
            </span>
          </div>
          <div
            data-eid="env-humidity"
            style={{
              background: 'rgba(14,165,233,0.08)',
              border: '1px solid rgba(14,165,233,0.15)',
              borderRadius: 10,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <span data-eid="env-humidity-label" style={{ fontSize: 9, color: '#94a3b8', display: 'block' }}>
              Humidity
            </span>
            <span data-eid="env-humidity-value" style={{ fontSize: 16, fontWeight: 700, color: '#7dd3fc' }}>
              {d.environment.humidity}%
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
