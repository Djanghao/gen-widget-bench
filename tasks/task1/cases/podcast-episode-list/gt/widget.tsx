import data from './data.json'
import { Play, SkipBack, SkipForward, Check, Clock, Headphones, Users, Mic } from 'lucide-react'

type PodcastData = {
  podcastName: string
  currentEpisode: {
    title: string
    episodeNumber: number
    progressPercent: number
    elapsedTime: string
    totalTime: string
  }
  episodes: Array<{
    number: number
    title: string
    date: string
    duration: string
    status: string
  }>
  stats: {
    totalEpisodes: number
    totalListenTime: string
    subscribers: string
  }
}

const podcast = data as PodcastData

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #1e1b4b 0%, #1a1a2e 40%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e8e8f0',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div data-eid="now-playing" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <div
            data-eid="cover-art"
            style={{
              width: 80,
              height: 80,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mic size={32} color="rgba(255,255,255,0.25)" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span data-eid="podcast-name" style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              {podcast.podcastName}
            </span>
            <h2 data-eid="episode-title" style={{ fontSize: 17, fontWeight: 700, margin: '4px 0 0', lineHeight: 1.3 }}>
              {podcast.currentEpisode.title}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <button
            data-eid="skip-back-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              color: '#94a3b8',
            }}
          >
            <SkipBack size={20} />
          </button>
          <button
            data-eid="play-button"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
            }}
          >
            <Play size={22} fill="#fff" />
          </button>
          <button
            data-eid="skip-forward-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              color: '#94a3b8',
            }}
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div>
          <div
            data-eid="progress-bar"
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 4,
              height: 6,
              overflow: 'hidden',
              marginBottom: 6,
            }}
          >
            <div
              data-eid="progress-fill"
              style={{
                background: 'linear-gradient(90deg, #7c3aed, #4f46e5)',
                height: '100%',
                width: `${podcast.currentEpisode.progressPercent}%`,
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
            <span data-eid="time-elapsed">{podcast.currentEpisode.elapsedTime}</span>
            <span data-eid="time-total">{podcast.currentEpisode.totalTime}</span>
          </div>
        </div>
      </div>

      <div data-eid="episode-list">
        <h3 data-eid="episode-list-title" style={{ fontSize: 14, fontWeight: 600, margin: '0 0 10px', color: '#cbd5e1' }}>
          Recent Episodes
        </h3>

        {podcast.episodes.map((ep, i) => (
          <div
            key={ep.number}
            data-eid={`ep-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 0',
              borderBottom: i < podcast.episodes.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            {i < 2 && (
              <span
                data-eid={`ep-${i}-number`}
                style={{
                  background: 'rgba(124,58,237,0.2)',
                  color: '#a78bfa',
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {ep.number}
              </span>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <span data-eid={`ep-${i}-title`} style={{ fontSize: 13, fontWeight: 500, display: 'block' }}>
                {ep.title}
              </span>
              {i === 0 && (
                <span data-eid="ep-0-date" style={{ fontSize: 11, color: '#64748b' }}>
                  {ep.date}
                </span>
              )}
            </div>
            <span data-eid={`ep-${i}-duration`} style={{ fontSize: 11, color: '#64748b', flexShrink: 0 }}>
              {ep.duration}
            </span>
            {i < 2 && (
              <span data-eid={`ep-${i}-status`} style={{ flexShrink: 0 }}>
                {ep.status === 'completed' ? (
                  <Check size={14} color="#34d399" />
                ) : (
                  <Clock size={14} color="#fbbf24" />
                )}
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        data-eid="stats-row"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}
      >
        <div
          data-eid="stat-episodes"
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12,
            padding: '10px 8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: '#a78bfa' }}>{podcast.stats.totalEpisodes}</div>
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Episodes</div>
        </div>
        <div
          data-eid="stat-listen-time"
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12,
            padding: '10px 8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: '#60a5fa' }}>{podcast.stats.totalListenTime}</div>
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Listen Time</div>
        </div>
        <div
          data-eid="stat-subscribers"
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12,
            padding: '10px 8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: '#34d399' }}>{podcast.stats.subscribers}</div>
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Subscribers</div>
        </div>
      </div>
    </section>
  )
}
