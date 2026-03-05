import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Zap, Flame, BookOpen, Target } from "lucide-react";
import data from "./data.json";

const progressBarColors: Record<string, string> = {
  reading: "#62aeff",
  writing: "#d16ba5",
  listening: "#27e3b9",
  speaking: "#f6b81f",
  grammar: "#a383ff",
};

const skillLevels: Record<string, { label: string; color: string }> = {
  reading: { label: "B1", color: "#62aeff" },
  writing: { label: "A2", color: "#d16ba5" },
  listening: { label: "B2", color: "#27e3b9" },
  speaking: { label: "A2", color: "#f6b81f" },
  grammar: { label: "B1", color: "#a383ff" },
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 400,
        borderRadius: 24,
        background: "linear-gradient(180deg,#181c2f 90%,#21294a 110%)",
        padding: 28,
        color: "#fff",
        fontFamily: "Inter,sans-serif",
        boxSizing: "border-box",
        boxShadow: "0 2px 16px #151a3012",
        margin: "0 auto",
      }}
    >
      <div
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            data-eid="flag-emoji"
            style={{
              fontSize: 28,
              marginRight: 6,
              lineHeight: 1,
              fontFamily: "Apple Color Emoji,Segoe UI Emoji",
            }}
          >
            {data.flag}
          </span>
          <h2
            data-eid="language-name"
            style={{
              fontWeight: 700,
              fontSize: 24,
              margin: 0,
              color: "#fff",
            }}
          >
            {data.language}
          </h2>
        </div>
        <span
          data-eid="level-badge"
          style={{
            background: "linear-gradient(90deg,#6947d7 40%,#6e6de4 120%)",
            color: "#c6b8fa",
            fontSize: 14,
            fontWeight: 500,
            padding: "4px 14px",
            borderRadius: 20,
            letterSpacing: 0.2,
            boxShadow: "0 1px 5px #5b2bb922",
          }}
        >
          {data.level}
        </span>
      </div>
      <div style={{ textAlign: "center", margin: "26px 0 14px 0" }}>
        <div
          data-eid="progress-ring"
          style={{
            display: "inline-block",
            position: "relative",
            width: 170,
            height: 170,
          }}
        >
          <RadialBarChart
            width={170}
            height={170}
            cx={85}
            cy={85}
            innerRadius={62}
            outerRadius={81}
            barSize={14}
            data={[{ value: data.progress }]}
            startAngle={90}
            endAngle={-270}
            style={{ margin: 0 }}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={20}
              fill="#9766fa"
              background={{ fill: "#232844" }}
            />
          </RadialBarChart>
          <span
            data-eid="progress-percent"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 58,
              fontWeight: 600,
              fontSize: 32,
              color: "#a58dfe",
              letterSpacing: "0.5px",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            {data.progress}%
          </span>
        </div>
      </div>
      <div data-eid="skills-section" style={{ marginTop: 8 }}>
        <h3
          data-eid="skills-title"
          style={{
            color: "#f3f5fa",
            opacity: 0.85,
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 13,
            marginTop: 8,
            letterSpacing: 0,
          }}
        >
          Skill Breakdown
        </h3>
        {data.skills.map((skill, i) => {
          const eidBar =
            i === 0
              ? "skill-reading-bar"
              : i === 1
              ? "skill-writing-bar"
              : i === 2
              ? "skill-listening-bar"
              : i === 3
              ? "skill-speaking-bar"
              : "skill-grammar-bar";
          const eidWrap =
            i === 0
              ? "skill-reading"
              : i === 1
              ? "skill-writing"
              : i === 2
              ? "skill-listening"
              : i === 3
              ? "skill-speaking"
              : "skill-grammar";
          const eidLevel =
            i === 0
              ? "skill-reading-level"
              : i === 1
              ? "skill-writing-level"
              : i === 2
              ? "skill-listening-level"
              : i === 3
              ? "skill-speaking-level"
              : "skill-grammar-level";
          return (
            <div
              key={skill.name}
              data-eid={eidWrap}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                marginTop: 0,
              }}
            >
              <div
                style={{
                  width: "120px",
                  minWidth: "90px",
                  fontWeight: 500,
                  fontSize: 15,
                  color: "#dbdff4",
                  opacity: 0.95,
                }}
              >
                {skill.name}
              </div>
              <div
                style={{
                  flexGrow: 1,
                  height: 7,
                  background: "#232844",
                  borderRadius: 8,
                  marginRight: 12,
                  marginLeft: 10,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  data-eid={eidBar}
                  style={{
                    width: `${skill.percent}%`,
                    height: "100%",
                    background: progressBarColors[skill.key],
                    borderRadius: 8,
                    transition: "width 0.6s",
                  }}
                />
              </div>
              <span
                data-eid={eidLevel}
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: skillLevels[skill.key].color,
                  letterSpacing: 0,
                  minWidth: 28,
                  textAlign: "right",
                  marginRight: 4,
                }}
              >
                {skill.level}
              </span>
            </div>
          );
        })}
      </div>

      <div
        data-eid="today-stats"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 28,
          marginBottom: 6,
          background: "rgba(24,28,47,0.95)",
          borderRadius: 16,
          padding: "12px 9px 10px 9px",
          boxShadow: "0 1.5px 12px #21294a10",
          gap: 12,
        }}
      >
        <div
          data-eid="stat-xp"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fedc61",
            fontWeight: 700,
          }}
        >
          <Zap
            size={25}
            style={{
              color: "#fedc61",
              marginBottom: 2,
              marginTop: 1,
              opacity: 0.9,
            }}
            strokeWidth={2}
          />
          <div style={{ fontSize: 23, fontWeight: 700, marginBottom: 2 }}>{data.stats.xp}</div>
          <div style={{ fontSize: 13, color: "#b5b7cb" }}>XP</div>
        </div>
        <div
          data-eid="stat-streak"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fb7c2a",
            fontWeight: 700,
          }}
        >
          <Flame
            size={25}
            style={{
              color: "#fb7c2a",
              marginBottom: 2,
              marginTop: 1,
              opacity: 0.9,
            }}
            strokeWidth={2}
          />
          <div style={{ fontSize: 23, fontWeight: 700, marginBottom: 2 }}>{data.stats.streak}</div>
          <div style={{ fontSize: 13, color: "#b5b7cb" }}>DAYS</div>
        </div>
        <div
          data-eid="stat-words"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#6fb4fa",
            fontWeight: 700,
          }}
        >
          <BookOpen
            size={25}
            style={{
              color: "#6fb4fa",
              marginBottom: 2,
              marginTop: 1,
              opacity: 0.9,
            }}
            strokeWidth={2}
          />
          <div style={{ fontSize: 23, fontWeight: 700, marginBottom: 2 }}>{data.stats.words}</div>
          <div style={{ fontSize: 13, color: "#b5b7cb" }}>WORDS</div>
        </div>
        <div
          data-eid="stat-accuracy"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#3ed190",
            fontWeight: 700,
          }}
        >
          <Target
            size={25}
            style={{
              color: "#3ed190",
              marginBottom: 2,
              marginTop: 1,
              opacity: 0.93,
            }}
            strokeWidth={2}
          />
          <div style={{ fontSize: 23, fontWeight: 700, marginBottom: 2 }}>{data.stats.accuracy}%</div>
          <div style={{ fontSize: 13, color: "#b5b7cb" }}>ACCURACY</div>
        </div>
      </div>
      <div
        data-eid="lessons-section"
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
      >
        <h3
          data-eid="lessons-title"
          style={{
            color: "#e1e3ed",
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          Upcoming Lessons
        </h3>
        <div
          data-eid="lesson-0"
          style={{
            background: "#232844",
            borderRadius: 10,
            padding: "7px 14px 7px 13px",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
            gap: 17,
            boxShadow: "0 1px 7px #1b203235",
            fontWeight: 500,
          }}
        >
          <span
            data-eid="lesson-0-icon"
            style={{
              fontSize: 23,
              color: "#a383ff",
              marginRight: 9,
            }}
            aria-label="kanji"
          >
            文
          </span>
          <div style={{ fontWeight: 600, fontSize: 16, color: "#e7e3f8", flex: 1 }}>
            Kanji Radicals - Set 12
          </div>
          <span
            data-eid="lesson-0-time"
            style={{
              color: "#aaa8d3",
              fontWeight: 500,
              fontSize: 14,
              marginLeft: 5,
              letterSpacing: 0.1,
            }}
          >
            15 min
          </span>
        </div>
        <div
          data-eid="lesson-1"
          style={{
            background: "#232844",
            borderRadius: 10,
            padding: "7px 14px 7px 13px",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
            gap: 17,
            boxShadow: "0 1px 7px #1b203235",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              fontSize: 23,
              color: "#26d9a9",
              marginRight: 9,
            }}
            aria-label="verb"
          >
            詞
          </span>
          <div style={{ fontWeight: 600, fontSize: 16, color: "#e7e3f8", flex: 1 }}>
            Verb Conjugation Practice
          </div>
          <span
            data-eid="lesson-1-time"
            style={{
              color: "#aaa8d3",
              fontWeight: 500,
              fontSize: 14,
              marginLeft: 5,
              letterSpacing: 0.1,
            }}
          >
            20 min
          </span>
        </div>
        <div
          data-eid="lesson-2"
          style={{
            background: "#232844",
            borderRadius: 10,
            padding: "7px 14px 7px 13px",
            display: "flex",
            alignItems: "center",
            marginBottom: 6,
            gap: 17,
            boxShadow: "0 1px 7px #1b203235",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              fontSize: 23,
              color: "#62aeff",
              marginRight: 9,
            }}
            aria-label="audio"
          >
            {/* Headphone Unicode or 🎧 */}
            🎧
          </span>
          <div style={{ fontWeight: 600, fontSize: 16, color: "#e7e3f8", flex: 1 }}>
            Listening Comprehension N3
          </div>
        </div>
      </div>
    </section>
  );
}