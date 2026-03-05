import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Check, Circle } from 'lucide-react';
import data from './data.json';

const PodcastEpisodeList = () => {
  const { nowPlaying, episodeList, stats } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        width: '360px',
        height: '720px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Now Playing Section */}
      <div data-eid="now-playing" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Cover Art */}
        <div 
          data-eid="cover-art"
          style={{
            height: '180px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '60px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
          }} />
        </div>

        {/* Podcast Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span data-eid="podcast-name" style={{ fontSize: '14px', fontWeight: 600, color: '#B3B3B3' }}>
            {nowPlaying.podcastName}
          </span>
          <h2 data-eid="episode-title" style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
            {nowPlaying.episodeTitle}
          </h2>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button data-eid="skip-back-btn" style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#282828',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <SkipBack size={20} />
          </button>
          <button data-eid="play-button" style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: 'none',
            color: '#000000',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Play size={24} />
          </button>
          <button data-eid="skip-forward-btn" style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#282828',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div data-eid="progress-bar" style={{
          height: '4px',
          backgroundColor: '#282828',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div 
            data-eid="progress-fill"
            style={{
              height: '100%',
              width: `${nowPlaying.progressPercent}%`,
              backgroundColor: '#FFFFFF',
              borderRadius: '2px'
            }}
          />
        </div>

        {/* Time Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#B3B3B3' }}>
          <span data-eid="time-elapsed">{nowPlaying.timeElapsed}</span>
          <span data-eid="time-total">{nowPlaying.timeTotal}</span>
        </div>
      </div>

      {/* Episode List */}
      <div data-eid="episode-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
        <h3 data-eid="episode-list-title" style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#B3B3B3' }}>
          {episodeList.title}
        </h3>

        {/* Episode Items */}
        {episodeList.episodes.map((episode, index) => (
          <div 
            key={index}
            data-eid={`ep-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < episodeList.episodes.length - 1 ? '1px solid #282828' : 'none'
            }}
          >
            {/* Episode Number */}
            {episode.number && (
              <span 
                data-eid={`ep-${index}-number`}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#282828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600',
                  marginRight: '12px',
                  flexShrink: 0
                }}
              >
                {episode.number}
              </span>
            )}

            {/* Episode Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span 
                  data-eid={`ep-${index}-title`}
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 600,
                    lineHeight: '1.2'
                  }}
                >
                  {episode.title}
                </span>
                {episode.status && (
                  <span data-eid={`ep-${index}-status`} style={{ flexShrink: 0 }}>
                    {episode.status === 'played' ? (
                      <Check size={16} color="#4ADE80" />
                    ) : episode.status === 'in-progress' ? (
                      <Circle size={16} color="#3B82F6" />
                    ) : null}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#B3B3B3' }}>
                {episode.date && (
                  <span data-eid={`ep-${index}-date`}>{episode.date}</span>
                )}
                {episode.duration && (
                  <span data-eid={`ep-${index}-duration`}>{episode.duration}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div data-eid="stats-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#B3B3B3' }}>
        <div data-eid="stat-episodes">
          <div style={{ fontWeight: 700 }}>{stats.episodes}</div>
          <div>Episodes</div>
        </div>
        <div data-eid="stat-listen-time">
          <div style={{ fontWeight: 700 }}>{stats.listenTime}</div>
          <div>Listen Time</div>
        </div>
        <div data-eid="stat-subscribers">
          <div style={{ fontWeight: 700 }}>{stats.subscribers}</div>
          <div>Subscribers</div>
        </div>
      </div>
    </section>
  );
};

export default PodcastEpisodeList;