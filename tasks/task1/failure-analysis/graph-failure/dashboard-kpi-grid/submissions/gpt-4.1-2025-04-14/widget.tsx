import React from "react";
import data from "./data.json";
import {
  Building2,
  BadgePercent,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Users,
  Clock4,
  LifeBuoy,
  Smile,
  Rocket,
  AlertTriangle,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const iconMap = [
  <TrendingUp size={18} color="#7ca4ff" />,
  <Users size={18} color="#33ecb5" />,
  <BadgePercent size={18} color="#fc91bd" />,
  <Clock4 size={18} color="#ffe873" />,
  <LifeBuoy size={18} color="#ff7c5f" />,
  <Smile size={18} color="#b891ff" />,
  <Rocket size={18} color="#ffe873" />,
  <AlertTriangle size={18} color="#fc4b8a" />,
];

const kpiCardBorder = [
  "1px solid #34426c",
  "1px solid #174d44",
  "1px solid #5b3452",
  "1px solid #4c3f2f",
  "1px solid #5c3935",
  "1px solid #37345c",
  "1px solid #473f2f",
  "1px solid #57324c",
];

const sparklineColors = [
  ["#8fbcff", "#3a69be"],
  ["#47e0b5", "#178f65"],
  ["#f25bb0", "#953e6f"],
  ["#ffe873", "#c89600"],
  ["#ff7c5f", "#ba3922"],
  ["#b891ff", "#613fac"],
  ["#ffe873", "#d9a80d"],
  ["#fc4b8a", "#b2183c"],
];

function getChangeIcon(change: string) {
  const isNegative = change?.trim()?.startsWith("-");
  if (isNegative)
    return (
      <ArrowDownRight size={16} style={{ verticalAlign: "middle", marginRight: 2 }} />
    );
  return (
    <ArrowUpRight size={16} style={{ verticalAlign: "middle", marginRight: 2 }} />
  );
}
function getChangeColor(change: string, kind: string) {
  if (change?.trim()?.startsWith("-"))
    return kind === "improvement" ? "#3ce768" : "#ff4b7d";
  return "#37e885";
}
function getProgressBarColor(idx: number) {
  // Assigned to match sparkline accent for card
  return [
    "#7ca4ff", // Monthly Revenue
    "#33ecb5", // Active Users
    "#fc91bd", // Conversion Rate
    "#ffe873", // Avg Response Time
    "#ff7c5f", // Support Tickets
    "#b891ff", // Customer Satisfaction
    "#ffe873", // Deployments
    "#fc4b8a", // Error Rate
  ][idx];
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 570,
        minHeight: 820,
        borderRadius: 24,
        background: "linear-gradient(150deg, #21233a 90%, #232645 100%)",
        margin: "0 auto",
        fontFamily: "Inter, Arial, sans-serif",
        boxShadow: "0 2px 24px 2px #060d23b0",
        padding: "28px 30px 16px 30px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <header
        data-eid="header"
        style={{
          marginBottom: 24,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              data-eid="company-name"
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: 22,
                color: "white",
                marginBottom: 2,
                gap: 8,
              }}
            >
              <Building2 size={21} color="#98a1cb" style={{ marginRight: 6, marginTop: -2 }} />
              Acme Corp
            </div>
            <div
              data-eid="subtitle"
              style={{
                color: "#acb7d5",
                fontSize: 15,
                fontWeight: 500,
                marginLeft: 30,
              }}
            >
              Engineering Dashboard
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span
              data-eid="department-badge"
              style={{
                background: "#263580",
                borderRadius: 18,
                fontSize: 14,
                color: "#e1eaff",
                fontWeight: 700,
                padding: "4px 15px 4px 15px",
                letterSpacing: 0.1,
                boxShadow: "0 0 1px 0px #202945",
              }}
            >
              Engineering
            </span>
            <span
              data-eid="period-badge"
              style={{
                background: "#14c885",
                backgroundImage:
                  "linear-gradient(90deg,#14c885 40%,#29b0e4 100%)",
                borderRadius: 18,
                fontSize: 14.3,
                color: "#fff",
                fontWeight: 700,
                padding: "4px 15px 4px 15px",
                letterSpacing: 0.1,
                boxShadow: "0 0 3px 0px #19746650",
              }}
            >
              Q1 2026
            </span>
          </div>
        </div>
        <span
          data-eid="refresh-timestamp"
          style={{
            display: "block",
            color: "#96a9bf",
            fontSize: 13.2,
            fontWeight: 400,
            marginTop: 18,
            marginLeft: 2,
            letterSpacing: 0.17,
          }}
        >
          <span
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: 4,
            }}
          >
            <svg width="14" height="14" stroke="#90a5ca">
              <g>
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  fill="none"
                  stroke="#90a5ca"
                  strokeWidth="1.5"
                />
                <polyline
                  points="6.9,3.2 6.9,7.1 10.1,8.7"
                  fill="none"
                  stroke="#90a5ca"
                  strokeWidth="1.18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </span>
          Mar 4, 2026 2:35 PM
        </span>
      </header>

      <div
        data-eid="kpi-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: 18,
        }}
      >
        {data.kpis.map((kpi, idx) => (
          <div
            key={kpi.label}
            data-eid={`kpi-${idx}`}
            style={{
              background: "linear-gradient(120deg, #1e1931 70%, #221c3e 100%)",
              border: kpiCardBorder[idx],
              borderRadius: 14,
              padding: "18px 20px 15px 20px",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              minWidth: 0,
              minHeight: 0,
              justifyContent: "space-between",
              boxShadow: "0 2px 12px 0px #060d2342",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span
                data-eid={`kpi-${idx}-icon`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 21,
                  height: 21,
                  borderRadius: "50%",
                  background: "transparent",
                  marginRight: 2,
                  marginBottom: 2,
                }}
              >
                {iconMap[idx]}
              </span>
              <span
                data-eid={`kpi-${idx}-label`}
                style={{
                  fontWeight: 600,
                  fontSize: 16.2,
                  color: "#bdcfff",
                  letterSpacing: 0.08,
                }}
              >
                {kpi.label}
              </span>
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 28,
                color: "#fff",
                margin: "8px 0 3px 0",
                lineHeight: 1,
              }}
              data-eid={`kpi-${idx}-value`}
            >
              {kpi.value}
            </div>
            <div
              data-eid={`kpi-${idx}-change`}
              style={{
                color: getChangeColor(kpi.change, kpi.improvement),
                fontWeight: 700,
                fontSize: 15,
                marginBottom: 6,
                marginTop: -1,
                display: "flex",
                alignItems: "center",
                letterSpacing: 0.01,
                gap: 2,
              }}
            >
              {getChangeIcon(kpi.change)}
              {kpi.change}
            </div>
            <div
              data-eid={`kpi-${idx}-sparkline`}
              style={{
                margin: "10px 0 6px 0",
                height: 26,
                width: "100%",
              }}
            >
              <ResponsiveContainer width="100%" height={26}>
                <AreaChart data={kpi.sparkline}>
                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke={sparklineColors[idx][0]}
                    strokeWidth={2.2}
                    fill={`url(#kpispark${idx})`}
                    dot={false}
                  />
                  <defs>
                    <linearGradient
                      id={`kpispark${idx}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={sparklineColors[idx][0]}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="80%"
                        stopColor={sparklineColors[idx][1]}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div
              data-eid={`kpi-${idx}-target`}
              style={{
                fontWeight: 500,
                fontSize: 13,
                color: "#a0acce",
                marginBottom: 7,
                marginTop: -2,
              }}
            >
              {kpi.target}
            </div>
            <div
              data-eid={`kpi-${idx}-progress`}
              style={{
                width: "100%",
                height: 7,
                background:
                  "linear-gradient(90deg, #202647 70%, #321d4b 100%)",
                borderRadius: 12,
                position: "relative",
                overflow: "hidden",
                marginTop: 1,
              }}
            >
              <div
                data-eid={`kpi-${idx}-progress-fill`}
                style={{
                  width: `${kpi.progress}%`,
                  height: 7,
                  background: getProgressBarColor(idx),
                  borderRadius: 11,
                  transition: "width 0.25s cubic-bezier(.5,1.5,.9,1)",
                  boxShadow: "0 0 5px 0 #20264744",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        data-eid="summary-bar"
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          gap: 40,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div data-eid="summary-revenue" style={{ minWidth: 120 }}>
          <div
            data-eid="summary-revenue-label"
            style={{
              fontSize: 13.1,
              color: "#92a7cb",
              marginBottom: 1,
              fontWeight: 600,
              letterSpacing: 0.05,
            }}
          >
            Total Revenue
          </div>
          <div
            data-eid="summary-revenue-value"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            $28.8M YTD
          </div>
        </div>
        <div data-eid="summary-growth" style={{ minWidth: 110 }}>
          <div
            data-eid="summary-growth-label"
            style={{
              fontSize: 13,
              color: "#92a7cb",
              marginBottom: 1,
              fontWeight: 600,
              letterSpacing: 0.05,
            }}
          >
            Growth Rate
          </div>
          <div
            data-eid="summary-growth-value"
            style={{
              color: "#14c885",
              fontWeight: 700,
              fontSize: 16.1,
            }}
          >
            14.2% YoY
          </div>
        </div>
        <div data-eid="summary-team" style={{ minWidth: 116 }}>
          <div
            data-eid="summary-team-label"
            style={{
              fontSize: 13,
              color: "#92a7cb",
              marginBottom: 1,
              fontWeight: 600,
              letterSpacing: 0.05,
            }}
          >
            Team Size
          </div>
          <div
            data-eid="summary-team-value"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16.1,
            }}
          >
            142 members
          </div>
        </div>
      </div>
    </section>
  );
}