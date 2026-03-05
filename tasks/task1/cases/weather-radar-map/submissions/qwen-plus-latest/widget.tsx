import React from 'react';
import data from './data.json';

const WeatherRadarWidget = () => {
  const { 
    city, 
    updateTime, 
    alert, 
    radarGrid, 
    legendLabels, 
    conditions, 
    forecast, 
    outlook 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div data-eid="city-name" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.2' }}>
          {city}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span data-eid="update-time" style={{ fontSize: '14px', color: '#94a3b8' }}>
            {updateTime}
          </span>
          <span 
            data-eid="alert-badge" 
            style={{ 
              backgroundColor: '#dc2626', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: '600' 
            }}
          >
            {alert}
          </span>
        </div>
      </header>

      {/* Radar Section */}
      <div data-eid="radar-section" style={{ marginBottom: '32px' }}>
        <div data-eid="radar-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>
          Precipitation Radar
        </div>
        
        <div data-eid="radar-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(8, 1fr)', 
          gap: '4px', 
          marginBottom: '16px',
          height: '320px'
        }}>
          {radarGrid.map((cell, index) => (
            <div 
              key={index}
              data-eid={`radar-cell-${index}`}
              style={{
                backgroundColor: cell.color,
                borderRadius: '4px',
                border: '1px solid #1e293b'
              }}
            />
          ))}
        </div>
        
        <div data-eid="legend-bar" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '12px', 
          color: '#94a3b8',
          padding: '0 8px'
        }}>
          <span data-eid="legend-label-none">{legendLabels[0]}</span>
          <span data-eid="legend-label-light">{legendLabels[1]}</span>
          <span data-eid="legend-label-moderate">{legendLabels[2]}</span>
          <span data-eid="legend-label-heavy">{legendLabels[3]}</span>
          <span data-eid="legend-label-severe">{legendLabels[4]}</span>
        </div>
      </div>

      {/* Conditions Card */}
      <div data-eid="conditions-card" style={{ 
        backgroundColor: '#1e293b', 
        borderRadius: '12px', 
        padding: '24px', 
        marginBottom: '32px' 
      }}>
        <div data-eid="conditions-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '20px', 
          color: '#cbd5e1' 
        }}>
          Current Conditions
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {/* Temperature */}
          <div data-eid="metric-temp" style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="metric-temp-label" style={{ fontSize: '14px', color: '#94a3b8' }}>Temperature</span>
            <span data-eid="metric-temp-value" style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>{conditions.temperature}</span>
          </div>
          
          {/* Humidity */}
          <div data-eid="metric-humidity" style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="metric-humidity-label" style={{ fontSize: '14px', color: '#94a3b8' }}>Humidity</span>
            <span data-eid="metric-humidity-value" style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>{conditions.humidity}</span>
          </div>
          
          {/* Pressure */}
          <div data-eid="metric-pressure" style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="metric-pressure-label" style={{ fontSize: '14px', color: '#94a3b8' }}>Pressure</span>
            <span data-eid="metric-pressure-value" style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>{conditions.pressure}</span>
          </div>
          
          {/* Wind */}
          <div data-eid="metric-wind" style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="metric-wind-label" style={{ fontSize: '14px', color: '#94a3b8' }}>Wind</span>
            <span data-eid="metric-wind-value" style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>{conditions.wind}</span>
          </div>
          
          {/* Visibility */}
          <div data-eid="metric-visibility" style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="metric-visibility-label" style={{ fontSize: '14px', color: '#94a3b8' }}>Visibility</span>
            <span data-eid="metric-visibility-value" style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>{conditions.visibility}</span>
          </div>
          
          {/* Dew Point */}
          <div data-eid="metric-dewpoint" style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="metric-dewpoint-label" style={{ fontSize: '14px', color: '#94a3b8' }}>Dew Point</span>
            <span data-eid="metric-dewpoint-value" style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>{conditions.dewPoint}</span>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div data-eid="forecast-chart" style={{ marginBottom: '32px' }}>
        <div data-eid="forecast-chart-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px', 
          color: '#cbd5e1' 
        }}>
          24-Hour Forecast
        </div>
        <div style={{ 
          backgroundColor: '#1e293b', 
          borderRadius: '12px', 
          padding: '24px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94a3b8'
        }}>
          {/* Placeholder for chart visualization */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>Forecast Chart Visualization</div>
            <div style={{ fontSize: '14px' }}>Data: {forecast.dataPoints.length} points</div>
          </div>
        </div>
      </div>

      {/* Outlook Section */}
      <div data-eid="outlook-section">
        <div data-eid="outlook-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px', 
          color: '#cbd5e1' 
        }}>
          3-Day Outlook
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {outlook.map((day, index) => (
            <div 
              key={index} 
              data-eid={`outlook-day-${index}`} 
              style={{ 
                backgroundColor: '#1e293b', 
                borderRadius: '12px', 
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <div data-eid={`outlook-day-${index}-name`} style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#cbd5e1'
              }}>
                {day.day}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span data-eid={`outlook-day-${index}-high`} style={{ fontSize: '18px', fontWeight: '700' }}>{day.high}</span>
                <span data-eid={`outlook-day-${index}-low`} style={{ fontSize: '14px', color: '#94a3b8' }}>{day.low}</span>
              </div>
              <div data-eid={`outlook-day-${index}-condition`} style={{ 
                fontSize: '14px', 
                color: '#94a3b8',
                marginBottom: '4px'
              }}>
                {day.condition}
              </div>
              <div data-eid={`outlook-day-${index}-precip`} style={{ 
                fontSize: '12px', 
                color: '#64748b',
                fontWeight: '500'
              }}>
                {day.precipChance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherRadarWidget;