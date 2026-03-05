import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';
import data from './data.json';

const Widget: React.FC = () => {
  // Parse numeric values from string data for calculations and charting
  const spentAmountNumeric = parseFloat(data.spentAmount.replace(/[^0-9.-]+/g, ""));

  const pieChartData = data.categories.map(cat => ({
    ...cat,
    value: parseFloat(cat.amount.replace(/[^0-9.-]+/g, ""))
  }));

  return (
    <section data-eid="root" style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      backgroundColor: '#1A1A2E', // Dark background color
      borderRadius: '16px',
      padding: '24px',
      width: '360px',
      boxSizing: 'border-box',
      color: '#E0E0E0', // Light text color
      fontSize: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div data-eid="month-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold' }}>
          <DollarSign size={20} color={data.categories[0].color} /> {/* Using first category color for icon */}
          {data.month}
        </div>
        <div data-eid="budget-total" style={{ color: '#A0A0A0', fontSize: '13px' }}>
          Total Budget: {data.budgetTotal}
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '15px' }}>
          <span data-eid="spent-amount" style={{ color: '#FF6347', fontWeight: 'bold' }}>
            Spent: {data.spentAmount}
          </span>
          <span data-eid="remaining-amount" style={{ color: '#2FD466', fontWeight: 'bold' }}>
            Left: {data.remainingAmount}
          </span>
        </div>
      </div>

      <div data-eid="progress-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ color: '#A0A0A0', fontSize: '13px' }}>Overall Spending</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div data-eid="progress-bar-bg" style={{
            flexGrow: 1,
            height: '8px',
            backgroundColor: '#404050', // Progress bar track background
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div data-eid="progress-bar-fill" style={{
              width: `${data.overallSpendingPercentage}%`,
              height: '100%',
              backgroundColor: '#FF6347', // Red color for fill
              borderRadius: '4px'
            }}></div>
          </div>
          <div data-eid="progress-label" style={{ fontSize: '13px', fontWeight: 'bold', color: '#FF6347' }}>
            {data.overallSpendingPercentage}%
          </div>
        </div>
      </div>

      <div data-eid="chart-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '150px' }}>
        <div data-eid="pie-chart" style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={300} height={150}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="100%" // Center it at the bottom to make it a semi-circle pointing upwards
                startAngle={180} // Start from left (180 degrees)
                endAngle={0}    // End at right (0 degrees)
                innerRadius={50}
                outerRadius={80}
                paddingAngle={0} // No gap between slices
                dataKey="value" // Use the numeric amount for slice size
                stroke="none"   // No stroke around slices
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="category-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.categories.map((category, index) => (
          <div data-eid={`category-row-${index}`} key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span data-eid={`category-dot-${index}`} style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: category.color
              }}></span>
              <span data-eid={`category-name-${index}`} style={{ color: '#E0E0E0', fontSize: '14px' }}>
                {category.name}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid={`category-amount-${index}`} style={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                {category.amount}
              </span>
              <span data-eid={`category-pct-${index}`} style={{ color: '#A0A0A0', fontSize: '13px' }}>
                {category.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;