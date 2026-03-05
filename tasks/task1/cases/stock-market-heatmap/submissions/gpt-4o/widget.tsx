import React from 'react';
import data from './data.json';

const Widget: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#141620',
        borderRadius: '16px',
        padding: '20px',
        width: '340px',
        color: '#ffffff',
      }}
    >
      <div data-eid="header" style={{ marginBottom: '20px' }}>
        <div data-eid="index-name" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '14px', color: '#ffffff' }}>
          <span role="img" aria-label="chart" style={{ marginRight: '8px' }}>📈</span> S&P 500
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span
            data-eid="index-value"
            style={{ fontSize: '32px', fontWeight: 'bold', marginRight: '10px' }}
          >
            {data.indexValue}
          </span>
          <span
            data-eid="index-change"
            style={{ fontSize: '16px', color: '#00c966' }}
          >
            {data.indexChange}
          </span>
        </div>
        <div
          data-eid="last-updated"
          style={{ fontSize: '12px', color: '#777e90' }}
        >
          {data.lastUpdated}
        </div>
      </div>
      <div
        data-eid="heatmap-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
        }}
      >
        {data.stocks.map((stock, index) => (
          <div
            key={index}
            data-eid={`stock-cell-${index}`}
            style={{
              backgroundColor: stock.backgroundColor,
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              color: '#ffffff',
            }}
          >
            <div
              data-eid={`stock-ticker-${index}`}
              style={{ fontWeight: 'bold' }}
            >
              {stock.ticker}
            </div>
            <div
              data-eid={`stock-company-${index}`}
              style={{ fontSize: '10px', marginBottom: '8px' }}
            >
              {stock.company}
            </div>
            <div
              data-eid={`stock-price-${index}`}
              style={{ marginBottom: '4px', fontSize: '14px' }}
            >
              {stock.price}
            </div>
            <div
              data-eid={`stock-change-${index}`}
              style={{ fontSize: '12px', color: stock.changeColor }}
            >
              {stock.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;