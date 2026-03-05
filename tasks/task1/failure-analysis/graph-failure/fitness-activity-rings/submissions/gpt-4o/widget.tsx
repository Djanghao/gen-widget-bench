import React from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import data from './data.json';

const Widget = () => {
  return (
    <section data-eid="root" style={{ backgroundColor: '#141414', borderRadius: '20px', padding: '20px', maxWidth: '300px', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span data-eid="header-icon" style={{ color: 'red', fontSize: '24px' }}>🔥</span>
        <span data-eid="header-title" style={{ fontSize: '18px' }}>Activity</span>
        <span data-eid="header-date" style={{ fontSize: '14px', color: '#aaa' }}>Mon, Feb 24</span>
      </div>
      <div data-eid="rings-container" style={{ position: 'relative', marginBottom: '20px' }}>
        <div data-eid="rings-chart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <RadialBarChart width={200} height={200} innerRadius="10%" outerRadius="100%" data={data.rings}>
            <RadialBar minAngle={15} background dataKey="value">
              {data.rings.map((entry, index) => (
                <RadialBar key={`radial-bar-${index}`} dataKey={entry.value} fill={entry.fill} />
              ))}
            </RadialBar>
          </RadialBarChart>
        </div>
        <div data-eid="rings-center-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div data-eid="rings-center-value" style={{ fontSize: '32px', fontWeight: 'bold' }}>623</div>
          <div data-eid="rings-center-unit" style={{ fontSize: '14px', color: '#aaa' }}>CAL</div>
        </div>
      </div>
      <div data-eid="stats-row" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        {data.stats.map((stat) => (
          <div data-eid={`stat-${stat.id}`} key={stat.id} style={{ textAlign: 'center', backgroundColor: '#202020', padding: '10px', borderRadius: '10px', width: '80px' }}>
            <span data-eid={`stat-${stat.id}-icon`} style={{ display: 'block', fontSize: '12px', color: stat.color }}>&#9679;</span>
            <div data-eid={`stat-${stat.id}-label`} style={{ fontSize: '12px', color: '#aaa' }}>{stat.label}</div>
            <div data-eid={`stat-${stat.id}-value`} style={{ fontSize: '14px', fontWeight: 'bold' }}>{stat.current}/{stat.goal} {stat.unit}</div>
          </div>
        ))}
      </div>
      <div data-eid="summary-section" style={{ backgroundColor: '#202020', borderRadius: '10px', padding: '10px' }}>
        <div data-eid="summary-title" style={{ marginBottom: '10px', fontSize: '12px', color: '#aaa' }}>TODAY'S SUMMARY</div>
        {data.summary.map((item) => (
          <div data-eid={`summary-item-${item.id}`} key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ color: '#aaa', fontSize: '12px' }}>{item.label}</span>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: item.color }}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;