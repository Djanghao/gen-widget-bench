import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';
import data from './data.json';

const BudgetExpenseBreakdown = () => {
  const { month, budgetTotal, spentAmount, remainingAmount, progressPercentage, categories } = data;

  // Calculate total spent for progress bar
  const totalSpent = spentAmount;
  const totalBudget = budgetTotal;

  // Prepare data for pie chart
  const pieData = categories.map(category => ({
    name: category.name,
    value: category.amount,
    color: category.color
  }));

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#111827',
        borderRadius: '12px',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#F9FAFB',
        width: '360px',
        height: '640px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div data-eid="month-label" style={{ fontSize: '20px', fontWeight: '600', lineHeight: '1.2' }}>
          {month}
        </div>
        <div data-eid="budget-total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#9CA3AF' }}>
          <span>Budget</span>
          <span style={{ fontWeight: '600' }}>${budgetTotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '600' }}>
          <span data-eid="spent-amount">Spent: ${spentAmount.toLocaleString()}</span>
          <span data-eid="remaining-amount">Remaining: ${remainingAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress Section */}
      <div data-eid="progress-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div data-eid="progress-label" style={{ fontSize: '14px', color: '#9CA3AF' }}>
          Budget Progress
        </div>
        <div data-eid="progress-bar-bg" style={{
          height: '8px',
          backgroundColor: '#374151',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div 
            data-eid="progress-bar-fill" 
            style={{
              height: '100%',
              width: `${progressPercentage}%`,
              backgroundColor: '#3B82F6',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }}
          />
        </div>
        <div style={{ fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>
          {progressPercentage}%
        </div>
      </div>

      {/* Chart Section */}
      <div data-eid="chart-section" style={{ flex: 1, minHeight: '200px' }}>
        <div data-eid="pie-chart" style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category List */}
      <div data-eid="category-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categories.map((category, index) => (
          <div 
            key={index} 
            data-eid={`category-row-${index}`} 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: index < categories.length - 1 ? '1px solid #374151' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span 
                data-eid={`category-dot-${index}`} 
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: category.color
                }}
              />
              <span data-eid={`category-name-${index}`} style={{ fontSize: '14px', fontWeight: '500' }}>
                {category.name}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid={`category-amount-${index}`} style={{ fontSize: '14px', fontWeight: '600' }}>
                ${category.amount.toLocaleString()}
              </span>
              <span data-eid={`category-pct-${index}`} style={{ fontSize: '12px', color: '#9CA3AF' }}>
                {category.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BudgetExpenseBreakdown;