import React from 'react';
import data from './data.json';
import { Music2, Shuffle, SkipBack, SkipForward, Repeat, Pause } from 'lucide-react';

function parseTime(t: string): number {
  const [m, s] = t.split(':').map(Number);
  return (m || 0) * 60 + (s || 0);
}

const Widget: React.FC = () => {
  const elapsed = parseTime(data.elapsed);
  const total = parseTime(data.total);
  const progress = Math.min(100, Math.max(0, (elapsed / (total || 1)) * 100));

  return (
    <section
      data-eid="root"
      style={{
        width: 360,
        borderRadius: 28,
        padding: 20,
        background: 'linear-gradient(180deg, #0f243a 0%, #0c1f33 100%)',
        color: '#e8f0f6',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
      }}
    >
      <div
        data-eid="album-art"
        style={{
          height: 190,
          borderRadius: 18,
          background:
            'linear-gradient(135deg, #ff5b6e 0%, #6b49db 60%, #2a2e7f 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <Music2 color="#eef5fb" size={44} />
      </div>

      <div data-eid="track-info" style={{ textAlign: 'center', marginBottom: 14 }}>
        <div
          data-eid="track-name"
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 0.2,
            marginBottom: 4,
            color: '#f0f6fb',
          }}
        >
          {data.track}
        </div>
        <div
          data-eid="artist-name"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#cbd7e3',
            marginBottom: 2,
          }}
        >
          {data.artist}
        </div>
        <div
          data-eid="album-name"
          style={{ fontSize: 12, color: '#9bb0c2' }}
        >
          {data.album}
        </div>
      </div>

      <div data-eid="progress-section" style={{ marginTop: 10, marginBottom: 8 }}>
        <div
          data-eid="progress-bar"
          style={{
            height: 6,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.15)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: 6,
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#ff5b6e',
              borderRadius: 999,
            }}
          />
        </div>
        <div
          data-eid="time-display"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: '#9cb2c6',
          }}
        >
          <span data-eid="elapsed-time">{data.elapsed}</span>
          <span data-eid="total-time">{data.total}</span>
        </div>
      </div>

      <div
        data-eid="controls"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          marginTop: 6,
          marginBottom: 12,
        }}
      >
        <span data-eid="btn-shuffle" style={{ color: '#a7bfd4' }}>
          <Shuffle size={20} />
        </span>
        <span data-eid="btn-prev" style={{ color: '#a7bfd4' }}>
          <SkipBack size={20} />
        </span>
        <span
          data-eid="btn-play"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 54,
            height: 54,
            borderRadius: '50%',
            background: '#ff5b6e',
            boxShadow: '0 6px 16px rgba(255,91,110,0.5)',
            color: '#ffffff',
          }}
        >
          <Pause size={28} />
        </span>
        <span data-eid="btn-next" style={{ color: '#a7bfd4' }}>
          <SkipForward size={20} />
        </span>
        <span data-eid="btn-repeat" style={{ color: '#a7bfd4' }}>
          <Repeat size={20} />
        </span>
      </div>

      <div data-eid="queue-section">
        <div
          data-eid="queue-label"
          style={{
            fontSize: 11,
            letterSpacing: 2,
            color: '#8fa6ba',
            marginBottom: 10,
          }}
        >
          UP NEXT
        </div>

        {[0, 1, 2].map((i) => {
          const item = data.queue[i];
          return (
            <div
              key={i}
              data-eid={`queue-item-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '10px 12px',
                marginBottom: 10,
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9db3c6',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {item.index}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#f0f6fb', fontWeight: 800, fontSize: 14, marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ color: '#a2b6c8', fontSize: 12 }}>{item.artist}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Widget;