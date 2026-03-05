// submissions/chatgpt/widget.tsx
import React from 'react';
import data from './data.json';
import { CloudFog, Moon, CloudMoon } from 'lucide-react';

const IconGlyph = ({ kind, size = 18, color = 'rgba(255,255,255,0.9)' }: { kind: string; size?: number; color?: string }) => {
  if (kind === 'fog') return <CloudFog size={size} color={color} strokeWidth={1.8} />;
  if (kind === 'moon') return <Moon size={size} color={color} strokeWidth={1.8} />;
  return <CloudMoon size={size} color={color} strokeWidth={1.8} />;
};

export default function Widget() {
  const hours = data.forecastHours || [];

  const cardStyle: React.CSSProperties = {
    width: 48,
    height: 64,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(5,16,40,0.25)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0 8px 0',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: 0.2,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 1,
  };

  const tempStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1,
  };

  return (
    <section
      data-eid="root"
      style={{
        width: 352,
        height: 222,
        borderRadius: 22,
        padding: 14,
        boxSizing: 'border-box',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(120% 120% at 18% 25%, rgba(134,165,235,0.85) 0%, rgba(72,102,160,0.55) 30%, rgba(24,44,86,0.65) 55%, rgba(11,20,45,0.98) 100%)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
      }}
    >
      {/* subtle top-right vignette */}
      <div
        style={{
          position: 'absolute',
          inset: -40,
          background:
            'radial-gradient(70% 70% at 80% 25%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 35%, rgba(0,0,0,0) 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        data-eid="alert-banner"
        style={{
          height: 26,
          borderRadius: 12,
          border: '1px solid rgba(255,203,112,0.55)',
          background: 'linear-gradient(90deg, rgba(255,210,133,0.35), rgba(255,210,133,0.12))',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          boxSizing: 'border-box',
          color: 'rgba(255,255,255,0.92)',
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        {data.alert}
      </div>

      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div
            data-eid="current-temp"
            style={{
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: -0.6,
              lineHeight: 1,
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {data.currentTemp}
          </div>
          <div
            data-eid="high-low"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.70)',
              fontWeight: 600,
            }}
          >
            {data.highLow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <div data-eid="weather-icon" style={{ height: 18, display: 'flex', alignItems: 'center' }}>
            <IconGlyph kind={data.headerIcon} size={18} color="rgba(255,255,255,0.92)" />
          </div>
          <div
            data-eid="city-name"
            style={{
              fontSize: 18,
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {data.city}
          </div>
          <div
            data-eid="condition-text"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.70)',
            }}
          >
            {data.condition}
          </div>
        </div>
      </header>

      <div
        data-eid="stats-row"
        style={{
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          marginBottom: 10,
          paddingLeft: 2,
          color: 'rgba(255,255,255,0.68)',
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        <span data-eid="stat-feels">{data.stats.feels}</span>
        <span data-eid="stat-humidity">{data.stats.humidity}</span>
        <span data-eid="stat-wind">{data.stats.wind}</span>
      </div>

      <div
        data-eid="forecast-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 8,
          alignItems: 'stretch',
        }}
      >
        {/* hour 0 with required sub-elements */}
        <div data-eid="hour-0" style={cardStyle}>
          <span data-eid="hour-0-time" style={timeStyle}>
            {hours[0]?.time}
          </span>
          <span data-eid="hour-0-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconGlyph kind={hours[0]?.icon || 'moon'} size={18} color="rgba(255,255,255,0.90)" />
          </span>
          <strong data-eid="hour-0-temp" style={tempStyle}>
            {hours[0]?.temp}
          </strong>
        </div>

        <div data-eid="hour-1" style={cardStyle}>
          <span style={timeStyle}>{hours[1]?.time}</span>
          <span style={{ display: 'flex' }}>
            <IconGlyph kind={hours[1]?.icon || 'moon'} size={18} color="rgba(255,255,255,0.90)" />
          </span>
          <strong style={tempStyle}>{hours[1]?.temp}</strong>
        </div>

        <div data-eid="hour-2" style={cardStyle}>
          <span style={timeStyle}>{hours[2]?.time}</span>
          <span style={{ display: 'flex' }}>
            <IconGlyph kind={hours[2]?.icon || 'moon'} size={18} color="rgba(255,255,255,0.90)" />
          </span>
          <strong style={tempStyle}>{hours[2]?.temp}</strong>
        </div>

        <div data-eid="hour-3" style={cardStyle}>
          <span style={timeStyle}>{hours[3]?.time}</span>
          <span style={{ display: 'flex' }}>
            <IconGlyph kind={hours[3]?.icon || 'moon'} size={18} color="rgba(255,255,255,0.90)" />
          </span>
          <strong style={tempStyle}>{hours[3]?.temp}</strong>
        </div>

        <div data-eid="hour-4" style={cardStyle}>
          <span style={timeStyle}>{hours[4]?.time}</span>
          <span style={{ display: 'flex' }}>
            <IconGlyph kind={hours[4]?.icon || 'moon'} size={18} color="rgba(255,255,255,0.90)" />
          </span>
          <strong style={tempStyle}>{hours[4]?.temp}</strong>
        </div>

        <div data-eid="hour-5" style={cardStyle}>
          <span style={timeStyle}>{hours[5]?.time}</span>
          <span style={{ display: 'flex' }}>
            <IconGlyph kind={hours[5]?.icon || 'moon'} size={18} color="rgba(255,255,255,0.90)" />
          </span>
          <strong style={tempStyle}>{hours[5]?.temp}</strong>
        </div>
      </div>
    </section>
  );
}