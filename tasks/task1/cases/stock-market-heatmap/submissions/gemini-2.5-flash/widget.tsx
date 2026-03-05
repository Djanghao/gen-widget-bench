import React from 'react';
import data from './data.json';
import { LineChart } from 'lucide-react';

const Widget = () => {
  const { header, stocks } = data;

  // Define colors from the target image
  const greenColor = 'rgb(57, 192, 127)'; // For positive changes
  const redColor = 'rgb(208, 59, 76)';   // For negative changes
  const darkGreenBg = 'rgb(34, 77, 61)'; // Background for positive stock cells
  const darkRedBg = 'rgb(82, 39, 48)';   // Background for negative stock cells
  const lightGrayText = 'rgb(160, 160, 160)'; // For last updated text
  const iconColor = 'rgb(132, 142, 255)'; // Color for the header icon
  const mainBackgroundColor = 'rgb(26, 26, 46)'; // Root container background

  return (
    <section
      data-eid="root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px',
        backgroundColor: mainBackgroundColor,
        borderRadius: '16px',
        fontFamily: 'Inter, sans-serif', // Using Inter or a generic sans-serif
        color: 'white',
        width: '480px', // Approximate width based on the target image
        boxSizing: 'border-box', // Include padding in the width calculation
      }}
    >
      <div
        data-eid="header"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div
          data-eid="index-name"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          <LineChart size={20} style={{ color: iconColor }} />
          {header.indexName}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <span
            data-eid="index-value"
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              lineHeight: '1', // Ensure tight line height for large text
            }}
          >
            {header.indexValue}
          </span>
          <span
            data-eid="index-change"
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: header.indexChangePositive ? greenColor : redColor,
            }}
          >
            {header.indexChangeAmount} ({header.indexChangePercent})
          </span>
        </div>
        <div
          data-eid="last-updated"
          style={{
            fontSize: '12px',
            color: lightGrayText,
          }}
        >
          {header.lastUpdated}
        </div>
      </div>

      <div
        data-eid="heatmap-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns, equal width
          gap: '12px', // Space between grid items
        }}
      >
        {stocks.map((stock, index) => (
          <div
            data-eid={`stock-cell-${index}`}
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px', // Space between elements inside a stock cell
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: stock.changePositive ? darkGreenBg : darkRedBg,
            }}
          >
            <div
              data-eid={`stock-ticker-${index}`}
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {stock.ticker}
            </div>
            <div
              data-eid={`stock-company-${index}`}
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)', // Slightly transparent white for subtle text
              }}
            >
              {stock.company}
            </div>
            <div
              data-eid={`stock-price-${index}`}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginTop: '8px', // Additional space between company and price
              }}
            >
              {stock.price}
            </div>
            <div
              data-eid={`stock-change-${index}`}
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: stock.changePositive ? greenColor : redColor,
              }}
            >
              {stock.changePercent}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;