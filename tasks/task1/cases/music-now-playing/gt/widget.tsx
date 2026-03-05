import { Shuffle, SkipBack, SkipForward, Pause, Play, Repeat, Music } from 'lucide-react'
import data from './data.json'

type MusicData = {
  track: string
  artist: string
  album: string
  albumArt: string
  durationSec: number
  elapsedSec: number
  isPlaying: boolean
  shuffle: boolean
  repeat: string
  queue: Array<{ track: string; artist: string }>
}

const music = data as MusicData

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Widget() {
  const progress = music.elapsedSec / music.durationSec

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: 24,
        color: '#f0f0f0',
        display: 'grid',
        gap: 12,
        maxWidth: 360,
        overflow: 'hidden',
        padding: 16,
        width: '100%',
      }}
    >
      <div
        data-eid="album-art"
        style={{
          aspectRatio: '1',
          background: 'linear-gradient(135deg, #e94560 0%, #533483 50%, #0f3460 100%)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          maxHeight: 200,
          width: '100%',
        }}
      >
        <Music size={48} strokeWidth={1.5} />
      </div>

      <div data-eid="track-info" style={{ display: 'grid', gap: 2, textAlign: 'center' }}>
        <div data-eid="track-name" style={{ fontSize: 18, fontWeight: 700 }}>{music.track}</div>
        <div data-eid="artist-name" style={{ color: '#a0b4d0', fontSize: 14 }}>{music.artist}</div>
        <div data-eid="album-name" style={{ color: '#7a8da6', fontSize: 12 }}>{music.album}</div>
      </div>

      <div data-eid="progress-section" style={{ display: 'grid', gap: 4 }}>
        <div
          data-eid="progress-bar"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 4,
            height: 4,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              background: '#e94560',
              borderRadius: 4,
              height: '100%',
              width: `${(progress * 100).toFixed(1)}%`,
            }}
          />
        </div>
        <div data-eid="time-display" style={{ color: '#a0b4d0', display: 'flex', fontSize: 11, justifyContent: 'space-between' }}>
          <span data-eid="elapsed-time">{formatTime(music.elapsedSec)}</span>
          <span data-eid="total-time">{formatTime(music.durationSec)}</span>
        </div>
      </div>

      <div
        data-eid="controls"
        style={{
          alignItems: 'center',
          display: 'flex',
          fontSize: 14,
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <span data-eid="btn-shuffle" style={{ color: music.shuffle ? '#e94560' : '#7a8da6', cursor: 'pointer' }}><Shuffle size={18} /></span>
        <span data-eid="btn-prev" style={{ cursor: 'pointer' }}><SkipBack size={22} /></span>
        <span
          data-eid="btn-play"
          style={{
            background: '#e94560',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 44,
            width: 44,
          }}
        >
          {music.isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </span>
        <span data-eid="btn-next" style={{ cursor: 'pointer' }}><SkipForward size={22} /></span>
        <span data-eid="btn-repeat" style={{ color: music.repeat !== 'off' ? '#e94560' : '#7a8da6', cursor: 'pointer' }}><Repeat size={18} /></span>
      </div>

      <div data-eid="queue-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="queue-label" style={{ color: '#7a8da6', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>Up Next</div>
        {music.queue.map((item, i) => (
          <div
            key={item.track}
            data-eid={`queue-item-${i}`}
            style={{
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 8,
              display: 'flex',
              gap: 10,
              padding: '8px 10px',
            }}
          >
            <span style={{ color: '#7a8da6', fontSize: 12, width: 16 }}>{i + 1}</span>
            <div style={{ display: 'grid', gap: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{item.track}</span>
              <span style={{ color: '#a0b4d0', fontSize: 11 }}>{item.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
