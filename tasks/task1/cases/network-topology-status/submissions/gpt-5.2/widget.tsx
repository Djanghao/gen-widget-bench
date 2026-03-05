// submissions/<your-model-name>/widget.tsx
import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { Activity } from "lucide-react";
import data from "./data.json";

type NodeStatus = "green" | "yellow" | "red";

function statusColor(s: NodeStatus) {
  if (s === "green") return "#39d98a";
  if (s === "yellow") return "#f7c948";
  return "#ff5c5c";
}

function barFillColor(s: NodeStatus) {
  if (s === "yellow") return "#f7c948";
  if (s === "red") return "#ff5c5c";
  return "#39d98a";
}

function TierIcon({
  kind,
}: {
  kind: "lb" | "app" | "db";
}) {
  const stroke = "#86a3ff";
  const fill = "none";
  const common = { stroke, strokeWidth: 1.6, fill };
  if (kind === "lb") {
    // shield-ish
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2l7 4v6c0 6-3.5 9.5-7 10-3.5-.5-7-4-7-10V6l7-4z"
          {...common}
        />
      </svg>
    );
  }
  if (kind === "app") {
    // server
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="6" rx="1.6" {...common} />
        <rect x="4" y="13" width="16" height="6" rx="1.6" {...common} />
        <circle cx="8" cy="8" r="0.9" fill={stroke} />
        <circle cx="8" cy="16" r="0.9" fill={stroke} />
      </svg>
    );
  }
  // db cylinder
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="3" {...common} />
      <path d="M5 6v10c0 1.7 3.1 3 7 3s7-1.3 7-3V6" {...common} />
      <path d="M5 11c0 1.7 3.1 3 7 3s7-1.3 7-3" {...common} />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10l5 5 5-5"
        fill="none"
        stroke="#5f76c9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}

function NodeCard({
  eidPrefix,
  hostnameEid,
  ipEid,
  statusEid,
  cpuEid,
  memEid,
  connEid,
  barEid,
  barFillEid,
  node,
  wrapHostname,
}: {
  eidPrefix: string;
  hostnameEid: string;
  ipEid: string;
  statusEid: string;
  cpuEid: string;
  memEid: string;
  connEid: string;
  barEid: string;
  barFillEid: string;
  node: {
    hostname: string;
    ip: string;
    status: NodeStatus;
    cpu: string;
    mem: string;
    conn: string;
    healthPct: number;
  };
  wrapHostname?: boolean;
}) {
  const dot = statusColor(node.status);
  const fill = barFillColor(node.status);

  return (
    <div
      data-eid={eidPrefix}
      style={{
        position: "relative",
        borderRadius: 10,
        padding: 12,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        minHeight: 64,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span
          data-eid={statusEid}
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: dot,
            boxShadow: `0 0 0 2px rgba(0,0,0,0.25)`,
            flex: "0 0 auto",
          }}
        />
        <div
          data-eid={hostnameEid}
          style={{
            color: "#e9eefc",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 0.2,
            lineHeight: "16px",
            whiteSpace: wrapHostname ? "normal" : "nowrap",
          }}
        >
          {node.hostname}
        </div>

        <span
          data-eid={ipEid}
          style={{
            marginLeft: "auto",
            color: "rgba(202,214,255,0.55)",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: 11,
            letterSpacing: 0.2,
          }}
        >
          {node.ip}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "baseline",
          color: "rgba(206,216,255,0.75)",
          fontSize: 11,
          letterSpacing: 0.2,
        }}
      >
        <span>
          CPU{" "}
          <span data-eid={cpuEid} style={{ color: "#dfe7ff", fontWeight: 700 }}>
            {node.cpu}
          </span>
        </span>
        <span>
          Mem{" "}
          <span data-eid={memEid} style={{ color: "#dfe7ff", fontWeight: 700 }}>
            {node.mem}
          </span>
        </span>
        <span style={{ marginLeft: "auto" }}>
          Conn{" "}
          <span data-eid={connEid} style={{ color: "#dfe7ff", fontWeight: 700 }}>
            {node.conn}
          </span>
        </span>
      </div>

      <div
        data-eid={barEid}
        style={{
          marginTop: 8,
          height: 5,
          borderRadius: 999,
          background: "rgba(255,255,255,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          data-eid={barFillEid}
          style={{
            height: "100%",
            width: `${Math.max(2, Math.min(100, node.healthPct))}%`,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${fill}, rgba(255,255,255,0.18))`,
            boxShadow: `0 0 8px rgba(57,217,138,0.25)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Widget() {
  const W = 456;

  const containerStyle: React.CSSProperties = {
    width: W,
    height: 602,
    margin: 0,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
    color: "#e9eefc",
    background:
      "radial-gradient(1200px 700px at 40% -40%, rgba(108,144,255,0.35) 0%, rgba(18,24,55,0.0) 55%), linear-gradient(180deg, #0b1026 0%, #0a0f24 22%, #090d22 100%)",
    borderRadius: 18,
    boxShadow: "0 18px 45px rgba(0,0,0,0.55)",
    position: "relative",
    overflow: "hidden",
  };

  const innerStyle: React.CSSProperties = {
    padding: 18,
  };

  return (
    <section data-eid="root" style={containerStyle}>
      <div style={innerStyle}>
        <header
          data-eid="header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Activity size={18} color="#7ea0ff" />
            <div
              data-eid="title"
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
            >
              {data.title}
            </div>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <span
              data-eid="datacenter-badge"
              style={{
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(211,222,255,0.9)",
                background:
                  "linear-gradient(180deg, rgba(111,140,255,0.18), rgba(111,140,255,0.10))",
                border: "1px solid rgba(143,170,255,0.25)",
              }}
            >
              {data.datacenter}
            </span>
            <span
              data-eid="health-pct"
              style={{
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800,
                color: "#3fe39a",
                background:
                  "linear-gradient(180deg, rgba(57,217,138,0.18), rgba(57,217,138,0.10))",
                border: "1px solid rgba(79,255,170,0.25)",
              }}
            >
              {data.healthPct}
            </span>
          </div>
        </header>

        <div data-eid="tiers-section" style={{ display: "grid", gap: 14 }}>
          {/* Load Balancers */}
          <div
            data-eid="tier-lb"
            style={{
              borderRadius: 14,
              background:
                "linear-gradient(180deg, rgba(130,151,255,0.08), rgba(255,255,255,0.02))",
              border: "1px solid rgba(158,175,255,0.12)",
              padding: 14,
              position: "relative",
            }}
          >
            <div
              data-eid="tier-lb-label"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(191,208,255,0.95)",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: 0.2,
                marginBottom: 10,
              }}
            >
              <TierIcon kind="lb" />
              {data.tiers.lb.label}
            </div>
            <div
              data-eid="tier-lb-nodes"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <NodeCard
                eidPrefix="lb-node-0"
                hostnameEid="lb-node-0-hostname"
                ipEid="lb-node-0-ip"
                statusEid="lb-node-0-status"
                cpuEid="lb-node-0-cpu"
                memEid="lb-node-0-mem"
                connEid="lb-node-0-conn"
                barEid="lb-node-0-bar"
                barFillEid="lb-node-0-bar-fill"
                node={data.tiers.lb.nodes[0]}
              />
              <NodeCard
                eidPrefix="lb-node-1"
                hostnameEid="lb-node-1-hostname"
                ipEid="lb-node-1-ip"
                statusEid="lb-node-1-status"
                cpuEid="lb-node-1-cpu"
                memEid="lb-node-1-mem"
                connEid="lb-node-1-conn"
                barEid="lb-node-1-bar"
                barFillEid="lb-node-1-bar-fill"
                node={data.tiers.lb.nodes[1]}
              />
            </div>
          </div>

          <div
            data-eid="tier-arrow-1"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: -6,
              marginBottom: -6,
              opacity: 0.9,
            }}
          >
            <ChevronDown />
          </div>

          {/* App Servers */}
          <div
            data-eid="tier-app"
            style={{
              borderRadius: 14,
              background:
                "linear-gradient(180deg, rgba(130,151,255,0.08), rgba(255,255,255,0.02))",
              border: "1px solid rgba(158,175,255,0.12)",
              padding: 14,
              position: "relative",
            }}
          >
            <div
              data-eid="tier-app-label"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(191,208,255,0.95)",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: 0.2,
                marginBottom: 10,
              }}
            >
              <TierIcon kind="app" />
              {data.tiers.app.label}
            </div>
            <div
              data-eid="tier-app-nodes"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              <NodeCard
                eidPrefix="app-node-0"
                hostnameEid="app-node-0-hostname"
                ipEid="app-node-0-ip"
                statusEid="app-node-0-status"
                cpuEid="app-node-0-cpu"
                memEid="app-node-0-mem"
                connEid="app-node-0-conn"
                barEid="app-node-0-bar"
                barFillEid="app-node-0-bar-fill"
                node={data.tiers.app.nodes[0]}
                wrapHostname
              />
              <NodeCard
                eidPrefix="app-node-1"
                hostnameEid="app-node-1-hostname"
                ipEid="app-node-1-ip"
                statusEid="app-node-1-status"
                cpuEid="app-node-1-cpu"
                memEid="app-node-1-mem"
                connEid="app-node-1-conn"
                barEid="app-node-1-bar"
                barFillEid="app-node-1-bar-fill"
                node={data.tiers.app.nodes[1]}
                wrapHostname
              />
              <NodeCard
                eidPrefix="app-node-2"
                hostnameEid="app-node-2-hostname"
                ipEid="app-node-2-ip"
                statusEid="app-node-2-status"
                cpuEid="app-node-2-cpu"
                memEid="app-node-2-mem"
                connEid="app-node-2-conn"
                barEid="app-node-2-bar"
                barFillEid="app-node-2-bar-fill"
                node={data.tiers.app.nodes[2]}
                wrapHostname
              />
            </div>
          </div>

          <div
            data-eid="tier-arrow-2"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: -6,
              marginBottom: -6,
              opacity: 0.9,
            }}
          >
            <ChevronDown />
          </div>

          {/* Database */}
          <div
            data-eid="tier-db"
            style={{
              borderRadius: 14,
              background:
                "linear-gradient(180deg, rgba(130,151,255,0.08), rgba(255,255,255,0.02))",
              border: "1px solid rgba(158,175,255,0.12)",
              padding: 14,
              position: "relative",
            }}
          >
            <div
              data-eid="tier-db-label"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(191,208,255,0.95)",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: 0.2,
                marginBottom: 10,
              }}
            >
              <TierIcon kind="db" />
              {data.tiers.db.label}
            </div>
            <div
              data-eid="tier-db-nodes"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <NodeCard
                eidPrefix="db-node-0"
                hostnameEid="db-node-0-hostname"
                ipEid="db-node-0-ip"
                statusEid="db-node-0-status"
                cpuEid="db-node-0-cpu"
                memEid="db-node-0-mem"
                connEid="db-node-0-conn"
                barEid="db-node-0-bar"
                barFillEid="db-node-0-bar-fill"
                node={data.tiers.db.nodes[0]}
              />
              <NodeCard
                eidPrefix="db-node-1"
                hostnameEid="db-node-1-hostname"
                ipEid="db-node-1-ip"
                statusEid="db-node-1-status"
                cpuEid="db-node-1-cpu"
                memEid="db-node-1-mem"
                connEid="db-node-1-conn"
                barEid="db-node-1-bar"
                barFillEid="db-node-1-bar-fill"
                node={data.tiers.db.nodes[1]}
              />
            </div>
          </div>
        </div>

        {/* Network stats */}
        <div
          data-eid="network-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginTop: 14,
          }}
        >
          <div
            data-eid="stat-bandwidth"
            style={{
              borderRadius: 12,
              padding: "12px 14px",
              border: "1px solid rgba(158,175,255,0.12)",
              background:
                "linear-gradient(180deg, rgba(126,160,255,0.12), rgba(255,255,255,0.02))",
            }}
          >
            <span
              data-eid="stat-bandwidth-label"
              style={{
                display: "block",
                color: "rgba(199,213,255,0.72)",
                fontSize: 11,
                letterSpacing: 0.2,
                marginBottom: 6,
              }}
            >
              {data.stats.bandwidth.label}
            </span>
            <span
              data-eid="stat-bandwidth-value"
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#dfe7ff",
              }}
            >
              {data.stats.bandwidth.value}
            </span>
          </div>

          <div
            data-eid="stat-connections"
            style={{
              borderRadius: 12,
              padding: "12px 14px",
              border: "1px solid rgba(158,175,255,0.12)",
              background:
                "linear-gradient(180deg, rgba(54,207,170,0.12), rgba(255,255,255,0.02))",
            }}
          >
            <span
              data-eid="stat-connections-label"
              style={{
                display: "block",
                color: "rgba(199,213,255,0.72)",
                fontSize: 11,
                letterSpacing: 0.2,
                marginBottom: 6,
              }}
            >
              {data.stats.activeConnections.label}
            </span>
            <span
              data-eid="stat-connections-value"
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#7df0c9",
              }}
            >
              {data.stats.activeConnections.value}
            </span>
          </div>

          <div
            data-eid="stat-packet-loss"
            style={{
              borderRadius: 12,
              padding: "12px 14px",
              border: "1px solid rgba(255,210,140,0.14)",
              background:
                "linear-gradient(180deg, rgba(255,189,105,0.14), rgba(255,255,255,0.02))",
            }}
          >
            <span
              data-eid="stat-packet-loss-label"
              style={{
                display: "block",
                color: "rgba(199,213,255,0.72)",
                fontSize: 11,
                letterSpacing: 0.2,
                marginBottom: 6,
              }}
            >
              {data.stats.packetLoss.label}
            </span>
            <span
              data-eid="stat-packet-loss-value"
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#ffd082",
              }}
            >
              {data.stats.packetLoss.value}
            </span>
          </div>
        </div>

        {/* Incidents + chart exist in element catalog; keep minimal but present (hidden to match target crop) */}
        <div data-eid="incidents-section" style={{ display: "none" }}>
          <div data-eid="incidents-title">{data.incidents.title}</div>
          <div data-eid="incident-0">
            <span data-eid="incident-0-severity">{data.incidents.items[0].severity}</span>
            <span data-eid="incident-0-message">{data.incidents.items[0].message}</span>
            <span data-eid="incident-0-time">{data.incidents.items[0].time}</span>
          </div>
          <div data-eid="incident-1">
            <span data-eid="incident-1-severity">{data.incidents.items[1].severity}</span>
            <span data-eid="incident-1-message">{data.incidents.items[1].message}</span>
            <span data-eid="incident-1-time">{data.incidents.items[1].time}</span>
          </div>
          <div data-eid="incident-2">
            <span data-eid="incident-2-severity">{data.incidents.items[2].severity}</span>
            <span data-eid="incident-2-message">{data.incidents.items[2].message}</span>
            <span data-eid="incident-2-time">{data.incidents.items[2].time}</span>
          </div>
        </div>

        <div data-eid="bandwidth-chart" style={{ display: "none" }}>
          <div data-eid="bandwidth-chart-title">{data.bandwidthChart.title}</div>
          <div style={{ width: "100%", height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.bandwidthChart.series}>
                <defs>
                  <linearGradient id="bwFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7ea0ff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#7ea0ff" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,14,34,0.92)",
                    border: "1px solid rgba(158,175,255,0.18)",
                    borderRadius: 10,
                    color: "#e9eefc",
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "rgba(206,216,255,0.8)" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#7ea0ff"
                  strokeWidth={2}
                  fill="url(#bwFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}