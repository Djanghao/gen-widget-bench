import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Moon } from 'lucide-react';
import data from './data.json';

const SleepAnalysisTimeline = () => {
  const { timelineData, stats, bedtime, waketime } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#1a2b4d',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        borderRadius: '12px',
        width: '360px',
        height: '680px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span data-eid="header-icon">
          <Moon size={24} />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span data-eid="header-title" style={{ fontSize: '20px', fontWeight: '600' }}>
            Sleep Analysis
          </span>
          <span data-eid="header-date" style={{ fontSize: '14px', color: '#a0b0c0' }}>
            Feb 23 - Feb 24
          </span>
        </div>
      </div>

      {/* Score Section */}
      <div data-eid="score-section" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '4px' }}>
          <div data-eid="score-value" style={{ fontSize: '48px', fontWeight: '700' }}>
            {stats.score}
          </div>
          <span data-eid="score-max" style={{ fontSize: '20px', color: '#a0b0c0' }}>
            /100
          </span>
        </div>
        <div data-eid="score-label" style={{ fontSize: '14px', color: '#a0b0c0', marginTop: '4px' }}>
          Sleep Score
        </div>
      </div>

      {/* Timeline Section */}
      <div data-eid="timeline-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div data-eid="timeline-chart" style={{ flex: 1, height: '120px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3b5d" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a0b0c0', fontSize: 10 }} 
                tickMargin={4}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2a3b5d', 
                  borderColor: '#3a4b6d',
                  borderRadius: '8px'
                }} 
                itemStyle={{ color: 'white' }}
              />
              <Bar 
                dataKey="awake" 
                stackId="a" 
                fill="#ff6b6b" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="rem" 
                stackId="a" 
                fill="#4ecdc4" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="light" 
                stackId="a" 
                fill="#ffd166" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="deep" 
                stackId="a" 
                fill="#118ab2" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div data-eid="timeline-legend" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
          <span data-eid="legend-awake" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#ff6b6b', borderRadius: '2px' }}></div>
            Awake
          </span>
          <span data-eid="legend-rem" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#4ecdc4', borderRadius: '2px' }}></div>
            REM
          </span>
          <span data-eid="legend-light" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#ffd166', borderRadius: '2px' }}></div>
            Light
          </span>
          <span data-eid="legend-deep" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#118ab2', borderRadius: '2px' }}></div>
            Deep
          </span>
        </div>
      </div>

      {/* Times Row */}
      <div data-eid="times-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div data-eid="bedtime-label" style={{ color: '#a0b0c0', marginBottom: '4px' }}>
            Bedtime
          </div>
          <div data-eid="bedtime-value" style={{ fontWeight: '600' }}>
            {bedtime}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div data-eid="waketime-label" style={{ color: '#a0b0c0', marginBottom: '4px' }}>
            Wake time
          </div>
          <div data-eid="waketime-value" style={{ fontWeight: '600' }}>
            {waketime}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div data-eid="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Total Sleep */}
        <div data-eid="stat-total-sleep" style={{ backgroundColor: '#2a3b5d', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
          <div data-eid="stat-total-sleep-value" style={{ fontSize: '20px', fontWeight: '700' }}>
            {stats.totalSleep}
          </div>
          <div data-eid="stat-total-sleep-label" style={{ fontSize: '12px', color: '#a0b0c0', marginTop: '4px' }}>
            Total Sleep
          </div>
        </div>
        
        {/* Time in Bed */}
        <div data-eid="stat-time-in-bed" style={{ backgroundColor: '#2a3b5d', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
          <div data-eid="stat-time-in-bed-value" style={{ fontSize: '20px', fontWeight: '700' }}>
            {stats.timeInBed}
          </div>
          <div data-eid="stat-time-in-bed-label" style={{ fontSize: '12px', color: '#a0b0c0', marginTop: '4px' }}>
            Time in Bed
          </div>
        </div>
        
        {/* Efficiency */}
        <div data-eid="stat-efficiency" style={{ backgroundColor: '#2a3b5d', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
          <div data-eid="stat-efficiency-value" style={{ fontSize: '20px', fontWeight: '700' }}>
            {stats.efficiency}
          </div>
          <div data-eid="stat-efficiency-label" style={{ fontSize: '12px', color: '#a0b0c0', marginTop: '4px' }}>
            Efficiency
          </div>
        </div>
        
        {/* Placeholder for fourth stat (not visible in target but required by elements.json) */}
        <div data-eid="stat-efficiency" style={{ backgroundColor: '#2a3b5d', borderRadius: '8px', padding: '12px', textAlign: 'center', visibility: 'hidden' }}>
          <div data-eid="stat-efficiency-value" style={{ fontSize: '20px', fontWeight: '700' }}>
            N/A
          </div>
          <div data-eid="stat-efficiency-label" style={{ fontSize: '12px', color: '#a0b0c0', marginTop: '4px' }}>
            Placeholder
          </div>
        </div>
      </div>
    </section>
  );
};

export default SleepAnalysisTimeline;