import React from "react";
import data from "./data.json";
import { RadialBarChart, RadialBar } from "recharts";

// Color Constants
const CATEGORY_COLORS = {
  Design: "#8e7fff",
  Development: "#50b7ff",
  QA: "#49c5b1",
  Launch: "#ffa940",
};

const STATUS_COLORS = {
  Complete: "#21d392",
  "In Progress": "#3582fa",
  "Not Started": "#50597F",
};

const STATUS_BG = {
  Complete: "#16292c",
  "In Progress": "#1d284c",
  "Not Started": "#282953",
};

const AVATAR_COLORS = [
  "#6f5ad8", // AK
  "#4c37a6", // LM
  "#4c37a6", // LM
  "#369bdb",
  "#3566da",
  "#2f8175",
  "#2f8175",
  "#fa9815",
];

const TEAM_AVATAR_COLORS = ["#6f5ad8", "#4c37a6"];

const months = ["Jan", "Feb", "Mar", "Apr"];
const monthColPerc = [0, 0.25, 0.5, 0.75, 1];

function getMonthFraction(dateString: string) {
  // Returns value from 0 (start of Jan) to 1 (end of Apr)
  const [monthStr, dayStr] = dateString.split(" ");
  const day = parseInt(dayStr, 10);
  const monthIdx = ["Jan", "Feb", "Mar", "Apr"].indexOf(monthStr);
  const monthDays = [31, 29, 31, 30]; // 2026, leap year.
  const totalDays = 31 + 29 + 31 + 30;
  let days = 0;
  for (let i = 0; i < monthIdx; i++) days += monthDays[i];
  days += day - 1;
  return days / totalDays;
}

function getGanttBarPos(start: string, end: string) {
  // start and end in "Mon D" format
  const s = getMonthFraction(start);
  const e = getMonthFraction(end);
  return { left: `${s * 100}%`, width: `${(e - s) * 100}%` };
}

// Used for milestones/today positioning
const timelineGridLeft = 158; // px --- Match number for accurate overlay

const timelineGridWidth = 388; // px (matches visual size)

function getTimelineX(dateStr: string) {
  // px offset within timeline grid for a date
  return (
    timelineGridLeft +
    getMonthFraction(dateStr) * timelineGridWidth
  );
}

// --- Widget ---
const Widget: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{
        background:
          "linear-gradient(160deg, #262253 0%, #1b1b36 100%)",
        borderRadius: "24px 0 0 0",
        padding: "32px 0 0 40px",
        width: 610,
        minHeight: 830,
        fontFamily: "Inter, sans-serif",
        color: "#fff",
        position: "relative",
        overflow: "visible",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div data-eid="header-left">
          <div
            data-eid="project-name"
            style={{
              fontWeight: 700,
              fontSize: 24,
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              letterSpacing: 0.1,
              lineHeight: 1.1,
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: 8 }}
            >
              <rect width={20} height={20} rx={3} fill="#7A76FF" />
              <path d="M6 15l4-6 4 6" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
            </svg>
            Phoenix Redesign
          </div>
          <div
            data-eid="project-subtitle"
            style={{
              fontWeight: 400,
              fontSize: 16,
              color: "#bfc8e8",
              marginTop: 2,
              marginBottom: 0,
              letterSpacing: 0.05,
            }}
          >
            Q1 2026 Sprint Plan
          </div>
        </div>
        <div
          data-eid="header-right"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingTop: 4,
          }}
        >
          <div
            data-eid="progress-ring"
            style={{
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <RadialBarChart
              width={50}
              height={50}
              cx={25}
              cy={25}
              innerRadius={18}
              outerRadius={24}
              barSize={7}
              startAngle={90}
              endAngle={-270}
              data={[{ value: data.progress }]}
            >
              <RadialBar
                background
                clockWise
                dataKey="value"
                fill="#868fff"
                cornerRadius={50}
              />
            </RadialBarChart>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 15,
                color: "#fff",
                pointerEvents: "none",
                letterSpacing: 0,
              }}
            >
              {data.progress + "%"}
            </div>
          </div>
          <div
            data-eid="date-range"
            style={{
              color: "#d0daf4",
              fontWeight: 500,
              fontSize: 16,
              marginLeft: 6,
              whiteSpace: "nowrap",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              stroke="#bfc8e8"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: 1 }}
            >
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M16 2v4M8 2v4" />
              <path d="M3 10h18" />
            </svg>
            Jan 6 - Apr 18
          </div>
        </div>
      </header>

      {/* Legend */}
      <div
        data-eid="legend-row"
        style={{
          display: "flex",
          gap: 22,
          marginTop: 6,
          marginBottom: 13,
        }}
      >
        <span
          data-eid="legend-design"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 15,
            color: "#c9c4f7",
            gap: 7,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 7,
              borderRadius: 5,
              background: CATEGORY_COLORS.Design,
            }}
          />
          Design
        </span>
        <span
          data-eid="legend-dev"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 15,
            color: "#b8e6fa",
            gap: 7,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 7,
              borderRadius: 5,
              background: CATEGORY_COLORS.Development,
            }}
          />
          Development
        </span>
        <span
          data-eid="legend-qa"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 15,
            color: "#a9fae2",
            gap: 7,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 7,
              borderRadius: 5,
              background: CATEGORY_COLORS.QA,
            }}
          />
          QA
        </span>
        <span
          data-eid="legend-launch"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 15,
            color: "#ffd49b",
            gap: 7,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 7,
              borderRadius: 5,
              background: CATEGORY_COLORS.Launch,
            }}
          />
          Launch
        </span>
      </div>

      {/* Timeline Headers */}
      <div
        data-eid="timeline-header"
        style={{
          display: "flex",
          gap: 0,
          alignItems: "center",
          borderBottom: "1px solid #3f3b65",
          paddingBottom: 3,
          marginBottom: 5,
          fontWeight: 700,
          fontSize: 13.5,
          color: "#bfc8e8",
          letterSpacing: 1,
        }}
      >
        <span data-eid="timeline-col-task" style={{ width: 144, paddingLeft: 8 }}>
          TASK
        </span>
        <span
          data-eid="timeline-col-jan"
          style={{
            width: 97,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          JAN
        </span>
        <span
          data-eid="timeline-col-feb"
          style={{
            width: 97,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          FEB
        </span>
        <span
          data-eid="timeline-col-mar"
          style={{
            width: 97,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          MAR
        </span>
        <span
          data-eid="timeline-col-apr"
          style={{
            width: 97,
            textAlign: "center",
            letterSpacing: 2,
            marginRight: 9,
          }}
        >
          APR
        </span>
      </div>

      {/* Timeline grid and tasks */}
      <div
        data-eid="timeline-grid"
        style={{
          width: 545,
          minHeight: 298,
          position: "relative",
          marginBottom: 16,
        }}
      >
        {/* Vertical Month Grid Lines */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={"grid-col" + i}
            style={{
              position: "absolute",
              left: timelineGridLeft + (i === 4 ? timelineGridWidth : (i - 0) * 97) + 0.5, // align to month end
              top: 0,
              height: "100%",
              width: 1,
              background: "#3d3970",
              zIndex: 1,
            }}
          />
        ))}

        {/* Today marker */}
        <div
          data-eid="today-marker"
          style={{
            position: "absolute",
            left: getTimelineX(data.today),
            top: 2,
            height: 252,
            width: 1.5,
            background: "#fa5150",
            zIndex: 3,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            data-eid="today-label"
            style={{
              transform: "translate(-32px,-8px)",
              color: "#fa5150",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.2px",
              position: "absolute",
              background: "transparent",
              top: -4,
              left: 0,
              userSelect: "none",
            }}
          >
            Today
          </span>
        </div>

        {/* Milestones */}
        {data.milestones.map((mile, i) => (
          <div
            data-eid={`milestone-${i}`}
            key={"milestone-" + i}
            style={{
              position: "absolute",
              left: getTimelineX(mile.date) - 7, // center diamond
              top: 258 + (i * 20),
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <svg width={16} height={16} viewBox="0 0 16 16">
              <polygon
                points="8,2 14,8 8,14 2,8"
                fill="#ffa940"
                stroke="#ffa940"
              />
            </svg>
            <span
              data-eid={`milestone-${i}-label`}
              style={{
                color: "#ffc54e",
                fontWeight: 700,
                fontSize: 14,
                marginLeft: 4,
                whiteSpace: "nowrap",
                userSelect: "none",
                textShadow: "1px 1px 2px #211f3c",
              }}
            >
              {mile.label} ({mile.date})
            </span>
          </div>
        ))}

        {/* TASK ROWS */}
        {data.tasks.map((task, idx) => (
          <div
            data-eid={`task-${idx}`}
            key={task.name}
            style={{
              display: "flex",
              alignItems: "center",
              height: 32,
              position: "relative",
            }}
          >
            {/* Avatar */}
            <span
              data-eid={`task-${idx}-avatar`}
              style={{
                width: 34,
                height: 34,
                minWidth: 34,
                minHeight: 34,
                borderRadius: "50%",
                background:
                  AVATAR_COLORS[idx % AVATAR_COLORS.length],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                position: "relative",
                marginLeft: 0,
                marginRight: 7,
                marginTop: 3,
                marginBottom: 3,
                letterSpacing: 0.1,
                border: "2px solid #262253",
                boxSizing: "border-box",
              }}
              title={task.assigneeName}
            >
              {task.avatar}
            </span>
            <span
              data-eid={`task-${idx}-name`}
              style={{
                fontWeight: 600,
                fontSize: 15.5,
                color: "#e7e8f6",
                minWidth: 98,
                width: 98,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginRight: 0,
                userSelect: "none",
              }}
            >
              {task.name}
            </span>
            {/* Gantt Bar column */}
            <div
              data-eid={`task-${idx}-bar`}
              style={{
                position: "absolute",
                left: timelineGridLeft,
                top: 6,
                width: timelineGridWidth,
                height: 21,
                background: "none",
                borderRadius: 8,
              }}
            >
              {/* Gantt BG bar */}
              <div
                style={{
                  width: "100%",
                  height: 17,
                  background: "#28244d",
                  borderRadius: 7,
                  position: "relative",
                  marginTop: 2,
                }}
              />
              {/* Actual bar */}
              <div
                style={{
                  position: "absolute",
                  ...getGanttBarPos(task.start, task.end),
                  height: 17,
                  borderRadius: 7,
                  background: CATEGORY_COLORS[task.category],
                  opacity: 0.36,
                  zIndex: 2,
                  top: 2,
                }}
              ></div>
              {/* Progress fill */}
              <div
                data-eid={`task-${idx}-bar-fill`}
                style={{
                  position: "absolute",
                  ...getGanttBarPos(
                    task.start,
                    task.status === "Not Started"
                      ? task.start
                      : task.progress
                      ? // Compute display progress
                        (function () {
                          const total = getMonthFraction(task.end) - getMonthFraction(task.start);
                          const prog =
                            getMonthFraction(task.start) +
                            (task.progress / 100) * total;
                          // If complete show full
                          if (task.status === "Complete") return task.end;
                          // In-Progress show progress percent
                          return [
                            months[Math.floor(prog * 4)],
                            Math.round(
                              (prog * (31 + 29 + 31 + 30)) % (31 + 29 + 31 + 30),
                            ) + 1,
                          ].join(" ");
                        })()
                      : task.start,
                  ),
                  height: 17,
                  borderRadius: 7,
                  background: CATEGORY_COLORS[task.category],
                  opacity: 1,
                  zIndex: 4,
                  top: 2,
                  transition: "width .2s",
                  ...(task.status === "Not Started" && {
                    width: 0,
                  }),
                }}
              ></div>
            </div>
            {/* Status badge */}
            <span
              data-eid={`task-${idx}-status`}
              style={{
                fontWeight: 700,
                fontSize: 13.3,
                padding: "1.5px 15px",
                borderRadius: 14,
                background: STATUS_BG[task.status],
                color:
                  task.status === "Complete"
                    ? "#0ad879"
                    : task.status === "In Progress"
                    ? "#7ac1fa"
                    : "#9196ca",
                position: "absolute",
                left: timelineGridLeft + timelineGridWidth + 16,
                minWidth: 64,
                textAlign: "center",
                top: 3,
                whiteSpace: "nowrap",
                userSelect: "none",
                border:
                  task.status === "Complete"
                    ? "1.5px solid #22da87"
                    : task.status === "In Progress"
                    ? "1.5px solid #3a93e8"
                    : "1.5px solid #3e4273",
              }}
            >
              {task.status}
            </span>
            {/* Task date range */}
            <span
              data-eid={`task-${idx}-dates`}
              style={{
                color: "#aab3d6",
                fontWeight: 500,
                fontSize: 13,
                position: "absolute",
                left: timelineGridLeft + timelineGridWidth + 123,
                top: 9.5,
                minWidth: 88,
                whiteSpace: "nowrap",
                userSelect: "none",
                textShadow: "none",
              }}
            >
              {task.start} - {task.end}
            </span>
          </div>
        ))}
      </div>

      {/* Team section */}
      <div
        data-eid="team-section"
        style={{
          marginTop: 18,
          marginBottom: 16,
          paddingLeft: 0,
        }}
      >
        <div
          data-eid="team-title"
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "#d0daf4",
            marginBottom: 10,
            marginLeft: 2,
            letterSpacing: 0.2,
          }}
        >
          Team
        </div>
        {data.team.map((member, idx) => (
          <div
            data-eid={`team-member-${idx}`}
            key={member.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 4,
              marginLeft: 3,
            }}
          >
            <span
              data-eid={`team-member-${idx}-avatar`}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: TEAM_AVATAR_COLORS[idx % 2],
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.1px",
                border: "2px solid #252251",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              {member.avatar}
            </span>
            <span
              data-eid={`team-member-${idx}-name`}
              style={{
                fontWeight: 600,
                fontSize: 15.5,
                color: "#e7e8f6",
                minWidth: 104,
                marginRight: 0,
                userSelect: "none",
              }}
            >
              {member.name}
            </span>
            <span
              data-eid={`team-member-${idx}-role`}
              style={{
                fontWeight: 500,
                color: "#8b97ca",
                fontSize: 15,
                marginLeft: 20,
                userSelect: "none",
              }}
            >
              {member.role}
            </span>
          </div>
        ))}
      </div>

      {/* Summary Row */}
      <div
        data-eid="summary-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          marginTop: 8,
          marginLeft: 2,
          marginBottom: 8,
        }}
      >
        <div
          data-eid="summary-total"
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#c3c6e6",
            background: "#27224b",
            padding: "4px 17px",
            borderRadius: 14,
            letterSpacing: 0.1,
            marginRight: 8,
            userSelect: "none",
          }}
        >
          {data.summary.total} Tasks
        </div>
        <div
          data-eid="summary-completed"
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#19f680",
            background: "#16292c",
            padding: "4px 14px",
            borderRadius: 14,
            userSelect: "none",
          }}
        >
          {data.summary.completed} Done
        </div>
        <div
          data-eid="summary-in-progress"
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#66bdfe",
            background: "#1d284c",
            padding: "4px 13px",
            borderRadius: 14,
            userSelect: "none",
          }}
        >
          {data.summary.inProgress} Active
        </div>
        <div
          data-eid="summary-on-track"
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#ffa940",
            background: "#302725",
            padding: "4px 13px",
            borderRadius: 14,
            userSelect: "none",
          }}
        >
          {data.summary.onTrack}% On Track
        </div>
      </div>
    </section>
  );
};

export default Widget;