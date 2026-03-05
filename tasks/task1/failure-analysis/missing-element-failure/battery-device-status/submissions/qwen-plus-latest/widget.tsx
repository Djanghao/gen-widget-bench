import React from 'react';
import { Battery, Smartphone, Laptop, Tablet, Watch, Headphones, Speaker, Bolt, AlertTriangle } from 'lucide-react';
import data from './data.json';

const BatteryWidget = () => {
  const devices = data.devices;
  const summary = data.summary;

  const getBatteryColor = (pct: number) => {
    if (pct <= 20) return '#EF4444'; // red for low battery
    if (pct <= 50) return '#F59E0B'; // amber for medium
    return '#10B981'; // green for high
  };

  const getBatteryBarStyle = (pct: number) => ({
    width: `${pct}%`,
    backgroundColor: getBatteryColor(pct),
    height: '100%',
    borderRadius: '0 4px 4px 0',
    transition: 'width 0.3s ease'
  });

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        borderRadius: '16px',
        padding: '20px',
        width: '360px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#F1F5F9',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div data-eid="title" style={{ fontSize: '20px', fontWeight: '600', lineHeight: '1.2' }}>My Devices</div>
        <span data-eid="sync-time" style={{ fontSize: '14px', color: '#94A3B8', fontWeight: '500' }}>Last synced: {data.lastSynced}</span>
      </header>

      {/* Device List */}
      <div data-eid="device-list" style={{ marginBottom: '24px' }}>
        {devices.map((device, index) => (
          <div 
            key={index}
            data-eid={`device-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < devices.length - 1 ? '1px solid #334155' : 'none'
            }}
          >
            {/* Icon */}
            <span data-eid={`device-${index}-icon`} style={{ marginRight: '12px', color: '#94A3B8' }}>
              {device.type === 'smartphone' && <Smartphone size={20} />}
              {device.type === 'laptop' && <Laptop size={20} />}
              {device.type === 'tablet' && <Tablet size={20} />}
              {device.type === 'watch' && <Watch size={20} />}
              {device.type === 'headphones' && <Headphones size={20} />}
              {device.type === 'speaker' && <Speaker size={20} />}
            </span>

            {/* Name and percentage */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div data-eid={`device-${index}-name`} style={{ fontSize: '16px', fontWeight: '600', lineHeight: '1.3' }}>{device.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                <span data-eid={`device-${index}-pct`} style={{ fontSize: '14px', fontWeight: '500', color: '#CBD5E1', marginRight: '8px' }}>{device.battery}%</span>
                {device.charging && (
                  <span data-eid={`device-${index}-charging`} style={{ color: '#3B82F6', marginRight: '4px' }}>
                    <Bolt size={14} />
                  </span>
                )}
                {device.lowBattery && (
                  <span style={{ color: '#EF4444' }}>
                    <AlertTriangle size={14} />
                  </span>
                )}
              </div>
            </div>

            {/* Battery bar */}
            <div data-eid={`device-${index}-bar`} style={{
              width: '120px',
              height: '12px',
              backgroundColor: '#334155',
              borderRadius: '6px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={getBatteryBarStyle(device.battery)} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div data-eid="summary" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #334155' }}>
        <span data-eid="charging-count" style={{ fontSize: '14px', color: '#94A3B8', fontWeight: '500' }}>
          Devices charging: {summary.chargingCount}/{summary.totalCount}
        </span>
        <span data-eid="low-battery-alert" style={{ fontSize: '14px', color: '#EF4444', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
          <AlertTriangle size={14} style={{ marginRight: '4px' }} />
          Lowest: {summary.lowestBatteryDevice} at {summary.lowestBatteryPercent}%
        </span>
      </div>
    </section>
  );
};

export default BatteryWidget;