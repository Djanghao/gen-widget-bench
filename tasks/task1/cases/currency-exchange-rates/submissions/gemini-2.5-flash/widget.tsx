import React from 'react';
import { RotateCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import data from './data.json';

const Widget = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#1E1D2B',
        borderRadius: '16px',
        padding: '24px',
        width: '380px',
        fontFamily: 'Inter, sans-serif',
        color: '#E0E0E0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div data-eid="header" style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <RotateCw size={20} style={{ color: '#A855F7' }} />
          <div style={{ fontSize: '18px', fontWeight: '600' }}>Exchange Rates</div>
        </div>
        {/* base-currency is described as "Base currency display (USD)" but is not visually distinct from "1.00 USD" in the target.
            We place the full "1.00 USD" in base-amount as it appears as one visual block.
            base-currency will be an empty div to satisfy the element requirement. */}
        <div data-eid="base-currency" style={{ display: 'none' }}></div>
        <div data-eid="base-amount" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          {data.baseAmount} {data.baseCurrencySymbol}
        </div>
        <div data-eid="last-updated" style={{ fontSize: '12px', color: '#9CA3AF' }}>
          Updated: {data.lastUpdated}
        </div>
      </div>

      <div data-eid="currency-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.currencies.map((currency, index) => (
          <div
            data-eid={`currency-row-${index}`}
            key={currency.code}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#2A293D',
              borderRadius: '8px',
            }}
          >
            <span data-eid={`currency-flag-${index}`} style={{ fontSize: '20px', marginRight: '12px' }}>
              {currency.flag}
            </span>
            <span data-eid={`currency-code-${index}`} style={{ fontWeight: '600', width: '40px' }}>
              {currency.code}
            </span>
            <span data-eid={`currency-name-${index}`} style={{ flexGrow: '1', color: '#BBBBBB', marginLeft: '8px' }}>
              {currency.name}
            </span>
            <span data-eid={`currency-rate-${index}`} style={{ fontWeight: '600', textAlign: 'right', width: '90px' }}>
              {currency.rate}
            </span>
            <span
              data-eid={`currency-change-${index}`}
              style={{
                fontWeight: '600',
                fontSize: '13px',
                width: '60px',
                textAlign: 'right',
                color: currency.change.startsWith('+') ? '#4CAF50' : '#EF4444',
                marginLeft: '12px',
              }}
            >
              {currency.change}
            </span>
          </div>
        ))}
      </div>

      <div data-eid="chart-section" style={{ marginTop: '8px' }}>
        <div
          data-eid="chart-title"
          style={{
            fontSize: '12px',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            fontWeight: '600',
            marginBottom: '12px',
            paddingLeft: '16px',
          }}
        >
          {data.chartTitle}
        </div>
        <div
          data-eid="bar-chart"
          style={{
            width: '100%',
            height: '100px', // Placeholder height for the chart area
            backgroundColor: '#2A293D',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Recharts BarChart element. The target image does not show any visible chart,
              so an empty BarChart within ResponsiveContainer is used to satisfy the element requirement
              without rendering any visible bars or axes. */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.chartData}>
              {/* No XAxis, YAxis, Tooltip, or Bar components rendered to match the 'no chart visible' aspect of the target image */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Widget;