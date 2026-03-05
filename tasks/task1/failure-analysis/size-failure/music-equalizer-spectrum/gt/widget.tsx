import { Music, Headphones, Volume2, SkipBack, SkipForward, Play, Shuffle, Repeat, ListMusic } from 'lucide-react'
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine, CartesianGrid } from 'recharts'
import data from './data.json'

type Band = { freq: string; db: number }
type Preset = { name: string; active: boolean }
type QueueItem = { title: string; artist: string; duration: string }
type AudioData = {
  title: string
  bitrate: string
  format: string
  bands: Band[]
  freqLabels: string[]
  dbScale: string[]
  waveform: number[]
  channelLevels: { left: { db: number; pct: number }; right: { db: number; pct: number } }
  nowPlaying: {
    songTitle: string
    artist: string
    album: string
    currentTime: string
    totalTime: string
    progressPct: number
  }
  volume: number
  audioStats: {
    sampleRate: string
    bitDepth: string
    channels: string
    dynamicRange: string
    codec: string
    fileSize: string
  }
  presets: Preset[]
  activePreset: string
  queue: QueueItem[]
}

const audio = data as AudioData

function getBarColor(index: number, total: number): string {
  const ratio = index / (total - 1)
  if (ratio < 0.33) return '#4ade80'
  if (ratio < 0.66) return '#fbbf24'
  return '#ef4444'
}

export default function Widget() {
  const chartData = audio.bands.map((b, i) => ({
    freq: b.freq,
    db: b.db,
    color: getBarColor(i, audio.bands.length),
  }))

  const waveData = audio.waveform.map((v, i) => ({ i, v }))

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0a0a1a 0%, #1a0a2e 40%, #0a1628 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 480,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Volume2 size={20} color="#a78bfa" />
        <div data-eid="title" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>{audio.title}</div>
        <span
          data-eid="badge-bitrate"
          style={{
            background: 'rgba(167,139,250,0.15)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: 10,
            color: '#c4b5fd',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
          }}
        >
          {audio.bitrate}
        </span>
        <span
          data-eid="badge-format"
          style={{
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 10,
            color: '#4ade80',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
          }}
        >
          {audio.format}
        </span>
      </header>

      {/* Spectrum Section */}
      <div data-eid="spectrum-section" style={{ display: 'flex', gap: 6 }}>
        <div
          data-eid="db-scale"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 4,
            paddingBottom: 4,
            width: 30,
          }}
        >
          <span data-eid="db-label-plus12" style={{ fontSize: 9, color: '#64748b', textAlign: 'right' }}>+12</span>
          <span data-eid="db-label-plus6" style={{ fontSize: 9, color: '#64748b', textAlign: 'right' }}>+6</span>
          <span data-eid="db-label-0" style={{ fontSize: 9, color: '#94a3b8', textAlign: 'right', fontWeight: 600 }}>0</span>
          <span data-eid="db-label-minus6" style={{ fontSize: 9, color: '#64748b', textAlign: 'right' }}>-6</span>
          <span data-eid="db-label-minus12" style={{ fontSize: 9, color: '#64748b', textAlign: 'right' }}>-12</span>
        </div>
        <div data-eid="spectrum-chart" style={{ flex: 1, height: 180 }}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }} barCategoryGap="8%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
              <XAxis dataKey="freq" hide />
              <YAxis domain={[-12, 12]} hide />
              <ReferenceLine y={0} stroke="rgba(148,163,184,0.2)" strokeWidth={1} />
              <Bar dataKey="db" radius={[3, 3, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Frequency Labels */}
      <div data-eid="freq-labels" style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 36, paddingRight: 5 }}>
        {audio.freqLabels.map((label, i) => (
          <span key={label} data-eid={`freq-label-${i}`} style={{ fontSize: 8, color: '#64748b', textAlign: 'center' }}>
            {label}
          </span>
        ))}
      </div>

      {/* Waveform Section */}
      <div data-eid="waveform-section" style={{ display: 'grid', gap: 4 }}>
        <div data-eid="waveform-title" style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>Waveform</div>
        <div data-eid="waveform-chart" style={{ height: 60 }}>
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={waveData} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <ReferenceLine y={0} stroke="rgba(148,163,184,0.15)" />
              <Area type="monotone" dataKey="v" stroke="#a78bfa" strokeWidth={1.5} fill="url(#waveGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Meters */}
      <div data-eid="channel-meters" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="meter-left" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span data-eid="meter-left-label" style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', width: 14 }}>L</span>
          <div data-eid="meter-left-bar" style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div data-eid="meter-left-fill" style={{ height: '100%', width: `${audio.channelLevels.left.pct}%`, background: 'linear-gradient(90deg, #4ade80, #fbbf24, #ef4444)', borderRadius: 4 }} />
          </div>
          <span data-eid="meter-left-value" style={{ fontSize: 10, color: '#94a3b8', width: 45, textAlign: 'right' }}>{audio.channelLevels.left.db} dB</span>
        </div>
        <div data-eid="meter-right" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span data-eid="meter-right-label" style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', width: 14 }}>R</span>
          <div data-eid="meter-right-bar" style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div data-eid="meter-right-fill" style={{ height: '100%', width: `${audio.channelLevels.right.pct}%`, background: 'linear-gradient(90deg, #4ade80, #fbbf24, #ef4444)', borderRadius: 4 }} />
          </div>
          <span data-eid="meter-right-value" style={{ fontSize: 10, color: '#94a3b8', width: 45, textAlign: 'right' }}>{audio.channelLevels.right.db} dB</span>
        </div>
      </div>

      {/* Now Playing Card */}
      <div
        data-eid="now-playing"
        style={{
          background: 'rgba(167,139,250,0.08)',
          border: '1px solid rgba(167,139,250,0.2)',
          borderRadius: 14,
          padding: 12,
        }}
      >
        <div data-eid="now-playing-label" style={{ fontSize: 10, fontWeight: 600, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Now Playing</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            data-eid="album-art"
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Music size={24} color="rgba(255,255,255,0.8)" />
          </div>
          <div data-eid="track-info" style={{ flex: 1, display: 'grid', gap: 3 }}>
            <div data-eid="song-title" style={{ fontSize: 14, fontWeight: 600 }}>{audio.nowPlaying.songTitle}</div>
            <div data-eid="artist-name" style={{ fontSize: 11, color: '#94a3b8' }}>{audio.nowPlaying.artist}</div>
            <div data-eid="album-name" style={{ fontSize: 10, color: '#64748b' }}>{audio.nowPlaying.album}</div>
            <div
              data-eid="duration-bar"
              style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 4, overflow: 'hidden', width: '100%' }}
            >
              <div
                data-eid="duration-bar-fill"
                style={{ background: 'linear-gradient(90deg, #a78bfa, #c084fc)', borderRadius: 4, height: '100%', width: `${audio.nowPlaying.progressPct}%` }}
              />
            </div>
            <div data-eid="duration-times" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span data-eid="duration-current" style={{ fontSize: 10, color: '#94a3b8' }}>{audio.nowPlaying.currentTime}</span>
              <span data-eid="duration-total" style={{ fontSize: 10, color: '#94a3b8' }}>{audio.nowPlaying.totalTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div data-eid="playback-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <span data-eid="btn-shuffle" style={{ color: '#64748b', cursor: 'pointer' }}><Shuffle size={16} /></span>
        <span data-eid="btn-prev" style={{ color: '#cbd5e1', cursor: 'pointer' }}><SkipBack size={20} /></span>
        <span
          data-eid="btn-play"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(167,139,250,0.3)',
            border: '1px solid rgba(167,139,250,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Play size={18} color="#c4b5fd" />
        </span>
        <span data-eid="btn-next" style={{ color: '#cbd5e1', cursor: 'pointer' }}><SkipForward size={20} /></span>
        <span data-eid="btn-repeat" style={{ color: '#64748b', cursor: 'pointer' }}><Repeat size={16} /></span>
        <div data-eid="volume-control" style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 12 }}>
          <span data-eid="volume-icon"><Volume2 size={14} color="#94a3b8" /></span>
          <div data-eid="volume-bar" style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <div data-eid="volume-bar-fill" style={{ height: '100%', width: `${audio.volume}%`, background: '#a78bfa', borderRadius: 2 }} />
          </div>
          <span data-eid="volume-value" style={{ fontSize: 9, color: '#94a3b8' }}>{audio.volume}%</span>
        </div>
      </div>

      {/* Audio Stats */}
      <div
        data-eid="audio-stats"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}
      >
        {[
          { eid: 'stat-sample-rate', label: 'Sample Rate', value: audio.audioStats.sampleRate, labelEid: 'stat-sample-rate-label', valueEid: 'stat-sample-rate-value' },
          { eid: 'stat-bit-depth', label: 'Bit Depth', value: audio.audioStats.bitDepth, labelEid: 'stat-bit-depth-label', valueEid: 'stat-bit-depth-value' },
          { eid: 'stat-channels', label: 'Channels', value: audio.audioStats.channels, labelEid: 'stat-channels-label', valueEid: 'stat-channels-value' },
          { eid: 'stat-dynamic-range', label: 'Dynamic Range', value: audio.audioStats.dynamicRange, labelEid: 'stat-dynamic-range-label', valueEid: 'stat-dynamic-range-value' },
          { eid: 'stat-codec', label: 'Codec', value: audio.audioStats.codec, labelEid: 'stat-codec-label', valueEid: 'stat-codec-value' },
          { eid: 'stat-file-size', label: 'File Size', value: audio.audioStats.fileSize, labelEid: 'stat-file-size-label', valueEid: 'stat-file-size-value' },
        ].map((stat) => (
          <div
            key={stat.eid}
            data-eid={stat.eid}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(148,163,184,0.1)',
              borderRadius: 10,
              padding: '6px 6px',
              textAlign: 'center',
            }}
          >
            <span data-eid={stat.labelEid} style={{ fontSize: 8, color: '#64748b', display: 'block', marginBottom: 3 }}>{stat.label}</span>
            <span data-eid={stat.valueEid} style={{ fontSize: 12, fontWeight: 700, color: '#c7d2fe', display: 'block' }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Presets Section */}
      <div data-eid="presets-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="presets-label" style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>
          <Headphones size={13} color="#94a3b8" style={{ marginRight: 5, verticalAlign: 'middle' }} />
          EQ Presets
        </div>
        <div data-eid="preset-row" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {audio.presets.map((preset) => {
            const eidName = preset.name === 'Bass' ? 'bass' : preset.name.toLowerCase()
            return (
              <span
                key={preset.name}
                data-eid={`preset-${eidName}`}
                style={{
                  background: preset.active ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${preset.active ? 'rgba(167,139,250,0.5)' : 'rgba(148,163,184,0.15)'}`,
                  borderRadius: 10,
                  color: preset.active ? '#c4b5fd' : '#94a3b8',
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '4px 12px',
                }}
              >
                {preset.name === 'Bass' ? 'Bass Boost' : preset.name}
              </span>
            )
          })}
        </div>
      </div>

      {/* Up Next Queue */}
      <div data-eid="queue-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="queue-title" style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 5 }}>
          <ListMusic size={13} color="#94a3b8" />
          Up Next
        </div>
        {audio.queue.map((item, i) => (
          <div
            key={i}
            data-eid={`queue-item-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 8px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 8,
              border: '1px solid rgba(148,163,184,0.06)',
            }}
          >
            <span style={{ fontSize: 10, color: '#64748b', width: 16 }}>{i + 1}</span>
            <span data-eid={`queue-item-${i}-title`} style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{item.title}</span>
            <span data-eid={`queue-item-${i}-artist`} style={{ fontSize: 10, color: '#94a3b8' }}>{item.artist}</span>
            <span data-eid={`queue-item-${i}-duration`} style={{ fontSize: 10, color: '#64748b' }}>{item.duration}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
