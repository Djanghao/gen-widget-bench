// submissions/gpt-widget/widget.tsx
import React from "react";
import data from "./data.json";
import { Trophy, Clock, ArrowLeftRight, CircleDot, Square } from "lucide-react";

const clamp = (n: number, a = 0, b = 100) => Math.max(a, Math.min(b, n));

function StatRow({
  eidRoot,
  eidHome,
  eidLabel,
  eidAway,
  eidBar,
  home,
  away,
  label,
  homeColor,
  awayColor,
}: {
  eidRoot: string;
  eidHome: string;
  eidLabel: string;
  eidAway: string;
  eidBar: string;
  home: number | string;
  away: number | string;
  label: string;
  homeColor: string;
  awayColor: string;
}) {
  const h = typeof home === "number" ? home : Number(String(home).replace("%", ""));
  const a = typeof away === "number" ? away : Number(String(away).replace("%", ""));
  const total = h + a;
  const hp = total > 0 ? (h / total) * 100 : 50;
  const ap = 100 - hp;

  return (
    <div data-eid={eidRoot} style={{ marginTop: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
        <span data-eid={eidHome} style={{ color: "#E9F7F2", fontWeight: 800, fontSize: 14 }}>
          {typeof home === "number" ? home : home}
        </span>
        <span data-eid={eidLabel} style={{ color: "#B8D7CF", fontSize: 12, letterSpacing: 0.3 }}>
          {label}
        </span>
        <span data-eid={eidAway} style={{ color: "#F6C54A", fontWeight: 800, fontSize: 14 }}>
          {typeof away === "number" ? away : away}
        </span>
      </div>

      <div
        data-eid={eidBar}
        style={{
          height: 6,
          borderRadius: 999,
          background: "#0E3D34",
          overflow: "hidden",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${clamp(hp)}%`,
            background: homeColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: `${clamp(ap)}%`,
            background: awayColor,
          }}
        />
      </div>
    </div>
  );
}

function PlayerDot({
  eid,
  x,
  y,
  num,
  color,
  textColor,
}: {
  eid: string;
  x: number;
  y: number;
  num: string | number;
  color: string;
  textColor: string;
}) {
  return (
    <span
      data-eid={eid}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%,-50%)",
        width: 20,
        height: 20,
        borderRadius: 999,
        background: color,
        color: textColor,
        fontSize: 10,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 1px 0 rgba(0,0,0,0.35)",
      }}
    >
      {num}
    </span>
  );
}

export default function Widget() {
  const homeCol = "#F3F5F4";
  const awayCol = "#F5A800";
  const pitchBg = "#083D34";
  const cardBg = "#0A4338";

  const heatColors = {
    low: "#0B5D3D",
    med: "#167A45",
    high: "#F0AE1B",
  };

  const homeDots = data.formations.homeDots;
  const awayDots = data.formations.awayDots;

  return (
    <section
      data-eid="root"
      style={{
        width: 463,
        height: 1160,
        boxSizing: "border-box",
        background: "#0B5245",
        padding: 14,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        color: "#E9F7F2",
      }}
    >
      {/* SCOREBOARD */}
      <div
        data-eid="scoreboard"
        style={{
          background: "#0A4A3D",
          borderRadius: 14,
          padding: 14,
          border: "2px solid rgba(255,255,255,0.14)",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <Trophy size={14} color="#F0AE1B" />
          <span
            data-eid="competition-label"
            style={{ color: "#CBE7DE", fontSize: 11, letterSpacing: 1.1, textTransform: "uppercase" }}
          >
            {data.competition}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-start" }}>
            <div
              data-eid="home-badge"
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
              }}
            >
              <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: 0.6 }}>{data.teams.home.badge}</span>
            </div>
            <span data-eid="home-name" style={{ fontWeight: 800, fontSize: 14, color: "#FFFFFF" }}>
              {data.teams.home.name}
            </span>
          </div>

          <div data-eid="score-display" style={{ textAlign: "center", minWidth: 140 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10 }}>
              <span data-eid="home-score" style={{ fontSize: 42, fontWeight: 900, color: "#FFFFFF" }}>
                {data.score.home}
              </span>
              <span data-eid="score-separator" style={{ fontSize: 36, fontWeight: 900, color: "#FFFFFF" }}>
                -
              </span>
              <span data-eid="away-score" style={{ fontSize: 42, fontWeight: 900, color: "#FFFFFF" }}>
                {data.score.away}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
            <span data-eid="away-name" style={{ fontWeight: 800, fontSize: 14, color: awayCol }}>
              {data.teams.away.name}
            </span>
            <div
              data-eid="away-badge"
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: `2px solid ${awayCol}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
              }}
            >
              <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: 0.6, color: awayCol }}>
                {data.teams.away.badge}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={14} color="#CBE7DE" />
            <span data-eid="match-time" style={{ color: "#F0AE1B", fontWeight: 800 }}>
              {data.time}
            </span>
          </div>
          <span
            data-eid="match-status"
            style={{
              background: "#0E6A4E",
              color: "#E9F7F2",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "4px 10px",
              borderRadius: 10,
              fontSize: 12,
            }}
          >
            {data.status}
          </span>
        </div>
      </div>

      {/* FORMATIONS */}
      <div data-eid="formation-section" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <h2
            data-eid="formation-title"
            style={{
              margin: 0,
              color: "#F0AE1B",
              letterSpacing: 2.2,
              fontSize: 12,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {data.titles.formations}
          </h2>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span data-eid="home-formation-label" style={{ color: "#EAF7F2", fontSize: 12 }}>
            {data.teams.home.name} ({data.formations.home})
          </span>
          <span data-eid="away-formation-label" style={{ color: awayCol, fontSize: 12 }}>
            {data.teams.away.name} ({data.formations.away})
          </span>
        </div>

        <div
          data-eid="formation-pitch"
          style={{
            height: 210,
            borderRadius: 10,
            background: pitchBg,
            border: "2px solid rgba(255,255,255,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* pitch markings */}
          <div
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              top: "50%",
              height: 1,
              background: "rgba(255,255,255,0.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 52,
              height: 52,
              borderRadius: 999,
              transform: "translate(-50%,-50%)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          />

          {/* HOME dots (top half) */}
          {homeDots.map((p: any, idx: number) => (
            <PlayerDot
              key={`h-${idx}`}
              eid={`home-player-${idx}`}
              x={p.x}
              y={p.y}
              num={p.num}
              color={awayCol}
              textColor="#1C1C1C"
            />
          ))}

          {/* AWAY dots (bottom half) */}
          {awayDots.map((p: any, idx: number) => (
            <PlayerDot
              key={`a-${idx}`}
              eid={`away-player-${idx}`}
              x={p.x}
              y={p.y}
              num={p.num}
              color={homeCol}
              textColor="#163E34"
            />
          ))}
        </div>
      </div>

      {/* MATCH STATISTICS */}
      <div data-eid="stats-section" style={{ marginTop: 14 }}>
        <h2
          data-eid="stats-title"
          style={{
            margin: "0 0 6px 0",
            color: "#F0AE1B",
            letterSpacing: 2.2,
            fontSize: 12,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          {data.titles.stats}
        </h2>

        <StatRow
          eidRoot="stat-possession"
          eidHome="stat-possession-home"
          eidLabel="stat-possession-label"
          eidAway="stat-possession-away"
          eidBar="stat-possession-bar"
          home={data.stats.possession.home}
          away={data.stats.possession.away}
          label="Possession"
          homeColor="#EAF7F2"
          awayColor={awayCol}
        />
        <StatRow
          eidRoot="stat-shots"
          eidHome="stat-shots-home"
          eidLabel="stat-shots-label"
          eidAway="stat-shots-away"
          eidBar="stat-shots-bar"
          home={data.stats.shots.home}
          away={data.stats.shots.away}
          label="Shots"
          homeColor="#EAF7F2"
          awayColor={awayCol}
        />
        <StatRow
          eidRoot="stat-ontarget"
          eidHome="stat-ontarget-home"
          eidLabel="stat-ontarget-label"
          eidAway="stat-ontarget-away"
          eidBar="stat-ontarget-bar"
          home={data.stats.onTarget.home}
          away={data.stats.onTarget.away}
          label="On Target"
          homeColor="#EAF7F2"
          awayColor={awayCol}
        />
        <StatRow
          eidRoot="stat-passes"
          eidHome="stat-passes-home"
          eidLabel="stat-passes-label"
          eidAway="stat-passes-away"
          eidBar="stat-passes-bar"
          home={data.stats.passes.home}
          away={data.stats.passes.away}
          label="Passes"
          homeColor="#EAF7F2"
          awayColor={awayCol}
        />
        <StatRow
          eidRoot="stat-corners"
          eidHome="stat-corners-home"
          eidLabel="stat-corners-label"
          eidAway="stat-corners-away"
          eidBar="stat-corners-bar"
          home={data.stats.corners.home}
          away={data.stats.corners.away}
          label="Corners"
          homeColor="#EAF7F2"
          awayColor={awayCol}
        />
        <StatRow
          eidRoot="stat-fouls"
          eidHome="stat-fouls-home"
          eidLabel="stat-fouls-label"
          eidAway="stat-fouls-away"
          eidBar="stat-fouls-bar"
          home={data.stats.fouls.home}
          away={data.stats.fouls.away}
          label="Fouls"
          homeColor="#EAF7F2"
          awayColor={awayCol}
        />
      </div>

      {/* MATCH EVENTS */}
      <div
        data-eid="events-section"
        style={{
          marginTop: 14,
          background: cardBg,
          borderRadius: 12,
          border: "2px solid rgba(255,255,255,0.10)",
          padding: 10,
        }}
      >
        <h2
          data-eid="events-title"
          style={{
            margin: "0 0 10px 0",
            color: "#F0AE1B",
            letterSpacing: 2.2,
            fontSize: 12,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          {data.titles.events}
        </h2>

        <div data-eid="events-list" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.events.map((ev: any, i: number) => {
            const eid = `event-${i}`;
            const icon =
              ev.type === "goal" ? (
                <CircleDot size={14} color="#EAF7F2" />
              ) : ev.type === "yellow" ? (
                <Square size={14} color="#F0AE1B" fill="#F0AE1B" />
              ) : ev.type === "red" ? (
                <Square size={14} color="#D64B4B" fill="#D64B4B" />
              ) : (
                <ArrowLeftRight size={14} color="#EAF7F2" />
              );

            return (
              <div
                key={eid}
                data-eid={eid}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  display: "grid",
                  gridTemplateColumns: "44px 22px 1fr",
                  alignItems: "center",
                  borderLeft: `3px solid ${awayCol}`,
                }}
              >
                <span data-eid={`${eid}-time`} style={{ color: awayCol, fontWeight: 900, fontSize: 13 }}>
                  {ev.time}
                </span>
                <span data-eid={`${eid}-icon`} style={{ display: "flex", alignItems: "center" }}>
                  {icon}
                </span>
                <span data-eid={`${eid}-detail`} style={{ color: "#EAF7F2", fontSize: 12 }}>
                  <span style={{ fontWeight: 900 }}>{ev.player}</span>
                  <span style={{ color: "#B8D7CF" }}> - {ev.detail}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOP PLAYER RATINGS */}
      <div data-eid="ratings-section" style={{ marginTop: 14 }}>
        <h2
          data-eid="ratings-title"
          style={{
            margin: "0 0 8px 0",
            color: "#F0AE1B",
            letterSpacing: 2.2,
            fontSize: 12,
            fontWeight: 900,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", transform: "translateY(1px)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, border: "2px solid #F0AE1B" }} />
          </span>
          {data.titles.ratings}
        </h2>

        <div data-eid="ratings-table" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.ratings.map((r: any, i: number) => {
            const rowEid = `rating-row-${i}`;
            const scoreBg = i < 2 ? awayCol : "#0E6A4E";
            const scoreText = i < 2 ? "#1C1C1C" : "#CDEAE1";
            return (
              <div
                key={rowEid}
                data-eid={rowEid}
                style={{
                  background: "#083E35",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span data-eid={`${rowEid}-name`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: i < 2 ? "#FFFFFF" : awayCol }} />
                  <span style={{ fontWeight: 800, fontSize: 13, color: "#FFFFFF" }}>{r.name}</span>
                </span>
                <span
                  data-eid={`${rowEid}-score`}
                  style={{
                    minWidth: 38,
                    textAlign: "center",
                    borderRadius: 8,
                    padding: "2px 8px",
                    background: scoreBg,
                    color: scoreText,
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                >
                  {r.rating}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOUCH HEATMAP (HOME) */}
      <div data-eid="heatmap-section" style={{ marginTop: 14 }}>
        <h2
          data-eid="heatmap-title"
          style={{
            margin: "0 0 8px 0",
            color: "#F0AE1B",
            letterSpacing: 2.2,
            fontSize: 12,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          {data.titles.heatmap}
        </h2>

        <div
          style={{
            background: cardBg,
            borderRadius: 12,
            border: "2px solid rgba(255,255,255,0.10)",
            padding: 8,
          }}
        >
          <div
            data-eid="heatmap-grid"
            style={{
              display: "grid",
              gridTemplateRows: "repeat(5, 1fr)",
              gap: 4,
            }}
          >
            {data.heatmap.rows.map((row: any[], rIdx: number) => (
              <div
                key={`hm-r-${rIdx}`}
                data-eid={`heatmap-row-${rIdx}`}
                style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4 }}
              >
                {row.map((cell: any, cIdx: number) => {
                  const bg =
                    cell.level === "high" ? heatColors.high : cell.level === "medium" ? heatColors.med : heatColors.low;
                  const tc = cell.level === "high" ? "#1E1A10" : "#D7F1E8";
                  return (
                    <div
                      key={`hm-c-${rIdx}-${cIdx}`}
                      style={{
                        height: 18,
                        borderRadius: 2,
                        background: bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: tc,
                        border: "1px solid rgba(0,0,0,0.15)",
                      }}
                    >
                      {cell.value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div
            data-eid="heatmap-legend"
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              color: "#B8D7CF",
              fontSize: 11,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: heatColors.low }} />
              Low
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: heatColors.med }} />
              Medium
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: heatColors.high }} />
              High
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        data-eid="footer"
        style={{
          marginTop: 10,
          paddingTop: 10,
          display: "flex",
          justifyContent: "space-between",
          color: "#B8D7CF",
          fontSize: 11,
        }}
      >
        <span data-eid="footer-venue">◎ {data.footer.venue}</span>
        <span data-eid="footer-referee">{data.footer.referee}</span>
        <span data-eid="footer-attendance">{data.footer.attendance}</span>
      </footer>
    </section>
  );
}