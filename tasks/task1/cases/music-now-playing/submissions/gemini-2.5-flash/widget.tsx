import React from 'react';
import data from './data.json';
import { Shuffle, SkipBack, Pause, SkipForward, Repeat2, Music } from 'lucide-react';

const MusicNowPlayingWidget: React.FC = () => {
  const { track, queue } = data;

  return (
    <section
      data-eid="root"
      style={{
        width: '320px',
        padding: '20px',
        borderRadius: '20px',
        background: 'linear-gradient(180deg, #6c3a7d 0%, #2f2f4e 100%)',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
    >
      <div
        data-eid="album-art"
        style={{
          width: 'calc(100% - 0px)', // Full width of content area
          height: '240px', // Square aspect
          borderRadius: '15px',
          background: 'linear-gradient(180deg, #814f94 0%, #3e3e60 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Music size={80} color="#fff" />
      </div>

      <div
        data-eid="track-info"
        style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        <div
          data-eid="track-name"
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '4px'
          }}
        >
          {track.name}
        </div>
        <div
          data-eid="artist-name"
          style={{
            fontSize: '14px',
            color: '#bbb',
            marginBottom: '2px'
          }}
        >
          {track.artist}
        </div>
        <div
          data-eid="album-name"
          style={{
            fontSize: '12px',
            color: '#888'
          }}
        >
          {track.album}
        </div>
      </div>

      <div
        data-eid="progress-section"
        style={{
          width: '100%',
          marginBottom: '20px'
        }}
      >
        <div
          data-eid="progress-bar"
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#333',
            borderRadius: '2px',
            overflow: 'hidden'
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              width: `${track.progressPercent}%`,
              height: '100%',
              backgroundColor: '#e75871',
              borderRadius: '2px'
            }}
          ></div>
        </div>
        <div
          data-eid="time-display"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            fontSize: '12px',
            color: '#888'
          }}
        >
          <span data-eid="elapsed-time">{track.elapsedTime}</span>
          <span data-eid="total-time">{track.totalTime}</span>
        </div>
      </div>

      <div
        data-eid="controls"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '30px'
        }}
      >
        <span data-eid="btn-shuffle" style={{ cursor: 'pointer', color: '#bbb' }}>
          <Shuffle size={20} />
        </span>
        <span data-eid="btn-prev" style={{ cursor: 'pointer', color: '#bbb' }}>
          <SkipBack size={20} />
        </span>
        <span
          data-eid="btn-play"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#e75871',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Pause size={24} color="#fff" fill="#fff" />
        </span>
        <span data-eid="btn-next" style={{ cursor: 'pointer', color: '#bbb' }}>
          <SkipForward size={20} />
        </span>
        <span data-eid="btn-repeat" style={{ cursor: 'pointer', color: '#bbb' }}>
          <Repeat2 size={20} />
        </span>
      </div>

      <div
        data-eid="queue-section"
        style={{
          width: '100%',
          marginTop: '0px'
        }}
      >
        <div
          data-eid="queue-label"
          style={{
            fontSize: '10px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#bbb',
            letterSpacing: '1px',
            marginBottom: '10px',
            textAlign: 'left'
          }}
        >
          Up Next
        </div>
        {queue.map((item, index) => (
          <div
            key={item.id}
            data-eid={`queue-item-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 15px',
              backgroundColor: '#2d2d48',
              borderRadius: '8px',
              marginBottom: '8px',
              gap: '15px'
            }}
          >
            <span style={{ color: '#888', fontSize: '14px', minWidth: '15px' }}>
              {item.id}
            </span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#bbb' }}>{item.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MusicNowPlayingWidget;