// submissions/gpt-widget/widget.tsx
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Building2,
  DollarSign,
  Users,
  TrendingDown,
  Clock,
  Ticket,
  Smile,
  Rocket,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import data from "./data.json";

type SparkPoint = { x: number; y: number };

function Spark({
  points,
  stroke,
  fill,
}: {
  points: SparkPoint[];
  stroke: string;
  fill: string;
}) {
  return (
    <div style={{ width: "100%", height: 54 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`g-${stroke.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity={0.55} />
              <stop offset="100%" stopColor={fill} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" hide />
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Tooltip content={() => null} />
          <Area
            type="monotone"
            dataKey="y"
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#g-${stroke.replace(/[^a-z0-9]/gi, "")})`}
            fillOpacity={1}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function IconFor(id: string, color: string) {
  const common = { size: 16, color };
  switch (id) {
    case "revenue":
      return <DollarSign {...common} />;
    case "users":
      return <Users {...common} />;
    case "conversion":
      return <TrendingDown {...common} />;
    case "response":
      return <Clock {...common} />;
    case "tickets":
      return <Ticket {...common} />;
    case "csat":
      return <Smile {...common} />;
    case "deploy":
      return <Rocket {...common} />;
    case "error":
      return <AlertTriangle {...common} />;
    default:
      return <DollarSign {...common} />;
  }
}

export default function Widget() {
  const w = 520;

  const bg = {
    background:
      "radial-gradient(1200px 600px at 10% 0%, rgba(118,140,255,0.22), rgba(16,18,33,0) 55%), radial-gradient(900px 700px at 95% 10%, rgba(33,214,163,0.18), rgba(16,18,33,0) 55%), linear-gradient(135deg, #0b0f25 0%, #0a0d1a 40%, #130b25 100%)",
  } as const;

  const cardBase: React.CSSProperties = {
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.40)",
    padding: 14,
    position: "relative",
    overflow: "hidden",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    color: "rgba(230,235,255,0.62)",
    letterSpacing: 0.2,
  };

  const valueStyle: React.CSSProperties = {
    marginTop: 6,
    fontSize: 26,
    fontWeight: 800,
    color: "rgba(255,255,255,0.94)",
  };

  const targetStyle: React.CSSProperties = {
    marginTop: 8,
    fontSize: 11,
    color: "rgba(230,235,255,0.45)",
  };

  const progressTrack: React.CSSProperties = {
    marginTop: 10,
    height: 4,
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    overflow: "hidden",
  };

  return (
    <section
      data-eid="root"
      style={{
        width: w,
        borderRadius: 22,
        padding: 16,
        ...bg,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: "white",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          padding: "2px 2px 10px 2px",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: "rgba(130,150,255,0.10)",
              border: "1px solid rgba(130,150,255,0.20)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <Building2 size={16} color="rgba(164,179,255,0.95)" />
          </div>
          <div style={{ minWidth: 220 }}>
            <div
              data-eid="company-name"
              style={{
                fontWeight: 800,
                fontSize: 20,
                lineHeight: "20px",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {data.company.name}
            </div>
            <div
              data-eid="subtitle"
              style={{
                marginTop: 4,
                fontSize: 12,
                color: "rgba(230,235,255,0.50)",
              }}
            >
              {data.company.subtitle}
            </div>

            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <RefreshCw size={12} color="rgba(230,235,255,0.35)" />
              <span
                data-eid="refresh-timestamp"
                style={{ fontSize: 11, color: "rgba(230,235,255,0.40)" }}
              >
                {data.company.refreshed}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", paddingTop: 4 }}>
          <span
            data-eid="department-badge"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid rgba(130,150,255,0.25)",
              background: "rgba(108,130,255,0.10)",
              color: "rgba(210,218,255,0.90)",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {data.company.department}
          </span>
          <span
            data-eid="period-badge"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid rgba(28,224,154,0.30)",
              background: "rgba(22,210,144,0.14)",
              color: "rgba(120,255,212,0.90)",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 0.3,
            }}
          >
            {data.company.period}
          </span>
        </div>
      </header>

      <div
        data-eid="kpi-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginTop: 6,
        }}
      >
        {data.kpis.map((kpi: any, idx: number) => {
          const eidBase = `kpi-${idx}` as const;

          const stroke = kpi.colors.stroke;
          const fill = kpi.colors.fill;

          const changeUp = kpi.change.trim().startsWith("+");
          const good = kpi.good === true;

          const changeColor =
            good && changeUp
              ? "rgba(36, 230, 145, 0.95)"
              : good && !changeUp
                ? "rgba(36, 230, 145, 0.95)"
                : !good && !changeUp
                  ? "rgba(255, 98, 120, 0.92)"
                  : "rgba(255, 98, 120, 0.92)";

          const Arrow = changeUp ? ArrowUpRight : ArrowDownRight;

          // Card tint per KPI
          const tint =
            idx === 0
              ? "radial-gradient(520px 220px at 30% 0%, rgba(111,124,255,0.18), rgba(255,255,255,0) 55%)"
              : idx === 1
                ? "radial-gradient(520px 220px at 30% 0%, rgba(23,220,160,0.16), rgba(255,255,255,0) 55%)"
                : idx === 2
                  ? "radial-gradient(520px 220px at 30% 0%, rgba(255,95,166,0.16), rgba(255,255,255,0) 55%)"
                  : idx === 3
                    ? "radial-gradient(520px 220px at 30% 0%, rgba(255,178,0,0.14), rgba(255,255,255,0) 55%)"
                    : idx === 4
                      ? "radial-gradient(520px 220px at 30% 0%, rgba(255,98,120,0.14), rgba(255,255,255,0) 55%)"
                      : idx === 5
                        ? "radial-gradient(520px 220px at 30% 0%, rgba(160,140,255,0.14), rgba(255,255,255,0) 55%)"
                        : idx === 6
                          ? "radial-gradient(520px 220px at 30% 0%, rgba(60,174,255,0.13), rgba(255,255,255,0) 55%)"
                          : "radial-gradient(520px 220px at 30% 0%, rgba(255,214,89,0.12), rgba(255,255,255,0) 55%)";

          return (
            <div
              key={kpi.id}
              data-eid={eidBase}
              style={{
                ...cardBase,
                backgroundImage: `${tint}, linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  data-eid={`${eidBase}-icon`}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 8,
                    background: "rgba(0,0,0,0.18)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {IconFor(kpi.id, stroke)}
                </span>
                <span data-eid={`${eidBase}-label`} style={labelStyle}>
                  {kpi.label}
                </span>
              </div>

              <div data-eid={`${eidBase}-value`} style={valueStyle}>
                {kpi.value}
              </div>

              <div
                data-eid={`${eidBase}-change`}
                style={{
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: changeColor,
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                <Arrow size={14} color={changeColor} />
                <span>{kpi.change}</span>
              </div>

              <div data-eid={`${eidBase}-sparkline`} style={{ marginTop: 6 }}>
                <Spark points={kpi.spark} stroke={stroke} fill={fill} />
              </div>

              <div data-eid={`${eidBase}-target`} style={targetStyle}>
                {kpi.target}
              </div>

              <div data-eid={`${eidBase}-progress`} style={progressTrack}>
                <div
                  data-eid={`${eidBase}-progress-fill`}
                  style={{
                    height: "100%",
                    width: `${kpi.progress}%`,
                    borderRadius: 999,
                    background: stroke,
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset`,
                  }}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  borderRadius: 14,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              />
            </div>
          );
        })}
      </div>

      <div
        data-eid="summary-bar"
        style={{
          marginTop: 14,
          padding: 12,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.04)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
        }}
      >
        <div data-eid="summary-revenue" style={{ padding: 6 }}>
          <div
            data-eid="summary-revenue-label"
            style={{ fontSize: 11, color: "rgba(230,235,255,0.55)" }}
          >
            {data.summary.revenue.label}
          </div>
          <div
            data-eid="summary-revenue-value"
            style={{ marginTop: 4, fontWeight: 800, color: "rgba(255,255,255,0.90)" }}
          >
            {data.summary.revenue.value}
          </div>
        </div>

        <div data-eid="summary-growth" style={{ padding: 6 }}>
          <div
            data-eid="summary-growth-label"
            style={{ fontSize: 11, color: "rgba(230,235,255,0.55)" }}
          >
            {data.summary.growth.label}
          </div>
          <div
            data-eid="summary-growth-value"
            style={{ marginTop: 4, fontWeight: 800, color: "rgba(255,255,255,0.90)" }}
          >
            {data.summary.growth.value}
          </div>
        </div>

        <div data-eid="summary-team" style={{ padding: 6 }}>
          <div
            data-eid="summary-team-label"
            style={{ fontSize: 11, color: "rgba(230,235,255,0.55)" }}
          >
            {data.summary.team.label}
          </div>
          <div
            data-eid="summary-team-value"
            style={{ marginTop: 4, fontWeight: 800, color: "rgba(255,255,255,0.90)" }}
          >
            {data.summary.team.value}
          </div>
        </div>
      </div>
    </section>
  );
}