import React from "react";
import data from "./data.json";
import {
  Wifi,
  Swimmer,
  Dumbbell,
  Spa,
  Utensils,
  Car,
  Star,
  StarHalf,
  Star as StarFilled,
  MapPin,
  CalendarDays,
  Users,
  Bed,
} from "lucide-react";

const starFullColor = "#FFD600";
const starHalfColor = "#FFD600";
const starEmptyColor = "#3D4265";

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 456,
        borderRadius: 32,
        overflow: "hidden",
        background: "#17192b",
        fontFamily:
          '"Inter", "Segoe UI", "Helvetica Neue", Arial, "Liberation Sans", sans-serif',
        color: "#fff",
        boxShadow: "0 2px 16px 0 #121a2b17",
        margin: "0 auto",
        marginTop: 8,
        marginBottom: 40,
        position: "relative",
        minHeight: 750,
        border: "solid 0px rgba(0,0,0,0.10)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* IMAGE/GRADIENT AREA */}
      <div
        data-eid="image-area"
        style={{
          position: "relative",
          height: 170,
          width: "100%",
          background:
            "linear-gradient(135deg, #322d81 0%, #156886 100%)",
        }}
      >
        <span
          data-eid="hotel-tag"
          style={{
            position: "absolute",
            top: 24,
            right: 28,
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: 0.8,
            padding: "7px 18px 6px 18px",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          {data.hotelTag}
        </span>
      </div>
      <div style={{ padding: 32, paddingTop: 32, paddingBottom: 0, flex: 1 }}>
        {/* HOTEL NAME */}
        <h2
          data-eid="hotel-name"
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 0.1,
            margin: 0,
            marginBottom: 10,
            color: "#fff",
          }}
        >
          {data.hotelName}
        </h2>
        {/* STAR RATING */}
        <div
          data-eid="star-rating"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 2,
            marginTop: 0,
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            {[1, 2, 3, 4].map((i) => (
              <StarFilled
                key={i}
                size={18}
                strokeWidth={0}
                fill={starFullColor}
                color={starFullColor}
                style={{
                  marginRight: 1,
                  verticalAlign: "middle",
                }}
              />
            ))}
            <StarHalf
              size={18}
              strokeWidth={0}
              fill={starHalfColor}
              color={starHalfColor}
              style={{ marginRight: 0, verticalAlign: "middle" }}
            />
          </span>
          <span
            data-eid="rating-value"
            style={{
              color: "#FFD600",
              fontWeight: 700,
              fontSize: 16,
              marginLeft: 4,
              marginRight: 8,
              letterSpacing: -0.5,
              position: "relative",
              top: 1,
            }}
          >
            {data.ratingValue}
          </span>
        </div>
        {/* ADDRESS */}
        <div
          data-eid="hotel-address"
          style={{
            color: "#94a3bd",
            fontSize: 14,
            fontWeight: 400,
            marginBottom: 22,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <MapPin size={14} strokeWidth={2} color="#94a3bd" style={{ marginRight: 1, verticalAlign: "middle" }} />
          {data.hotelAddress}
        </div>

        {/* BOOKING DETAILS CARD */}
        <div
          data-eid="booking-details"
          style={{
            background: "#20244D",
            borderRadius: 18,
            padding: 22,
            marginBottom: 27,
            marginTop: 0,
            display: "flex",
            flexDirection: "row",
            gap: 26,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {/* Left: Check-in */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              data-eid="checkin-label"
              style={{
                color: "#91A1C9",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 1,
                marginBottom: 2,
                display: "block",
                textTransform: "uppercase",
              }}
            >
              {data.checkinLabel}
            </span>
            <span
              data-eid="checkin-date"
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                marginBottom: 7,
              }}
            >
              <CalendarDays size={17} color="#6cbaf3" style={{ marginRight: 7, marginTop: -2 }} />
              {data.checkinDate}
            </span>
            <span
              data-eid="nights-count"
              style={{
                color: "#A2B0D7",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: 0.1,
                display: "block",
                marginBottom: 7,
              }}
            >
              {data.nightsCount}
            </span>
            <span
              data-eid="room-type"
              style={{
                color: "#6cbaf3",
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              <Bed size={16} color="#6cbaf3" style={{ marginRight: 6 }} />
              {data.roomType}
            </span>
          </div>

          {/* Right: Check-out/guests*/}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              data-eid="checkout-label"
              style={{
                color: "#91A1C9",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 1,
                marginBottom: 2,
                display: "block",
                textTransform: "uppercase",
              }}
            >
              {data.checkoutLabel}
            </span>
            <span
              data-eid="checkout-date"
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                marginBottom: 7,
              }}
            >
              <CalendarDays size={17} color="#6cbaf3" style={{ marginRight: 7, marginTop: -2 }} />
              {data.checkoutDate}
            </span>
            <span
              data-eid="guests-count"
              style={{
                color: "#A2B0D7",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: 0.1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Users size={15} color="#A2B0D7" style={{ marginRight: 6 }} />
              {data.guestsCount}
            </span>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          data-eid="divider-1"
          style={{
            width: "100%",
            height: 1,
            background: "linear-gradient(90deg, #262B51 60%, #262B5110 100%)",
            margin: "4px 0 16px 0",
            border: 0,
          }}
        />

        {/* PRICE SECTION */}
        <div
          data-eid="price-section"
          style={{
            marginTop: 0,
            marginBottom: 18,
            width: "100%",
          }}
        >
          {/* Room rate line */}
          <div
            data-eid="room-rate-line"
            style={{
              display: "flex",
              fontSize: 16,
              alignItems: "center",
              justifyContent: "space-between",
              color: "#dde8fa",
              marginBottom: 5,
            }}
          >
            <span>Room&nbsp;(${data.roomRatePerNight}/night x {data.nightsCountShort})</span>
            <span
              data-eid="room-rate-amount"
              style={{
                fontWeight: 700,
                color: "#fff",
                fontSize: 16,
              }}
            >
              {data.roomRateAmount}
            </span>
          </div>
          {/* Taxes */}
          <div
            data-eid="taxes-line"
            style={{
              display: "flex",
              fontSize: 16,
              alignItems: "center",
              justifyContent: "space-between",
              color: "#dde8fa",
              marginBottom: 5,
            }}
          >
            <span>Taxes & Fees</span>
            <span
              data-eid="taxes-amount"
              style={{
                fontWeight: 700,
                color: "#fff",
                fontSize: 16,
              }}
            >
              {data.taxesAmount}
            </span>
          </div>
          {/* Resort */}
          <div
            data-eid="resort-fee-line"
            style={{
              display: "flex",
              fontSize: 16,
              alignItems: "center",
              justifyContent: "space-between",
              color: "#dde8fa",
              marginBottom: 9,
            }}
          >
            <span>Resort Fee</span>
            <span
              data-eid="resort-fee-amount"
              style={{
                fontWeight: 700,
                color: "#fff",
                fontSize: 16,
              }}
            >
              {data.resortFeeAmount}
            </span>
          </div>
          {/* Divider */}
          <div
            data-eid="divider-2"
            style={{
              border: 0,
              borderTop: "1px solid #29305b",
              marginTop: 8,
              marginBottom: 6,
              height: 0,
              width: "100%",
            }}
          />

          {/* TOTAL */}
          <div
            data-eid="total-line"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 17,
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#fff" }}>Total</span>
            <span
              data-eid="total-amount"
              style={{
                fontWeight: 700,
                color: "#37e383",
                fontSize: 19,
                letterSpacing: 1,
              }}
            >
              {data.totalAmount}
            </span>
          </div>
        </div>

        {/* AMENITIES */}
        <div
          data-eid="amenities-row"
          style={{
            display: "flex",
            gap: 16,
            width: "100%",
            marginBottom: 28,
            marginTop: 0,
            justifyContent: "space-between",
          }}
        >
          <div
            data-eid="amenity-wifi"
            style={{
              background: "#212549",
              borderRadius: 10,
              flex: 1,
              textAlign: "center",
              padding: "14px 0 8px 0",
            }}
          >
            <Wifi color="#91A1C9" size={27} style={{ marginBottom: 7 }} />
            <div style={{ color: "#91A1C9", fontSize: 13, fontWeight: 600 }}>WIFI</div>
          </div>
          <div
            data-eid="amenity-pool"
            style={{
              background: "#212549",
              borderRadius: 10,
              flex: 1,
              textAlign: "center",
              padding: "14px 0 8px 0",
            }}
          >
            <Swimmer color="#91A1C9" size={27} style={{ marginBottom: 7 }} />
            <div style={{ color: "#91A1C9", fontSize: 13, fontWeight: 600 }}>Pool</div>
          </div>
          <div
            data-eid="amenity-gym"
            style={{
              background: "#212549",
              borderRadius: 10,
              flex: 1,
              textAlign: "center",
              padding: "14px 0 8px 0",
            }}
          >
            <Dumbbell color="#91A1C9" size={27} style={{ marginBottom: 7 }} />
            <div style={{ color: "#91A1C9", fontSize: 13, fontWeight: 600 }}>Gym</div>
          </div>
          <div
            data-eid="amenity-spa"
            style={{
              background: "#212549",
              borderRadius: 10,
              flex: 1,
              textAlign: "center",
              padding: "14px 0 8px 0",
            }}
          >
            <Spa color="#91A1C9" size={27} style={{ marginBottom: 7 }} />
            <div style={{ color: "#91A1C9", fontSize: 13, fontWeight: 600 }}>Spa</div>
          </div>
          <div
            data-eid="amenity-restaurant"
            style={{
              background: "#212549",
              borderRadius: 10,
              flex: 1,
              textAlign: "center",
              padding: "14px 0 8px 0",
            }}
          >
            <Utensils color="#91A1C9" size={27} style={{ marginBottom: 7 }} />
            <div style={{ color: "#91A1C9", fontSize: 13, fontWeight: 600 }}>Dining</div>
          </div>
          <div
            data-eid="amenity-parking"
            style={{
              background: "#212549",
              borderRadius: 10,
              flex: 1,
              textAlign: "center",
              padding: "14px 0 8px 0",
            }}
          >
            <Car color="#91A1C9" size={27} style={{ marginBottom: 7 }} />
            <div style={{ color: "#91A1C9", fontSize: 13, fontWeight: 600 }}>Parking</div>
          </div>
        </div>
      </div>
      {/* CONFIRMATION */}
      <div
        data-eid="confirmation-section"
        style={{
          background: "#16291F",
          width: "100%",
          borderRadius: "0 0 0 0",
          padding: "0 32px",
          minHeight: 50,
          display: "flex",
          alignItems: "center",
          borderTop: "2px solid #191D26",
        }}
      >
        <span
          data-eid="confirmation-label"
          style={{
            color: "#9ca3b7",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 2,
            flex: "0 0 auto",
          }}
        >
          CONFIRMATION
        </span>
        <span
          data-eid="confirmation-number"
          style={{
            marginLeft: "auto",
            color: "#49EB95",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 1.5,
            background: "rgba(52, 181, 119, 0.05)",
            padding: "6px 14px 4px 12px",
            borderRadius: 8,
          }}
        >
          {data.confirmationNumber}
        </span>
      </div>
    </section>
  );
}