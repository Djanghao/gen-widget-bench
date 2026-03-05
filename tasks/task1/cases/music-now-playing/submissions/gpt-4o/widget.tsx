import React from 'react';
import data from './data.json';
import { Play, Shuffle, SkipBack, SkipForward, Repeat } from 'lucide-react';

const Widget = () => {
  return (
    <section data-eid="root" style={styles.root}>
      <div data-eid="album-art" style={styles.albumArt}>
        <span role="img" aria-label="music note" style={styles.musicIcon}>
          🎵
        </span>
      </div>
      <div data-eid="track-info" style={styles.trackInfo}>
        <div data-eid="track-name" style={styles.trackName}>
          {data.currentTrack.name}
        </div>
        <div data-eid="artist-name">
          {data.currentTrack.artist}
        </div>
        <div data-eid="album-name">
          {data.currentTrack.album}
        </div>
      </div>
      <div data-eid="progress-section" style={styles.progressSection}>
        <div data-eid="progress-bar" style={styles.progressBar}>
          <div data-eid="progress-fill" style={styles.progressFill}></div>
        </div>
        <div data-eid="time-display" style={styles.timeDisplay}>
          <span data-eid="elapsed-time">{data.currentTrack.elapsed}</span>
          <span data-eid="total-time">{data.currentTrack.duration}</span>
        </div>
      </div>
      <div data-eid="controls" style={styles.controls}>
        <span data-eid="btn-shuffle">
          <Shuffle size={20} />
        </span>
        <span data-eid="btn-prev">
          <SkipBack size={20} />
        </span>
        <span data-eid="btn-play" style={styles.playButton}>
          <Play size={30} />
        </span>
        <span data-eid="btn-next">
          <SkipForward size={20} />
        </span>
        <span data-eid="btn-repeat">
          <Repeat size={20} />
        </span>
      </div>
      <div data-eid="queue-section" style={styles.queueSection}>
        <div data-eid="queue-label" style={styles.queueLabel}>
          UP NEXT
        </div>
        {data.queue.map((item, index) => (
          <div key={index} data-eid={`queue-item-${index}`} style={styles.queueItem}>
            <div>
              <span>{index + 1}</span>
              <div>{item.name}</div>
              <div>{item.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  root: {
    background: 'linear-gradient(to bottom, #141E30, #243B55)',
    borderRadius: '16px',
    padding: '16px',
    width: '300px',
    color: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
  },
  albumArt: {
    width: '100%',
    paddingBottom: '100%',
    background: 'linear-gradient(to right, #e94057, #8a2387)',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  musicIcon: {
    fontSize: '40px',
    color: '#FFFFFF',
  },
  trackInfo: {
    textAlign: 'center',
    marginTop: '16px',
  },
  trackName: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '4px',
  },
  progressSection: {
    marginTop: '16px',
  },
  progressBar: {
    background: '#555',
    height: '4px',
    borderRadius: '2px',
    position: 'relative',
    overflow: 'hidden',
  },
  progressFill: {
    background: '#e94057',
    width: `${(data.currentTrack.elapsedSeconds / data.currentTrack.totalSeconds) * 100}%`,
    height: '100%',
  },
  timeDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4px',
    fontSize: '12px',
    color: '#999',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '16px',
  },
  playButton: {
    background: '#e94057',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  queueSection: {
    marginTop: '16px',
  },
  queueLabel: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  queueItem: {
    background: '#2A3950',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default Widget;