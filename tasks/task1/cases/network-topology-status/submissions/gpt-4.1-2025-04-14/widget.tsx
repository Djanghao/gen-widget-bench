import React from "react";
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Database, Layers, Server } from "lucide-react";
import data from "./data.json";

const statusDotColor = (color: string) => ({
  display: "inline-block",
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: color,
  marginRight: 6,
  marginBottom: "-1px"
});
const healthBarColors = {
  green: "#26de81",
  yellow: "#ffd141",
  red: "#ff5a5f",
};
const severityColors = {
  critical: "#fe4858",
  warning: "#ffd141",
  info: "#48c7f7",
};
export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 600,
        borderRadius: 20,
        background: "linear-gradient(180deg, #181c36 0%, #211e3c 100%)",
        boxShadow: "0 8px 32px 0 rgba(18,19,34,0.18)",
        padding: 0,
        fontFamily: "Inter, sans-serif",
        color: "#fff",
        margin: "0 auto",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "26px 28px 18px 22px",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        {/* Left: Title */}
        <div data-eid="title" style={{ fontWeight: 700, fontSize: 24, display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <svg width="21" height="21" style={{marginRight: 6, color: "#809af5"}}><path d="M4.5 12C4.776 12 5 11.776 5 11.5V8.5C5 8.224 4.776 8 4.5 8C4.224 8 4 8.224 4 8.5V11.5C4 11.776 4.224 12 4.5 12ZM10.5 16C10.776 16 11 15.776 11 15.5V4.5C11 4.224 10.776 4 10.5 4C10.224 4 10 4.224 10 4.5V15.5C10 15.776 10.224 16 10.5 16ZM16.5 9C16.776 9 17 8.776 17 8.5V13.5C17 13.776 16.776 14 16.5 14C16.224 14 16 13.776 16 13.5V8.5C16 8.224 16.224 8 16.5 8Z" fill="#809af5"></path></svg>
          Network Topology
        </div>
        {/* Center: Datacenter badge */}
        <span
          data-eid="datacenter-badge"
          style={{
            marginLeft: 0,
            marginRight: 12,
            padding: "4px 16px",
            fontWeight: 600,
            borderRadius: 14,
            fontSize: 15,
            letterSpacing: "-0.2px",
            background: "#26265a",
            color: "#97b8ff",
            border: "1.3px solid #37418e"
          }}
        >
          {data.datacenter}
        </span>
        {/* Health percentage badge */}
        <span
          data-eid="health-pct"
          style={{
            padding: "4px 16px",
            fontWeight: 600,
            borderRadius: 14,
            fontSize: 15,
            background: "linear-gradient(90deg, #27e09a 0%, #18cb57 85%)",
            color: "#1c2c23",
            border: "1.3px solid #20e396"
          }}
        >
          {data.health_pct} Health
        </span>
      </header>
      {/* Network tiers */}
      <div data-eid="tiers-section" style={{padding: "0 16px", position: "relative"}}>
        {/* Load Balancers */}
        <div data-eid="tier-lb"
          style={{
            background: "rgba(37,34,83,0.98)",
            border: "1.5px solid #353568",
            borderRadius: 17,
            margin: "18px 0 0 0",
            boxShadow: "0 2px 12px 0 rgba(22,30,60,0.07)",
          }}>
          <div data-eid="tier-lb-label"
          style={{
            fontWeight: 600,
            fontSize: 17,
            color: "#8fa6f2",
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "12px 20px 2px 17px"
          }}>
            <svg width="17" height="17"><rect x="2" y="3" width="13" height="11" rx="5.5" fill="none" stroke="#809af5" strokeWidth="2"/></svg>
            Load Balancers
          </div>
          <div data-eid="tier-lb-nodes" style={{display: "flex", gap: 14, padding: "5px 15px 14px 11px"}}>
            {data.tiers.lb.map((node, idx) =>
              <div data-eid={`lb-node-${idx}`} key={idx} style={{
                flex: 1,
                background: "#282954",
                borderRadius: 12,
                minWidth: 0,
                boxShadow: "0 1px 6px 0 rgba(22,30,60,0.03)",
                padding: "12px 12px 10px 15px",
                position: "relative"
              }}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                  <div data-eid={`lb-node-${idx}-hostname`}
                    style={{fontWeight: 700, fontSize: 15, color: "#d6e1fe", display:"flex", alignItems:"center"}}
                  >
                    <span data-eid={`lb-node-${idx}-status`} style={statusDotColor("#29ed81")}></span>
                    {node.hostname}
                  </div>
                  <span data-eid={`lb-node-${idx}-ip`} style={{color:"#b6bbcc", fontSize:13, fontWeight: 500, letterSpacing:"0.2px"}}>{node.ip}</span>
                </div>
                {/* Stats line */}
                <div style={{
                  marginTop: 6,
                  display: "flex",
                  gap: 8,
                  fontSize: 13,
                  color: "#aab7ed",
                  fontWeight: 600,
                }}>
                  <span data-eid={`lb-node-${idx}-cpu`}>CPU <span style={{color:"#51c3f7"}}>{node.cpu}</span></span>
                  <span data-eid={`lb-node-${idx}-mem`}>Mem <span style={{color:"#d7a7f8"}}>{node.mem}</span></span>
                  <span data-eid={`lb-node-${idx}-conn`}>Conn <span style={{color:"#8ff3b7"}}>{node.conn}</span></span>
                </div>
                {/* Health bar */}
                <div data-eid={`lb-node-${idx}-bar`} style={{marginTop: 7, height: 6, background: "#232341", borderRadius: 6, width:"100%"}}>
                  <div
                    data-eid={`lb-node-${idx}-bar-fill`}
                    style={{height: 6, borderRadius: 6, background: healthBarColors.green, width: node.health_pct, transition: "width 0.2s"}}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Arrow */}
        <div data-eid="tier-arrow-1" style={{width:"100%", textAlign: "center", margin: "1px 0"}}>
          <svg width="40" height="17">
            <path d="M20 3 v6.5" stroke="#3b458c" strokeWidth="2" strokeLinecap="round"/>
            <polygon points="15,9 25,9 20,14" fill="#575cb6"/>
          </svg>
        </div>
        {/* App Servers */}
        <div data-eid="tier-app"
          style={{
            background: "rgba(37,34,83,0.98)",
            border: "1.5px solid #353568",
            borderRadius: 17,
            margin: "2px 0 0 0",
            boxShadow: "0 2px 12px 0 rgba(22,30,60,0.07)",
          }}>
          <div data-eid="tier-app-label"
          style={{
            fontWeight: 600,
            fontSize: 17,
            color: "#8fa6f2",
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "12px 20px 2px 17px"
          }}>
            <svg width="17" height="17"><rect x="2" y="3" width="13" height="11" rx="4" fill="none" stroke="#809af5" strokeWidth="2"/></svg>
            App Servers
          </div>
          <div data-eid="tier-app-nodes" style={{display: "flex", gap: 14, padding: "5px 10px 14px 9px"}}>
            {data.tiers.app.map((node, idx) =>
              <div data-eid={`app-node-${idx}`} key={idx} style={{
                flex: 1,
                background: "#282954",
                borderRadius: 12,
                minWidth: 0,
                boxShadow: "0 1px 6px 0 rgba(22,30,60,0.03)",
                padding: "12px 12px 10px 15px",
                position: "relative"
              }}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                  <div data-eid={`app-node-${idx}-hostname`}
                    style={{fontWeight: 700, fontSize: 15, color: "#d6e1fe", display:"flex", alignItems:"center"}}
                  >
                    <span data-eid={`app-node-${idx}-status`}
                      style={statusDotColor(node.status === "yellow" ? "#ffd141" : "#29ed81")}
                    ></span>
                    {node.hostname}
                  </div>
                  <span data-eid={`app-node-${idx}-ip`} style={{color:"#b6bbcc", fontSize:13, fontWeight: 500, letterSpacing:"0.2px"}}>{node.ip}</span>
                </div>
                {/* Stats */}
                <div style={{
                  marginTop: 6,
                  display: "flex",
                  gap: 8,
                  fontSize: 13,
                  color: "#aab7ed",
                  fontWeight: 600,
                }}>
                  <span data-eid={`app-node-${idx}-cpu`}>CPU <span style={{color:"#51c3f7"}}>{node.cpu}</span></span>
                  <span data-eid={`app-node-${idx}-mem`}>Mem <span style={{color:"#d7a7f8"}}>{node.mem}</span></span>
                  <span data-eid={`app-node-${idx}-conn`}>Conn <span style={{color:"#8ff3b7"}}>{node.conn}</span></span>
                </div>
                {/* Health bar */}
                <div data-eid={`app-node-${idx}-bar`} style={{marginTop: 7, height: 6, background: "#232341", borderRadius: 6, width:"100%"}}>
                  <div
                    data-eid={`app-node-${idx}-bar-fill`}
                    style={{
                      height: 6,
                      borderRadius: 6,
                      background: node.status === "yellow" ? healthBarColors.yellow : healthBarColors.green,
                      width: node.health_pct,
                      transition: "width 0.2s"
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Arrow */}
        <div data-eid="tier-arrow-2" style={{width:"100%", textAlign: "center", margin: "1px 0"}}>
          <svg width="40" height="17">
            <path d="M20 3 v6.5" stroke="#3b458c" strokeWidth="2" strokeLinecap="round"/>
            <polygon points="15,9 25,9 20,14" fill="#575cb6"/>
          </svg>
        </div>
        {/* Database */}
        <div data-eid="tier-db"
          style={{
            background: "rgba(37,34,83,0.98)",
            border: "1.5px solid #353568",
            borderRadius: 17,
            margin: "2px 0 0 0",
            boxShadow: "0 2px 12px 0 rgba(22,30,60,0.07)",
          }}>
          <div data-eid="tier-db-label"
          style={{
            fontWeight: 600,
            fontSize: 17,
            color: "#8fa6f2",
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "12px 20px 2px 17px"
          }}>
            <svg width="17" height="17"><rect x="2.5" y="6" width="12" height="5" rx="2.2" fill="none" stroke="#809af5" strokeWidth="2"/></svg>
            Database
          </div>
          <div data-eid="tier-db-nodes" style={{display: "flex", gap: 14, padding: "5px 15px 14px 11px"}}>
            {data.tiers.db.map((node, idx) =>
              <div data-eid={`db-node-${idx}`} key={idx} style={{
                flex: 1,
                background: "#282954",
                borderRadius: 12,
                minWidth: 0,
                boxShadow: "0 1px 6px 0 rgba(22,30,60,0.03)",
                padding: "12px 12px 10px 15px",
                position: "relative"
              }}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                  <div data-eid={`db-node-${idx}-hostname`}
                      style={{fontWeight: 700, fontSize: 15, color: "#d6e1fe", display:"flex", alignItems:"center"}}>
                    <span data-eid={`db-node-${idx}-status`} style={statusDotColor("#29ed81")}></span>
                    {node.hostname}
                  </div>
                  <span data-eid={`db-node-${idx}-ip`} style={{color:"#b6bbcc", fontSize:13, fontWeight: 500, letterSpacing:"0.2px"}}>{node.ip}</span>
                </div>
                {/* Stats */}
                <div style={{
                  marginTop: 6,
                  display: "flex",
                  gap: 8,
                  fontSize: 13,
                  color: "#aab7ed",
                  fontWeight: 600,
                }}>
                  <span data-eid={`db-node-${idx}-cpu`}>CPU <span style={{color:"#51c3f7"}}>{node.cpu}</span></span>
                  <span data-eid={`db-node-${idx}-mem`}>Mem <span style={{color:"#d7a7f8"}}>{node.mem}</span></span>
                  <span data-eid={`db-node-${idx}-conn`}>Conn <span style={{color:"#8ff3b7"}}>{node.conn}</span></span>
                </div>
                {/* Health bar */}
                <div data-eid={`db-node-${idx}-bar`} style={{marginTop: 7, height: 6, background: "#232341", borderRadius: 6, width:"100%"}}>
                  <div
                    data-eid={`db-node-${idx}-bar-fill`}
                    style={{
                      height: 6,
                      borderRadius: 6,
                      background: healthBarColors.green,
                      width: node.health_pct,
                      transition: "width 0.2s"
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Network stats */}
      <div data-eid="network-stats"
        style={{
          display: "flex",
          gap: 18,
          margin: "24px 23px 0 27px",
          justifyContent: "stretch",
        }}>
        {/* Bandwidth */}
        <div data-eid="stat-bandwidth"
          style={{
            flex: 1,
            background: "#232651",
            borderRadius: 13,
            padding: "17px 0",
            textAlign: "center",
          }}>
          <span data-eid="stat-bandwidth-label"
            style={{
              display: "block",
              color: "#b7bebe",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 2
            }}>Bandwidth</span>
          <span data-eid="stat-bandwidth-value"
            style={{
              display: "block",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.7px",
            }}>{data.stats.bandwidth}</span>
        </div>
        {/* Connections */}
        <div data-eid="stat-connections"
          style={{
            flex: 1,
            background: "#15263e",
            borderRadius: 13,
            padding: "17px 0",
            textAlign: "center",
          }}>
          <span data-eid="stat-connections-label"
            style={{
              display: "block",
              color: "#64dcff",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 2,
            }}>Active Conn.</span>
          <span data-eid="stat-connections-value"
            style={{
              display: "block",
              fontSize: 26,
              fontWeight: 800,
              color: "#4af39b",
              letterSpacing:"-0.7px",
            }}>{data.stats.connections}</span>
        </div>
        {/* Packet Loss */}
        <div data-eid="stat-packet-loss"
          style={{
            flex: 1,
            background: "#22202c",
            borderRadius: 13,
            padding: "17px 0",
            textAlign: "center",
            border: "1.1px solid #f7dba0",
            boxShadow: "0 0 8px rgba(255,200,74,0.04)",
          }}>
          <span data-eid="stat-packet-loss-label"
            style={{
              display: "block",
              color: "#ffd178",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 2,
            }}>Packet Loss</span>
          <span data-eid="stat-packet-loss-value"
            style={{
              display: "block",
              fontSize: 26,
              fontWeight: 700,
              color: "#ffa11a",
              letterSpacing:"-0.7px",
            }}>{data.stats.packet_loss}</span>
        </div>
      </div>
      {/* Incidents */}
      <div data-eid="incidents-section"
        style={{
          margin: "27px 26px 0 26px",
        }}>
        <div data-eid="incidents-title" style={{fontSize: 16, fontWeight: 700, color: "#7f8fcf", marginBottom: 3, letterSpacing:"0.01em"}}>
          Recent Incidents
        </div>
        {data.incidents.map((incident, idx) =>
          <div data-eid={`incident-${idx}`} key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 0 2px 0",
            }}>
            <span data-eid={`incident-${idx}-severity`}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: severityColors[incident.severity],
                background: `${severityColors[incident.severity]}1A`,
                borderRadius: 7,
                padding: "2px 10px",
                marginRight: 12,
                minWidth: 57,
                textAlign:"center",
                letterSpacing:"0.01em"
              }}
            >
              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
            </span>
            <span data-eid={`incident-${idx}-message`}
              style={{fontSize: 14, color:"#dadcf2", fontWeight: 500, flex: 1}}
            >{incident.message}</span>
            <span data-eid={`incident-${idx}-time`} style={{
              color: "#7f8fcf",
              fontSize: 13,
              minWidth: 52,
              fontWeight: 600,
              marginLeft: 10,
              letterSpacing:"0.02em",
              textAlign:"right"
            }}>{incident.time}</span>
          </div>
        )}
      </div>
      {/* Bandwidth chart */}
      <div data-eid="bandwidth-chart"
        style={{
          margin: "22px 0 0 0",
          background: "#181c36",
          borderRadius: "0 0 20px 20px",
          padding: "18px 27px 17px 27px",
        }}>
        <div data-eid="bandwidth-chart-title" style={{
          fontSize: 15,
          color: "#70aeff",
          fontWeight: 600,
          marginBottom: 8,
          letterSpacing:"0.02em"
        }}>Bandwidth (24h)</div>
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={data.bandwidth_chart} margin={{left:0, right:0, top:0, bottom:0}}>
            <defs>
              <linearGradient id="chartarea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#3193ef" stopOpacity={0.52}/>
                <stop offset="100%" stopColor="#202b72" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3193ef"
              strokeWidth={2.5}
              fill="url(#chartarea)"
              dot={false}
              isAnimationActive={false}
            />
            <XAxis dataKey="time" hide={true}/>
            <YAxis hide={true} domain={['dataMin', 'dataMax']}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}