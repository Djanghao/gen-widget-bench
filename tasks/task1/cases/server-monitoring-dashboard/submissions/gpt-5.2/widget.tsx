// submissions/gpt/widget.tsx
import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Cpu, Database, HardDrive, Wifi, Activity } from "lucide-react";
import data from "./data.json";

const fmt = (n: number) => `${n}`;

export default function Widget() {
  const cpuPct = Math.round((data.cpu.current / 100) * 100);
  const memPct = Math.round((data.memory.used / data.memory.total) * 100);
  const diskPct = Math.round((data.disk.used / data.disk.total) * 100);

  const cardBase: React.CSSProperties = {
    borderRadius: 14,
    padding: 16,
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  };

  const labelRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(255,255,255,0.68)",
    fontSize: 12,
    letterSpacing: 0.2,
  };

  const barTrack: React.CSSProperties = {
    height: 8,
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    overflow: "hidden",
    marginTop: 14,
  };

  const chartWrap: React.CSSProperties = {
    height: 52,
    marginTop: 6,
  };

  return (
    <section
      data-eid="root"
      style={{
        width: 446,
        height: 542,
        borderRadius: 24,
        padding: 18,
        boxSizing: "border-box",
        color: "#EAF0FF",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        background:
          "radial-gradient(120% 120% at 20% 0%, #161a3a 0%, #12163a 30%, #0f1c3a 60%, #0c1631 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Activity size={18} color="#7c86ff" />
          <div
            data-eid="cluster-name"
            style={{
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: 0.2,
            }}
          >
            {data.clusterName.split(" ").slice(0, 1).join(" ")}
            <br />
            {data.clusterName.split(" ").slice(1).join(" ")}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span
            data-eid="status-badge"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              color: "#5FF7A8",
              background: "rgba(26, 143, 96, 0.22)",
              border: "1px solid rgba(56, 255, 170, 0.25)",
            }}
          >
            {data.status}
          </span>
          <span
            data-eid="uptime-badge"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(235,240,255,0.82)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            {data.uptime} uptime
          </span>
        </div>
      </header>

      <div
        data-eid="metrics-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 14,
        }}
      >
        {/* CPU */}
        <div
          data-eid="card-cpu"
          style={{
            ...cardBase,
            background:
              "linear-gradient(135deg, rgba(60,70,200,0.28), rgba(24,28,72,0.35))",
          }}
        >
          <div style={labelRow}>
            <span data-eid="cpu-icon" style={{ display: "inline-flex" }}>
              <Cpu size={14} color="#8b93ff" />
            </span>
            <span data-eid="cpu-label">{data.cpu.label}</span>
          </div>

          <div
            data-eid="cpu-value"
            style={{
              marginTop: 10,
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: 0.4,
              color: "#EAF0FF",
            }}
          >
            {cpuPct}%
          </div>

          <div data-eid="cpu-sparkline" style={chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.cpu.history} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7f8bff" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#7f8bff" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip content={() => null} />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#7f8bff"
                  strokeWidth={2}
                  fill="url(#cpuFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory */}
        <div
          data-eid="card-memory"
          style={{
            ...cardBase,
            background:
              "linear-gradient(135deg, rgba(30,105,90,0.28), rgba(15,40,55,0.35))",
          }}
        >
          <div style={labelRow}>
            <span data-eid="memory-icon" style={{ display: "inline-flex" }}>
              <Database size={14} color="#61f6c6" />
            </span>
            <span data-eid="memory-label">{data.memory.label}</span>
          </div>

          <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 6 }}>
            <div
              data-eid="memory-value"
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#A7FFE7",
                letterSpacing: 0.2,
              }}
            >
              {data.memory.used.toFixed(1)}
              <span style={{ color: "rgba(235,240,255,0.65)", fontWeight: 600, fontSize: 14 }}>
                {" "}
                / {fmt(data.memory.total)} GB
              </span>
            </div>
          </div>

          <div data-eid="memory-bar" style={barTrack}>
            <div
              data-eid="memory-bar-fill"
              style={{
                width: `${memPct}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #1fe7a8 0%, #29f2b8 100%)",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08) inset",
              }}
            />
          </div>
        </div>

        {/* Disk */}
        <div
          data-eid="card-disk"
          style={{
            ...cardBase,
            background:
              "linear-gradient(135deg, rgba(120,85,20,0.26), rgba(52,35,18,0.35))",
          }}
        >
          <div style={labelRow}>
            <span data-eid="disk-icon" style={{ display: "inline-flex" }}>
              <HardDrive size={14} color="#ffcc66" />
            </span>
            <span data-eid="disk-label">{data.disk.label}</span>
          </div>

          <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 6 }}>
            <div
              data-eid="disk-value"
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#FFE08A",
                letterSpacing: 0.2,
              }}
            >
              {fmt(data.disk.used)}
              <span style={{ color: "rgba(235,240,255,0.65)", fontWeight: 600, fontSize: 14 }}>
                {" "}
                / {fmt(data.disk.total)} GB
              </span>
            </div>
          </div>

          <div data-eid="disk-bar" style={barTrack}>
            <div
              data-eid="disk-bar-fill"
              style={{
                width: `${diskPct}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #ffb000 0%, #ffd24d 100%)",
              }}
            />
          </div>
        </div>

        {/* Network */}
        <div
          data-eid="card-network"
          style={{
            ...cardBase,
            background:
              "linear-gradient(135deg, rgba(120,40,120,0.26), rgba(45,20,60,0.35))",
          }}
        >
          <div style={labelRow}>
            <span data-eid="network-icon" style={{ display: "inline-flex" }}>
              <Wifi size={14} color="#ff7ab9" />
            </span>
            <span data-eid="network-label">{data.network.label}</span>
          </div>

          <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 8 }}>
            <div
              data-eid="network-value"
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFD5EA",
                letterSpacing: 0.2,
              }}
            >
              {fmt(data.network.current)}
              <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(235,240,255,0.70)" }}>
                {" "}
                Mbps
              </span>
            </div>
          </div>

          <div data-eid="network-sparkline" style={chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.network.history}
                margin={{ top: 6, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff5aa8" stopOpacity={0.38} />
                    <stop offset="100%" stopColor="#ff5aa8" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis hide />
                <Tooltip content={() => null} />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#ff5aa8"
                  strokeWidth={2}
                  fill="url(#netFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div data-eid="alerts-section" style={{ marginTop: 2 }}>
        <div
          data-eid="alerts-title"
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "rgba(235,240,255,0.82)",
            margin: "4px 0 10px 2px",
            letterSpacing: 0.2,
          }}
        >
          {data.alertsTitle}
        </div>

        {/* Alert rows */}
        {data.alerts.map((a, idx) => {
          const eidRow = (`alert-${idx}` as const) as any;
          const eidSev = (`alert-${idx}-severity` as const) as any;
          const eidMsg = (`alert-${idx}-message` as const) as any;

          const palette =
            a.severity === "Critical"
              ? {
                  bg: "rgba(130, 30, 45, 0.35)",
                  border: "rgba(255, 80, 110, 0.28)",
                  pillBg: "rgba(170, 50, 70, 0.35)",
                  pillBorder: "rgba(255, 110, 140, 0.35)",
                  pillText: "#FF8AA8",
                  icon: "#ff6b86",
                }
              : a.severity === "Warning"
              ? {
                  bg: "rgba(110, 80, 20, 0.32)",
                  border: "rgba(255, 190, 70, 0.24)",
                  pillBg: "rgba(160, 115, 30, 0.35)",
                  pillBorder: "rgba(255, 205, 100, 0.30)",
                  pillText: "#FFD07A",
                  icon: "#ffc14d",
                }
              : {
                  bg: "rgba(25, 60, 120, 0.32)",
                  border: "rgba(90, 170, 255, 0.22)",
                  pillBg: "rgba(30, 80, 150, 0.35)",
                  pillBorder: "rgba(120, 200, 255, 0.26)",
                  pillText: "#8EC8FF",
                  icon: "#7db8ff",
                };

          const icon =
            a.severity === "Critical" ? (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: palette.icon,
                  fontSize: 12,
                  lineHeight: "18px",
                  fontWeight: 900,
                }}
              >
                !
              </span>
            ) : a.severity === "Warning" ? (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: palette.icon,
                  fontSize: 11,
                  lineHeight: "18px",
                  fontWeight: 900,
                }}
              >
                ▲
              </span>
            ) : (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: palette.icon,
                  fontSize: 12,
                  lineHeight: "18px",
                  fontWeight: 900,
                }}
              >
                i
              </span>
            );

          return (
            <div
              key={idx}
              data-eid={eidRow}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: palette.bg,
                border: `1px solid ${palette.border}`,
                marginBottom: idx === data.alerts.length - 1 ? 0 : 10,
              }}
            >
              {icon}
              <span
                data-eid={eidSev}
                style={{
                  padding: "3px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 800,
                  background: palette.pillBg,
                  border: `1px solid ${palette.pillBorder}`,
                  color: palette.pillText,
                }}
              >
                {a.severity}
              </span>

              <span
                data-eid={eidMsg}
                style={{
                  flex: 1,
                  color: "rgba(235,240,255,0.80)",
                  fontSize: 12.5,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {a.message}
              </span>

              <span
                style={{
                  color: "rgba(235,240,255,0.45)",
                  fontSize: 12,
                  marginLeft: 6,
                  whiteSpace: "nowrap",
                }}
              >
                {a.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}