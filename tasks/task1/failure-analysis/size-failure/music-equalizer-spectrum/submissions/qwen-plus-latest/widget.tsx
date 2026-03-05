import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX } from 'lucide-react';
import data from './data.json';

const MusicEqualizerSpectrum = () => {
  const { spectrumData, waveformData, queueItems, stats } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#e6e6e6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div data-eid="title" style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '0.5px' }}>
          Audio Spectrum
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span data-eid="badge-bitrate" style={{ 
            backgroundColor: '#2d3748', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '14px',
            fontWeight: '500'
          }}>
            320kbps
          </span>
          <span data-eid="badge-format" style={{ 
            backgroundColor: '#2d3748', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '14px',
            fontWeight: '500'
          }}>
            FLAC
          </span>
        </div>
      </header>

      {/* Spectrum Section */}
      <div data-eid="spectrum-section" style={{ display: 'flex', gap: '24px', position: 'relative' }}>
        {/* dB Scale */}
        <div data-eid="db-scale" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          height: '200px',
          width: '40px',
          textAlign: 'right',
          paddingRight: '8px',
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '1.2'
        }}>
          <span data-eid="db-label-plus12" style={{ color: '#4ade80' }}>+12</span>
          <span data-eid="db-label-plus6" style={{ color: '#3b82f6' }}>+6</span>
          <span data-eid="db-label-0" style={{ color: '#fbbf24' }}>0</span>
          <span data-eid="db-label-minus6" style={{ color: '#ef4444' }}>-6</span>
          <span data-eid="db-label-minus12" style={{ color: '#7c3aed' }}>-12</span>
        </div>

        {/* Spectrum Chart */}
        <div data-eid="spectrum-chart" style={{ flex: 1, height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spectrumData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <YAxis type="number" domain={[-12, 12]} hide />
              <XAxis type="category" dataKey="freq" hide />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Frequency Labels */}
      <div data-eid="freq-labels" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        paddingLeft: '48px',
        fontSize: '12px',
        fontWeight: '500',
        color: '#9ca3af'
      }}>
        <span data-eid="freq-label-0">31Hz</span>
        <span data-eid="freq-label-1">62Hz</span>
        <span data-eid="freq-label-2">125Hz</span>
        <span data-eid="freq-label-3">250Hz</span>
        <span data-eid="freq-label-4">500Hz</span>
        <span data-eid="freq-label-5">1kHz</span>
        <span data-eid="freq-label-6">2kHz</span>
        <span data-eid="freq-label-7">4kHz</span>
        <span data-eid="freq-label-8">8kHz</span>
        <span data-eid="freq-label-9">16kHz</span>
      </div>

      {/* Waveform Section */}
      <div data-eid="waveform-section" style={{ marginTop: '16px' }}>
        <div data-eid="waveform-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '12px',
          color: '#e6e6e6'
        }}>
          Waveform
        </div>
        <div data-eid="waveform-chart" style={{ height: '100px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={waveformData}>
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#colorUv)" />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Meters */}
      <div data-eid="channel-meters" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        maxWidth: '300px',
        margin: '0 auto'
      }}>
        {/* Left Meter */}
        <div data-eid="meter-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span data-eid="meter-left-label" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#60a5fa'
          }}>L</span>
          <div data-eid="meter-left-bar" style={{ 
            width: '8px', 
            height: '120px', 
            backgroundColor: '#374151', 
            borderRadius: '4px',
            position: 'relative'
          }}>
            <div 
              data-eid="meter-left-fill" 
              style={{ 
                width: '100%', 
                height: `${Math.min(100, Math.max(0, (stats.leftLevel + 12) * 100 / 24))}%`,
                backgroundColor: '#3b82f6',
                borderRadius: '4px 4px 0 0',
                position: 'absolute',
                bottom: 0
              }}
            />
          </div>
          <span data-eid="meter-left-value" style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#60a5fa'
          }}>{stats.leftLevel.toFixed(1)} dB</span>
        </div>

        {/* Right Meter */}
        <div data-eid="meter-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span data-eid="meter-right-label" style={{ 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#60a5fa'
          }}>R</span>
          <div data-eid="meter-right-bar" style={{ 
            width: '8px', 
            height: '120px', 
            backgroundColor: '#374151', 
            borderRadius: '4px',
            position: 'relative'
          }}>
            <div 
              data-eid="meter-right-fill" 
              style={{ 
                width: '100%', 
                height: `${Math.min(100, Math.max(0, (stats.rightLevel + 12) * 100 / 24))}%`,
                backgroundColor: '#3b82f6',
                borderRadius: '4px 4px 0 0',
                position: 'absolute',
                bottom: 0
              }}
            />
          </div>
          <span data-eid="meter-right-value" style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#60a5fa'
          }}>{stats.rightLevel.toFixed(1)} dB</span>
        </div>
      </div>

      {/* Now Playing */}
      <div data-eid="now-playing" style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '12px', 
        padding: '20px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <div data-eid="now-playing-label" style={{ 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#9ca3af',
          marginBottom: '8px'
        }}>
          Now Playing
        </div>
        <div data-eid="album-art" style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '48px',
          fontWeight: 'bold'
        }}>
          MR
        </div>
        <div data-eid="track-info" style={{ flex: 1 }}>
          <div data-eid="song-title" style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            marginBottom: '4px'
          }}>
            Midnight Reverie
          </div>
          <div data-eid="artist-name" style={{ 
            fontSize: '16px', 
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Aurora Synth
          </div>
          <div data-eid="album-name" style={{ 
            fontSize: '14px', 
            color: '#6b7280',
            marginBottom: '12px'
          }}>
            Neon Dreams
          </div>
          <div data-eid="duration-bar" style={{ 
            height: '6px', 
            backgroundColor: '#374151', 
            borderRadius: '3px',
            marginBottom: '8px',
            overflow: 'hidden'
          }}>
            <div 
              data-eid="duration-bar-fill" 
              style={{ 
                height: '100%', 
                width: `${(154 / 292) * 100}%`, 
                backgroundColor: '#3b82f6',
                borderRadius: '3px'
              }}
            />
          </div>
          <div data-eid="duration-times" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '14px',
            color: '#9ca3af'
          }}>
            <span data-eid="duration-current">2:34</span>
            <span data-eid="duration-total">4:52</span>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div data-eid="playback-controls" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <span data-eid="btn-prev" style={{ cursor: 'pointer', color: '#9ca3af' }}>
          <SkipBack size={24} />
        </span>
        <span data-eid="btn-play" style={{ 
          cursor: 'pointer', 
          backgroundColor: '#3b82f6', 
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Pause size={24} />
        </span>
        <span data-eid="btn-next" style={{ cursor: 'pointer', color: '#9ca3af' }}>
          <SkipForward size={24} />
        </span>
        <span data-eid="btn-shuffle" style={{ cursor: 'pointer', color: '#9ca3af' }}>
          <Shuffle size={20} />
        </span>
        <span data-eid="btn-repeat" style={{ cursor: 'pointer', color: '#9ca3af' }}>
          <Repeat size={20} />
        </span>
        <div data-eid="volume-control" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          minWidth: '180px'
        }}>
          <span data-eid="volume-icon" style={{ color: '#9ca3af' }}>
            <Volume2 size={20} />
          </span>
          <div data-eid="volume-bar" style={{ 
            flex: 1, 
            height: '6px', 
            backgroundColor: '#374151', 
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div 
              data-eid="volume-bar-fill" 
              style={{ 
                height: '100%', 
                width: '72%', 
                backgroundColor: '#3b82f6',
                borderRadius: '3px'
              }}
            />
          </div>
          <span data-eid="volume-value" style={{ 
            fontSize: '14px',
            color: '#9ca3af',
            minWidth: '48px',
            textAlign: 'right'
          }}>
            72%
          </span>
        </div>
      </div>

      {/* Audio Stats */}
      <div data-eid="audio-stats" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '16px',
        marginTop: '8px'
      }}>
        <div data-eid="stat-sample-rate" style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '12px',
          textAlign: 'center'
        }}>
          <span data-eid="stat-sample-rate-label" style={{ 
            display: 'block', 
            fontSize: '12px', 
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Sample Rate
          </span>
          <span data-eid="stat-sample-rate-value" style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#e6e6e6'
          }}>
            96 kHz
          </span>
        </div>
        <div data-eid="stat-bit-depth" style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '12px',
          textAlign: 'center'
        }}>
          <span data-eid="stat-bit-depth-label" style={{ 
            display: 'block', 
            fontSize: '12px', 
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Bit Depth
          </span>
          <span data-eid="stat-bit-depth-value" style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#e6e6e6'
          }}>
            24-bit
          </span>
        </div>
        <div data-eid="stat-channels" style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '12px',
          textAlign: 'center'
        }}>
          <span data-eid="stat-channels-label" style={{ 
            display: 'block', 
            fontSize: '12px', 
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Channels
          </span>
          <span data-eid="stat-channels-value" style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#e6e6e6'
          }}>
            Stereo
          </span>
        </div>
        <div data-eid="stat-dynamic-range" style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '12px',
          textAlign: 'center'
        }}>
          <span data-eid="stat-dynamic-range-label" style={{ 
            display: 'block', 
            fontSize: '12px', 
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Dynamic Range
          </span>
          <span data-eid="stat-dynamic-range-value" style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#e6e6e6'
          }}>
            14.2 dB
          </span>
        </div>
        <div data-eid="stat-codec" style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '12px',
          textAlign: 'center'
        }}>
          <span data-eid="stat-codec-label" style={{ 
            display: 'block', 
            fontSize: '12px', 
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Codec
          </span>
          <span data-eid="stat-codec-value" style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#e6e6e6'
          }}>
            FLAC
          </span>
        </div>
        <div data-eid="stat-file-size" style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '12px',
          textAlign: 'center'
        }}>
          <span data-eid="stat-file-size-label" style={{ 
            display: 'block', 
            fontSize: '12px', 
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            File Size
          </span>
          <span data-eid="stat-file-size-value" style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#e6e6e6'
          }}>
            42.3 MB
          </span>
        </div>
      </div>

      {/* EQ Presets */}
      <div data-eid="presets-section" style={{ marginTop: '8px' }}>
        <div data-eid="presets-label" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '12px',
          color: '#e6e6e6'
        }}>
          EQ Presets
        </div>
        <div data-eid="preset-row" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px'
        }}>
          <span 
            data-eid="preset-flat" 
            style={{ 
              backgroundColor: '#374151', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#9ca3af'
            }}
          >
            Flat
          </span>
          <span 
            data-eid="preset-rock" 
            style={{ 
              backgroundColor: '#374151', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#9ca3af'
            }}
          >
            Rock
          </span>
          <span 
            data-eid="preset-jazz" 
            style={{ 
              backgroundColor: '#374151', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#9ca3af'
            }}
          >
            Jazz
          </span>
          <span 
            data-eid="preset-classical" 
            style={{ 
              backgroundColor: '#3b82f6', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            Classical
          </span>
          <span 
            data-eid="preset-vocal" 
            style={{ 
              backgroundColor: '#374151', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#9ca3af'
            }}
          >
            Vocal
          </span>
          <span 
            data-eid="preset-bass" 
            style={{ 
              backgroundColor: '#374151', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#9ca3af'
            }}
          >
            Bass Boost
          </span>
        </div>
      </div>

      {/* Queue Section */}
      <div data-eid="queue-section" style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '12px', 
        padding: '20px',
        marginTop: '8px'
      }}>
        <div data-eid="queue-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#e6e6e6'
        }}>
          Up Next
        </div>
        
        {queueItems.map((item, index) => (
          <div 
            key={index} 
            data-eid={`queue-item-${index}`} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '12px 0',
              borderBottom: index < queueItems.length - 1 ? '1px solid #374151' : 'none'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span data-eid={`queue-item-${index}-title`} style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                marginBottom: '2px'
              }}>
                {item.title}
              </span>
              <span data-eid={`queue-item-${index}-artist`} style={{ 
                fontSize: '14px', 
                color: '#9ca3af'
              }}>
                {item.artist}
              </span>
            </div>
            <span data-eid={`queue-item-${index}-duration`} style={{ 
              fontSize: '14px', 
              color: '#9ca3af',
              minWidth: '50px',
              textAlign: 'right'
            }}>
              {item.duration}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MusicEqualizerSpectrum;