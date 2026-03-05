import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Run } from 'lucide-react';
import data from './data.json';

const WorkoutHeartRateZones = () => {
  const { header, stats, zones, hrData } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
        borderRadius: '16px',
        width: '360px',
        height: '720px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span data-eid="header-icon" style={{ color: '#4CAF50' }}>
          <Run size={24} />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span data-eid="header-workout-type" style={{ fontSize: '18px', fontWeight: '600', lineHeight: '1.2' }}>
            {header.workoutType}
          </span>
          <span data-eid="header-date" style={{ fontSize: '14px', color: '#B0B0B0', lineHeight: '1.2' }}>
            {header.date}
          </span>
        </div>
        <div data-eid="header-duration" style={{ fontSize: '20px', fontWeight: '700', minWidth: '72px', textAlign: 'right' }}>
          {header.duration}
        </div>
      </div>

      {/* Heart Rate Chart Section */}
      <div data-eid="hr-chart-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div data-eid="hr-chart-title" style={{ fontSize: '16px', fontWeight: '600', color: '#E0E0E0' }}>
          Heart Rate
        </div>
        <div data-eid="hr-chart" style={{ height: '160px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#666" tick={{ fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} domain={[100, 180]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  borderColor: '#333', 
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }} 
                labelStyle={{ color: '#B0B0B0' }}
              />
              <Area 
                type="monotone" 
                dataKey="hr" 
                stroke="#4CAF50" 
                fill="url(#colorUv)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Row */}
      <div data-eid="stats-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
        {/* Avg HR */}
        <div data-eid="stat-avg-hr" style={{ 
          backgroundColor: '#1E1E1E', 
          borderRadius: '12px', 
          padding: '16px', 
          flex: 1,
          textAlign: 'center'
        }}>
          <div data-eid="stat-avg-hr-value" style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            lineHeight: '1.2',
            marginBottom: '4px'
          }}>
            {stats.avgHR}
          </div>
          <div data-eid="stat-avg-hr-label" style={{ 
            fontSize: '14px', 
            color: '#B0B0B0',
            lineHeight: '1.2'
          }}>
            Avg HR
          </div>
        </div>

        {/* Max HR */}
        <div data-eid="stat-max-hr" style={{ 
          backgroundColor: '#1E1E1E', 
          borderRadius: '12px', 
          padding: '16px', 
          flex: 1,
          textAlign: 'center'
        }}>
          <div data-eid="stat-max-hr-value" style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            lineHeight: '1.2',
            marginBottom: '4px'
          }}>
            {stats.maxHR}
          </div>
          <div data-eid="stat-max-hr-label" style={{ 
            fontSize: '14px', 
            color: '#B0B0B0',
            lineHeight: '1.2'
          }}>
            Max HR
          </div>
        </div>

        {/* Calories */}
        <div data-eid="stat-calories" style={{ 
          backgroundColor: '#1E1E1E', 
          borderRadius: '12px', 
          padding: '16px', 
          flex: 1,
          textAlign: 'center'
        }}>
          <div data-eid="stat-calories-value" style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            lineHeight: '1.2',
            marginBottom: '4px'
          }}>
            {stats.calories}
          </div>
          <div data-eid="stat-calories-label" style={{ 
            fontSize: '14px', 
            color: '#B0B0B0',
            lineHeight: '1.2'
          }}>
            Calories
          </div>
        </div>
      </div>

      {/* HR Zones Section */}
      <div data-eid="zones-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div data-eid="zones-title" style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#E0E0E0',
          paddingBottom: '8px',
          borderBottom: '1px solid #333'
        }}>
          HR Zones
        </div>

        {/* Rest Zone */}
        <div data-eid="zone-rest" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '80px', 
            fontSize: '14px', 
            color: '#B0B0B0',
            fontWeight: '500'
          }}>
            Rest
          </div>
          <div data-eid="zone-rest-bar" style={{ 
            flex: 1, 
            height: '8px', 
            backgroundColor: '#333', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${zones.rest.percent}%`, 
              backgroundColor: '#7C4DFF',
              borderRadius: '4px'
            }}></div>
          </div>
          <span data-eid="zone-rest-time" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            minWidth: '56px',
            textAlign: 'right'
          }}>
            {zones.rest.time}
          </span>
        </div>

        {/* Fat Burn Zone */}
        <div data-eid="zone-fat-burn" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '80px', 
            fontSize: '14px', 
            color: '#B0B0B0',
            fontWeight: '500'
          }}>
            Fat Burn
          </div>
          <div data-eid="zone-fat-burn-bar" style={{ 
            flex: 1, 
            height: '8px', 
            backgroundColor: '#333', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${zones.fatBurn.percent}%`, 
              backgroundColor: '#4CAF50',
              borderRadius: '4px'
            }}></div>
          </div>
          <span data-eid="zone-fat-burn-time" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            minWidth: '56px',
            textAlign: 'right'
          }}>
            {zones.fatBurn.time}
          </span>
        </div>

        {/* Cardio Zone */}
        <div data-eid="zone-cardio" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '80px', 
            fontSize: '14px', 
            color: '#B0B0B0',
            fontWeight: '500'
          }}>
            Cardio
          </div>
          <div data-eid="zone-cardio-bar" style={{ 
            flex: 1, 
            height: '8px', 
            backgroundColor: '#333', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${zones.cardio.percent}%`, 
              backgroundColor: '#2196F3',
              borderRadius: '4px'
            }}></div>
          </div>
          <span data-eid="zone-cardio-time" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            minWidth: '56px',
            textAlign: 'right'
          }}>
            {zones.cardio.time}
          </span>
        </div>

        {/* Peak Zone */}
        <div data-eid="zone-peak" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '80px', 
            fontSize: '14px', 
            color: '#B0B0B0',
            fontWeight: '500'
          }}>
            Peak
          </div>
          <div data-eid="zone-peak-bar" style={{ 
            flex: 1, 
            height: '8px', 
            backgroundColor: '#333', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${zones.peak.percent}%`, 
              backgroundColor: '#FF9800',
              borderRadius: '4px'
            }}></div>
          </div>
          <span data-eid="zone-peak-time" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            minWidth: '56px',
            textAlign: 'right'
          }}>
            {zones.peak.time}
          </span>
        </div>

        {/* Max Zone */}
        <div data-eid="zone-max" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '80px', 
            fontSize: '14px', 
            color: '#B0B0B0',
            fontWeight: '500'
          }}>
            Max
          </div>
          <div data-eid="zone-max-bar" style={{ 
            flex: 1, 
            height: '8px', 
            backgroundColor: '#333', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${zones.max.percent}%`, 
              backgroundColor: '#F44336',
              borderRadius: '4px'
            }}></div>
          </div>
          <span data-eid="zone-max-time" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            minWidth: '56px',
            textAlign: 'right'
          }}>
            {zones.max.time}
          </span>
        </div>
      </div>
    </section>
  );
};

export default WorkoutHeartRateZones;