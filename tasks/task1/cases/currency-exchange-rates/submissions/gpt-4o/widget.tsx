import React from 'react';
import data from './data.json';
import { BarChart, Bar, Cell, XAxis, YAxis } from 'recharts';

export default function Widget() {
  const changeColor = (change: number) => (change > 0 ? '#00FF00' : '#FF0000');

  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#0b0e20',
        borderRadius: '10px',
        color: '#ffffff',
        padding: '20px',
        width: '350px',
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <div data-eid="header" style={{ marginBottom: '20px' }}>
        <div
          data-eid="base-currency"
          style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}
        >
          {data.baseCurrencyLabel}
        </div>
        <div data-eid="base-amount" style={{ fontSize: '18px', marginBottom: '5px' }}>
          {data.baseAmount}
        </div>
        <div data-eid="last-updated" style={{ fontSize: '12px', color: '#ccc' }}>
          {data.lastUpdated}
        </div>
      </div>

      <div data-eid="currency-list">
        {data.currencies.map((currency, index) => (
          <div
            key={index}
            data-eid={`currency-row-${index}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#111424',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
          >
            <span data-eid={`currency-flag-${index}`} style={{ marginRight: '10px' }}>
              {currency.flag}
            </span>
            <span data-eid={`currency-code-${index}`} style={{ width: '40px' }}>
              {currency.code}
            </span>
            <span data-eid={`currency-name-${index}`} style={{ flex: '1', textAlign: 'left' }}>
              {currency.name}
            </span>
            <span data-eid={`currency-rate-${index}`} style={{ width: '70px', textAlign: 'right' }}>
              {currency.rate}
            </span>
            <span
              data-eid={`currency-change-${index}`}
              style={{
                color: changeColor(currency.change),
                textAlign: 'right',
                width: '50px',
                marginLeft: '10px',
              }}
            >
              {currency.change}%
            </span>
          </div>
        ))}
      </div>

      <div data-eid="chart-section" style={{ marginTop: '20px' }}>
        <div data-eid="chart-title" style={{ fontSize: '14px', marginBottom: '10px' }}>
          {data.chartTitle}
        </div>
        <div data-eid="bar-chart">
          <BarChart width={300} height={150} data={data.currencies}>
            <XAxis dataKey="code" stroke="#888888" />
            <YAxis hide />
            <Bar dataKey="change" barSize={20}>
              {data.currencies.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={changeColor(entry.change)} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </section>
  );
}