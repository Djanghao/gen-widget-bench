import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart2 } from "lucide-react";
import data from "./data.json";

const chartColors = {
  aapl: "#357CFF",
  googl: "#0ECC6E",
  msft: "#B276FF",
};

const legendDotStyle = (color: string) => ({
  display: "inline-block",
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: color,
  marginRight: 6,
  marginTop: 2,
  verticalAlign: "middle",
});

const badgeStyle = {
  display: "inline-block",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 12,
  padding: "2px 13px",
  marginLeft: 8,
  letterSpacing: 1,
  background: "rgba(255,255,255,0.09)",
  color: "#99acf3",
  transition: "none",
};

const badgeActiveStyle = {
  ...badgeStyle,
  background: "#273172",
  color: "#fff",
};

const changeBadgeGreen = {
  background: "#11B981",
  color: "#fff",
  borderRadius: 14,
  fontSize: 15,
  fontWeight: 700,
  padding: "2px 13px",
  marginLeft: 16,
  display: "inline-block",
  verticalAlign: "middle",
};

const summaryCardCommon = {
  flex: 1,
  marginRight: 16,
  borderRadius: 12,
  padding: 18,
  background: "rgba(52, 40, 107, 0.38)",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 100,
};
const summaryColors = {
  aapl: "#357CFF",
  googl: "#0ECC6E",
  msft: "#B276FF",
};

const perfBarCommon = {
  height: 10,
  borderRadius: 4,
  background: "#272366",
  width: 185,
  display: "inline-block",
};
const perfBarFill = (color: string, percent: number) => ({
  background: color,
  height: "100%",
  borderRadius: 4,
  width: `${percent}%`,
  transition: "width 0.4s",
});

export default function Widget() {
  // Performance for bar widths
  const perfPerc = {
    aapl: parseFloat(data.performance.aapl.replace("%", "")),
    googl: parseFloat(data.performance.googl.replace("%", "")),
    msft: parseFloat(data.performance.msft.replace("%", "")),
  };
  // Chart series lookup
  const chartSeriesOrder = [
    {
      key: "aapl",
      name: "AAPL",
      color: chartColors.aapl,
    },
    {
      key: "googl",
      name: "GOOGL",
      color: chartColors.googl,
    },
    {
      key: "msft",
      name: "MSFT",
      color: chartColors.msft,
    },
  ];

  // Table metric list to match visible layout
  const metrics = [
    { label: "Open", slug: "open" },
    { label: "Close", slug: "close" },
    { label: "High", slug: "high" },
    { label: "Low", slug: "low" },
    { label: "Volume", slug: "volume" },
    { label: "Market Cap", slug: "mktcap" },
    { label: "P/E Ratio", slug: "pe" },
  ];

  return (
    <section
      data-eid="root"
      style={{
        fontFamily: "Inter, sans-serif",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        background: "linear-gradient(180deg, #181643 0%, #29235A 100%)",
        color: "#fff",
        padding: "32px 36px 0 36px",
        width: 520,
        minHeight: 750,
        marginLeft: "auto",
        marginRight: "auto",
        boxSizing: "border-box",
        position: "relative",
        boxShadow: "0 0 0 1px #15122e, 0 8px 32px #190e44a3",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 14,
        }}
      >
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BarChart2 color="#7D90DE" size={18} style={{ marginRight: 7, marginBottom: 2 }} />
            <div
              data-eid="portfolio-name"
              style={{
                fontWeight: 700,
                letterSpacing: 0.1,
                fontSize: 17.5,
                color: "#E6ECFA",
                marginRight: 10,
              }}
            >
              {data.portfolio.name}
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 7 }}
          >
            <div
              data-eid="portfolio-value"
              style={{
                fontSize: 35,
                fontWeight: 700,
                letterSpacing: 0.3,
                color: "#fff",
                marginRight: 13,
                lineHeight: 1,
              }}
            >
              {data.portfolio.value}
            </div>
            <span data-eid="portfolio-change" style={changeBadgeGreen}>
              <span style={{fontSize: 14, marginRight: 4, verticalAlign: "middle"}}>↗</span>
              {data.portfolio.change}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span data-eid="date-range-1w" style={badgeStyle}>
            1W
          </span>
          <span data-eid="date-range-1m" style={badgeActiveStyle}>
            1M
          </span>
          <span data-eid="date-range-3m" style={badgeStyle}>
            3M
          </span>
          <span data-eid="date-range-1y" style={badgeStyle}>
            1Y
          </span>
        </div>
      </header>

      {/* Chart */}
      <div data-eid="chart-section" style={{ width: "100%", marginBottom: 10, marginTop: 8 }}>
        <div
          data-eid="chart-container"
          style={{
            width: "100%",
            height: 152,
            background: "rgba(255,255,255,0.025)",
            borderRadius: 14,
            marginBottom: 17,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.chart}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7172a8",
                  fontSize: 13,
                  fontWeight: 450,
                  dy: 7,
                }}
                style={{ fontFamily: "Inter, sans-serif" }}
                padding={{ left: 15, right: 15 }}
              />
              <YAxis
                hide={true}
                domain={[
                  (min: number) => Math.floor(min * 0.98),
                  (max: number) => Math.ceil(max * 1.03),
                ]}
              />
              <Tooltip
                contentStyle={{
                  background: "#23265a",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "#fff",
                  boxShadow: "0 2px 10px #18164340",
                }}
                labelStyle={{
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 2,
                }}
                labelFormatter={v => v}
                formatter={(value: any, name: string) => [
                  `$${value}`,
                  name.toUpperCase(),
                ]}
              />
              {chartSeriesOrder.map(s => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  fill={s.color}
                  fillOpacity={s.key === "msft" ? 0.16 : 0.12}
                  strokeWidth={s.key === "msft" ? 2 : 2}
                  isAnimationActive={false}
                  dot={false}
                  activeDot={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          data-eid="legend"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 2,
            marginLeft: 6,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <span data-eid="legend-aapl" style={{ color: chartColors.aapl }}>
            <span style={legendDotStyle(chartColors.aapl)} />AAPL
          </span>
          <span data-eid="legend-googl" style={{ color: chartColors.googl }}>
            <span style={legendDotStyle(chartColors.googl)} />GOOGL
          </span>
          <span data-eid="legend-msft" style={{ color: chartColors.msft }}>
            <span style={legendDotStyle(chartColors.msft)} />MSFT
          </span>
        </div>
      </div>

      {/* Summary Row */}
      <div
        data-eid="summary-row"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: 0,
          width: "100%",
          marginBottom: 30,
          marginTop: 19,
        }}
      >
        {/* AAPL */}
        <div
          data-eid="summary-aapl"
          style={{
            ...summaryCardCommon,
            border: `2px solid #357CFF1C`,
            background: "rgba(53,124,255,0.09)",
            marginRight: 16,
          }}
        >
          <span
            data-eid="summary-aapl-symbol"
            style={{
              color: "#357CFF",
              fontWeight: 650,
              fontSize: 16.5,
              marginBottom: 0,
            }}
          >
            AAPL
          </span>
          <span
            data-eid="summary-aapl-name"
            style={{
              color: "#a8bafa",
              fontSize: 13,
              display: "block",
              marginTop: 3,
              marginBottom: 13,
              letterSpacing: 0.08,
              fontWeight: 400,
            }}
          >
            Apple Inc.
          </span>
          <span
            data-eid="summary-aapl-price"
            style={{
              fontSize: 25,
              fontWeight: 700,
              marginBottom: 3,
              marginTop: 2,
              display: "block",
              color: "#fff",
              letterSpacing: 0.3,
            }}
          >
            ${data.summary.aapl.price}
          </span>
          <span
            data-eid="summary-aapl-change"
            style={{
              color: "#11b981",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span style={{fontSize: 15, marginRight: 2}}>↗</span>{data.summary.aapl.change}
          </span>
        </div>
        {/* GOOGL */}
        <div
          data-eid="summary-googl"
          style={{
            ...summaryCardCommon,
            border: `2px solid #0ECC6E25`,
            background: "rgba(14,204,110,0.07)",
            marginRight: 16,
          }}
        >
          <span
            data-eid="summary-googl-symbol"
            style={{
              color: "#0ECC6E",
              fontWeight: 650,
              fontSize: 16.5,
            }}
          >
            GOOGL
          </span>
          <span
            data-eid="summary-googl-name"
            style={{
              color: "#a8f7b8",
              fontSize: 13,
              display: "block",
              marginTop: 3,
              marginBottom: 13,
              letterSpacing: 0.08,
              fontWeight: 400,
            }}
          >
            Alphabet Inc.
          </span>
          <span
            data-eid="summary-googl-price"
            style={{
              fontSize: 25,
              fontWeight: 700,
              marginBottom: 3,
              color: "#fff",
              marginTop: 2,
              letterSpacing: 0.3,
              display: "block",
            }}
          >
            ${data.summary.googl.price}
          </span>
          <span
            data-eid="summary-googl-change"
            style={{
              color: "#df3f36",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span style={{fontSize: 17, marginRight: 2, marginTop: 1, verticalAlign: "middle"}}>↘</span>{data.summary.googl.change}
          </span>
        </div>
        {/* MSFT */}
        <div
          data-eid="summary-msft"
          style={{
            ...summaryCardCommon,
            border: `2px solid #B276FF25`,
            background: "rgba(178,118,255,0.06)",
            marginRight: 0,
          }}
        >
          <span
            data-eid="summary-msft-symbol"
            style={{
              color: "#B276FF",
              fontWeight: 650,
              fontSize: 16.5,
            }}
          >
            MSFT
          </span>
          <span
            data-eid="summary-msft-name"
            style={{
              color: "#c9b5ef",
              fontSize: 13,
              display: "block",
              marginTop: 3,
              marginBottom: 13,
              letterSpacing: 0.08,
              fontWeight: 400,
            }}
          >
            Microsoft Corp.
          </span>
          <span
            data-eid="summary-msft-price"
            style={{
              fontSize: 25,
              fontWeight: 700,
              marginBottom: 3,
              color: "#fff",
              marginTop: 2,
              letterSpacing: 0.3,
              display: "block",
            }}
          >
            ${data.summary.msft.price}
          </span>
          <span
            data-eid="summary-msft-change"
            style={{
              color: "#11b981",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span style={{fontSize: 15, marginRight: 2}}>↗</span>{data.summary.msft.change}
          </span>
        </div>
      </div>

      {/* Key Metrics Table */}
      <div data-eid="table-section" style={{marginLeft: 1, marginRight: 1, marginBottom: 25, marginTop: 8}}>
        <div
          data-eid="table-title"
          style={{
            fontWeight: 700,
            letterSpacing: 0.05,
            fontSize: 17.5,
            color: "#E6ECFA",
            marginBottom: 8,
          }}
        >
          Key Metrics
        </div>
        <div
          data-eid="table-header"
          style={{
            display: "flex",
            borderBottom: "1.5px solid #252153",
            fontSize: 14.5,
            fontWeight: 600,
            marginBottom: 2,
            color: "#7574a8",
            padding:"0 3px 4px 3px",
            letterSpacing: 0.02,
            gap: 8,
          }}
        >
          <span data-eid="table-header-metric" style={{width: 104}}>METRIC</span>
          <span data-eid="table-header-aapl" style={{flex: 1, color: chartColors.aapl}}>AAPL</span>
          <span data-eid="table-header-googl" style={{flex: 1, color: chartColors.googl}}>GOOGL</span>
          <span data-eid="table-header-msft" style={{flex: 1, color: chartColors.msft}}>MSFT</span>
        </div>
        {/* Table rows */}
        {metrics.map(mt => {
          const rowStyle = {
            display: "flex",
            fontWeight: 450,
            fontSize: 15,
            color: "#dde6fa",
            padding: "5.5px 3px 4.5px 3px",
            borderBottom: "1.15px solid #221d40",
            letterSpacing: 0.02,
            alignItems: "flex-start",
            gap: 8,
          };
          return (
            <div key={mt.slug}
              data-eid={`table-row-${mt.slug}`}
              style={rowStyle}
            >
              <span data-eid={`table-row-${mt.slug}-label`} style={{
                width: 104,
                color: "#8b8abd",
                fontWeight: 480,
                fontSize: 15.2
              }}>{mt.label}</span>
              <span
                data-eid={`table-row-${mt.slug}-aapl`}
                style={{ flex: 1, color: chartColors.aapl }}
              >
                {data.metrics.aapl[mt.slug]}
              </span>
              <span
                data-eid={`table-row-${mt.slug}-googl`}
                style={{ flex: 1, color: chartColors.googl }}
              >
                {data.metrics.googl[mt.slug]}
              </span>
              <span
                data-eid={`table-row-${mt.slug}-msft`}
                style={{ flex: 1, color: chartColors.msft }}
              >
                {data.metrics.msft[mt.slug]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Performance Section */}
      <div data-eid="performance-section" style={{marginBottom: 23, marginTop: 8}}>
        <div
          data-eid="performance-title"
          style={{
            fontWeight: 700,
            fontSize: 15.7,
            letterSpacing: 0.01,
            color: "#E6ECFA",
            marginBottom: 11,
            marginLeft: 1,
          }}
        >
          1M Performance
        </div>
        {/* Perf Bars */}
        <div style={{display: "flex", flexDirection: "row", gap: 22}}>
          {/* AAPL */}
          <div data-eid="perf-aapl" style={{flex:1, minWidth: 215}}>
            <span data-eid="perf-aapl-label"
              style={{ color: chartColors.aapl, fontWeight: 600, fontSize: 15.5, marginBottom: 8, display: "block", letterSpacing: 0.015, marginLeft: 1 }}
            >AAPL</span>
            <div data-eid="perf-aapl-bar" style={perfBarCommon}>
              <div data-eid="perf-aapl-fill"
                style={perfBarFill(chartColors.aapl, perfPerc.aapl)}
              />
            </div>
            <span data-eid="perf-aapl-value"
              style={{
                marginLeft: 7,
                color: "#14b982",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 0.03,
                verticalAlign: "middle",
              }}
            >{data.performance.aapl}</span>
          </div>
          {/* GOOGL */}
          <div data-eid="perf-googl" style={{flex:1, minWidth: 215}}>
            <span data-eid="perf-googl-label"
              style={{ color: chartColors.googl, fontWeight: 600, fontSize: 15.5, marginBottom: 8, display: "block", letterSpacing: 0.015, marginLeft: 1 }}
            >GOOGL</span>
            <div data-eid="perf-googl-bar" style={perfBarCommon}>
              <div data-eid="perf-googl-fill"
                style={perfBarFill(chartColors.googl, perfPerc.googl)}
              />
            </div>
            <span data-eid="perf-googl-value"
              style={{
                marginLeft: 7,
                color: "#df3f36",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 0.03,
                verticalAlign: "middle",
              }}
            >{data.performance.googl}</span>
          </div>
          {/* MSFT */}
          <div data-eid="perf-msft" style={{flex:1, minWidth: 215}}>
            <span data-eid="perf-msft-label"
              style={{ color: chartColors.msft, fontWeight: 600, fontSize: 15.5, marginBottom: 8, display: "block", letterSpacing: 0.015, marginLeft: 1 }}
            >MSFT</span>
            <div data-eid="perf-msft-bar" style={perfBarCommon}>
              <div data-eid="perf-msft-fill"
                style={perfBarFill(chartColors.msft, perfPerc.msft)}
              />
            </div>
            <span data-eid="perf-msft-value"
              style={{
                marginLeft: 7,
                color: "#12ba79",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 0.03,
                verticalAlign: "middle",
              }}
            >{data.performance.msft}</span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        data-eid="footer"
        style={{
          color: "#8d9dad",
          fontSize: 13.5,
          marginTop: 7,
          marginBottom: 13,
          fontWeight: 430,
          letterSpacing: 0.02,
        }}
      >
        <span data-eid="footer-timestamp">Last updated: <b>{data.footer.timestamp}</b></span>
      </div>
    </section>
  );
}