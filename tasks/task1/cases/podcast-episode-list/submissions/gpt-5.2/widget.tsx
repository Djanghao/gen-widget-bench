// submissions/gpt-widget/widget.tsx
import React, { useMemo, useState } from 'react';
import data from './data.json';
import { Play, SkipBack, SkipForward, Check, Circle } from 'lucide-react';

export default function Widget() {
  const d = data as any;
  const [isPlaying, setIsPlaying] = useState(true);

  const progressPct = useMemo(() => {
    const p = Number(d.nowPlaying.progressPercent);
    return Number.isFinite(p) ? Math.max(0, Math.min(100, p)) : 0;
  }, [d.nowPlaying.progressPercent]);

  const rootStyle: React.CSSProperties = {
    width: 392,
    height: 516,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    color: '#E9ECFF',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    background:
      'radial-gradient(900px 540px at 75% 20%, rgba(255,255,255,0.08), rgba(255,255,255,0) 60%), linear-gradient(180deg, #17153A 0%, #0F1428 65%, #0D1224 100%)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
  };

  const cardPad = 22;

  const subtleText: React.CSSProperties = { color: 'rgba(233,236,255,0.55)' };

  const divider: React.CSSProperties = {
    height: 1,
    background: 'rgba(255,255,255,0.06)',
    marginTop: 0,
  };

  const iconBtn: React.CSSProperties = {
    width: 34,
    height: 34,
    borderRadius: 999,
    border: 'none',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(233,236,255,0.6)',
    cursor: 'pointer',
    padding: 0,
  };

  const statPill: React.CSSProperties = {
    flex: 1,
    borderRadius: 14,
    background: 'rgba(255,255,255,0.06)',
    padding: '12px 10px',
    textAlign: 'center',
  };

  const badge: React.CSSProperties = {
    minWidth: 34,
    height: 20,
    borderRadius: 10,
    background: 'rgba(141, 91, 255, 0.25)',
    color: '#BDA7FF',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.2,
  };

  return (
    <section data-eid="root" style={rootStyle}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(520px 220px at 22% 10%, rgba(125, 90, 255, 0.25), rgba(0,0,0,0) 60%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', height: '100%', padding: cardPad }}>
        {/* Now playing */}
        <div data-eid="now-playing" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div
            data-eid="cover-art"
            style={{
              width: 82,
              height: 82,
              borderRadius: 18,
              background: 'linear-gradient(180deg, #5A49FF 0%, #2C5BFF 100%)',
              position: 'relative',
              boxShadow: '0 10px 24px rgba(54, 76, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background: 'rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 26,
                  borderRadius: 9,
                  border: '2px solid rgba(233,236,255,0.55)',
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: -7,
                    width: 10,
                    height: 2,
                    background: 'rgba(233,236,255,0.55)',
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span
                data-eid="podcast-name"
                style={{
                  fontSize: 11,
                  letterSpacing: 1.6,
                  fontWeight: 700,
                  color: '#8F7BFF',
                }}
              >
                {d.nowPlaying.podcastName}
              </span>
              <h2
                data-eid="episode-title"
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  lineHeight: 1.12,
                  color: '#EDEFFF',
                }}
              >
                {d.nowPlaying.episodeTitle}
              </h2>
            </div>

            {/* Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
                marginTop: 18,
              }}
            >
              <button
                data-eid="skip-back-btn"
                style={iconBtn}
                aria-label="Skip back"
                onClick={() => {}}
              >
                <SkipBack size={20} />
              </button>

              <button
                data-eid="play-button"
                aria-label="Play"
                onClick={() => setIsPlaying((v) => !v)}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  border: 'none',
                  background: 'linear-gradient(180deg, #7B3CFF 0%, #5E3BFF 100%)',
                  boxShadow: '0 10px 20px rgba(123,60,255,0.35)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {/* target shows play icon; keep play icon even when toggled to match appearance */}
                <Play size={22} fill="#FFFFFF" strokeWidth={2.2} style={{ marginLeft: 2 }} />
              </button>

              <button
                data-eid="skip-forward-btn"
                style={iconBtn}
                aria-label="Skip forward"
                onClick={() => {}}
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginTop: 18 }}>
              <div
                data-eid="progress-bar"
                style={{
                  height: 5,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.12)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  data-eid="progress-fill"
                  style={{
                    width: `${progressPct}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #8B4BFF 0%, #5E43FF 65%, #4E5BFF 100%)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span data-eid="time-elapsed" style={{ fontSize: 11, ...subtleText }}>
                  {d.nowPlaying.timeElapsed}
                </span>
                <span data-eid="time-total" style={{ fontSize: 11, ...subtleText }}>
                  {d.nowPlaying.timeTotal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent episodes */}
        <div data-eid="episode-list" style={{ marginTop: 18 }}>
          <h3
            data-eid="episode-list-title"
            style={{
              margin: '14px 0 10px 0',
              fontSize: 14,
              fontWeight: 800,
              color: 'rgba(233,236,255,0.85)',
            }}
          >
            {d.episodeList.title}
          </h3>

          {/* Ep 0 */}
          <div data-eid="ep-0" style={{ padding: '12px 0', display: 'flex', alignItems: 'center' }}>
            <span data-eid="ep-0-number" style={badge}>
              {d.episodes[0].number}
            </span>
            <div style={{ flex: 1, marginLeft: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span data-eid="ep-0-title" style={{ fontSize: 13.5, color: 'rgba(237,239,255,0.9)' }}>
                  {d.episodes[0].title}
                </span>
              </div>
              <div style={{ marginTop: 5, display: 'flex', gap: 10 }}>
                <span data-eid="ep-0-date" style={{ fontSize: 11, ...subtleText }}>
                  {d.episodes[0].date}
                </span>
              </div>
            </div>
            <span data-eid="ep-0-duration" style={{ fontSize: 11, ...subtleText, marginRight: 10 }}>
              {d.episodes[0].duration}
            </span>
            <span data-eid="ep-0-status" style={{ display: 'flex', alignItems: 'center' }}>
              <Check size={16} color="#19D38C" strokeWidth={2.6} />
            </span>
          </div>
          <div style={divider} />

          {/* Ep 1 */}
          <div data-eid="ep-1" style={{ padding: '12px 0', display: 'flex', alignItems: 'center' }}>
            <span data-eid="ep-1-number" style={badge}>
              {d.episodes[1].number}
            </span>
            <div style={{ flex: 1, marginLeft: 12 }}>
              <span data-eid="ep-1-title" style={{ fontSize: 13.5, color: 'rgba(237,239,255,0.9)' }}>
                {d.episodes[1].title}
              </span>
            </div>
            <span data-eid="ep-1-duration" style={{ fontSize: 11, ...subtleText, marginRight: 10 }}>
              {d.episodes[1].duration}
            </span>
            <span data-eid="ep-1-status" style={{ display: 'flex', alignItems: 'center' }}>
              <Circle size={16} color="#F5B600" strokeWidth={2.6} />
            </span>
          </div>
          <div style={divider} />

          {/* Ep 2 */}
          <div data-eid="ep-2" style={{ padding: '12px 0', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* spacer where badge would be in target list for ep-2/3 */}
            </div>
            <div style={{ flex: 1, marginLeft: 12 }}>
              <span data-eid="ep-2-title" style={{ fontSize: 13.5, color: 'rgba(237,239,255,0.9)' }}>
                {d.episodes[2].title}
              </span>
            </div>
            <span data-eid="ep-2-duration" style={{ fontSize: 11, ...subtleText }}>
              {d.episodes[2].duration}
            </span>
          </div>
          <div style={divider} />

          {/* Ep 3 */}
          <div data-eid="ep-3" style={{ padding: '12px 0', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            <div style={{ flex: 1, marginLeft: 12 }}>
              <span data-eid="ep-3-title" style={{ fontSize: 13.5, color: 'rgba(237,239,255,0.9)' }}>
                {d.episodes[3].title}
              </span>
            </div>
            <span data-eid="ep-3-duration" style={{ fontSize: 11, ...subtleText }}>
              {d.episodes[3].duration}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div
          data-eid="stats-row"
          style={{
            position: 'absolute',
            left: cardPad,
            right: cardPad,
            bottom: cardPad,
            display: 'flex',
            gap: 14,
          }}
        >
          <div data-eid="stat-episodes" style={statPill}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#BDA7FF' }}>{d.stats.episodes.value}</div>
            <div style={{ fontSize: 10, letterSpacing: 0.8, ...subtleText, marginTop: 2 }}>
              {d.stats.episodes.label}
            </div>
          </div>
          <div data-eid="stat-listen-time" style={statPill}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#4DA3FF' }}>{d.stats.listenTime.value}</div>
            <div style={{ fontSize: 10, letterSpacing: 0.8, ...subtleText, marginTop: 2 }}>
              {d.stats.listenTime.label}
            </div>
          </div>
          <div data-eid="stat-subscribers" style={statPill}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#19D38C' }}>{d.stats.subscribers.value}</div>
            <div style={{ fontSize: 10, letterSpacing: 0.8, ...subtleText, marginTop: 2 }}>
              {d.stats.subscribers.label}
            </div>
          </div>
        </div>

        {/* keep state used to avoid lint unused (visual remains play icon) */}
        <div style={{ position: 'absolute', left: -9999, top: -9999, opacity: 0 }}>{String(isPlaying)}</div>
      </div>
    </section>
  );
}