import React from 'react';
import data from './data.json';

const SoccerMatchDashboard = () => {
  const {
    scoreboard,
    formation,
    stats,
    events,
    ratings,
    heatmap,
    footer
  } = data;

  // Helper to render formation dots with positions
  const renderFormationDots = (players, isHome) => {
    return players.map((player, index) => (
      <span
        key={index}
        data-eid={isHome ? `home-player-${index}` : `away-player-${index}`}
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: isHome ? '#3b82f6' : '#ef4444',
          border: '2px solid white',
          boxShadow: '0 0 4px rgba(0,0,0,0.5)',
          left: `${player.x}%`,
          top: `${player.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    ));
  };

  // Helper to render stat bars
  const renderStatBar = (homeValue, awayValue, total = 100) => {
    const homePercent = (homeValue / total) * 100;
    const awayPercent = (awayValue / total) * 100;
    
    return (
      <div
        data-eid="stat-possession-bar"
        style={{
          display: 'flex',
          height: '8px',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: '#1e293b',
        }}
      >
        <div
          style={{
            width: `${homePercent}%`,
            backgroundColor: '#3b82f6',
            height: '100%',
          }}
        />
        <div
          style={{
            width: `${awayPercent}%`,
            backgroundColor: '#ef4444',
            height: '100%',
          }}
        />
      </div>
    );
  };

  // Helper to render heatmap grid
  const renderHeatmapGrid = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const cells = [];
      for (let j = 0; j < 5; j++) {
        const intensity = heatmap.grid[i][j];
        let color;
        if (intensity < 20) color = '#0f172a';
        else if (intensity < 40) color = '#1e293b';
        else if (intensity < 60) color = '#334155';
        else if (intensity < 80) color = '#475569';
        else color = '#64748b';
        
        cells.push(
          <div
            key={`${i}-${j}`}
            style={{
              width: '20%',
              height: '20px',
              backgroundColor: color,
              border: '1px solid #1e293b',
            }}
          />
        );
      }
      rows.push(
        <div
          key={i}
          data-eid={`heatmap-row-${i}`}
          style={{
            display: 'flex',
            height: '20px',
          }}
        >
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <section
      data-eid="root"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Scoreboard Section */}
      <div
        data-eid="scoreboard"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Team badges and names */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
          <div
            data-eid="home-badge"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              fontSize: '24px',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            H
          </div>
          <span
            data-eid="home-name"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginRight: 'auto',
              textTransform: 'uppercase',
            }}
          >
            {scoreboard.home.name}
          </span>
          <div
            data-eid="score-display"
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              minWidth: '80px',
              textAlign: 'center',
              margin: '0 16px',
            }}
          >
            <span data-eid="home-score">{scoreboard.score.home}</span>
            <span data-eid="score-separator" style={{ margin: '0 8px' }}>-</span>
            <span data-eid="away-score">{scoreboard.score.away}</span>
          </div>
          <span
            data-eid="away-name"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginLeft: 'auto',
              textTransform: 'uppercase',
            }}
          >
            {scoreboard.away.name}
          </span>
          <div
            data-eid="away-badge"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '16px',
              fontSize: '24px',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            A
          </div>
        </div>

        {/* Match info */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span
            data-eid="match-time"
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#334155',
              padding: '4px 12px',
              borderRadius: '6px',
            }}
          >
            {scoreboard.time}
          </span>
          <span
            data-eid="match-status"
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#10b981',
              backgroundColor: '#0f172a',
              padding: '4px 12px',
              borderRadius: '6px',
            }}
          >
            {scoreboard.status}
          </span>
          <span
            data-eid="competition-label"
            style={{
              fontSize: '16px',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {scoreboard.competition}
          </span>
        </div>
      </div>

      {/* Formation Section */}
      <div
        data-eid="formation-section"
        style={{
          marginBottom: '30px',
        }}
      >
        <h2
          data-eid="formation-title"
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e2e8f0',
            textAlign: 'center',
          }}
        >
          Formations
        </h2>
        <div
          data-eid="formation-pitch"
          style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            backgroundColor: '#0c1324',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid #1e293b',
            marginBottom: '16px',
          }}
        >
          {/* Pitch markings */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100px',
              height: '100px',
              border: '2px solid #334155',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: '2px',
              backgroundColor: '#334155',
              transform: 'translateY(-50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '2px',
              height: '100%',
              backgroundColor: '#334155',
              transform: 'translateX(-50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(to right, transparent 49%, #334155 49%, #334155 51%, transparent 51%),
                linear-gradient(to bottom, transparent 49%, #334155 49%, #334155 51%, transparent 51%)
              `,
              backgroundSize: '100px 100px',
              opacity: 0.3,
            }}
          />
          
          {/* Home formation */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          >
            {renderFormationDots(formation.home.players, true)}
          </div>
          
          {/* Away formation */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          >
            {renderFormationDots(formation.away.players, false)}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#94a3b8' }}>
          <span data-eid="home-formation-label">{formation.home.label}</span>
          <span data-eid="away-formation-label">{formation.away.label}</span>
        </div>
      </div>

      {/* Stats Section */}
      <div
        data-eid="stats-section"
        style={{
          marginBottom: '30px',
        }}
      >
        <h2
          data-eid="stats-title"
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e2e8f0',
            textAlign: 'center',
          }}
        >
          Match Statistics
        </h2>
        
        {/* Possession */}
        <div
          data-eid="stat-possession"
          style={{
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span data-eid="stat-possession-home" style={{ fontWeight: 'bold', color: '#3b82f6' }}>{stats.possession.home}%</span>
            <span data-eid="stat-possession-label" style={{ color: '#94a3b8' }}>Possession</span>
            <span data-eid="stat-possession-away" style={{ fontWeight: 'bold', color: '#ef4444' }}>{stats.possession.away}%</span>
          </div>
          <div data-eid="stat-possession-bar">
            {renderStatBar(stats.possession.home, stats.possession.away)}
          </div>
        </div>
        
        {/* Shots */}
        <div
          data-eid="stat-shots"
          style={{
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span data-eid="stat-shots-home" style={{ fontWeight: 'bold', color: '#3b82f6' }}>{stats.shots.home}</span>
            <span data-eid="stat-shots-label" style={{ color: '#94a3b8' }}>Shots</span>
            <span data-eid="stat-shots-away" style={{ fontWeight: 'bold', color: '#ef4444' }}>{stats.shots.away}</span>
          </div>
          <div data-eid="stat-shots-bar">
            {renderStatBar(stats.shots.home, stats.shots.away, Math.max(stats.shots.home, stats.shots.away, 20))}
          </div>
        </div>
        
        {/* On Target */}
        <div
          data-eid="stat-ontarget"
          style={{
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span data-eid="stat-ontarget-home" style={{ fontWeight: 'bold', color: '#3b82f6' }}>{stats.ontarget.home}</span>
            <span data-eid="stat-ontarget-label" style={{ color: '#94a3b8' }}>On Target</span>
            <span data-eid="stat-ontarget-away" style={{ fontWeight: 'bold', color: '#ef4444' }}>{stats.ontarget.away}</span>
          </div>
          <div data-eid="stat-ontarget-bar">
            {renderStatBar(stats.ontarget.home, stats.ontarget.away, Math.max(stats.ontarget.home, stats.ontarget.away, 10))}
          </div>
        </div>
        
        {/* Passes */}
        <div
          data-eid="stat-passes"
          style={{
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span data-eid="stat-passes-home" style={{ fontWeight: 'bold', color: '#3b82f6' }}>{stats.passes.home}</span>
            <span data-eid="stat-passes-label" style={{ color: '#94a3b8' }}>Passes</span>
            <span data-eid="stat-passes-away" style={{ fontWeight: 'bold', color: '#ef4444' }}>{stats.passes.away}</span>
          </div>
          <div data-eid="stat-passes-bar">
            {renderStatBar(stats.passes.home, stats.passes.away, Math.max(stats.passes.home, stats.passes.away, 500))}
          </div>
        </div>
        
        {/* Corners */}
        <div
          data-eid="stat-corners"
          style={{
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span data-eid="stat-corners-home" style={{ fontWeight: 'bold', color: '#3b82f6' }}>{stats.corners.home}</span>
            <span data-eid="stat-corners-label" style={{ color: '#94a3b8' }}>Corners</span>
            <span data-eid="stat-corners-away" style={{ fontWeight: 'bold', color: '#ef4444' }}>{stats.corners.away}</span>
          </div>
          <div data-eid="stat-corners-bar">
            {renderStatBar(stats.corners.home, stats.corners.away, Math.max(stats.corners.home, stats.corners.away, 10))}
          </div>
        </div>
        
        {/* Fouls */}
        <div
          data-eid="stat-fouls"
          style={{
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span data-eid="stat-fouls-home" style={{ fontWeight: 'bold', color: '#3b82f6' }}>{stats.fouls.home}</span>
            <span data-eid="stat-fouls-label" style={{ color: '#94a3b8' }}>Fouls</span>
            <span data-eid="stat-fouls-away" style={{ fontWeight: 'bold', color: '#ef4444' }}>{stats.fouls.away}</span>
          </div>
          <div data-eid="stat-fouls-bar">
            {renderStatBar(stats.fouls.home, stats.fouls.away, Math.max(stats.fouls.home, stats.fouls.away, 20))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div
        data-eid="events-section"
        style={{
          marginBottom: '30px',
        }}
      >
        <h2
          data-eid="events-title"
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e2e8f0',
            textAlign: 'center',
          }}
        >
          Match Events
        </h2>
        <div
          data-eid="events-list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {events.map((event, index) => (
            <div
              key={index}
              data-eid={`event-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                borderLeft: '4px solid',
                borderLeftColor: event.type === 'goal' ? '#10b981' :
                               event.type === 'yellow' ? '#f59e0b' :
                               event.type === 'red' ? '#ef4444' :
                               event.type === 'substitution' ? '#8b5cf6' : '#94a3b8',
              }}
            >
              <span
                data-eid={`event-${index}-time`}
                style={{
                  fontWeight: 'bold',
                  minWidth: '36px',
                  textAlign: 'center',
                  color: '#94a3b8',
                }}
              >
                {event.time}
              </span>
              <span
                data-eid={`event-${index}-icon`}
                style={{
                  marginRight: '12px',
                  fontSize: '18px',
                  width: '24px',
                  textAlign: 'center',
                }}
              >
                {event.type === 'goal' && '⚽'}
                {event.type === 'yellow' && '🟨'}
                {event.type === 'red' && '🟥'}
                {event.type === 'substitution' && '🔄'}
              </span>
              <span
                data-eid={`event-${index}-detail`}
                style={{
                  flex: 1,
                  fontSize: '15px',
                }}
              >
                {event.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings Section */}
      <div
        data-eid="ratings-section"
        style={{
          marginBottom: '30px',
        }}
      >
        <h2
          data-eid="ratings-title"
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e2e8f0',
            textAlign: 'center',
          }}
        >
          Player Ratings
        </h2>
        <div
          data-eid="ratings-table"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {ratings.map((rating, index) => (
            <div
              key={index}
              data-eid={`rating-row-${index}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 12px',
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                alignItems: 'center',
              }}
            >
              <span
                data-eid={`rating-row-${index}-name`}
                style={{
                  fontSize: '15px',
                  fontWeight: '500',
                }}
              >
                {rating.name}
              </span>
              <span
                data-eid={`rating-row-${index}-score`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#10b981',
                }}
              >
                {rating.rating}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Section */}
      <div
        data-eid="heatmap-section"
        style={{
          marginBottom: '30px',
        }}
      >
        <h2
          data-eid="heatmap-title"
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#e2e8f0',
            textAlign: 'center',
          }}
        >
          Touch Map
        </h2>
        <div
          data-eid="heatmap-grid"
          style={{
            backgroundColor: '#0c1324',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
          }}
        >
          {renderHeatmapGrid()}
        </div>
        <div
          data-eid="heatmap-legend"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#0f172a', borderRadius: '2px' }} />
            <span>Low</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#334155', borderRadius: '2px' }} />
            <span>Med</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#64748b', borderRadius: '2px' }} />
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        data-eid="footer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#94a3b8',
          borderTop: '1px solid #1e293b',
          paddingTop: '16px',
        }}
      >
        <span data-eid="footer-venue">{footer.venue}</span>
        <span data-eid="footer-referee">{footer.referee}</span>
        <span data-eid="footer-attendance">{footer.attendance}</span>
      </footer>
    </section>
  );
};

export default SoccerMatchDashboard;