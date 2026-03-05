import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import data from './data.json';

const COLORS = ['#6a5acd', '#ff8c00', '#32cd32', '#4682b4', '#ff69b4', '#20b2aa'];

const Widget: React.FC = () => {
  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#161625',
        color: '#fff',
        padding: '20px',
        borderRadius: '15px',
        width: '300px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div data-eid="header" style={{ marginBottom: '20px' }}>
        <div data-eid="month-label" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
          💲 February 2025
        </div>
        <div data-eid="budget-total" style={{ fontSize: '14px', marginBottom: '5px' }}>
          Total Budget: ${data.budgetTotal}
        </div>
        <div>
          <span data-eid="spent-amount" style={{ color: 'red', marginRight: '10px' }}>
            Spent: ${data.spentAmount}
          </span>
          <span data-eid="remaining-amount" style={{ color: 'green' }}>
            Left: ${data.remainingAmount}
          </span>
        </div>
      </div>
      <div data-eid="progress-section" style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Overall Spending</div>
        <div
          data-eid="progress-bar-bg"
          style={{
            width: '100%',
            height: '10px',
            background: '#3b3b52',
            borderRadius: '5px',
            position: 'relative',
            marginBottom: '5px'
          }}
        >
          <div
            data-eid="progress-bar-fill"
            style={{
              width: `${data.spentPercentage}%`,
              height: '100%',
              background: 'red',
              borderRadius: '5px'
            }}
          />
        </div>
        <div data-eid="progress-label" style={{ fontSize: '14px' }}>{data.spentPercentage}%</div>
      </div>
      <div data-eid="chart-section" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <div data-eid="pie-chart">
          <PieChart width={180} height={150}>
            <Pie
              data={data.categories}
              dataKey="value"
              innerRadius={40}
              outerRadius={60}
              startAngle={180}
              endAngle={0}
              paddingAngle={5}
            >
              {data.categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      <div data-eid="category-list">
        {data.categories.map((category, index) => (
          <div
            data-eid={`category-row-${index}`}
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#1f1f38',
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '5px'
            }}
          >
            <span
              data-eid={`category-dot-${index}`}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: COLORS[index % COLORS.length],
                display: 'inline-block',
                marginRight: '10px'
              }}
            />
            <span data-eid={`category-name-${index}`} style={{ flex: 1 }}>
              {category.name}
            </span>
            <span data-eid={`category-amount-${index}`} style={{ marginRight: '10px' }}>
              ${category.amount.toFixed(2)}
            </span>
            <span data-eid={`category-pct-${index}`}>
              {category.percentage}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;