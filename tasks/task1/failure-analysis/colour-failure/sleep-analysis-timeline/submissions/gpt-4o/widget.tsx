import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Moon, Sun } from 'lucide-react';
import data from './data.json';

const SleepAnalysisWidget: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        padding: '16px',
        borderRadius: '16px',
        color: '#fff',
        width: '300px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <span data-eid="header-icon">
          <Moon color="#8b5cf6" />
        </span>
        <span
          data-eid="header-title"
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            marginLeft: '8px',
          }}
        >
          Sleep Analysis
        </span>
        <span data-eid="header-date" style={{ fontSize: '12px', color: '#9ca3af' }}>
          Feb 23 - Feb 24
        </span>
      </div>
      <div
        data-eid="score-section"
        style={{
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <div data-eid="score-value" style={{ fontSize: '48px', color: '#8b5cf6' }}>
          82
        </div>
        <span data-eid="score-max" style={{ fontSize: '18px', color: '#9ca3af' }}>
          /100
        </span>
        <div data-eid="score-label" style={{ fontSize: '14px', color: '#9ca3af' }}>
          Sleep Score
        </div>
      </div>
      <div data-eid="timeline-section" style={{ marginBottom: '24px' }}>
        <div data-eid="timeline-chart">
          <BarChart width={250} height={100} data={data.timeline}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#9ca3af" />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="awake" stackId="a" fill="#ef4444" />
            <Bar dataKey="rem" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="light" stackId="a" fill="#60a5fa" />
            <Bar dataKey="deep" stackId="a" fill="#4f46e5" />
          </BarChart>
        </div>
        <div
          data-eid="timeline-legend"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            marginTop: '8px',
            color: '#9ca3af',
          }}
        >
          <span data-eid="legend-awake" style={{ color: '#ef4444' }}>
            Awake (42m)
          </span>
          <span data-eid="legend-rem" style={{ color: '#8b5cf6' }}>
            Rem (1h 38m)
          </span>
          <span data-eid="legend-light" style={{ color: '#60a5fa' }}>
            Light (3h 27m)
          </span>
          <span data-eid="legend-deep" style={{ color: '#4f46e5' }}>
            Deep (1h 36m)
          </span>
        </div>
      </div>
      <div
        data-eid="times-row"
        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}
      >
        <div data-eid="bedtime-label" style={{ color: '#9ca3af' }}>
          Bedtime
        </div>
        <div data-eid="waketime-label" style={{ color: '#9ca3af' }}>
          Wake time
        </div>
        <div data-eid="bedtime-value" style={{ color: '#facc15' }}>
          <Moon color="#facc15" /> 10:47 PM
        </div>
        <div data-eid="waketime-value" style={{ color: '#facc15' }}>
          <Sun color="#facc15" /> 6:52 AM
        </div>
      </div>
      <div data-eid="stats-grid" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div data-eid="stat-total-sleep" style={{ textAlign: 'center', width: '70px' }}>
          <div data-eid="stat-total-sleep-value" style={{ fontSize: '18px' }}>
            7h 23m
          </div>
          <div data-eid="stat-total-sleep-label" style={{ fontSize: '12px', color: '#9ca3af' }}>
            Total Sleep
          </div>
        </div>
        <div data-eid="stat-time-in-bed" style={{ textAlign: 'center', width: '70px' }}>
          <div data-eid="stat-time-in-bed-value" style={{ fontSize: '18px' }}>
            8h 05m
          </div>
          <div data-eid="stat-time-in-bed-label" style={{ fontSize: '12px', color: '#9ca3af' }}>
            Time in Bed
          </div>
        </div>
        <div data-eid="stat-efficiency" style={{ textAlign: 'center', width: '70px' }}>
          <div data-eid="stat-efficiency-value" style={{ fontSize: '18px', color: '#34d399' }}>
            91%
          </div>
          <div data-eid="stat-efficiency-label" style={{ fontSize: '12px', color: '#9ca3af' }}>
            Efficiency
          </div>
        </div>
      </div>
    </section>
  );
};

export default SleepAnalysisWidget;