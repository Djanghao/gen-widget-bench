import React from 'react';
import data from './data.json';

const AudioMixingConsole = () => {
  const { header, channels, master, output } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#1a1a2e',
        color: '#e6e6e6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div data-eid="console-title" style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>
          Mix Console
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span data-eid="project-name" style={{ fontSize: '16px', fontWeight: '500', color: '#a9a9a9' }}>
            Midnight Sessions
          </span>
          <span 
            data-eid="bpm-badge" 
            style={{ 
              backgroundColor: '#2d3748', 
              borderRadius: '4px', 
              padding: '4px 10px', 
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            128 BPM
          </span>
        </div>
      </header>

      {/* Channels Row */}
      <div data-eid="channels-row" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
        {channels.map((channel, index) => (
          <div 
            key={index} 
            data-eid={`ch-${index}`} 
            style={{
              width: '80px',
              backgroundColor: '#2d3748',
              borderRadius: '6px',
              padding: '10px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {/* Channel Name */}
            <div data-eid={`ch-${index}-name`} style={{ fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>
              {channel.name}
            </div>
            
            {/* Channel Number */}
            <div data-eid={`ch-${index}-number`} style={{ fontSize: '10px', color: '#a9a9a9', marginBottom: '4px' }}>
              {channel.number}
            </div>
            
            {/* Meter */}
            <div data-eid={`ch-${index}-meter`} style={{ 
              width: '8px', 
              height: '60px', 
              backgroundColor: '#1a1a2e', 
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div 
                data-eid={`ch-${index}-meter-fill`} 
                style={{ 
                  width: '100%', 
                  height: `${channel.meter}%`, 
                  backgroundColor: channel.meter > 80 ? '#e53e3e' : channel.meter > 60 ? '#ed8936' : '#38a169',
                  borderRadius: '4px 4px 0 0',
                  position: 'absolute',
                  bottom: 0
                }}
              />
            </div>
            
            {/* Pan */}
            <div data-eid={`ch-${index}-pan`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div data-eid={`ch-${index}-pan-bar`} style={{ 
                width: '40px', 
                height: '4px', 
                backgroundColor: '#4a5568', 
                borderRadius: '2px',
                position: 'relative',
                marginTop: '4px'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#3182ce',
                  borderRadius: '50%',
                  left: `${channel.panPosition}%`
                }} />
              </div>
              <div style={{ fontSize: '10px', marginTop: '2px', fontWeight: '600' }}>
                {channel.panLabel}
              </div>
            </div>
            
            {/* Mute/Solo Badges */}
            <div style={{ display: 'flex', gap: '4px', width: '100%', justifyContent: 'center' }}>
              <span 
                data-eid={`ch-${index}-mute`} 
                style={{ 
                  fontSize: '10px', 
                  backgroundColor: channel.mute ? '#e53e3e' : '#4a5568', 
                  borderRadius: '3px', 
                  padding: '2px 6px',
                  fontWeight: '600'
                }}
              >
                M
              </span>
              <span 
                data-eid={`ch-${index}-solo`} 
                style={{ 
                  fontSize: '10px', 
                  backgroundColor: channel.solo ? '#3182ce' : '#4a5568', 
                  borderRadius: '3px', 
                  padding: '2px 6px',
                  fontWeight: '600'
                }}
              >
                S
              </span>
            </div>
            
            {/* Volume */}
            <div data-eid={`ch-${index}-db`} style={{ fontSize: '12px', fontWeight: '600', marginTop: '2px' }}>
              {channel.volume}
            </div>
          </div>
        ))}
      </div>

      {/* Master Channel */}
      <div 
        data-eid="master" 
        style={{
          width: '120px',
          backgroundColor: '#2d3748',
          borderRadius: '6px',
          padding: '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          border: '2px solid #3182ce'
        }}
      >
        <div data-eid="master-label" style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>
          MASTER
        </div>
        
        <div data-eid="master-meter" style={{ 
          width: '12px', 
          height: '80px', 
          backgroundColor: '#1a1a2e', 
          borderRadius: '6px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div 
            data-eid="master-meter-fill" 
            style={{ 
              width: '100%', 
              height: `${master.meter}%`, 
              backgroundColor: master.meter > 80 ? '#e53e3e' : master.meter > 60 ? '#ed8936' : '#38a169',
              borderRadius: '6px 6px 0 0',
              position: 'absolute',
              bottom: 0
            }}
          />
        </div>
        
        <div data-eid="master-db" style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {master.volume}
        </div>
      </div>

      {/* Output Section */}
      <div data-eid="output-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div data-eid="output-label" style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center', marginBottom: '8px' }}>
          Stereo Out
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
            <span data-eid="output-left-label" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>L</span>
            <div data-eid="output-left" style={{ 
              width: '8px', 
              height: '60px', 
              backgroundColor: '#1a1a2e', 
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div 
                data-eid="output-left-fill" 
                style={{ 
                  width: '100%', 
                  height: `${output.leftMeter}%`, 
                  backgroundColor: output.leftMeter > 80 ? '#e53e3e' : output.leftMeter > 60 ? '#ed8936' : '#38a169',
                  borderRadius: '4px 4px 0 0',
                  position: 'absolute',
                  bottom: 0
                }}
              />
            </div>
            <span data-eid="output-db-left" style={{ fontSize: '12px', marginTop: '4px' }}>{output.leftVolume}</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
            <span data-eid="output-right-label" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>R</span>
            <div data-eid="output-right" style={{ 
              width: '8px', 
              height: '60px', 
              backgroundColor: '#1a1a2e', 
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div 
                data-eid="output-right-fill" 
                style={{ 
                  width: '100%', 
                  height: `${output.rightMeter}%`, 
                  backgroundColor: output.rightMeter > 80 ? '#e53e3e' : output.rightMeter > 60 ? '#ed8936' : '#38a169',
                  borderRadius: '4px 4px 0 0',
                  position: 'absolute',
                  bottom: 0
                }}
              />
            </div>
            <span data-eid="output-db-right" style={{ fontSize: '12px', marginTop: '4px' }}>{output.rightVolume}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioMixingConsole;