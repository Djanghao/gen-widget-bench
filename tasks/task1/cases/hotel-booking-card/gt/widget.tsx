import data from './data.json'
import { Star, StarHalf, Wifi, Waves, Dumbbell, Sparkles, Utensils, Car, MapPin, Calendar, Users, BedDouble } from 'lucide-react'

type Amenity = {
  name: string
  icon: string
}

type HotelData = {
  hotelName: string
  hotelTag: string
  starRating: number
  address: string
  imageGradient: string[]
  booking: {
    checkIn: string
    checkOut: string
    nights: number
    guests: number
    roomType: string
  }
  pricing: {
    ratePerNight: number
    nights: number
    roomSubtotal: number
    taxesAndFees: number
    resortFee: number
    total: number
  }
  amenities: Amenity[]
  confirmationNumber: string
}

const hotel = data as HotelData

function AmenityIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const props = { size, strokeWidth: 1.6 }
  switch (icon) {
    case 'wifi': return <Wifi {...props} />
    case 'waves': return <Waves {...props} />
    case 'dumbbell': return <Dumbbell {...props} />
    case 'sparkles': return <Sparkles {...props} />
    case 'utensils': return <Utensils {...props} />
    case 'car': return <Car {...props} />
    default: return <Wifi {...props} />
  }
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 1 }}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={14} fill="#facc15" color="#facc15" />
      ))}
      {hasHalf && <StarHalf size={14} fill="#facc15" color="#facc15" />}
    </div>
  )
}

function fmt(n: number) {
  return `$${n.toFixed(2)}`
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(165deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1f 100%)',
        borderRadius: 22,
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        maxWidth: 420,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        data-eid="image-area"
        style={{
          background: `linear-gradient(135deg, ${hotel.imageGradient.join(', ')})`,
          display: 'flex',
          height: 140,
          justifyContent: 'flex-end',
          padding: 12,
          position: 'relative',
        }}
      >
        <span
          data-eid="hotel-tag"
          style={{
            alignSelf: 'flex-end',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: 8,
            color: '#e2e8f0',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.5,
            padding: '4px 10px',
            textTransform: 'uppercase',
          }}
        >
          {hotel.hotelTag}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '16px 18px 18px' }}>
        <div>
          <h2
            data-eid="hotel-name"
            style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3, margin: 0 }}
          >
            {hotel.hotelName}
          </h2>
          <div
            data-eid="star-rating"
            style={{ alignItems: 'center', display: 'flex', gap: 6, marginTop: 4 }}
          >
            <Stars rating={hotel.starRating} />
            <span
              data-eid="rating-value"
              style={{ color: '#facc15', fontSize: 13, fontWeight: 700 }}
            >
              {hotel.starRating}
            </span>
          </div>
          <div
            data-eid="hotel-address"
            style={{ alignItems: 'center', color: '#64748b', display: 'flex', fontSize: 11, gap: 4, marginTop: 4 }}
          >
            <MapPin size={11} />
            {hotel.address}
          </div>
        </div>

        <div
          data-eid="booking-details"
          style={{
            background: 'rgba(30, 41, 59, 0.4)',
            borderRadius: 14,
            display: 'grid',
            gap: 10,
            gridTemplateColumns: '1fr 1fr',
            padding: 14,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span data-eid="checkin-label" style={{ color: '#64748b', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}>
              Check-in
            </span>
            <span data-eid="checkin-date" style={{ alignItems: 'center', display: 'flex', fontSize: 13, fontWeight: 700, gap: 4 }}>
              <Calendar size={12} color="#60a5fa" />
              {hotel.booking.checkIn}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span data-eid="checkout-label" style={{ color: '#64748b', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}>
              Check-out
            </span>
            <span data-eid="checkout-date" style={{ alignItems: 'center', display: 'flex', fontSize: 13, fontWeight: 700, gap: 4 }}>
              <Calendar size={12} color="#60a5fa" />
              {hotel.booking.checkOut}
            </span>
          </div>
          <span
            data-eid="nights-count"
            style={{ alignItems: 'center', color: '#94a3b8', display: 'flex', fontSize: 12, gap: 4 }}
          >
            {hotel.booking.nights} nights
          </span>
          <span
            data-eid="guests-count"
            style={{ alignItems: 'center', color: '#94a3b8', display: 'flex', fontSize: 12, gap: 4 }}
          >
            <Users size={12} />
            {hotel.booking.guests} guests
          </span>
          <span
            data-eid="room-type"
            style={{
              alignItems: 'center',
              color: '#a5b4fc',
              display: 'flex',
              fontSize: 12,
              fontWeight: 600,
              gap: 4,
              gridColumn: 'span 2',
            }}
          >
            <BedDouble size={14} />
            {hotel.booking.roomType}
          </span>
        </div>

        <div data-eid="divider-1" style={{ background: 'rgba(71, 85, 105, 0.3)', height: 1 }} />

        <div data-eid="price-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            data-eid="room-rate-line"
            style={{ alignItems: 'center', display: 'flex', fontSize: 12, justifyContent: 'space-between' }}
          >
            <span style={{ color: '#94a3b8' }}>
              Room ({fmt(hotel.pricing.ratePerNight)}/night x {hotel.pricing.nights})
            </span>
            <span data-eid="room-rate-amount" style={{ fontWeight: 600 }}>
              {fmt(hotel.pricing.roomSubtotal)}
            </span>
          </div>
          <div
            data-eid="taxes-line"
            style={{ alignItems: 'center', display: 'flex', fontSize: 12, justifyContent: 'space-between' }}
          >
            <span style={{ color: '#94a3b8' }}>Taxes & Fees</span>
            <span data-eid="taxes-amount" style={{ fontWeight: 600 }}>
              {fmt(hotel.pricing.taxesAndFees)}
            </span>
          </div>
          <div
            data-eid="resort-fee-line"
            style={{ alignItems: 'center', display: 'flex', fontSize: 12, justifyContent: 'space-between' }}
          >
            <span style={{ color: '#94a3b8' }}>Resort Fee</span>
            <span data-eid="resort-fee-amount" style={{ fontWeight: 600 }}>
              {fmt(hotel.pricing.resortFee)}
            </span>
          </div>
          <div data-eid="divider-2" style={{ background: 'rgba(71, 85, 105, 0.3)', height: 1 }} />
          <div
            data-eid="total-line"
            style={{ alignItems: 'center', display: 'flex', fontSize: 14, fontWeight: 800, justifyContent: 'space-between' }}
          >
            <span>Total</span>
            <span data-eid="total-amount" style={{ color: '#4ade80' }}>
              {fmt(hotel.pricing.total)}
            </span>
          </div>
        </div>

        <div
          data-eid="amenities-row"
          style={{
            display: 'grid',
            gap: 6,
            gridTemplateColumns: 'repeat(6, 1fr)',
          }}
        >
          {hotel.amenities.map((a) => (
            <div
              key={a.name}
              data-eid={`amenity-${a.icon === 'utensils' ? 'restaurant' : a.icon === 'waves' ? 'pool' : a.icon === 'car' ? 'parking' : a.icon === 'sparkles' ? 'spa' : a.icon === 'dumbbell' ? 'gym' : a.name.toLowerCase()}`}
              style={{
                alignItems: 'center',
                background: 'rgba(30, 41, 59, 0.5)',
                borderRadius: 10,
                color: '#94a3b8',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                padding: '8px 4px',
              }}
            >
              <AmenityIcon icon={a.icon} size={16} />
              <span style={{ fontSize: 8, fontWeight: 600 }}>{a.name}</span>
            </div>
          ))}
        </div>

        <div
          data-eid="confirmation-section"
          style={{
            alignItems: 'center',
            background: 'rgba(74, 222, 128, 0.08)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 14px',
          }}
        >
          <span
            data-eid="confirmation-label"
            style={{ color: '#64748b', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}
          >
            Confirmation
          </span>
          <span
            data-eid="confirmation-number"
            style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: 13, fontWeight: 800, letterSpacing: 1 }}
          >
            {hotel.confirmationNumber}
          </span>
        </div>
      </div>
    </section>
  )
}
