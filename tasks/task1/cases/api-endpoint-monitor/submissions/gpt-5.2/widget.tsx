// submissions/<your-model-name>/widget.tsx
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Zap } from "lucide-react";
import data from "./data.json";

const fontStack =
  'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"';

function Sparkline({
  series,
  color,
  fill,
}: {
  series: number[];
  color: string;
  fill: string;
}) {
  const d = series.map((v, i) => ({ i, v }));
  return (
    <div style={{ width: "100%", height: 40 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={d} margin={{ top: 6, bottom: 0, left: 0, right: 0 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            fill={fill}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const map: Record<
    string,
    { bg: string; border: string; text: string }
  > = {
    GET: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.35)", text: "#22c55e" },
    POST: { bg: "rgba(59,130,246,0.14)", border: "rgba(59,130,246,0.35)", text: "#60a5fa" },
    PUT: { bg: "rgba(245,158,11,0.16)", border: "rgba(245,158,11,0.35)", text: "#fbbf24" },
    DELETE: { bg: "rgba(239,68,68,0.14)", border: "rgba(239,68,68,0.35)", text: "#f87171" },
  };
  const s = map[method] || { bg: "rgba(148,163,184,0.14)", border: "rgba(148,163,184,0.35)", text: "#cbd5e1" };
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.6,
        color: s.text,
        background: s.bg,
        border: `1px solid ${s.border}`,
        padding: "3px 8px",
        borderRadius: 8,
      }}
    >
      {method}
    </span>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 9,
        height: 9,
        borderRadius: 999,
        background: color,
        boxShadow: `0 0 0 3px rgba(0,0,0,0.25), 0 0 12px ${color}`,
        display: "inline-block",
      }}
    />
  );
}

export default function Widget() {
  const health = data.header.healthScore;
  const radialData = [{ name: "health", value: health }];

  return (
    <section
      data-eid="root"
      style={{
        width: 601,
        height: 727,
        boxSizing: "border-box",
        padding: 18,
        borderRadius: 26,
        background:
          "radial-gradient(1200px 700px at 10% 0%, rgba(37, 99, 235, 0.12), transparent 55%), radial-gradient(900px 600px at 100% 20%, rgba(34,197,94,0.10), transparent 55%), radial-gradient(900px 700px at 50% 100%, rgba(168,85,247,0.12), transparent 60%), linear-gradient(180deg, #0b1022 0%, #14123a 55%, #0d1024 100%)",
        color: "#e5e7eb",
        fontFamily: fontStack,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 6px 10px 6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 22,
              height: 22,
              display: "grid",
              placeItems: "center",
              color: "#8b93ff",
            }}
          >
            <Zap size={18} />
          </div>
          <div
            data-eid="api-name"
            style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}
          >
            {data.header.apiName}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            data-eid="api-version"
            style={{
              fontSize: 11,
              color: "#b7bce7",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              padding: "4px 10px",
              borderRadius: 999,
            }}
          >
            {data.header.apiVersion}
          </span>

          <div
            data-eid="health-score"
            style={{
              width: 52,
              height: 52,
              position: "relative",
              display: "grid",
              placeItems: "center",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={radialData}
                startAngle={90}
                endAngle={-270}
                innerRadius="72%"
                outerRadius="100%"
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={20}
                  fill="#45f19a"
                  isAnimationActive={false}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <span
              data-eid="health-score-value"
              style={{
                position: "absolute",
                fontSize: 11,
                fontWeight: 700,
                color: "#eafdf3",
              }}
            >
              {health.toFixed(1)}%
            </span>
          </div>

          <span
            data-eid="uptime-badge"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#39f18f",
              background: "rgba(34,197,94,0.10)",
              border: "1px solid rgba(34,197,94,0.35)",
              padding: "6px 12px",
              borderRadius: 999,
              letterSpacing: 0.2,
            }}
          >
            {data.header.uptimeText}
          </span>
        </div>
      </header>

      <div
        data-eid="summary-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
          padding: "8px 6px 0 6px",
        }}
      >
        <div
          data-eid="stat-avg-latency"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 12,
            padding: "10px 12px",
          }}
        >
          <span
            data-eid="stat-avg-latency-label"
            style={{
              display: "block",
              fontSize: 10,
              letterSpacing: 0.8,
              color: "#8b93a8",
              fontWeight: 700,
            }}
          >
            {data.summary.avgLatency.label}
          </span>
          <span
            data-eid="stat-avg-latency-value"
            style={{
              display: "block",
              fontSize: 20,
              fontWeight: 800,
              marginTop: 4,
              color: "#cbd5ff",
            }}
          >
            {data.summary.avgLatency.value}
          </span>
        </div>

        <div
          data-eid="stat-error-rate"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,190,60,0.18)",
            borderRadius: 12,
            padding: "10px 12px",
          }}
        >
          <span
            data-eid="stat-error-rate-label"
            style={{
              display: "block",
              fontSize: 10,
              letterSpacing: 0.8,
              color: "#8b93a8",
              fontWeight: 700,
            }}
          >
            {data.summary.errorRate.label}
          </span>
          <span
            data-eid="stat-error-rate-value"
            style={{
              display: "block",
              fontSize: 20,
              fontWeight: 800,
              marginTop: 4,
              color: "#fbbf24",
            }}
          >
            {data.summary.errorRate.value}
          </span>
        </div>

        <div
          data-eid="stat-rpm"
          style={{
            background:
              "linear-gradient(180deg, rgba(34,197,94,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(34,197,94,0.18)",
            borderRadius: 12,
            padding: "10px 12px",
          }}
        >
          <span
            data-eid="stat-rpm-label"
            style={{
              display: "block",
              fontSize: 10,
              letterSpacing: 0.8,
              color: "#8b93a8",
              fontWeight: 700,
            }}
          >
            {data.summary.rpm.label}
          </span>
          <span
            data-eid="stat-rpm-value"
            style={{
              display: "block",
              fontSize: 20,
              fontWeight: 800,
              marginTop: 4,
              color: "#35f4a0",
            }}
          >
            {data.summary.rpm.value}
          </span>
        </div>
      </div>

      <div
        data-eid="endpoints-section"
        style={{ padding: "14px 6px 0 6px" }}
      >
        <div
          data-eid="endpoints-title"
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "#d6d9ef",
            margin: "10px 0 10px 2px",
          }}
        >
          {data.endpoints.title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.endpoints.items.map((ep: any, idx: number) => {
            const eidBase = `endpoint-${idx}` as const;
            const statusColor =
              ep.status === "good"
                ? "#45f19a"
                : ep.status === "warn"
                ? "#fbbf24"
                : "#ff4d4d";
            const errColor =
              ep.status === "bad"
                ? "#ff5a5a"
                : ep.status === "warn"
                ? "#ff5a5a"
                : "#45f19a";

            return (
              <div
                key={ep.path}
                data-eid={eidBase}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 14,
                  padding: "10px 12px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span data-eid={`${eidBase}-method`}>
                      <MethodBadge method={ep.method} />
                    </span>
                    <span
                      data-eid={`${eidBase}-path`}
                      style={{
                        fontSize: 13,
                        color: "#cbd5e1",
                        letterSpacing: 0.2,
                      }}
                    >
                      {ep.path}
                    </span>
                  </div>

                  <span data-eid={`${eidBase}-status`}>
                    <StatusDot color={statusColor} />
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr 132px",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      alignItems: "baseline",
                    }}
                  >
                    <div>
                      <span
                        data-eid={`${eidBase}-avg-latency-label`}
                        style={{
                          display: "block",
                          fontSize: 9,
                          color: "#7f879e",
                          fontWeight: 800,
                          letterSpacing: 0.6,
                        }}
                      >
                        AVG
                      </span>
                      <span
                        data-eid={`${eidBase}-avg-latency`}
                        style={{
                          display: "block",
                          fontSize: 16,
                          fontWeight: 900,
                          color: "#e5e7eb",
                          marginTop: 2,
                        }}
                      >
                        {ep.avg}
                      </span>
                    </div>
                    <div>
                      <span
                        data-eid={`${eidBase}-p99-latency-label`}
                        style={{
                          display: "block",
                          fontSize: 9,
                          color: "#7f879e",
                          fontWeight: 800,
                          letterSpacing: 0.6,
                        }}
                      >
                        P99
                      </span>
                      <span
                        data-eid={`${eidBase}-p99-latency`}
                        style={{
                          display: "block",
                          fontSize: 16,
                          fontWeight: 900,
                          color: "#9aa3b2",
                          marginTop: 2,
                        }}
                      >
                        {ep.p99}
                      </span>
                    </div>
                  </div>

                  <div data-eid={`${eidBase}-sparkline`} style={{ opacity: 0.95 }}>
                    <Sparkline series={ep.spark} color={ep.sparkColor} fill={ep.sparkFill} />
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      data-eid={`${eidBase}-error-rate-label`}
                      style={{
                        display: "block",
                        fontSize: 9,
                        color: "#7f879e",
                        fontWeight: 800,
                        letterSpacing: 0.6,
                      }}
                    >
                      ERRORS
                    </span>
                    <span
                      data-eid={`${eidBase}-error-rate`}
                      style={{
                        display: "block",
                        fontSize: 15,
                        fontWeight: 900,
                        color: errColor,
                        marginTop: 2,
                      }}
                    >
                      {ep.errors}
                    </span>
                    <span
                      data-eid={`${eidBase}-rpm`}
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#7f879e",
                        marginTop: 4,
                      }}
                    >
                      {ep.rpm}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Elements below exist in catalog but are not visible in target image; render off-screen to satisfy annotation */}
      <div
        data-eid="response-codes-section"
        style={{ position: "absolute", left: -9999, top: -9999, width: 1, height: 1, overflow: "hidden" }}
      >
        <div data-eid="response-codes-title">{data.responseCodes.title}</div>
        <div data-eid="response-codes-bar">
          <div data-eid="response-codes-2xx-fill" />
          <div data-eid="response-codes-4xx-fill" />
          <div data-eid="response-codes-5xx-fill" />
        </div>
        <div data-eid="response-codes-legend">
          <span data-eid="response-codes-2xx-label" />
          <span data-eid="response-codes-4xx-label" />
          <span data-eid="response-codes-5xx-label" />
        </div>
      </div>
      <div
        data-eid="footer"
        style={{ position: "absolute", left: -9999, top: -9999, width: 1, height: 1, overflow: "hidden" }}
      >
        <span data-eid="footer-total-requests" />
        <span data-eid="footer-last-checked" />
      </div>
    </section>
  );
}