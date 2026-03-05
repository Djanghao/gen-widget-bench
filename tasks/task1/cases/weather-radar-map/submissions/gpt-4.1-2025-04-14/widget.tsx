import React from "react";
import data from "./data.json";
import { AlertCircle, CloudRain } from "lucide-react";

const radarColors = {
  none: "#22273a",
  light: "#4f5e7b",
  moderate: "#5e8ac8",
  heavy: "#325de0",
  severe: "#8837b7"
};

const legendKeys = [
  { key: "none", label: "None", color: radarColors.none, eid: "legend-label-none" },
  { key: "light", label: "Light", color: radarColors.light, eid: "legend-label-light" },
  { key: "moderate", label: "Moderate", color: radarColors.moderate, eid: "legend-label-moderate" },
  { key: "heavy", label: "Heavy", color: radarColors.heavy, eid: "legend-label-heavy" },
  { key: "severe", label: "Severe", color: radarColors.severe, eid: "legend-label-severe" }
];

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "linear-gradient(180deg, #0a1226 80%, #e9eaf0 100%)",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        borderRadius: "28px 0 0 0",
        width: "95vw",
        maxWidth: 480,
        boxShadow: "0 2px 32px #151d30",
        position: "relative"
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 24px 0 24px",
          background: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <CloudRain size={24} color="#27bcfa" style={{ marginRight: 10 }} />
          <div
            data-eid="city-name"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginRight: 0
            }}
          >
            {data.city}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            data-eid="update-time"
            style={{
              background: "#212c44",
              color: "#8ac0fe",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 16,
              padding: "4px 15px",
              marginRight: 0
            }}
          >
            {data.updateTime}
          </span>
          <span
            data-eid="alert-badge"
            style={{
              background: "rgba(187,54,60,0.10)",
              color: "#ff706f",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 16,
              padding: "4px 15px",
              display: "flex",
              alignItems: "center",
              border: "1px solid #ea6367"
            }}
          >
            <AlertCircle size={16} strokeWidth={2.3} style={{ marginRight: 7 }} />
            {data.alert}
          </span>
        </div>
      </header>

      {/* Radar Section */}
      <div
        data-eid="radar-section"
        style={{
          margin: "24px",
          marginBottom: 0,
          background: "#17213c",
          borderRadius: 16,
          padding: "18px 18px 0 18px",
          boxShadow: "0 1px 0 0 #222e4b",
          border: "1px solid #162241"
        }}
      >
        <div
          data-eid="radar-title"
          style={{
            color: "#cae4ff",
            fontWeight: 600,
            fontSize: 16,
            margin: "0 0 8px 0"
          }}
        >
          Precipitation Radar
        </div>
        <div
          data-eid="radar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
            gap: 5,
            width: 360,
            height: 360,
            background: "none",
            margin: "0 auto"
          }}
        >
          {data.radarGrid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const eid = `radar-cell-${rIdx * 8 + cIdx}`;
              return (
                <div
                  key={eid}
                  data-eid={eid}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 7,
                    background: radarColors[cell],
                    border: "1.5px solid #223058",
                    transition: "background 0.2s"
                  }}
                />
              );
            })
          )}
        </div>
        <div
          data-eid="legend-bar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            margin: "16px 0 10px 0",
            fontSize: 13,
            fontWeight: 500,
            color: "#6d7c95"
          }}
        >
          {legendKeys.map((k, i) => (
            <span
              data-eid={k.eid}
              key={k.key}
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: i > 0 ? 600 : 500,
                color: k.key === "none" ? "#6d7c95" : k.color
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 11,
                  height: 11,
                  borderRadius: 3,
                  marginRight: 4,
                  background: k.color,
                  opacity: k.key === "none" ? 0.55 : 1,
                  border: "1px solid #2b3347"
                }}
              />
              {k.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}