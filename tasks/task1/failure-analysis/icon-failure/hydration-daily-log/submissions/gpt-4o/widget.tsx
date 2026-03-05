import React from 'react';
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis } from 'recharts';
import { Droplet } from 'lucide-react';
import data from './data.json';

const Widget: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{ background: '#0A2C3D', borderRadius: '10px', color: '#fff', padding: '20px', fontFamily: 'Arial' }}
    >
      <div data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span data-eid="header-icon">
          <Droplet color="#1BFCFF" />
        </span>
        <span data-eid="header-title" style={{ fontSize: '18px' }}>Hydration</span>
        <span data-eid="header-date" style={{ fontSize: '14px', color: '#B0BEC5' }}>Monday, Feb 24</span>
      </div>
      <div data-eid="progress-ring" style={{ position: 'relative', width: '100%', height: '150px', margin: '20px 0' }}>
        <div data-eid="progress-chart" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <RadialBarChart
            width={150}
            height={150}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            barSize={10}
            data={[{ name: 'Hydration', value: 72 }]}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background dataKey="value" fill="#1BFCFF" />
          </RadialBarChart>
        </div>
        <div data-eid="progress-center" style={{ textAlign: 'center', position: 'relative', top: '45px' }}>
          <div data-eid="progress-current" style={{ fontSize: '24px' }}>1.8L</div>
          <div data-eid="progress-goal" style={{ fontSize: '16px', color: '#B0BEC5' }}>/ 2.5L</div>
          <div data-eid="progress-percent" style={{ fontSize: '14px', color: '#1BFCFF' }}>72%</div>
        </div>
      </div>
      <div data-eid="hourly-section">
        <div data-eid="hourly-title" style={{ marginBottom: '10px', fontSize: '14px', color: '#B0BEC5' }}>HOURLY INTAKE</div>
        <div data-eid="hourly-chart">
          <BarChart width={240} height={80} data={data.hourly}>
            <Bar dataKey="value" fill="#1BFCFF" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#B0BEC5" />
          </BarChart>
        </div>
      </div>
      <div data-eid="quick-add-section" style={{ marginTop: '20px' }}>
        <div data-eid="quick-add-title" style={{ marginBottom: '10px', fontSize: '14px', color: '#B0BEC5' }}>QUICK ADD</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {data.quickAdd.map((item, index) => (
            <div
              key={index}
              data-eid={`quick-add-${item.value}`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '40px',
                border: '1px solid #1BFCFF', borderRadius: '5px', color: '#1BFCFF'
              }}
            >
              <Droplet size={12} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div data-eid="history-section" style={{ marginTop: '20px' }}>
        <div data-eid="history-title" style={{ marginBottom: '10px', fontSize: '14px', color: '#B0BEC5' }}>LAST 7 DAYS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {data.history.map((day, index) => (
            <div
              key={index}
              data-eid={`history-day-${index}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                color: day.active ? '#1BFCFF' : '#B0BEC5'
              }}
            >
              <div>{day.label}</div>
              <Droplet size={14} />
              <div>{day.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div data-eid="stats-row" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div data-eid="stat-daily-avg" style={{ textAlign: 'center' }}>
          <div data-eid="stat-daily-avg-value" style={{ fontSize: '16px' }}>2.1L</div>
          <div data-eid="stat-daily-avg-label" style={{ color: '#B0BEC5' }}>Daily Avg</div>
        </div>
        <div data-eid="stat-streak" style={{ textAlign: 'center' }}>
          <div data-eid="stat-streak-value" style={{ fontSize: '16px' }}>5 days</div>
          <div data-eid="stat-streak-label" style={{ color: '#B0BEC5' }}>Streak</div>
        </div>
      </div>
    </section>
  );
};

export default Widget;