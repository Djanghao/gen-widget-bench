import React from "react";
import data from "./data.json";
import { RadialBarChart, RadialBar } from "recharts";

const MOVE_COLOR = "#FF3C3C";
const EXERCISE_COLOR = "#29FF5C";
const STAND_COLOR = "#2B6CFF";

const ringData = [
  {
    key: "move",
    value: data.move.current,
    fill: MOVE_COLOR,
    max: data.move.goal,
  },
  {
    key: "exercise",
    value: data.exercise.current,
    fill: EXERCISE_COLOR,
    max: data.exercise.goal,
  },
  {
    key: "stand",
    value: data.stand.current,
    fill: STAND_COLOR,
    max: data.stand.goal,
  },
];

// Radii for the 3 rings (outer to inner)
const ringRadii = [
  { inner: 85, outer: 100 },
  { inner: 68, outer: 82 },
  { inner: 50, outer: 65 },
];

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: "#161616",
        borderRadius: 28,
        padding: 24,
        width: 380,
        boxSizing: "border-box",
        fontFamily: "Inter, sans-serif",
        color: "#fff",
        margin: "auto",
        boxShadow: "0 2px 40px 0 rgba(30,36,54,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span data-eid="header-icon" style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
          {/* Heartbeat/Activity Icon - use polyline/svg */}
          <svg width="24" height="24" viewBox="0 0 22 22" style={{marginRight:4}}>
            <polyline
              points="2,15 7,11 10,16 14,5 17,12 20,9"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span
          data-eid="header-title"
          style={{ fontWeight: 600, fontSize: 20, letterSpacing: 0.2 }}
        >
          Activity
        </span>

        <span style={{ flex: 1 }}></span>
        <span
          data-eid="header-date"
          style={{
            color: "#B5B5B5",
            fontSize: 15,
            fontWeight: 400,
            letterSpacing: 0.1,
          }}
        >
          Mon, Feb 24
        </span>
      </div>

      {/* Rings */}
      <div
        data-eid="rings-container"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          data-eid="rings-chart"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 260,
            height: 260,
            position: "relative",
          }}
        >
          <RadialBarChart
            width={260}
            height={260}
            cx={130}
            cy={130}
            innerRadius={50}
            outerRadius={100}
            barSize={15}
            data={[{}]}
            style={{ zIndex: 1 }}
          >
            {ringData.map((d, i) => (
              <RadialBar
                key={d.key}
                background
                clockWise={true}
                data={[
                  { name: d.key, value: Math.max(0, Math.min(d.value, d.max)) },
                ]}
                dataKey="value"
                minAngle={5}
                cornerRadius={20}
                fill={d.fill}
                cx={130}
                cy={130}
                innerRadius={ringRadii[i].inner}
                outerRadius={ringRadii[i].outer}
                maxAngle={(d.value / d.max) * 360}
              />
            ))}
          </RadialBarChart>

          {/* Center label overlay */}
          <div
            data-eid="rings-center-label"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-54%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <div
              data-eid="rings-center-value"
              style={{
                fontSize: 48,
                fontWeight: 700,
                letterSpacing: 0.5,
                lineHeight: "54px",
              }}
            >
              {data.move.current}
            </div>
            <div
              data-eid="rings-center-unit"
              style={{
                color: "#AAAAAA",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: 2.2,
                marginTop: -2,
              }}
            >
              CAL
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div
        data-eid="stats-row"
        style={{
          display: "flex",
          width: "100%",
          gap: 16,
          justifyContent: "center",
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        {/* Move */}
        <div
          data-eid="stat-move"
          style={{
            flex: 1,
            background: "#222",
            borderRadius: 16,
            padding: "14px 13px 12px 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 98,
            minHeight: 58,
            boxSizing: "border-box",
          }}
        >
          <span data-eid="stat-move-icon" style={{ display: "inline-flex", alignItems: "center", marginBottom: 3 }}>
            <span
              style={{
                width: 8,
                height: 8,
                background: MOVE_COLOR,
                borderRadius: 999,
                marginRight: 8,
                display: "inline-block",
              }}
            />
            <span
              data-eid="stat-move-label"
              style={{
                color: "#B5B5B5",
                fontWeight: 400,
                fontSize: 13.5,
                letterSpacing: 0.04,
              }}
            >
              Move
            </span>
          </span>
          <div
            data-eid="stat-move-value"
            style={{
              fontSize: 17.5,
              fontWeight: 700,
              marginTop: 0,
              marginBottom: -1,
              lineHeight: "18px",
            }}
          >
            <span style={{ color: "#fff" }}>{data.move.current}</span>
            <span style={{ color: "#B5B5B5", fontWeight: 600 }}>/</span>
            <span style={{ color: "#B5B5B5", fontWeight: 600 }}>{data.move.goal}</span>
            <span style={{ color: "#B5B5B5", fontWeight: 500, fontSize: 13.5, marginLeft: 4 }}>CAL</span>
          </div>
        </div>
        {/* Exercise */}
        <div
          data-eid="stat-exercise"
          style={{
            flex: 1,
            background: "#222",
            borderRadius: 16,
            padding: "14px 13px 12px 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 98,
            minHeight: 58,
            boxSizing: "border-box",
          }}
        >
          <span data-eid="stat-exercise-icon" style={{ display: "inline-flex", alignItems: "center", marginBottom: 3 }}>
            <span
              style={{
                width: 8,
                height: 8,
                background: EXERCISE_COLOR,
                borderRadius: 999,
                marginRight: 8,
                display: "inline-block",
              }}
            />
            <span
              data-eid="stat-exercise-label"
              style={{
                color: "#B5B5B5",
                fontWeight: 400,
                fontSize: 13.5,
                letterSpacing: 0.04,
              }}
            >
              Exercise
            </span>
          </span>
          <div
            data-eid="stat-exercise-value"
            style={{
              fontSize: 17.5,
              fontWeight: 700,
              marginTop: 0,
              marginBottom: -1,
              lineHeight: "18px",
            }}
          >
            <span style={{ color: "#fff" }}>{data.exercise.current}</span>
            <span style={{ color: "#B5B5B5", fontWeight: 600 }}>/</span>
            <span style={{ color: "#B5B5B5", fontWeight: 600 }}>{data.exercise.goal}</span>
            <span style={{ color: "#B5B5B5", fontWeight: 500, fontSize: 13.5, marginLeft: 4 }}>
              MIN
            </span>
          </div>
        </div>
        {/* Stand */}
        <div
          data-eid="stat-stand"
          style={{
            flex: 1,
            background: "#222",
            borderRadius: 16,
            padding: "14px 13px 12px 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 98,
            minHeight: 58,
            boxSizing: "border-box",
          }}
        >
          <span data-eid="stat-stand-icon" style={{ display: "inline-flex", alignItems: "center", marginBottom: 3 }}>
            <span
              style={{
                width: 8,
                height: 8,
                background: STAND_COLOR,
                borderRadius: 999,
                marginRight: 8,
                display: "inline-block",
              }}
            />
            <span
              data-eid="stat-stand-label"
              style={{
                color: "#B5B5B5",
                fontWeight: 400,
                fontSize: 13.5,
                letterSpacing: 0.04,
              }}
            >
              Stand
            </span>
          </span>
          <div
            data-eid="stat-stand-value"
            style={{
              fontSize: 17.5,
              fontWeight: 700,
              marginTop: 0,
              marginBottom: -1,
              lineHeight: "18px",
            }}
          >
            <span style={{ color: "#fff" }}>{data.stand.current}</span>
            <span style={{ color: "#B5B5B5", fontWeight: 600 }}>/</span>
            <span style={{ color: "#B5B5B5", fontWeight: 600 }}>{data.stand.goal}</span>
            <span style={{ color: "#B5B5B5", fontWeight: 500, fontSize: 13.5, marginLeft: 4 }}>
              HRS
            </span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div
        data-eid="summary-section"
        style={{
          width: "100%",
          background: "transparent",
          borderRadius: 16,
          marginTop: 4,
        }}
      >
        <div
          data-eid="summary-title"
          style={{
            color: "#B5B5B5",
            fontSize: 15.5,
            fontWeight: 700,
            marginBottom: 14,
            letterSpacing: 0.25,
            textTransform: "uppercase",
          }}
        >
          TODAY'S SUMMARY
        </div>
        <div
          data-eid="summary-item-calories"
          style={{
            width: "100%",
            background: "#222",
            borderRadius: 10,
            padding: "11.5px 14px",
            color: "#B5B5B5",
            fontWeight: 500,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
            justifyContent: "space-between",
            letterSpacing: 0.08,
          }}
        >
          <span>Total Calories</span>
          <span style={{ color: MOVE_COLOR, fontWeight: 700 }}>
            {data.move.current}&nbsp;kcal
          </span>
        </div>
        <div
          data-eid="summary-item-active"
          style={{
            width: "100%",
            background: "#222",
            borderRadius: 10,
            padding: "11.5px 14px",
            color: "#B5B5B5",
            fontWeight: 500,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
            justifyContent: "space-between",
            letterSpacing: 0.08,
          }}
        >
          <span>Active Minutes</span>
          <span style={{ color: EXERCISE_COLOR, fontWeight: 700 }}>
            {data.exercise.current}&nbsp;min
          </span>
        </div>
        <div
          data-eid="summary-item-stand"
          style={{
            width: "100%",
            background: "#222",
            borderRadius: 10,
            padding: "11.5px 14px",
            color: "#B5B5B5",
            fontWeight: 500,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            letterSpacing: 0.08,
          }}
        >
          <span>Stand Hours</span>
          <span style={{ color: STAND_COLOR, fontWeight: 700 }}>
            {data.stand.current} <span style={{ color: "#B5B5B5", fontWeight: 500 }}>of {data.stand.goal} hrs</span>
          </span>
        </div>
      </div>
    </section>
  );
}