// submissions/<your-model-name>/widget.tsx
import React from "react";
import data from "./data.json";
import { RadialBarChart, RadialBar } from "recharts";
import { Activity } from "lucide-react";

export default function Widget() {
  const W = 420;
  const ringBox = 250;

  // Progress values
  const movePct = Math.min(1, data.stats.move.current / data.stats.move.goal);
  const exercisePct = Math.min(1, data.stats.exercise.current / data.stats.exercise.goal);
  const standPct = Math.min(1, data.stats.stand.current / data.stats.stand.goal);

  const track = "#2b2d31";
  const colors = {
    move: "#ff3b30",
    exercise: "#34c759",
    stand: "#0a84ff",
  };

  const ringData = [
    { name: "move", value: movePct * 100, fill: colors.move },
    { name: "exercise", value: exercisePct * 100, fill: colors.exercise },
    { name: "stand", value: standPct * 100, fill: colors.stand },
  ];

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 12,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
  };

  const smallLabel: React.CSSProperties = {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    lineHeight: "14px",
    marginTop: 6,
  };

  return (
    <section
      data-eid="root"
      style={{
        width: W,
        borderRadius: 28,
        padding: 18,
        background:
          "radial-gradient(120% 120% at 50% 10%, #2b2d31 0%, #15171a 45%, #0f1012 100%)",
        color: "white",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
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
          padding: "4px 2px 10px 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="header-icon" style={{ display: "inline-flex", alignItems: "center" }}>
            <Activity size={18} color={colors.move} strokeWidth={2.4} />
          </span>
          <span
            data-eid="header-title"
            style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}
          >
            {data.header.title}
          </span>
        </div>
        <span
          data-eid="header-date"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
        >
          {data.header.date}
        </span>
      </div>

      {/* Rings */}
      <div
        data-eid="rings-container"
        style={{
          position: "relative",
          height: ringBox,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 8,
        }}
      >
        <div data-eid="rings-chart" style={{ width: ringBox, height: ringBox }}>
          <RadialBarChart
            width={ringBox}
            height={ringBox}
            cx="50%"
            cy="50%"
            innerRadius="22%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            data={ringData}
          >
            {/* Tracks */}
            <RadialBar
              dataKey="value"
              data={[{ value: 100 }]}
              cornerRadius={999}
              background={false}
              clockWise
              fill={track}
              stroke={track}
              strokeWidth={0}
              innerRadius="76%"
              outerRadius="88%"
              isAnimationActive={false}
            />
            <RadialBar
              dataKey="value"
              data={[{ value: 100 }]}
              cornerRadius={999}
              background={false}
              clockWise
              fill={track}
              stroke={track}
              strokeWidth={0}
              innerRadius="62%"
              outerRadius="74%"
              isAnimationActive={false}
            />
            <RadialBar
              dataKey="value"
              data={[{ value: 100 }]}
              cornerRadius={999}
              background={false}
              clockWise
              fill={track}
              stroke={track}
              strokeWidth={0}
              innerRadius="48%"
              outerRadius="60%"
              isAnimationActive={false}
            />

            {/* Progress rings */}
            <RadialBar
              dataKey="value"
              data={[ringData[0]]}
              cornerRadius={999}
              clockWise
              background={false}
              innerRadius="76%"
              outerRadius="88%"
              isAnimationActive={false}
            />
            <RadialBar
              dataKey="value"
              data={[ringData[1]]}
              cornerRadius={999}
              clockWise
              background={false}
              innerRadius="62%"
              outerRadius="74%"
              isAnimationActive={false}
            />
            <RadialBar
              dataKey="value"
              data={[ringData[2]]}
              cornerRadius={999}
              clockWise
              background={false}
              innerRadius="48%"
              outerRadius="60%"
              isAnimationActive={false}
            />
          </RadialBarChart>
        </div>

        <div
          data-eid="rings-center-label"
          style={{
            position: "absolute",
            textAlign: "center",
            transform: "translateY(-2px)",
          }}
        >
          <div
            data-eid="rings-center-value"
            style={{ fontSize: 30, fontWeight: 800, letterSpacing: 0.4 }}
          >
            {data.center.value}
          </div>
          <div
            data-eid="rings-center-unit"
            style={{
              marginTop: 2,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {data.center.unit}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        data-eid="stats-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginTop: 4,
          marginBottom: 14,
        }}
      >
        <div data-eid="stat-move" style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              data-eid="stat-move-icon"
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: colors.move,
                display: "inline-block",
              }}
            />
            <div data-eid="stat-move-label" style={smallLabel}>
              {data.stats.move.label}
            </div>
          </div>
          <div
            data-eid="stat-move-value"
            style={{
              marginTop: 6,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            {data.stats.move.current}/{data.stats.move.goal}{" "}
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
              {data.stats.move.unit}
            </span>
          </div>
        </div>

        <div data-eid="stat-exercise" style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              data-eid="stat-exercise-icon"
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: colors.exercise,
                display: "inline-block",
              }}
            />
            <div data-eid="stat-exercise-label" style={smallLabel}>
              {data.stats.exercise.label}
            </div>
          </div>
          <div
            data-eid="stat-exercise-value"
            style={{
              marginTop: 6,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            {data.stats.exercise.current}/{data.stats.exercise.goal}{" "}
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
              {data.stats.exercise.unit}
            </span>
          </div>
        </div>

        <div data-eid="stat-stand" style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              data-eid="stat-stand-icon"
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: colors.stand,
                display: "inline-block",
              }}
            />
            <div data-eid="stat-stand-label" style={smallLabel}>
              {data.stats.stand.label}
            </div>
          </div>
          <div
            data-eid="stat-stand-value"
            style={{
              marginTop: 6,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            {data.stats.stand.current}/{data.stats.stand.goal}{" "}
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
              {data.stats.stand.unit}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div data-eid="summary-section" style={{ marginTop: 2 }}>
        <div
          data-eid="summary-title"
          style={{
            fontSize: 12,
            letterSpacing: 1.2,
            fontWeight: 800,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 10,
            paddingLeft: 2,
          }}
        >
          {data.summary.title}
        </div>

        <div
          data-eid="summary-item-calories"
          style={{
            ...cardStyle,
            borderRadius: 14,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}>
            {data.summary.items[0].label}
          </div>
          <div style={{ color: colors.move, fontWeight: 800, fontSize: 14 }}>
            {data.summary.items[0].value}
          </div>
        </div>

        <div
          data-eid="summary-item-active"
          style={{
            ...cardStyle,
            borderRadius: 14,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}>
            {data.summary.items[1].label}
          </div>
          <div style={{ color: colors.exercise, fontWeight: 800, fontSize: 14 }}>
            {data.summary.items[1].value}
          </div>
        </div>

        <div
          data-eid="summary-item-stand"
          style={{
            ...cardStyle,
            borderRadius: 14,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}>
            {data.summary.items[2].label}
          </div>
          <div style={{ color: colors.stand, fontWeight: 800, fontSize: 14 }}>
            {data.summary.items[2].value}
          </div>
        </div>
      </div>
    </section>
  );
}