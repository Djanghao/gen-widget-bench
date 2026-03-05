import React from 'react';
import data from './data.json';

const StockHeatmapWidget = () => {
  const { header, stocks } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#f1f5f9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '16px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <div data-eid="index-name" style={{ fontSize: '18px', fontWeight: '600' }}>
            {header.indexName}
          </div>
          <span data-eid="index-value" style={{ fontSize: '20px', fontWeight: '700' }}>
            {header.indexValue}
          </span>
          <span 
            data-eid="index-change" 
            style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: header.indexChange.startsWith('+') ? '#10b981' : '#ef4444'
            }}
          >
            {header.indexChange}
          </span>
        </div>
        <div data-eid="last-updated" style={{ fontSize: '14px', color: '#94a3b8' }}>
          {header.lastUpdated}
        </div>
      </div>

      {/* Heatmap Grid - 4x3 layout */}
      <div 
        data-eid="heatmap-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px'
        }}
      >
        {stocks.map((stock, index) => (
          <div 
            key={index}
            data-eid={`stock-cell-${index}`}
            style={{
              backgroundColor: stock.change >= 0 ? '#052e16' : '#7c3aed',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <div data-eid={`stock-ticker-${index}`} style={{ fontSize: '16px', fontWeight: '700' }}>
              {stock.ticker}
            </div>
            <div data-eid={`stock-company-${index}`} style={{ fontSize: '14px', color: '#cbd5e1' }}>
              {stock.company}
            </div>
            <div data-eid={`stock-price-${index}`} style={{ fontSize: '16px', fontWeight: '600' }}>
              ${stock.price.toFixed(2)}
            </div>
            <div 
              data-eid={`stock-change-${index}`} 
              style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: stock.change >= 0 ? '#10b981' : '#ef4444'
              }}
            >
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StockHeatmapWidget;