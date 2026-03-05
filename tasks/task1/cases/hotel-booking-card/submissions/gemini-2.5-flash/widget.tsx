import React from 'react';
import {
  Star, StarHalf, MapPin, Calendar, Users, Bed, Wifi, Swimmer, Dumbbell, Sparkles, Utensils, Car,
} from 'lucide-react';
import data from './data.json';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={16} fill="#FFD700" color="#FFD700" />
      ))}
      {hasHalfStar && <StarHalf size={16} fill="#FFD700" color="#FFD700" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={16} fill="none" color="#FFD700" style={{ strokeOpacity: 0.5 }} />
      ))}
    </div>
  );
};

const HotelBookingCard: React.FC = () => {
  const {
    hotelName, rating, address, tag, checkinDate, checkoutDate, nights, guests, roomType,
    roomRatePerNight, roomRateTotal, taxesFees, resortFee, totalAmount,
    confirmationNumber, amenities,
  } = data;

  const renderAmenityIcon = (name: string) => {
    const iconStyle = { color: 'white', marginBottom: '4px' };
    switch (name.toLowerCase()) {
      case 'wifi': return <Wifi size={20} style={iconStyle} />;
      case 'pool': return <Swimmer size={20} style={iconStyle} />;
      case 'gym': return <Dumbbell size={20} style={iconStyle} />;
      case 'spa': return <Sparkles size={20} style={iconStyle} />;
      case 'dining': return <Utensils size={20} style={iconStyle} />;
      case 'parking': return <Car size={20} style={iconStyle} />;
      default: return null;
    }
  };

  const AmenityItem: React.FC<{ eid: string; name: string }> = ({ eid, name }) => (
    <div
      data-eid={eid}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: '#31344E', // Darker background for amenity bubbles
        width: '60px',
        height: '60px',
        boxSizing: 'border-box',
        justifyContent: 'center'
      }}
    >
      {renderAmenityIcon(name)}
      <span style={{ fontSize: '10px', color: '#8E95AA', textTransform: 'capitalize' }}>
        {name}
      </span>
    </div>
  );

  return (
    <section
      data-eid="root"
      style={{
        width: '320px',
        backgroundColor: '#202336',
        borderRadius: '16px',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        data-eid="image-area"
        style={{
          height: '140px',
          background: 'linear-gradient(135deg, #4A235A 0%, #202336 100%)', // Mimic dark gradient
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: '16px',
        }}
      >
        <span
          data-eid="hotel-tag"
          style={{
            backgroundColor: '#387ADF',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {tag}
        </span>
      </div>

      <div style={{ padding: '24px 24px 16px' }}>
        <h2
          data-eid="hotel-name"
          style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}
        >
          {hotelName}
        </h2>
        <div data-eid="star-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <StarRating rating={rating} />
          <span data-eid="rating-value" style={{ fontSize: '14px', color: 'white' }}>{rating.toFixed(1)}</span>
        </div>
        <div data-eid="hotel-address" style={{ fontSize: '13px', color: '#8E95AA', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <MapPin size={14} color="#8E95AA" />
          <span>{address}</span>
        </div>

        <div
          data-eid="booking-details"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px 0px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="checkin-label" style={{ fontSize: '11px', color: '#8E95AA', textTransform: 'uppercase', marginBottom: '4px' }}>Check-In</span>
            <span data-eid="checkin-date" style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="#8E95AA" /> {checkinDate}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-eid="checkout-label" style={{ fontSize: '11px', color: '#8E95AA', textTransform: 'uppercase', marginBottom: '4px' }}>Check-Out</span>
            <span data-eid="checkout-date" style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="#8E95AA" /> {checkoutDate}
            </span>
          </div>
          <span data-eid="nights-count" style={{ fontSize: '14px', fontWeight: 'normal', color: 'white', marginTop: '4px' }}>{nights} nights</span>
          <span data-eid="guests-count" style={{ fontSize: '14px', fontWeight: 'normal', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <Users size={16} color="#8E95AA" /> {guests} guests
          </span>
          <span data-eid="room-type" style={{ fontSize: '14px', fontWeight: 'normal', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', gridColumn: '1 / -1', marginTop: '4px' }}>
            <Bed size={16} color="#8E95AA" /> {roomType}
          </span>
        </div>

        <div
          data-eid="divider-1"
          style={{ borderBottom: '1px solid #4A4D60', marginBottom: '24px' }}
        ></div>

        <div data-eid="price-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div data-eid="room-rate-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'white' }}>
            <span>Room (${roomRatePerNight}/night x {nights})</span>
            <span data-eid="room-rate-amount">${roomRateTotal.toFixed(2)}</span>
          </div>
          <div data-eid="taxes-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'white' }}>
            <span>Taxes & Fees</span>
            <span data-eid="taxes-amount">${taxesFees.toFixed(2)}</span>
          </div>
          <div data-eid="resort-fee-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'white' }}>
            <span>Resort Fee</span>
            <span data-eid="resort-fee-amount">${resortFee.toFixed(2)}</span>
          </div>
          <div data-eid="divider-2" style={{ borderBottom: '1px solid #4A4D60', margin: '8px 0' }}></div>
          <div data-eid="total-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
            <span>Total</span>
            <span data-eid="total-amount" style={{ color: '#6CC644' }}>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div
          data-eid="amenities-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          {amenities.map((amenity, index) => (
            <AmenityItem key={index} eid={`amenity-${amenity.toLowerCase()}`} name={amenity} />
          ))}
        </div>

        <div
          data-eid="confirmation-section"
          style={{
            backgroundColor: '#2A2D41', // Slightly lighter background for confirmation
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span data-eid="confirmation-label" style={{ fontSize: '12px', color: '#8E95AA', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Confirmation
          </span>
          <span data-eid="confirmation-number" style={{ fontSize: '14px', fontWeight: 'bold', color: '#6CC644' }}>
            {confirmationNumber}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HotelBookingCard;