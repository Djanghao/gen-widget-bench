import React from 'react';
import data from './data.json';

const TradingOrderBook = () => {
  const { 
    header, spread, asks, bids, footer,
    asksData, bidsData
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ padding: '24px 32px', borderBottom: '1px solid #334155' }}>
        <div data-eid="pair-label" style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
          {header.pair}
        </div>
        <div data-eid="current-price" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
          ${header.price.toLocaleString()}
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span 
            data-eid="price-change-24h" 
            style={{ 
              fontSize: '14px', 
              fontWeight: 600,
              color: header.change24h >= 0 ? '#10b981' : '#ef4444',
              backgroundColor: header.change24h >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              padding: '4px 12px',
              borderRadius: '6px'
            }}
          >
            {header.change24h >= 0 ? '+' : ''}{header.change24h.toFixed(2)}%
          </span>
          <span data-eid="price-usd" style={{ fontSize: '14px', color: '#94a3b8' }}>
            ≈ ${header.usdEquivalent.toLocaleString()}
          </span>
        </div>
      </header>

      {/* Spread Indicator */}
      <div data-eid="spread-indicator" style={{ 
        padding: '16px 32px', 
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span data-eid="spread-label" style={{ fontSize: '14px', color: '#94a3b8' }}>
          Spread
        </span>
        <span data-eid="spread-value" style={{ fontSize: '16px', fontWeight: 600 }}>
          ${spread.value.toLocaleString()}
        </span>
        <span data-eid="spread-pct" style={{ fontSize: '14px', color: '#94a3b8' }}>
          {spread.pct}%
        </span>
      </div>

      {/* Order Book Content */}
      <div style={{ display: 'flex', height: '500px' }}>
        {/* Asks Section */}
        <div data-eid="asks-section" style={{ 
          flex: 1, 
          backgroundColor: '#0f172a',
          borderRight: '1px solid #334155',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div data-eid="asks-title" style={{ 
            padding: '12px 24px', 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#94a3b8',
            borderBottom: '1px solid #334155'
          }}>
            Asks
          </div>
          <div data-eid="asks-col-header" style={{ 
            padding: '12px 24px', 
            fontSize: '12px', 
            fontWeight: 500, 
            color: '#94a3b8',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '8px'
          }}>
            <div>Price</div>
            <div>Amount</div>
            <div>Total</div>
          </div>
          
          {asksData.map((ask, index) => (
            <div 
              key={`ask-${index}`} 
              data-eid={`ask-${index}`} 
              style={{ 
                padding: '10px 24px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                fontSize: '14px',
                color: '#e2e8f0',
                backgroundColor: index % 2 === 0 ? '#1e293b' : 'transparent'
              }}
            >
              <span data-eid={`ask-${index}-price`} style={{ fontWeight: 500 }}>
                ${ask.price.toLocaleString()}
              </span>
              <span data-eid={`ask-${index}-amount`} style={{ color: '#f87171' }}>
                {ask.amount.toFixed(4)} BTC
              </span>
              <span data-eid={`ask-${index}-total`} style={{ fontWeight: 500 }}>
                ${ask.total.toLocaleString()}
              </span>
              <div 
                data-eid={`ask-${index}-bar`} 
                style={{ 
                  gridColumn: '1 / -1',
                  height: '4px',
                  backgroundColor: '#f87171',
                  borderRadius: '2px',
                  marginTop: '6px',
                  width: `${Math.min(100, (ask.total / asks.maxTotal) * 100)}%`,
                  marginLeft: '0'
                }}
              />
            </div>
          ))}
        </div>

        {/* Bids Section */}
        <div data-eid="bids-section" style={{ 
          flex: 1, 
          backgroundColor: '#0f172a',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div data-eid="bids-title" style={{ 
            padding: '12px 24px', 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#94a3b8',
            borderBottom: '1px solid #334155'
          }}>
            Bids
          </div>
          <div data-eid="bids-col-header" style={{ 
            padding: '12px 24px', 
            fontSize: '12px', 
            fontWeight: 500, 
            color: '#94a3b8',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '8px'
          }}>
            <div>Price</div>
            <div>Amount</div>
            <div>Total</div>
          </div>
          
          {bidsData.map((bid, index) => (
            <div 
              key={`bid-${index}`} 
              data-eid={`bid-${index}`} 
              style={{ 
                padding: '10px 24px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                fontSize: '14px',
                color: '#e2e8f0',
                backgroundColor: index % 2 === 0 ? '#1e293b' : 'transparent'
              }}
            >
              <span data-eid={`bid-${index}-price`} style={{ fontWeight: 500 }}>
                ${bid.price.toLocaleString()}
              </span>
              <span data-eid={`bid-${index}-amount`} style={{ color: '#4ade80' }}>
                {bid.amount.toFixed(4)} BTC
              </span>
              <span data-eid={`bid-${index}-total`} style={{ fontWeight: 500 }}>
                ${bid.total.toLocaleString()}
              </span>
              <div 
                data-eid={`bid-${index}-bar`} 
                style={{ 
                  gridColumn: '1 / -1',
                  height: '4px',
                  backgroundColor: '#4ade80',
                  borderRadius: '2px',
                  marginTop: '6px',
                  width: `${Math.min(100, (bid.total / bids.maxTotal) * 100)}%`,
                  marginLeft: '0'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div data-eid="footer" style={{ 
        padding: '16px 32px', 
        backgroundColor: '#1e293b',
        borderTop: '1px solid #334155',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        fontSize: '14px',
        color: '#94a3b8'
      }}>
        <div>
          <span data-eid="footer-volume-label" style={{ fontWeight: 500 }}>24h Volume</span>
          <span data-eid="footer-volume-value" style={{ display: 'block', marginTop: '4px', fontSize: '16px', fontWeight: 600, color: '#e2e8f0' }}>
            ${footer.volume.toLocaleString()}
          </span>
        </div>
        <div>
          <span data-eid="footer-high-label" style={{ fontWeight: 500 }}>24h High</span>
          <span data-eid="footer-high-value" style={{ display: 'block', marginTop: '4px', fontSize: '16px', fontWeight: 600, color: '#e2e8f0' }}>
            ${footer.high.toLocaleString()}
          </span>
        </div>
        <div>
          <span data-eid="footer-low-label" style={{ fontWeight: 500 }}>24h Low</span>
          <span data-eid="footer-low-value" style={{ display: 'block', marginTop: '4px', fontSize: '16px', fontWeight: 600, color: '#e2e8f0' }}>
            ${footer.low.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
};

export default TradingOrderBook;