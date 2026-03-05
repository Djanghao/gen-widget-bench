import React from 'react';
import { Plane } from 'lucide-react';
import data from './data.json';

const Widget = () => {
  const rootStyle: React.CSSProperties = {
    backgroundColor: '#1E293B',
    borderRadius: '0.75rem', /* 12px */
    padding: '1.25rem', /* 20px */
    width: 'fit-content',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    color: '#E0F2FE',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    minWidth: '700px'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1rem', /* 16px */
    marginBottom: '1rem', /* 16px */
    borderBottom: '1px solid #334155',
  };

  const airportCodeContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.75rem', /* 28px */
    fontWeight: '700',
    color: '#93C5FD',
  };

  const planeIconStyle: React.CSSProperties = {
    marginRight: '0.5rem', /* 8px */
    width: '1.75rem',
    height: '1.75rem',
  };

  const boardTitleStyle: React.CSSProperties = {
    fontSize: '1.125rem', /* 18px */
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: '0.05em', /* tracking-wide */
  };

  const currentTimeStyle: React.CSSProperties = {
    fontSize: '1.125rem', /* 18px */
    fontWeight: '600',
    color: '#93C5FD',
  };

  const columnHeadersStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.7fr) minmax(0, 1fr)',
    paddingBottom: '0.75rem', /* 12px */
    marginBottom: '0.75rem', /* 12px */
    borderBottom: '1px solid #334155',
    fontSize: '0.875rem', /* 14px */
    fontWeight: '500',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  };

  const flightRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.7fr) minmax(0, 1fr)',
    paddingTop: '0.75rem', /* 12px */
    paddingBottom: '0.75rem', /* 12px */
    alignItems: 'center',
    fontSize: '0.9375rem', /* Between 14px and 16px */
    fontWeight: '500',
    color: '#E0F2FE',
  };

  const lastFlightRowStyle = {
    ...flightRowStyle,
    borderBottom: 'none',
  };

  const flightNumberStyle: React.CSSProperties = {
    fontWeight: '700',
  };

  const destinationStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const highlightedTimeStyle: React.CSSProperties = {
    color: '#FBBF24',
    fontWeight: '700',
  };

  const gateStyle: React.CSSProperties = {
    fontWeight: '700',
  };

  const statusBadgeBaseStyle: React.CSSProperties = {
    borderRadius: '0.375rem', /* 6px */
    padding: '0.3rem 0.6rem', /* 4.8px 9.6px */
    fontSize: '0.8125rem', /* 13px */
    fontWeight: '600',
    textAlign: 'center',
    width: 'fit-content',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '1rem', /* 16px */
    marginTop: '1rem', /* 16px */
    fontSize: '0.8125rem', /* 13px */
    color: '#6B7280',
    fontWeight: '500',
  };

  const getStatusBadgeStyle = (status: string, color: string) => {
    let textColor = '#111827'; // Dark text for green/yellow
    if (status === 'Boarding' || status === 'Departed') {
      textColor = '#E0F2FE'; // Light text for blue/grey
    }
    return {
      ...statusBadgeBaseStyle,
      backgroundColor: color,
      color: textColor,
    };
  };

  return (
    <section data-eid="root" style={rootStyle}>
      <header data-eid="header" style={headerStyle}>
        <div data-eid="airport-code" style={airportCodeContainerStyle}>
          <Plane data-eid="plane-icon" style={planeIconStyle} />
          <span>{data.header.airportCode}</span>
        </div>
        <div data-eid="board-title" style={boardTitleStyle}>{data.header.title}</div>
        <div data-eid="current-time" style={currentTimeStyle}>{data.header.currentTime}</div>
      </header>

      <div data-eid="column-headers" style={columnHeadersStyle}>
        <span data-eid="col-flight">{data.columnHeaders[0]}</span>
        <span data-eid="col-destination">{data.columnHeaders[1]}</span>
        <span data-eid="col-scheduled">{data.columnHeaders[2]}</span>
        <span data-eid="col-actual">{data.columnHeaders[3]}</span>
        <span data-eid="col-gate">{data.columnHeaders[4]}</span>
        <span data-eid="col-status">{data.columnHeaders[5]}</span>
      </div>

      <div data-eid="flight-list">
        {data.flights.map((flight, index) => (
          <div
            key={index}
            data-eid={`flight-${index}`}
            style={index === data.flights.length - 1 ? lastFlightRowStyle : { ...flightRowStyle, borderBottom: '1px solid #334155' }}
          >
            <span data-eid={`flight-${index}-number`} style={flightNumberStyle}>{flight.flightNumber}</span>
            <span data-eid={`flight-${index}-dest`} style={destinationStyle}>{flight.destination}</span>
            <span data-eid={`flight-${index}-sched`}>{flight.scheduledTime}</span>
            <span
              data-eid={`flight-${index}-actual`}
              style={flight.actualTimeHighlight ? highlightedTimeStyle : {}}
            >
              {flight.actualTime}
            </span>
            <span data-eid={`flight-${index}-gate`} style={gateStyle}>{flight.gate}</span>
            <span data-eid={`flight-${index}-status`} style={getStatusBadgeStyle(flight.status, flight.statusColor)}>
              {flight.status}
            </span>
          </div>
        ))}
      </div>

      <footer data-eid="footer" style={footerStyle}>
        <span data-eid="last-updated">{data.footer.lastUpdated}</span>
        <span>{data.footer.terminalInfo}</span>
      </footer>
    </section>
  );
};

export default Widget;