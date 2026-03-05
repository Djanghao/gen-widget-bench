import React from 'react';
import data from './data.json';

export default function FlightStatusBoard() {
  const { airportCode, boardTitle, currentTime, lastUpdated, flights } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#e6e6e6',
        width: '800px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <header 
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #333',
        }}
      >
        <div 
          data-eid="airport-code"
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span data-eid="plane-icon" style={{ fontSize: '24px' }}>✈️</span>
          {airportCode}
        </div>
        <div 
          data-eid="board-title"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {boardTitle}
        </div>
        <div 
          data-eid="current-time"
          style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#a0a0c0',
          }}
        >
          {currentTime}
        </div>
      </header>

      {/* Column Headers */}
      <div 
        data-eid="column-headers"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1.5fr',
          gap: '16px',
          marginBottom: '16px',
          padding: '0 8px',
          borderBottom: '1px solid #333',
          paddingBottom: '8px',
        }}
      >
        <span data-eid="col-flight" style={{ fontSize: '14px', fontWeight: '600', color: '#a0a0c0' }}>Flight</span>
        <span data-eid="col-destination" style={{ fontSize: '14px', fontWeight: '600', color: '#a0a0c0' }}>Destination</span>
        <span data-eid="col-scheduled" style={{ fontSize: '14px', fontWeight: '600', color: '#a0a0c0' }}>Sched.</span>
        <span data-eid="col-actual" style={{ fontSize: '14px', fontWeight: '600', color: '#a0a0c0' }}>Actual</span>
        <span data-eid="col-gate" style={{ fontSize: '14px', fontWeight: '600', color: '#a0a0c0' }}>Gate</span>
        <span data-eid="col-status" style={{ fontSize: '14px', fontWeight: '600', color: '#a0a0c0' }}>Status</span>
      </div>

      {/* Flight List */}
      <div 
        data-eid="flight-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {flights.map((flight, index) => {
          const eidPrefix = `flight-${index}`;
          return (
            <div 
              key={flight.flightNumber}
              data-eid={eidPrefix}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1.5fr',
                gap: '16px',
                padding: '12px 8px',
                borderRadius: '8px',
                backgroundColor: '#252540',
                border: '1px solid #333',
              }}
            >
              <span data-eid={`${eidPrefix}-number`} style={{ fontSize: '16px', fontWeight: '600' }}>{flight.flightNumber}</span>
              <span data-eid={`${eidPrefix}-dest`} style={{ fontSize: '14px', color: '#c0c0e0' }}>{flight.destination}</span>
              <span data-eid={`${eidPrefix}-sched`} style={{ fontSize: '14px', color: '#c0c0e0' }}>{flight.scheduled}</span>
              <span data-eid={`${eidPrefix}-actual`} style={{ fontSize: '14px', color: '#c0c0e0' }}>{flight.actual}</span>
              <span data-eid={`${eidPrefix}-gate`} style={{ fontSize: '14px', color: '#c0c0e0' }}>{flight.gate}</span>
              <span data-eid={`${eidPrefix}-status`} style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                padding: '4px 12px',
                borderRadius: '20px',
                textAlign: 'center',
                backgroundColor: flight.statusColor,
                color: '#fff',
              }}>
                {flight.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer 
        data-eid="footer"
        style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: '#777',
        }}
      >
        <span data-eid="last-updated">{lastUpdated}</span>
        <span>Terminal 3 • SFO</span>
      </footer>
    </section>
  );
}