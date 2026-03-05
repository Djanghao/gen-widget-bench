import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, MapPin, Circle } from 'lucide-react';
import data from './data.json';

const ParkingGarageStatus = () => {
  const { garage, floors, summary, quickStats, occupancyData } = data;

  // Calculate bar width percentage for each floor
  const getBarWidth = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    return Math.max(percentage, 5); // Minimum 5% to ensure visibility
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#1a1a2e',
        color: '#e6e6e6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 data-eid="garage-name" style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0', color: '#ffffff' }}>
          {garage.name}
        </h2>
        <div data-eid="garage-address" style={{ fontSize: '16px', color: '#a0a0c0', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <MapPin size={16} />
          {garage.address}
        </div>
        <span 
          data-eid="status-badge" 
          style={{
            backgroundColor: '#4ade80',
            color: '#065f46',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Circle size={10} fill="#065f46" />
          {garage.status}
        </span>
      </header>

      {/* Floors Section */}
      <div data-eid="floors-section" style={{ marginBottom: '32px' }}>
        {floors.map((floor, index) => (
          <div 
            key={floor.level}
            data-eid={`floor-${floor.level.toLowerCase()}`}
            style={{
              backgroundColor: '#1f1f38',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '16px',
              borderLeft: '4px solid #3b82f6'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span 
                data-eid={`floor-${floor.level.toLowerCase()}-label`} 
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#93c5fd',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {floor.level}
              </span>
              <span 
                data-eid={`floor-${floor.level.toLowerCase()}-rate`} 
                style={{ 
                  fontSize: '14px', 
                  color: '#a0a0c0',
                  backgroundColor: '#2d2d44',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}
              >
                ${floor.rate}/hr
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <div 
                data-eid={`floor-${floor.level.toLowerCase()}-bar`} 
                style={{
                  flex: 1,
                  height: '12px',
                  backgroundColor: '#2d2d44',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  marginRight: '12px'
                }}
              >
                <div 
                  style={{
                    height: '100%',
                    width: `${getBarWidth(floor.available, floor.total)}%`,
                    backgroundColor: floor.available > floor.total * 0.3 ? '#4ade80' : '#f87171',
                    borderRadius: '6px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <span 
                data-eid={`floor-${floor.level.toLowerCase()}-spots`} 
                style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  minWidth: '80px',
                  textAlign: 'right'
                }}
              >
                {floor.available}/{floor.total} spots
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div data-eid="summary-section" style={{ 
        backgroundColor: '#1f1f38', 
        borderRadius: '10px', 
        padding: '20px', 
        marginBottom: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#a0a0c0', marginBottom: '4px' }}>Total Spots</div>
          <span data-eid="total-spots" style={{ fontSize: '24px', fontWeight: '700', color: '#93c5fd' }}>{summary.totalSpots}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#a0a0c0', marginBottom: '4px' }}>Available</div>
          <span data-eid="available-spots" style={{ fontSize: '24px', fontWeight: '700', color: '#4ade80' }}>{summary.availableSpots}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#a0a0c0', marginBottom: '4px' }}>Hourly Rate</div>
          <span data-eid="hourly-rate" style={{ fontSize: '24px', fontWeight: '700', color: '#93c5fd' }}>${summary.hourlyRate}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div data-eid="quick-stats" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        backgroundColor: '#1f1f38', 
        borderRadius: '10px', 
        padding: '16px', 
        marginBottom: '24px',
        fontSize: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} color="#a0a0c0" />
          <span data-eid="avg-stay" style={{ fontWeight: '600', color: '#93c5fd' }}>{quickStats.avgStay}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%' }}></div>
          <span data-eid="busiest-hour" style={{ fontWeight: '600', color: '#93c5fd' }}>{quickStats.busiestHour}</span>
        </div>
      </div>

      {/* Occupancy Chart */}
      <div data-eid="occupancy-chart" style={{ height: '220px', marginTop: '16px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" />
            <XAxis 
              dataKey="hour" 
              stroke="#a0a0c0" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#a0a0c0" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
              domain={[0, 100]}
              tickCount={5}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f1f38', 
                borderColor: '#2d2d44',
                borderRadius: '8px',
                color: '#e6e6e6'
              }} 
              labelStyle={{ color: '#93c5fd' }}
              formatter={(value) => [`${value}%`, 'Occupancy']}
            />
            <Bar 
              dataKey="occupancy" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              name="Occupancy %"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ParkingGarageStatus;