import React from "react";
import { Moon } from "lucide-react";
import data from "./data.json";

const iconMap: Record<string, React.ReactNode> = {
  moon: <Moon size={18} color="#c8cdd4" />,
};

export default function WeatherCityGlance() {
  return (
    <section
      data-eid="root"
      style={{
        background: "linear-gradient(135deg, #1a2344 0%, #2a3a6a 40%, #1e2d55 100%)",
        borderRadius: 20,
        padding: "16px 20px 20px",
        color: "#ffffff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        width: 400,
        boxSizing: "border-box",
      }}
    >
      {/* Alert Banner */}
      <div
        data-eid="alert-banner"
        style={{
          background: "linear-gradient(90deg, rgba(180,140,60,0.35) 0%, rgba(180,140,60,0.15) 100%)",
          border: "1px solid rgba(180,150,80,0.4)",
          borderRadius: 10,
          padding: "8px 14px",
          fontSize: 13,
          color: "#d4c9a0",
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        {data.alert}
      </div>

      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div>
          <div
            data-eid="current-temp"
            style={{ fontSize: 48, fontWeight: 300, lineHeight: 1 }}
          >
            {data.currentTemp}
          </div>
          <div
            data-eid="high-low"
            style={{ fontSize: 14, color: "#a0aabe", marginTop: 4 }}
          >
            H:{data.high} L:{data.low}
          </div>
        </div>
        <div style={{ textAlign: "right", paddingTop: 4 }}>
          <div data-eid="weather-icon" style={{ marginBottom: 2 }}>
            <Moon size={26} color="#c8cdd4" />
          </div>
          <div
            data-eid="city-name"
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            {data.city}
          </div>
          <div
            data-eid="condition-text"
            style={{ fontSize: 14, color: "#a0aabe" }}
          >
            {data.condition}
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div
        data-eid="stats-row"
        style={{
          display: "flex",
          gap: 20,
          fontSize: 13,
          color: "#a0aabe",
          marginBottom: 16,
        }}
      >
        <span data-eid="stat-feels">Feels {data.feelsLike}</span>
        <span data-eid="stat-humidity">Humidity {data.humidity}</span>
        <span data-eid="stat-wind">Wind {data.wind}</span>
      </div>

      {/* Forecast Grid */}
      <div
        data-eid="forecast-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 6,
        }}
      >
        {data.hourly.map((hour, i) => (
          <div
            key={i}
            data-eid={`hour-${i}`}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              data-eid={i === 0 ? "hour-0-time" : undefined}
              style={{ fontSize: 12, color: "#a0aabe" }}
            >
              {hour.time}
            </span>
            <span data-eid={i === 0 ? "hour-0-icon" : undefined}>
              {iconMap[hour.icon]}
            </span>
            <strong
              data-eid={i === 0 ? "hour-0-temp" : undefined}
              style={{ fontSize: 14, fontWeight: 600 }}
            >
              {hour.temp}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
