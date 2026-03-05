import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import data from "./data.json";
import { RotateCw } from "lucide-react";

const flagEmoji: Record<string, string> = {
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  AUD: "🇦🇺",
  CAD: "🇨🇦",
  CHF: "🇨🇭",
  CNY: "🇨🇳",
  INR: "🇮🇳",
};

const getChangeColor = (v: number) =>
  v > 0
    ? "#22c55e"
    : v < 0
    ? "#ef4444"
    : "#71717a";

const getChangeSign = (v: number) =>
  v > 0 ? "+" : "";

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 500,
        borderRadius: 24,
        background: "linear-gradient(180deg, #121327 90%, #151626 100%)",
        padding: "24px 32px 0px 32px",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#fff",
        boxSizing: "border-box",
        margin: "0 auto",
      }}
    >
      <div data-eid="header" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          <RotateCw size={19} color="#5AC8FA" style={{ marginRight: 9, marginTop: 2 }} />
          <span
            data-eid="base-currency"
            style={{
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            Exchange Rates
          </span>
        </div>
        <div
          data-eid="base-amount"
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "0.5px",
            marginBottom: 4,
            marginTop: 5,
          }}
        >
          {data.baseAmount} {data.baseCurrency}
        </div>
        <div
          data-eid="last-updated"
          style={{
            color: "#a1a1aa",
            fontSize: 13,
            fontWeight: 400,
            marginBottom: 7,
          }}
        >
          Updated: {data.lastUpdated}
        </div>
      </div>
      <div data-eid="currency-list">
        {data.currencies.map((cur, i) => (
          <div
            key={cur.code}
            data-eid={`currency-row-${i}`}
            style={{
              background: "rgba(26, 27, 44, 1)",
              borderRadius: 12,
              padding: "13px 18px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 36,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 15, minWidth: 212 }}>
              <span
                data-eid={`currency-flag-${i}`}
                style={{ fontSize: 19, marginRight: 4, marginTop: 1.5 }}
              >
                {flagEmoji[cur.code]}
              </span>
              <span
                data-eid={`currency-code-${i}`}
                style={{
                  fontWeight: 600,
                  fontSize: 17,
                  letterSpacing: 0.5,
                  color: "#fff",
                  marginRight: 7,
                }}
              >
                {cur.code}
              </span>
              <span
                data-eid={`currency-name-${i}`}
                style={{
                  color: "#d4d4d8",
                  fontWeight: 400,
                  fontSize: 15,
                }}
              >
                {cur.name}
              </span>
            </span>
            <span style={{ minWidth: 125, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <span
                data-eid={`currency-rate-${i}`}
                style={{
                  fontFamily: "Inter, Arial, sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  color: "#fff",
                  textAlign: "right",
                  marginRight: 19,
                  minWidth: 65,
                }}
              >
                {cur.rate}
              </span>
              <span
                data-eid={`currency-change-${i}`}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: getChangeColor(cur.changeValue),
                  letterSpacing: 0.1,
                  minWidth: 54,
                  textAlign: "right",
                }}
              >
                {getChangeSign(cur.changeValue)}
                {cur.change}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div data-eid="chart-section" style={{ marginTop: 30, paddingBottom: 24 }}>
        <div
          data-eid="chart-title"
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#b1b1b9",
            letterSpacing: "1px",
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          Relative Strength (24h)
        </div>
        <div
          data-eid="bar-chart"
          style={{
            width: "100%",
            height: 84,
            background: "none",
            marginTop: 6,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.relativeStrength}>
              <XAxis
                dataKey="code"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: 13, fontWeight: 700, fill: "#b1b1b9" }}
                tick={{ fill: "#b1b1b9", fontSize: 13, fontWeight: 700 }}
                interval={0}
                dy={5}
              />
              <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
              <Bar
                dataKey="strength"
                radius={[4, 4, 0, 0]}
                barSize={24}
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}