import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Accessibility, ArrowRight, Clock } from 'lucide-react';
import data from './data.json';

type Station = {
  name: string;
  zone: string;
  type: 'Local' | 'Express';
  highlight?: 'origin' | 'destination';
  timeNote?: string;
  accessibility?: boolean;
  transfers?: { label: string; color: string; textColor?: string }[];
};

const colors = {
  bgTop: '#0b1020',
  bgMid: '#0d152b',
  bgBot: '#0a1224',
  card: 'rgba(22, 36, 62, 0.55)',
  card2: 'rgba(17, 28, 49, 0.65)',
  border: 'rgba(255,255,255,0.08)',
  text: 'rgba(236, 242, 255, 0.92)',
  sub: 'rgba(214, 225, 245, 0.62)',
  muted: 'rgba(214, 225, 245, 0.48)',
  blue: '#3b82f6',
  blue2: '#60a5fa',
  green: '#22c55e',
  amber: '#fbbf24',
};

function Pill({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 8px',
        borderRadius: 999,
        border: `1px solid ${colors.border}`,
        background: 'rgba(255,255,255,0.03)',
        color: colors.sub,
        fontSize: 11,
        lineHeight: '14px',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function StationRow({
  station,
  index,
  eidBase,
}: {
  station: Station;
  index: number;
  eidBase: string;
}) {
  const isHighlight = !!station.highlight;
  const dotSize = isHighlight ? 14 : 10;

  const rowStyle: React.CSSProperties = isHighlight
    ? {
        marginTop: 6,
        marginBottom: 6,
        padding: '14px 14px',
        borderRadius: 12,
        background:
          'linear-gradient(180deg, rgba(37, 60, 110, 0.55), rgba(22, 36, 62, 0.45))',
        border: `1px solid rgba(255,255,255,0.06)`,
      }
    : {
        padding: '10px 14px',
      };

  const nameStyle: React.CSSProperties = {
    fontSize: isHighlight ? 15 : 13.5,
    fontWeight: isHighlight ? 700 : 500,
    color: isHighlight ? colors.text : 'rgba(231, 238, 255, 0.82)',
    letterSpacing: 0.2,
  };

  const typeStyle: React.CSSProperties = {
    marginLeft: 10,
    fontSize: 11,
    fontWeight: 600,
    color: station.type === 'Express' ? colors.amber : 'rgba(215, 226, 245, 0.6)',
  };

  return (
    <div
      data-eid={eidBase}
      style={{
        display: 'grid',
        gridTemplateColumns: '24px 1fr auto',
        columnGap: 10,
        alignItems: 'start',
        ...rowStyle,
      }}
    >
      <div style={{ position: 'relative', height: '100%' }}>
        <div
          style={{
            position: 'absolute',
            left: 11,
            top: 0,
            bottom: 0,
            width: 2,
            background:
              'linear-gradient(180deg, rgba(59,130,246,0.85), rgba(59,130,246,0.35))',
            borderRadius: 999,
          }}
        />
        <div
          data-eid={`${eidBase}-dot`}
          style={{
            position: 'relative',
            width: dotSize,
            height: dotSize,
            borderRadius: 999,
            boxSizing: 'border-box',
            marginTop: 2,
            marginLeft: 6,
            background: isHighlight ? colors.blue : colors.bgTop,
            border: `2px solid ${colors.blue}`,
            boxShadow: isHighlight
              ? '0 0 0 6px rgba(59,130,246,0.15)'
              : 'none',
          }}
        />
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <span data-eid={`${eidBase}-name`} style={nameStyle}>
            {station.name}
          </span>
          <span
            data-eid={`${eidBase}-zone`}
            style={{
              marginLeft: 10,
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 7px',
              borderRadius: 8,
              fontSize: 11,
              color: 'rgba(214, 225, 245, 0.58)',
              border: `1px solid ${colors.border}`,
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            {station.zone}
          </span>
          <span data-eid={`${eidBase}-type`} style={typeStyle}>
            {station.type}
          </span>

          {station.accessibility ? (
            <span
              data-eid={`${eidBase}-accessibility`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: 8,
                color: colors.blue2,
              }}
              title="Accessible"
            >
              <Accessibility size={14} />
            </span>
          ) : (
            <span
              data-eid={`${eidBase}-accessibility`}
              style={{ display: 'none' }}
            />
          )}
        </div>

        {station.transfers ? (
          <div
            data-eid={`${eidBase}-transfers`}
            style={{
              marginTop: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(214, 225, 245, 0.55)',
              fontSize: 11,
            }}
          >
            {station.transfers.map((t, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: t.color,
                  color: t.textColor ?? '#0b1020',
                  fontSize: 9,
                  fontWeight: 800,
                }}
              >
                {t.label}
              </span>
            ))}
            <span style={{ color: 'rgba(214, 225, 245, 0.45)' }}>Transfer</span>
          </div>
        ) : (
          <div data-eid={`${eidBase}-transfers`} style={{ display: 'none' }} />
        )}

        {station.timeNote ? (
          <span
            data-eid={`${eidBase}-time`}
            style={{
              marginTop: 8,
              display: 'inline-block',
              fontSize: 12,
              fontWeight: 600,
              color: colors.blue2,
            }}
          >
            {station.timeNote}
          </span>
        ) : (
          <span data-eid={`${eidBase}-time`} style={{ display: 'none' }} />
        )}
      </div>

      <div />
    </div>
  );
}

export default function Widget() {
  const stations: Station[] = data.stations;

  return (
    <section
      data-eid="root"
      style={{
        width: 460,
        height: 900,
        borderRadius: 18,
        padding: 16,
        boxSizing: 'border-box',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        background: `radial-gradient(1200px 600px at 20% 5%, rgba(59,130,246,0.22), transparent 55%),
          radial-gradient(900px 520px at 90% 20%, rgba(34,197,94,0.10), transparent 55%),
          linear-gradient(180deg, ${colors.bgTop}, ${colors.bgMid} 55%, ${colors.bgBot})`,
        color: colors.text,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 2px 10px 2px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            data-eid="line-indicator"
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: colors.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: 14,
              boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
            }}
          >
            {data.header.lineLetter}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              data-eid="line-name"
              style={{ fontSize: 20, fontWeight: 750, letterSpacing: 0.2 }}
            >
              {data.header.lineName}
            </div>
            <div
              data-eid="direction-label"
              style={{ fontSize: 12.5, color: colors.sub, marginTop: 1 }}
            >
              {data.header.direction}
            </div>
          </div>
        </div>

        <span
          data-eid="status-badge"
          style={{
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            color: '#86efac',
            background: 'rgba(34,197,94,0.14)',
            border: '1px solid rgba(34,197,94,0.35)',
          }}
        >
          {data.header.status}
        </span>
      </header>

      <div
        data-eid="trip-info"
        style={{
          background: 'rgba(16, 28, 50, 0.65)',
          border: `1px solid rgba(255,255,255,0.08)`,
          borderRadius: 12,
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 10,
          boxShadow: '0 10px 24px rgba(0,0,0,0.22) inset',
        }}
      >
        <span
          data-eid="trip-origin"
          style={{ fontSize: 13.5, fontWeight: 650, color: colors.blue2 }}
        >
          {data.trip.origin}
        </span>
        <span
          data-eid="trip-arrow"
          style={{
            color: colors.blue2,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <ArrowRight size={16} />
        </span>
        <span
          data-eid="trip-destination"
          style={{ fontSize: 13.5, fontWeight: 650, color: colors.blue2 }}
        >
          {data.trip.destination}
        </span>

        <span style={{ flex: '0 0 8px' }} />

        <span
          data-eid="trip-time"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12.5,
            color: colors.blue2,
            opacity: 0.95,
          }}
        >
          <Clock size={14} />
          {data.trip.time}
        </span>
      </div>

      <div
        data-eid="station-list"
        style={{
          marginTop: 4,
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        {stations.map((s, i) => (
          <StationRow
            key={i}
            station={s}
            index={i}
            eidBase={`station-${i}`}
          />
        ))}
      </div>

      {/* Lower sections (not visible in crop, but required by elements.json) */}
      <div data-eid="alerts-section" style={{ display: 'none' }}>
        <div data-eid="alerts-title">Service Alerts</div>
        <div data-eid="alert-0">
          <span data-eid="alert-0-severity">Warning</span>
          <span data-eid="alert-0-message">Placeholder</span>
        </div>
        <div data-eid="alert-1">
          <span data-eid="alert-1-severity">Info</span>
          <span data-eid="alert-1-message">Placeholder</span>
        </div>
      </div>

      <div data-eid="ridership-section" style={{ display: 'none' }}>
        <div data-eid="ridership-title">Today's Ridership</div>
        <div data-eid="ridership-chart" style={{ width: '100%', height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.ridership}>
              <XAxis dataKey="t" hide />
              <YAxis hide />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="v"
                stroke={colors.blue2}
                fill="rgba(59,130,246,0.25)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="travel-times" style={{ display: 'none' }}>
        <div data-eid="travel-times-title">Travel Times</div>
        <div data-eid="travel-segment-0">
          <span data-eid="travel-segment-0-from">Central Square</span>
          <span data-eid="travel-segment-0-to">Midtown Plaza</span>
          <span data-eid="travel-segment-0-time">3 min</span>
        </div>
        <div data-eid="travel-segment-1">
          <span data-eid="travel-segment-1-from">Midtown Plaza</span>
          <span data-eid="travel-segment-1-to">Commerce District</span>
          <span data-eid="travel-segment-1-time">4 min</span>
        </div>
        <div data-eid="travel-segment-2">
          <span data-eid="travel-segment-2-from">Commerce District</span>
          <span data-eid="travel-segment-2-to">Waterfront</span>
          <span data-eid="travel-segment-2-time">5 min</span>
        </div>
        <div data-eid="travel-segment-3">
          <span data-eid="travel-segment-3-from">Waterfront</span>
          <span data-eid="travel-segment-3-to">Harbor Point</span>
          <span data-eid="travel-segment-3-time">6 min</span>
        </div>
      </div>

      <div data-eid="footer" style={{ display: 'none' }}>
        <div data-eid="next-train">Next train: 3 min</div>
        <div data-eid="frequency">Every 6 min</div>
        <div data-eid="last-updated">Last updated: 2:14 PM</div>
      </div>
    </section>
  );
}