import React from "react";
import data from "./data.json";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const healthChartData = [
  { value: data.healthScore, fill: "#26ff79" },
  { value: 100 - data.healthScore, fill: "#26294d" },
];

const endpointColors = {
  GET: { bg: "#19c37d", fg: "#fff" },
  POST: { bg: "#3b82f6", fg: "#fff" },
  PUT: { bg: "#fac336", fg: "#1a223f" },
  DELETE: { bg: "#f53f3f", fg: "#fff" },
};

const sparkColors = [
  "#38e993",
  "#69b9f8",
  "#ffb734",
  "#fa6455",
  "#38e993",
];

const endpointStatusColors = [
  "#38e993",
  "#38e993",
  "#ffb734",
  "#fa6455",
  "#38e993",
];

const cardBg = "#222547";
const labelColor = "#a6accd";
const borderRadius = 20;

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "linear-gradient(180deg, #232648 0%, #181934 100%)",
        borderRadius,
        color: "#fff",
        maxWidth: 420,
        margin: "0 auto",
        marginTop: 0,
        boxShadow: "0 6px 24px #1d203b70",
        overflow: "hidden",
        paddingBottom: 32,
        border: "none",
      }}
    >
      {/* HEADER */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "24px 28px 0 28px",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 23, marginRight: 10, lineHeight: 1.5 }}>
            <svg
              width="23"
              height="23"
              style={{ verticalAlign: "middle", marginRight: 5 }}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.5 3.5L8 12.5M8 12.5L5 10M8 12.5L11 16"
                stroke="#5780ff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="10"
                cy="10"
                r="8.5"
                stroke="#292c51"
                strokeWidth="2"
              />
            </svg>
          </span>
          <div
            data-eid="api-name"
            style={{ fontWeight: 700, fontSize: 21, letterSpacing: -0.5 }}
          >
            Platform API
          </div>
          <span
            data-eid="api-version"
            style={{
              marginLeft: 14,
              fontSize: 13,
              color: "#a6accd",
              background: "#26285a",
              borderRadius: 9,
              padding: "2px 12px",
              fontWeight: 600,
              marginTop: 2,
              letterSpacing: 0.02,
            }}
          >
            v2.4.1
          </span>
        </div>
        <div
          data-eid="health-score"
          style={{
            position: "relative",
            width: 54,
            height: 54,
            marginRight: 10,
            flexShrink: 0,
            background: "#222547",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveContainer width={54} height={54}>
            <RadialBarChart
              width={54}
              height={54}
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="100%"
              data={healthChartData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                background
                cornerRadius={12}
                barSize={7}
                isAnimationActive={false}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <span
            data-eid="health-score-value"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#e7ecfa",
              letterSpacing: -0.5,
            }}
          >
            {data.healthScore}%
          </span>
        </div>
        <span
          data-eid="uptime-badge"
          style={{
            marginLeft: 2,
            background: "#161e37",
            border: "1px solid #26ff79",
            borderRadius: 11,
            padding: "1.5px 14px 1.5px 11px",
            color: "#26ff79",
            fontWeight: 600,
            fontSize: 13,
            whiteSpace: "nowrap",
            marginTop: 2,
          }}
        >
          {data.uptime} uptime
        </span>
      </header>

      {/* SUMMARY STATS */}
      <div
        data-eid="summary-stats"
        style={{
          display: "flex",
          gap: 18,
          margin: "25px 0 12px 0",
          justifyContent: "space-between",
          padding: "0 28px",
        }}
      >
        <div
          data-eid="stat-avg-latency"
          style={{
            background: cardBg,
            borderRadius: 12,
            padding: "13px 18px 13px 16px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            data-eid="stat-avg-latency-label"
            style={{
              color: labelColor,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 0.7,
              display: "block",
            }}
          >
            AVG LATENCY
          </span>
          <span
            data-eid="stat-avg-latency-value"
            style={{
              fontSize: 22,
              fontWeight: 700,
              display: "block",
              marginTop: 4,
              color: "#e7ecfa",
              letterSpacing: -0.5,
            }}
          >
            {data.summary.avgLatency}
          </span>
        </div>
        <div
          data-eid="stat-error-rate"
          style={{
            background: cardBg,
            borderRadius: 12,
            padding: "13px 18px 13px 16px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            data-eid="stat-error-rate-label"
            style={{
              color: labelColor,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 0.7,
              display: "block",
            }}
          >
            ERROR RATE
          </span>
          <span
            data-eid="stat-error-rate-value"
            style={{
              fontSize: 22,
              fontWeight: 700,
              display: "block",
              marginTop: 4,
              color: "#ffba39",
              letterSpacing: -0.5,
            }}
          >
            {data.summary.errorRate}
          </span>
        </div>
        <div
          data-eid="stat-rpm"
          style={{
            background: cardBg,
            borderRadius: 12,
            padding: "13px 18px 13px 16px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            data-eid="stat-rpm-label"
            style={{
              color: labelColor,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 0.7,
              display: "block",
            }}
          >
            REQUESTS/MIN
          </span>
          <span
            data-eid="stat-rpm-value"
            style={{
              fontSize: 22,
              fontWeight: 700,
              display: "block",
              marginTop: 4,
              color: "#38e993",
              letterSpacing: -0.5,
            }}
          >
            {data.summary.rpm}
          </span>
        </div>
      </div>

      {/* ENDPOINTS */}
      <div
        data-eid="endpoints-section"
        style={{
          padding: "0 20px",
          marginTop: 6,
        }}
      >
        <div
          data-eid="endpoints-title"
          style={{
            color: "#d9e3fb",
            fontWeight: 700,
            fontSize: 16.3,
            padding: "8px 9px 10px 9px",
            letterSpacing: 0.03,
            marginBottom: 7,
          }}
        >
          Endpoints
        </div>
        {data.endpoints.map((ep, i) => (
          <div
            key={i}
            data-eid={`endpoint-${i}`}
            style={{
              background: cardBg,
              borderRadius: 13,
              marginBottom: 12,
              padding: "14px 16px 11px 16px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow:
                i === 2
                  ? "0 0 0 2px #ffb73422"
                  : i === 3
                  ? "0 0 0 2px #fa645555"
                  : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                data-eid={`endpoint-${i}-method`}
                style={{
                  display: "inline-block",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 0.3,
                  borderRadius: 8,
                  padding: "1px 10px 1px 10px",
                  marginRight: 8,
                  background: endpointColors[ep.method].bg,
                  color: endpointColors[ep.method].fg,
                  border: "none",
                }}
              >
                {ep.method}
              </span>
              <span
                data-eid={`endpoint-${i}-path`}
                style={{
                  color: "#f2f6fe",
                  fontWeight: 600,
                  fontSize: 15,
                  fontFamily: "Menlo, monospace",
                  letterSpacing: 0.01,
                  marginRight: 11,
                }}
              >
                {ep.path}
              </span>
              <span
                data-eid={`endpoint-${i}-status`}
                style={{
                  display: "inline-block",
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: endpointStatusColors[i],
                  marginLeft: "auto",
                  marginTop: 1,
                  boxShadow:
                    endpointStatusColors[i] !== "#38e993"
                      ? `0 0 7px ${endpointStatusColors[i]}`
                      : undefined,
                  border:
                    endpointStatusColors[i] === "#ffb734"
                      ? "1.5px solid #fff"
                      : undefined,
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 13 }}>
              <div style={{ marginTop: 6, minWidth: 42 }}>
                <span
                  data-eid={`endpoint-${i}-avg-latency-label`}
                  style={{
                    fontSize: 11,
                    color: labelColor,
                    fontWeight: 500,
                    letterSpacing: 0.01,
                  }}
                >
                  AVG
                </span>
                <br />
                <span
                  data-eid={`endpoint-${i}-avg-latency`}
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {ep.avgLatency}
                </span>
              </div>
              <div style={{ marginTop: 6, minWidth: 54 }}>
                <span
                  data-eid={`endpoint-${i}-p99-latency-label`}
                  style={{
                    fontSize: 11,
                    color: labelColor,
                    fontWeight: 500,
                    letterSpacing: 0.01,
                  }}
                >
                  P99
                </span>
                <br />
                <span
                  data-eid={`endpoint-${i}-p99-latency`}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#a6d7fc",
                  }}
                >
                  {ep.p99Latency}
                </span>
              </div>
              <div
                data-eid={`endpoint-${i}-sparkline`}
                style={{
                  margin: "0 5px",
                  height: 29,
                  width: 80,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={ep.sparkline}>
                    <Line
                      dataKey="val"
                      stroke={sparkColors[i]}
                      dot={false}
                      strokeWidth={2.5}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginLeft: "auto", marginTop: 9 }}>
                <span
                  data-eid={`endpoint-${i}-error-rate-label`}
                  style={{
                    fontSize: 11,
                    color: labelColor,
                    fontWeight: 600,
                    letterSpacing: 0.01,
                  }}
                >
                  ERRORS
                </span>
                <br />
                <span
                  data-eid={`endpoint-${i}-error-rate`}
                  style={{
                    fontSize: 15.5,
                    fontWeight: 700,
                    color:
                      i === 2
                        ? "#ffb734"
                        : i === 3
                        ? "#26ff79"
                        : ep.errorRate !== undefined &&
                          parseFloat(ep.errorRate) > 2
                        ? "#fa6455"
                        : "#38e993",
                  }}
                >
                  {ep.errorRate}
                </span>
              </div>
              <div style={{ marginTop: 12, marginLeft: 15, textAlign: "right" }}>
                <span
                  data-eid={`endpoint-${i}-rpm`}
                  style={{
                    color: labelColor,
                    fontSize: 15.5,
                    fontWeight: 500,
                  }}
                >
                  {ep.rpm} rpm
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RESPONSE CODES */}
      <div
        data-eid="response-codes-section"
        style={{
          margin: "18px 0 0 0",
          padding: "0 28px",
        }}
      >
        <div
          data-eid="response-codes-title"
          style={{
            color: "#d9e3fb",
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 7,
          }}
        >
          Response Codes
        </div>
        <div
          data-eid="response-codes-bar"
          style={{
            background: "#232648",
            width: "100%",
            height: 13,
            borderRadius: 7,
            position: "relative",
            display: "flex",
            overflow: "hidden",
            marginBottom: 6,
          }}
        >
          <div
            data-eid="response-codes-2xx-fill"
            style={{
              background: "#38e993",
              width: `${data.responseCodes["2xx"].pct}%`,
              height: "100%",
            }}
          />
          <div
            data-eid="response-codes-4xx-fill"
            style={{
              background: "#ffb734",
              width: `${data.responseCodes["4xx"].pct}%`,
              height: "100%",
            }}
          />
          <div
            data-eid="response-codes-5xx-fill"
            style={{
              background: "#fa6455",
              width: `${data.responseCodes["5xx"].pct}%`,
              height: "100%",
            }}
          />
        </div>
        <div
          data-eid="response-codes-legend"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 23,
          }}
        >
          <span
            data-eid="response-codes-2xx-label"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3.8,
              fontSize: 14,
              fontWeight: 600,
              color: "#38e993",
            }}
          >
            <span
              style={{
                width: 13,
                height: 5,
                background: "#38e993",
                borderRadius: 3,
                display: "inline-block",
              }}
            />
            2xx {data.responseCodes["2xx"].pct}%
          </span>
          <span
            data-eid="response-codes-4xx-label"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 14,
              fontWeight: 600,
              color: "#ffb734",
            }}
          >
            <span
              style={{
                width: 13,
                height: 5,
                background: "#ffb734",
                borderRadius: 3,
                display: "inline-block",
              }}
            />
            4xx {data.responseCodes["4xx"].pct}%
          </span>
          <span
            data-eid="response-codes-5xx-label"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 14,
              fontWeight: 600,
              color: "#fa6455",
            }}
          >
            <span
              style={{
                width: 13,
                height: 5,
                background: "#fa6455",
                borderRadius: 3,
                display: "inline-block",
              }}
            />
            5xx {data.responseCodes["5xx"].pct}%
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div
        data-eid="footer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
          padding: "6px 28px 0 28px",
          fontSize: 13,
          color: "#a6accd",
        }}
      >
        <span data-eid="footer-total-requests">
          {data.footer.totalRequests} total requests
        </span>
        <span data-eid="footer-last-checked">{data.footer.lastChecked}</span>
      </div>
    </section>
  );
}