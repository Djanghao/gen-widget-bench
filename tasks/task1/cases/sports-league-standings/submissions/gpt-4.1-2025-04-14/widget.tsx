import React from "react";
import data from "./data.json";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const zoneStyles = {
  "CL": { background: "rgba(21, 79, 183, 0.12)" },
  "relegation": { background: "rgba(186, 43, 43, 0.13)" },
};

const rankIndicatorStyles = {
  "CL": { color: "#296fff" },
  "relegation": { color: "#ea515e" },
};

const formDotColor = {
  W: "#18db7a",
  D: "#32b7ea",
  L: "#ea515e",
};

function FormDots({ form }: { form: string[] }) {
  // each char in form is 'W'/'D'/'L'
  return (
    <div style={{ display: "flex", gap: 3 }}>{
      form.map((f, idx) => (
        <span key={idx}
          style={{
            display: "inline-block",
            width: 10, height: 10, borderRadius: "50%",
            background: formDotColor[f] || "#fff",
            border: f === "L" ? "1px solid #b63434" : undefined
          }} />
      ))
    }</div>
  );
}

const chartBarColors = (index: number) => {
  if (index <= 3) return "#296fff"; // top 4: blue
  if (index >= data.teams.length - 3) return "#ea515e"; // last 3: red
  return "#677b94"; // mid: grayish
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        fontFamily: "Inter,sans-serif",
        background:
          "linear-gradient(180deg,#202437 76%,#e6eefd 100%)",
        borderRadius: 20,
        maxWidth: 500,
        width: 100 + "%",
        padding: 24,
        margin: "0 auto",
        boxShadow: "0 2px 12px 0 #02184008",
        color: "#fff",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ display: "inline-block", color: "#ffc33c", fontSize: 21, marginRight: 7, verticalAlign: "middle" }}>
            {/* trophy emoji */}
            🏆
          </span>
          <div data-eid="league-name" style={{ fontWeight: 600, fontSize: 20, letterSpacing: 0.2 }}>
            Premier League
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <span
            data-eid="season-badge"
            style={{
              background: "#2940d3",
              color: "#d5e1ff",
              padding: "4px 13px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              minWidth: 0,
            }}
          >
            2025-26
          </span>
          <span
            data-eid="matchday-badge"
            style={{
              background: "#ffe281",
              color: "#292823",
              padding: "4px 13px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              minWidth: 0,
            }}
          >
            Matchday 28
          </span>
        </div>
      </header>

      {/* Legend */}
      <div data-eid="legend-row" style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        fontSize: 13,
        marginBottom: 3,
        color: "#99b0c6",
        fontWeight: 500,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }} data-eid="legend-cl">
          <span style={{
            display: "inline-block", width: 17, height: 3, background: "#296fff",
            borderRadius: 2, marginRight: 1,
          }} />
          Champions League
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }} data-eid="legend-relegation">
          <span style={{
            display: "inline-block", width: 17, height: 3, background: "#ea515e",
            borderRadius: 2, marginRight: 1,
          }} />
          Relegation
        </span>
      </div>

      {/* Standings Table */}
      <div data-eid="table-section" style={{
        background: "rgba(13,15,29,0.52)",
        borderRadius: 11,
        overflow: "hidden",
        boxShadow: "0 1px 2.5px #01133605",
        marginTop: 5,
      }}>

        {/* Table Header */}
        <div data-eid="table-header"
          style={{
            display: "flex", alignItems: "center",
            padding: "7px 0 7px 0", fontSize: 12.7,
            fontWeight: 600,
            color: "#a9bad5",
            borderBottom: "1px solid #253046",
            letterSpacing: 0.14
          }}
        >
          <span data-eid="table-header-rank" style={{ width: 20, textAlign: "center" }}>#</span>
          <span data-eid="table-header-team" style={{ flex: 1.55, paddingLeft: 4 }}>TEAM</span>
          <span data-eid="table-header-mp" style={{ width: 28, textAlign: "center" }}>MP</span>
          <span data-eid="table-header-w" style={{ width: 22, textAlign: "center" }}>W</span>
          <span data-eid="table-header-d" style={{ width: 22, textAlign: "center" }}>D</span>
          <span data-eid="table-header-l" style={{ width: 22, textAlign: "center" }}>L</span>
          <span data-eid="table-header-gf" style={{ width: 27, textAlign: "center" }}>GF</span>
          <span data-eid="table-header-ga" style={{ width: 27, textAlign: "center" }}>GA</span>
          <span data-eid="table-header-gd" style={{ width: 33, textAlign: "center" }}>GD</span>
          <span data-eid="table-header-pts" style={{ width: 28, textAlign: "center" }}>PTS</span>
          <span data-eid="table-header-form" style={{ width: 60, textAlign: "center" }}>FORM</span>
        </div>

        {/* Table Body Rows */}
        {data.teams.map((team, idx) => {
          const rowEid = `team-row-${idx}`;
          const isCL = idx < 4;
          const isReleg = idx >= data.teams.length - 3;

          return (
            <div
              key={team.rank}
              data-eid={rowEid}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 15,
                fontWeight: team.rank <= 4 ? 500 : 400,
                padding: "4.7px 0 4.7px 0",
                borderBottom: idx === data.teams.length - 1 ? "none" : "1px solid #232c43",
                ...(isCL ? zoneStyles.CL : isReleg ? zoneStyles.relegation : {}),
                transition: "background .13s",
              }}
            >
              <span data-eid={`${rowEid}-rank`} style={{
                width: 20,
                textAlign: "center",
                color: isCL ? "#47a2f8" : isReleg ? "#ea515e" : "#a5adbe",
                fontWeight: 700,
                opacity: 0.98
              }}>{team.rank}</span>

              <span data-eid={`${rowEid}-name`}
                style={{
                  flex: 1.55,
                  fontWeight: team.rank <= 4 ? 600 : 500,
                  color: isCL ? "#fff" : isReleg ? "#fff" : "#f3f6fd",
                  paddingLeft: 4,
                  letterSpacing: -0.2,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}
              >
                {team.name}
              </span>

              <span data-eid={idx === 0 ? "team-row-0-mp" : undefined} style={{
                width: 28, textAlign: "center", color: "#dbe6fd"
              }}>{team.played}</span>
              <span data-eid={idx === 0 ? "team-row-0-w" : undefined} style={{
                width: 22, textAlign: "center", color: "#dbe6fd"
              }}>{team.won}</span>
              <span data-eid={idx === 0 ? "team-row-0-d" : undefined} style={{
                width: 22, textAlign: "center", color: "#dbe6fd"
              }}>{team.drawn}</span>
              <span data-eid={idx === 0 ? "team-row-0-l" : undefined} style={{
                width: 22, textAlign: "center", color: "#dbe6fd"
              }}>{team.lost}</span>
              <span data-eid={idx === 0 ? "team-row-0-gf" : undefined} style={{
                width: 27, textAlign: "center", color: "#dbe6fd"
              }}>{team.gf}</span>
              <span data-eid={idx === 0 ? "team-row-0-ga" : undefined} style={{
                width: 27, textAlign: "center", color: "#dbe6fd"
              }}>{team.ga}</span>
              <span data-eid={idx === 0 ? "team-row-0-gd" : undefined} style={{
                width: 33, textAlign: "center", fontWeight: 700,
                color: team.gd > 0 ? "#19e86e"
                  : team.gd < 0 ? "#ea515e"
                    : "#dbe6fd"
              }}>
                {team.gd > 0 ? "+" : ""}{team.gd}
              </span>
              <span data-eid={idx === 0 ? "team-row-0-pts" : `team-row-${idx}-pts`} style={{
                width: 28, textAlign: "center", fontWeight: 700,
                color: "#fff"
              }}>
                {team.pts}
              </span>
              <div data-eid={idx === 0 ? "team-row-0-form" : `team-row-${idx}-form`} style={{
                width: 60,
                display: "flex",
                justifyContent: "center",
              }}>
                <FormDots form={team.form} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Points Chart */}
      <div data-eid="points-chart" style={{
        padding: "17px 0 0 0",
        // minHeight: 130,
      }}>
        <div data-eid="points-chart-title"
          style={{
            color: "#e1edfd",
            fontWeight: 700,
            marginBottom: 6,
            fontSize: 15
          }}>
          Points Distribution
        </div>
        {/* Bar chart */}
        <div style={{ width: "100%", height: 97, margin: "0 auto" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.teams}
              margin={{ left: 2, right: 10, top: 15, bottom: 6 }}
              barCategoryGap="8%"
            >
              <XAxis
                dataKey="short"
                tick={{ fill: "#8ba5c1", fontSize: 12, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <Tooltip
                contentStyle={{
                  background: "#151b2b",
                  borderRadius: 8,
                  color: "#fff",
                  border: "0px",
                  fontSize: 15
                }}
                itemStyle={{
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="pts"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
                // Use a function to assign a color to each bar
                fill="#888"
              >
                {data.teams.map((entry: any, idx: number) => (
                  <rect
                    key={entry.short}
                    x={0} y={0} width={0} height={0} // dummy
                    fill={chartBarColors(idx)}
                  />
                ))}
                {React.Children.toArray(
                  data.teams.map((entry, idx) =>
                    <Bar
                      key={idx}
                      dataKey="pts"
                      fill={chartBarColors(idx)}
                      isAnimationActive={false}
                    />
                  ).slice(0, 1)
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}