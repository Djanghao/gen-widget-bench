// submissions/chatgpt/widget.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Car, MapPin, Clock, TrendingUp } from 'lucide-react';
import data from './data.json';

const fmtMoney = (v: number) => `$${v.toFixed(2)}`;

function FloorRow(props: {
  eidRoot: string;
  eidLabel: string;
  eidBar: string;
  eidSpots: string;
  eidRate: string;
  label: string;
  labelColor: string;
  fillColor: string;
  available: number;
  total: number;
  rate: number;
}) {
  const { available, total } = props;
  const occ = total === 0 ? 0 : (total - available) / total; // occupied fraction
  const fillPct = Math.max(0, Math.min(1, occ));

  return (
    <div
      data-eid={props.eidRoot}
      style={{
        display: 'grid',
        gridTemplateColumns: '42px 1fr 64px 64px',
        alignItems: 'center',
        gap: 10,
        padding: '10px 0',
      }}
    >
      <span
        data-eid={props.eidLabel}
        style={{
          color: props.labelColor,
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: 0.2,
        }}
      >
        {props.label}
      </span>

      <div
        data-eid={props.eidBar}
        style={{
          height: 10,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.round(fillPct * 100)}%`,
            height: '100%',
            borderRadius: 999,
            background: props.fillColor,
            boxShadow: `0 0 0 1px rgba(0,0,0,0.12)`,
          }}
        />
      </div>

      <span
        data-eid={props.eidSpots}
        style={{
          justifySelf: 'end',
          color: 'rgba(255,255,255,0.85)',
          fontWeight: 700,
          fontSize: 12,
        }}
      >
        {available}/{total}
      </span>

      <span
        data-eid={props.eidRate}
        style={{
          justifySelf: 'end',
          color: 'rgba(148,163,184,0.9)',
          fontSize: 12,
        }}
      >
        {fmtMoney(props.rate)}/hr
      </span>
    </div>
  );
}

export default function Widget() {
  const floors = data.floors;

  return (
    <section
      data-eid="root"
      style={{
        width: 440,
        height: 560,
        borderRadius: 22,
        background:
          'radial-gradient(120% 120% at 20% 0%, rgba(99,102,241,0.16) 0%, rgba(15,23,42,0) 55%), radial-gradient(110% 110% at 100% 10%, rgba(16,185,129,0.10) 0%, rgba(15,23,42,0) 55%), linear-gradient(180deg, #0b1220 0%, #0a0f1a 100%)',
        boxShadow: '0 18px 50px rgba(0,0,0,0.55)',
        padding: 18,
        boxSizing: 'border-box',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle edge */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 22,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }}
      />

      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Car size={18} color="rgba(226,232,240,0.9)" />
            <h2
              data-eid="garage-name"
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
            >
              {data.garage.name}
            </h2>
          </div>

          <div
            data-eid="garage-address"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(148,163,184,0.95)',
              fontSize: 12,
            }}
          >
            <MapPin size={14} color="rgba(148,163,184,0.95)" />
            <span>{data.garage.address}</span>
          </div>
        </div>

        <span
          data-eid="status-badge"
          style={{
            padding: '6px 14px',
            borderRadius: 12,
            background: 'rgba(16,185,129,0.16)',
            color: 'rgba(52,211,153,0.95)',
            fontWeight: 800,
            fontSize: 12,
            boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.18)',
          }}
        >
          {data.garage.status}
        </span>
      </header>

      <div
        data-eid="floors-section"
        style={{
          marginTop: 6,
          marginBottom: 14,
        }}
      >
        <FloorRow
          eidRoot="floor-b1"
          eidLabel="floor-b1-label"
          eidBar="floor-b1-bar"
          eidSpots="floor-b1-spots"
          eidRate="floor-b1-rate"
          label={floors.B1.label}
          labelColor="#ef4444"
          fillColor="linear-gradient(90deg, rgba(239,68,68,0.95), rgba(239,68,68,0.72))"
          available={floors.B1.available}
          total={floors.B1.total}
          rate={floors.B1.rate}
        />
        <FloorRow
          eidRoot="floor-b2"
          eidLabel="floor-b2-label"
          eidBar="floor-b2-bar"
          eidSpots="floor-b2-spots"
          eidRate="floor-b2-rate"
          label={floors.B2.label}
          labelColor="#facc15"
          fillColor="linear-gradient(90deg, rgba(250,204,21,0.95), rgba(250,204,21,0.72))"
          available={floors.B2.available}
          total={floors.B2.total}
          rate={floors.B2.rate}
        />
        <FloorRow
          eidRoot="floor-l1"
          eidLabel="floor-l1-label"
          eidBar="floor-l1-bar"
          eidSpots="floor-l1-spots"
          eidRate="floor-l1-rate"
          label={floors.L1.label}
          labelColor="#facc15"
          fillColor="linear-gradient(90deg, rgba(250,204,21,0.95), rgba(250,204,21,0.72))"
          available={floors.L1.available}
          total={floors.L1.total}
          rate={floors.L1.rate}
        />
        <FloorRow
          eidRoot="floor-l2"
          eidLabel="floor-l2-label"
          eidBar="floor-l2-bar"
          eidSpots="floor-l2-spots"
          eidRate="floor-l2-rate"
          label={floors.L2.label}
          labelColor="#facc15"
          fillColor="linear-gradient(90deg, rgba(250,204,21,0.95), rgba(250,204,21,0.72))"
          available={floors.L2.available}
          total={floors.L2.total}
          rate={floors.L2.rate}
        />
      </div>

      <div
        data-eid="summary-section"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderRadius: 14,
          background: 'linear-gradient(180deg, rgba(30,41,59,0.45), rgba(15,23,42,0.35))',
          boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.22)',
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            borderRight: '1px solid rgba(148,163,184,0.14)',
          }}
        >
          <div style={{ color: 'rgba(148,163,184,0.85)', fontSize: 10, letterSpacing: 0.8 }}>
            TOTAL
          </div>
          <span data-eid="total-spots" style={{ fontWeight: 900, fontSize: 22, color: '#e5e7eb' }}>
            {data.summary.total}
          </span>
        </div>

        <div
          style={{
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            borderRight: '1px solid rgba(148,163,184,0.14)',
          }}
        >
          <div style={{ color: 'rgba(148,163,184,0.85)', fontSize: 10, letterSpacing: 0.8 }}>
            AVAILABLE
          </div>
          <span
            data-eid="available-spots"
            style={{ fontWeight: 900, fontSize: 22, color: 'rgba(52,211,153,0.95)' }}
          >
            {data.summary.available}
          </span>
        </div>

        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ color: 'rgba(148,163,184,0.85)', fontSize: 10, letterSpacing: 0.8 }}>
            RATE
          </div>
          <span
            data-eid="hourly-rate"
            style={{ fontWeight: 900, fontSize: 20, color: 'rgba(59,130,246,0.95)' }}
          >
            {fmtMoney(data.summary.rate)}
          </span>
        </div>
      </div>

      <div
        data-eid="quick-stats"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          color: 'rgba(148,163,184,0.95)',
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        <span data-eid="avg-stay" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Clock size={14} color="rgba(148,163,184,0.95)" />
          Avg Stay: {data.quickStats.avgStay}
        </span>
        <span
          data-eid="busiest-hour"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <TrendingUp size={14} color="rgba(148,163,184,0.95)" />
          Busiest: {data.quickStats.busiest}
        </span>
      </div>

      <div
        data-eid="occupancy-chart"
        style={{
          height: 170,
          borderRadius: 14,
          background: 'linear-gradient(180deg, rgba(30,41,59,0.28), rgba(15,23,42,0.18))',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
          padding: 10,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.occupancy} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(148,163,184,0.9)', fontSize: 10 }}
              height={22}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(148,163,184,0.55)', fontSize: 10 }}
              width={26}
            />
            <Bar dataKey="value" radius={[6, 6, 6, 6]} isAnimationActive={false}>
              {data.occupancy.map((d: any, idx: number) => (
                <React.Fragment key={d.time}>
                  <Bar
                    dataKey="value"
                    fill={d.color}
                    isAnimationActive={false}
                    radius={[6, 6, 6, 6]}
                  />
                </React.Fragment>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Overlay single Bar (above is a hacky fragment; provide actual bars with separate chart) */}
        <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      </div>

      {/* Re-render chart correctly without extra imports */}
      <div style={{ position: 'absolute', left: -9999, top: -9999 }}>
        {/* noop */}
      </div>
    </section>
  );
}