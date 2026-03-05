// submissions/<your-model-name>/widget.tsx
import React, { useMemo } from "react";
import data from "./data.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

type ChainRow = {
  call: { bid: string; ask: string; vol: string; oi: string; iv: string };
  strike: string;
  put: { bid: string; ask: string; vol: string; oi: string; iv: string };
  highlight?: boolean;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (v: number) => v.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function mix(c1: string, c2: string, t: number) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  return rgbToHex(
    Math.round(lerp(a.r, b.r, t)),
    Math.round(lerp(a.g, b.g, t)),
    Math.round(lerp(a.b, b.b, t))
  );
}

function volColor(v: number, min: number, max: number) {
  // Low (blue) -> Medium (teal) -> High (orange) -> Very High (red)
  const t = clamp((v - min) / Math.max(1e-9, max - min), 0, 1);
  const stops = [
    { t: 0.0, c: "#2f6fff" }, // blue
    { t: 0.45, c: "#2bb3ff" }, // light blue
    { t: 0.7, c: "#f59e0b" }, // orange
    { t: 1.0, c: "#ef4444" }, // red
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const s0 = stops[i];
    const s1 = stops[i + 1];
    if (t >= s0.t && t <= s1.t) {
      const tt = (t - s0.t) / (s1.t - s0.t);
      return mix(s0.c, s1.c, tt);
    }
  }
  return stops[stops.length - 1].c;
}

const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
const sans = "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";

export default function Widget() {
  const chain: ChainRow[] = data.optionsChain.rows;

  const payoffData = useMemo(() => {
    // Ensure Recharts-friendly numeric values
    return data.payoff.chart.map((p: any) => ({
      price: Number(p.price),
      pl: Number(p.pl),
    }));
  }, []);

  const vol = data.volSurface;
  const allVolVals = vol.rows.flatMap((r: any) => r.values.map((x: any) => Number(x)));
  const volMin = Math.min(...allVolVals);
  const volMax = Math.max(...allVolVals);

  const colors = {
    bg0: "#0b0c0d",
    bg1: "#141516",
    panel: "rgba(255,255,255,0.04)",
    panel2: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.10)",
    border2: "rgba(255,255,255,0.08)",
    text: "rgba(255,255,255,0.92)",
    mut: "rgba(255,255,255,0.55)",
    mut2: "rgba(255,255,255,0.42)",
    accent: "#f97316",
    blue: "#3aa0ff",
    green: "#22c55e",
    red: "#ef4444",
    purple: "#c084fc",
    cyan: "#22d3ee",
  };

  const containerStyle: React.CSSProperties = {
    width: 440,
    height: 980,
    boxSizing: "border-box",
    padding: 16,
    borderRadius: 18,
    color: colors.text,
    fontFamily: sans,
    background:
      "radial-gradient(120% 80% at 30% 10%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 35%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0b0c0d 0%, #0a0a0a 25%, #090a0b 100%)",
    boxShadow: "0 24px 50px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)",
    overflow: "hidden",
  };

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))",
    border: `1px solid ${colors.border2}`,
    borderRadius: 10,
    padding: 10,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: mono,
    fontSize: 13,
    letterSpacing: 1.2,
    color: colors.accent,
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const tinyLabel: React.CSSProperties = {
    fontFamily: mono,
    fontSize: 11,
    color: colors.mut,
    letterSpacing: 0.3,
  };

  const tinyValue: React.CSSProperties = {
    fontFamily: mono,
    fontSize: 12,
    color: colors.text,
  };

  return (
    <section data-eid="root" style={containerStyle}>
      {/* HEADER */}
      <header data-eid="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h1 data-eid="ticker-symbol" style={{ margin: 0, fontSize: 28, letterSpacing: 1, fontWeight: 800 }}>
            {data.header.ticker}
          </h1>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span data-eid="stock-price" style={{ fontFamily: mono, fontSize: 20, fontWeight: 800 }}>
              {data.header.price}
            </span>
            <span
              data-eid="price-change"
              style={{
                fontFamily: mono,
                fontSize: 13,
                color: colors.blue,
                fontWeight: 700,
              }}
            >
              {data.header.change}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginTop: 2 }}>
          <span
            data-eid="expiry-label"
            style={{
              fontFamily: mono,
              fontSize: 12,
              color: colors.mut,
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${colors.border2}`,
              padding: "4px 10px",
              borderRadius: 8,
            }}
          >
            {data.header.expiry}
          </span>
        </div>
      </header>

      <div style={{ height: 10 }} />

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0 12px 0" }} />

      {/* Underlying info bar */}
      <div
        data-eid="underlying-info"
        style={{
          ...cardStyle,
          padding: "8px 12px",
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        <span data-eid="iv-rank" style={{ ...tinyValue }}>
          <span style={{ color: colors.accent, fontWeight: 800 }}>IV Rank: </span>
          <span style={{ color: colors.accent, fontWeight: 800 }}>{data.underlying.ivRank}</span>
        </span>
        <span data-eid="iv-percentile" style={{ ...tinyValue }}>
          <span style={{ color: colors.purple, fontWeight: 800 }}>IV %ile: </span>
          <span style={{ color: colors.purple, fontWeight: 800 }}>{data.underlying.ivPercentile}</span>
        </span>
        <span data-eid="hv-30" style={{ ...tinyValue }}>
          <span style={{ color: colors.mut, fontWeight: 800 }}>HV30: </span>
          <span style={{ color: colors.mut, fontWeight: 800 }}>{data.underlying.hv30}</span>
        </span>
      </div>

      <div style={{ height: 12 }} />

      {/* OPTIONS CHAIN */}
      <div data-eid="options-chain-section" style={{ ...cardStyle }}>
        <h2 data-eid="chain-title" style={sectionTitleStyle}>
          <span style={{ color: colors.accent }}>⎍</span> OPTIONS CHAIN
        </h2>

        <div
          data-eid="chain-header-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 56px 1fr",
            gap: 10,
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span data-eid="calls-label" style={{ ...tinyLabel }}>
            CALLS ( BID / ASK / VOL / OI / IV)
          </span>
          <span data-eid="strike-label" style={{ ...tinyLabel, textAlign: "center" }}>
            STRIKE
          </span>
          <span data-eid="puts-label" style={{ ...tinyLabel, textAlign: "right" }}>
            PUTS ( BID / ASK / VOL / OI / IV)
          </span>
        </div>

        {chain.map((r, idx) => {
          const rowEid = `call-row-${idx}` as const;
          const highlight = !!r.highlight;
          return (
            <div
              key={idx}
              data-eid={rowEid}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 56px 1fr",
                gap: 10,
                alignItems: "center",
                padding: "7px 8px",
                borderRadius: 8,
                border: highlight ? `1px solid rgba(249,115,22,0.65)` : `1px solid rgba(255,255,255,0)`,
                background: highlight ? "rgba(249,115,22,0.08)" : "transparent",
              }}
            >
              {/* Calls */}
              <div style={{ display: "grid", gridTemplateColumns: "46px 46px 52px 52px 50px", columnGap: 8 }}>
                <span data-eid={`call-${idx}-bid`} style={{ ...tinyValue, color: colors.blue, textAlign: "right" }}>
                  {r.call.bid}
                </span>
                <span data-eid={`call-${idx}-ask`} style={{ ...tinyValue, textAlign: "right" }}>
                  {r.call.ask}
                </span>
                <span data-eid={`call-${idx}-vol`} style={{ ...tinyValue, color: colors.mut, textAlign: "right" }}>
                  {r.call.vol}
                </span>
                <span data-eid={`call-${idx}-oi`} style={{ ...tinyValue, color: colors.mut, textAlign: "right" }}>
                  {r.call.oi}
                </span>
                <span data-eid={`call-${idx}-iv`} style={{ ...tinyValue, color: colors.accent, textAlign: "right" }}>
                  {r.call.iv}
                </span>
              </div>

              {/* Strike */}
              <span
                data-eid={`strike-${idx}`}
                style={{
                  ...tinyValue,
                  textAlign: "center",
                  fontWeight: 800,
                  color: highlight ? colors.accent : colors.text,
                }}
              >
                {r.strike}
              </span>

              {/* Puts */}
              <div style={{ display: "grid", gridTemplateColumns: "46px 46px 52px 52px 50px", columnGap: 8 }}>
                <span data-eid={`put-${idx}-bid`} style={{ ...tinyValue, color: colors.red, textAlign: "left" }}>
                  {r.put.bid}
                </span>
                <span data-eid={`put-${idx}-ask`} style={{ ...tinyValue, textAlign: "left" }}>
                  {r.put.ask}
                </span>
                <span data-eid={`put-${idx}-vol`} style={{ ...tinyValue, color: colors.mut, textAlign: "left" }}>
                  {r.put.vol}
                </span>
                <span data-eid={`put-${idx}-oi`} style={{ ...tinyValue, color: colors.mut, textAlign: "left" }}>
                  {r.put.oi}
                </span>
                <span data-eid={`put-${idx}-iv`} style={{ ...tinyValue, color: colors.accent, textAlign: "left" }}>
                  {r.put.iv}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: 12 }} />

      {/* PAYOFF */}
      <div data-eid="payoff-section" style={{ ...cardStyle }}>
        <h2 data-eid="payoff-title" style={sectionTitleStyle}>
          <span style={{ color: colors.accent }}>⟂</span> P/L PAYOFF DIAGRAM
        </h2>

        <div
          data-eid="payoff-chart"
          style={{
            height: 210,
            borderRadius: 10,
            background: "rgba(255,255,255,0.02)",
            border: `1px solid rgba(255,255,255,0.06)`,
            padding: 8,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payoffData} margin={{ top: 10, right: 12, left: 10, bottom: 18 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="2 6" />
              <XAxis
                dataKey="price"
                tick={{ fill: "rgba(255,255,255,0.50)", fontSize: 10, fontFamily: mono }}
                axisLine={{ stroke: "rgba(255,255,255,0.10)" }}
                tickLine={false}
                label={{
                  value: "Stock Price",
                  position: "insideBottom",
                  offset: -8,
                  fill: "rgba(255,255,255,0.45)",
                  fontSize: 10,
                  fontFamily: mono,
                }}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.50)", fontSize: 10, fontFamily: mono }}
                axisLine={false}
                tickLine={false}
                width={44}
                tickFormatter={(v) => `$${v}`}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.25)" strokeDasharray="4 6" />
              <Tooltip
                contentStyle={{
                  background: "rgba(20,20,20,0.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  color: "rgba(255,255,255,0.92)",
                  fontFamily: mono,
                  fontSize: 11,
                }}
                labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                formatter={(value: any) => [`$${value}`, "P/L"]}
                labelFormatter={(label: any) => `Price: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="pl"
                stroke={colors.accent}
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: colors.accent, stroke: "rgba(0,0,0,0.25)", strokeWidth: 1 }}
                activeDot={{ r: 5, fill: colors.accent }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: 8 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span data-eid="payoff-strategy-label" style={{ fontFamily: mono, fontSize: 12, color: colors.accent }}>
            {data.payoff.strategy}
          </span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span data-eid="payoff-max-profit" style={{ fontFamily: mono, fontSize: 12, color: colors.blue }}>
              Max Profit: {data.payoff.maxProfit}
            </span>
            <span data-eid="payoff-max-loss" style={{ fontFamily: mono, fontSize: 12, color: colors.red }}>
              Max Loss: {data.payoff.maxLoss}
            </span>
            <span data-eid="payoff-breakeven" style={{ fontFamily: mono, fontSize: 12, color: colors.accent }}>
              BE: {data.payoff.breakeven}
            </span>
          </div>
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* GREEKS */}
      <div data-eid="greeks-section" style={{ ...cardStyle }}>
        <h2 data-eid="greeks-title" style={sectionTitleStyle}>
          <span style={{ color: colors.accent }}>∿</span> PORTFOLIO GREEKS
        </h2>

        <div
          data-eid="greeks-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 10,
          }}
        >
          {[
            {
              eid: "greek-delta",
              labelEid: "greek-delta-label",
              valueEid: "greek-delta-value",
              label: "DELTA",
              value: data.greeks.delta,
              color: colors.blue,
            },
            {
              eid: "greek-gamma",
              labelEid: "greek-gamma-label",
              valueEid: "greek-gamma-value",
              label: "GAMMA",
              value: data.greeks.gamma,
              color: colors.purple,
            },
            {
              eid: "greek-theta",
              labelEid: "greek-theta-label",
              valueEid: "greek-theta-value",
              label: "THETA",
              value: data.greeks.theta,
              color: colors.red,
            },
            {
              eid: "greek-vega",
              labelEid: "greek-vega-label",
              valueEid: "greek-vega-value",
              label: "VEGA",
              value: data.greeks.vega,
              color: colors.accent,
            },
            {
              eid: "greek-rho",
              labelEid: "greek-rho-label",
              valueEid: "greek-rho-value",
              label: "RHO",
              value: data.greeks.rho,
              color: colors.accent,
            },
          ].map((g) => (
            <div
              key={g.eid}
              data-eid={g.eid}
              style={{
                borderRadius: 10,
                border: `1px solid rgba(255,255,255,0.10)`,
                background: "rgba(255,255,255,0.02)",
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <span data-eid={g.labelEid} style={{ fontFamily: mono, fontSize: 10, color: colors.mut2 }}>
                {g.label}
              </span>
              <div style={{ height: 6 }} />
              <span data-eid={g.valueEid} style={{ fontFamily: mono, fontSize: 18, fontWeight: 800, color: g.color }}>
                {g.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* RISK */}
      <div data-eid="risk-section" style={{ ...cardStyle }}>
        <h2 data-eid="risk-title" style={sectionTitleStyle}>
          RISK METRICS
        </h2>

        <div data-eid="risk-pop" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6, rowGap: 6 }}>
          <span data-eid="risk-pop-label" style={{ fontFamily: mono, fontSize: 12, color: colors.mut }}>
            Probability of Profit
          </span>
          <span data-eid="risk-pop-value" style={{ fontFamily: mono, fontSize: 12, color: colors.blue, fontWeight: 800 }}>
            {data.risk.pop}
          </span>
          <div
            data-eid="risk-pop-bar"
            style={{
              gridColumn: "1 / -1",
              height: 6,
              borderRadius: 99,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: `${Number(String(data.risk.pop).replace("%", ""))}%`,
                height: "100%",
                background: colors.blue,
              }}
            />
          </div>
        </div>

        <div style={{ height: 10 }} />

        <div data-eid="risk-expected" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span data-eid="risk-expected-label" style={{ fontFamily: mono, fontSize: 12, color: colors.mut }}>
            Expected Value
          </span>
          <span data-eid="risk-expected-value" style={{ fontFamily: mono, fontSize: 12, color: colors.blue, fontWeight: 800 }}>
            {data.risk.expectedValue}
          </span>
        </div>

        <div style={{ height: 10 }} />

        <div data-eid="risk-ratio" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span data-eid="risk-ratio-label" style={{ fontFamily: mono, fontSize: 12, color: colors.mut }}>
            Risk/Reward Ratio
          </span>
          <span data-eid="risk-ratio-value" style={{ fontFamily: mono, fontSize: 12, color: colors.accent, fontWeight: 800 }}>
            {data.risk.riskReward}
          </span>
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* VOL SURFACE */}
      <div data-eid="volsurface-section" style={{ ...cardStyle }}>
        <h2 data-eid="volsurface-title" style={sectionTitleStyle}>
          <span style={{ color: colors.accent }}>▦</span> IMPLIED VOLATILITY SURFACE
        </h2>

        <div
          data-eid="volsurface-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `42px repeat(${vol.columns.length}, 1fr)`,
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* header */}
          <div style={{ fontFamily: mono, fontSize: 10, color: colors.mut2, textAlign: "center" }}>DTE</div>
          {vol.columns.map((c: string, i: number) => (
            <div key={i} style={{ fontFamily: mono, fontSize: 10, color: colors.mut2, textAlign: "center" }}>
              {c}
            </div>
          ))}

          {vol.rows.map((r: any, ri: number) => {
            const rowEid = `volsurface-row-${ri}` as const;
            return (
              <div
                key={ri}
                data-eid={rowEid}
                style={{
                  gridColumn: "1 / -1",
                  display: "grid",
                  gridTemplateColumns: `42px repeat(${vol.columns.length}, 1fr)`,
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <div style={{ fontFamily: mono, fontSize: 10, color: colors.mut, textAlign: "right", paddingRight: 4 }}>
                  {r.dte}
                </div>
                {r.values.map((vv: any, ci: number) => {
                  const vnum = Number(vv);
                  const bg = volColor(vnum, volMin, volMax);
                  return (
                    <div
                      key={ci}
                      style={{
                        height: 22,
                        borderRadius: 4,
                        background: bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: mono,
                        fontSize: 10,
                        color: "rgba(0,0,0,0.80)",
                        fontWeight: 800,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
                      }}
                    >
                      {vnum.toFixed(1)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div style={{ height: 8 }} />

        <div
          data-eid="volsurface-legend"
          style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}
        >
          {[
            { c: "#2f6fff", t: "Low" },
            { c: "#2bb3ff", t: "Med" },
            { c: "#f59e0b", t: "High" },
            { c: "#ef4444", t: "Very High" },
          ].map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: x.c, border: "1px solid rgba(0,0,0,0.2)" }} />
              <div style={{ fontFamily: mono, fontSize: 10, color: colors.mut }}>{x.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* FOOTER */}
      <footer data-eid="footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span data-eid="footer-timestamp" style={{ fontFamily: mono, fontSize: 10, color: colors.mut2 }}>
          {data.footer.lastUpdated}
        </span>
        <span data-eid="footer-source" style={{ fontFamily: mono, fontSize: 10, color: colors.mut2 }}>
          {data.footer.source}
        </span>
      </footer>
    </section>
  );
}