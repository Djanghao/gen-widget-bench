import React from 'react';
import data from './data.json';

const HotelBookingCard = () => {
  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        width: '360px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* Image Area */}
      <div 
        data-eid="image-area"
        style={{
          position: 'relative',
          height: '180px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#333',
          backgroundImage: 'linear-gradient(135deg, #4A4A4A 0%, #2D2D2D 100%)'
        }}
      >
        <span 
          data-eid="hotel-tag"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#FF6B6B',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 1
          }}
        >
          {data.hotelTag}
        </span>
      </div>

      {/* Hotel Name */}
      <h2 
        data-eid="hotel-name"
        style={{
          fontSize: '20px',
          fontWeight: '700',
          margin: '0',
          lineHeight: '1.3'
        }}
      >
        {data.hotelName}
      </h2>

      {/* Star Rating */}
      <div 
        data-eid="star-rating"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <div style={{ display: 'flex', gap: '2px' }}>
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill={i < 4 ? '#FFD700' : '#424242'} 
              stroke={i < 4 ? '#FFD700' : '#424242'} 
              strokeWidth="1.5"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.18 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span 
          data-eid="rating-value"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#FFD700',
            marginLeft: '4px'
          }}
        >
          {data.ratingValue}
        </span>
      </div>

      {/* Hotel Address */}
      <div 
        data-eid="hotel-address"
        style={{
          fontSize: '14px',
          color: '#B0B0B0',
          lineHeight: '1.5'
        }}
      >
        {data.hotelAddress}
      </div>

      {/* Booking Details */}
      <div 
        data-eid="booking-details"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #333'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span data-eid="checkin-label" style={{ color: '#B0B0B0' }}>Check-in</span>
          <span data-eid="checkin-date" style={{ fontWeight: '600' }}>{data.checkInDate}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span data-eid="checkout-label" style={{ color: '#B0B0B0' }}>Check-out</span>
          <span data-eid="checkout-date" style={{ fontWeight: '600' }}>{data.checkOutDate}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span data-eid="nights-count">{data.nightsCount}</span>
          <span data-eid="guests-count">{data.guestsCount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span data-eid="room-type">{data.roomType}</span>
        </div>
      </div>

      {/* Divider 1 */}
      <div 
        data-eid="divider-1"
        style={{
          height: '1px',
          backgroundColor: '#333',
          margin: '0 -24px'
        }}
      />

      {/* Price Section */}
      <div 
        data-eid="price-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div 
          data-eid="room-rate-line"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px'
          }}
        >
          <span>Room rate</span>
          <span data-eid="room-rate-amount" style={{ fontWeight: '600' }}>{data.roomRateAmount}</span>
        </div>
        <div 
          data-eid="taxes-line"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px'
          }}
        >
          <span>Taxes & fees</span>
          <span data-eid="taxes-amount" style={{ fontWeight: '600' }}>{data.taxesAmount}</span>
        </div>
        <div 
          data-eid="resort-fee-line"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px'
          }}
        >
          <span>Resort fee</span>
          <span data-eid="resort-fee-amount" style={{ fontWeight: '600' }}>{data.resortFeeAmount}</span>
        </div>
        <div 
          data-eid="divider-2"
          style={{
            height: '1px',
            backgroundColor: '#333',
            margin: '0 -24px'
          }}
        />
        <div 
          data-eid="total-line"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            fontWeight: '700',
            paddingTop: '4px'
          }}
        >
          <span>Total</span>
          <span data-eid="total-amount">{data.totalAmount}</span>
        </div>
      </div>

      {/* Amenities Row */}
      <div 
        data-eid="amenities-row"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          paddingTop: '12px'
        }}
      >
        <div 
          data-eid="amenity-wifi"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5">
              <path d="M12 22c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6S6 12.686 6 16c0 3.314 2.686 6 6 6z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M16.5 7.5 18 9" />
              <path d="m15 10.5 1.5 1.5" />
              <path d="M12 12v.01" />
              <path d="m9 10.5-1.5 1.5" />
              <path d="m7.5 7.5-1.5 1.5" />
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: '#B0B0B0' }}>WiFi</span>
        </div>
        <div 
          data-eid="amenity-pool"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5">
              <path d="M12 22c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6S6 12.686 6 16c0 3.314 2.686 6 6 6z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M16.5 7.5 18 9" />
              <path d="m15 10.5 1.5 1.5" />
              <path d="M12 12v.01" />
              <path d="m9 10.5-1.5 1.5" />
              <path d="m7.5 7.5-1.5 1.5" />
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: '#B0B0B0' }}>Pool</span>
        </div>
        <div 
          data-eid="amenity-gym"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5">
              <path d="M12 22c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6S6 12.686 6 16c0 3.314 2.686 6 6 6z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M16.5 7.5 18 9" />
              <path d="m15 10.5 1.5 1.5" />
              <path d="M12 12v.01" />
              <path d="m9 10.5-1.5 1.5" />
              <path d="m7.5 7.5-1.5 1.5" />
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: '#B0B0B0' }}>Gym</span>
        </div>
        <div 
          data-eid="amenity-spa"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5">
              <path d="M12 22c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6S6 12.686 6 16c0 3.314 2.686 6 6 6z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M16.5 7.5 18 9" />
              <path d="m15 10.5 1.5 1.5" />
              <path d="M12 12v.01" />
              <path d="m9 10.5-1.5 1.5" />
              <path d="m7.5 7.5-1.5 1.5" />
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: '#B0B0B0' }}>Spa</span>
        </div>
        <div 
          data-eid="amenity-restaurant"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5">
              <path d="M12 22c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6S6 12.686 6 16c0 3.314 2.686 6 6 6z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M16.5 7.5 18 9" />
              <path d="m15 10.5 1.5 1.5" />
              <path d="M12 12v.01" />
              <path d="m9 10.5-1.5 1.5" />
              <path d="m7.5 7.5-1.5 1.5" />
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: '#B0B0B0' }}>Restaurant</span>
        </div>
        <div 
          data-eid="amenity-parking"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5">
              <path d="M12 22c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6S6 12.686 6 16c0 3.314 2.686 6 6 6z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M16.5 7.5 18 9" />
              <path d="m15 10.5 1.5 1.5" />
              <path d="M12 12v.01" />
              <path d="m9 10.5-1.5 1.5" />
              <path d="m7.5 7.5-1.5 1.5" />
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: '#B0B0B0' }}>Parking</span>
        </div>
      </div>

      {/* Confirmation Section */}
      <div 
        data-eid="confirmation-section"
        style={{
          paddingTop: '12px',
          borderTop: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <span 
          data-eid="confirmation-label"
          style={{
            fontSize: '12px',
            color: '#B0B0B0'
          }}
        >
          Confirmation number
        </span>
        <span 
          data-eid="confirmation-number"
          style={{
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          {data.confirmationNumber}
        </span>
      </div>
    </section>
  );
};

export default HotelBookingCard;