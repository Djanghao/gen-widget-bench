import React from 'react';
import { Mic, Play, SkipBack, SkipForward, Check, Clock } from 'lucide-react';
import data from './data.json';

const Widget: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#201a35',
        borderRadius: '16px',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        color: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '320px', // Adjusted to match target visually
        boxSizing: 'border-box',
      }}
    >
      <div
        data-eid="now-playing"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            data-eid="cover-art"
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #6a30eb, #9c40fa)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Mic size={36} color="white" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <span
              data-eid="podcast-name"
              style={{
                color: '#b0b0b0',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px',
              }}
            >
              {data.podcastName}
            </span>
            <h2
              data-eid="episode-title"
              style={{
                color: 'white',
                fontSize: '18px',
                margin: '0',
                lineHeight: '1.2',
              }}
            >
              {data.nowPlaying.episodeTitle}
            </h2>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          <button
            data-eid="skip-back-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#b0b0b0',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SkipBack size={24} />
          </button>
          <button
            data-eid="play-button"
            style={{
              backgroundColor: '#7a3def',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: 'none',
              cursor: 'pointer',
              paddingLeft: '2px', // Visual adjustment for play icon
            }}
          >
            <Play fill="white" size={24} color="white" />
          </button>
          <button
            data-eid="skip-forward-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#b0b0b0',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SkipForward size={24} />
          </button>
        </div>

        <div
          data-eid="progress-bar"
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#3b305b',
            borderRadius: '3px',
            marginTop: '10px',
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              width: `${data.nowPlaying.progressPercentage}%`,
              height: '100%',
              backgroundColor: '#7a3def',
              borderRadius: '3px',
            }}
          ></div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#b0b0b0',
            marginTop: '4px',
          }}
        >
          <span data-eid="time-elapsed">{data.nowPlaying.elapsedTime}</span>
          <span data-eid="time-total">{data.nowPlaying.totalTime}</span>
        </div>
      </div>

      <div
        data-eid="episode-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <h3
          data-eid="episode-list-title"
          style={{
            color: 'white',
            fontSize: '16px',
            margin: '0',
            marginBottom: '8px',
          }}
        >
          {data.episodeListTitle}
        </h3>

        {data.episodes.map((episode, index) => (
          <div
            key={index}
            data-eid={episode.eid}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '24px', // Adjusted height to match font sizes and spacing
              color: '#e0e0e0',
              fontSize: '14px',
            }}
          >
            {episode.number && (
              <span
                data-eid={`${episode.eid}-number`}
                style={{
                  backgroundColor: '#4a3c6d',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  marginRight: '12px',
                  color: '#b0b0b0',
                  minWidth: '20px',
                  textAlign: 'center',
                }}
              >
                {episode.number}
              </span>
            )}
            <span data-eid={`${episode.eid}-title`} style={{ flexGrow: 1 }}>
              {episode.title}
            </span>
            {episode.date && (
              <span
                data-eid={`${episode.eid}-date`}
                style={{
                  fontSize: '12px',
                  color: '#b0b0b0',
                  marginLeft: '12px',
                }}
              >
                {episode.date}
              </span>
            )}
            <span
              data-eid={`${episode.eid}-duration`}
              style={{
                fontSize: '14px',
                color: '#b0b0b0',
                marginLeft: '16px',
              }}
            >
              {episode.duration}
            </span>
            {episode.status === 'played' && (
              <span
                data-eid={`${episode.eid}-status`}
                style={{
                  color: '#4caf50',
                  fontSize: '18px',
                  marginLeft: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Check size={18} />
              </span>
            )}
            {episode.status === 'in-progress' && (
              <span
                data-eid={`${episode.eid}-status`}
                style={{
                  color: '#ffb300',
                  fontSize: '18px',
                  marginLeft: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Clock size={18} />
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        data-eid="stats-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: '10px',
        }}
      >
        {data.stats.map((stat) => (
          <div
            key={stat.eid}
            data-eid={stat.eid}
            style={{
              flex: 1,
              textAlign: 'center',
              backgroundColor: '#2b2347',
              borderRadius: '8px',
              padding: '12px 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: stat.color,
                marginBottom: '4px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                color: '#b0b0b0',
                letterSpacing: '0.5px',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;