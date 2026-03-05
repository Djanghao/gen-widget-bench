// submissions/<your-model-name>/widget.tsx
import React from 'react';
import { CloudRain } from 'lucide-react';
import data from './data.json';

type RadarCell = { level: 'none' | 'light' | 'moderate' | 'heavy' | 'severe' };

const levelToColor: Record<RadarCell['level'], string> = {
  none: 'rgba(20, 28, 48, 0.55)',
  light: '#6b879b',
  moderate: '#3f64a8',
  heavy: '#173f9f',
  severe: '#6b0bb8',
};

const levelToShadow: Record<RadarCell['level'], string> = {
  none: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
  light: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
  moderate: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
  heavy: 'inset 0 0 0 1px rgba(255,255,255,0.07)',
  severe: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
};

function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: 'neutral' | 'alert';
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 26,
    padding: '0 10px',
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 0.2,
    fontWeight: 600,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };
  const styles: Record<typeof tone, React.CSSProperties> = {
    neutral: {
      ...base,
      color: 'rgba(210,220,255,0.85)',
      background: 'rgba(40, 66, 140, 0.18)',
      border: '1px solid rgba(110, 140, 255, 0.25)',
    },
    alert: {
      ...base,
      color: 'rgba(255, 190, 190, 0.95)',
      background: 'rgba(140, 40, 40, 0.18)',
      border: '1px solid rgba(255, 120, 120, 0.45)',
    },
  };
  return <span style={styles[tone]}>{children}</span>;
}

function MetricRow({
  label,
  value,
  eid,
  labelEid,
  valueEid,
}: {
  label: string;
  value: string;
  eid: string;
  labelEid: string;
  valueEid: string;
}) {
  return (
    <div
      data-eid={eid}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <span
        data-eid={labelEid}
        style={{ color: 'rgba(200,215,255,0.75)', fontSize: 13, fontWeight: 600 }}
      >
        {label}
      </span>
      <span
        data-eid={valueEid}
        style={{ color: 'rgba(240,247,255,0.92)', fontSize: 14, fontWeight: 700 }}
      >
        {value}
      </span>
    </div>
  );
}

export default function Widget() {
  const d: any = data;

  const card: React.CSSProperties = {
    borderRadius: 14,
    background: 'linear-gradient(180deg, rgba(20,30,58,0.9), rgba(18,26,50,0.92))',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  };

  return (
    <section
      data-eid="root"
      style={{
        width: 460,
        height: 620,
        borderRadius: 20,
        padding: 18,
        boxSizing: 'border-box',
        background:
          'radial-gradient(1200px 520px at 40% -10%, rgba(60,100,255,0.22), rgba(0,0,0,0) 55%), linear-gradient(180deg, #0b1324 0%, #070b16 100%)',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: 'rgba(245,250,255,0.95)',
        position: 'relative',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              background: 'rgba(25, 40, 80, 0.35)',
              border: '1px solid rgba(110, 150, 255, 0.12)',
            }}
          >
            <CloudRain size={18} color="rgba(120,190,255,0.95)" />
          </div>
          <div data-eid="city-name" style={{ fontSize: 20, fontWeight: 800, letterSpacing: 0.2 }}>
            {d.city}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span data-eid="update-time">
            <Pill tone="neutral">{d.updated}</Pill>
          </span>
          <span data-eid="alert-badge">
            <Pill tone="alert">
              <span
                style={{
                  width: 14,
                  height: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  border: '1px solid rgba(255,140,140,0.65)',
                  color: 'rgba(255,190,190,0.95)',
                  fontSize: 10,
                  lineHeight: '14px',
                  fontWeight: 900,
                }}
              >
                !
              </span>
              {d.alert}
            </Pill>
          </span>
        </div>
      </header>

      <div data-eid="radar-section" style={{ ...card, padding: 16 }}>
        <div
          data-eid="radar-title"
          style={{
            color: 'rgba(175,195,255,0.85)',
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.2,
            marginBottom: 12,
          }}
        >
          {d.radarTitle}
        </div>

        <div
          data-eid="radar-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 2,
            padding: 10,
            borderRadius: 12,
            background: 'rgba(10, 14, 28, 0.28)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {(d.radar as RadarCell[]).map((c, i) => (
            <div
              key={i}
              data-eid={`radar-cell-${i}`}
              style={{
                width: 46,
                height: 46,
                borderRadius: 3,
                background: levelToColor[c.level],
                boxShadow: levelToShadow[c.level],
              }}
            />
          ))}
        </div>

        <div
          data-eid="legend-bar"
          style={{
            marginTop: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            color: 'rgba(190,205,255,0.7)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span data-eid="legend-label-none" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: levelToColor.none,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)',
              }}
            />
            None
          </span>
          <span data-eid="legend-label-light" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: levelToColor.light }} />
            Light
          </span>
          <span data-eid="legend-label-moderate" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: levelToColor.moderate }} />
            Moderate
          </span>
          <span data-eid="legend-label-heavy" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: levelToColor.heavy }} />
            Heavy
          </span>
          <span data-eid="legend-label-severe" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: levelToColor.severe }} />
            Severe
          </span>
        </div>
      </div>

      <div
        data-eid="conditions-card"
        style={{
          ...card,
          marginTop: 14,
          padding: 16,
          opacity: 0, // hidden in the cropped target but required to exist
          height: 0,
          overflow: 'hidden',
        }}
      >
        <div data-eid="conditions-title" style={{ fontSize: 14, fontWeight: 800, marginBottom: 10 }}>
          Current Conditions
        </div>
        <MetricRow
          eid="metric-temp"
          labelEid="metric-temp-label"
          valueEid="metric-temp-value"
          label="Temperature"
          value="84 F"
        />
        <MetricRow
          eid="metric-humidity"
          labelEid="metric-humidity-label"
          valueEid="metric-humidity-value"
          label="Humidity"
          value="78%"
        />
        <MetricRow
          eid="metric-pressure"
          labelEid="metric-pressure-label"
          valueEid="metric-pressure-value"
          label="Pressure"
          value="29.82 inHg"
        />
        <MetricRow
          eid="metric-wind"
          labelEid="metric-wind-label"
          valueEid="metric-wind-value"
          label="Wind"
          value="18 mph SW"
        />
        <MetricRow
          eid="metric-visibility"
          labelEid="metric-visibility-label"
          valueEid="metric-visibility-value"
          label="Visibility"
          value="6.2 mi"
        />
        <div style={{ borderBottom: 'none' }}>
          <MetricRow
            eid="metric-dewpoint"
            labelEid="metric-dewpoint-label"
            valueEid="metric-dewpoint-value"
            label="Dew Point"
            value="76 F"
          />
        </div>
      </div>

      <div
        data-eid="forecast-chart"
        style={{
          ...card,
          marginTop: 12,
          padding: 16,
          opacity: 0,
          height: 0,
          overflow: 'hidden',
        }}
      >
        <div data-eid="forecast-chart-title" style={{ fontSize: 14, fontWeight: 800 }}>
          24-Hour Forecast
        </div>
      </div>

      <div
        data-eid="outlook-section"
        style={{
          ...card,
          marginTop: 12,
          padding: 16,
          opacity: 0,
          height: 0,
          overflow: 'hidden',
        }}
      >
        <div data-eid="outlook-title" style={{ fontSize: 14, fontWeight: 800, marginBottom: 10 }}>
          3-Day Outlook
        </div>

        <div data-eid="outlook-day-0" style={{ display: 'flex', gap: 10 }}>
          <div data-eid="outlook-day-0-name">Today</div>
          <span data-eid="outlook-day-0-high">—</span>
          <span data-eid="outlook-day-0-low">—</span>
          <span data-eid="outlook-day-0-condition">—</span>
          <span data-eid="outlook-day-0-precip">—</span>
        </div>

        <div data-eid="outlook-day-1" style={{ display: 'flex', gap: 10 }}>
          <div data-eid="outlook-day-1-name">Tomorrow</div>
          <span data-eid="outlook-day-1-high">—</span>
          <span data-eid="outlook-day-1-low">—</span>
          <span data-eid="outlook-day-1-condition">—</span>
          <span data-eid="outlook-day-1-precip">—</span>
        </div>

        <div data-eid="outlook-day-2" style={{ display: 'flex', gap: 10 }}>
          <div data-eid="outlook-day-2-name">Next</div>
          <span data-eid="outlook-day-2-high">—</span>
          <span data-eid="outlook-day-2-low">—</span>
          <span data-eid="outlook-day-2-condition">—</span>
          <span data-eid="outlook-day-2-precip">—</span>
        </div>
      </div>
    </section>
  );
}