import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import data from './data.json';

const CryptoPortfolioWidget: React.FC = () => {
  const chartHeight = 100; // Adjusted for target image proportions
  const chartWidth = 300; // Adjusted for target image proportions

  const renderGradientColor = data.totalChange.isPositive ? '#2ECC71' : '#E74C3C';

  return (
    <section
      data-eid="root"
      style={{
        width: '350px',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#1A1B23',
        borderRadius: '16px',
        padding: '24px',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        data-eid="header"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div
          data-eid="portfolio-title"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#A0A1A7',
            textTransform: 'uppercase',
          }}
        >
          MY CRYPTO PORTFOLIO
        </div>
        <div
          data-eid="total-value"
          style={{
            fontSize: '32px',
            fontWeight: 700,
          }}
        >
          {data.totalValue}
        </div>
        <div
          data-eid="total-change"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: 500,
            color: data.totalChange.isPositive ? '#2ECC71' : '#E74C3C',
          }}
        >
          {data.totalChange.isPositive ? (
            <TrendingUp size={16} style={{ marginRight: '4px' }} />
          ) : (
            <TrendingDown size={16} style={{ marginRight: '4px' }} />
          )}
          {data.totalChange.percentage} ({data.totalChange.amount}) 24h
        </div>
      </div>

      <div data-eid="chart-section" style={{}}>
        <div
          data-eid="chart-label"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#A0A1A7',
            marginBottom: '12px',
          }}
        >
          7-Day Performance
        </div>
        <div
          data-eid="area-chart"
          style={{ width: '100%', height: chartHeight }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={renderGradientColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={renderGradientColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A0A1A7', fontSize: 12 }}
                interval={0}
                style={{
                  transform: 'translateY(8px)', // Push XAxis labels down slightly
                }}
              />
              <YAxis hide={true} domain={['dataMin - 1000', 'dataMax + 1000']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#333',
                  borderColor: '#555',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={renderGradientColor}
                strokeWidth={2}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        data-eid="holdings-header"
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#A0A1A7',
          textTransform: 'uppercase',
          marginTop: '8px',
        }}
      >
        HOLDINGS
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {data.holdings.map((coin, index) => (
          <div
            data-eid={`coin-row-${index}`}
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#22242F',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div
                data-eid={`coin-icon-${index}`}
                style={{
                  backgroundColor: coin.iconColor,
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0,
                }}
              >
                <Wallet size={20} color="#FFFFFF" />
              </div>
              <div
                data-eid={`coin-name-${index}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 600 }}>{coin.name}</div>
                <div style={{ fontSize: '12px', color: '#A0A1A7' }}>{coin.symbol}</div>
              </div>
            </div>

            <div
              data-eid={`coin-price-${index}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                marginRight: '20px',
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 500 }}>{coin.price}</div>
              <div
                style={{
                  fontSize: '12px',
                  color: coin.isPositive ? '#2ECC71' : '#E74C3C',
                }}
              >
                {coin.change}
              </div>
            </div>

            <div
              data-eid={`coin-holdings-${index}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600 }}>
                {coin.holdingsValue}
              </div>
              <div style={{ fontSize: '12px', color: '#A0A1A7' }}>
                {coin.holdingsAmount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CryptoPortfolioWidget;