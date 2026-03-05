import React from 'react';
import { Moon } from 'lucide-react';
import data from './data.json';

const WeatherCityGlanceWidget: React.FC = () => {
  const {
    alertMessage,
    currentTemp,
    highTemp,
    lowTemp,
    cityName,
    conditionText,
    feelsLikeTemp,
    humidity,
    windSpeed,
    hourlyForecast,
  } = data;

  // Helper to render Lucide icons based on a string name
  const getIconComponent = (iconName: string, size: number, color: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <section
      data-eid="root"
      style={{
        width: '380px',
        padding: '20px',
        borderRadius: '25px',
        background: 'linear-gradient(135deg, #1a2c4e 0%, #2e4a7a 100%)', // Dark blue gradient
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px', // Spacing between major sections
        boxSizing: 'border-box',
      }}
    >
      <div
        data-eid="alert-banner"
        style={{
          background: 'rgba(255, 193, 7, 0.15)', // Amber tinted background
          border: '1px solid rgba(255, 193, 7, 0.3)', // Amber border
          borderRadius: '15px',
          padding: '8px 12px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#FFCC80', // Faded yellow text
          lineHeight: '1.2',
        }}
      >
        {alertMessage}
      </div>

      <div
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            data-eid="current-temp"
            style={{
              fontSize: '48px',
              fontWeight: '600',
              lineHeight: '1',
            }}
          >
            {currentTemp}
          </div>
          <div
            data-eid="high-low"
            style={{
              fontSize: '14px',
              color: '#B0C4DE', // Light gray for secondary text
              marginTop: '5px',
            }}
          >
            H:{highTemp} L:{lowTemp}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div data-eid="weather-icon" style={{ marginBottom: '5px' }}>
            {getIconComponent(hourlyForecast[0].icon, 24, 'white')} {/* Using first forecast icon for general weather icon */}
          </div>
          <div
            data-eid="city-name"
            style={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '1.2',
            }}
          >
            {cityName}
          </div>
          <div
            data-eid="condition-text"
            style={{
              fontSize: '14px',
              color: '#B0C4DE', // Light gray for secondary text
              marginTop: '2px',
            }}
          >
            {conditionText}
          </div>
        </div>
      </div>

      <div
        data-eid="stats-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#B0C4DE', // Light gray for secondary text
          fontSize: '14px',
          padding: '5px 0',
        }}
      >
        <span data-eid="stat-feels">Feels {feelsLikeTemp}</span>
        <span data-eid="stat-humidity">Humidity {humidity}</span>
        <span data-eid="stat-wind">Wind {windSpeed}</span>
      </div>

      <div
        data-eid="forecast-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '10px',
        }}
      >
        {hourlyForecast.map((hour, index) => (
          <div
            key={index}
            data-eid={`hour-${index}`} // Assigns hour-0, hour-1, ..., hour-5
            style={{
              background: 'rgba(255, 255, 255, 0.08)', // Slightly transparent darker background
              borderRadius: '10px',
              padding: '10px 5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              minWidth: '50px',
            }}
          >
            {/* Only children of the first hourly card (index 0) get specific data-eid */}
            <span
              {...(index === 0 && { 'data-eid': 'hour-0-time' })}
              style={{ fontSize: '12px', color: '#B0C4DE', marginBottom: '5px' }}
            >
              {hour.time}
            </span>
            <span
              {...(index === 0 && { 'data-eid': 'hour-0-icon' })}
              style={{ marginBottom: '5px' }}
            >
              {getIconComponent(hour.icon, 20, 'white')}
            </span>
            <strong
              {...(index === 0 && { 'data-eid': 'hour-0-temp' })}
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              {hour.temp}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherCityGlanceWidget;