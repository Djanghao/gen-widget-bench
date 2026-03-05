import React from 'react';
import data from './data.json';

const WeatherCityGlance = () => (
  <section
    data-eid="root"
    style={{
      width: '350px',
      borderRadius: '15px',
      background: 'linear-gradient(135deg, #2F2C5A 0%, #1D1D3F 100%)',
      color: 'white',
      padding: '15px',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    <div
      data-eid="alert-banner"
      style={{
        backgroundColor: '#C89B5A',
        borderRadius: '10px',
        padding: '5px 10px',
        marginBottom: '10px',
        textAlign: 'center',
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
        marginBottom: '10px',
      }}
    >
      <div>
        <div
          data-eid="current-temp"
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          {data.currentTemp}
        </div>
        <div data-eid="high-low" style={{ fontSize: '16px', marginTop: '-8px' }}>
          {data.highLow}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div data-eid="weather-icon" style={{ fontSize: '24px' }}>
          🌤
        </div>
        <div data-eid="city-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {data.cityName}
        </div>
        <div data-eid="condition-text" style={{ fontSize: '16px' }}>
          {data.conditionText}
        </div>
      </div>
    </header>
    <div
      data-eid="stats-row"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        marginBottom: '15px',
      }}
    >
      <span data-eid="stat-feels">{`Feels ${data.feelsLike}`}</span>
      <span data-eid="stat-humidity">{`Humidity ${data.humidity}`}</span>
      <span data-eid="stat-wind">{`Wind ${data.wind}`}</span>
    </div>
    <div data-eid="forecast-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px' }}>
      {data.forecast.map((hour, index) => (
        <div
          data-eid={`hour-${index}`}
          key={index}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            textAlign: 'center',
            padding: '5px 0',
          }}
        >
          <span data-eid={`hour-${index}-time`} style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>
            {hour.time}
          </span>
          <span data-eid={`hour-${index}-icon`} style={{ display: 'block', fontSize: '18px', marginBottom: '5px' }}>
            🌤
          </span>
          <strong data-eid={`hour-${index}-temp`} style={{ display: 'block', fontSize: '16px' }}>
            {hour.temp}
          </strong>
        </div>
      ))}
    </div>
  </section>
);

export default WeatherCityGlance;