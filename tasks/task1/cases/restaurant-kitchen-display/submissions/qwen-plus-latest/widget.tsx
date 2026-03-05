import React from 'react';
import data from './data.json';

const RestaurantKitchenDisplay = () => {
  const { header, orders, summary } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <header 
        data-eid="header"
        style={{
          backgroundColor: '#1E1E1E',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #333333'
        }}
      >
        <h1 
          data-eid="kds-title"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '0.5px'
          }}
        >
          KITCHEN DISPLAY SYSTEM
        </h1>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span 
            data-eid="clock"
            style={{
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '0.3px'
            }}
          >
            {header.clock}
          </span>
          <span 
            data-eid="active-count"
            style={{
              backgroundColor: '#3A3A3A',
              color: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.2px'
            }}
          >
            {header.activeCount} ACTIVE ORDERS
          </span>
        </div>
      </header>

      {/* Orders Grid */}
      <div 
        data-eid="orders-grid"
        style={{
          flex: 1,
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '16px',
          overflowY: 'auto'
        }}
      >
        {orders.map((order, index) => (
          <div 
            key={index}
            data-eid={`order-${index}`}
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              border: order.priority ? '2px solid #FF6B35' : '1px solid #333333'
            }}
          >
            {/* Order Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span 
                data-eid={`order-${index}-number`}
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#FFD700'
                }}
              >
                #{order.number}
              </span>
              <span 
                data-eid={`order-${index}-time`}
                style={{
                  fontSize: '14px',
                  color: '#AAAAAA',
                  fontWeight: 500
                }}
              >
                {order.time}
              </span>
            </div>

            {/* Order Type & Table */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span 
                data-eid={`order-${index}-type`}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: order.type === 'DINE-IN' ? '#4CAF50' : order.type === 'DELIVERY' ? '#2196F3' : '#FF9800'
                }}
              >
                {order.type}
              </span>
              <span 
                data-eid={`order-${index}-table`}
                style={{
                  fontSize: '14px',
                  color: '#BBBBBB'
                }}
              >
                {order.table}
              </span>
            </div>

            {/* Status and Priority */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span 
                data-eid={`order-${index}-status`}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: order.status === 'READY' ? '#4CAF50' : order.status === 'PREPARING' ? '#FF9800' : '#2196F3',
                  color: '#FFFFFF'
                }}
              >
                {order.status}
              </span>
              {order.priority && (
                <span 
                  data-eid={`order-${index}-priority`}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#FF6B35',
                    backgroundColor: '#2A150C',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  PRIORITY
                </span>
              )}
            </div>

            {/* Items */}
            <div 
              data-eid={`order-${index}-items`}
              style={{
                marginBottom: '12px',
                flex: 1
              }}
            >
              {order.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  data-eid={`order-${index}-item-${itemIndex}`}
                  style={{
                    fontSize: '14px',
                    marginBottom: '6px',
                    lineHeight: '1.4',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  {item.modifications && (
                    <span style={{ fontSize: '12px', color: '#AAAAAA', marginLeft: '4px' }}>
                      {item.modifications}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div 
              data-eid={`order-${index}-progress`}
              style={{
                height: '6px',
                backgroundColor: '#333333',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '8px'
              }}
            >
              <div 
                style={{
                  height: '100%',
                  backgroundColor: order.progress >= 100 ? '#4CAF50' : '#2196F3',
                  width: `${order.progress}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            {/* Allergy Alert */}
            {order.allergy && (
              <span 
                data-eid={`order-${index}-allergy`}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#FF5252',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ⚠️ {order.allergy}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Summary Bar */}
      <div 
        data-eid="summary-bar"
        style={{
          backgroundColor: '#1E1E1E',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid #333333',
          fontSize: '14px',
          color: '#AAAAAA'
        }}
      >
        <span 
          data-eid="summary-avg-wait"
          style={{ fontWeight: 600, color: '#FFFFFF' }}
        >
          AVG WAIT: {summary.avgWait}
        </span>
        <span 
          data-eid="summary-orders-hour"
          style={{ fontWeight: 600, color: '#FFFFFF' }}
        >
          {summary.ordersPerHour} / HR
        </span>
        <span 
          data-eid="summary-completed"
          style={{ fontWeight: 600, color: '#FFFFFF' }}
        >
          {summary.completedToday} COMPLETED
        </span>
        <span 
          data-eid="summary-overdue"
          style={{ fontWeight: 600, color: '#FF5252' }}
        >
          {summary.overdue} OVERDUE
        </span>
      </div>
    </section>
  );
};

export default RestaurantKitchenDisplay;