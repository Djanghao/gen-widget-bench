import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, X, Signal, WifiOff } from 'lucide-react';
import data from './data.json';

const SpaceMissionControl = () => {
  const telemetryData = [
    { name: 'Altitude', value: data.telemetry.altitude.value, unit: 'km', bar: data.telemetry.altitude.bar, label: 'ALTITUDE' },
    { name: 'Velocity', value: data.telemetry.velocity.value, unit: 'km/s', bar: data.telemetry.velocity.bar, label: 'VELOCITY' },
    { name: 'Fuel', value: data.telemetry.fuel.value, unit: '%', bar: data.telemetry.fuel.bar, label: 'FUEL' },
    { name: 'G-Force', value: data.telemetry.gforce.value, unit: 'G', bar: data.telemetry.gforce.bar, label: 'G-FORCE' },
    { name: 'Temperature', value: data.telemetry.temperature.value, unit: '°C', bar: data.telemetry.temperature.bar, label: 'TEMP' },
    { name: 'Pressure', value: data.telemetry.pressure.value, unit: 'kPa', bar: data.telemetry.pressure.bar, label: 'PRESSURE' },
  ];

  const trajectoryData = data.trajectory.map((point, i) => ({
    time: `T+${point.time}`,
    altitude: point.altitude,
  }));

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0a0e17',
        color: '#e0e0ff',
        fontFamily: 'monospace',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 data-eid="mission-name" style={{ fontSize: '28px', margin: '0', fontWeight: 'bold', letterSpacing: '2px' }}>
          {data.mission.name}
        </h1>
        <span data-eid="mission-id" style={{ display: 'block', fontSize: '14px', color: '#888', marginTop: '4px' }}>
          {data.mission.id}
        </span>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '12px' }}>
          <span 
            data-eid="mission-status-badge" 
            style={{
              backgroundColor: '#0d2b1a',
              color: '#4ade80',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '1px solid #4ade80'
            }}
          >
            {data.mission.status}
          </span>
          <span 
            data-eid="mission-phase-label" 
            style={{
              backgroundColor: '#1a1a2e',
              color: '#93c5fd',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '1px solid #93c5fd'
            }}
          >
            {data.mission.phase}
          </span>
        </div>
      </header>

      {/* Countdown Section */}
      <div data-eid="countdown-section" style={{ marginBottom: '30px', textAlign: 'center' }}>
        <span data-eid="countdown-title" style={{ fontSize: '16px', color: '#93c5fd', fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>
          {data.countdown.title}
        </span>
        <div data-eid="countdown-display" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <span data-eid="countdown-days" style={{ fontSize: '32px', fontWeight: 'bold', minWidth: '80px', backgroundColor: '#1a1a2e', padding: '8px 12px', borderRadius: '4px' }}>
            {data.countdown.days}
          </span>
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>:</span>
          <span data-eid="countdown-hours" style={{ fontSize: '32px', fontWeight: 'bold', minWidth: '80px', backgroundColor: '#1a1a2e', padding: '8px 12px', borderRadius: '4px' }}>
            {data.countdown.hours}
          </span>
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>:</span>
          <span data-eid="countdown-minutes" style={{ fontSize: '32px', fontWeight: 'bold', minWidth: '80px', backgroundColor: '#1a1a2e', padding: '8px 12px', borderRadius: '4px' }}>
            {data.countdown.minutes}
          </span>
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>:</span>
          <span data-eid="countdown-seconds" style={{ fontSize: '32px', fontWeight: 'bold', minWidth: '80px', backgroundColor: '#1a1a2e', padding: '8px 12px', borderRadius: '4px' }}>
            {data.countdown.seconds}
          </span>
        </div>
        <span data-eid="countdown-target" style={{ fontSize: '14px', color: '#a5b4fc', display: 'block' }}>
          {data.countdown.target}
        </span>
      </div>

      {/* Telemetry Section */}
      <div data-eid="telemetry-section" style={{ marginBottom: '30px' }}>
        <h2 data-eid="telemetry-title" style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#93c5fd', fontWeight: 'bold', textAlign: 'center' }}>
          {data.telemetry.title}
        </h2>
        <div data-eid="telemetry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {telemetryData.map((item, index) => (
            <div 
              key={index} 
              data-eid={`gauge-${item.name.toLowerCase().replace(' ', '-')}`} 
              style={{
                backgroundColor: '#1a1a2e',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #374151',
              }}
            >
              <span data-eid={`gauge-${item.name.toLowerCase().replace(' ', '-')}-label`} style={{ fontSize: '14px', color: '#a5b4fc', display: 'block', marginBottom: '8px' }}>
                {item.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                <span data-eid={`gauge-${item.name.toLowerCase().replace(' ', '-')}-value`} style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {item.value}
                </span>
                <span data-eid={`gauge-${item.name.toLowerCase().replace(' ', '-')}-unit`} style={{ fontSize: '14px', color: '#a5b4fc' }}>
                  {item.unit}
                </span>
              </div>
              <div 
                data-eid={`gauge-${item.name.toLowerCase().replace(' ', '-')}-bar`} 
                style={{
                  height: '8px',
                  backgroundColor: '#374151',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div 
                  style={{
                    height: '100%',
                    width: `${item.bar}%`,
                    backgroundColor: item.name === 'Fuel' ? '#fbbf24' : 
                                   item.name === 'G-Force' ? '#ef4444' : 
                                   item.name === 'Temperature' ? '#f97316' : 
                                   item.name === 'Pressure' ? '#8b5cf6' : 
                                   item.name === 'Altitude' ? '#3b82f6' : 
                                   '#10b981',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trajectory Section */}
      <div data-eid="trajectory-section" style={{ marginBottom: '30px' }}>
        <h2 data-eid="trajectory-title" style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#93c5fd', fontWeight: 'bold', textAlign: 'center' }}>
          {data.trajectory.title}
        </h2>
        <div data-eid="trajectory-chart" style={{ height: '200px', backgroundColor: '#1a1a2e', borderRadius: '8px', padding: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trajectoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#a5b4fc" fontSize={12} />
              <YAxis stroke="#a5b4fc" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  borderColor: '#374151',
                  borderRadius: '4px'
                }} 
                itemStyle={{ color: '#e0e0ff' }}
              />
              <Line 
                type="monotone" 
                dataKey="altitude" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#3b82f6' }} 
                activeDot={{ r: 6, fill: '#60a5fa' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crew Section */}
      <div data-eid="crew-section" style={{ marginBottom: '30px' }}>
        <h2 data-eid="crew-title" style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#93c5fd', fontWeight: 'bold', textAlign: 'center' }}>
          {data.crew.title}
        </h2>
        <div data-eid="crew-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.crew.members.map((member, index) => (
            <div 
              key={index} 
              data-eid={`crew-${index}`} 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1a1a2e',
                padding: '12px 16px',
                borderRadius: '6px',
                border: '1px solid #374151',
              }}
            >
              <span data-eid={`crew-${index}-name`} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {member.name}
              </span>
              <span data-eid={`crew-${index}-role`} style={{ fontSize: '14px', color: '#a5b4fc' }}>
                {member.role}
              </span>
              <span data-eid={`crew-${index}-status`} style={{ fontSize: '14px', color: member.status === 'OK' ? '#4ade80' : '#f87171' }}>
                {member.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Systems Section */}
      <div data-eid="systems-section" style={{ marginBottom: '30px' }}>
        <h2 data-eid="systems-title" style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#93c5fd', fontWeight: 'bold', textAlign: 'center' }}>
          {data.systems.title}
        </h2>
        <div data-eid="systems-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.systems.items.map((system, index) => (
            <div 
              key={index} 
              data-eid={`sys-${index}`} 
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                backgroundColor: '#1a1a2e',
                borderRadius: '6px',
                border: '1px solid #374151',
              }}
            >
              <span 
                data-eid={`sys-${index}-icon`} 
                style={{ 
                  marginRight: '12px',
                  color: system.status === 'OK' ? '#4ade80' : '#f87171',
                }}
              >
                {system.status === 'OK' ? <Check size={16} /> : <X size={16} />}
              </span>
              <span data-eid={`sys-${index}-name`} style={{ fontSize: '14px', color: '#e0e0ff' }}>
                {system.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Communications Section */}
      <div data-eid="comms-section" style={{ marginBottom: '30px' }}>
        <h2 data-eid="comms-title" style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#93c5fd', fontWeight: 'bold', textAlign: 'center' }}>
          {data.comms.title}
        </h2>
        <div data-eid="comms-log" style={{ 
          maxHeight: '200px', 
          overflowY: 'auto', 
          backgroundColor: '#1a1a2e', 
          borderRadius: '8px', 
          padding: '12px',
          border: '1px solid #374151',
        }}>
          {data.comms.entries.map((entry, index) => (
            <div 
              key={index} 
              data-eid={`comms-${index}`} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: index < data.comms.entries.length - 1 ? '1px solid #374151' : 'none'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
                <span data-eid={`comms-${index}-time`} style={{ fontSize: '12px', color: '#a5b4fc', fontWeight: 'bold' }}>
                  {entry.time}
                </span>
                <span data-eid={`comms-${index}-source`} style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold' }}>
                  {entry.source}
                </span>
              </div>
              <span data-eid={`comms-${index}-msg`} style={{ fontSize: '14px', color: '#e0e0ff', lineHeight: '1.4' }}>
                {entry.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div data-eid="timeline-section" style={{ marginBottom: '30px' }}>
        <h2 data-eid="timeline-title" style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#93c5fd', fontWeight: 'bold', textAlign: 'center' }}>
          {data.timeline.title}
        </h2>
        <div data-eid="timeline-track" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          position: 'relative',
          padding: '0 20px',
        }}>
          <div style={{ position: 'absolute', top: '12px', left: '0', right: '0', height: '2px', backgroundColor: '#374151', zIndex: 1 }} />
          {data.timeline.phases.map((phase, index) => (
            <div 
              key={index} 
              data-eid={`phase-${index}`} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span 
                data-eid={`phase-${index}-dot`} 
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: phase.status === 'current' ? '#3b82f6' : phase.status === 'completed' ? '#4ade80' : '#6b7280',
                  marginBottom: '8px',
                  border: '2px solid #1a1a2e',
                }}
              />
              <span 
                data-eid={`phase-${index}-label`} 
                style={{
                  fontSize: '12px',
                  color: phase.status === 'current' ? '#3b82f6' : phase.status === 'completed' ? '#4ade80' : '#6b7280',
                  fontWeight: phase.status === 'current' ? 'bold' : 'normal',
                }}
              >
                {phase.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderTop: '1px solid #374151',
        paddingTop: '16px',
        marginTop: '20px',
      }}>
        <span data-eid="met-label" style={{ fontSize: '14px', color: '#a5b4fc' }}>
          MET: {data.footer.met}
        </span>
        <span data-eid="signal-label" style={{ fontSize: '14px', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Signal size={14} />
          {data.footer.signal}
        </span>
      </footer>
    </section>
  );
};

export default SpaceMissionControl;