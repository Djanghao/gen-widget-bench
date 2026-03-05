// submissions/<your-model-name>/widget.tsx
import React from 'react';
import data from './data.json';
import { Clock, UtensilsCrossed, Truck, ShoppingBag } from 'lucide-react';

type Order = {
  number: string;
  elapsed: string;
  type: 'dine-in' | 'delivery' | 'takeout';
  table: string;
  rush?: boolean;
  status: 'COOKING' | 'READY';
  items: { qty: string; name: string; mods: string[] }[];
  progress: number; // 0-100
  allergy?: { label: string };
};

const pill = (bg: string, fg: string, border?: string) =>
  ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 999,
    background: bg,
    color: fg,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.6,
    border: border ? `1px solid ${border}` : undefined,
    lineHeight: '12px',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
  }) as const;

const subTxt = {
  fontSize: 12,
  color: 'rgba(255,255,255,0.72)',
  fontWeight: 600,
} as const;

const itemName = {
  fontSize: 13,
  color: 'rgba(255,255,255,0.92)',
  fontWeight: 800,
} as const;

const modTxt = {
  fontSize: 11,
  color: 'rgba(255,215,79,0.95)',
  fontWeight: 700,
  marginTop: 2,
} as const;

function TypeIcon({ type }: { type: Order['type'] }) {
  const common = { size: 12, color: 'rgba(255,255,255,0.55)' };
  if (type === 'delivery') return <Truck {...common} />;
  if (type === 'takeout') return <ShoppingBag {...common} />;
  return <UtensilsCrossed {...common} />;
}

function OrderCard({
  order,
  eidBase,
}: {
  order: Order;
  eidBase: string;
}) {
  const isCooking = order.status === 'COOKING';
  const borderColor = '#f5c400';
  const cardBg = '#222223';

  return (
    <div
      data-eid={eidBase}
      style={{
        background: cardBg,
        borderRadius: 10,
        border: `2px solid ${borderColor}`,
        boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
        padding: 12,
        position: 'relative',
        minHeight: 148,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span
            data-eid={`${eidBase}-number`}
            style={{
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 0.5,
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {order.number}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              data-eid={`${eidBase}-time`}
              style={{
                ...subTxt,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Clock size={12} color="rgba(255,255,255,0.55)" />
              {order.elapsed}
            </span>

            <span
              data-eid={`${eidBase}-type`}
              style={{
                ...subTxt,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                textTransform: 'lowercase',
              }}
            >
              <TypeIcon type={order.type} />
              {order.type}
            </span>
          </div>

          <span
            data-eid={`${eidBase}-table`}
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {order.table}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          {isCooking ? (
            <span data-eid={`${eidBase}-status`} style={pill('#2b2b2d', '#f5c400', '#5a4b00')}>
              COOKING
            </span>
          ) : (
            <span data-eid={`${eidBase}-status`} style={pill('#3a3a3d', '#ffffff', '#6a6a6f')}>
              READY
            </span>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {order.rush ? (
              <span
                data-eid={`${eidBase}-priority`}
                style={{
                  ...pill('transparent', '#f5c400'),
                  padding: 0,
                  border: 'none',
                  fontSize: 11,
                  letterSpacing: 0.6,
                }}
              >
                <span style={{ fontSize: 12, lineHeight: '12px' }}>🔥</span> RUSH
              </span>
            ) : (
              <span
                data-eid={`${eidBase}-priority`}
                style={{
                  display: 'inline-flex',
                  opacity: 0,
                  height: 16,
                }}
              >
                &nbsp;
              </span>
            )}

            {order.rush && order.number === '#1042' ? (
              <span
                style={{
                  ...pill('#f5c400', '#1a1300'),
                  padding: '3px 8px',
                  fontSize: 10,
                  fontWeight: 900,
                }}
              >
                NEW
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div
        data-eid={`${eidBase}-items`}
        style={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {order.items.slice(0, 2).map((it, idx) => (
          <div
            key={idx}
            data-eid={`${eidBase}-item-${idx}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              paddingBottom: idx === 0 ? 6 : 0,
              borderBottom: idx === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div style={itemName}>
              {it.qty} {it.name}
            </div>
            {it.mods.length ? (
              <div style={modTxt}>{it.mods.join(' | ')}</div>
            ) : (
              <div style={{ ...modTxt, opacity: 0 }}>&nbsp;</div>
            )}
          </div>
        ))}
      </div>

      <div
        data-eid={`${eidBase}-progress`}
        style={{
          marginTop: 10,
          height: 4,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.12)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.max(0, Math.min(100, order.progress))}%`,
            background: '#f5c400',
          }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        {order.allergy ? (
          <span
            data-eid={`${eidBase}-allergy`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '6px 10px',
              borderRadius: 6,
              background: '#111112',
              border: `1px solid ${borderColor}`,
              color: '#f5c400',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 0.4,
            }}
          >
            <span style={{ fontSize: 12 }}>⚠</span> {order.allergy.label}
          </span>
        ) : (
          <span
            data-eid={`${eidBase}-allergy`}
            style={{ display: 'inline-flex', width: '100%', opacity: 0, height: 26 }}
          >
            &nbsp;
          </span>
        )}
      </div>
    </div>
  );
}

export default function Widget() {
  const orders: Order[] = data.orders;

  return (
    <section
      data-eid="root"
      style={{
        width: 480,
        height: 853,
        background: '#b21616',
        borderRadius: 18,
        padding: 14,
        boxSizing: 'border-box',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
      }}
    >
      <header
        data-eid="header"
        style={{
          height: 44,
          borderRadius: 12,
          background: '#c11a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          boxSizing: 'border-box',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              background: '#991212',
              display: 'grid',
              placeItems: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <span style={{ color: '#f5c400', fontSize: 14, lineHeight: '14px' }}>🍳</span>
          </div>
          <h1
            data-eid="kds-title"
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 950,
              letterSpacing: 1.2,
              color: '#f5c400',
            }}
          >
            KITCHEN DISPLAY
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span data-eid="active-count" style={pill('#f5c400', '#1a1300')}>
            {data.activeLabel}
          </span>
          <span
            data-eid="clock"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 900,
              letterSpacing: 0.4,
            }}
          >
            <Clock size={14} color="rgba(255,255,255,0.85)" />
            {data.time}
          </span>
        </div>
      </header>

      <div
        data-eid="orders-grid"
        style={{
          marginTop: 12,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}
      >
        <OrderCard order={orders[0]} eidBase="order-0" />
        <OrderCard order={orders[1]} eidBase="order-1" />
        <OrderCard order={orders[2]} eidBase="order-2" />
        <OrderCard order={orders[3]} eidBase="order-3" />
        <OrderCard order={orders[4]} eidBase="order-4" />
        <OrderCard order={orders[5]} eidBase="order-5" />
        <OrderCard order={orders[6]} eidBase="order-6" />
        <OrderCard order={orders[7]} eidBase="order-7" />
      </div>

      <div
        data-eid="summary-bar"
        style={{
          marginTop: 12,
          height: 56,
          borderRadius: 14,
          background: '#7e1111',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          alignItems: 'center',
          padding: '8px 10px',
          boxSizing: 'border-box',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: 0.9, color: 'rgba(255,255,255,0.65)', fontWeight: 800 }}>
            AVG WAIT
          </div>
          <span
            data-eid="summary-avg-wait"
            style={{ fontSize: 16, fontWeight: 950, color: '#f5c400' }}
          >
            {data.summary.avgWait}
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: 0.9, color: 'rgba(255,255,255,0.65)', fontWeight: 800 }}>
            ORDERS/HR
          </div>
          <span
            data-eid="summary-orders-hour"
            style={{ fontSize: 16, fontWeight: 950, color: '#f5c400' }}
          >
            {data.summary.ordersHr}
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: 0.9, color: 'rgba(255,255,255,0.65)', fontWeight: 800 }}>
            COMPLETED
          </div>
          <span
            data-eid="summary-completed"
            style={{ fontSize: 16, fontWeight: 950, color: '#ffffff' }}
          >
            {data.summary.completed}
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: 0.9, color: 'rgba(255,255,255,0.65)', fontWeight: 800 }}>
            OVERDUE
          </div>
          <span
            data-eid="summary-overdue"
            style={{ fontSize: 16, fontWeight: 950, color: '#ffffff' }}
          >
            {data.summary.overdue}
          </span>
        </div>
      </div>
    </section>
  );
}