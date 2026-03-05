import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import data from './data.json';

const InvestmentReturnsChart = () => {
  return (
    <section data-eid="root" style={{ backgroundColor: '#101935', padding: '20px', borderRadius: '12px', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <div data-eid="header" style={{ marginBottom: '20px' }}>
        <div data-eid="portfolio-name" style={{ fontSize: '20px', fontWeight: 'bold' }}>📈 Growth Portfolio Alpha</div>
        <div data-eid="date-range" style={{ fontSize: '14px', color: '#A3A3A3' }}>Jan 2024 - Dec 2024</div>
      </div>
      <div data-eid="chart-section" style={{ marginBottom: '20px' }}>
        <div data-eid="line-chart">
          <LineChart width={300} height={200} data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#A3A3A3' }} />
            <YAxis tick={{ fill: '#A3A3A3' }} />
            <Tooltip />
            <Legend />
            <Line dataKey="Portfolio" stroke="#4A90E2" dot={false} data-eid="legend-portfolio" />
            <Line dataKey="S&P 500" stroke="#7ED321" dot={false} data-eid="legend-sp500" />
            <Line dataKey="Bonds" stroke="#F5A623" dot={false} data-eid="legend-bonds" />
          </LineChart>
        </div>
      </div>
      <div data-eid="legend" style={{ display: 'flex', justifyContent: 'center', fontSize: '12px', marginBottom: '20px' }}>
        <span data-eid="legend-portfolio" style={{ color: '#4A90E2', marginRight: '15px' }}>Portfolio</span>
        <span data-eid="legend-sp500" style={{ color: '#7ED321', marginRight: '15px' }}>S&P 500</span>
        <span data-eid="legend-bonds" style={{ color: '#F5A623' }}>Bonds</span>
      </div>
      <div data-eid="summary-section">
        <div data-eid="summary-title" style={{ fontSize: '14px', letterSpacing: '1px', marginBottom: '10px', color: '#A3A3A3' }}>PERFORMANCE SUMMARY</div>
        {data.summaryMetrics.map((metric, index) => (
          <div key={index} data-eid={`metric-row-${index}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1F2A48', fontSize: '14px' }}>
            <span data-eid={`metric-label-${index}`} style={{ color: '#A3A3A3' }}>{metric.label}</span>
            <span data-eid={`metric-value-${index}`} style={{ color: metric.value[0] === '+' ? '#7ED321' : metric.value[0] === '-' ? '#F5A623' : '#FFFFFF' }}>{metric.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InvestmentReturnsChart;