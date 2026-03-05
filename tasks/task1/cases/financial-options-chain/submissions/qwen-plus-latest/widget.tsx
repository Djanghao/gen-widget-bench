import React from 'react';
import data from './data.json';

const FinancialOptionsChain = () => {
  const { header, calls, puts, greeks, volume } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a202c, #2d3748)',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #4a5568' }}>
        <div data-eid="stock-symbol" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
          {header.symbol}
        </div>
        <div data-eid="stock-price" style={{ fontSize: '20px', fontWeight: 'bold', color: '#48bb78' }}>
          ${header.price}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span data-eid="expiry-badge" style={{ backgroundColor: '#2d3748', padding: '4px 12px', borderRadius: '4px', fontSize: '14px' }}>
            {header.expiry}
          </span>
          <span data-eid="type-badge" style={{ backgroundColor: '#4299e1', padding: '4px 12px', borderRadius: '4px', fontSize: '14px' }}>
            {header.type}
          </span>
        </div>
      </header>

      {/* Main options chain */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {/* Calls Section */}
        <div data-eid="calls-section" style={{ flex: '1', minWidth: '0' }}>
          <div data-eid="calls-title" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#4299e1', textTransform: 'uppercase', letterSpacing: '1px' }}>
            CALLS
          </div>
          <div data-eid="calls-header-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px', fontSize: '12px', color: '#a0aec0', textTransform: 'uppercase', fontWeight: '600' }}>
            <div>Bid</div>
            <div>Ask</div>
            <div>Last</div>
            <div>Vol</div>
            <div>OI</div>
            <div>IV</div>
            <div>Delta</div>
          </div>
          {calls.map((call, index) => (
            <div 
              key={`call-${index}`} 
              data-eid={`call-${index}`} 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '4px', 
                padding: '6px 0', 
                borderBottom: index === calls.length - 1 ? 'none' : '1px solid #2d3748',
                backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent'
              }}
            >
              <span data-eid={`call-${index}-bid`} style={{ color: call.isITM ? '#48bb78' : '#e2e8f0' }}>{call.bid}</span>
              <span data-eid={`call-${index}-ask`} style={{ color: call.isITM ? '#48bb78' : '#e2e8f0' }}>{call.ask}</span>
              <span data-eid={`call-${index}-last`} style={{ color: call.isITM ? '#48bb78' : '#e2e8f0' }}>{call.last}</span>
              <span data-eid={`call-${index}-vol`} style={{ color: call.isITM ? '#48bb78' : '#e2e8f0' }}>{call.vol}</span>
              <span data-eid={`call-${index}-oi`} style={{ color: call.isITM ? '#48bb78' : '#e2e8f0' }}>{call.oi}</span>
              <span data-eid={`call-${index}-iv`} style={{ color: call.isITM ? '#48bb78' : '#e2e8f0' }}>{call.iv}</span>
              <span data-eid={`call-${index}-delta`} style={{ color: call.isITM ? '#48bb78' : '#e2e8f0' }}>{call.delta}</span>
            </div>
          ))}
        </div>

        {/* Strike Divider */}
        <div data-eid="strike-divider" style={{ width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#a0aec0', marginBottom: '8px' }}>STRIKE</div>
          {calls.map((call, index) => (
            <div key={`strike-${index}`} style={{ fontSize: '16px', fontWeight: 'bold', color: '#e2e8f0', textAlign: 'center', marginBottom: '8px' }}>
              ${call.strike}
              {call.isATM && <span style={{ display: 'block', fontSize: '10px', color: '#4299e1', marginTop: '2px' }}>ATM</span>}
              {call.isITM && !call.isATM && <span style={{ display: 'block', fontSize: '10px', color: '#48bb78', marginTop: '2px' }}>ITM</span>}
              {!call.isITM && !call.isATM && <span style={{ display: 'block', fontSize: '10px', color: '#e53e3e', marginTop: '2px' }}>OTM</span>}
            </div>
          ))}
        </div>

        {/* Puts Section */}
        <div data-eid="puts-section" style={{ flex: '1', minWidth: '0' }}>
          <div data-eid="puts-title" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#e53e3e', textTransform: 'uppercase', letterSpacing: '1px' }}>
            PUTS
          </div>
          <div data-eid="puts-header-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px', fontSize: '12px', color: '#a0aec0', textTransform: 'uppercase', fontWeight: '600' }}>
            <div>Bid</div>
            <div>Ask</div>
            <div>Last</div>
            <div>Vol</div>
            <div>OI</div>
            <div>IV</div>
            <div>Delta</div>
          </div>
          {puts.map((put, index) => (
            <div 
              key={`put-${index}`} 
              data-eid={`put-${index}`} 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '4px', 
                padding: '6px 0', 
                borderBottom: index === puts.length - 1 ? 'none' : '1px solid #2d3748',
                backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent'
              }}
            >
              <span data-eid={`put-${index}-bid`} style={{ color: put.isITM ? '#e53e3e' : '#e2e8f0' }}>{put.bid}</span>
              <span data-eid={`put-${index}-ask`} style={{ color: put.isITM ? '#e53e3e' : '#e2e8f0' }}>{put.ask}</span>
              <span data-eid={`put-${index}-last`} style={{ color: put.isITM ? '#e53e3e' : '#e2e8f0' }}>{put.last}</span>
              <span data-eid={`put-${index}-vol`} style={{ color: put.isITM ? '#e53e3e' : '#e2e8f0' }}>{put.vol}</span>
              <span data-eid={`put-${index}-oi`} style={{ color: put.isITM ? '#e53e3e' : '#e2e8f0' }}>{put.oi}</span>
              <span data-eid={`put-${index}-iv`} style={{ color: put.isITM ? '#e53e3e' : '#e2e8f0' }}>{put.iv}</span>
              <span data-eid={`put-${index}-delta`} style={{ color: put.isITM ? '#e53e3e' : '#e2e8f0' }}>{put.delta}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Greeks Summary */}
      <div data-eid="greeks-summary" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #4a5568', fontSize: '14px', color: '#a0aec0' }}>
        <span data-eid="greeks-iv-label">Avg IV</span>
        <span data-eid="greeks-iv-value">{greeks.avgIV}</span>
        <span data-eid="greeks-pcr-label">Put/Call Ratio</span>
        <span data-eid="greeks-pcr-value">{greeks.pcr}</span>
      </div>

      {/* Volume Summary */}
      <div data-eid="volume-summary" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #4a5568', fontSize: '14px', color: '#a0aec0' }}>
        <div data-eid="total-volume">Total Volume: {volume.totalVolume}</div>
        <div data-eid="total-oi">Total OI: {volume.totalOI}</div>
      </div>
    </section>
  );
};

export default FinancialOptionsChain;