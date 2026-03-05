// submissions/<your-model-name>/widget.tsx
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { BarChart3 } from "lucide-react";
import data from "./data.json";

const colors = {
  bgTop: "#0b0f2a",
  bgMid: "#1a1450",
  bgBottom: "#0a0c22",
  panel: "rgba(255,255,255,0.06)",
  panel2: "rgba(255,255,255,0.04)",
  stroke: "rgba(255,255,255,0.09)",
  text: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.55)",
  muted2: "rgba(255,255,255,0.40)",
  aapl: "#4aa3ff",
  googl: "#20d08a",
  msft: "#b05cff",
  green: "#28d17c",
  red: "#ff5f6f",
};

function pillStyle(active?: boolean): React.CSSProperties {
  return {
    fontSize: 12,
    color: active ? "rgba(230,235,255,0.95)" : "rgba(230,235,255,0.65)",
    padding: "5px 10px",
    borderRadius: 10,
    border: `1px solid ${active ? "rgba(120,140,255,0.35)" : "rgba(255,255,255,0.12)"}`,
    background: active ? "rgba(110,125,255,0.18)" : "rgba(255,255,255,0.04)",
    lineHeight: "12px",
    userSelect: "none",
  };
}

const fmtMoney = (v: number) =>
  `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "rgba(9,10,24,0.88)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 10,
        padding: "10px 10px",
        color: colors.text,
        fontSize: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        minWidth: 140,
      }}
    >
      <div style={{ color: colors.muted, marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ color: p.color }}>{String(p.name)}</span>
          <span style={{ color: colors.text, fontVariantNumeric: "tabular-nums" }}>
            {fmtMoney(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Widget() {
  const d: any = data;

  return (
    <section
      data-eid="root"
      style={{
        width: 520,
        height: 780,
        borderRadius: 22,
        background: `radial-gradient(1200px 700px at 20% 0%, rgba(60,70,180,0.35), rgba(0,0,0,0) 55%),
                     linear-gradient(180deg, ${colors.bgTop} 0%, ${colors.bgMid} 48%, ${colors.bgBottom} 100%)`,
        color: colors.text,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        boxShadow: "0 22px 55px rgba(0,0,0,0.45)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* subtle inner border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      />

      <header
        data-eid="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 18px 6px 18px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(106,124,255,0.14)",
                border: "1px solid rgba(120,140,255,0.26)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={16} color="rgba(140,165,255,0.95)" />
            </div>
            <div
              data-eid="portfolio-name"
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 0.2,
              }}
            >
              {d.portfolio.name}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              data-eid="portfolio-value"
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: 0.2,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {d.portfolio.valueText}
            </div>
            <span
              data-eid="portfolio-change"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 10,
                background: "rgba(40,209,124,0.10)",
                border: "1px solid rgba(40,209,124,0.38)",
                color: colors.green,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.2,
              }}
            >
              {"^"}
              {d.portfolio.changeText}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <span data-eid="date-range-1w" style={pillStyle(false)}>
            1W
          </span>
          <span data-eid="date-range-1m" style={pillStyle(true)}>
            1M
          </span>
          <span data-eid="date-range-3m" style={pillStyle(false)}>
            3M
          </span>
          <span data-eid="date-range-1y" style={pillStyle(false)}>
            1Y
          </span>
        </div>
      </header>

      <div data-eid="chart-section" style={{ padding: "8px 18px 0 18px" }}>
        <div
          style={{
            height: 210,
            borderRadius: 18,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 10px 8px 10px",
          }}
        >
          <div data-eid="chart-container" style={{ width: "100%", height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d.chart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gMsft" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.msft} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={colors.msft} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gAapl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.aapl} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={colors.aapl} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gGoogl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.googl} stopOpacity={0.16} />
                    <stop offset="100%" stopColor={colors.googl} stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  height={28}
                />
                <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="msft"
                  name="MSFT"
                  stroke={colors.msft}
                  strokeWidth={2.3}
                  fill="url(#gMsft)"
                  fillOpacity={1}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="aapl"
                  name="AAPL"
                  stroke={colors.aapl}
                  strokeWidth={1.9}
                  fill="url(#gAapl)"
                  fillOpacity={1}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="googl"
                  name="GOOGL"
                  stroke={colors.googl}
                  strokeWidth={1.9}
                  fill="url(#gGoogl)"
                  fillOpacity={1}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          data-eid="legend"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            paddingTop: 10,
            paddingBottom: 8,
            fontSize: 12,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <span data-eid="legend-aapl" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: colors.aapl }} />
            AAPL
          </span>
          <span
            data-eid="legend-googl"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: colors.googl }} />
            GOOGL
          </span>
          <span data-eid="legend-msft" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: colors.msft }} />
            MSFT
          </span>
        </div>
      </div>

      <div
        data-eid="summary-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          padding: "10px 18px 12px 18px",
        }}
      >
        {/* AAPL */}
        <div
          data-eid="summary-aapl"
          style={{
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(74,163,255,0.08), rgba(255,255,255,0.03))",
            border: "1px solid rgba(74,163,255,0.18)",
            padding: "12px 12px",
            minHeight: 78,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span data-eid="summary-aapl-symbol" style={{ color: colors.aapl, fontSize: 13, fontWeight: 800 }}>
              {d.summaries.aapl.symbol}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <span data-eid="summary-aapl-price" style={{ fontSize: 22, fontWeight: 800 }}>
              {d.summaries.aapl.priceText}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span
              data-eid="summary-aapl-change"
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.green,
              }}
            >
              {"^"}
              {d.summaries.aapl.changeText}
            </span>
          </div>
          <span data-eid="summary-aapl-name" style={{ display: "block", marginTop: 2, fontSize: 11, color: colors.muted2 }}>
            {d.summaries.aapl.name}
          </span>
        </div>

        {/* GOOGL */}
        <div
          data-eid="summary-googl"
          style={{
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(32,208,138,0.08), rgba(255,255,255,0.03))",
            border: "1px solid rgba(32,208,138,0.18)",
            padding: "12px 12px",
            minHeight: 78,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span
              data-eid="summary-googl-symbol"
              style={{ color: colors.googl, fontSize: 13, fontWeight: 800 }}
            >
              {d.summaries.googl.symbol}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <span data-eid="summary-googl-price" style={{ fontSize: 22, fontWeight: 800 }}>
              {d.summaries.googl.priceText}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span
              data-eid="summary-googl-change"
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.red,
              }}
            >
              {"v"}
              {d.summaries.googl.changeText}
            </span>
          </div>
          <span
            data-eid="summary-googl-name"
            style={{ display: "block", marginTop: 2, fontSize: 11, color: colors.muted2 }}
          >
            {d.summaries.googl.name}
          </span>
        </div>

        {/* MSFT */}
        <div
          data-eid="summary-msft"
          style={{
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(176,92,255,0.08), rgba(255,255,255,0.03))",
            border: "1px solid rgba(176,92,255,0.18)",
            padding: "12px 12px",
            minHeight: 78,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span data-eid="summary-msft-symbol" style={{ color: colors.msft, fontSize: 13, fontWeight: 800 }}>
              {d.summaries.msft.symbol}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <span data-eid="summary-msft-price" style={{ fontSize: 22, fontWeight: 800 }}>
              {d.summaries.msft.priceText}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span
              data-eid="summary-msft-change"
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.green,
              }}
            >
              {"^"}
              {d.summaries.msft.changeText}
            </span>
          </div>
          <span data-eid="summary-msft-name" style={{ display: "block", marginTop: 2, fontSize: 11, color: colors.muted2 }}>
            {d.summaries.msft.name}
          </span>
        </div>
      </div>

      <div
        data-eid="table-section"
        style={{
          margin: "4px 18px 0 18px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "12px 14px 12px 14px",
        }}
      >
        <div data-eid="table-title" style={{ fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.85)" }}>
          {d.table.title}
        </div>

        <div
          data-eid="table-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
            paddingTop: 10,
            paddingBottom: 8,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          <span data-eid="table-header-metric" style={{ color: "rgba(255,255,255,0.45)" }}>
            METRIC
          </span>
          <span data-eid="table-header-aapl" style={{ color: colors.aapl, textAlign: "right" }}>
            AAPL
          </span>
          <span data-eid="table-header-googl" style={{ color: colors.googl, textAlign: "right" }}>
            GOOGL
          </span>
          <span data-eid="table-header-msft" style={{ color: colors.msft, textAlign: "right" }}>
            MSFT
          </span>
        </div>

        {[
          { eid: "table-row-open", labelEid: "table-row-open-label", a: "table-row-open-aapl", g: "table-row-open-googl", m: "table-row-open-msft", row: d.table.rows.open },
          { eid: "table-row-close", labelEid: "table-row-close-label", a: "table-row-close-aapl", g: "table-row-close-googl", m: "table-row-close-msft", row: d.table.rows.close },
          { eid: "table-row-high", labelEid: "table-row-high-label", a: "table-row-high-aapl", g: "table-row-high-googl", m: "table-row-high-msft", row: d.table.rows.high },
          { eid: "table-row-low", labelEid: "table-row-low-label", a: "table-row-low-aapl", g: "table-row-low-googl", m: "table-row-low-msft", row: d.table.rows.low },
          { eid: "table-row-volume", labelEid: "table-row-volume-label", a: "table-row-volume-aapl", g: "table-row-volume-googl", m: "table-row-volume-msft", row: d.table.rows.volume },
          { eid: "table-row-mktcap", labelEid: "table-row-mktcap-label", a: "table-row-mktcap-aapl", g: "table-row-mktcap-googl", m: "table-row-mktcap-msft", row: d.table.rows.marketCap },
          { eid: "table-row-pe", labelEid: "table-row-pe-label", a: "table-row-pe-aapl", g: "table-row-pe-googl", m: "table-row-pe-msft", row: d.table.rows.peRatio },
        ].map((r, idx) => (
          <div
            key={r.eid}
            data-eid={r.eid}
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
              padding: "10px 0",
              borderBottom:
                idx === 6 ? "none" : "1px solid rgba(255,255,255,0.06)",
              fontSize: 12,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <span data-eid={r.labelEid} style={{ color: "rgba(255,255,255,0.55)" }}>
              {r.row.label}
            </span>
            <span data-eid={r.a} style={{ textAlign: "right", color: "rgba(255,255,255,0.86)", fontVariantNumeric: "tabular-nums" }}>
              {r.row.aapl}
            </span>
            <span data-eid={r.g} style={{ textAlign: "right", color: "rgba(255,255,255,0.86)", fontVariantNumeric: "tabular-nums" }}>
              {r.row.googl}
            </span>
            <span data-eid={r.m} style={{ textAlign: "right", color: "rgba(255,255,255,0.86)", fontVariantNumeric: "tabular-nums" }}>
              {r.row.msft}
            </span>
          </div>
        ))}
      </div>

      <div
        data-eid="performance-section"
        style={{
          margin: "12px 18px 0 18px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "12px 14px 12px 14px",
        }}
      >
        <div
          data-eid="performance-title"
          style={{ fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.85)" }}
        >
          {d.performance.title}
        </div>

        {/* AAPL */}
        <div data-eid="perf-aapl" style={{ display: "grid", gridTemplateColumns: "70px 1fr 60px", alignItems: "center", gap: 10, paddingTop: 10 }}>
          <span data-eid="perf-aapl-label" style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, fontWeight: 700 }}>
            AAPL
          </span>
          <div
            data-eid="perf-aapl-bar"
            style={{
              height: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              data-eid="perf-aapl-fill"
              style={{
                height: "100%",
                width: `${d.performance.bars.aapl.fillPct}%`,
                background: `linear-gradient(90deg, rgba(74,163,255,0.25), ${colors.aapl})`,
                borderRadius: 999,
              }}
            />
          </div>
          <span
            data-eid="perf-aapl-value"
            style={{ textAlign: "right", color: colors.green, fontSize: 12, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}
          >
            {d.performance.bars.aapl.valueText}
          </span>
        </div>

        {/* GOOGL */}
        <div data-eid="perf-googl" style={{ display: "grid", gridTemplateColumns: "70px 1fr 60px", alignItems: "center", gap: 10, paddingTop: 10 }}>
          <span data-eid="perf-googl-label" style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, fontWeight: 700 }}>
            GOOGL
          </span>
          <div
            data-eid="perf-googl-bar"
            style={{
              height: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              data-eid="perf-googl-fill"
              style={{
                height: "100%",
                width: `${d.performance.bars.googl.fillPct}%`,
                background: `linear-gradient(90deg, rgba(32,208,138,0.22), ${colors.googl})`,
                borderRadius: 999,
              }}
            />
          </div>
          <span
            data-eid="perf-googl-value"
            style={{ textAlign: "right", color: colors.green, fontSize: 12, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}
          >
            {d.performance.bars.googl.valueText}
          </span>
        </div>

        {/* MSFT */}
        <div data-eid="perf-msft" style={{ display: "grid", gridTemplateColumns: "70px 1fr 60px", alignItems: "center", gap: 10, paddingTop: 10 }}>
          <span data-eid="perf-msft-label" style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, fontWeight: 700 }}>
            MSFT
          </span>
          <div
            data-eid="perf-msft-bar"
            style={{
              height: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              data-eid="perf-msft-fill"
              style={{
                height: "100%",
                width: `${d.performance.bars.msft.fillPct}%`,
                background: `linear-gradient(90deg, rgba(176,92,255,0.22), ${colors.msft})`,
                borderRadius: 999,
              }}
            />
          </div>
          <span
            data-eid="perf-msft-value"
            style={{ textAlign: "right", color: colors.green, fontSize: 12, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}
          >
            {d.performance.bars.msft.valueText}
          </span>
        </div>
      </div>

      <div
        data-eid="footer"
        style={{
          padding: "10px 18px 14px 18px",
          color: "rgba(255,255,255,0.45)",
          fontSize: 11,
        }}
      >
        <span data-eid="footer-timestamp">{d.footer.timestamp}</span>
      </div>
    </section>
  );
}