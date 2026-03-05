import React from 'react';
import data from './data.json';

export default function WeatherCityGlance() {
  return (
    <section 
      data-eid="root" 
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a202c, #2d3748)',
        borderRadius: '16px',
        padding: '16px',
        width: '360px',
        height: '560px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      <div 
        data-eid="alert-banner" 
        style={{
          backgroundColor: '#fbbf24',
          color: '#1a202c',
          fontWeight: 'bold',
          padding: '8px 12px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '16px',
          fontSize: '14px'
        }}
      >
        {data.alertBanner}
      </div>
      
      <header 
        data-eid="header" 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div 
            data-eid="current-temp" 
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              lineHeight: '1',
              marginBottom: '4px'
            }}
          >
            {data.currentTemp}
          </div>
          <div 
            data-eid="high-low" 
            style={{
              fontSize: '16px',
              opacity: 0.8
            }}
          >
            H: {data.highTemp} • L: {data.lowTemp}
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div 
            data-eid="weather-icon" 
            style={{
              fontSize: '32px',
              marginBottom: '4px',
              lineHeight: '1'
            }}
          >
            {data.weatherIcon}
          </div>
          <div 
            data-eid="city-name" 
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '2px'
            }}
          >
            {data.cityName}
          </div>
          <div 
            data-eid="condition-text" 
            style={{
              fontSize: '14px',
              opacity: 0.9
            }}
          >
            {data.conditionText}
          </div>
        </div>
      </header>
      
      <div 
        data-eid="stats-row" 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '16px'
        }}
      >
        <span 
          data-eid="stat-feels" 
          style={{
            fontSize: '14px',
            opacity: 0.9
          }}
        >
          Feels {data.feelsLike}
        </span>
        <span 
          data-eid="stat-humidity" 
          style={{
            fontSize: '14px',
            opacity: 0.9
          }}
        >
          {data.humidity}%
        </span>
        <span 
          data-eid="stat-wind" 
          style={{
            fontSize: '14px',
            opacity: 0.9
          }}
        >
          {data.windSpeed} mph
        </span>
      </div>
      
      <div 
        data-eid="forecast-grid" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '8px',
          flex: '1'
        }}
      >
        {data.hourlyForecasts.map((hour, index) => {
          const eid = `hour-${index}` as const;
          return (
            <div 
              key={index} 
              data-eid={eid} 
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '12px 8px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span 
                data-eid={`hour-${index}-time` as const} 
                style={{
                  fontSize: '12px',
                  opacity: 0.8
                }}
              >
                {hour.time}
              </span>
              <span 
                data-eid={`hour-${index}-icon` as const} 
                style={{
                  fontSize: '20px',
                  marginBottom: '4px'
                }}
              >
                {hour.icon}
              </span>
              <strong 
                data-eid={`hour-${index}-temp` as const} 
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {hour.temp}
              </strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}