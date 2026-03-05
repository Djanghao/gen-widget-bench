// submissions/gpt-widget/widget.tsx
import React from 'react';
import { ArrowRight, Clock, Footprints, Bus, MapPin } from 'lucide-react';
import data from './data.json';

export default function Widget() {
  const bg0 = '#0b1020';
  const bg1 = '#0c1426';
  const text = '#e7eefc';
  const mut = 'rgba(231,238,252,0.62)';
  const mut2 = 'rgba(231,238,252,0.42)';

  const cardShadow = '0 24px 60px rgba(0,0,0,0.55)';
  const hair = 'rgba(255,255,255,0.06)';

  const walk = '#b7ff38';
  const bus = '#34b6ff';

  return (
    <section
      data-eid="root"
      style={{
        width: 400,
        height: 526,
        borderRadius: 26,
        background: `radial-gradient(120% 120% at 25% 10%, ${bg1} 0%, ${bg0} 60%, #070a14 100%)`,
        boxShadow: cardShadow,
        position: 'relative',
        overflow: 'hidden',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: text,
      }}
    >
      {/* subtle vignette */}
      <div
        style={{
          position: 'absolute',
          inset: -60,
          background:
            'radial-gradient(70% 60% at 30% 15%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 35%, rgba(0,0,0,0.0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <header
        data-eid="header"
        style={{
          position: 'relative',
          padding: '18px 20px 8px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            data-eid="origin-label"
            style={{ fontSize: 19, fontWeight: 700, letterSpacing: 0.2 }}
          >
            {data.header.origin}
          </span>
          <span data-eid="route-arrow" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <ArrowRight size={18} color={'#5aa8ff'} />
          </span>
          <span
            data-eid="dest-label"
            style={{ fontSize: 19, fontWeight: 700, letterSpacing: 0.2 }}
          >
            {data.header.destination}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
          <div
            data-eid="total-time"
            style={{
              background: 'rgba(55, 139, 255, 0.18)',
              color: '#79b6ff',
              fontWeight: 700,
              fontSize: 13,
              padding: '6px 10px',
              borderRadius: 10,
              lineHeight: 1,
            }}
          >
            {data.header.totalTime}
          </div>

          <div
            data-eid="departure-time"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: mut,
              fontSize: 12,
              letterSpacing: 0.1,
            }}
          >
            <Clock size={13} color={mut2} />
            <span>
              {data.header.departureText}
              {' — '}
              {data.header.arrivalText}
            </span>
          </div>
        </div>
      </header>

      <div
        data-eid="route-timeline"
        style={{
          position: 'relative',
          padding: '8px 20px 0 20px',
          height: 290,
        }}
      >
        {/* timeline line */}
        <div
          data-eid="timeline-line"
          style={{
            position: 'absolute',
            left: 40,
            top: 54,
            bottom: 34,
            width: 2,
            background: 'rgba(140,170,220,0.35)',
            borderRadius: 2,
          }}
        />

        {/* segment 0 */}
        <div
          data-eid="segment-0"
          style={{
            display: 'grid',
            gridTemplateColumns: '42px 1fr',
            columnGap: 12,
            paddingTop: 12,
          }}
        >
          <span
            data-eid="segment-0-icon"
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              border: `2px solid rgba(183,255,56,0.9)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 2,
              background: 'rgba(0,0,0,0.08)',
              zIndex: 1,
            }}
          >
            <Footprints size={16} color={walk} />
          </span>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span data-eid="segment-0-mode" style={{ fontWeight: 700, fontSize: 13 }}>
                {data.segments[0].mode}
              </span>
              <span
                data-eid="segment-0-duration"
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#0b1a0a',
                  background: 'rgba(183,255,56,0.95)',
                  padding: '2px 8px',
                  borderRadius: 8,
                  lineHeight: 1.2,
                }}
              >
                {data.segments[0].duration}
              </span>
            </div>

            <div style={{ marginTop: 7, display: 'grid', gap: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: mut, fontSize: 12 }}>
                <MapPin size={13} color={mut2} />
                <span data-eid="segment-0-from">{data.segments[0].from}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: mut, fontSize: 12 }}>
                <MapPin size={13} color={mut2} />
                <span data-eid="segment-0-to">{data.segments[0].to}</span>
              </div>
            </div>
          </div>
        </div>

        {/* segment 1 */}
        <div
          data-eid="segment-1"
          style={{
            display: 'grid',
            gridTemplateColumns: '42px 1fr',
            columnGap: 12,
            paddingTop: 18,
          }}
        >
          <span
            data-eid="segment-1-icon"
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              border: `2px solid rgba(52,182,255,0.9)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 2,
              background: 'rgba(0,0,0,0.08)',
              zIndex: 1,
            }}
          >
            <Bus size={16} color={bus} />
          </span>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span data-eid="segment-1-route" style={{ fontWeight: 800, fontSize: 13 }}>
                {data.segments[1].route}
              </span>
              <span
                data-eid="segment-1-duration"
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#0b2436',
                  background: 'rgba(52,182,255,0.95)',
                  padding: '2px 8px',
                  borderRadius: 8,
                  lineHeight: 1.2,
                }}
              >
                {data.segments[1].duration}
              </span>
              <span data-eid="segment-1-stops" style={{ fontSize: 12, color: mut2 }}>
                {data.segments[1].stops}
              </span>
            </div>

            <div style={{ marginTop: 7, display: 'grid', gap: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: mut, fontSize: 12 }}>
                <MapPin size={13} color={mut2} />
                <span data-eid="segment-1-from">{data.segments[1].from}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: mut, fontSize: 12 }}>
                <MapPin size={13} color={mut2} />
                <span data-eid="segment-1-to">{data.segments[1].to}</span>
              </div>
              <div style={{ display: 'flex', gap: 10, fontSize: 11, color: mut2, marginLeft: 2 }}>
                <span data-eid="segment-1-depart-time">{data.segments[1].depart}</span>
                <span data-eid="segment-1-arrive-time">{data.segments[1].arrive}</span>
              </div>
            </div>
          </div>
        </div>

        {/* segment 2 */}
        <div
          data-eid="segment-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '42px 1fr',
            columnGap: 12,
            paddingTop: 18,
          }}
        >
          <span
            data-eid="segment-2-icon"
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              border: `2px solid rgba(183,255,56,0.9)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 2,
              background: 'rgba(0,0,0,0.08)',
              zIndex: 1,
            }}
          >
            <Footprints size={16} color={walk} />
          </span>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span data-eid="segment-2-mode" style={{ fontWeight: 700, fontSize: 13 }}>
                {data.segments[2].mode}
              </span>
              <span
                data-eid="segment-2-duration"
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#0b1a0a',
                  background: 'rgba(183,255,56,0.95)',
                  padding: '2px 8px',
                  borderRadius: 8,
                  lineHeight: 1.2,
                }}
              >
                {data.segments[2].duration}
              </span>
            </div>

            <div style={{ marginTop: 7, display: 'grid', gap: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: mut, fontSize: 12 }}>
                <MapPin size={13} color={mut2} />
                <span data-eid="segment-2-from">{data.segments[2].from}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: mut, fontSize: 12 }}>
                <MapPin size={13} color={mut2} />
                <span data-eid="segment-2-to">{data.segments[2].to}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        data-eid="alternatives-section"
        style={{
          position: 'relative',
          padding: '10px 18px 18px 18px',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${hair}`,
            borderRadius: 18,
            padding: '14px 14px 12px 14px',
          }}
        >
          <div
            data-eid="alt-title"
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.1,
              color: mut2,
              marginBottom: 10,
            }}
          >
            {data.alternatives.title}
          </div>

          {/* alt 0 */}
          <div
            data-eid="alt-0"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 10px',
              borderRadius: 14,
              background: 'rgba(0,0,0,0.10)',
              border: `1px solid rgba(255,255,255,0.04)`,
              marginBottom: 10,
            }}
          >
            <div style={{ display: 'grid', gap: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(231,238,252,0.92)' }}>
                {data.alternatives.items[0].label}
              </div>
              <div style={{ fontSize: 11, color: mut2, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{data.alternatives.items[0].meta}</span>
                <span style={{ color: 'rgba(183,255,56,0.9)', letterSpacing: 1 }}>
                  {data.alternatives.items[0].icons}
                </span>
              </div>
            </div>
            <span
              data-eid="alt-0-time"
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: '#cfe1ff',
                background: 'rgba(108,140,255,0.22)',
                border: '1px solid rgba(120,150,255,0.20)',
                padding: '5px 10px',
                borderRadius: 10,
                lineHeight: 1,
              }}
            >
              {data.alternatives.items[0].time}
            </span>
          </div>

          {/* alt 1 */}
          <div
            data-eid="alt-1"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 10px',
              borderRadius: 14,
              background: 'rgba(0,0,0,0.10)',
              border: `1px solid rgba(255,255,255,0.04)`,
            }}
          >
            <div style={{ display: 'grid', gap: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(231,238,252,0.92)' }}>
                {data.alternatives.items[1].label}
              </div>
              <div style={{ fontSize: 11, color: mut2, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{data.alternatives.items[1].meta}</span>
                <span style={{ color: 'rgba(183,255,56,0.9)', letterSpacing: 1 }}>
                  {data.alternatives.items[1].icons}
                </span>
              </div>
            </div>
            <span
              data-eid="alt-1-time"
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: '#cfe1ff',
                background: 'rgba(108,140,255,0.22)',
                border: '1px solid rgba(120,150,255,0.20)',
                padding: '5px 10px',
                borderRadius: 10,
                lineHeight: 1,
              }}
            >
              {data.alternatives.items[1].time}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}