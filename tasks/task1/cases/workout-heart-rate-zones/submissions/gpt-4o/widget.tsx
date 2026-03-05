import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import data from './data.json';

const Widget = () => {
  return (
    <section data-eid="root" style={{ backgroundColor: '#1e1e1e', borderRadius: '16px', padding: '20px', color: 'white', width: '360px' }}>
      <div data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span data-eid="header-icon">
            <Activity color="lime" size={24} />
          </span>
          <span data-eid="header-workout-type" style={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '8px' }}>Morning Run</span>
        </div>
        <span data-eid="header-date" style={{ fontSize: '14px', color: '#b0b0b0' }}>Feb 24, 2025</span>
      </div>
      <div data-eid="header-duration" style={{ fontSize: '28px', display: 'flex', alignItems: 'center' }}>
        <span role="img" aria-label="clock" style={{ marginRight: '8px' }}>⏱️</span>
        45:23
      </div>
      <div data-eid="hr-chart-section" style={{ marginTop: '20px' }}>
        <div data-eid="hr-chart-title" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Heart Rate</div>
        <div data-eid="hr-chart" style={{ backgroundColor: '#2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={data.chartData}>
              <XAxis dataKey="time" tick={{ fill: '#cfcfcf' }} />
              <YAxis domain={[60, 190]} tick={{ fill: '#cfcfcf' }} />
              <Area type="monotone" dataKey="heartRate" stroke="#FF4949" fill="rgba(255, 73, 73, 0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div data-eid="stats-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div data-eid="stat-avg-hr" style={{ backgroundColor: '#292929', borderRadius: '8px', flex: 1, textAlign: 'center', padding: '10px', marginRight: '6px' }}>
          <div data-eid="stat-avg-hr-value" style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF4949' }}>142</div>
          <div data-eid="stat-avg-hr-label" style={{ fontSize: '14px', color: '#b0b0b0' }}>Avg HR</div>
        </div>
        <div data-eid="stat-max-hr" style={{ backgroundColor: '#292929', borderRadius: '8px', flex: 1, textAlign: 'center', padding: '10px', marginLeft: '6px', marginRight: '6px' }}>
          <div data-eid="stat-max-hr-value" style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF4949' }}>178</div>
          <div data-eid="stat-max-hr-label" style={{ fontSize: '14px', color: '#b0b0b0' }}>Max HR</div>
        </div>
        <div data-eid="stat-calories" style={{ backgroundColor: '#292929', borderRadius: '8px', flex: 1, textAlign: 'center', padding: '10px', marginLeft: '6px' }}>
          <div data-eid="stat-calories-value" style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFAA00' }}>487</div>
          <div data-eid="stat-calories-label" style={{ fontSize: '14px', color: '#b0b0b0' }}>Calories</div>
        </div>
      </div>
      <div data-eid="zones-section" style={{ marginTop: '20px' }}>
        <div data-eid="zones-title" style={{ fontWeight: 'bold', marginBottom: '10px' }}>HR Zones</div>
        {data.zones.map((zone, index) => (
          <div key={index} data-eid={`zone-${zone.id}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ flex: 1, fontSize: '14px', color: zone.color }}>{zone.label}</div>
            <div style={{ flex: 2, borderRadius: '8px', backgroundColor: '#3a3a3a', marginLeft: '10px', marginRight: '10px' }}>
              <div data-eid={`zone-${zone.id}-bar`} style={{ width: `${zone.percentage}%`, backgroundColor: zone.color, height: '6px', borderRadius: '8px' }}></div>
            </div>
            <span data-eid={`zone-${zone.id}-time`} style={{ fontSize: '14px', color: '#b0b0b0' }}>{zone.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;