// submissions/<your-model-name>/widget.tsx
import React from 'react';
import data from './data.json';
import {
  Wifi,
  Waves,
  Dumbbell,
  Sparkles,
  UtensilsCrossed,
  Car,
  Star,
  MapPin,
  Calendar,
  User,
  BedDouble,
} from 'lucide-react';

export default function Widget() {
  const d = data as any;

  const cardW = 420;
  const radius = 22;

  const textMuted = 'rgba(220, 232, 255, 0.55)';
  const panelBg = 'rgba(255,255,255,0.03)';
  const line = 'rgba(255,255,255,0.08)';
  const accent = '#31e58a';
  const yellow = '#FFC400';

  const Amenity = ({
    icon,
    label,
    eid,
  }: {
    icon: React.ReactNode;
    label: string;
    eid: string;
  }) => (
    <div
      data-eid={eid}
      style={{
        width: 58,
        height: 52,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <div style={{ color: 'rgba(232,240,255,0.8)', lineHeight: 0 }}>{icon}</div>
      <div
        style={{
          fontSize: 9,
          color: 'rgba(232,240,255,0.62)',
          letterSpacing: 0.2,
        }}
      >
        {label}
      </div>
    </div>
  );

  const SmallLabel = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        fontSize: 10,
        letterSpacing: 0.8,
        color: 'rgba(220, 232, 255, 0.45)',
      }}
    >
      {children}
    </div>
  );

  return (
    <section
      data-eid="root"
      style={{
        width: cardW,
        borderRadius: radius,
        overflow: 'hidden',
        background:
          'radial-gradient(1000px 700px at 60% -20%, rgba(137,72,255,0.45), rgba(15,20,38,0) 55%), linear-gradient(180deg, #14183a 0%, #0f1328 55%, #0b1023 100%)',
        boxShadow: '0 22px 60px rgba(0,0,0,0.45)',
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      {/* Image header */}
      <div
        data-eid="image-area"
        style={{
          height: 170,
          position: 'relative',
          background:
            'linear-gradient(135deg, rgba(87,62,255,0.18) 0%, rgba(20,24,58,0.0) 35%), linear-gradient(180deg, rgba(25,34,92,0.15) 0%, rgba(10,14,33,0.45) 90%), radial-gradient(800px 300px at 70% 0%, rgba(131,75,255,0.55), rgba(17,20,45,0) 60%), linear-gradient(180deg, #2a2560 0%, #14183a 55%, #111632 100%)',
        }}
      >
        <span
          data-eid="hotel-tag"
          style={{
            position: 'absolute',
            right: 18,
            bottom: 18,
            padding: '6px 10px',
            borderRadius: 10,
            background: 'rgba(220, 235, 255, 0.16)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(240, 246, 255, 0.88)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.6,
          }}
        >
          {d.hotelTag}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 18px 18px' }}>
        <h2
          data-eid="hotel-name"
          style={{
            margin: 0,
            color: 'rgba(245, 248, 255, 0.95)',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: -0.2,
          }}
        >
          {d.hotelName}
        </h2>

        <div
          data-eid="star-rating"
          style={{
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Star key={i} size={14} fill={yellow} color={yellow} />
            ))}
            <Star size={14} fill={yellow} color={yellow} style={{ opacity: 0.85 }} />
          </div>
          <span
            data-eid="rating-value"
            style={{
              color: yellow,
              fontWeight: 800,
              fontSize: 13,
              marginTop: 1,
            }}
          >
            {d.ratingValue}
          </span>
        </div>

        <div
          data-eid="hotel-address"
          style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: textMuted,
            fontSize: 11,
          }}
        >
          <MapPin size={14} color="rgba(220, 232, 255, 0.45)" />
          <span style={{ color: textMuted }}>{d.address}</span>
        </div>

        {/* Booking details */}
        <div
          data-eid="booking-details"
          style={{
            marginTop: 14,
            borderRadius: 14,
            background: panelBg,
            border: '1px solid rgba(255,255,255,0.06)',
            padding: 14,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <SmallLabel>
                <span data-eid="checkin-label">{d.checkInLabel}</span>
              </SmallLabel>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'rgba(240,246,255,0.9)',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <Calendar size={14} color="rgba(220, 232, 255, 0.55)" />
                <span data-eid="checkin-date">{d.checkInDate}</span>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <SmallLabel>
                <span data-eid="checkout-label">{d.checkOutLabel}</span>
              </SmallLabel>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'rgba(240,246,255,0.9)',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <Calendar size={14} color="rgba(220, 232, 255, 0.55)" />
                <span data-eid="checkout-date">{d.checkOutDate}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              color: 'rgba(232,240,255,0.78)',
              fontSize: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span data-eid="nights-count" style={{ color: 'rgba(232,240,255,0.68)' }}>
                {d.nightsCount}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={14} color="rgba(220, 232, 255, 0.5)" />
              <span data-eid="guests-count" style={{ color: 'rgba(232,240,255,0.68)' }}>
                {d.guestsCount}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BedDouble size={14} color="rgba(220, 232, 255, 0.5)" />
              <span data-eid="room-type" style={{ color: 'rgba(191, 214, 255, 0.9)' }}>
                {d.roomType}
              </span>
            </div>
          </div>
        </div>

        <div
          data-eid="divider-1"
          style={{
            height: 1,
            background: line,
            margin: '16px 0',
          }}
        />

        {/* Price section */}
        <div data-eid="price-section" style={{}}>
          <div
            data-eid="room-rate-line"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'rgba(232,240,255,0.55)',
              fontSize: 12,
              padding: '6px 0',
            }}
          >
            <span>{d.roomRateLabel}</span>
            <span
              data-eid="room-rate-amount"
              style={{ color: 'rgba(240,246,255,0.88)', fontWeight: 700 }}
            >
              {d.roomRateAmount}
            </span>
          </div>

          <div
            data-eid="taxes-line"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'rgba(232,240,255,0.55)',
              fontSize: 12,
              padding: '6px 0',
            }}
          >
            <span>{d.taxesLabel}</span>
            <span
              data-eid="taxes-amount"
              style={{ color: 'rgba(240,246,255,0.88)', fontWeight: 700 }}
            >
              {d.taxesAmount}
            </span>
          </div>

          <div
            data-eid="resort-fee-line"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'rgba(232,240,255,0.55)',
              fontSize: 12,
              padding: '6px 0',
            }}
          >
            <span>{d.resortFeeLabel}</span>
            <span
              data-eid="resort-fee-amount"
              style={{ color: 'rgba(240,246,255,0.88)', fontWeight: 700 }}
            >
              {d.resortFeeAmount}
            </span>
          </div>

          <div
            data-eid="divider-2"
            style={{
              height: 1,
              background: line,
              margin: '10px 0 8px 0',
            }}
          />

          <div
            data-eid="total-line"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: 4,
            }}
          >
            <span
              style={{
                color: 'rgba(240,246,255,0.9)',
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              Total
            </span>
            <span
              data-eid="total-amount"
              style={{
                color: accent,
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 0.2,
              }}
            >
              {d.totalAmount}
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div
          data-eid="amenities-row"
          style={{
            marginTop: 14,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <Amenity eid="amenity-wifi" icon={<Wifi size={16} />} label={d.amenities.wifi} />
          <Amenity eid="amenity-pool" icon={<Waves size={16} />} label={d.amenities.pool} />
          <Amenity eid="amenity-gym" icon={<Dumbbell size={16} />} label={d.amenities.gym} />
          <Amenity eid="amenity-spa" icon={<Sparkles size={16} />} label={d.amenities.spa} />
          <Amenity
            eid="amenity-restaurant"
            icon={<UtensilsCrossed size={16} />}
            label={d.amenities.dining}
          />
          <Amenity eid="amenity-parking" icon={<Car size={16} />} label={d.amenities.parking} />
        </div>

        {/* Confirmation */}
        <div
          data-eid="confirmation-section"
          style={{
            marginTop: 14,
            borderRadius: 14,
            padding: '12px 14px',
            background:
              'linear-gradient(180deg, rgba(31, 39, 64, 0.55), rgba(17, 24, 43, 0.55))',
            border: '1px solid rgba(83, 255, 186, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <span
            data-eid="confirmation-label"
            style={{
              fontSize: 10,
              letterSpacing: 0.7,
              fontWeight: 800,
              color: 'rgba(220, 232, 255, 0.45)',
            }}
          >
            {d.confirmationLabel}
          </span>
          <span
            data-eid="confirmation-number"
            style={{
              fontSize: 12,
              fontWeight: 900,
              color: accent,
              letterSpacing: 1.2,
            }}
          >
            {d.confirmationNumber}
          </span>
        </div>
      </div>
    </section>
  );
}