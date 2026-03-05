import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Circle, Signal, Satellite, Thermometer, Zap, Wifi, RotateCcw } from 'lucide-react';
import data from './data.json';

const SatelliteOrbitTracker = () => {
  const {
    missionName,
    orbitType,
    elapsedTime,
    orbitalParams,
    groundTrack,
    passes,
    telemetry,
    signal,
    altitudeHistory
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#e2e8f0',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        padding: '24px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div data-eid="mission-name" style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '1px' }}>
          {missionName}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span 
            data-eid="orbit-badge" 
            style={{
              backgroundColor: '#0ea5e9',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {orbitType}
          </span>
          <span data-eid="elapsed-time" style={{ fontSize: '14px', color: '#94a3b8' }}>
            {elapsedTime}
          </span>
        </div>
      </header>

      {/* Orbital Parameters */}
      <div data-eid="orbital-params" style={{ marginBottom: '24px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <div data-eid="orbital-params-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>
          Orbital Parameters
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {/* Altitude */}
          <div data-eid="param-altitude" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px' }}>
            <span data-eid="param-altitude-label" style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
              Altitude
            </span>
            <span data-eid="param-altitude-value" style={{ fontSize: '20px', fontWeight: '700' }}>
              {orbitalParams.altitude}
            </span>
          </div>
          {/* Velocity */}
          <div data-eid="param-velocity" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px' }}>
            <span data-eid="param-velocity-label" style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
              Velocity
            </span>
            <span data-eid="param-velocity-value" style={{ fontSize: '20px', fontWeight: '700' }}>
              {orbitalParams.velocity}
            </span>
          </div>
          {/* Inclination */}
          <div data-eid="param-inclination" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px' }}>
            <span data-eid="param-inclination-label" style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
              Inclination
            </span>
            <span data-eid="param-inclination-value" style={{ fontSize: '20px', fontWeight: '700' }}>
              {orbitalParams.inclination}
            </span>
          </div>
          {/* Period */}
          <div data-eid="param-period" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px' }}>
            <span data-eid="param-period-label" style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
              Period
            </span>
            <span data-eid="param-period-value" style={{ fontSize: '20px', fontWeight: '700' }}>
              {orbitalParams.period}
            </span>
          </div>
          {/* Eccentricity */}
          <div data-eid="param-eccentricity" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px' }}>
            <span data-eid="param-eccentricity-label" style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
              Eccentricity
            </span>
            <span data-eid="param-eccentricity-value" style={{ fontSize: '20px', fontWeight: '700' }}>
              {orbitalParams.eccentricity}
            </span>
          </div>
        </div>
      </div>

      {/* Ground Track */}
      <div data-eid="ground-track" style={{ marginBottom: '24px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <div data-eid="ground-track-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>
          Ground Track
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#94a3b8' }}>
            <span data-eid="ground-track-label-start">-180 deg</span>
            <span data-eid="ground-track-label-end">+180 deg</span>
          </div>
          <div data-eid="ground-track-bar" style={{ 
            height: '12px', 
            backgroundColor: '#334155', 
            borderRadius: '6px', 
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div 
              data-eid="ground-track-marker" 
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: `${groundTrack.position}%`, 
                transform: 'translate(-50%, -50%)',
                width: '24px',
                height: '24px',
                backgroundColor: '#0ea5e9',
                borderRadius: '50%',
                boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.3)'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
            <span data-eid="ground-track-lat">
              Lat: {groundTrack.latitude}
            </span>
            <span data-eid="ground-track-lon">
              Lon: {groundTrack.longitude}
            </span>
          </div>
        </div>
      </div>

      {/* Next Passes */}
      <div data-eid="passes-section" style={{ marginBottom: '24px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <div data-eid="passes-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>
          Next Passes
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
          {passes.map((pass, index) => (
            <div 
              key={index} 
              data-eid={`pass-${index}`} 
              style={{ 
                backgroundColor: '#334155', 
                borderRadius: '8px', 
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <span data-eid={`pass-${index}-time`} style={{ fontSize: '14px', fontWeight: '600' }}>
                {pass.time}
              </span>
              <span data-eid={`pass-${index}-duration`} style={{ fontSize: '12px', color: '#94a3b8' }}>
                {pass.duration}
              </span>
              <span data-eid={`pass-${index}-elevation`} style={{ fontSize: '12px', color: '#94a3b8' }}>
                {pass.elevation}
              </span>
              <span data-eid={`pass-${index}-direction`} style={{ fontSize: '12px', color: '#94a3b8' }}>
                {pass.direction}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subsystem Telemetry */}
      <div data-eid="telemetry-section" style={{ marginBottom: '24px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <div data-eid="telemetry-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>
          Subsystem Telemetry
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Power */}
          <div data-eid="subsys-power" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} color="#0ea5e9" />
              <span data-eid="subsys-power-label" style={{ fontSize: '14px', fontWeight: '600' }}>Power</span>
            </div>
            <span data-eid="subsys-power-value" style={{ fontSize: '20px', fontWeight: '700' }}>{telemetry.power.value}</span>
            <span data-eid="subsys-power-status" style={{ fontSize: '12px', color: '#4ade80' }}>{telemetry.power.status}</span>
          </div>
          {/* Comms */}
          <div data-eid="subsys-comms" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wifi size={16} color="#0ea5e9" />
              <span data-eid="subsys-comms-label" style={{ fontSize: '14px', fontWeight: '600' }}>Comms</span>
            </div>
            <span data-eid="subsys-comms-value" style={{ fontSize: '20px', fontWeight: '700' }}>{telemetry.comms.value}</span>
            <span data-eid="subsys-comms-status" style={{ fontSize: '12px', color: '#4ade80' }}>{telemetry.comms.status}</span>
          </div>
          {/* Thermal */}
          <div data-eid="subsys-thermal" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Thermometer size={16} color="#0ea5e9" />
              <span data-eid="subsys-thermal-label" style={{ fontSize: '14px', fontWeight: '600' }}>Thermal</span>
            </div>
            <span data-eid="subsys-thermal-value" style={{ fontSize: '20px', fontWeight: '700' }}>{telemetry.thermal.value}</span>
            <span data-eid="subsys-thermal-status" style={{ fontSize: '12px', color: '#4ade80' }}>{telemetry.thermal.status}</span>
          </div>
          {/* ADCS */}
          <div data-eid="subsys-adcs" style={{ backgroundColor: '#334155', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={16} color="#0ea5e9" />
              <span data-eid="subsys-adcs-label" style={{ fontSize: '14px', fontWeight: '600' }}>ADCS</span>
            </div>
            <span data-eid="subsys-adcs-value" style={{ fontSize: '20px', fontWeight: '700' }}>{telemetry.adcs.value}</span>
            <span data-eid="subsys-adcs-status" style={{ fontSize: '12px', color: '#4ade80' }}>{telemetry.adcs.status}</span>
          </div>
        </div>
      </div>

      {/* Signal Strength */}
      <div data-eid="signal-section" style={{ marginBottom: '24px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <div data-eid="signal-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>
          Signal Strength
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div data-eid="signal-bar" style={{ 
            width: '24px', 
            height: '120px', 
            backgroundColor: '#334155', 
            borderRadius: '12px', 
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div 
              data-eid="signal-bar-fill" 
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                width: '100%', 
                backgroundColor: '#0ea5e9',
                height: `${signal.strengthPercentage}%`
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span data-eid="signal-value" style={{ fontSize: '20px', fontWeight: '700' }}>
              {signal.value}
            </span>
            <span data-eid="signal-quality" style={{ fontSize: '14px', color: '#4ade80', fontWeight: '600' }}>
              {signal.quality}
            </span>
          </div>
        </div>
      </div>

      {/* Altitude History Chart */}
      <div data-eid="altitude-chart" style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <div data-eid="altitude-chart-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>
          Altitude History
        </div>
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={altitudeHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }} 
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Line 
                type="monotone" 
                dataKey="altitude" 
                stroke="#0ea5e9" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#0ea5e9' }} 
                activeDot={{ r: 6, fill: '#0ea5e9' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default SatelliteOrbitTracker;