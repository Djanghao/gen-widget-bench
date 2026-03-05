import React from "react";
import data from "./data.json";
import { BarChart, Bar } from "recharts";
import { BarChart as BarChartIcon } from "lucide-react";

const cellColors = [
  // color codes for each cell based on value
  { bg: "#22854B", color: "#fff" }, // AAPL (green)
  { bg: "#22854B", color: "#fff" }, // MSFT (green)
  { bg: "#631C1C", color: "#fff" }, // GOOGL (red)
  { bg: "#22854B", color: "#fff" }, // AMZN (green)
  { bg: "#23A455", color: "#fff" }, // NVDA (more green)
  { bg: "#8D3539", color: "#fff" }, // META (mid red)
  { bg: "#CC384E", color: "#fff" }, // TSLA (red)
  { bg: "#194A34", color: "#fff" }, // JPM (light green)
  { bg: "#194A34", color: "#fff" }, // V (mint green)
  { bg: "#631C1C", color: "#fff" }, // JNJ (red)
  { bg: "#1E6248", color: "#fff" }, // WMT (green)
  { bg: "#942E37", color: "#fff" }, // UNH (red)
];
const changeColor = (val: string) =>
  val.startsWith("+")
    ? "#22CE6B"
    : val.startsWith("-")
    ? "#DF4260"
    : "#fff";

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: "#161926",
        borderRadius: 32,
        width: 470,
        padding: 32,
        color: "#fff",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
        boxSizing: "border-box",
        margin: "24px auto",
        display: "block",
      }}
    >
      <div data-eid="header" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BarChartIcon size={20} color="#908bfe" style={{ marginRight: 3 }} />
          <div
            data-eid="index-name"
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: ".01em",
              marginTop: 1,
            }}
          >
            {data.indexName}
          </div>
        </div>
        <div style={{ marginTop: 18, display: "flex", alignItems: "flex-end" }}>
          <span
            data-eid="index-value"
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#fff",
              lineHeight: "1",
              marginRight: 12,
            }}
          >
            {data.indexValue}
          </span>
          <span
            data-eid="index-change"
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "#22CE6B",
              marginBottom: 2,
            }}
          >
            {data.indexChange}
          </span>
        </div>
        <div
          data-eid="last-updated"
          style={{
            marginTop: 8,
            color: "#B3B9CE",
            fontSize: 15,
            letterSpacing: ".01em",
            fontWeight: 400,
          }}
        >
          {data.lastUpdated}
        </div>
      </div>
      <div
        data-eid="heatmap-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 17,
        }}
      >
        {data.stocks.map((s, i) => (
          <div
            data-eid={`stock-cell-${i}`}
            key={s.ticker}
            style={{
              background: cellColors[i].bg,
              borderRadius: 12,
              padding: "12px 14px 10px 14px",
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              boxSizing: "border-box",
            }}
          >
            <div
              data-eid={`stock-ticker-${i}`}
              style={{
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1,
                letterSpacing: ".01em",
                color: "#fff",
                marginBottom: 0,
              }}
            >
              {s.ticker}
            </div>
            <div
              data-eid={`stock-company-${i}`}
              style={{
                fontWeight: 400,
                fontSize: 13,
                color: "#EAF2F8",
                marginBottom: 6,
                marginTop: 1,
                lineHeight: "1.15",
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={s.company}
            >
              {s.company}
            </div>
            <div
              data-eid={`stock-price-${i}`}
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#fff",
                marginBottom: 0,
              }}
            >
              {s.price}
            </div>
            <div
              data-eid={`stock-change-${i}`}
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: changeColor(s.change),
                marginTop: 1,
              }}
            >
              {s.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}