import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Sunrise, Sunset, Droplet, UV } from 'lucide-react';
import data from './data.json';

const WeatherWidget = () => {
  const { current, forecast, chartData, footer } = data;

  // Helper to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={20} />;
      case 'partly cloudy':
        return <Cloud size={20} />;
      case 'rainy':
        return <CloudRain size={20} />;
      case 'snowy':
        return <CloudSnow size={20} />;
      default:
        return <Cloud size={20} />;
    }
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a2a6c, #2c3e50)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '16px',
        width: '380px',
        height: '620px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px' }}>
        <div data-eid="city-name" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
          {current.city}
        </div>
        <div data-eid="current-temp" style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>
          {current.temp}°
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span data-eid="condition-icon">{getWeatherIcon(current.condition)}</span>
          <div data-eid="condition-text" style={{ fontSize: '16px', fontWeight: '500' }}>
            {current.condition}
          </div>
        </div>
      </header>

      {/* Temperature Chart */}
      <div data-eid="temp-chart" style={{ flex: '1', marginBottom: '24px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#34495e" />
            <XAxis dataKey="day" stroke="#ecf0f1" tick={{ fontSize: 12 }} />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#ecf0f1" tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2c3e50', 
                borderColor: '#34495e',
                borderRadius: '8px',
                color: 'white'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="high" 
              stroke="#3498db" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#3498db' }} 
              activeDot={{ r: 6, fill: '#2980b9' }} 
            />
            <Line 
              type="monotone" 
              dataKey="low" 
              stroke="#9b59b6" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#9b59b6' }} 
              activeDot={{ r: 6, fill: '#8e44ad' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Forecast Grid */}
      <div data-eid="day-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '8px',
        marginBottom: '24px'
      }}>
        {forecast.map((day, index) => (
          <div 
            key={index} 
            data-eid={`day-${index}`} 
            style={{ 
              textAlign: 'center',
              padding: '12px 4px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span data-eid={`day-${index}-name`} style={{ 
              display: 'block', 
              fontSize: '12px', 
              fontWeight: '600',
              marginBottom: '6px'
            }}>
              {day.day}
            </span>
            <span data-eid={`day-${index}-icon`} style={{ display: 'block', marginBottom: '4px' }}>
              {getWeatherIcon(day.condition)}
            </span>
            <span data-eid={`day-${index}-high`} style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              {day.high}°
            </span>
            {index === 0 && (
              <span data-eid="day-0-low" style={{ 
                display: 'block', 
                fontSize: '12px', 
                color: '#bdc3c7'
              }}>
                {day.low}°
              </span>
            )}
            {index === 0 && (
              <span data-eid="day-0-precip" style={{ 
                display: 'block', 
                fontSize: '12px', 
                color: '#bdc3c7'
              }}>
                {day.precip}%
              </span>
            )}
            {index === 1 && (
              <span data-eid="day-1-low" style={{ 
                display: 'block', 
                fontSize: '12px', 
                color: '#bdc3c7'
              }}>
                {day.low}°
              </span>
            )}
            {index === 2 && (
              <span data-eid="day-2-high" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                {day.high}°
              </span>
            )}
            {index === 3 && (
              <span data-eid="day-3-high" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                {day.high}°
              </span>
            )}
            {index === 4 && (
              <span data-eid="day-4-high" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                {day.high}°
              </span>
            )}
            {index === 5 && (
              <span data-eid="day-5-high" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                {day.high}°
              </span>
            )}
            {index === 6 && (
              <span data-eid="day-6-high" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                {day.high}°
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer Divider */}
      <div data-eid="footer-divider" style={{ 
        height: '1px', 
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: '16px'
      }} />

      {/* Footer */}
      <footer data-eid="footer" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '12px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sunrise size={14} />
          <span data-eid="sunrise-time">{footer.sunrise}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sunset size={14} />
          <span data-eid="sunset-time">{footer.sunset}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Droplet size={14} />
          <span data-eid="humidity-value">{footer.humidity}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <UV size={14} />
          <span data-eid="uv-index">{footer.uv}</span>
        </div>
      </footer>
    </section>
  );
};

export default WeatherWidget;