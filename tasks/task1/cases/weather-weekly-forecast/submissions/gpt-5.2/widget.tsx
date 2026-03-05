// submissions/<your-model-name>/widget.tsx
import React from "react";
import data from "./data.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CloudSun, Cloud, CloudRain, Sun, Sunrise, Sunset, Droplets } from "lucide-react";

type Day = {
  day: string;
  label: string;
  icon: string;
  high: number;
  low: number;
  precip?: number;
};

function Icon({ name, size = 18, color = "#FFC84A" }: { name: string; size?: number; color?: string }) {
  const common = { size, color, strokeWidth: 1.8 };
  switch (name) {
    case "partly":
      return <CloudSun {...common} />;
    case "cloud":
      return <Cloud {...common} />;
    case "rain":
      return <CloudRain {...common} />;
    case "sun":
      return <Sun {...common} />;
    case "sunrise":
      return <Sunrise {...common} />;
    case "sunset":
      return <Sunset {...common} />;
    case "droplets":
      return <Droplets {...common} />;
    default:
      return <CloudSun {...common} />;
  }
}

export default function Widget() {
  const days: Day[] = data.days;

  const chartData = days.map((d) => ({
    day: d.label,
    high: d.high,
    low: d.low,
  }));

  const maxY = Math.max(...days.map((d) => d.high)) + 2;
  const minY = Math.min(...days.map((d) => d.low)) - 2;

  const eidDayContainers = [
    "day-0",
    "day-1",
    "day-2",
    "day-3",
    "day-4",
    "day-5",
    "day-6",
  ] as const;

  return (
    <section
      data-eid="root"
      style={{
        width: 440,
        height: 471,
        borderRadius: 22,
        overflow: "hidden",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: "#EAF0FF",
        background:
          "radial-gradient(120% 120% at 15% 0%, #101A3A 0%, #0B1230 40%, #070D24 100%)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        position: "relative",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "18px 20px 8px 20px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            data-eid="city-name"
            style={{
              fontSize: 15,
              letterSpacing: 0.2,
              opacity: 0.95,
              fontWeight: 600,
            }}
          >
            {data.city}
          </div>
          <div
            data-eid="current-temp"
            style={{
              fontSize: 40,
              fontWeight: 800,
              lineHeight: "40px",
              marginTop: 2,
            }}
          >
            {data.currentTemp}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 4,
            opacity: 0.95,
          }}
        >
          <span data-eid="condition-icon" style={{ display: "inline-flex", marginTop: 1 }}>
            <Icon name={data.conditionIcon} size={18} color="#FFC84A" />
          </span>
          <div
            data-eid="condition-text"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#CFE0FF",
            }}
          >
            {data.conditionText}
          </div>
        </div>
      </header>

      <div
        data-eid="temp-chart"
        style={{
          margin: "10px 20px 10px 20px",
          height: 140,
          borderRadius: 16,
          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
          padding: "10px 10px 6px 10px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 6, right: 8, left: 4, bottom: 6 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.10)" strokeDasharray="3 4" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "rgba(205,220,255,0.65)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[minY, maxY]}
              tick={{ fill: "rgba(205,220,255,0.40)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={26}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10,16,40,0.95)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 10,
                color: "#EAF0FF",
                fontSize: 12,
              }}
              labelStyle={{ color: "rgba(220,235,255,0.85)" }}
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#FF7A1A"
              strokeWidth={3}
              dot={{ r: 4, fill: "#FF7A1A", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#34C3FF"
              strokeWidth={3}
              dot={{ r: 4, fill: "#34C3FF", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        data-eid="day-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 10,
          padding: "4px 18px 0 18px",
        }}
      >
        {days.map((d, idx) => {
          const isPrimary = d.day.toUpperCase() === "MON";
          const containerEid = eidDayContainers[idx];

          const showLowEid =
            idx === 0 ? "day-0-low" : idx === 1 ? "day-1-low" : undefined;
          const showIconEid =
            idx === 0
              ? "day-0-icon"
              : idx === 1
              ? "day-1-icon"
              : undefined;

          return (
            <div
              key={d.day}
              data-eid={containerEid}
              style={{
                height: 112,
                borderRadius: 14,
                padding: "10px 8px",
                background: isPrimary
                  ? "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 6,
              }}
            >
              <span
                data-eid={
                  idx === 0
                    ? "day-0-name"
                    : idx === 1
                    ? "day-1-name"
                    : idx === 2
                    ? "day-2-name"
                    : idx === 3
                    ? "day-3-name"
                    : idx === 4
                    ? "day-4-name"
                    : idx === 5
                    ? "day-5-name"
                    : "day-6-name"
                }
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  color: "rgba(220,235,255,0.75)",
                }}
              >
                {d.day}
              </span>

              <span
                data-eid={showIconEid}
                style={{ height: 22, display: "inline-flex", alignItems: "center" }}
              >
                <Icon
                  name={d.icon}
                  size={18}
                  color={d.icon === "rain" ? "#4FC3FF" : "#FFC84A"}
                />
              </span>

              <span
                data-eid={
                  idx === 0
                    ? "day-0-high"
                    : idx === 1
                    ? "day-1-high"
                    : idx === 2
                    ? "day-2-high"
                    : idx === 3
                    ? "day-3-high"
                    : idx === 4
                    ? "day-4-high"
                    : idx === 5
                    ? "day-5-high"
                    : "day-6-high"
                }
                style={{ fontSize: 14, fontWeight: 800, lineHeight: "16px" }}
              >
                {d.high}°
              </span>

              {(idx === 0 || idx === 1) && (
                <span
                  data-eid={showLowEid}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(205,220,255,0.55)",
                    marginTop: -2,
                  }}
                >
                  {d.low}°
                </span>
              )}

              {idx === 0 && (
                <span
                  data-eid="day-0-precip"
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(130,170,255,0.75)",
                  }}
                >
                  {d.precip}%
                </span>
              )}

              {idx === 1 && (
                <span
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(130,170,255,0.75)",
                  }}
                >
                  {d.precip}%
                </span>
              )}

              {idx === 2 && (
                <span
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(130,170,255,0.75)",
                  }}
                >
                  {d.precip}%
                </span>
              )}

              {idx > 2 && (
                <div style={{ height: 15, marginTop: 4, opacity: 0 }} aria-hidden="true">
                  .
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        data-eid="footer-divider"
        style={{
          height: 1,
          background: "rgba(255,255,255,0.10)",
          margin: "14px 20px 10px 20px",
        }}
      />

      <footer
        data-eid="footer"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "0 18px 14px 18px",
          gap: 8,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Icon name="sunrise" size={18} color="#FFC84A" />
          <div style={{ fontSize: 11, color: "rgba(205,220,255,0.65)", fontWeight: 700 }}>
            Sunrise
          </div>
          <span data-eid="sunrise-time" style={{ fontSize: 12, fontWeight: 800 }}>
            {data.sunrise}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Icon name="sunset" size={18} color="#FF7A1A" />
          <div style={{ fontSize: 11, color: "rgba(205,220,255,0.65)", fontWeight: 700 }}>
            Sunset
          </div>
          <span data-eid="sunset-time" style={{ fontSize: 12, fontWeight: 800 }}>
            {data.sunset}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Icon name="droplets" size={18} color="#4FC3FF" />
          <div style={{ fontSize: 11, color: "rgba(205,220,255,0.65)", fontWeight: 700 }}>
            Humidity
          </div>
          <span data-eid="humidity-value" style={{ fontSize: 12, fontWeight: 800 }}>
            {data.humidity}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              border: "1.6px solid rgba(200,170,255,0.9)",
              color: "rgba(200,170,255,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 900,
              boxSizing: "border-box",
            }}
          >
            U
          </div>
          <div style={{ fontSize: 11, color: "rgba(205,220,255,0.65)", fontWeight: 700 }}>
            UV Index
          </div>
          <span data-eid="uv-index" style={{ fontSize: 12, fontWeight: 800 }}>
            {data.uvIndex}
          </span>
        </div>
      </footer>
    </section>
  );
}