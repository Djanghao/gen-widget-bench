import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import data from "./data.json";
import { Cpu, MemoryStick, HardDrive, Network } from "lucide-react";

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 420,
        background: "linear-gradient(160deg, #0f1627 60%, #232247 100%)",
        borderRadius: 22,
        padding: 24,
        fontFamily: "Inter, sans-serif",
        color: "white",
        boxShadow: "0 4px 24px 0 rgba(16,24,40,.07)",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
          gap: 14,
        }}
      >
        <div
          data-eid="cluster-name"
          style={{
            fontWeight: 700,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
            letterSpacing: 0.1,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            style={{ marginRight: 2 }}
          >
            <path
              d="M5 11c0-2.5 2-7 6-7s6 4.5 6 7M5 11h2c1 0 2 1 2 2s-1 2-2 2h-.5M5 11v2c0 .5.5 1 .5 1.5M5 13c0 .5-.5 1-1 1H3.5c-.5 0-.5.5-.5 1s.5 1 .5 1h12.5"
              stroke="#7eb2ff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Production Cluster
        </div>
        <span
          data-eid="status-badge"
          style={{
            background:
              "linear-gradient(90deg, #15b47a 80%, #46e39e 120%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 16,
            padding: "3px 16px",
            marginLeft: 10,
            letterSpacing: 0.1,
            boxShadow: "0 1.5px 4px 0 rgba(33, 183, 125, 0.11)",
          }}
        >
          Healthy
        </span>
        <span
          data-eid="uptime-badge"
          style={{
            background: "#4441ab",
            color: "#eaeaff",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 16,
            padding: "3px 13px",
            marginLeft: "auto",
            letterSpacing: 0.1,
          }}
        >
          99.97% uptime
        </span>
      </header>
      {/* Grid */}
      <div
        data-eid="metrics-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: 16,
          marginBottom: 18,
        }}
      >
        {/* CPU */}
        <div
          data-eid="card-cpu"
          style={{
            background:
              "linear-gradient(140deg, #191d3b 60%, #2d3289 100%)",
            borderRadius: 14,
            padding: 17,
            boxShadow: "0 1.5px 2.5px 0 rgba(34,54,120,0.07)",
            display: "flex",
            flexDirection: "column",
            minHeight: 106,
          }}
        >
          <span
            data-eid="cpu-icon"
            style={{
              color: "#7eb2ff",
              fontSize: 18,
              marginBottom: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Cpu size={16} strokeWidth={1.5} />
          </span>
          <span
            data-eid="cpu-label"
            style={{
              fontWeight: 500,
              fontSize: 13.5,
              marginBottom: 4,
              color: "#b7c1eb",
              marginTop: 2,
            }}
          >
            CPU Usage
          </span>
          <div
            data-eid="cpu-value"
            style={{
              fontWeight: 800,
              fontSize: 28,
              margin: "3px 0 -7px 0",
              color: "#eaeaff",
              lineHeight: 1,
            }}
          >
            {data.cpu.value}
          </div>
          <div
            data-eid="cpu-sparkline"
            style={{
              marginTop: 10,
              height: 32,
              width: "100%",
              position: "relative",
            }}
          >
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={data.cpu.history}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#7eb2ff"
                  strokeWidth={2}
                  fill="url(#cpuGradient)"
                  dot={false}
                  isAnimationActive={false}
                />
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7eb2ff" stopOpacity={0.31} />
                    <stop offset="100%" stopColor="#22284e" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Memory */}
        <div
          data-eid="card-memory"
          style={{
            background:
              "linear-gradient(130deg, #18243d 60%, #003831 100%)",
            borderRadius: 14,
            padding: 17,
            boxShadow: "0 1.5px 2.5px 0 rgba(34,54,120,0.07)",
            display: "flex",
            flexDirection: "column",
            minHeight: 106,
          }}
        >
          <span
            data-eid="memory-icon"
            style={{
              color: "#14e7b2",
              fontSize: 16,
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <MemoryStick size={16} strokeWidth={1.5} />
          </span>
          <span
            data-eid="memory-label"
            style={{
              fontWeight: 500,
              fontSize: 13.5,
              color: "#87efea",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Memory
          </span>
          <div
            data-eid="memory-value"
            style={{
              fontWeight: 800,
              fontSize: 24,
              color: "#23fee2",
              lineHeight: 1.2,
            }}
          >
            {data.memory.used} <span style={{ color: "#b3e9df", fontWeight: 600, fontSize: 16 }}>/ {data.memory.total} GB</span>
          </div>
          {/* Memory bar */}
          <div
            data-eid="memory-bar"
            style={{
              marginTop: 11,
              height: 10,
              background: "#1d2a39",
              width: "100%",
              borderRadius: 7,
              position: "relative",
            }}
          >
            <div
              data-eid="memory-bar-fill"
              style={{
                width: `${(data.memory.used / data.memory.total) * 100}%`,
                background:
                  "linear-gradient(90deg,#14e7b2 60%,#13e6e5 100%)",
                height: "100%",
                borderRadius: 7,
                boxShadow: "0 0 3px 0 #13e6e580",
              }}
            />
          </div>
        </div>
        {/* Disk */}
        <div
          data-eid="card-disk"
          style={{
            background:
              "linear-gradient(130deg, #2c2331 60%, #453a1e 100%)",
            borderRadius: 14,
            padding: 17,
            boxShadow: "0 1.5px 2.5px 0 rgba(34,54,120,0.07)",
            display: "flex",
            flexDirection: "column",
            minHeight: 106,
          }}
        >
          <span
            data-eid="disk-icon"
            style={{
              color: "#ffc857",
              fontSize: 17,
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <HardDrive size={16} strokeWidth={1.5} />
          </span>
          <span
            data-eid="disk-label"
            style={{
              fontWeight: 500,
              fontSize: 13.5,
              color: "#ffe7ac",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Disk
          </span>
          <div
            data-eid="disk-value"
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: "#ffc857",
              lineHeight: 1.3,
            }}
          >
            {data.disk.used} <span style={{ color: "#b7a886", fontWeight: 700, fontSize: 16 }}>/ {data.disk.total} GB</span>
          </div>
          {/* Disk bar */}
          <div
            data-eid="disk-bar"
            style={{
              marginTop: 11,
              height: 10,
              background: "#292a36",
              width: "100%",
              borderRadius: 7,
              position: "relative",
            }}
          >
            <div
              data-eid="disk-bar-fill"
              style={{
                width: `${(data.disk.used / data.disk.total) * 100}%`,
                background:
                  "linear-gradient(90deg,#ffc857 30%,#b39e70 100%)",
                height: "100%",
                borderRadius: 7,
                boxShadow: "0 0 2px 0 #ffc85788",
              }}
            />
          </div>
        </div>
        {/* Network */}
        <div
          data-eid="card-network"
          style={{
            background:
              "linear-gradient(130deg, #271c2b 65%, #5e1e56 100%)",
            borderRadius: 14,
            padding: 17,
            boxShadow: "0 1.5px 2.5px 0 rgba(34,54,120,0.07)",
            display: "flex",
            flexDirection: "column",
            minHeight: 106,
          }}
        >
          <span
            data-eid="network-icon"
            style={{
              color: "#f34cce",
              fontSize: 17,
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Network size={16} strokeWidth={1.5} />
          </span>
          <span
            data-eid="network-label"
            style={{
              fontWeight: 500,
              fontSize: 13.5,
              color: "#ffb1ef",
              marginTop: 2,
              marginBottom: 3,
            }}
          >
            Network
          </span>
          <div
            data-eid="network-value"
            style={{
              fontWeight: 800,
              fontSize: 26,
              color: "#fd90ef",
              lineHeight: 1.17,
            }}
          >
            {data.network.value} <span style={{ color: "#ffb1ef", fontWeight: 700, fontSize: 14 }}>Mbps</span>
          </div>
          <div
            data-eid="network-sparkline"
            style={{
              marginTop: 10,
              height: 32,
              width: "100%",
              position: "relative",
            }}
          >
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={data.network.history}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#fd90ef"
                  strokeWidth={2}
                  fill="url(#networkGradient)"
                  dot={false}
                  isAnimationActive={false}
                />
                <defs>
                  <linearGradient id="networkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fd90ef" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#210016" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Alerts Section */}
      <div
        data-eid="alerts-section"
        style={{
          marginTop: 2,
          background: "none",
          borderRadius: 14,
        }}
      >
        <div
          data-eid="alerts-title"
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#b2bde7",
            marginBottom: 12,
            letterSpacing: 0.2,
          }}
        >
          Recent Alerts
        </div>
        {/* Alert 0 */}
        <div
          data-eid="alert-0"
          style={{
            background: "linear-gradient(90deg, #222034 80%, #7e252d 120%)",
            borderRadius: 10,
            padding: "9px 15px 9px 13px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 11,
            fontSize: 15,
            boxShadow: "0 0.5px 2px 0 rgba(222,0,55,.07)",
          }}
        >
          <span
            data-eid="alert-0-severity"
            style={{
              background:
                "linear-gradient(90deg, #cc2646 70%, #fc3a53 100%)",
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 700,
              borderRadius: 6,
              padding: "2px 9px",
              marginRight: 2,
              boxShadow: "0 1.5px 8px 0 #cc264622",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width={14} height={14} style={{marginRight:3}} viewBox="0 0 18 18"><circle cx="9" cy="9" r="8.1" stroke="#fff" strokeWidth="1.5" fill="none"/><circle cx="9" cy="9" r="4.3" fill="#fff" opacity="0.38"/><circle cx="9" cy="9" r="1.7" fill="#fff"/></svg> 
            Critical
          </span>
          <span
            data-eid="alert-0-message"
            style={{
              flex: 1,
              color: "#e2e2f2",
              fontSize: 14.7,
            }}
          >
            Node us-east-2b CPU exceeded 95% threshold
          </span>
          <span style={{ color: "#8597c1", fontWeight: 500, fontSize: 13 }}>
            12m ago
          </span>
        </div>
        {/* Alert 1 */}
        <div
          data-eid="alert-1"
          style={{
            background: "linear-gradient(90deg, #273427 80%, #6a6411 120%)",
            borderRadius: 10,
            padding: "9px 15px 9px 13px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 11,
            fontSize: 15,
          }}
        >
          <span
            data-eid="alert-1-severity"
            style={{
              background:
                "linear-gradient(90deg, #ffd941 70%, #e3b513 100%)",
              color: "#23200c",
              fontSize: 13.5,
              fontWeight: 700,
              borderRadius: 6,
              padding: "2px 9px",
              marginRight: 2,
              display: "flex",
              alignItems: "center",
              gap: 4,
              boxShadow: "0 1.5px 8px 0 #ffd94122",
            }}
          >
            <svg width={14} height={14} style={{marginRight:3}} viewBox="0 0 18 18"><circle cx="9" cy="9" r="8.1" stroke="#23200c" strokeWidth="1.5" fill="none"/><circle cx="9" cy="9" r="4.3" fill="#e2b600" opacity="0.38"/><circle cx="9" cy="9" r="1.7" fill="#ffdb40" /></svg>
            Warning
          </span>
          <span
            data-eid="alert-1-message"
            style={{
              flex: 1,
              color: "#efedcb",
              fontSize: 14.7,
            }}
          >
            Disk I/O latency above 200ms on vol-0x7a3f
          </span>
          <span style={{ color: "#c4b870", fontWeight: 500, fontSize: 13 }}>
            48m ago
          </span>
        </div>
        {/* Alert 2 */}
        <div
          data-eid="alert-2"
          style={{
            background: "linear-gradient(90deg, #202a45 80%, #234588 120%)",
            borderRadius: 10,
            padding: "9px 15px 9px 13px",
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 11,
            fontSize: 15,
          }}
        >
          <span
            data-eid="alert-2-severity"
            style={{
              background: "linear-gradient(90deg, #245acf 60%, #267cf4 100%)",
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 700,
              borderRadius: 6,
              padding: "2px 10px",
              marginRight: 2,
              boxShadow: "0 1.5px 8px 0 #267cf466",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width={14} height={14} style={{marginRight:3}} viewBox="0 0 18 18"><circle cx="9" cy="9" r="8.1" stroke="#fff" strokeWidth="1.5" fill="none"/><circle cx="9" cy="9" r="4.3" fill="#b8e1ff" opacity="0.38"/><circle cx="9" cy="9" r="1.7" fill="#b8e1ff" /></svg>
            Info
          </span>
          <span
            data-eid="alert-2-message"
            style={{
              flex: 1,
              color: "#bfdcff",
              fontSize: 14.7,
            }}
          >
            Auto-scaling group expanded to 8 instances
          </span>
          <span style={{ color: "#618aca", fontWeight: 500, fontSize: 13 }}>
            2h ago
          </span>
        </div>
      </div>
    </section>
  );
}