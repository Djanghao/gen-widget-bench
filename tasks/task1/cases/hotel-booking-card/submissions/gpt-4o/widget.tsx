import React from 'react';
import data from './data.json';
import { Star, Wifi, Pool, Dumbbell, Spa, Utensils, Parking } from 'lucide-react';

const Widget = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: '#10132F',
        borderRadius: '20px',
        width: '350px',
        padding: '20px',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div data-eid="image-area" style={{ background: 'linear-gradient(to bottom right, #4a00e0, #8e2de2)', height: '100px', borderRadius: '10px', position: 'relative' }}>
        <span
          data-eid="hotel-tag"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#38617b',
            color: '#ffffff',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
          }}
        >
          {data.hotelTag}
        </span>
      </div>
      <h2 data-eid="hotel-name" style={{ margin: '15px 0 5px', fontSize: '18px' }}>{data.hotelName}</h2>
      <div data-eid="star-rating" style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
        <Star style={{ color: '#f3c007' }} />
        <Star style={{ color: '#f3c007' }} />
        <Star style={{ color: '#f3c007' }} />
        <Star style={{ color: '#f3c007' }} />
        <Star style={{ color: '#f3c007', opacity: '0.5' }} />
        <span data-eid="rating-value" style={{ marginLeft: '5px', color: '#f3c007' }}>
          {data.ratingValue}
        </span>
      </div>
      <div data-eid="hotel-address" style={{ fontSize: '12px', margin: '8px 0', opacity: '0.7' }}>{data.hotelAddress}</div>
      <div data-eid="booking-details" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#1e2346', borderRadius: '10px' }}>
        <div>
          <span data-eid="checkin-label" style={{ color: '#ffffff' }}>CHECK-IN </span>
          <span data-eid="checkin-date" style={{ color: '#3b82f6' }}>{data.checkinDate}</span>
        </div>
        <div>
          <span data-eid="checkout-label" style={{ color: '#ffffff' }}>CHECK-OUT </span>
          <span data-eid="checkout-date" style={{ color: '#3b82f6' }}>{data.checkoutDate}</span>
        </div>
        <div>
          <span data-eid="nights-count" style={{ color: '#ffffff', display: 'block' }}>{data.nightsCount}</span>
          <span data-eid="guests-count" style={{ color: '#ffffff', display: 'block' }}>{data.guestsCount}</span>
          <span data-eid="room-type" style={{ color: '#3b82f6', display: 'block' }}>{data.roomType}</span>
        </div>
      </div>
      <div data-eid="divider-1" style={{ height: '1px', backgroundColor: '#2c2c40', margin: '10px 0' }}></div>
      <div data-eid="price-section">
        <div data-eid="room-rate-line" style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span>Room ({data.roomRateDetails})</span>
          <span data-eid="room-rate-amount" style={{ color: '#ffffff' }}>{data.roomRateAmount}</span>
        </div>
        <div data-eid="taxes-line" style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span>Taxes & Fees</span>
          <span data-eid="taxes-amount" style={{ color: '#ffffff' }}>{data.taxesAmount}</span>
        </div>
        <div data-eid="resort-fee-line" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span>Resort Fee</span>
          <span data-eid="resort-fee-amount" style={{ color: '#ffffff' }}>{data.resortFeeAmount}</span>
        </div>
        <div data-eid="divider-2" style={{ height: '1px', backgroundColor: '#2c2c40' }}></div>
        <div data-eid="total-line" style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
          <span>Total</span>
          <span data-eid="total-amount" style={{ color: '#37dc72' }}>{data.totalAmount}</span>
        </div>
      </div>
      <div data-eid="amenities-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        <div data-eid="amenity-wifi" style={{ textAlign: 'center', fontSize: '12px' }}>
          <Wifi />
          <span>WIFI</span>
        </div>
        <div data-eid="amenity-pool" style={{ textAlign: 'center', fontSize: '12px' }}>
          <Pool />
          <span>Pool</span>
        </div>
        <div data-eid="amenity-gym" style={{ textAlign: 'center', fontSize: '12px' }}>
          <Dumbbell />
          <span>Gym</span>
        </div>
        <div data-eid="amenity-spa" style={{ textAlign: 'center', fontSize: '12px' }}>
          <Spa />
          <span>Spa</span>
        </div>
        <div data-eid="amenity-restaurant" style={{ textAlign: 'center', fontSize: '12px' }}>
          <Utensils />
          <span>Dining</span>
        </div>
        <div data-eid="amenity-parking" style={{ textAlign: 'center', fontSize: '12px' }}>
          <Parking />
          <span>Parking</span>
        </div>
      </div>
      <div data-eid="confirmation-section" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#203000', borderRadius: '10px', textAlign: 'center' }}>
        <span data-eid="confirmation-label" style={{ color: '#ffffff', fontSize: '12px' }}>CONFIRMATION</span>
        <span data-eid="confirmation-number" style={{ color: '#37dc72', fontSize: '16px', display: 'block' }}>{data.confirmationNumber}</span>
      </div>
    </section>
  );
};

export default Widget;