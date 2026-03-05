import React from 'react';
import data from './data.json';
import { Play, Rewind, FastForward, CheckCircle, Circle } from 'lucide-react';

const Widget = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#1c1c28',
        borderRadius: '20px',
        padding: '20px',
        color: 'white',
        width: '400px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div data-eid="now-playing" style={{ marginBottom: '20px' }}>
        <div
          data-eid="cover-art"
          style={{
            width: '70px',
            height: '70px',
            backgroundColor: '#4b4b6d',
            borderRadius: '10px',
            display: 'inline-block',
            marginRight: '15px',
            verticalAlign: 'middle',
          }}
        >
          <Play color="white" size={24} style={{ margin: '23px' }} />
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <span
            data-eid="podcast-name"
            style={{ fontSize: '12px', color: '#a5a5b5' }}
          >
            {data.podcastName}
          </span>
          <h2
            data-eid="episode-title"
            style={{ fontSize: '18px', margin: '5px 0' }}
          >
            {data.currentEpisode.title}
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <button
            data-eid="skip-back-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#a5a5b5',
              marginRight: '10px',
            }}
          >
            <Rewind color="white" size={24} />
          </button>
          <button
            data-eid="play-button"
            style={{
              backgroundColor: '#4b4b6d',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Play />
          </button>
          <button
            data-eid="skip-forward-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#a5a5b5',
              marginLeft: '10px',
            }}
          >
            <FastForward color="white" size={24} />
          </button>
        </div>
        <div
          data-eid="progress-bar"
          style={{
            background: '#2f2f3f',
            height: '5px',
            borderRadius: '5px',
            marginTop: '15px',
            position: 'relative',
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              background: '#5469ff',
              width: '67%',
              height: '100%',
              borderRadius: '5px',
              position: 'absolute',
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span data-eid="time-elapsed" style={{ fontSize: '12px' }}>
            {data.currentEpisode.timeElapsed}
          </span>
          <span data-eid="time-total" style={{ fontSize: '12px' }}>
            {data.currentEpisode.timeTotal}
          </span>
        </div>
      </div>
      <div data-eid="episode-list" style={{ marginBottom: '20px' }}>
        <h3
          data-eid="episode-list-title"
          style={{
            fontSize: '16px',
            marginBottom: '10px',
            color: '#a5a5b5',
          }}
        >
          Recent Episodes
        </h3>
        {data.episodes.map((episode, index) => (
          <div
            key={index}
            data-eid={`ep-${index}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              color: episode.title.includes('Trends') ? '#fff' : '#a5a5b5',
            }}
          >
            <div>
              <span
                data-eid={`ep-${index}-number`}
                style={{
                  backgroundColor: '#4b4b6d',
                  borderRadius: '50%',
                  padding: '5px 10px',
                  marginRight: '10px',
                  fontSize: '12px',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
              >
                {episode.number}
              </span>
              <span data-eid={`ep-${index}-title`}>{episode.title}</span>
              {episode.date && (
                <span
                  data-eid={`ep-${index}-date`}
                  style={{ display: 'block', fontSize: '10px' }}
                >
                  {episode.date}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                data-eid={`ep-${index}-duration`}
                style={{
                  fontSize: '12px',
                  marginRight: '10px',
                  color: '#a5a5b5',
                }}
              >
                {episode.duration}
              </span>
              {episode.status === 'played' && (
                <CheckCircle size={16} color="green" data-eid={`ep-${index}-status`} />
              )}
              {episode.status === 'in-progress' && (
                <Circle size={16} color="orange" data-eid={`ep-${index}-status`} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        data-eid="stats-row"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid #2f2f3f',
          paddingTop: '10px',
        }}
      >
        <div data-eid="stat-episodes" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', marginBottom: '5px' }}>
            {data.stats.episodes}
          </div>
          <div style={{ fontSize: '10px', color: '#a5a5b5' }}>EPISODES</div>
        </div>
        <div data-eid="stat-listen-time" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', marginBottom: '5px' }}>
            {data.stats.listenTime}
          </div>
          <div style={{ fontSize: '10px', color: '#a5a5b5' }}>LISTEN TIME</div>
        </div>
        <div data-eid="stat-subscribers" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', marginBottom: '5px' }}>
            {data.stats.subscribers}
          </div>
          <div style={{ fontSize: '10px', color: '#a5a5b5' }}>SUBSCRIBERS</div>
        </div>
      </div>
    </section>
  );
};

export default Widget;