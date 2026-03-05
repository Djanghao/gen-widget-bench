// submissions/chatgpt/widget.tsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Activity } from "lucide-react";
import data from "./data.json";

const fmtTick = (v: number) => `${v}m`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.value;
  return (
    <div
      style={{
        background: "rgba(18,18,20,0.92)",
        border: "1px solid rgba(255,255,255,0.10)",
        padding: "8px 10px",
        borderRadius: 10,
        color: "rgba(255,255,255,0.92)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, sans-serif',
        fontSize: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ opacity: 0.8, marginBottom: 2 }}>{label}m</div>
      <div style={{ fontWeight: 700 }}>{p} bpm</div>
    </div>
  );
};

export default function Widget() {
  const W = 420;
  const H = 650;

  const chartData = data.heartRateSeries.map((d: any) => ({
    t: d.min,
    hr: d.hr,
    label: d.min,
  }));

  const zoneRow = (
    eidRow:
      | "zone-rest"
      | "zone-fat-burn"
      | "zone-cardio"
      | "zone-peak"
      | "zone-max",
    eidBar:
      | "zone-rest-bar"
      | "zone-fat-burn-bar"
      | "zone-cardio-bar"
      | "zone-peak-bar"
      | "zone-max-bar",
    eidTime:
      | "zone-rest-time"
      | "zone-fat-burn-time"
      | "zone-cardio-time"
      | "zone-peak-time"
      | "zone-max-time",
    z: any
  ) => {
    const pct = Math.max(0, Math.min(100, z.percent));
    const nameColor = z.nameColor;
    const barColor = z.barColor;

    return (
      <div
        data-eid={eidRow}
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12,
          padding: "10px 12px",
          display: "grid",
          gridTemplateColumns: "64px 62px 1fr 44px",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: nameColor,
            letterSpacing: 0.2,
          }}
        >
          {z.name}
        </div>
        <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.33)" }}>
          {z.range}
        </div>
        <div
          data-eid={eidBar}
          style={{
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.07)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              borderRadius: 999,
              background: barColor,
              boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset`,
            }}
          />
        </div>
        <span
          data-eid={eidTime}
          style={{
            justifySelf: "end",
            fontSize: 12,
            color: "rgba(255,255,255,0.92)",
            fontWeight: 700,
          }}
        >
          {z.time}
        </span>
      </div>
    );
  };

  return (
    <section
      data-eid="root"
      style={{
        width: W,
        height: H,
        borderRadius: 26,
        overflow: "hidden",
        position: "relative",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, sans-serif',
        background:
          "radial-gradient(120% 90% at 10% 0%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 55%), radial-gradient(90% 70% at 85% 0%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #17181b 0%, #101114 55%, #0e0f12 100%)",
        boxShadow:
          "0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      {/* subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 80% at 50% 10%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Header */}
        <div
          data-eid="header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gridTemplateRows: "auto auto",
            rowGap: 6,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              gridColumn: "1 / 2",
              gridRow: "1 / 2",
            }}
          >
            <span data-eid="header-icon" style={{ display: "inline-flex" }}>
              <Activity size={18} color="#27d77a" strokeWidth={2.2} />
            </span>
            <span
              data-eid="header-workout-type"
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
            >
              {data.header.workoutType}
            </span>
          </div>

          <span
            data-eid="header-date"
            style={{
              gridColumn: "2 / 3",
              gridRow: "1 / 2",
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              fontWeight: 500,
              alignSelf: "center",
              paddingTop: 2,
            }}
          >
            {data.header.date}
          </span>

          <div
            style={{
              gridColumn: "1 / 2",
              gridRow: "2 / 3",
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.18)",
                boxSizing: "border-box",
                position: "relative",
                top: 1,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 2,
                  height: 5,
                  background: "rgba(255,255,255,0.35)",
                  left: "50%",
                  top: 2,
                  transform: "translateX(-50%)",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 2,
                  height: 5,
                  background: "rgba(255,255,255,0.35)",
                  left: "50%",
                  top: 5,
                  transform: "translateX(-50%) rotate(55deg)",
                  transformOrigin: "bottom center",
                  borderRadius: 2,
                }}
              />
            </div>

            <div
              data-eid="header-duration"
              style={{
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: 0.2,
                lineHeight: 1,
              }}
            >
              {data.header.duration}
            </div>
          </div>
        </div>

        {/* HR chart */}
        <div
          data-eid="hr-chart-section"
          style={{
            padding: "6px 0 0 0",
          }}
        >
          <div
            data-eid="hr-chart-title"
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.38)",
              fontWeight: 800,
              letterSpacing: 1.1,
              marginBottom: 10,
            }}
          >
            {data.chart.title}
          </div>

          <div
            data-eid="hr-chart"
            style={{
              height: 170,
              borderRadius: 18,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 18,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,170,0,0.06) 55%, rgba(0,255,140,0.05) 100%)",
                pointerEvents: "none",
              }}
            />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 12, bottom: 12, left: 0 }}
              >
                <defs>
                  <linearGradient id="hrFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff3b3b" stopOpacity={0.25} />
                    <stop offset="55%" stopColor="#ffb000" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#1fe37a" stopOpacity={0.08} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="t"
                  tickFormatter={fmtTick}
                  tick={{
                    fill: "rgba(255,255,255,0.30)",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  minTickGap={18}
                />
                <YAxis
                  domain={[60, 190]}
                  ticks={[60, 95, 130, 165, 190]}
                  tick={{
                    fill: "rgba(255,255,255,0.26)",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />

                <ReferenceLine
                  y={130}
                  stroke="rgba(51, 255, 153, 0.35)"
                  strokeDasharray="3 4"
                />
                <ReferenceLine
                  y={155}
                  stroke="rgba(255, 187, 0, 0.30)"
                  strokeDasharray="3 4"
                />
                <ReferenceLine
                  y={165}
                  stroke="rgba(255, 59, 59, 0.25)"
                  strokeDasharray="3 4"
                />

                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="hr"
                  stroke="#ff3b3b"
                  strokeWidth={2.2}
                  fill="url(#hrFill)"
                  dot={false}
                  activeDot={{ r: 3.5, fill: "#ff3b3b", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats */}
        <div
          data-eid="stats-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginTop: 2,
          }}
        >
          <div
            data-eid="stat-avg-hr"
            style={{
              borderRadius: 16,
              padding: "14px 12px",
              background:
                "linear-gradient(180deg, rgba(255,75,75,0.10) 0%, rgba(255,75,75,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
            }}
          >
            <div
              data-eid="stat-avg-hr-value"
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#ff4b4b",
                letterSpacing: 0.2,
              }}
            >
              {data.stats.avgHr}
            </div>
            <div
              data-eid="stat-avg-hr-label"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.40)",
                marginTop: 2,
              }}
            >
              Avg HR
            </div>
          </div>

          <div
            data-eid="stat-max-hr"
            style={{
              borderRadius: 16,
              padding: "14px 12px",
              background:
                "linear-gradient(180deg, rgba(255,75,75,0.10) 0%, rgba(255,75,75,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
            }}
          >
            <div
              data-eid="stat-max-hr-value"
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#ff4b4b",
                letterSpacing: 0.2,
              }}
            >
              {data.stats.maxHr}
            </div>
            <div
              data-eid="stat-max-hr-label"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.40)",
                marginTop: 2,
              }}
            >
              Max HR
            </div>
          </div>

          <div
            data-eid="stat-calories"
            style={{
              borderRadius: 16,
              padding: "14px 12px",
              background:
                "linear-gradient(180deg, rgba(255,176,0,0.14) 0%, rgba(255,176,0,0.04) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
            }}
          >
            <div
              data-eid="stat-calories-value"
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#ffb000",
                letterSpacing: 0.2,
              }}
            >
              {data.stats.calories}
            </div>
            <div
              data-eid="stat-calories-label"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.40)",
                marginTop: 2,
              }}
            >
              Calories
            </div>
          </div>
        </div>

        {/* Zones */}
        <div
          data-eid="zones-section"
          style={{
            marginTop: 2,
          }}
        >
          <div
            data-eid="zones-title"
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.38)",
              fontWeight: 800,
              letterSpacing: 1.1,
              margin: "6px 0 10px 0",
            }}
          >
            {data.zonesTitle}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {zoneRow("zone-rest", "zone-rest-bar", "zone-rest-time", data.zones[0])}
            {zoneRow(
              "zone-fat-burn",
              "zone-fat-burn-bar",
              "zone-fat-burn-time",
              data.zones[1]
            )}
            {zoneRow(
              "zone-cardio",
              "zone-cardio-bar",
              "zone-cardio-time",
              data.zones[2]
            )}
            {zoneRow("zone-peak", "zone-peak-bar", "zone-peak-time", data.zones[3])}
            {zoneRow("zone-max", "zone-max-bar", "zone-max-time", data.zones[4])}
          </div>
        </div>
      </div>
    </section>
  );
}