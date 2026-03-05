import React from "react";
import data from "./data.json";
import { Droplet } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const barWidth = 20;
const colors = {
  accent: "#28e1da",
  accentFaint: "#104f59",
  white: "#fff",
  text: "#bce1e6",
  faint: "#2b3845",
  none: "transparent",
  bg: "#0a232c",
  fg: "#112c37",
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 428,
        background: colors.bg,
        borderRadius: 28,
        margin: "0 auto",
        padding: 0,
        boxSizing: "border-box",
        position: "relative",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        boxShadow: "0 2px 12px #0001",
        minHeight: 695,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        data-eid="header"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
          padding: "28px 32px 0 28px",
          height: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span data-eid="header-icon" style={{ display: "flex" }}>
            <Droplet size={22} color={colors.accent} style={{ marginBottom: -2 }} />
          </span>
          <span
            data-eid="header-title"
            style={{
              color: colors.white,
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: 0,
            }}
          >
            {data.header.title}
          </span>
        </div>
        <span
          data-eid="header-date"
          style={{
            color: colors.text,
            fontSize: 15,
            fontWeight: 400,
          }}
        >
          {data.header.date}
        </span>
      </div>

      {/* Radial Progress */}
      <div
        data-eid="progress-ring"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 4,
          marginBottom: 24,
          position: "relative",
          height: 194,
        }}
      >
        <div
          data-eid="progress-chart"
          style={{
            width: 194,
            height: 194,
            position: "relative",
            zIndex: 1,
          }}
        >
          <RadialBarChart
            width={194}
            height={194}
            innerRadius="73%"
            outerRadius="90%"
            barSize={17}
            data={data.progress.radial}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={18}
              fill={colors.accent}
              background={{ fill: colors.faint }}
            />
          </RadialBarChart>
        </div>
        <div
          data-eid="progress-center"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-54%)",
            textAlign: "center",
            zIndex: 2,
            width: 130,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div
            data-eid="progress-current"
            style={{
              fontSize: 34,
              color: colors.accent,
              fontWeight: 700,
              marginBottom: -2,
              lineHeight: 1,
            }}
          >
            {data.progress.current}
          </div>
          <div
            data-eid="progress-goal"
            style={{
              fontSize: 17,
              color: colors.text,
              fontWeight: 500,
              marginBottom: 6,
              marginTop: 0,
              lineHeight: 1.2,
            }}
          >
            / {data.progress.goal}
          </div>
          <div
            data-eid="progress-percent"
            style={{
              background: colors.faint,
              color: colors.accent,
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 16,
              padding: "2px 14px",
              width: "fit-content",
              margin: "0 auto",
              letterSpacing: 0.1,
            }}
          >
            {data.progress.percent}
          </div>
        </div>
      </div>

      {/* HOURLY INTAKE */}
      <div
        data-eid="hourly-section"
        style={{
          width: "100%",
          padding: "0 30px 0 34px",
          marginBottom: 8,
        }}
      >
        <div
          data-eid="hourly-title"
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 4,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          {data.hourly.title}
        </div>
        <div
          data-eid="hourly-chart"
          style={{
            width: "100%",
            height: 54,
            marginTop: 6,
            marginBottom: 18,
            position: "relative",
          }}
        >
          <ResponsiveContainer width="100%" height={54}>
            <BarChart data={data.hourly.values}>
              <Bar dataKey="ml" radius={[4, 4, 0, 0]}>
                {data.hourly.values.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={colors.accent}
                    opacity={1}
                  />
                ))}
              </Bar>
              <XAxis
                dataKey="label"
                interval={3}
                tick={{ fill: colors.text, fontSize: 12, fontWeight: 400 }}
                axisLine={false}
                tickLine={false}
                height={20}
                dy={6}
                tickMargin={5}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* QUICK ADD */}
      <div
        data-eid="quick-add-section"
        style={{
          width: "100%",
          padding: "0 32px 0 32px",
          marginBottom: 7,
        }}
      >
        <div
          data-eid="quick-add-title"
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 11,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          {data.quickAdd.title}
        </div>
        <div style={{ display: "flex", gap: 16, width: "100%" }}>
          {[150, 250, 500].map((val, i) => (
            <div
              key={val}
              data-eid={
                val === 150
                  ? "quick-add-150"
                  : val === 250
                  ? "quick-add-250"
                  : "quick-add-500"
              }
              style={{
                flex: 1,
                cursor: "pointer",
                border: `2px solid ${colors.accent}`,
                borderRadius: 12,
                padding: "8px 0",
                color: colors.accent,
                background: colors.none,
                fontWeight: 600,
                fontSize: 17,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.13s",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <Droplet size={17} color={colors.accent} strokeWidth={2} />
              {val}ml
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY 7 DAYS */}
      <div
        data-eid="history-section"
        style={{
          padding: "0 0 0 0",
          marginBottom: 18,
        }}
      >
        <div
          data-eid="history-title"
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 7,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            paddingLeft: 32,
          }}
        >
          {data.history.title}
        </div>
        <div
          style={{
            display: "flex",
            gap: 0,
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 8px 0 8px",
          }}
        >
          {data.history.items.map((item, i) => (
            <div
              key={item.day}
              data-eid={`history-day-${i}`}
              style={{
                flex: 1,
                minWidth: 40,
                textAlign: "center",
                color: item.active
                  ? colors.white
                  : item.highlight
                  ? colors.accent
                  : colors.text,
                opacity: item.active || item.highlight ? 1 : 0.43,
                fontWeight: item.highlight ? 700 : 500,
                fontSize: 16,
                margin: 0,
                padding: "0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 0,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 21,
                  background: item.active || item.highlight ? colors.fg : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 1,
                  border: item.highlight
                    ? `2px solid ${colors.accent}`
                    : "2px solid transparent",
                }}
              >
                {(item.active || item.highlight) && (
                  <Droplet
                    size={20}
                    color={item.highlight ? colors.accent : colors.text}
                    strokeWidth={2}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: 13.2,
                  color: colors.text,
                  letterSpacing: 0,
                  fontWeight: 500,
                  marginBottom: 2,
                  marginTop: 0,
                  opacity: 0.93,
                  textTransform: "capitalize",
                }}
              >
                {item.day}
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  fontWeight: item.highlight ? 700 : 500,
                  color: item.highlight ? colors.accent : colors.white,
                  marginTop: -3,
                }}
              >
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div
        data-eid="stats-row"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          borderTop: `1px solid #19e1da23`,
          background: colors.bg,
          padding: "14px 24px 13px 28px",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "0 0 28px 28px",
          marginTop: "auto",
          minHeight: 64,
        }}
      >
        <div
          data-eid="stat-daily-avg"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            data-eid="stat-daily-avg-value"
            style={{
              color: colors.accent,
              fontWeight: 700,
              fontSize: 18.5,
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            {data.stats.dailyAvg}
          </div>
          <div
            data-eid="stat-daily-avg-label"
            style={{
              color: colors.text,
              fontSize: 15,
              fontWeight: 500,
              marginTop: 0,
              marginBottom: 0,
              opacity: 0.9,
            }}
          >
            Daily Avg
          </div>
        </div>
        <div
          data-eid="stat-streak"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            data-eid="stat-streak-value"
            style={{
              color: colors.accent,
              fontWeight: 700,
              fontSize: 18.5,
              marginBottom: 0,
              marginTop: 0,
              textAlign: "right",
            }}
          >
            {data.stats.streak}
          </div>
          <div
            data-eid="stat-streak-label"
            style={{
              color: colors.text,
              fontSize: 15,
              fontWeight: 500,
              marginTop: 0,
              marginBottom: 0,
              textAlign: "right",
              opacity: 0.9,
            }}
          >
            Streak
          </div>
        </div>
      </div>
    </section>
  );
}