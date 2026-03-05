import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";
import data from "./data.json";

const legendColors = {
  portfolio: "#6C77FF",
  sp500: "#45D48C",
  bonds: "#FFBC2B",
};

const legendLabels = {
  portfolio: "Portfolio",
  sp500: "S&P 500",
  bonds: "Bonds",
};

const summaryColor = (value: string) => {
  if (value.startsWith("+")) return "#45D48C";
  if (value.startsWith("-")) return "#F35A6A";
  return "#E1E8FF";
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: "#121426",
        borderRadius: 24,
        width: 480,
        margin: "0 auto",
        marginTop: 8,
        padding: 0,
        boxShadow: "0 4px 32px rgba(18,20,38,0.07)",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{
          padding: "28px 32px 0 32px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          data-eid="portfolio-name"
          style={{
            fontWeight: 700,
            color: "#fff",
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 2,
          }}
        >
          <LineChartIcon size={20} color="#6C77FF" style={{ marginRight: 6, position: "relative", top: 1 }} />
          Growth Portfolio Alpha
        </div>
        <div
          data-eid="date-range"
          style={{
            fontSize: 15,
            color: "#A3AAC2",
            fontWeight: 400,
            marginBottom: 8,
          }}
        >
          Jan 2024 - Dec 2024
        </div>
      </div>
      {/* Chart Section */}
      <div
        data-eid="chart-section"
        style={{
          padding: "0 20px",
          marginTop: 4,
        }}
      >
        <div
          data-eid="line-chart"
          style={{
            width: "100%",
            height: 220,
          }}
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.chartData} margin={{ top: 20, right: 12, left: 0, bottom: 8 }}>
              <YAxis
                domain={[96, 128]}
                ticks={[96, 104, 112, 120, 128]}
                tick={{ fill: "#A3AAC2", fontSize: 13, fontWeight: 400 }}
                axisLine={false}
                tickLine={false}
                width={36}
                stroke="#323544"
                style={{fontFamily: "inherit"}}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#A3AAC2", fontSize: 13, fontWeight: 400 }}
                axisLine={false}
                tickLine={false}
                style={{fontFamily: "inherit"}}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke={legendColors.portfolio}
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke={legendColors.sp500}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bonds"
                stroke={legendColors.bonds}
                strokeWidth={2}
                dot={false}
              />
              <Tooltip
                wrapperStyle={{
                  borderRadius: 12,
                  background: "#22243b",
                  border: "none",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: 13,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
                }}
                contentStyle={{
                  background: "#22243b",
                  border: "none",
                  borderRadius: 12,
                  padding: "10px 14px",
                  color: "#fff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
                }}
                labelStyle={{ color: "#BDC7F7" }}
                cursor={{ stroke: "#323544" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div
          data-eid="legend"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 24,
            fontSize: 15,
            marginTop: 6,
            marginLeft: 28,
            marginBottom: 4,
          }}
        >
          <span data-eid="legend-portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{
              display: "inline-block",
              width: 22,
              height: 2.5,
              borderRadius: 4,
              background: legendColors.portfolio,
              marginRight: 6,
            }} />{" "}
            <span style={{ color: legendColors.portfolio, fontWeight: 400 }}>Portfolio</span>
          </span>
          <span data-eid="legend-sp500" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{
              display: "inline-block",
              width: 22,
              height: 2.5,
              borderRadius: 4,
              background: legendColors.sp500,
              marginRight: 6,
            }} />{" "}
            <span style={{ color: legendColors.sp500, fontWeight: 400 }}>S&amp;P 500</span>
          </span>
          <span data-eid="legend-bonds" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{
              display: "inline-block",
              width: 22,
              height: 2.5,
              borderRadius: 4,
              background: legendColors.bonds,
              marginRight: 6,
            }} />{" "}
            <span style={{ color: legendColors.bonds, fontWeight: 400 }}>Bonds</span>
          </span>
        </div>
      </div>
      {/* Performance Summary */}
      <div
        data-eid="summary-section"
        style={{
          padding: "22px 0 22px 0",
          marginTop: 18,
          background: "transparent",
        }}
      >
        <div
          data-eid="summary-title"
          style={{
            color: "#A3AAC2",
            fontSize: 15,
            letterSpacing: "1.1px",
            fontWeight: 700,
            padding: "0 32px",
            marginBottom: 10,
          }}
        >
          PERFORMANCE SUMMARY
        </div>
        {/* Metrics rows */}
        <div
          data-eid="metric-row-0"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
            marginBottom: 9,
            height: 38,
            background: "#22243b",
            borderRadius: 10,
          }}
        >
          <span data-eid="metric-label-0" style={{ color: "#A3AAC2", fontWeight: 500, fontSize: 16 }}>Total Return</span>
          <span data-eid="metric-value-0" style={{ color: "#45D48C", fontWeight: 700, fontSize: 17 }}>+24.67%</span>
        </div>
        <div
          data-eid="metric-row-1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
            marginBottom: 9,
            height: 38,
            background: "#22243b",
            borderRadius: 10,
          }}
        >
          <span data-eid="metric-label-1" style={{ color: "#A3AAC2", fontWeight: 500, fontSize: 16 }}>Annualized Return</span>
          <span data-eid="metric-value-1" style={{ color: "#45D48C", fontWeight: 700, fontSize: 17 }}>+24.67%</span>
        </div>
        <div
          data-eid="metric-row-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
            marginBottom: 9,
            height: 38,
            background: "#22243b",
            borderRadius: 10,
          }}
        >
          <span data-eid="metric-label-2" style={{ color: "#A3AAC2", fontWeight: 500, fontSize: 16 }}>Sharpe Ratio</span>
          <span data-eid="metric-value-2" style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>1.847</span>
        </div>
        <div
          data-eid="metric-row-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
            marginBottom: 9,
            height: 38,
            background: "#22243b",
            borderRadius: 10,
          }}
        >
          <span data-eid="metric-label-3" style={{ color: "#A3AAC2", fontWeight: 500, fontSize: 16 }}>Max Drawdown</span>
          <span data-eid="metric-value-3" style={{ color: "#F35A6A", fontWeight: 700, fontSize: 17 }}>-4.50%</span>
        </div>
        <div
          data-eid="metric-row-4"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
            marginBottom: 9,
            height: 38,
            background: "#22243b",
            borderRadius: 10,
          }}
        >
          <span data-eid="metric-label-4" style={{ color: "#A3AAC2", fontWeight: 500, fontSize: 16 }}>Volatility</span>
          <span data-eid="metric-value-4" style={{ color: "#E1E8FF", fontWeight: 700, fontSize: 17 }}>14.23%</span>
        </div>
        <div
          data-eid="metric-row-5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
            height: 38,
            background: "#22243b",
            borderRadius: 10,
          }}
        >
          <span data-eid="metric-label-5" style={{ color: "#A3AAC2", fontWeight: 500, fontSize: 16 }}>Beta</span>
          <span data-eid="metric-value-5" style={{ color: "#E1E8FF", fontWeight: 700, fontSize: 17 }}>0.88</span>
        </div>
      </div>
    </section>
  );
}