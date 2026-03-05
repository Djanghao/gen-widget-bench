import React from 'react';
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplet } from 'lucide-react';
import data from './data.json';

const HydrationDailyLog = () => {
  const { header, progress, hourly, quickAdd, history, stats } = data;

  // Progress chart data
  const progressData = [
    { name: 'Progress', value: progress.percent, fill: '#4CAF50' }
  ];

  // Hourly chart data
  const hourlyData = hourly.map((value, index) => ({
    hour: `${index + 6}:00`,
    intake: value
  }));

  // History data
  const historyData = history.map((value, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    intake: value
  }));

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0a3d3d',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        borderRadius: '16px',
        width: '360px',
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span data-eid="header-icon" style={{ color: '#4CAF50' }}>
          <Droplet size={24} />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span data-eid="header-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>Hydration</span>
          <span data-eid="header-date" style={{ fontSize: '14px', color: '#a0d9a0' }}>{header.date}</span>
        </div>
      </div>

      {/* Progress Ring */}
      <div data-eid="progress-ring" style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
        <div data-eid="progress-chart" style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" barSize={20} data={progressData}>
              <RadialBar 
                background 
                cornerRadius={10} 
                dataKey="value" 
                startAngle={180} 
                endAngle={0} 
                clockWise={false}
                fill="#e0f7e0"
              />
              <RadialBar 
                cornerRadius={10} 
                dataKey="value" 
                startAngle={180} 
                endAngle={0} 
                clockWise={false}
                fill="#4CAF50"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        
        <div data-eid="progress-center" style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div data-eid="progress-current" style={{ fontSize: '32px', fontWeight: 'bold' }}>{progress.current}</div>
          <div data-eid="progress-goal" style={{ fontSize: '16px', color: '#a0d9a0' }}>{progress.goal}</div>
          <div data-eid="progress-percent" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px', color: '#4CAF50' }}>{progress.percent}%</div>
        </div>
      </div>

      {/* Hourly Intake */}
      <div data-eid="hourly-section" style={{ flex: '1' }}>
        <div data-eid="hourly-title" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#a0d9a0' }}>Hourly Intake</div>
        <div data-eid="hourly-chart" style={{ height: '120px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a5a5a" />
              <XAxis 
                dataKey="hour" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a0d9a0', fontSize: 10 }} 
                interval={2}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a0d9a0', fontSize: 10 }} 
                domain={[0, 500]}
                ticks={[0, 250, 500]}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a3d3d', borderColor: '#1a5a5a', borderRadius: '8px' }}
                itemStyle={{ color: 'white' }}
                labelStyle={{ color: '#a0d9a0' }}
              />
              <Bar dataKey="intake" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Add */}
      <div data-eid="quick-add-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div data-eid="quick-add-title" style={{ fontSize: '16px', fontWeight: 'bold', color: '#a0d9a0' }}>Quick Add</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div data-eid="quick-add-150" style={{ 
            backgroundColor: '#1a5a5a', 
            borderRadius: '12px', 
            padding: '12px 20px', 
            fontSize: '14px', 
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: '1',
            textAlign: 'center',
            border: '1px solid #2a7a7a'
          }}>+150ml</div>
          <div data-eid="quick-add-250" style={{ 
            backgroundColor: '#1a5a5a', 
            borderRadius: '12px', 
            padding: '12px 20px', 
            fontSize: '14px', 
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: '1',
            textAlign: 'center',
            border: '1px solid #2a7a7a'
          }}>+250ml</div>
          <div data-eid="quick-add-500" style={{ 
            backgroundColor: '#1a5a5a', 
            borderRadius: '12px', 
            padding: '12px 20px', 
            fontSize: '14px', 
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: '1',
            textAlign: 'center',
            border: '1px solid #2a7a7a'
          }}>+500ml</div>
        </div>
      </div>

      {/* Last 7 Days */}
      <div data-eid="history-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div data-eid="history-title" style={{ fontSize: '16px', fontWeight: 'bold', color: '#a0d9a0' }}>Last 7 Days</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
          {historyData.map((day, index) => (
            <div 
              key={day.day} 
              data-eid={`history-day-${index}`} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '32px',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '12px', 
                color: '#a0d9a0',
                marginBottom: '4px'
              }}>{day.day}</div>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                backgroundColor: day.intake > 0 ? '#4CAF50' : '#1a5a5a',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {day.intake > 0 ? `${Math.round(day.intake / 100)}x` : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div data-eid="stats-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
        <div data-eid="stat-daily-avg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div data-eid="stat-daily-avg-value" style={{ fontSize: '16px', fontWeight: 'bold' }}>{stats.dailyAvg}</div>
          <div data-eid="stat-daily-avg-label" style={{ fontSize: '12px', color: '#a0d9a0' }}>Daily Avg</div>
        </div>
        <div data-eid="stat-streak" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div data-eid="stat-streak-value" style={{ fontSize: '16px', fontWeight: 'bold' }}>{stats.streak}</div>
          <div data-eid="stat-streak-label" style={{ fontSize: '12px', color: '#a0d9a0' }}>Streak</div>
        </div>
      </div>
    </section>
  );
};

export default HydrationDailyLog;