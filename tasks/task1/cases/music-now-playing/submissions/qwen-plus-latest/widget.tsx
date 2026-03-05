import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from 'lucide-react';
import data from './data.json';

export default function MusicNowPlaying() {
  const { 
    trackName, 
    artistName, 
    albumName, 
    elapsedTime, 
    totalTime, 
    progressPercent,
    queue 
  } = data;

  return (
    <section 
      data-eid="root" 
      style={{
        width: '360px',
        height: '560px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#ffffff',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Album Art */}
      <div 
        data-eid="album-art" 
        style={{
          width: '240px',
          height: '240px',
          background: 'linear-gradient(45deg, #4e54c8, #8f94fb)',
          borderRadius: '16px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '48px',
          opacity: 0.2
        }}>
          ♫
        </div>
      </div>

      {/* Track Info */}
      <div 
        data-eid="track-info" 
        style={{
          textAlign: 'center',
          padding: '0 16px'
        }}
      >
        <div 
          data-eid="track-name" 
          style={{
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {trackName}
        </div>
        <div 
          data-eid="artist-name" 
          style={{
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '1.4',
            marginBottom: '4px',
            color: '#b3b3b3'
          }}
        >
          {artistName}
        </div>
        <div 
          data-eid="album-name" 
          style={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '1.4',
            color: '#8a8a8a'
          }}
        >
          {albumName}
        </div>
      </div>

      {/* Progress Section */}
      <div 
        data-eid="progress-section" 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div 
          data-eid="progress-bar" 
          style={{
            height: '4px',
            backgroundColor: '#444',
            borderRadius: '2px',
            overflow: 'hidden'
          }}
        >
          <div 
            data-eid="progress-fill" 
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: '#1db954',
              borderRadius: '2px'
            }}
          />
        </div>
        <div 
          data-eid="time-display" 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#b3b3b3'
          }}
        >
          <span data-eid="elapsed-time">{elapsedTime}</span>
          <span data-eid="total-time">{totalTime}</span>
        </div>
      </div>

      {/* Controls */}
      <div 
        data-eid="controls" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px'
        }}
      >
        <span 
          data-eid="btn-shuffle" 
          style={{
            cursor: 'pointer',
            color: '#b3b3b3',
            transition: 'color 0.2s'
          }}
        >
          <Shuffle size={20} />
        </span>
        <span 
          data-eid="btn-prev" 
          style={{
            cursor: 'pointer',
            color: '#b3b3b3',
            transition: 'color 0.2s'
          }}
        >
          <SkipBack size={24} />
        </span>
        <span 
          data-eid="btn-play" 
          style={{
            cursor: 'pointer',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#1db954',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          <Play size={24} style={{ marginLeft: '2px' }} />
        </span>
        <span 
          data-eid="btn-next" 
          style={{
            cursor: 'pointer',
            color: '#b3b3b3',
            transition: 'color 0.2s'
          }}
        >
          <SkipForward size={24} />
        </span>
        <span 
          data-eid="btn-repeat" 
          style={{
            cursor: 'pointer',
            color: '#b3b3b3',
            transition: 'color 0.2s'
          }}
        >
          <Repeat size={20} />
        </span>
      </div>

      {/* Queue Section */}
      <div 
        data-eid="queue-section" 
        style={{
          marginTop: 'auto'
        }}
      >
        <div 
          data-eid="queue-label" 
          style={{
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#b3b3b3',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Up Next
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {queue.map((item, index) => {
            const eid = `queue-item-${index}` as const;
            return (
              <div 
                key={index} 
                data-eid={eid} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(45deg, #4e54c8, #8f94fb)',
                  borderRadius: '8px',
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#8a8a8a'
                  }}>
                    {item.artist}
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#8a8a8a',
                  minWidth: '40px',
                  textAlign: 'right'
                }}>
                  {item.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}