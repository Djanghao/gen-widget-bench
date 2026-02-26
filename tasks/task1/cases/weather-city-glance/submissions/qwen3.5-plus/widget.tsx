import React from 'react';
import { Moon, Sun, Cloud, Fog, Wind, Droplets } from 'lucide-react';
import data from './data.json';

export default function WeatherWidget() {
  return (
    <section
      data-eid="root"
      style={{
        width: '340px',
        background: 'linear-gradient(180deg, #2d4a7c 0%, #1a2a4a 100%)',
        borderRadius: '20px',
        padding: '16px',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Alert Banner */}
      <div
        data-eid="alert-banner"
        style={{
          background: 'linear-gradient(90deg, rgba(255,180,60,0.3) 0%, rgba(255,180,60,0.1) 100%)',
          borderRadius: '10px',
          padding: '8px 12px',
          marginBottom: '12px',
          fontSize: '13px',
          color: '#ffd699',
          border: '1px solid rgba(255,180,60,0.2)',
        }}
      >
        {data.alert}
      </div>

      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '12px',
        }}
      >
        {/* Left: Temperature */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            data-eid="current-temp"
            style={{
              fontSize: '42px',
              fontWeight: '700',
              lineHeight: '1',
            }}
          >
            {data.currentTemp}
          </div>
          <div
            data-eid="high-low"
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: '500',
            }}
          >
            H:{data.highTemp} L:{data.lowTemp}
          </div>
        </div>

        {/* Right: City & Condition */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div data-eid="weather-icon" style={{ color: 'white', marginBottom: '2px' }}>
            <Moon size={24} fill="white" />
          </div>
          <div
            data-eid="city-name"
            style={{
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            {data.city}
          </div>
          <div
            data-eid="condition-text"
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            {data.condition}
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div
        data-eid="stats-row"
        style={{
          display: 'flex',
          gap: '16px',
          padding: '12px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '12px',
        }}
      >
        <span
          data-eid="stat-feels"
          style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}
        >
          Feels {data.feelsLike}
        </span>
        <span
          data-eid="stat-humidity"
          style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}
        >
          Humidity {data.humidity}
        </span>
        <span
          data-eid="stat-wind"
          style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}
        >
          Wind {data.wind}
        </span>
      </div>

      {/* Forecast Grid */}
      <div
        data-eid="forecast-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '8px',
        }}
      >
        {data.hourly.map((hour, index) => (
          <div
            key={index}
            data-eid={`hour-${index}`}
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '10px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              data-eid={`hour-${index}-time`}
              style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}
            >
              {hour.time}
            </span>
            <span data-eid={`hour-${index}-icon`} style={{ color: 'white' }}>
              <Moon size={18} fill="white" />
            </span>
            <strong
              data-eid={`hour-${index}-temp`}
              style={{ fontSize: '14px', fontWeight: '600' }}
            >
              {hour.temp}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
