import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import data from './data.json';

const CryptoPortfolioTracker: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#1c1e26',
        borderRadius: '12px',
        padding: '20px',
        color: 'white',
      }}
    >
      <div data-eid="header" style={{ marginBottom: '20px' }}>
        <div data-eid="portfolio-title" style={{ fontSize: '12px', marginBottom: '4px' }}>
          MY CRYPTO PORTFOLIO
        </div>
        <div data-eid="total-value" style={{ fontSize: '32px', fontWeight: 'bold' }}>${data.totalValue}</div>
        <div data-eid="total-change" style={{ fontSize: '14px', color: '#4caf50', marginTop: '4px' }}>
          &#x2191; {data.totalChange.percentage}% (${data.totalChange.amount}) 24h
        </div>
      </div>
      <div data-eid="chart-section" style={{ marginBottom: '20px' }}>
        <div data-eid="chart-label" style={{ fontSize: '12px', marginBottom: '8px' }}>
          7-Day Performance
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={data.chartData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#4caf50" fill="#4caf50" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div data-eid="holdings-header" style={{ fontSize: '12px', marginBottom: '10px' }}>
        HOLDINGS
      </div>
      {data.coins.map((coin, index) => (
        <div
          key={index}
          data-eid={`coin-row-${index}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#282c34',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              data-eid={`coin-icon-${index}`}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: coin.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
              }}
            ></div>
            <div>
              <div data-eid={`coin-name-${index}`} style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {coin.name}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>{coin.symbol}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div data-eid={`coin-price-${index}`} style={{ fontSize: '14px' }}>
              ${coin.price.toLocaleString()}
            </div>
            <div
              data-eid={`coin-change-${index}`}
              style={{ fontSize: '12px', color: coin.change > 0 ? '#4caf50' : '#f44336' }}
            >
              {coin.change > 0 ? '+' : ''}
              {coin.change}%
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div data-eid={`coin-holdings-${index}`} style={{ fontSize: '14px' }}>
              ${coin.holdingsValue.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{coin.holdings} {coin.symbol}</div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CryptoPortfolioTracker;