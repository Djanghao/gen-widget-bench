import React from "react";
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  RefreshCcw,
  Zap,
} from "lucide-react";
import data from "./data.json";

const deviceIcons = [
  <Smartphone size={22} strokeWidth={2.2} color="#14ce60" />,
  <Laptop size={22} strokeWidth={2.2} color="#ffad2b" />,
  <Tablet size={22} strokeWidth={2.2} color="#d9495d" />,
  <Watch size={22} strokeWidth={2.2} color="#38d88c" />,
  <Headphones size={22} strokeWidth={2.2} color="#f9b44e" />,
  <Speaker size={22} strokeWidth={2.2} color="#19ea97" />,
];

const chargingIcon = (
  <Zap
    size={14}
    style={{
      marginLeft: 4,
      marginBottom: -2,
      color: "#ffd163",
      verticalAlign: "middle",
      strokeWidth: 2.2,
    }}
    fill="#ffd163"
  />
);

const batteryBarColors = [
  "#14ce60",
  "#ffad2b",
  "#d9495d",
  "#38d88c",
  "#f9b44e",
  "#19ea97",
];

const batteryBg = "#423c59";

const deviceTitleColors = [
  "#14ce60",
  "#ffad2b",
  "#d9495d",
  "#38d88c",
  "#f9b44e",
  "#19ea97",
];

const pctColors = [
  "#14ce60",
  "#ffad2b",
  "#d9495d",
  "#38d88c",
  "#f9b44e",
  "#19ea97",
];

function getDeviceGradient(idx: number) {
  // for battery bar fill
  if (idx === 2) return "#d9495d";
  return batteryBarColors[idx];
}

function getPctColor(idx: number) {
  if (idx === 2) return "#d9495d";
  return pctColors[idx];
}

function getBatteryWidth(pct: number) {
  if (pct > 99) return "100%";
  else if (pct < 7) return "7%";
  return `${pct}%`;
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 420,
        background: "linear-gradient(156deg,#1c1b2d 97%,#27223e 40%)",
        borderRadius: 22,
        padding: "20px 0 16px 0",
        boxSizing: "border-box",
        boxShadow: "0px 4px 24px rgba(41,26,76,0.10)",
        fontFamily: "Inter, sans-serif",
        color: "#fff",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 24px 12px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <RefreshCcw
            size={20}
            color="#a68cff"
            style={{ marginRight: 8, opacity: 0.94 }}
          />
          <div
            data-eid="title"
            style={{
              fontWeight: 700,
              fontSize: 25,
              letterSpacing: "0.01em",
              marginRight: 4,
            }}
          >
            {data.title}
          </div>
        </div>
        <span
          data-eid="sync-time"
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#a7adc8",
            letterSpacing: 0.01,
            marginTop: 2,
          }}
        >
          {data.lastSync}
        </span>
      </header>

      {/* Device List */}
      <div data-eid="device-list" style={{ margin: "0 16px" }}>
        {data.devices.map((dev, idx) => (
          <div
            data-eid={`device-${idx}`}
            key={dev.name}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(54, 46, 79, 1)",
              borderRadius: 16,
              marginBottom: 10,
              padding: "15px 18px 10px 17px",
              boxSizing: "border-box",
              boxShadow:
                idx === 0
                  ? "0 0 0 2px rgba(20,206,96,0.07)"
                  : idx === 2
                  ? "0 0 0 2px rgba(217,73,93,0.11)"
                  : "none",
            }}
          >
            {/* Top row: icon, name, pct */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 1,
              }}
            >
              <span
                data-eid={`device-${idx}-icon`}
                style={{
                  margin: "4px 10px 0 0",
                  minWidth: 22,
                  opacity: idx === 2 ? 0.8 : 0.95,
                }}
              >
                {deviceIcons[idx]}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  data-eid={`device-${idx}-name`}
                  style={{
                    fontWeight: 700,
                    fontSize: 17.5,
                    color: getDeviceGradient(idx),
                    marginRight: 5,
                    marginBottom: 0,
                    letterSpacing: 0.005,
                    display: "inline-block",
                  }}
                >
                  {dev.name}
                  {dev.charging && (
                    <span data-eid={`device-${idx}-charging`}>
                      {chargingIcon}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    marginTop: 2,
                    color: "#a7adc8",
                    fontWeight: 400,
                  }}
                >
                  {dev.detail}
                </div>
              </div>
              <span
                data-eid={`device-${idx}-pct`}
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: 0.01,
                  color: getPctColor(idx),
                  marginLeft: 12,
                  minWidth: 52,
                  textAlign: "right",
                }}
              >
                {dev.pct}%
              </span>
            </div>
            {/* Battery bar */}
            <div
              data-eid={`device-${idx}-bar`}
              style={{
                height: 8,
                width: "100%",
                background: batteryBg,
                borderRadius: 18,
                marginTop: 9,
                position: "relative",
                overflow: "hidden",
                transition: "background 0.2s",
              }}
            >
              <div
                style={{
                  width: getBatteryWidth(dev.pct),
                  height: "100%",
                  background:
                    idx === 2
                      ? "#d9495d"
                      : getDeviceGradient(idx),
                  borderRadius: 18,
                  transition: "width 0.3s",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Bar */}
      <div
        data-eid="summary"
        style={{
          margin: "18px 0 0 0",
          padding: "11px 18px 5.5px 18px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderTop: "1.5px solid #3d3252",
          justifyContent: "space-between",
          fontSize: 16.5,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <span
          data-eid="charging-count"
          style={{
            color: "#ffc34c",
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
          }}
        >
          <Zap
            size={17}
            style={{ marginRight: 6, color: "#ffc34c" }}
            fill="#ffc34c"
            strokeWidth={2}
          />
          {data.chargingSummary}
        </span>
        <span
          data-eid="low-battery-alert"
          style={{
            color: "#d9495d",
            background: "rgba(217,73,93,0.10)",
            padding: "2px 12px 2px 10px",
            borderRadius: 12,
            fontWeight: 500,
            fontSize: 15.7,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tablet
            size={15}
            style={{ marginRight: 6, color: "#d9495d" }}
            strokeWidth={2}
          />
          {data.lowestBattery}
        </span>
      </div>
    </section>
  );
}