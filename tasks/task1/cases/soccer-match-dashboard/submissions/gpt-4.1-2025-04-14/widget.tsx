import React from "react";
import data from "./data.json";
import { SoccerBall, Square, ArrowRightLeft } from "lucide-react";

const ICON_SIZE = 18;

function getEventIcon(type: string) {
  switch (type) {
    case "goal":
      // lucide-react doesn't have filled soccer-ball, but SoccerBall works
      return <SoccerBall size={ICON_SIZE} style={{ color: "#fff", verticalAlign: "middle" }} />;
    case "yellow-card":
      return (
        <Square
          size={ICON_SIZE - 2}
          style={{ 
            color: "#FFD600", 
            border: 0,
            fill: "#FFD600", 
            stroke: "#FFD600", 
            verticalAlign: "middle" 
          }} 
        />
      );
    case "red-card":
      return (
        <Square
          size={ICON_SIZE - 2}
          style={{ 
            color: "#E63946", 
            border: 0,
            fill: "#E63946", 
            stroke: "#E63946", 
            verticalAlign: "middle" 
          }} 
        />
      );
    case "substitution":
      return (
        <ArrowRightLeft size={ICON_SIZE - 2} style={{ color: "#77e0b5", verticalAlign: "middle" }} />
      );
    default:
      return null;
  }
}

// For stats bars: home is L, away is R, bar width = 90% of parent
function StatBar({ home, away, color, eid }: any) {
  const total = home + away;
  const l = total > 0 ? (home / total) * 100 : 50;
  const r = total > 0 ? (away / total) * 100 : 50;
  return (
    <div
      data-eid={eid}
      style={{
        width: "100%",
        height: 7,
        borderRadius: 4,
        background: "#2AB27B",
        margin: "6px 0 0 0",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${l}%`,
          background: "#fff",
          transition: "width 0.4s",
        }}
      />
      <div
        style={{
          width: `${r}%`,
          background: color ?? "#ffaa27",
          transition: "width 0.4s",
        }}
      />
    </div>
  );
}

// Pitch formation: each player is a dot with number, placed by absolute%
function FormationPitch({ home, away }: { home: any[]; away: any[] }) {
  // For demo, show numbers on circles, position by xy field.
  return (
    <div
      data-eid="formation-pitch"
      style={{
        position: "relative",
        width: "100%",
        height: 180,
        background: "rgba(0,0,0,0.08)",
        borderRadius: 12,
        margin: "10px 0 10px 0",
        border: "2px solid #217764",
        boxSizing: "border-box",
      }}
    >
      {home.map((p, i) => (
        <span
          key={i}
          data-eid={`home-player-${i}`}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 28,
            height: 28,
            borderRadius: 14,
            background: "#fff",
            color: "#217764",
            fontWeight: 700,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #217764",
            userSelect: "none",
          }}
        >
          {p.number}
        </span>
      ))}
      {away.map((p, i) => (
        <span
          key={i}
          data-eid={`away-player-${i}`}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 28,
            height: 28,
            borderRadius: 14,
            background: "#ffaa27",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #ffaa27",
            userSelect: "none",
          }}
        >
          {p.number}
        </span>
      ))}
    </div>
  );
}

function HeatmapRow({ row, rowIdx }: { row: number[]; rowIdx: number }) {
  // Low: #217764, Med: #2ab27b, High: #ffaa27
  return (
    <div
      data-eid={`heatmap-row-${rowIdx}`}
      style={{ display: "flex", gap: 4, marginBottom: 2 }}
    >
      {row.map((val, colIdx) => {
        let bg = "#217764";
        if (val >= 10 && val < 15) bg = "#2ab27b";
        if (val >= 15) bg = "#ffaa27";
        return (
          <div
            key={colIdx}
            style={{
              width: 32,
              height: 24,
              borderRadius: 3,
              background: bg,
              color: "#fff",
              textAlign: "center",
              fontSize: 13,
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            {val}
          </div>
        );
      })}
    </div>
  );
}

const StatRow = ({
  home,
  label,
  away,
  barEid,
  barColor,
  homeEid,
  labelEid,
  awayEid,
  sectionEid,
}: any) => (
  <div
    data-eid={sectionEid}
    style={{ marginBottom: 10 }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontWeight: 700,
        fontSize: 16,
        color: "#fff",
        marginBottom: 0,
        justifyContent: "space-between",
      }}
    >
      <span data-eid={homeEid} style={{ width: 46, color: "#fff" }}>{home}</span>
      <span data-eid={labelEid} style={{ flex: 1, color: "#d1a326", textAlign: "center", fontWeight: 600, fontSize: 15 }}>{label}</span>
      <span data-eid={awayEid} style={{ width: 46, color: "#ffaa27", textAlign: "right" }}>{away}</span>
    </div>
    <StatBar home={home} away={away} color={barColor} eid={barEid} />
  </div>
);

const RatingsRow = ({ name, score, eid, nameEid, scoreEid, highlight }: any) => (
  <div
    data-eid={eid}
    style={{
      display: "flex",
      alignItems: "center",
      background: highlight ? "rgba(255, 255, 255, 0.09)" : "none",
      borderRadius: 6,
      marginBottom: 4,
      padding: highlight ? "4px 0" : "0px",
      fontWeight: highlight ? 700 : 600,
      fontSize: 17,
      color: "#fff",
    }}
  >
    <span
      data-eid={nameEid}
      style={{ flex: 1, color: "#fff", display: "flex", alignItems: "center", gap: 6, fontWeight: highlight ? 700 : 600, fontSize: 16 }}
    >
      <span style={{ fontSize: 18, display: "inline-block", marginRight: 2 }}>●</span>
      {name}
    </span>
    <span
      data-eid={scoreEid}
      style={{
        fontWeight: 700,
        fontSize: 15,
        color: "#ffaa27",
        background: highlight ? "#136a48" : "#174F4C",
        minWidth: 38,
        display: "inline-block",
        textAlign: "center",
        marginLeft: 6,
        borderRadius: 6,
        padding: "2px 9px 2px 9px",
        marginRight: 3,
      }}
    >
      {score}
    </span>
  </div>
);

const EventsRow = ({ time, type, detail, eid, timeEid, iconEid, detailEid }: any) => (
  <div
    data-eid={eid}
    style={{
      display: "flex",
      alignItems: "center",
      background: "#135f4c",
      borderRadius: 6,
      marginBottom: 7,
      padding: "4px 7px",
      color: "#fff",
      fontSize: 15,
      fontWeight: 600,
      minHeight: 34,
      gap: 0,
    }}
  >
    <span data-eid={timeEid} style={{ width: 36, color: "#ffaa27", fontWeight: 700, display: "inline-block" }}>{time}</span>
    <span data-eid={iconEid} style={{ width: 26, textAlign: "center", display: "inline-block" }}>{getEventIcon(type)}</span>
    <span data-eid={detailEid} style={{ color: "#fff", fontWeight: 620, marginLeft: 6 }}>{detail}</span>
  </div>
);

const widget: React.FC = () => (
  <section data-eid="root" style={{
    fontFamily: "'Segoe UI', 'Arial', 'Helvetica Neue', Helvetica, sans-serif",
    background: "#176b5c",
    color: "#fff",
    borderRadius: 18,
    maxWidth: 410,
    margin: "0 auto",
    padding: 0,
    boxShadow: "0 0 0 3px #0c473b, 0 8px 32px 0 rgba(18,94,70,.6)",
    border: "4px solid #176b5c",
    position: "relative"
  }}>
    {/* Scoreboard */}
    <div data-eid="scoreboard" style={{
      padding: "20px 16px 14px 16px",
      borderRadius: 13,
      background: "rgba(29,69,65,0.11)",
      margin: 0
    }}>
      <span
        data-eid="competition-label"
        style={{
          color: "#ffaa27",
          fontWeight: 600,
          fontSize: 13.5,
          letterSpacing: 0.2,
          textTransform: "uppercase",
          display: "block",
          textAlign: "center",
          marginBottom: "15px",
        }}
      >{data.match.competition}</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 7 }}>
        {/* Home badge/name */}
        <div data-eid="home-badge" style={{ width: 44, height: 44, background: "#ededed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 700, color: "#217764", border: "3px solid #176b5c" }}>
          {data.match.homeAbbr}
        </div>
        <div style={{ flex: 1, textAlign: "center", marginLeft: 8 }}>
          <div data-eid="score-display" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 800, color: "#fff", letterSpacing: 1, marginBottom: -7 }}>
            <span data-eid="home-score" style={{ color: "#fff", fontWeight: 800, fontSize: 43 }}>{data.match.homeScore}</span>
            <span data-eid="score-separator" style={{ color: "#fff", fontWeight: 800, margin: "0 16px", fontSize: 40 }}>-</span>
            <span data-eid="away-score" style={{ color: "#ffaa27", fontWeight: 800, fontSize: 43 }}>{data.match.awayScore}</span>
          </div>
        </div>
        <div data-eid="away-badge" style={{ width: 44, height: 44, background: "#ffaa27", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 700, color: "#fff", border: "3px solid #176b5c" }}>
          {data.match.awayAbbr}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 2 }}>
        <span data-eid="home-name" style={{ fontWeight: 700, fontSize: 18, color: "#fff", flex: 1, textAlign: "left", marginLeft: 1 }}>{data.match.home}</span>
        <span data-eid="away-name" style={{ fontWeight: 700, fontSize: 18, color: "#ffaa27", flex: 1, textAlign: "right" }}>{data.match.away}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "13px 0 0 0" }}>
        <span data-eid="match-time" style={{ color: "#ffaa27", fontWeight: 700, fontSize: 20, letterSpacing: 0 }}>{data.match.time}</span>
        <span style={{ width: 11 }}></span>
        <span data-eid="match-status" style={{
          background: "#217764",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15.5,
          borderRadius: 5,
          padding: "4px 10px",
          marginLeft: 3
        }}>{data.match.status}</span>
      </div>
    </div>

    {/* Formations */}
    <div data-eid="formation-section" style={{ margin: "18px 0 0 0", padding: "0 16px" }}>
      <h2 data-eid="formation-title" style={{
        color: "#ffaa27",
        fontWeight: 900,
        fontSize: 17.5,
        letterSpacing: 0.6,
        margin: "0 0 7px 0",
        display: "block"
      }}>FORMATIONS</h2>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, fontWeight: 700, marginBottom: 0 }}>
        <span data-eid="home-formation-label" style={{ color: "#fff" }}>{data.formation.homeLabel}</span>
        <span data-eid="away-formation-label" style={{ color: "#ffaa27" }}>{data.formation.awayLabel}</span>
      </div>
      <FormationPitch home={data.formation.homePlayers} away={data.formation.awayPlayers} />
    </div>

    {/* Match statistics */}
    <div data-eid="stats-section" style={{ margin: "10px 0 0 0", padding: "0 16px" }}>
      <h2 data-eid="stats-title" style={{
        color: "#ffaa27",
        fontWeight: 900,
        fontSize: 17.5,
        letterSpacing: 0.6,
        margin: "0 0 7px 0"
      }}>MATCH STATISTICS</h2>
      {/* Possession */}
      <StatRow
        sectionEid="stat-possession"
        home={data.stats.possession.home}
        away={data.stats.possession.away}
        label="Possession"
        homeEid="stat-possession-home"
        labelEid="stat-possession-label"
        awayEid="stat-possession-away"
        barEid="stat-possession-bar"
        barColor="#ffaa27"
      />
      {/* Shots */}
      <StatRow
        sectionEid="stat-shots"
        home={data.stats.shots.home}
        away={data.stats.shots.away}
        label="Shots"
        homeEid="stat-shots-home"
        labelEid="stat-shots-label"
        awayEid="stat-shots-away"
        barEid="stat-shots-bar"
        barColor="#ffaa27"
      />
      {/* On Target */}
      <StatRow
        sectionEid="stat-ontarget"
        home={data.stats.onTarget.home}
        away={data.stats.onTarget.away}
        label="On Target"
        homeEid="stat-ontarget-home"
        labelEid="stat-ontarget-label"
        awayEid="stat-ontarget-away"
        barEid="stat-ontarget-bar"
        barColor="#ffaa27"
      />
      {/* Passes */}
      <StatRow
        sectionEid="stat-passes"
        home={data.stats.passes.home}
        away={data.stats.passes.away}
        label="Passes"
        homeEid="stat-passes-home"
        labelEid="stat-passes-label"
        awayEid="stat-passes-away"
        barEid="stat-passes-bar"
        barColor="#ffaa27"
      />
      {/* Corners */}
      <StatRow
        sectionEid="stat-corners"
        home={data.stats.corners.home}
        away={data.stats.corners.away}
        label="Corners"
        homeEid="stat-corners-home"
        labelEid="stat-corners-label"
        awayEid="stat-corners-away"
        barEid="stat-corners-bar"
        barColor="#ffaa27"
      />
      {/* Fouls */}
      <StatRow
        sectionEid="stat-fouls"
        home={data.stats.fouls.home}
        away={data.stats.fouls.away}
        label="Fouls"
        homeEid="stat-fouls-home"
        labelEid="stat-fouls-label"
        awayEid="stat-fouls-away"
        barEid="stat-fouls-bar"
        barColor="#ffaa27"
      />
    </div>

    {/* Match events */}
    <div data-eid="events-section" style={{ margin: "14px 0 0 0", padding: "0 16px" }}>
      <h2 data-eid="events-title" style={{
        color: "#ffaa27",
        fontWeight: 900,
        fontSize: 17.5,
        letterSpacing: 0.6,
        margin: "0 0 7px 0"
      }}>MATCH EVENTS</h2>
      <div data-eid="events-list">
        {data.events.map((event: any, i: number) => (
          <EventsRow
            key={i}
            eid={`event-${i}`}
            timeEid={`event-${i}-time`}
            iconEid={`event-${i}-icon`}
            detailEid={`event-${i}-detail`}
            {...event}
          />
        ))}
      </div>
    </div>

    {/* Player ratings */}
    <div data-eid="ratings-section" style={{ margin: "13px 0 0 0", padding: "0 16px" }}>
      <h2 data-eid="ratings-title" style={{
        color: "#ffaa27",
        fontWeight: 900,
        fontSize: 17.5,
        letterSpacing: 0.6,
        margin: "0 0 7px 0"
      }}>TOP PLAYER RATINGS</h2>
      <div data-eid="ratings-table">
        {data.ratings.map((r: any, i: number) => (
          <RatingsRow
            key={i}
            eid={`rating-row-${i}`}
            nameEid={`rating-row-${i}-name`}
            scoreEid={`rating-row-${i}-score`}
            {...r}
            highlight={i === 0}
          />
        ))}
      </div>
    </div>
    
    {/* Heatmap */}
    <div data-eid="heatmap-section" style={{ margin: "15px 0 0 0", padding: "0 16px" }}>
      <h2 data-eid="heatmap-title" style={{
        color: "#ffaa27",
        fontWeight: 900,
        fontSize: 17.5,
        letterSpacing: 0.6,
        margin: "0 0 6px 0"
      }}>TOUCH HEATMAP (HOME)</h2>
      <div data-eid="heatmap-grid" style={{ marginBottom: 5 }}>
        {data.heatmap.map((row: number[], i: number) => (
          <HeatmapRow key={i} row={row} rowIdx={i} />
        ))}
      </div>
      <div data-eid="heatmap-legend" style={{ display: "flex", alignItems: "center", fontSize: 12, fontWeight: 600, color: "#fff" }}>
        <div style={{ width: 22, height: 13, borderRadius: 2, background: "#217764", marginRight: 4, marginLeft: 1 }} />
        Low
        <div style={{ width: 22, height: 13, borderRadius: 2, background: "#2ab27b", marginLeft: 16, marginRight: 4 }} />
        Medium
        <div style={{ width: 22, height: 13, borderRadius: 2, background: "#ffaa27", marginLeft: 16, marginRight: 4 }} />
        High
      </div>
    </div>
    {/* Footer */}
    <footer data-eid="footer" style={{
      fontSize: 13,
      color: "#fff",
      marginTop: 13,
      padding: "10px 16px 13px 16px",
      background: "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span data-eid="footer-venue">{data.footer.venue}</span>
      <span data-eid="footer-referee">{data.footer.referee}</span>
      <span data-eid="footer-attendance">{data.footer.attendance}</span>
    </footer>
  </section>
);

export default widget;