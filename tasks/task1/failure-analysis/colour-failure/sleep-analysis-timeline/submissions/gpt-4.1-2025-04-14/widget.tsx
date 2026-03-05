import React from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Moon, Sun } from "lucide-react";
import data from "./data.json";

const legendColors = {
  Awake: "#E85775",
  Rem: "#AD89E6",
  Light: "#54BFFF",
  Deep: "#2751B8",
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 420,
        background: "#161f32",
        borderRadius: 32,
        padding: 28,
        fontFamily: "Inter, sans-serif",
        color: "white",
        boxShadow: "0 2px 16px #0002",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="header-icon" style={{ color: "#AD89E6" }}>
            <Moon size={20} fill="#AD89E6" strokeWidth={1.5} />
          </span>
          <span
            data-eid="header-title"
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Sleep Analysis
          </span>
        </div>
        <span
          data-eid="header-date"
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#a6aac9",
          }}
        >
          Feb 23 - Feb 24
        </span>
      </div>

      {/* Score */}
      <div
        data-eid="score-section"
        style={{
          marginBottom: 22,
          marginTop: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 11 }}>
          <div
            data-eid="score-value"
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
              color: "#AD89E6",
            }}
          >
            82
          </div>
          <span
            data-eid="score-max"
            style={{
              color: "#7f839c",
              fontSize: 22,
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            /100
          </span>
          <div
            data-eid="score-label"
            style={{
              color: "#7f839c",
              fontSize: 15,
              fontWeight: 400,
              marginLeft: 10,
              alignSelf: "center",
            }}
          >
            Sleep Score
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div
        data-eid="timeline-section"
        style={{
          margin: "20px 0 5px 0",
        }}
      >
        <div
          data-eid="timeline-chart"
          style={{
            width: "100%",
            height: 92,
            background: "transparent",
            marginBottom: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.timeline}
              margin={{ left: 0, right: 0, top: 6, bottom: 0 }}
              barCategoryGap={2}
            >
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#a6aac9",
                  fontWeight: 500,
                  fontSize: 13,
                  dy: 10,
                }}
                interval={2}
                padding={{ left: 8, right: 8 }}
                height={30}
              />
              <Bar
                dataKey="stage"
                radius={[7, 7, 7, 7]}
                isAnimationActive={false}
                barSize={22}
                shape={({ x, y, width, height, payload }) => (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx={7}
                    fill={
                      legendColors[
                        (payload.stage as keyof typeof legendColors) ?? "Light"
                      ]
                    }
                  />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div
          data-eid="timeline-legend"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 22,
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 8,
            marginTop: 1,
          }}
        >
          <span data-eid="legend-awake" style={{ display: "flex", alignItems: "center", gap: 6, color: legendColors.Awake }}>
            <span style={{ width: 10, height: 5, borderRadius: 2, background: legendColors.Awake, display: "inline-block" }} />
            Awake (42m)
          </span>
          <span data-eid="legend-rem" style={{ display: "flex", alignItems: "center", gap: 6, color: legendColors.Rem }}>
            <span style={{ width: 10, height: 5, borderRadius: 2, background: legendColors.Rem, display: "inline-block" }} />
            Rem (1h 38m)
          </span>
          <span data-eid="legend-light" style={{ display: "flex", alignItems: "center", gap: 6, color: legendColors.Light }}>
            <span style={{ width: 10, height: 5, borderRadius: 2, background: legendColors.Light, display: "inline-block" }} />
            Light (3h 27m)
          </span>
          <span data-eid="legend-deep" style={{ display: "flex", alignItems: "center", gap: 6, color: legendColors.Deep }}>
            <span style={{ width: 10, height: 5, borderRadius: 2, background: legendColors.Deep, display: "inline-block" }} />
            Deep (1h 36m)
          </span>
        </div>
      </div>

      {/* Bedtime/Wake time Row */}
      <div
        data-eid="times-row"
        style={{
          display: "flex",
          gap: 13,
          marginTop: 13,
          marginBottom: 15,
        }}
      >
        <div
          data-eid="bedtime-label"
          style={{
            flex: 1,
            background: "#262854",
            padding: "9px 0 5px 16px",
            borderRadius: 16,
            height: 62,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ color: "#a6aac9", fontWeight: 600, fontSize: 14, letterSpacing: 0.5, marginBottom: 5 }}>
            BEDTIME
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ color: "#AD89E6", opacity: 0.98, marginRight: 1 }}>
              <Moon size={18} fill="#AD89E6" stroke="#AD89E6" strokeWidth={1.5} />
            </span>
            <div
              data-eid="bedtime-value"
              style={{
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 0,
                color: "#fff",
              }}
            >
              10:47 PM
            </div>
          </div>
        </div>
        <div
          data-eid="waketime-label"
          style={{
            flex: 1,
            background: "#252725",
            padding: "9px 0 5px 17px",
            borderRadius: 16,
            height: 62,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ color: "#a6aac9", fontWeight: 600, fontSize: 14, letterSpacing: 0.5, marginBottom: 5 }}>
            WAKE TIME
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ color: "#ffe583", marginTop: 1 }}>
              <Sun size={18} fill="#ffe583" stroke="#ffe583" strokeWidth={1.5} />
            </span>
            <div
              data-eid="waketime-value"
              style={{
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 0,
                color: "#fff",
              }}
            >
              6:52 AM
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        data-eid="stats-grid"
        style={{
          display: "flex",
          gap: 11,
          marginTop: 2,
        }}
      >
        <div
          data-eid="stat-total-sleep"
          style={{
            background: "#212651",
            borderRadius: 14,
            padding: "16px 0 11px 0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            data-eid="stat-total-sleep-value"
            style={{
              fontWeight: 700,
              fontSize: 23,
              color: "#42ade6", // blue
              marginBottom: 2,
              letterSpacing: 0,
            }}
          >
            7h 23m
          </div>
          <div
            data-eid="stat-total-sleep-label"
            style={{
              color: "#a6aac9",
              fontSize: 15,
              fontWeight: 500,
              marginTop: 1,
            }}
          >
            Total Sleep
          </div>
        </div>
        <div
          data-eid="stat-time-in-bed"
          style={{
            background: "#201f3b",
            borderRadius: 14,
            padding: "16px 0 11px 0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            data-eid="stat-time-in-bed-value"
            style={{
              fontWeight: 700,
              fontSize: 23,
              color: "#9c78e6",
              marginBottom: 2,
              letterSpacing: 0,
            }}
          >
            8h 05m
          </div>
          <div
            data-eid="stat-time-in-bed-label"
            style={{
              color: "#a6aac9",
              fontSize: 15,
              fontWeight: 500,
              marginTop: 1,
            }}
          >
            Time in Bed
          </div>
        </div>
        <div
          data-eid="stat-efficiency"
          style={{
            background: "#1f2d24",
            borderRadius: 14,
            padding: "16px 0 11px 0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            data-eid="stat-efficiency-value"
            style={{
              fontWeight: 700,
              fontSize: 23,
              color: "#22e684",
              marginBottom: 2,
              letterSpacing: 0,
            }}
          >
            91%
          </div>
          <div
            data-eid="stat-efficiency-label"
            style={{
              color: "#a6aac9",
              fontSize: 15,
              fontWeight: 500,
              marginTop: 1,
            }}
          >
            Efficiency
          </div>
        </div>
      </div>
    </section>
  );
}