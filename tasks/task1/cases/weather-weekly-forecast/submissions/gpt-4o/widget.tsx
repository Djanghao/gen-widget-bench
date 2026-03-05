import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Cloud, Umbrella, Sun, CloudRain, Calendar, Droplet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import data from './data.json';

const WeatherWidget = () => (
  <section data-eid="root" style={{ background: 'linear-gradient(to bottom, #23395B, #1D2951)', padding: '20px', borderRadius: '10px', color: 'white', fontFamily: 'Arial, sans-serif', width: '300px' }}>
    <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div data-eid="city-name" style={{ fontSize: '18px' }}>Portland, OR</div>
        <div data-eid="current-temp" style={{ fontSize: '48px', fontWeight: 'bold' }}>58°F</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span data-eid="condition-icon" style={{ marginRight: '5px' }}><Cloud /></span>
        <div data-eid="condition-text">Partly Cloudy</div>
      </div>
    </header>

    <div data-eid="temp-chart" style={{ margin: '20px 0' }}>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data.weeklyTemps}>
          <XAxis dataKey="day" />
          <YAxis domain={[36, 72]} hide />
          <Tooltip />
          <Line type="monotone" dataKey="high" stroke="#FFA500" />
          <Line type="monotone" dataKey="low" stroke="#00BFFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div data-eid="day-grid" style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
      {data.dailyForecast.map((day, index) => (
        <div key={index} data-eid={`day-${index}`}>
          <span data-eid={`day-${index}-name`} style={{ display: 'block', fontWeight: 'bold' }}>{day.name.toUpperCase()}</span>
          <span data-eid={`day-${index}-icon`}><Sun /></span>
          <span data-eid={`day-${index}-high`} style={{ display: 'block' }}>{day.high}°</span>
          <span data-eid={`day-${index}-low`} style={{ display: 'block' }}>{day.low}°</span>
          {day.precip && <span data-eid={`day-${index}-precip`} style={{ display: 'block', color: '#00BFFF' }}>{day.precip}%</span>}
        </div>
      ))}
    </div>

    <div data-eid="footer-divider" style={{ height: '1px', background: '#607D8B', margin: '20px 0' }}></div>

    <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ textAlign: 'center' }}>
        <ArrowUpRight />
        <span>Sunrise</span>
        <span data-eid="sunrise-time" style={{ display: 'block' }}>{data.sunrise}</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ArrowDownRight />
        <span>Sunset</span>
        <span data-eid="sunset-time" style={{ display: 'block' }}>{data.sunset}</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Droplet />
        <span>Humidity</span>
        <span data-eid="humidity-value" style={{ display: 'block' }}>{data.humidity}</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Calendar />
        <span>UV Index</span>
        <span data-eid="uv-index" style={{ display: 'block' }}>{data.uvIndex}</span>
      </div>
    </footer>
  </section>
);

export default WeatherWidget;