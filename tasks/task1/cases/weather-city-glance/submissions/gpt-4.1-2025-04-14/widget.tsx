import React from "react";
import data from "./data.json";
import { Clock } from "lucide-react";

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 520,
        padding: 0,
        borderRadius: 28,
        background: "radial-gradient(ellipse 80% 95% at 36% 20%, #495C8C 65%, #11162A 100%)",
        boxShadow: "0 2px 10px 0 rgba(19,31,77,0.13)",
        fontFamily: "system-ui, 'Segoe UI', sans-serif",
        color: "#fff",
        margin: "0 auto",
        marginTop: 16,
        position: "relative",
      }}
    >
      <div
        data-eid="alert-banner"
        style={{
          borderRadius: "12px 12px 8px 8px",
          background: "rgba(232,186,73,0.10)",
          border: "1.5px solid #E8BA49",
          color: "#E8BA49",
          fontWeight: 500,
          fontSize: 15,
          lineHeight: "24px",
          margin: "18px 18px 0 18px",
          padding: "2px 17px 2px 14px",
          letterSpacing: "0.01em",
        }}
      >
        {data.alertBanner}
      </div>
      <header
        data-eid="header"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          padding: "5px 32px 0 28px",
          marginTop: 10,
        }}
      >
        <div style={{display: "flex", flexDirection: "column"}}>
          <div
            data-eid="current-temp"
            style={{
              fontSize: 38,
              fontWeight: 600,
              lineHeight: "42px",
              color: "#fff",
              marginBottom: 1,
            }}
          >
            {data.currentTemp}
          </div>
          <div
            data-eid="high-low"
            style={{
              fontSize: 16,
              color: "#BCC8DC",
              lineHeight: "22px",
              fontWeight: 400,
              marginBottom: 0,
            }}
          >
            {data.highLow}
          </div>
        </div>
        <div style={{textAlign: "right", marginTop: 5}}>
          <div
            data-eid="weather-icon"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Clock size={22} color="#fff" style={{ opacity: 0.8, marginBottom: 2 }}/>
          </div>
          <div
            data-eid="city-name"
            style={{
              fontWeight: 600,
              fontSize: 22,
              lineHeight: "25px",
              color: "#fff",
              marginTop: "-1px",
              marginRight: "-2px",
              letterSpacing: "0.01em",
            }}
          >
            {data.cityName}
          </div>
          <div
            data-eid="condition-text"
            style={{
              fontSize: 16,
              color: "#f3f4fa",
              opacity: 0.82,
              marginTop: "-1px",
              marginRight: "-2px",
              fontWeight: 400,
            }}
          >
            {data.conditionText}
          </div>
        </div>
      </header>
      <div
        data-eid="stats-row"
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "9px 0 2px 0",
          margin: "2px 0 2px 4px",
          gap: 22,
          justifyContent: "flex-start",
          alignItems: "center",
          fontSize: 15,
          color: "#BBC7DA",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
      >
        <span data-eid="stat-feels">Feels {data.stats.feels}</span>
        <span data-eid="stat-humidity">Humidity {data.stats.humidity}</span>
        <span data-eid="stat-wind">Wind {data.stats.wind}</span>
      </div>
      <div
        data-eid="forecast-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 10,
          padding: "9px 14px 18px 14px",
          marginTop: 1,
        }}
      >
        {data.forecast.map((hour, i) => (
          <div
            key={i}
            data-eid={`hour-${i}`}
            style={{
              background: "rgba(27,34,56,0.46)",
              border: "1.2px solid #263153",
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "7px 5px 7px 5px",
              minWidth: 66,
            }}
          >
            <span
              data-eid={`hour-${i}-time`}
              style={{
                color: "#B9C5DF",
                fontSize: 15,
                fontWeight: 500,
                marginBottom: 2,
                marginTop: 0,
                letterSpacing: "0.01em",
              }}
            >
              {hour.time}
            </span>
            <span
              data-eid={`hour-${i}-icon`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                margin: "2px 0 0 0"
              }}
            >
              <Clock size={18} color="#DDDFFA" style={{opacity: 0.92}}/>
            </span>
            <strong
              data-eid={`hour-${i}-temp`}
              style={{
                fontSize: 17,
                color: "#F5FAFF",
                marginTop: 1,
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {hour.temp}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}