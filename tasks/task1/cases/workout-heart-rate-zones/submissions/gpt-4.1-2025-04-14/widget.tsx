import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import { HeartPulse, Timer } from "lucide-react";
import data from "./data.json";

const hrZones = [
  {
    eid: "zone-rest",
    label: "Rest",
    subLabel: "<100 bpm",
    time: data.hrZones[0].time,
    percent: data.hrZones[0].percent,
    color: "#6D7280",
    barEid: "zone-rest-bar",
    timeEid: "zone-rest-time"
  },
  {
    eid: "zone-fat-burn",
    label: "Fat Burn",
    subLabel: "100-130 bpm",
    time: data.hrZones[1].time,
    percent: data.hrZones[1].percent,
    color: "#2563EB",
    barEid: "zone-fat-burn-bar",
    timeEid: "zone-fat-burn-time"
  },
  {
    eid: "zone-cardio",
    label: "Cardio",
    subLabel: "130-155 bpm",
    time: data.hrZones[2].time,
    percent: data.hrZones[2].percent,
    color: "#22C55E",
    barEid: "zone-cardio-bar",
    timeEid: "zone-cardio-time"
  },
  {
    eid: "zone-peak",
    label: "Peak",
    subLabel: "155-175 bpm",
    time: data.hrZones[3].time,
    percent: data.hrZones[3].percent,
    color: "#F59E42",
    barEid: "zone-peak-bar",
    timeEid: "zone-peak-time"
  },
  {
    eid: "zone-max",
    label: "Max",
    subLabel: "175+ bpm",
    time: data.hrZones[4].time,
    percent: data.hrZones[4].percent,
    color: "#DC2626",
    barEid: "zone-max-bar",
    timeEid: "zone-max-time"
  }
];

const barBg = "#26272B";
const barHeight = 7;
const barRadius = 6;

const Widget = () => (
  <section
    data-eid="root"
    style={{
      background: "#18181B",
      borderRadius: 32,
      width: 480,
      padding: "32px 0 32px 0",
      margin: "0 auto",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 28,
      fontFamily: "Inter, sans-serif",
      color: "#fff",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      minHeight: 750,
    }}
  >
    {/* HEADER */}
    <div
      data-eid="header"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 44px 0 44px",
        gap: 18,
        position: "relative"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <span data-eid="header-icon" style={{ marginRight: 10, color: "#22c55e", display: "flex", alignItems: "center", fontSize: 19 }}>
          <HeartPulse size={22} style={{ color: "#22c55e" }} strokeWidth={2} />
        </span>
        <span data-eid="header-workout-type" style={{ fontWeight: 600, fontSize: 22, letterSpacing: -0.5 }}>Morning Run</span>
        <span data-eid="header-date" style={{
          marginLeft: "auto",
          color: "#A1A1AA",
          fontSize: 16,
          fontWeight: 400,
        }}>
          Feb 24, 2025
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "#A1A1AA", marginRight: 2, display: "flex", alignItems: "center" }}>
          <Timer size={21} style={{ color: "#A1A1AA" }} strokeWidth={2} />
        </span>
        <div data-eid="header-duration" style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1.5 }}>
          45:23
        </div>
      </div>
    </div>
    {/* CHART */}
    <div data-eid="hr-chart-section" style={{width: "100%", padding: "0 44px 0 44px" }}>
      <div data-eid="hr-chart-title" style={{
        fontWeight: 500,
        fontSize: 13,
        color: "#A1A1AA",
        marginBottom: 7,
        letterSpacing: 1,
      }}>
        HEART RATE
      </div>
      <div data-eid="hr-chart" style={{ width: "100%", height: 148 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.hrChart}>
            <YAxis domain={[60, 190]} ticks={[60, 95, 130, 165, 190]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8E8E93" }} width={30} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8E8E93" }} height={25} />
            <ReferenceLine y={130} stroke="#FACC15" strokeDasharray="4 2" strokeWidth={1} />
            <ReferenceLine y={165} stroke="#F59E42" strokeDasharray="4 2" strokeWidth={1} />
            <Area
              type="monotone"
              dataKey="bpm"
              stroke="#DC2626"
              strokeWidth={3}
              fill="url(#colorHr)"
              dot={false}
            />
            <defs>
              <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#FCA5A5" stopOpacity={0.4}/>
                <stop offset="85%" stopColor="#18181B" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{
                background: "#26272B",
                border: "none",
                borderRadius: 10,
                minWidth: 55,
                fontSize: 14,
                color: "#fff",
              }}
              labelStyle={{
                color: "#A1A1AA",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    {/* HR STATS */}
    <div data-eid="stats-row" style={{ display: "flex", gap: 18, justifyContent: "space-between", padding: "0 44px 0 44px", marginTop: 10 }}>
      {/* AVG HR */}
      <div data-eid="stat-avg-hr" style={{
        background: "#27272A",
        borderRadius: 16,
        padding: "18px 0 14px 0",
        width: 112,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div data-eid="stat-avg-hr-value" style={{
          color: "#F43F5E",
          fontWeight: 700, fontSize: 30, letterSpacing: -1, marginBottom: 2,
        }}>142</div>
        <div data-eid="stat-avg-hr-label" style={{
          color: "#C4C4C4", fontSize: 15, fontWeight: 500, letterSpacing: -0.4
        }}>Avg HR</div>
      </div>
      {/* MAX HR */}
      <div data-eid="stat-max-hr" style={{
        background: "#27272A",
        borderRadius: 16,
        padding: "18px 0 14px 0",
        width: 112,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div data-eid="stat-max-hr-value" style={{
          color: "#EF4444",
          fontWeight: 700, fontSize: 30, letterSpacing: -1, marginBottom: 2
        }}>178</div>
        <div data-eid="stat-max-hr-label" style={{
          color: "#C4C4C4", fontSize: 15, fontWeight: 500, letterSpacing: -0.4
        }}>Max HR</div>
      </div>
      {/* CALORIES */}
      <div data-eid="stat-calories" style={{
        background: "#27272A",
        borderRadius: 16,
        padding: "18px 0 14px 0",
        width: 112,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div data-eid="stat-calories-value" style={{
          color: "#FACC15",
          fontWeight: 700, fontSize: 30, letterSpacing: -1, marginBottom: 2
        }}>487</div>
        <div data-eid="stat-calories-label" style={{
          color: "#C4C4C4", fontSize: 15, fontWeight: 500, letterSpacing: -0.4
        }}>Calories</div>
      </div>
    </div>
    {/* ZONES */}
    <div data-eid="zones-section" style={{ width: "100%", padding: "0 44px 0 44px" }}>
      <div data-eid="zones-title" style={{
        color: "#A1A1AA",
        fontWeight: 600,
        fontSize: 15,
        marginBottom: 10,
        letterSpacing: 1.2,
      }}>
        HR ZONES
      </div>
      {/* Zone rows */}
      {hrZones.map((zone, i) =>
        <div key={zone.eid} data-eid={zone.eid} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: i===hrZones.length-1 ? 0 : 13,
          gap: 11
        }}>
          {/* LABEL */}
          <div style={{ minWidth: 86, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{
              color: zone.label === "Rest" ? "#E4E4E7" : zone.color,
              fontWeight: zone.label === "Rest" ? 600 : 600,
              fontSize: 16,
              marginBottom: 0
            }}>
              {zone.label}
            </div>
            <div style={{
              color: "#7B7B8D",
              fontSize: 11,
              fontWeight: 500,
              marginTop: 0,
              letterSpacing: 0.5,
            }}>{zone.subLabel}</div>
          </div>
          {/* BAR */}
          <div style={{
            flexGrow: 1,
            margin: "0 17px 0 8px",
            display: "flex",
            alignItems: "center"
          }}>
            <div
              data-eid={zone.barEid}
              style={{
                width: "100%",
                background: barBg,
                borderRadius: barRadius,
                height: barHeight,
                overflow: "hidden",
                position: "relative"
              }}
            >
              <div style={{
                width: `${zone.percent}%`,
                background: zone.color,
                height: barHeight,
                borderRadius: barRadius,
                transition: "width 0.4s cubic-bezier(.4,1.1,.5,1)",
                position: "absolute",
                left: 0, top: 0
              }} />
            </div>
          </div>
          {/* TIME */}
          <span
            data-eid={zone.timeEid}
            style={{
              color: "#F4F4F5",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: -1,
              minWidth: 54,
              textAlign: "right"
            }}
          >
            {zone.time}
          </span>
        </div>
      )}
    </div>
  </section>
);

export default Widget;