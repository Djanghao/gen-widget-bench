// submissions/<your-model-name>/widget.tsx
import React from 'react';
import { Smartphone, Laptop, Tablet, Watch, Headphones, Speaker, Zap } from 'lucide-react';
import data from './data.json';

type Device = {
  name: string;
  subtitle: string;
  percent: number;
  color: string;
  icon: 'smartphone' | 'laptop' | 'tablet' | 'watch' | 'headphones' | 'speaker';
  charging?: boolean;
};

const iconFor = (k: Device['icon']) => {
  const common = { size: 18, strokeWidth: 2 };
  switch (k) {
    case 'smartphone':
      return <Smartphone {...common} />;
    case 'laptop':
      return <Laptop {...common} />;
    case 'tablet':
      return <Tablet {...common} />;
    case 'watch':
      return <Watch {...common} />;
    case 'headphones':
      return <Headphones {...common} />;
    case 'speaker':
      return <Speaker {...common} />;
    default:
      return <Smartphone {...common} />;
  }
};

export default function Widget() {
  const devices: Device[] = data.devices;

  const outer: React.CSSProperties = {
    width: 455,
    height: 530,
    borderRadius: 20,
    padding: 18,
    boxSizing: 'border-box',
    color: '#EAF0FF',
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    background:
      'radial-gradient(120% 120% at 10% 5%, rgba(129,96,255,0.18) 0%, rgba(14,17,34,0.0) 45%), radial-gradient(120% 120% at 90% 10%, rgba(64,148,255,0.14) 0%, rgba(14,17,34,0.0) 55%), linear-gradient(180deg, #0B0E1F 0%, #0A0D1A 60%, #070A12 100%)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
    position: 'relative',
    overflow: 'hidden',
  };

  const headerRow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2px 2px 12px 2px',
  };

  const titleRow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.2,
  };

  const titleIconBox: React.CSSProperties = {
    width: 22,
    height: 22,
    display: 'grid',
    placeItems: 'center',
    color: '#BFA7FF',
  };

  const syncStyle: React.CSSProperties = {
    fontSize: 12,
    color: 'rgba(199,210,255,0.55)',
    letterSpacing: 0.2,
  };

  const listWrap: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 2,
  };

  const card: React.CSSProperties = {
    borderRadius: 14,
    padding: 14,
    display: 'grid',
    gridTemplateColumns: '42px 1fr auto',
    columnGap: 12,
    alignItems: 'center',
    background:
      'linear-gradient(180deg, rgba(124,102,255,0.10) 0%, rgba(86,74,180,0.07) 45%, rgba(42,36,92,0.06) 100%)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
  };

  const iconPill: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.05)',
    display: 'grid',
    placeItems: 'center',
    border: '1px solid rgba(255,255,255,0.05)',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 650,
    color: 'rgba(235,242,255,0.92)',
    lineHeight: 1.15,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  };

  const subtitleStyle: React.CSSProperties = {
    marginTop: 4,
    fontSize: 11.5,
    color: 'rgba(199,210,255,0.45)',
  };

  const pctStyleBase: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 0.2,
    paddingLeft: 10,
  };

  const track: React.CSSProperties = {
    height: 6,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.08)',
    marginTop: 10,
    overflow: 'hidden',
    position: 'relative',
  };

  const summaryStyle: React.CSSProperties = {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 14,
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'rgba(199,210,255,0.65)',
    fontSize: 12.5,
  };

  const summaryLeft: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  const summaryRight: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'rgba(255,160,160,0.9)',
  };

  return (
    <section data-eid="root" style={outer}>
      <header data-eid="header" style={headerRow}>
        <div data-eid="title" style={titleRow}>
          <span style={titleIconBox} aria-hidden="true">
            {/* small stacked-devices glyph */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="5.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <rect x="14" y="12.5" width="6.5" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M18.2 16.2h-1.9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          {data.title}
        </div>
        <span data-eid="sync-time" style={syncStyle}>
          {data.synced}
        </span>
      </header>

      <div data-eid="device-list" style={listWrap}>
        {devices.map((d, idx) => {
          const rowEid = `device-${idx}` as const;
          const iconEid = `device-${idx}-icon` as const;
          const nameEid = `device-${idx}-name` as const;
          const pctEid = `device-${idx}-pct` as const;
          const barEid = `device-${idx}-bar` as const;
          const chargingEid = `device-${idx}-charging` as const;

          return (
            <div key={d.name} data-eid={rowEid} style={card}>
              <span data-eid={iconEid} style={{ ...iconPill, color: d.color }}>
                {iconFor(d.icon)}
              </span>

              <div style={{ minWidth: 0 }}>
                <div data-eid={nameEid} style={nameStyle}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
                  {d.charging ? (
                    <span data-eid={chargingEid} style={{ color: '#FFC52C', display: 'inline-flex' }}>
                      <Zap size={14} strokeWidth={2.4} />
                    </span>
                  ) : null}
                </div>
                <div style={subtitleStyle}>{d.subtitle}</div>
                <div data-eid={barEid} style={track}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.max(0, Math.min(100, d.percent))}%`,
                      background: d.color,
                      borderRadius: 999,
                      boxShadow: `0 0 0 1px rgba(0,0,0,0.1), 0 6px 14px ${d.color}22`,
                    }}
                  />
                </div>
              </div>

              <span data-eid={pctEid} style={{ ...pctStyleBase, color: d.color }}>
                {d.percent}%
              </span>
            </div>
          );
        })}
      </div>

      <div data-eid="summary" style={summaryStyle}>
        <span data-eid="charging-count" style={summaryLeft}>
          <span style={{ color: '#FFC52C', display: 'inline-flex' }}>
            <Zap size={14} strokeWidth={2.4} />
          </span>
          {data.summary.charging}
        </span>

        <span data-eid="low-battery-alert" style={summaryRight}>
          <span aria-hidden="true" style={{ display: 'inline-flex', color: 'rgba(255,120,120,0.95)' }}>
            {/* small battery-low glyph */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect
                x="3.5"
                y="7.5"
                width="16"
                height="9"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M20 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <rect x="5.8" y="10" width="4.2" height="4" rx="1" fill="currentColor" opacity="0.95" />
            </svg>
          </span>
          {data.summary.lowest}
        </span>
      </div>
    </section>
  );
}