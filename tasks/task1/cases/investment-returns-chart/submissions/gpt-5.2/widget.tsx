// submissions/gpt-widget/widget.tsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import data from "./data.json";

const COLORS = {
  portfolio: "#7B86FF",
  sp500: "#35E07A",
  bonds: "#F4B000",
  text: "#E8EAF3",
  muted: "rgba(232,234,243,0.6)",
  grid: "rgba(255,255,255,0.08)",
  card: "rgba(255,255,255,0.06)",
  card2: "rgba(255,255,255,0.04)",
};

function formatYAxis(v: number) {
  return `${v}`;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const p = payload.reduce((acc: any, item: any) => {
    acc[item.dataKey] = item.value;
    return acc;
  }, {});
  return (
    <div
      style={{
        background: "rgba(10,12,20,0.92)",
        border: "1px solid rgba(255,255,255,0.10)",
        padding: "10px 10px",
        borderRadius: 10,
        color: COLORS.text,
        fontSize: 12,
        minWidth: 160,
        boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ color: "rgba(232,234,243,0.85)", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 3,
              borderRadius: 999,
              background: COLORS.portfolio,
              display: "inline-block",
            }}
          />
          <span style={{ color: "rgba(232,234,243,0.8)" }}>Portfolio</span>
        </div>
        <div style={{ color: COLORS.text }}>{p.portfolio}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 3,
              borderRadius: 999,
              background: COLORS.sp500,
              display: "inline-block",
            }}
          />
          <span style={{ color: "rgba(232,234,243,0.8)" }}>S&amp;P 500</span>
        </div>
        <div style={{ color: COLORS.text }}>{p.sp500}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 3,
              borderRadius: 999,
              background: COLORS.bonds,
              display: "inline-block",
            }}
          />
          <span style={{ color: "rgba(232,234,243,0.8)" }}>Bonds</span>
        </div>
        <div style={{ color: COLORS.text }}>{p.bonds}</div>
      </div>
    </div>
  );
}

export default function Widget() {
  const chartData = (data as any).chart;
  const summary = (data as any).summary;

  const yDomain = useMemo(() => {
    // Match visible axis range in target
    return [96, 128] as [number, number];
  }, []);

  return (
    <section
      data-eid="root"
      style={{
        width: 460,
        height: 680,
        borderRadius: 22,
        padding: 22,
        boxSizing: "border-box",
        color: COLORS.text,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        background:
          "radial-gradient(120% 120% at 15% 10%, rgba(24,28,55,0.75) 0%, rgba(12,13,24,1) 55%, rgba(10,11,20,1) 100%)",
        boxShadow: "0 18px 55px rgba(0,0,0,0.55) inset",
        overflow: "hidden",
      }}
    >
      <div
        data-eid="header"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 0.2,
          }}
        >
          <TrendingUp size={18} color={COLORS.portfolio} />
          <div data-eid="portfolio-name">Growth Portfolio Alpha</div>
        </div>
        <div
          data-eid="date-range"
          style={{
            color: "rgba(232,234,243,0.55)",
            fontSize: 12.5,
          }}
        >
          Jan 2024 - Dec 2024
        </div>
      </div>

      <div
        data-eid="chart-section"
        style={{
          marginTop: 6,
          paddingTop: 6,
        }}
      >
        <div
          data-eid="line-chart"
          style={{
            height: 255,
            width: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 14, left: 8, bottom: 18 }}
            >
              <CartesianGrid
                stroke={COLORS.grid}
                strokeDasharray="3 6"
                vertical={true}
              />
              <XAxis
                dataKey="month"
                tick={{
                  fill: "rgba(232,234,243,0.55)",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                domain={yDomain}
                ticks={[96, 104, 112, 120, 128]}
                tickFormatter={formatYAxis}
                tick={{
                  fill: "rgba(232,234,243,0.45)",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
                width={34}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "rgba(255,255,255,0.08)" }}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke={COLORS.portfolio}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: COLORS.portfolio }}
              />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke={COLORS.sp500}
                strokeWidth={2.2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: COLORS.sp500 }}
              />
              <Line
                type="monotone"
                dataKey="bonds"
                stroke={COLORS.bonds}
                strokeWidth={2.0}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: COLORS.bonds }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          data-eid="legend"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginTop: 10,
            color: "rgba(232,234,243,0.75)",
            fontSize: 12.5,
          }}
        >
          <span
            data-eid="legend-portfolio"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                width: 12,
                height: 3,
                borderRadius: 999,
                background: COLORS.portfolio,
                display: "inline-block",
              }}
            />
            Portfolio
          </span>
          <span
            data-eid="legend-sp500"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                width: 12,
                height: 3,
                borderRadius: 999,
                background: COLORS.sp500,
                display: "inline-block",
              }}
            />
            S&amp;P 500
          </span>
          <span
            data-eid="legend-bonds"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                width: 12,
                height: 3,
                borderRadius: 999,
                background: COLORS.bonds,
                display: "inline-block",
              }}
            />
            Bonds
          </span>
        </div>
      </div>

      <div
        data-eid="summary-section"
        style={{
          marginTop: 22,
        }}
      >
        <div
          data-eid="summary-title"
          style={{
            color: "rgba(232,234,243,0.5)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: 1.4,
            marginBottom: 10,
          }}
        >
          PERFORMANCE SUMMARY
        </div>

        {summary.map((m: any, idx: number) => {
          const valueColor =
            m.tone === "pos"
              ? "#33F08A"
              : m.tone === "neg"
                ? "#FF5D6C"
                : COLORS.text;

          const rowEid = `metric-row-${idx}`;
          const labelEid = `metric-label-${idx}`;
          const valueEid = `metric-value-${idx}`;

          return (
            <div
              key={m.label}
              data-eid={rowEid}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: 12,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset",
                marginBottom: 10,
              }}
            >
              <span
                data-eid={labelEid}
                style={{
                  color: "rgba(232,234,243,0.58)",
                  fontSize: 13,
                }}
              >
                {m.label}
              </span>
              <span
                data-eid={valueEid}
                style={{
                  color: valueColor,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {m.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}