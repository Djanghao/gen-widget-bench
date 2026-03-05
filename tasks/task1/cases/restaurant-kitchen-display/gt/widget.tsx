import React from 'react';
import { Clock, Flame, AlertTriangle, Truck, UtensilsCrossed, ShoppingBag, Timer, ChefHat } from 'lucide-react';
import data from './data.json';

const c = {
  bg: '#dc2626',
  card: '#1f1f1f',
  border: 'rgba(220, 38, 38, 0.5)',
  new: '#fbbf24',
  cooking: '#fbbf24',
  ready: '#ffffff',
  rush: '#000000',
  text: '#ffffff',
  dim: '#fca5a5',
  allergyBg: 'rgba(0, 0, 0, 0.6)',
  allergyBorder: 'rgba(251, 191, 36, 0.6)',
};

const statusColors: Record<string, string> = { new: c.new, cooking: c.cooking, ready: c.ready };
const typeIcons: Record<string, typeof UtensilsCrossed> = { 'dine-in': UtensilsCrossed, delivery: Truck, takeout: ShoppingBag };

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: `linear-gradient(180deg, ${c.bg} 0%, #b91c1c 50%, #991b1b 100%)`,
        borderRadius: 14,
        color: c.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        maxWidth: 480,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 8px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ChefHat size={18} color={c.cooking} />
          <h1 data-eid="kds-title" style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: 1, color: '#fbbf24' }}>
            KITCHEN DISPLAY
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span data-eid="active-count" style={{ background: c.cooking, color: '#000', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
            {data.orders.length} ACTIVE
          </span>
          <span data-eid="clock" style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: '#fff' }}>
            <Clock size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {data.clock}
          </span>
        </div>
      </header>

      {/* Orders Grid */}
      <div data-eid="orders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
        {data.orders.map((order, i) => {
          const statusColor = statusColors[order.status] || c.dim;
          const TypeIcon = typeIcons[order.type] || UtensilsCrossed;
          const isOverdue = order.elapsedMin > 20;
          return (
            <div
              key={i}
              data-eid={`order-${i}`}
              style={{
                background: c.card,
                border: `2px solid ${order.priority === 'rush' ? '#fbbf24' : isOverdue ? '#fbbf24' : 'rgba(220,38,38,0.4)'}`,
                borderRadius: 10,
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                position: 'relative',
              }}
            >
              {/* Order header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span data-eid={`order-${i}-number`} style={{ fontSize: 14, fontWeight: 800, color: '#ffffff' }}>
                  {order.number}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    data-eid={`order-${i}-priority`}
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: order.priority === 'rush' ? '#fbbf24' : '#999',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {order.priority === 'rush' && <Flame size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} />}
                    {order.priority === 'rush' ? 'RUSH' : ''}
                  </span>
                  <span
                    data-eid={`order-${i}-status`}
                    style={{
                      background: `${statusColor}22`,
                      border: `1px solid ${statusColor}66`,
                      borderRadius: 6,
                      color: statusColor,
                      fontSize: 8,
                      fontWeight: 700,
                      padding: '2px 6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Time and type row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
                <span data-eid={`order-${i}-time`} style={{ color: isOverdue ? '#fbbf24' : '#aaa', fontWeight: isOverdue ? 700 : 400 }}>
                  <Timer size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} />
                  {order.elapsedMin}m ago
                </span>
                <span data-eid={`order-${i}-type`} style={{ color: '#aaa' }}>
                  <TypeIcon size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} />
                  {order.type}
                </span>
              </div>

              <span data-eid={`order-${i}-table`} style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>
                {order.table}
              </span>

              {/* Items */}
              <div data-eid={`order-${i}-items`} style={{ display: 'flex', flexDirection: 'column', gap: 3, borderTop: `1px solid rgba(220,38,38,0.3)`, paddingTop: 4 }}>
                {order.items.slice(0, 2).map((item, j) => (
                  <div key={j} data-eid={`order-${i}-item-${j}`} style={{ fontSize: 10, color: '#e0e0e0' }}>
                    <div style={{ fontWeight: 600 }}>
                      {item.qty}x {item.name}
                    </div>
                    {item.mods.length > 0 && (
                      <div style={{ color: '#fbbf24', fontSize: 9, paddingLeft: 8 }}>
                        {item.mods.join(' | ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div
                data-eid={`order-${i}-progress`}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  height: 4,
                  overflow: 'hidden',
                  marginTop: 2,
                }}
              >
                <div
                  style={{
                    background: statusColor,
                    height: '100%',
                    width: `${order.progress}%`,
                    borderRadius: 3,
                  }}
                />
              </div>

              {/* Allergy alert */}
              <span
                data-eid={`order-${i}-allergy`}
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: order.allergy ? '#fbbf24' : 'transparent',
                  background: order.allergy ? c.allergyBg : 'transparent',
                  border: order.allergy ? `1px solid ${c.allergyBorder}` : '1px solid transparent',
                  borderRadius: 4,
                  padding: order.allergy ? '2px 5px' : 0,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  minHeight: 4,
                }}
              >
                {order.allergy ? (
                  <>
                    <AlertTriangle size={8} style={{ verticalAlign: 'middle', marginRight: 2 }} />
                    {order.allergy}
                  </>
                ) : (
                  '\u00A0'
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary Bar */}
      <div
        data-eid="summary-bar"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
          background: 'rgba(0,0,0,0.35)',
          borderRadius: 10,
          padding: '8px 6px',
          borderTop: `2px solid #fbbf24`,
        }}
      >
        <span data-eid="summary-avg-wait" style={{ textAlign: 'center', fontSize: 10 }}>
          <div style={{ color: '#fca5a5', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Avg Wait</div>
          <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: 14 }}>{data.summary.avgWaitMin}m</div>
        </span>
        <span data-eid="summary-orders-hour" style={{ textAlign: 'center', fontSize: 10 }}>
          <div style={{ color: '#fca5a5', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Orders/Hr</div>
          <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: 14 }}>{data.summary.ordersPerHour}</div>
        </span>
        <span data-eid="summary-completed" style={{ textAlign: 'center', fontSize: 10 }}>
          <div style={{ color: '#fca5a5', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Completed</div>
          <div style={{ fontWeight: 700, color: '#ffffff', fontSize: 14 }}>{data.summary.completedToday}</div>
        </span>
        <span data-eid="summary-overdue" style={{ textAlign: 'center', fontSize: 10 }}>
          <div style={{ color: '#fca5a5', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Overdue</div>
          <div style={{ fontWeight: 700, color: '#000000', fontSize: 14 }}>{data.summary.overdue}</div>
        </span>
      </div>
    </section>
  );
}
