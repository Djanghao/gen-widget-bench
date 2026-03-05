import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RotateCcw } from 'lucide-react';
import data from './data.json';

const FlightTrackerWidget = () => {
  const { stats, airports, flights, timeline, weather } = data;

  // Map data for scatter chart
  const mapData = airports.map(airport => ({
    name: airport.code,
    lat: airport.lat,
    lng: airport.lng,
    size: 10
  }));

  // Timeline bar positions (calculated based on departure/arrival times)
  const getTimelinePosition = (departure: string, arrival: string) => {
    const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
    const depHour = hours.indexOf(departure);
    const arrHour = hours.indexOf(arrival);
    const width = ((arrHour - depHour) + 1) * 100;
    const left = depHour * 100;
    return { left, width };
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#121212',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '32px' }}>
        <h1 data-eid="title" style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 16px 0' }}>
          Flight Tracker
        </h1>
        <div data-eid="header-stats" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span data-eid="stat-total" style={{ backgroundColor: '#1e1e1e', padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}>
            Total: {stats.total} flights
          </span>
          <span data-eid="stat-ontime" style={{ backgroundColor: '#1e1e1e', padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}>
            On-time: {stats.ontime}
          </span>
          <span data-eid="stat-delayed" style={{ backgroundColor: '#1e1e1e', padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}>
            Delayed: {stats.delayed}
          </span>
          <span data-eid="stat-landed" style={{ backgroundColor: '#1e1e1e', padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}>
            Landed: {stats.landed}
          </span>
        </div>
      </header>

      {/* Map Section */}
      <div data-eid="map-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="map-title" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
          Airport Locations
        </h2>
        <div data-eid="map-chart" style={{ height: '300px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" dataKey="lng" name="Longitude" stroke="#aaa" />
              <YAxis type="number" dataKey="lat" name="Latitude" stroke="#aaa" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', color: '#fff' }} 
                itemStyle={{ color: '#fff' }}
              />
              <Scatter name="Airports" data={mapData} fill="#4f46e5" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flights Section */}
      <div data-eid="flights-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="flights-title" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
          Active Flights
        </h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {flights.map((flight, index) => (
            <div 
              key={`flight-${index}`} 
              data-eid={`flight-${index}`} 
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px'
              }}
            >
              <div style={{ gridColumn: '1 / -1' }}>
                <div data-eid={`flight-${index}-route`} style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  {flight.route}
                </div>
                <span data-eid={`flight-${index}-number`} style={{ fontSize: '18px', fontWeight: '700', marginRight: '12px' }}>
                  {flight.number}
                </span>
                <span data-eid={`flight-${index}-status`} style={{
                  backgroundColor: flight.status === 'On Time' ? '#10b981' : flight.status === 'Delayed' ? '#f59e0b' : '#ef4444',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {flight.status}
                </span>
              </div>
              
              <div>
                <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Departure</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{flight.departTime}</div>
                <span data-eid={`flight-${index}-depart-time`} style={{ display: 'none' }}>{flight.departTime}</span>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{flight.departGate}</div>
                <span data-eid={`flight-${index}-gate`} style={{ display: 'none' }}>{flight.departGate}</span>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{flight.weatherDep}</div>
                <span data-eid={`flight-${index}-weather-dep`} style={{ display: 'none' }}>{flight.weatherDep}</span>
              </div>
              
              <div>
                <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Arrival</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{flight.arriveTime}</div>
                <span data-eid={`flight-${index}-arrive-time`} style={{ display: 'none' }}>{flight.arriveTime}</span>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{flight.arriveGate}</div>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{flight.weatherArr}</div>
                <span data-eid={`flight-${index}-weather-arr`} style={{ display: 'none' }}>{flight.weatherArr}</span>
              </div>
              
              <div style={{ gridColumn: '1 / -1', marginTop: '12px' }}>
                <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Progress</div>
                <div style={{ 
                  height: '8px', 
                  backgroundColor: '#333', 
                  borderRadius: '4px', 
                  overflow: 'hidden' 
                }}>
                  <div 
                    data-eid={`flight-${index}-progress`} 
                    style={{ 
                      height: '100%', 
                      width: `${flight.progress}%`, 
                      backgroundColor: flight.status === 'On Time' ? '#10b981' : flight.status === 'Delayed' ? '#f59e0b' : '#ef4444',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div data-eid="timeline-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="timeline-title" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
          Flight Timeline
        </h2>
        <div data-eid="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '12px', color: '#aaa' }}>
          <span data-eid="timeline-hour-0">6AM</span>
          <span data-eid="timeline-hour-1">9AM</span>
          <span data-eid="timeline-hour-2">12PM</span>
          <span data-eid="timeline-hour-3">3PM</span>
          <span data-eid="timeline-hour-4">6PM</span>
          <span data-eid="timeline-hour-5">9PM</span>
        </div>
        
        <div style={{ position: 'relative', height: '200px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '16px' }}>
          {flights.map((flight, index) => {
            const { left, width } = getTimelinePosition(flight.departTime, flight.arriveTime);
            return (
              <div 
                key={`timeline-${index}`} 
                data-eid={`timeline-bar-${index}`} 
                style={{
                  position: 'absolute',
                  top: `${index * 24 + 16}px`,
                  left: `${left}px`,
                  width: `${width}px`,
                  height: '16px',
                  backgroundColor: flight.status === 'On Time' ? '#10b981' : flight.status === 'Delayed' ? '#f59e0b' : '#ef4444',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '8px',
                  fontSize: '12px',
                  color: '#ffffff'
                }}
              >
                <span data-eid={`timeline-bar-${index}-label`}>{flight.number}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather Section */}
      <div data-eid="weather-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="weather-title" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
          Airport Weather
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {weather.map((w, index) => (
            <div 
              key={`weather-${index}`} 
              data-eid={`weather-airport-${index}`} 
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{w.airport}</div>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                <span data-eid={`weather-airport-${index}-temp`}>{w.temp}</span>°
              </div>
              <div style={{ fontSize: '12px', color: '#aaa' }}>
                <span data-eid={`weather-airport-${index}-cond`}>{w.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '16px' }}>
        <span data-eid="footer-text" style={{ fontSize: '14px', color: '#aaa' }}>
          Last updated: {data.lastUpdated}
        </span>
        <span data-eid="footer-refresh" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <RotateCcw size={16} />
          Refresh
        </span>
      </footer>
    </section>
  );
};

export default FlightTrackerWidget;