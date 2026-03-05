import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Zap,
  BatteryWarning,
  MonitorSmartphone,
} from 'lucide-react'
import data from './data.json'

type DeviceData = {
  title: string
  lastSynced: string
  devices: Array<{
    name: string
    model: string
    icon: string
    batteryPct: number
    charging: boolean
  }>
  chargingCount: number
  totalDevices: number
  lowestDevice: string
  lowestPct: number
}

const status = data as DeviceData

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Speaker,
}

function getBatteryColor(pct: number): string {
  if (pct > 60) return '#22c55e'
  if (pct >= 20) return '#f59e0b'
  return '#ef4444'
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #0f172a 0%, #1a1033 40%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 440,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <MonitorSmartphone size={20} color="#a78bfa" />
        <div data-eid="title" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          {status.title}
        </div>
        <span data-eid="sync-time" style={{ fontSize: 11, color: '#64748b' }}>
          Synced {status.lastSynced}
        </span>
      </header>

      {/* Device List */}
      <div data-eid="device-list" style={{ display: 'grid', gap: 6 }}>
        {status.devices.map((device, i) => {
          const IconComp = iconMap[device.icon] || Smartphone
          const barColor = getBatteryColor(device.batteryPct)

          return (
            <div
              key={i}
              data-eid={`device-${i}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                display: 'grid',
                gridTemplateColumns: '36px 1fr auto',
                gap: 10,
                padding: '10px 12px',
                alignItems: 'center',
              }}
            >
              {/* Icon */}
              <span
                data-eid={`device-${i}-icon`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${barColor}12`,
                }}
              >
                <IconComp size={18} color={barColor} />
              </span>

              {/* Name, Model, Bar */}
              <div style={{ display: 'grid', gap: 3, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div
                    data-eid={`device-${i}-name`}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {device.name}
                  </div>
                  {device.charging && (
                    <span data-eid={`device-${i}-charging`} style={{ display: 'inline-flex' }}>
                      <Zap size={12} color="#fbbf24" fill="#fbbf24" />
                    </span>
                  )}
                </div>
                <div
                  data-eid={`device-${i}-model`}
                  style={{ fontSize: 10, color: '#64748b' }}
                >
                  {device.model}
                </div>
                <div
                  data-eid={`device-${i}-bar`}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    height: 6,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                >
                  <div
                    data-eid={`device-${i}-bar-fill`}
                    style={{
                      background: barColor,
                      borderRadius: 4,
                      height: '100%',
                      width: `${device.batteryPct}%`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Percentage */}
              <span
                data-eid={`device-${i}-pct`}
                style={{
                  color: barColor,
                  fontSize: 15,
                  fontWeight: 700,
                  textAlign: 'right',
                  minWidth: 40,
                }}
              >
                {device.batteryPct}%
              </span>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div
        data-eid="summary"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10,
          padding: '8px 12px',
          gap: 8,
        }}
      >
        <span
          data-eid="charging-count"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11,
            color: '#94a3b8',
          }}
        >
          <Zap size={13} color="#fbbf24" />
          Charging {status.chargingCount}/{status.totalDevices}
        </span>
        <span
          data-eid="low-battery-alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11,
            color: '#fca5a5',
          }}
        >
          <BatteryWarning size={13} color="#ef4444" />
          {status.lowestDevice} at {status.lowestPct}%
        </span>
      </div>
    </section>
  )
}
