// submissions/<your-model-name>/widget.tsx
import React from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { Moon, Sun } from "lucide-react";
import data from "./data.json";

const COLORS: Record<string, string> = {
  Awake: "#ff6b6b",
  REM: "#a88bff",
  Light: "#66a9ff",
  Deep: "#2249c9",
};

export default function Widget() {
  const d: any = data;

  const W = 420;
  const H = 500;

  return (
    <section
      data-eid="root"
      style={{
        width: W,
        height: H,
        borderRadius: 26,
        background: "radial-gradient(120% 120% at 20% 15%, #1a2442 0%, #10192c 55%, #0c1323 100%)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        padding: 18,
        color: "#e8eefc",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 4px 10px 4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="header-icon" style={{ display: "inline-flex", alignItems: "center" }}>
            <Moon size={18} color="#a88bff" />
          </span>
          <span
            data-eid="header-title"
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 0.2,
            }}
          >
            {d.title}
          </span>
        </div>
        <span
          data-eid="header-date"
          style={{
            fontSize: 12,
            color: "rgba(232,238,252,0.55)",
            fontWeight: 500,
          }}
        >
          {d.date}
        </span>
      </div>

      {/* Score */}
      <div
        data-eid="score-section"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 10,
          paddingTop: 18,
          paddingBottom: 12,
        }}
      >
        <div
          data-eid="score-value"
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: "#a88bff",
            lineHeight: 1,
            letterSpacing: 0.4,
          }}
        >
          {d.score.value}
        </div>
        <span
          data-eid="score-max"
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "rgba(232,238,252,0.35)",
            marginLeft: -6,
          }}
        >
          {d.score.max}
        </span>
        <div
          data-eid="score-label"
          style={{
            fontSize: 13,
            color: "rgba(232,238,252,0.45)",
            marginLeft: 2,
            fontWeight: 500,
          }}
        >
          {d.score.label}
        </div>
      </div>

      {/* Timeline */}
      <div
        data-eid="timeline-section"
        style={{
          marginTop: 8,
          padding: "12px 6px 0px 6px",
        }}
      >
        <div
          data-eid="timeline-chart"
          style={{
            height: 120,
            width: "100%",
            borderRadius: 14,
            position: "relative",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={d.timeline} margin={{ top: 10, right: 8, left: 8, bottom: 18 }}>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(232,238,252,0.28)", fontSize: 10 }}
                interval={0}
              />
              <Bar dataKey="v" isAnimationActive={false} radius={[0, 0, 0, 0]}>
                {d.timeline.map((entry: any, idx: number) => (
                  <Cell key={idx} fill={COLORS[entry.stage] || "#66a9ff"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div
          data-eid="timeline-legend"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            data-eid="legend-awake"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(232,238,252,0.75)", fontSize: 11 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.Awake, display: "inline-block" }} />
            {d.legend.awake}
          </span>
          <span
            data-eid="legend-rem"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(232,238,252,0.75)", fontSize: 11 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.REM, display: "inline-block" }} />
            {d.legend.rem}
          </span>
          <span
            data-eid="legend-light"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(232,238,252,0.75)", fontSize: 11 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.Light, display: "inline-block" }} />
            {d.legend.light}
          </span>
          <span
            data-eid="legend-deep"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(232,238,252,0.75)", fontSize: 11 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.Deep, display: "inline-block" }} />
            {d.legend.deep}
          </span>
        </div>
      </div>

      {/* Times */}
      <div
        data-eid="times-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginTop: 16,
          padding: "0 4px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "14px 14px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            data-eid="bedtime-label"
            style={{
              fontSize: 11,
              letterSpacing: 0.6,
              color: "rgba(232,238,252,0.35)",
              fontWeight: 700,
            }}
          >
            {d.times.bedtime.label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <Moon size={14} color="#a88bff" />
            <div
              data-eid="bedtime-value"
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {d.times.bedtime.value}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "14px 14px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            data-eid="waketime-label"
            style={{
              fontSize: 11,
              letterSpacing: 0.6,
              color: "rgba(232,238,252,0.35)",
              fontWeight: 700,
            }}
          >
            {d.times.waketime.label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <Sun size={14} color="#ffd56a" />
            <div
              data-eid="waketime-value"
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {d.times.waketime.value}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        data-eid="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
          marginTop: 16,
          padding: "0 4px",
        }}
      >
        <div
          data-eid="stat-total-sleep"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 14,
            padding: "14px 10px",
            textAlign: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            data-eid="stat-total-sleep-value"
            style={{ color: "#66a9ff", fontWeight: 900, fontSize: 18, letterSpacing: 0.2 }}
          >
            {d.stats.totalSleep.value}
          </div>
          <div
            data-eid="stat-total-sleep-label"
            style={{ marginTop: 6, fontSize: 11, color: "rgba(232,238,252,0.38)", fontWeight: 600 }}
          >
            {d.stats.totalSleep.label}
          </div>
        </div>

        <div
          data-eid="stat-time-in-bed"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 14,
            padding: "14px 10px",
            textAlign: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            data-eid="stat-time-in-bed-value"
            style={{ color: "#a88bff", fontWeight: 900, fontSize: 18, letterSpacing: 0.2 }}
          >
            {d.stats.timeInBed.value}
          </div>
          <div
            data-eid="stat-time-in-bed-label"
            style={{ marginTop: 6, fontSize: 11, color: "rgba(232,238,252,0.38)", fontWeight: 600 }}
          >
            {d.stats.timeInBed.label}
          </div>
        </div>

        <div
          data-eid="stat-efficiency"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 14,
            padding: "14px 10px",
            textAlign: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div data-eid="stat-efficiency-value" style={{ color: "#2fe3a6", fontWeight: 900, fontSize: 18 }}>
            {d.stats.efficiency.value}
          </div>
          <div
            data-eid="stat-efficiency-label"
            style={{ marginTop: 6, fontSize: 11, color: "rgba(232,238,252,0.38)", fontWeight: 600 }}
          >
            {d.stats.efficiency.label}
          </div>
        </div>
      </div>
    </section>
  );
}