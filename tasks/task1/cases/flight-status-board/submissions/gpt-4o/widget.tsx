import React from 'react';
import { Airplane } from 'lucide-react';
import data from './data.json';

const FlightStatusBoard: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{
        background: '#1a1f35',
        borderRadius: '10px',
        padding: '16px',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        width: '350px'
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #283044',
          paddingBottom: '8px',
          marginBottom: '8px'
        }}
      >
        <div data-eid="airport-code" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '18px' }}>
          <span data-eid="plane-icon" style={{ marginRight: '8px' }}>
            <Airplane size={16} color="#fff" />
          </span>
          {data.airportCode}
        </div>
        <div data-eid="board-title" style={{ flex: 2, textAlign: 'center' }}>
          {data.title}
        </div>
        <div data-eid="current-time" style={{ fontWeight: 'bold', fontSize: '16px' }}>
          {data.currentTime}
        </div>
      </header>
      <div
        data-eid="column-headers"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          borderBottom: '1px solid #283044',
          paddingBottom: '4px',
          marginBottom: '8px',
          opacity: 0.7
        }}
      >
        <span data-eid="col-flight" style={{ flex: 1 }}>FLIGHT</span>
        <span data-eid="col-destination" style={{ flex: 2 }}>DESTINATION</span>
        <span data-eid="col-scheduled" style={{ flex: 1 }}>SCHED.</span>
        <span data-eid="col-actual" style={{ flex: 1 }}>ACTUAL</span>
        <span data-eid="col-gate" style={{ flex: 1 }}>GATE</span>
        <span data-eid="col-status" style={{ flex: 1 }}>STATUS</span>
      </div>
      <div data-eid="flight-list">
        {data.flights.map((flight, index) => (
          <div
            data-eid={`flight-${index}`}
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 0',
              fontSize: '14px',
              borderBottom: index < data.flights.length - 1 ? '1px solid #283044' : ''
            }}
          >
            <span data-eid={`flight-${index}-number`} style={{ flex: 1, fontWeight: 'bold' }}>{flight.number}</span>
            <span data-eid={`flight-${index}-dest`} style={{ flex: 2 }}>{flight.destination}</span>
            <span data-eid={`flight-${index}-sched`} style={{ flex: 1 }}>{flight.scheduled}</span>
            <span data-eid={`flight-${index}-actual`} style={{ flex: 1, color: flight.status === 'Delayed' ? '#F8C642' : '#fff' }}>{flight.actual}</span>
            <span data-eid={`flight-${index}-gate`} style={{ flex: 1 }}>{flight.gate}</span>
            <span
              data-eid={`flight-${index}-status`}
              style={{
                flex: 1,
                backgroundColor: flight.statusColor,
                color: '#fff',
                borderRadius: '4px',
                padding: '2px 4px',
                textAlign: 'center',
              }}
            >
              {flight.status}
            </span>
          </div>
        ))}
      </div>
      <footer
        data-eid="footer"
        style={{
          marginTop: '8px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          opacity: 0.7
        }}
      >
        <span data-eid="last-updated">{data.lastUpdated}</span>
        <span>{data.terminalInfo}</span>
      </footer>
    </section>
  );
};

export default FlightStatusBoard;