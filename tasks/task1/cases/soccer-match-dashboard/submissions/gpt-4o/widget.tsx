import React from 'react';
import data from './data.json';

const Widget: React.FC = () => (
  <section data-eid="root" style={{ background: '#23412F', padding: '20px', borderRadius: '15px', color: '#FFF' }}>
    <div data-eid="scoreboard" style={{ textAlign: 'center', padding: '10px', borderRadius: '10px', background: '#2B5A4A' }}>
      <div style={{ textTransform: 'uppercase', color: '#FFA500' }}>UEFA Champions League - Quarter Final</div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '10px 0' }}>
        <div data-eid="home-badge" style={{ color: '#FFF', fontWeight: 'bold', fontSize: 'large' }}>RMA</div>
        <div data-eid="score-display" style={{ display: 'flex', alignItems: 'center' }}>
          <span data-eid="home-score" style={{ fontSize: '2em', fontWeight: 'bold' }}>{data.homeScore}</span>
          <span data-eid="score-separator" style={{ margin: '0 8px', fontSize: '1.5em' }}>-</span>
          <span data-eid="away-score" style={{ fontSize: '2em', fontWeight: 'bold' }}>{data.awayScore}</span>
        </div>
        <div data-eid="away-badge" style={{ color: '#FFF', fontWeight: 'bold', fontSize: 'large' }}>BAY</div>
      </div>
      <div>
        <span data-eid="home-name">Real Madrid</span> vs <span data-eid="away-name">Bayern Munich</span>
      </div>
      <div>
        <span data-eid="match-time" style={{ color: '#FFA500', display: 'inline-block', marginRight: '8px' }}>73'</span>
        <span data-eid="match-status" style={{ background: '#FFA500', color: '#23412F', padding: '2px 5px', borderRadius: '3px' }}>2nd Half</span>
      </div>
    </div>

    <div data-eid="formation-section" style={{ margin: '20px 0' }}>
      <h2 data-eid="formation-title" style={{ color: '#FFA500', marginBottom: '10px' }}>Formations</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span data-eid="home-formation-label">Real Madrid (4-3-3)</span>
        <span data-eid="away-formation-label">Bayern Munich (4-2-3-1)</span>
      </div>
      <div data-eid="formation-pitch" style={{ background: '#14462F', borderRadius: '10px', padding: '20px', position: 'relative' }}>
        {data.homeFormation.map((player, index) => (
          <span key={`home-player-${index}`} data-eid={`home-player-${index}`} style={{
            position: 'absolute', 
            top: `${player.top}%`, 
            left: `${player.left}%`, 
            width: '20px', 
            height: '20px', 
            background: '#FFF', 
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            color: '#23412F',
            fontWeight: 'bold'
          }}>{player.number}</span>
        ))}
        {data.awayFormation.map((player, index) => (
          <span key={`away-player-${index}`} data-eid={`away-player-${index}`} style={{
            position: 'absolute', 
            top: `${player.top}%`, 
            right: `${player.right}%`, 
            width: '20px', 
            height: '20px', 
            background: '#FFA500', 
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            color: '#23412F',
            fontWeight: 'bold'
          }}>{player.number}</span>
        ))}
      </div>
    </div>

    <div data-eid="stats-section" style={{ margin: '20px 0' }}>
      <h2 data-eid="stats-title" style={{ color: '#FFA500', marginBottom: '10px' }}>Match Statistics</h2>
      {data.stats.map((stat, index) => (
        <div key={`stat-${index}`} data-eid={`stat-${stat.type}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span data-eid={`stat-${stat.type}-home`} style={{ width: '15%', textAlign: 'right', marginRight: '5px' }}>{stat.home}%</span>
          <div data-eid={`stat-${stat.type}-bar`} style={{ flexGrow: '1', height: '5px', background: '#2B5A4A', margin: '0 5px', borderRadius: '5px', position: 'relative' }}>
            <div style={{
              width: `${stat.home}%`, 
              height: '100%', 
              background: '#FFA500', 
              borderRadius: '5px 0 0 5px'
            }}></div>
            <div style={{
              width: `${stat.away}%`, 
              height: '100%', 
              background: '#FFF', 
              borderRadius: '0 5px 5px 0', 
              position: 'absolute', 
              right: '0'
            }}></div>
          </div>
          <span data-eid={`stat-${stat.type}-away`} style={{ width: '15%', marginLeft: '5px' }}>{stat.away}%</span>
        </div>
      ))}
    </div>

    <div data-eid="events-section" style={{ margin: '20px 0' }}>
      <h2 data-eid="events-title" style={{ color: '#FFA500', marginBottom: '10px' }}>Match Events</h2>
      <div data-eid="events-list">
        {data.events.map((event, index) => (
          <div key={`event-${index}`} data-eid={`event-${index}`} style={{ background: '#2B5A4A', borderRadius: '5px', padding: '5px', margin: '5px 0', display: 'flex', alignItems: 'center' }}>
            <span data-eid={`event-${index}-time`} style={{ marginRight: '10px', color: '#FFA500' }}>{event.time}</span>
            <span data-eid={`event-${index}-icon`} style={{ marginRight: '10px' }}>{event.icon}</span>
            <span data-eid={`event-${index}-detail`} style={{ color: '#FFF' }}>{event.detail}</span>
          </div>
        ))}
      </div>
    </div>

    <div data-eid="ratings-section" style={{ margin: '20px 0' }}>
      <h2 data-eid="ratings-title" style={{ color: '#FFA500', marginBottom: '10px' }}>Top Player Ratings</h2>
      <div data-eid="ratings-table">
        {data.ratings.map((rating, index) => (
          <div key={`rating-row-${index}`} data-eid={`rating-row-${index}`} style={{ display: 'flex', justifyContent: 'space-between', background: '#2B5A4A', borderRadius: '5px', padding: '5px', margin: '5px 0' }}>
            <span data-eid={`rating-row-${index}-name`} style={{ color: '#FFA500' }}>{rating.name}</span>
            <span data-eid={`rating-row-${index}-score`} style={{ background: '#23412F', color: '#FFF', borderRadius: '5px', padding: '2px 5px' }}>{rating.score}</span>
          </div>
        ))}
      </div>
    </div>

    <div data-eid="heatmap-section" style={{ margin: '20px 0' }}>
      <h2 data-eid="heatmap-title" style={{ color: '#FFA500', marginBottom: '10px' }}>Touch Heatmap (Home)</h2>
      <div data-eid="heatmap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {data.heatmap.map((row, rowIndex) => (
          <div key={`heatmap-row-${rowIndex}`} data-eid={`heatmap-row-${rowIndex}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
            {row.map((value, cellIndex) => (
              <div key={`cell-${rowIndex}-${cellIndex}`} style={{
                height: '30px', 
                background: value > 10 ? '#FFA500' : value > 5 ? '#FFCC66' : '#FFECB3', 
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>{value}</div>
            ))}
          </div>
        ))}
      </div>
      <div data-eid="heatmap-legend" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <span style={{ color: '#FFECB3' }}>Low</span>
        <span style={{ color: '#FFCC66' }}>Medium</span>
        <span style={{ color: '#FFA500' }}>High</span>
      </div>
    </div>

    <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#FFA500' }}>
      <span data-eid="footer-venue">{data.footer.venue}</span>
      <span data-eid="footer-referee">{data.footer.referee}</span>
      <span data-eid="footer-attendance">{data.footer.attendance} fans</span>
    </footer>
  </section>
);

export default Widget;