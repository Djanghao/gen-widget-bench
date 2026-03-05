import React from "react";
import data from "./data.json";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MapPin, Car } from "lucide-react";

const barBg = "#242a35";
const yellow = "#ffe066";
const blue = "#3280ff";
const green = "#38b26a";
const red = "#d25057";
const dark = "#131922";
const text = "#dbe7ff";
const subtle = "#8692ad";
const border = "#273044";

const capacityBar = (value: number, total: number, color: string) => (
  <div
    style={{
      width: 184,
      height: 12,
      background: barBg,
      borderRadius: 6,
      overflow: "hidden",
      marginRight: 18,
      marginLeft: 0,
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
    }}
  >
    <div
      style={{
        width: `${Math.max(Math.min((value / total) * 100, 100), 0)}%`,
        height: "100%",
        background: color,
        borderRadius: 6,
        transition: "width 0.3s",
      }}
    ></div>
  </div>
);

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 430,
        background: dark,
        borderRadius: 28,
        padding: 24,
        margin: "40px auto",
        color: text,
        boxShadow: "0 2px 24px 0 #08101922",
        fontFamily: "Inter, sans-serif",
        fontSize: 16,
        lineHeight: 1.3,
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Car size={20} color={blue} style={{ marginRight: 7, marginTop: 1 }} />
          <h2
            data-eid="garage-name"
            style={{
              fontWeight: 700,
              fontSize: 22,
              color: "#fff",
              marginRight: 12,
              marginBottom: 0,
              marginTop: 0,
              flex: "none",
              letterSpacing: -0.5,
            }}
          >
            {data.garageName}
          </h2>
          <span
            data-eid="status-badge"
            style={{
              marginLeft: "auto",
              background: green,
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 18,
              padding: "4px 18px",
              lineHeight: 1.1,
            }}
          >
            {data.status}
          </span>
        </div>
        <div
          data-eid="garage-address"
          style={{
            marginLeft: 27,
            color: subtle,
            fontSize: 15,
            marginTop: 0,
            display: "flex",
            alignItems: "center",
            fontWeight: 400,
            marginBottom: 3,
          }}
        >
          <MapPin size={15} color={subtle} style={{ marginRight: 5, marginTop: -1 }} />
          {data.address}
        </div>
      </header>

      {/* Floors */}
      <div data-eid="floors-section" style={{ marginBottom: 21 }}>
        {/* B1 */}
        <div
          data-eid="floor-b1"
          style={{
            background: "none",
            borderRadius: 12,
            padding: "0 0 0 0",
            display: "flex",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            data-eid="floor-b1-label"
            style={{
              color: red,
              fontWeight: 700,
              fontSize: 17,
              width: 31,
              display: "inline-block",
              letterSpacing: -0.4,
            }}
          >
            B1
          </span>
          <div data-eid="floor-b1-bar" style={{ marginLeft: 5, marginRight: 0 }}>
            {capacityBar(data.floors.B1.available, data.floors.B1.total, red)}
          </div>
          <span
            data-eid="floor-b1-spots"
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              width: 53,
              textAlign: "right",
              display: "inline-block",
              marginLeft: 8,
            }}
          >
            {data.floors.B1.available}
            <span style={{ color: subtle, fontWeight: 500 }}>
              /{data.floors.B1.total}
            </span>
          </span>
          <span
            data-eid="floor-b1-rate"
            style={{
              color: subtle,
              fontWeight: 400,
              fontSize: 14,
              width: 54,
              marginLeft: 1,
              display: "inline-block",
              textAlign: "right",
              letterSpacing: 0,
            }}
          >
            {data.floors.B1.rate}
          </span>
        </div>

        {/* B2 */}
        <div
          data-eid="floor-b2"
          style={{
            background: "none",
            borderRadius: 12,
            padding: "0 0 0 0",
            display: "flex",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            data-eid="floor-b2-label"
            style={{
              color: "#FFCF30",
              fontWeight: 700,
              fontSize: 17,
              width: 31,
              display: "inline-block",
              letterSpacing: -0.4,
            }}
          >
            B2
          </span>
          <div data-eid="floor-b2-bar" style={{ marginLeft: 5 }}>
            {capacityBar(data.floors.B2.available, data.floors.B2.total, yellow)}
          </div>
          <span
            data-eid="floor-b2-spots"
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              width: 53,
              textAlign: "right",
              display: "inline-block",
              marginLeft: 8,
            }}
          >
            {data.floors.B2.available}
            <span style={{ color: subtle, fontWeight: 500 }}>
              /{data.floors.B2.total}
            </span>
          </span>
          <span
            data-eid="floor-b2-rate"
            style={{
              color: subtle,
              fontWeight: 400,
              fontSize: 14,
              width: 54,
              marginLeft: 1,
              display: "inline-block",
              textAlign: "right",
              letterSpacing: 0,
            }}
          >
            {data.floors.B2.rate}
          </span>
        </div>

        {/* L1 */}
        <div
          data-eid="floor-l1"
          style={{
            background: "none",
            borderRadius: 12,
            padding: "0 0 0 0",
            display: "flex",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            data-eid="floor-l1-label"
            style={{
              color: "#FFCF30",
              fontWeight: 700,
              fontSize: 17,
              width: 31,
              display: "inline-block",
              letterSpacing: -0.4,
            }}
          >
            L1
          </span>
          <div data-eid="floor-l1-bar" style={{ marginLeft: 5 }}>
            {capacityBar(data.floors.L1.available, data.floors.L1.total, yellow)}
          </div>
          <span
            data-eid="floor-l1-spots"
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              width: 53,
              textAlign: "right",
              display: "inline-block",
              marginLeft: 8,
            }}
          >
            {data.floors.L1.available}
            <span style={{ color: subtle, fontWeight: 500 }}>
              /{data.floors.L1.total}
            </span>
          </span>
          <span
            data-eid="floor-l1-rate"
            style={{
              color: subtle,
              fontWeight: 400,
              fontSize: 14,
              width: 54,
              marginLeft: 1,
              display: "inline-block",
              textAlign: "right",
              letterSpacing: 0,
            }}
          >
            {data.floors.L1.rate}
          </span>
        </div>

        {/* L2 */}
        <div
          data-eid="floor-l2"
          style={{
            background: "none",
            borderRadius: 12,
            padding: "0 0 0 0",
            display: "flex",
            alignItems: "center",
            marginBottom: 0,
          }}
        >
          <span
            data-eid="floor-l2-label"
            style={{
              color: "#FFCF30",
              fontWeight: 700,
              fontSize: 17,
              width: 31,
              display: "inline-block",
              letterSpacing: -0.4,
            }}
          >
            L2
          </span>
          <div data-eid="floor-l2-bar" style={{ marginLeft: 5 }}>
            {capacityBar(data.floors.L2.available, data.floors.L2.total, yellow)}
          </div>
          <span
            data-eid="floor-l2-spots"
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              width: 53,
              textAlign: "right",
              display: "inline-block",
              marginLeft: 8,
            }}
          >
            {data.floors.L2.available}
            <span style={{ color: subtle, fontWeight: 500 }}>
              /{data.floors.L2.total}
            </span>
          </span>
          <span
            data-eid="floor-l2-rate"
            style={{
              color: subtle,
              fontWeight: 400,
              fontSize: 14,
              width: 54,
              marginLeft: 1,
              display: "inline-block",
              textAlign: "right",
              letterSpacing: 0,
            }}
          >
            {data.floors.L2.rate}
          </span>
        </div>
      </div>

      {/* Summary section */}
      <div
        data-eid="summary-section"
        style={{
          border: `1px solid ${border}`,
          background: "rgba(32,38,52,0.6)",
          borderRadius: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "12px 0 8px 0",
          padding: "12px 0 9px 0",
        }}
      >
        <span
          data-eid="total-spots"
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 13,
            color: subtle,
            fontWeight: 600,
            letterSpacing: 0.7,
            display: "block",
            borderRight: `1px solid ${border}`,
            lineHeight: 1.0,
          }}
        >
          TOTAL
          <br />
          <span style={{ color: "#fff", fontSize: 23, fontWeight: 700, letterSpacing: 0, lineHeight: "1.18" }}>
            {data.summary.total}
          </span>
        </span>
        <span
          data-eid="available-spots"
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 13,
            color: subtle,
            fontWeight: 600,
            letterSpacing: 0.7,
            display: "block",
            borderRight: `1px solid ${border}`,
            lineHeight: 1.0,
          }}
        >
          AVAILABLE
          <br />
          <span style={{ color: "#38b26a", fontSize: 23, fontWeight: 700, letterSpacing: 0, lineHeight: "1.18" }}>
            {data.summary.available}
          </span>
        </span>
        <span
          data-eid="hourly-rate"
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 13,
            color: subtle,
            fontWeight: 600,
            letterSpacing: 0.7,
            display: "block",
            lineHeight: 1.0,
          }}
        >
          RATE
          <br />
          <span style={{ color: blue, fontSize: 23, fontWeight: 700, letterSpacing: 0, lineHeight: "1.18" }}>
            {data.summary.rate}
          </span>
        </span>
      </div>

      {/* Quick stats */}
      <div
        data-eid="quick-stats"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          margin: "6px 0 5px 0",
          fontSize: 15,
          color: subtle,
          fontWeight: 400,
        }}
      >
        <span data-eid="avg-stay" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 17, verticalAlign: "middle", marginRight: 3 }}>⏱️</span>
          Avg Stay: <span style={{ color: "#fff", marginLeft: 2 }}>{data.quick.avgStay}</span>
        </span>
        <span data-eid="busiest-hour" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 18, verticalAlign: "middle", marginRight: 3 }}>📈</span>
          Busiest: <span style={{ color: "#fff", marginLeft: 2 }}>{data.quick.busiestHour}</span>
        </span>
      </div>
      {/* Chart */}
      <div
        data-eid="occupancy-chart"
        style={{
          height: 170,
          width: "100%",
          marginTop: 2,
          paddingBottom: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.occupancy}
            margin={{ top: 4, right: 7, left: 0, bottom: 11 }}
            barCategoryGap={6}
          >
            <XAxis
              dataKey="time"
              tick={{ fill: subtle, fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: border, strokeWidth: 1.1 }}
              tickLine={false}
              height={28}
            />
            <YAxis
              tick={{ fill: subtle, fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: border, strokeWidth: 1.1 }}
              tickLine={false}
              width={28}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip
              cursor={{ fill: "#233" }}
              wrapperStyle={{
                background: dark,
                color: "#fff",
                border: `1px solid ${border}`,
                borderRadius: 8,
                fontSize: 13,
                boxShadow: "0 2px 8px #0003",
                padding: 0,
              }}
              contentStyle={{
                background: dark,
                border: `1px solid ${border}`,
                borderRadius: 8,
                fontSize: 13,
                color: "#fff",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.occupancy.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={
                    entry.barColor === "red"
                      ? red
                      : entry.barColor === "yellow"
                      ? yellow
                      : green
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}