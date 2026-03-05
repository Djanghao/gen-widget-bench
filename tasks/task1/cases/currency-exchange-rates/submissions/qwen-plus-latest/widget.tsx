import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import data from './data.json';

const CurrencyExchangeWidget = () => {
  const { baseCurrency, baseAmount, lastUpdated, currencies, chartData } = data;

  const formatChange = (change: number) => {
    if (change >= 0) {
      return <span style={{ color: '#10b981' }}><TrendingUp size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{change.toFixed(2)}%</span>;
    } else {
      return <span style={{ color: '#ef4444' }}><TrendingDown size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{Math.abs(change).toFixed(2)}%</span>;
    }
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#f1f5f9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        borderRadius: '12px',
        padding: '24px',
        width: '400px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ marginBottom: '24px' }}>
        <div data-eid="base-currency" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
          {baseCurrency}
        </div>
        <div data-eid="base-amount" style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          {baseAmount}
        </div>
        <div data-eid="last-updated" style={{ fontSize: '14px', color: '#94a3b8' }}>
          Last updated: {lastUpdated}
        </div>
      </div>

      {/* Currency List */}
      <div data-eid="currency-list" style={{ marginBottom: '24px' }}>
        {currencies.map((currency, index) => (
          <div 
            key={currency.code}
            data-eid={`currency-row-${index}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < currencies.length - 1 ? '1px solid #334155' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span data-eid={`currency-flag-${index}`} style={{ fontSize: '20px' }}>
                {currency.flag}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span data-eid={`currency-code-${index}`} style={{ fontWeight: '600', fontSize: '16px' }}>
                  {currency.code}
                </span>
                <span data-eid={`currency-name-${index}`} style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {currency.name}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span data-eid={`currency-rate-${index}`} style={{ fontWeight: '600', fontSize: '16px' }}>
                {currency.rate}
              </span>
              <div data-eid={`currency-change-${index}`} style={{ marginTop: '4px' }}>
                {formatChange(currency.change)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div data-eid="chart-section" style={{}}>
        <div data-eid="chart-title" style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Relative Strength
        </div>
        <div data-eid="bar-chart" style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="currency" 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                axisLine={{ stroke: '#334155' }} 
                tickLine={{ stroke: '#334155' }} 
              />
              <YAxis 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                axisLine={{ stroke: '#334155' }} 
                tickLine={{ stroke: '#334155' }} 
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }} 
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="strength" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default CurrencyExchangeWidget;