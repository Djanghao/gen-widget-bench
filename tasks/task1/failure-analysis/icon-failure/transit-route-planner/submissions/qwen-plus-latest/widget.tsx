import React from 'react';
import { ArrowRight, Walk, Bus, Clock, MapPin } from 'lucide-react';
import data from './data.json';

export default function TransitRoutePlanner() {
  const { origin, destination, totalTime, departureTime, segments, alternatives } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span data-eid="origin-label" style={{ fontSize: '18px', fontWeight: '600' }}>{origin}</span>
          <span data-eid="route-arrow" style={{ color: '#4a90e2' }}>
            <ArrowRight size={20} />
          </span>
          <span data-eid="dest-label" style={{ fontSize: '18px', fontWeight: '600' }}>{destination}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div data-eid="total-time" style={{ fontSize: '20px', fontWeight: '700', color: '#4a90e2' }}>{totalTime}</div>
          <div data-eid="departure-time" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#aaa' }}>
            <Clock size={14} />
            {departureTime}
          </div>
        </div>
      </header>

      {/* Route Timeline */}
      <div data-eid="route-timeline" style={{ position: 'relative', paddingLeft: '32px', marginBottom: '32px' }}>
        {/* Vertical line */}
        <div data-eid="timeline-line" style={{
          position: 'absolute',
          left: '12px',
          top: '0',
          bottom: '0',
          width: '2px',
          backgroundColor: '#333'
        }}></div>

        {/* Segment 0 */}
        <div data-eid="segment-0" style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ marginTop: '4px', flexShrink: 0 }}>
            <Walk size={20} color="#4a90e2" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span data-eid="segment-0-mode" style={{ fontWeight: '600', color: '#4a90e2' }}>Walk</span>
              <span data-eid="segment-0-duration" style={{ fontSize: '14px', color: '#aaa' }}>{segments[0].duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#aaa' }}>
              <MapPin size={14} />
              <span data-eid="segment-0-from">{segments[0].from}</span>
              <span>→</span>
              <span data-eid="segment-0-to">{segments[0].to}</span>
            </div>
          </div>
        </div>

        {/* Segment 1 */}
        <div data-eid="segment-1" style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ marginTop: '4px', flexShrink: 0 }}>
            <Bus size={20} color="#4a90e2" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span data-eid="segment-1-route" style={{ fontWeight: '600', color: '#4a90e2' }}>{segments[1].route}</span>
              <span data-eid="segment-1-duration" style={{ fontSize: '14px', color: '#aaa' }}>{segments[1].duration}</span>
              <span data-eid="segment-1-stops" style={{ fontSize: '14px', color: '#aaa' }}>{segments[1].stops}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#aaa' }}>
              <span data-eid="segment-1-depart-time">{segments[1].departTime}</span>
              <span>→</span>
              <span data-eid="segment-1-arrive-time">{segments[1].arriveTime}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#aaa' }}>
              <MapPin size={14} />
              <span data-eid="segment-1-from">{segments[1].from}</span>
              <span>→</span>
              <span data-eid="segment-1-to">{segments[1].to}</span>
            </div>
          </div>
        </div>

        {/* Segment 2 */}
        <div data-eid="segment-2" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ marginTop: '4px', flexShrink: 0 }}>
            <Walk size={20} color="#4a90e2" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span data-eid="segment-2-mode" style={{ fontWeight: '600', color: '#4a90e2' }}>Walk</span>
              <span data-eid="segment-2-duration" style={{ fontSize: '14px', color: '#aaa' }}>{segments[2].duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#aaa' }}>
              <MapPin size={14} />
              <span data-eid="segment-2-from">{segments[2].from}</span>
              <span>→</span>
              <span data-eid="segment-2-to">{segments[2].to}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Routes */}
      <div data-eid="alternatives-section">
        <div data-eid="alt-title" style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#aaa' }}>
          Alternative Routes
        </div>
        <div data-eid="alt-0" style={{ 
          padding: '12px', 
          backgroundColor: '#2d2d2d', 
          borderRadius: '8px', 
          marginBottom: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '14px' }}>Route 12 & Bus 45</div>
          <span data-eid="alt-0-time" style={{ fontWeight: '600', color: '#4a90e2' }}>{alternatives[0].time}</span>
        </div>
        <div data-eid="alt-1" style={{ 
          padding: '12px', 
          backgroundColor: '#2d2d2d', 
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '14px' }}>Subway Line B</div>
          <span data-eid="alt-1-time" style={{ fontWeight: '600', color: '#4a90e2' }}>{alternatives[1].time}</span>
        </div>
      </div>
    </section>
  );
}