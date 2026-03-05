import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendUp } from 'lucide-react';
import data from './data.json';

// Custom Tooltip component to match target's appearance
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#374151', // Dark gray background
          padding: '10px',
          border: '1px solid #4B5563', // Slightly lighter border
          borderRadius: '8px',
          color: '#E5E7EB', // Light text
          fontSize: '12px'
        }}
      >
        <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color, marginBottom: '2px' }}>
            {entry.name}: <span style={{ float: 'right', marginLeft: '10px' }}>{entry.value.toFixed(2)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Legend component to match target's appearance and EIDs
const CustomLegend = ({ payload }: any) => {
  return (
    <div data-eid="legend" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
      {payload.map((entry: any, index: number) => {
        const eidMap: { [key: string]: string } = {
          "Portfolio": "legend-portfolio",
          "S&P 500": "legend-sp500",
          "Bonds": "legend-bonds"
        };
        const eid = eidMap[entry.value] || `legend-item-${index}`;

        return (
          <span
            key={`legend-${index}`}
            data-eid={eid}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              color: '#9CA3AF' // Gray text color
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: entry.color,
                marginRight: '6px'
              }}
            ></span>
            {entry.value}
          </span>
        );
      })}
    </div>
  );
};

const InvestmentReturnsChart: React.FC = () => {
  const lineColors = {
    portfolio: '#818CF8', // Purple from target
    sp500: '#34D399',     // Green from target
    bonds: '#F59E0B'      // Orange from target
  };

  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#1A1B29', // Dark background color
        borderRadius: '16px',
        padding: '25px',
        width: '380px',
        fontFamily: 'Inter, sans-serif', // Using a common sans-serif font
        color: '#E5E7EB', // Light text for default elements
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          paddingLeft: '5px',
          paddingRight: '5px'
        }}
      >
        <TrendUp size={20} style={{ color: '#818CF8', marginRight: '10px' }} />
        <div data-eid="portfolio-name" style={{ fontSize: '18px', fontWeight: '600' }}>
          {data.header.portfolioName}
        </div>
        <div
          data-eid="date-range"
          style={{ fontSize: '13px', color: '#9CA3AF', marginLeft: 'auto' }} // Gray color
        >
          {data.header.dateRange}
        </div>
      </div>

      <div data-eid="chart-section" style={{ marginBottom: '20px' }}>
        <div data-eid="line-chart" style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }} // Adjust left margin for Y-axis numbers
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} /> {/* Darker, thinner grid lines */}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '10px' }}
                stroke="#9CA3AF" // Gray color for axis labels
                interval={0} // Ensure all month labels are shown
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                domain={[96, 128]} // Explicit domain to match target's Y-axis range (96, 104, 112, 120, 128)
                ticks={[96, 104, 112, 120, 128]}
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '10px' }}
                stroke="#9CA3AF" // Gray color for axis labels
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Line type="monotone" dataKey="portfolio" name="Portfolio" stroke={lineColors.portfolio} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sp500" name="S&P 500" stroke={lineColors.sp500} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="bonds" name="Bonds" stroke={lineColors.bonds} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="summary-section">
        <div
          data-eid="summary-title"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#9CA3AF', // Gray color
            marginBottom: '15px',
            textTransform: 'uppercase',
            paddingLeft: '5px'
          }}
        >
          PERFORMANCE SUMMARY
        </div>
        {data.summaryMetrics.map((metric, index) => (
          <div
            key={index}
            data-eid={`metric-row-${index}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#2B2D42', // Slightly lighter dark background for rows
              borderRadius: '10px',
              padding: '12px 15px',
              marginBottom: '10px',
              fontSize: '14px'
            }}
          >
            <span data-eid={`metric-label-${index}`} style={{ color: '#E5E7EB' }}>
              {metric.label}
            </span>
            <span data-eid={`metric-value-${index}`} style={{ color: metric.color, fontWeight: '600' }}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentReturnsChart;