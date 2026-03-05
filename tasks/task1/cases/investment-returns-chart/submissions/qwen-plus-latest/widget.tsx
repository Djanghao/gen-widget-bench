import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import data from './data.json';

const InvestmentReturnsChart = () => {
  const { portfolioName, dateRange, chartData, legend, metrics } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ marginBottom: '24px' }}>
        <div data-eid="portfolio-name" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.2' }}>
          {portfolioName}
        </div>
        <div data-eid="date-range" style={{ fontSize: '14px', color: '#B0B0B0', marginTop: '4px' }}>
          {dateRange}
        </div>
      </div>

      {/* Chart Section */}
      <div data-eid="chart-section" style={{ marginBottom: '32px' }}>
        <div data-eid="line-chart" style={{ height: '400px', marginBottom: '24px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="month" 
                stroke="#888" 
                fontSize={12} 
                tick={{ fill: '#888' }} 
                axisLine={{ stroke: '#333' }} 
                tickLine={{ stroke: '#333' }}
              />
              <YAxis 
                stroke="#888" 
                fontSize={12} 
                tick={{ fill: '#888' }} 
                axisLine={{ stroke: '#333' }} 
                tickLine={{ stroke: '#333' }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  borderColor: '#333', 
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }} 
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#B0B0B0' }}
              />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                name={legend.portfolio.label} 
                stroke={legend.portfolio.color} 
                strokeWidth={2} 
                dot={{ r: 4, fill: legend.portfolio.color }} 
                activeDot={{ r: 6, fill: legend.portfolio.color, stroke: '#333', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="sp500" 
                name={legend.sp500.label} 
                stroke={legend.sp500.color} 
                strokeWidth={2} 
                dot={{ r: 4, fill: legend.sp500.color }} 
                activeDot={{ r: 6, fill: legend.sp500.color, stroke: '#333', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="bonds" 
                name={legend.bonds.label} 
                stroke={legend.bonds.color} 
                strokeWidth={2} 
                dot={{ r: 4, fill: legend.bonds.color }} 
                activeDot={{ r: 6, fill: legend.bonds.color, stroke: '#333', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div data-eid="legend" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <span data-eid="legend-portfolio" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: legend.portfolio.color, borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{legend.portfolio.label}</span>
          </span>
          <span data-eid="legend-sp500" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: legend.sp500.color, borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{legend.sp500.label}</span>
          </span>
          <span data-eid="legend-bonds" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: legend.bonds.color, borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{legend.bonds.label}</span>
          </span>
        </div>
      </div>

      {/* Summary Section */}
      <div data-eid="summary-section">
        <div data-eid="summary-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Performance Summary
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {/* Total Return */}
          <div data-eid="metric-row-0" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
            <span data-eid="metric-label-0" style={{ fontSize: '14px', color: '#B0B0B0' }}>Total Return</span>
            <span data-eid="metric-value-0" style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {metrics.totalReturn.value}
              {metrics.totalReturn.change > 0 ? <TrendingUp size={16} color="#4CAF50" /> : <TrendingDown size={16} color="#F44336" />}
            </span>
          </div>
          
          {/* Annualized Return */}
          <div data-eid="metric-row-1" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
            <span data-eid="metric-label-1" style={{ fontSize: '14px', color: '#B0B0B0' }}>Annualized Return</span>
            <span data-eid="metric-value-1" style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {metrics.annualizedReturn.value}
              {metrics.annualizedReturn.change > 0 ? <TrendingUp size={16} color="#4CAF50" /> : <TrendingDown size={16} color="#F44336" />}
            </span>
          </div>
          
          {/* Sharpe Ratio */}
          <div data-eid="metric-row-2" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
            <span data-eid="metric-label-2" style={{ fontSize: '14px', color: '#B0B0B0' }}>Sharpe Ratio</span>
            <span data-eid="metric-value-2" style={{ fontSize: '16px', fontWeight: '600' }}>
              {metrics.sharpeRatio.value}
            </span>
          </div>
          
          {/* Max Drawdown */}
          <div data-eid="metric-row-3" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
            <span data-eid="metric-label-3" style={{ fontSize: '14px', color: '#B0B0B0' }}>Max Drawdown</span>
            <span data-eid="metric-value-3" style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {metrics.maxDrawdown.value}
              <ArrowDownRight size={16} color="#F44336" />
            </span>
          </div>
          
          {/* Volatility */}
          <div data-eid="metric-row-4" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
            <span data-eid="metric-label-4" style={{ fontSize: '14px', color: '#B0B0B0' }}>Volatility</span>
            <span data-eid="metric-value-4" style={{ fontSize: '16px', fontWeight: '600' }}>
              {metrics.volatility.value}
            </span>
          </div>
          
          {/* Beta */}
          <div data-eid="metric-row-5" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
            <span data-eid="metric-label-5" style={{ fontSize: '14px', color: '#B0B0B0' }}>Beta</span>
            <span data-eid="metric-value-5" style={{ fontSize: '16px', fontWeight: '600' }}>
              {metrics.beta.value}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentReturnsChart;