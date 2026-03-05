import React from 'react';
import { Circle, Trophy, Clock, Flag, ArrowRightLeft, AlertTriangle, MapPin, User } from 'lucide-react';
import data from './data.json';

const c = {
  bg: '#064e3b',
  card: 'rgba(5, 63, 49, 0.9)',
  border: 'rgba(255, 255, 255, 0.15)',
  text: '#ffffff',
  dim: '#a7f3d0',
  accent: '#f59e0b',
  green: '#22c55e',
  red: '#ef4444',
  yellow: '#f59e0b',
  pitch: '#053f31',
  pitchLine: 'rgba(255,255,255,0.3)',
  white: '#ffffff',
};

function heatColor(v: number): string {
  if (v >= 15) return '#f59e0b';
  if (v >= 12) return '#fbbf24';
  if (v >= 9) return '#22c55e';
  if (v >= 6) return '#16a34a';
  if (v >= 4) return '#15803d';
  if (v >= 2) return '#166534';
  return '#14532d';
}

const eventIcons: Record<string, { icon: string; color: string }> = {
  goal: { icon: '\u26BD', color: c.accent },
  yellow: { icon: '\uD83D\uDFE8', color: c.yellow },
  red: { icon: '\uD83D\uDFE5', color: c.red },
  sub: { icon: '\u21C4', color: c.white },
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: `linear-gradient(170deg, ${c.bg} 0%, #065f46 50%, #053f31 100%)`,
        borderRadius: 16,
        color: c.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        maxWidth: 480,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Scoreboard */}
      <div
        data-eid="scoreboard"
        style={{
          background: 'linear-gradient(135deg, rgba(5,63,49,0.95) 0%, rgba(6,78,59,0.95) 100%)',
          border: `2px solid rgba(255,255,255,0.2)`,
          borderRadius: 12,
          padding: 16,
          textAlign: 'center',
        }}
      >
        <span data-eid="competition-label" style={{ fontSize: 9, color: c.dim, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          <Trophy size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} color={c.accent} />
          {data.competition}
        </span>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div data-eid="home-badge" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: `2px solid ${c.white}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontSize: 12, fontWeight: 700, color: '#fff' }}>
              {data.home.shortName}
            </div>
            <span data-eid="home-name" style={{ fontSize: 12, fontWeight: 700, display: 'block', color: '#fff' }}>{data.home.name}</span>
          </div>
          <div data-eid="score-display" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span data-eid="home-score" style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{data.home.score}</span>
            <span data-eid="score-separator" style={{ fontSize: 24, color: c.dim }}>-</span>
            <span data-eid="away-score" style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{data.away.score}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div data-eid="away-badge" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', border: `2px solid ${c.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontSize: 12, fontWeight: 700, color: c.accent }}>
              {data.away.shortName}
            </div>
            <span data-eid="away-name" style={{ fontSize: 12, fontWeight: 700, display: 'block', color: c.accent }}>{data.away.name}</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 8 }}>
          <span data-eid="match-time" style={{ fontSize: 14, fontWeight: 700, color: c.accent }}>
            <Clock size={12} style={{ verticalAlign: 'middle', marginRight: 3 }} />
            {data.matchTime}
          </span>
          <span data-eid="match-status" style={{ fontSize: 10, color: '#fff', background: 'rgba(34,197,94,0.25)', padding: '2px 8px', borderRadius: 8, border: '1px solid rgba(34,197,94,0.4)' }}>
            {data.matchStatus}
          </span>
        </div>
      </div>

      {/* Formation */}
      <div data-eid="formation-section">
        <h2 data-eid="formation-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Formations
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span data-eid="home-formation-label" style={{ fontSize: 10, color: c.white }}>{data.home.name} ({data.home.formation})</span>
          <span data-eid="away-formation-label" style={{ fontSize: 10, color: c.accent }}>{data.away.name} ({data.away.formation})</span>
        </div>
        <div
          data-eid="formation-pitch"
          style={{
            background: c.pitch,
            borderRadius: 8,
            height: 180,
            position: 'relative',
            overflow: 'hidden',
            border: `2px solid ${c.pitchLine}`,
          }}
        >
          {/* Pitch markings */}
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: c.pitchLine }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 40, height: 40, borderRadius: '50%', border: `1px solid ${c.pitchLine}` }} />

          {/* Home players (white dots, bottom half) */}
          {data.home.players.map((p, i) => (
            <span
              key={`h-${i}`}
              data-eid={`home-player-${i}`}
              style={{
                position: 'absolute',
                left: `${p.pos[0]}%`,
                top: `${p.pos[1]}%`,
                transform: 'translate(-50%, -50%)',
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 7,
                fontWeight: 800,
                color: '#064e3b',
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              {p.number}
            </span>
          ))}

          {/* Away players (gold dots, top half) */}
          {data.away.players.map((p, i) => (
            <span
              key={`a-${i}`}
              data-eid={`away-player-${i}`}
              style={{
                position: 'absolute',
                left: `${p.pos[0]}%`,
                top: `${p.pos[1]}%`,
                transform: 'translate(-50%, -50%)',
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'rgba(245,158,11,0.9)',
                border: '2px solid #f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 7,
                fontWeight: 800,
                color: '#000',
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              {p.number}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div data-eid="stats-section">
        <h2 data-eid="stats-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Match Statistics
        </h2>
        {data.stats.map((stat) => {
          const total = stat.key === 'possession' ? 100 : stat.home + stat.away;
          const homePct = total > 0 ? (stat.home / total) * 100 : 50;
          return (
            <div key={stat.key} data-eid={`stat-${stat.key}`} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                <span data-eid={`stat-${stat.key}-home`} style={{ fontWeight: 700, minWidth: 30, color: '#fff' }}>
                  {stat.key === 'possession' ? `${stat.home}%` : stat.home}
                </span>
                <span data-eid={`stat-${stat.key}-label`} style={{ color: c.dim, fontSize: 10 }}>
                  {stat.label}
                </span>
                <span data-eid={`stat-${stat.key}-away`} style={{ fontWeight: 700, minWidth: 30, textAlign: 'right', color: c.accent }}>
                  {stat.key === 'possession' ? `${stat.away}%` : stat.away}
                </span>
              </div>
              <div data-eid={`stat-${stat.key}-bar`} style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', gap: 2 }}>
                <div style={{ width: `${homePct}%`, background: c.white, borderRadius: 2 }} />
                <div style={{ width: `${100 - homePct}%`, background: c.accent, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Events Timeline */}
      <div data-eid="events-section" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 10 }}>
        <h2 data-eid="events-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Match Events
        </h2>
        <div data-eid="events-list" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.events.map((evt, i) => {
            const ev = eventIcons[evt.type] || { icon: '?', color: c.dim };
            const isHome = evt.team === 'home';
            return (
              <div
                key={i}
                data-eid={`event-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 6px',
                  borderRadius: 6,
                  background: isHome ? 'rgba(255,255,255,0.05)' : 'rgba(245,158,11,0.08)',
                  borderLeft: `3px solid ${isHome ? c.white : c.accent}`,
                }}
              >
                <span data-eid={`event-${i}-time`} style={{ fontSize: 11, fontWeight: 700, color: c.accent, minWidth: 30, fontVariantNumeric: 'tabular-nums' }}>
                  {evt.minute}
                </span>
                <span data-eid={`event-${i}-icon`} style={{ fontSize: 14 }}>
                  {ev.icon}
                </span>
                <span data-eid={`event-${i}-detail`} style={{ fontSize: 10 }}>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{evt.player}</span>
                  <span style={{ color: c.dim }}> - {evt.detail}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Player Ratings */}
      <div data-eid="ratings-section">
        <h2 data-eid="ratings-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
          <User size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Top Player Ratings
        </h2>
        <div data-eid="ratings-table" style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {data.ratings.map((r, i) => {
            const ratingColor = r.rating >= 8.0 ? c.accent : r.rating >= 7.0 ? c.green : c.dim;
            return (
              <div
                key={i}
                data-eid={`rating-row-${i}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 8px',
                  background: c.card,
                  borderRadius: 6,
                  border: `1px solid ${c.border}`,
                }}
              >
                <span data-eid={`rating-row-${i}-name`} style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: r.team === 'home' ? c.white : c.accent, marginRight: 6 }} />
                  {r.name}
                </span>
                <span
                  data-eid={`rating-row-${i}-score`}
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: ratingColor,
                    background: `${ratingColor}20`,
                    padding: '2px 8px',
                    borderRadius: 6,
                  }}
                >
                  {r.rating.toFixed(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Heatmap */}
      <div data-eid="heatmap-section">
        <h2 data-eid="heatmap-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Touch Heatmap (Home)
        </h2>
        <div
          data-eid="heatmap-grid"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            background: c.pitch,
            borderRadius: 8,
            padding: 4,
            border: `2px solid ${c.pitchLine}`,
          }}
        >
          {data.heatmap.map((row, ri) => (
            <div
              key={ri}
              data-eid={`heatmap-row-${ri}`}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2 }}
            >
              {row.map((v, ci) => (
                <div
                  key={ci}
                  style={{
                    background: heatColor(v),
                    opacity: 0.75,
                    borderRadius: 2,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 7,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div data-eid="heatmap-legend" style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 8, color: c.dim, justifyContent: 'center' }}>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#14532d', marginRight: 3 }} />Low</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#22c55e', marginRight: 3 }} />Medium</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#f59e0b', marginRight: 3 }} />High</span>
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${c.border}`, paddingTop: 8, fontSize: 9, color: c.dim }}>
        <span data-eid="footer-venue">
          <MapPin size={9} style={{ verticalAlign: 'middle', marginRight: 2 }} />
          {data.venue}
        </span>
        <span data-eid="footer-referee">Ref: {data.referee}</span>
        <span data-eid="footer-attendance">{data.attendance.toLocaleString()} fans</span>
      </footer>
    </section>
  );
}
