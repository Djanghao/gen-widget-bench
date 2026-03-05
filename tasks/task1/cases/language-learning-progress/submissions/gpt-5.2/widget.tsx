// submissions/gpt/widget.tsx
import React from "react";
import { RadialBarChart, RadialBar } from "recharts";
import { BookOpen, PenLine, Headphones, Zap, Flame, Book, Target } from "lucide-react";
import data from "./data.json";

export default function Widget() {
  const w = 410;
  const pad = 22;

  const bg0 = "#0B1020";
  const bg1 = "#1A2F52";
  const panel = "rgba(255,255,255,0.06)";
  const panel2 = "rgba(255,255,255,0.05)";
  const border = "rgba(255,255,255,0.06)";
  const text = "rgba(255,255,255,0.92)";
  const subtext = "rgba(255,255,255,0.70)";
  const faint = "rgba(255,255,255,0.38)";
  const track = "rgba(255,255,255,0.10)";
  const purple = "#8E5BFF";
  const purple2 = "#A884FF";

  const radialData = [{ name: "progress", value: data.progressPercent }];

  const skillRows = [
    {
      key: "reading",
      label: "Reading",
      level: data.skills.reading.level,
      percent: data.skills.reading.percent,
      color: "#5C93D6",
      barEid: "skill-reading-bar",
      rowEid: "skill-reading",
      levelEid: "skill-reading-level",
    },
    {
      key: "writing",
      label: "Writing",
      level: data.skills.writing.level,
      percent: data.skills.writing.percent,
      color: "#E15CA8",
      barEid: "skill-writing-bar",
      rowEid: "skill-writing",
      levelEid: "skill-writing-level",
    },
    {
      key: "listening",
      label: "Listening",
      level: data.skills.listening.level,
      percent: data.skills.listening.percent,
      color: "#2DBB84",
      barEid: "skill-listening-bar",
      rowEid: "skill-listening",
      levelEid: "skill-listening-level",
    },
    {
      key: "speaking",
      label: "Speaking",
      level: data.skills.speaking.level,
      percent: data.skills.speaking.percent,
      color: "#F2C14E",
      barEid: "skill-speaking-bar",
      rowEid: "skill-speaking",
      levelEid: "skill-speaking-level",
    },
    {
      key: "grammar",
      label: "Grammar",
      level: data.skills.grammar.level,
      percent: data.skills.grammar.percent,
      color: "#A884FF",
      barEid: "skill-grammar-bar",
      rowEid: "skill-grammar",
      levelEid: "skill-grammar-level",
    },
  ];

  const StatCard = ({
    icon,
    value,
    label,
    accent,
    eid,
  }: {
    icon: React.ReactNode;
    value: string;
    label: string;
    accent: string;
    eid: string;
  }) => (
    <div
      data-eid={eid}
      style={{
        flex: 1,
        background: panel2,
        borderRadius: 12,
        padding: "14px 10px 12px",
        border: `1px solid ${border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        minHeight: 74,
      }}
    >
      <div style={{ color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div style={{ color: accent, fontWeight: 800, fontSize: 18, lineHeight: "18px" }}>{value}</div>
      <div style={{ color: faint, fontSize: 10, letterSpacing: 1.2 }}>{label.toUpperCase()}</div>
    </div>
  );

  const LessonRow = ({
    title,
    time,
    icon,
    eid,
    iconEid,
    timeEid,
  }: {
    title: string;
    time: string;
    icon?: React.ReactNode;
    eid: string;
    iconEid?: string;
    timeEid?: string;
  }) => (
    <div
      data-eid={eid}
      style={{
        background: panel,
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {icon ? (
          <span data-eid={iconEid} style={{ display: "inline-flex", color: purple2 }}>
            {icon}
          </span>
        ) : null}
        <div style={{ color: text, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </div>
      </div>
      <span data-eid={timeEid} style={{ color: faint, fontSize: 12 }}>
        {time}
      </span>
    </div>
  );

  return (
    <section
      data-eid="root"
      style={{
        width: w,
        borderRadius: 18,
        overflow: "hidden",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        background: `radial-gradient(900px 600px at 25% 0%, #1B1E3A 0%, ${bg0} 45%, ${bg1} 120%)`,
        color: text,
        boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ padding: pad }}>
        {/* Header */}
        <div
          data-eid="header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span data-eid="flag-emoji" style={{ fontSize: 18, opacity: 0.9 }}>
              {data.flagEmoji}
            </span>
            <h2 data-eid="language-name" style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: 0.2 }}>
              {data.languageName}
            </h2>
          </div>
          <span
            data-eid="level-badge"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(142,91,255,0.18)",
              border: "1px solid rgba(142,91,255,0.35)",
              color: purple2,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {data.levelBadge}
          </span>
        </div>

        {/* Progress ring */}
        <div
          data-eid="progress-ring"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 6px",
          }}
        >
          <div style={{ position: "relative", width: 190, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <RadialBarChart
              width={190}
              height={160}
              cx="50%"
              cy="52%"
              innerRadius={58}
              outerRadius={74}
              startAngle={90}
              endAngle={-270}
              data={radialData}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={999}
                background={{ fill: "rgba(255,255,255,0.08)" }}
                fill={purple}
              />
            </RadialBarChart>
            <span
              data-eid="progress-percent"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 28,
                fontWeight: 900,
                color: purple2,
                letterSpacing: 0.4,
              }}
            >
              {data.progressPercent}%
            </span>
          </div>
        </div>

        {/* Skills */}
        <div data-eid="skills-section" style={{ marginTop: 10 }}>
          <h3 data-eid="skills-title" style={{ margin: "10px 0 10px", fontSize: 14, color: "rgba(255,255,255,0.76)", fontWeight: 800 }}>
            {data.skillsTitle}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {skillRows.map((s) => (
              <div key={s.key} data-eid={s.rowEid} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 13 }}>{s.label}</div>
                  <span data-eid={s.levelEid} style={{ color: s.color, fontSize: 12, fontWeight: 800 }}>
                    {s.level}
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: track, overflow: "hidden" }}>
                  <div
                    data-eid={s.barEid}
                    style={{
                      height: "100%",
                      width: `${s.percent}%`,
                      background: s.color,
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today stats */}
        <div
          data-eid="today-stats"
          style={{
            marginTop: 18,
            display: "flex",
            gap: 12,
          }}
        >
          <StatCard
            eid="stat-xp"
            icon={<Zap size={18} />}
            value={`${data.todayStats.xp}`}
            label="XP"
            accent="#F2C14E"
          />
          <StatCard
            eid="stat-streak"
            icon={<Flame size={18} />}
            value={`${data.todayStats.streak}`}
            label="days"
            accent="#FF7A2F"
          />
          <StatCard
            eid="stat-words"
            icon={<Book size={18} />}
            value={`${data.todayStats.words}`}
            label="words"
            accent="#66B3FF"
          />
          <StatCard
            eid="stat-accuracy"
            icon={<Target size={18} />}
            value={`${data.todayStats.accuracy}%`}
            label="accuracy"
            accent="#39D98A"
          />
        </div>

        {/* Lessons */}
        <div data-eid="lessons-section" style={{ marginTop: 18 }}>
          <h3 data-eid="lessons-title" style={{ margin: "10px 0 10px", fontSize: 14, color: "rgba(255,255,255,0.76)", fontWeight: 800 }}>
            {data.lessonsTitle}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <LessonRow
              eid="lesson-0"
              iconEid="lesson-0-icon"
              timeEid="lesson-0-time"
              title={data.lessons[0].title}
              time={data.lessons[0].time}
              icon={<BookOpen size={18} />}
            />
            <LessonRow
              eid="lesson-1"
              timeEid="lesson-1-time"
              title={data.lessons[1].title}
              time={data.lessons[1].time}
              icon={<PenLine size={18} color={purple2} />}
            />
            <LessonRow
              eid="lesson-2"
              title={data.lessons[2].title}
              time={data.lessons[2].time}
              icon={<Headphones size={18} color={purple2} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}