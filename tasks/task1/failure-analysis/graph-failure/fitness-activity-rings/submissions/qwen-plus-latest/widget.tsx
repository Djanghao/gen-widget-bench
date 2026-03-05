import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import data from './data.json';

const FitnessActivityRings = () => {
  const { header, rings, stats, summary } = data;

  // Prepare radial bar chart data
  const chartData = [
    { name: 'Move', value: rings.move.current, max: rings.move.goal, color: '#FF6B6B' },
    { name: 'Exercise', value: rings.exercise.current, max: rings.exercise.goal, color: '#4ECDC4' },
    { name: 'Stand', value: rings.stand.current, max: rings.stand.goal, color: '#45B7D1' },
  ];

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#1E1E1E',
        borderRadius: '24px',
        padding: '24px',
        width: '360px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span data-eid="header-icon" style={{ color: '#FFFFFF' }}>
            <Activity size={24} />
          </span>
          <span data-eid="header-title" style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '600' }}>Activity</span>
        </div>
        <span data-eid="header-date" style={{ color: '#86868B', fontSize: '14px', fontWeight: '500' }}>{header.date}</span>
      </div>

      {/* Rings Container */}
      <div data-eid="rings-container" style={{ position: 'relative', width: '100%', height: '220px', marginBottom: '24px' }}>
        <div data-eid="rings-chart" style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="60%" barSize={16} data={chartData}>
              <RadialBar 
                background 
                cornerRadius={10} 
                dataKey="value" 
                clockWise 
                startAngle={90} 
                endAngle={-270} 
                isAnimationActive={false}
              />
              {chartData.map((entry, index) => (
                <RadialBar
                  key={`bar-${index}`}
                  cornerRadius={10}
                  dataKey="value"
                  clockWise
                  startAngle={90}
                  endAngle={-270}
                  fill={entry.color}
                  background={{ fill: '#2D2D2D' }}
                  isAnimationActive={false}
                />
              ))}
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center Label */}
        <div data-eid="rings-center-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div data-eid="rings-center-value" style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', lineHeight: '1' }}>{rings.totalCalories}</div>
          <div data-eid="rings-center-unit" style={{ color: '#86868B', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>CAL</div>
        </div>
      </div>

      {/* Stats Row */}
      <div data-eid="stats-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        {/* Move Stat */}
        <div data-eid="stat-move" style={{ flex: 1, marginRight: '8px', textAlign: 'center' }}>
          <span data-eid="stat-move-icon" style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF6B6B', marginBottom: '4px' }}></span>
          <div data-eid="stat-move-label" style={{ color: '#86868B', fontSize: '12px', fontWeight: '500', marginBottom: '2px' }}>Move</div>
          <div data-eid="stat-move-value" style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{stats.move.current}/{stats.move.goal} CAL</div>
        </div>
        
        {/* Exercise Stat */}
        <div data-eid="stat-exercise" style={{ flex: 1, margin: '0 8px', textAlign: 'center' }}>
          <span data-eid="stat-exercise-icon" style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4ECDC4', marginBottom: '4px' }}></span>
          <div data-eid="stat-exercise-label" style={{ color: '#86868B', fontSize: '12px', fontWeight: '500', marginBottom: '2px' }}>Exercise</div>
          <div data-eid="stat-exercise-value" style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{stats.exercise.current}/{stats.exercise.goal} MIN</div>
        </div>
        
        {/* Stand Stat */}
        <div data-eid="stat-stand" style={{ flex: 1, marginLeft: '8px', textAlign: 'center' }}>
          <span data-eid="stat-stand-icon" style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#45B7D1', marginBottom: '4px' }}></span>
          <div data-eid="stat-stand-label" style={{ color: '#86868B', fontSize: '12px', fontWeight: '500', marginBottom: '2px' }}>Stand</div>
          <div data-eid="stat-stand-value" style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{stats.stand.current}/{stats.stand.goal} HRS</div>
        </div>
      </div>

      {/* Summary Section */}
      <div data-eid="summary-section" style={{ borderTop: '1px solid #2D2D2D', paddingTop: '16px' }}>
        <div data-eid="summary-title" style={{ color: '#86868B', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Today's Summary</div>
        
        <div data-eid="summary-item-calories" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #2D2D2D' }}>
          <div style={{ color: '#86868B', fontSize: '14px' }}>Calories Burned</div>
          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{summary.caloriesBurned}</div>
        </div>
        
        <div data-eid="summary-item-active" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <div style={{ color: '#86868B', fontSize: '14px' }}>Active Minutes</div>
          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{summary.activeMinutes}</div>
        </div>
        
        <div data-eid="summary-item-stand" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
          <div style={{ color: '#86868B', fontSize: '14px' }}>Stand Hours</div>
          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{summary.standHours}</div>
        </div>
      </div>
    </section>
  );
};

export default FitnessActivityRings;