import React from "react";
import data from "./data.json";

const priorityColors = {
  High: {
    background: "#2E1225",
    color: "#F0546E",
    border: "1px solid #F0546E",
  },
  Med: {
    background: "#251A08",
    color: "#FDB938",
    border: "1px solid #FDB938",
  },
  Low: {
    background: "#122513",
    color: "#3AD29F",
    border: "1px solid #3AD29F",
  },
};

const userColors = {
  AC: { background: "#F0546E", color: "#fff" },
  JS: { background: "#FDB938", color: "#fff" },
  KL: { background: "#ef3ada", color: "#fff" },
  PR: { background: "#3AD29F", color: "#fff" },
  MS: { background: "#8A6FE1", color: "#fff" },
  TW: { background: "#3BD8E7", color: "#fff" },
};

function PriorityBadge({ level, "data-eid": dataEid }: { level: "High" | "Med" | "Low"; "data-eid"?: string }) {
  const style = {
    ...priorityColors[level],
    fontSize: 12,
    fontWeight: 500,
    padding: "1px 10px",
    borderRadius: 9,
    marginRight: 8,
    display: "inline-block",
    minWidth: 38,
    textAlign: "center" as const,
    letterSpacing: 0.2,
    verticalAlign: "middle",
  };
  return (
    <span style={style} data-eid={dataEid}>
      {level}
    </span>
  );
}

function UserBadge({ initials }: { initials: string }) {
  const style = {
    background: userColors[initials].background,
    color: userColors[initials].color,
    borderRadius: "50%",
    display: "inline-block",
    minWidth: 22,
    width: 22,
    height: 22,
    fontSize: 13,
    fontWeight: 700,
    textAlign: "center" as const,
    lineHeight: "22px",
    marginLeft: 8,
    letterSpacing: 0.2,
  };
  return <span style={style}>{initials}</span>;
}

function TaskCard({
  title,
  date,
  priority,
  assignee,
  priorityEid,
  titleEid,
  dataEid,
}: {
  title: string;
  date: string;
  priority?: "High" | "Med" | "Low";
  assignee?: string;
  priorityEid?: string;
  titleEid?: string;
  dataEid: string;
}) {
  return (
    <div
      data-eid={dataEid}
      style={{
        background:
          "linear-gradient(135deg, rgba(30,32,56,0.85) 70%, rgba(41, 45, 73, 0.60) 100%)",
        border: "1.2px solid #282B46",
        borderRadius: 14,
        padding: "15px 16px 10px 16px",
        marginBottom: 15,
        boxShadow: "0 1px 2px 0 rgba(80,84,121,0.05)",
        minHeight: 77,
      }}
    >
      <div
        data-eid={titleEid}
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: 500,
          marginBottom: 10,
          letterSpacing: 0.05,
        }}
      >
        {title}
      </div>
      {(priority || assignee) && (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          {priority ? <PriorityBadge level={priority} data-eid={priorityEid} /> : null}
          {assignee && <UserBadge initials={assignee} />}
        </div>
      )}
      <div style={{ color: "#A2ADC7", fontSize: 13 }}>{date}</div>
    </div>
  );
}

const columnHeaderStyle = (color: string) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 500,
  color: "#F5F6FA",
  fontSize: 17,
  padding: "0 0 8px 0",
  letterSpacing: 0.03,
});

const columnCountBadgeStyle = (bg: string) => ({
  background: bg,
  color: "#fff",
  borderRadius: 12,
  fontWeight: 600,
  fontSize: 13,
  width: 30,
  height: 24,
  padding: "0 0px",
  textAlign: "center" as const,
  lineHeight: "24px",
  marginLeft: 8,
});

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 480,
        background: "linear-gradient(135deg, #191A2C 60%, #22243B 100%)",
        borderRadius: 22,
        padding: 26,
        boxSizing: "border-box",
        boxShadow: "0 2px 16px 0 #0B0D211A",
        fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: "flex", flexDirection: "column", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {/* Icon: grid */}
            <svg width={21} height={21} style={{ marginRight: 3, opacity: 0.97 }} viewBox="0 0 20 20" fill="none">
              <rect x="2.3" y="2.3" width="5.4" height="5.4" rx="1" fill="#282B46" stroke="#6170E3" strokeWidth="0.6" />
              <rect x="12.3" y="2.3" width="5.4" height="5.4" rx="1" fill="#282B46" stroke="#6170E3" strokeWidth="0.6" />
              <rect x="2.3" y="12.3" width="5.4" height="5.4" rx="1" fill="#282B46" stroke="#6170E3" strokeWidth="0.6" />
              <rect x="12.3" y="12.3" width="5.4" height="5.4" rx="1" fill="#282B46" stroke="#6170E3" strokeWidth="0.6" />
            </svg>
            <div
              data-eid="sprint-name"
              style={{ color: "#fff", fontSize: 21, fontWeight: 700, letterSpacing: 0.02 }}
            >
              {data.sprintName}
            </div>
          </div>
          <span
            data-eid="progress-pct"
            style={{
              color: "#A990F7",
              fontWeight: 700,
              fontSize: 18,
              marginLeft: 12,
              letterSpacing: 0.3,
            }}
          >
            {data.progressPct}
          </span>
        </div>
        <div
          data-eid="progress-bar"
          style={{
            width: "100%",
            height: 6,
            background: "#282B46",
            borderRadius: 8,
            position: "relative",
            marginBottom: 5,
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              background: "linear-gradient(90deg, #A990F7 0%, #A990F7 100%)",
              width: "64%",
              height: 6,
              borderRadius: 8,
              transition: "width 0.4s cubic-bezier(.31, .6, .13, 1.14)",
            }}
          />
        </div>
      </header>
      {/* Summary row */}
      <div
        data-eid="summary-row"
        style={{
          color: "#A2ADC7",
          fontWeight: 500,
          fontSize: 15,
          letterSpacing: 0,
          display: "flex",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        {/* Icon: calendar/tasks */}
        <svg
          width="17"
          height="17"
          fill="none"
          style={{ marginRight: 8, opacity: 0.8 }}
          viewBox="0 0 17 17"
        >
          <g>
            <rect x="2.7" y="3.25" width="12.0" height="10.5" rx="2.3" stroke="#A2ADC7" strokeWidth="1.08" fill="none"/>
            <rect x="11" y="7.2" width="2.25" height="2.25" rx="0.8" fill="#A2ADC7" />
          </g>
        </svg>
        <span data-eid="total-tasks">{data.totalTasks}</span>
      </div>
      {/* Kanban board */}
      <div
        data-eid="columns-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 0,
        }}
      >
        {/* To Do Column */}
        <div
          data-eid="col-todo"
          style={{
            background: "linear-gradient(139deg,#222646 65%,#22243B 100%)",
            borderRadius: 14,
            borderTop: "3px solid #6170E3",
            padding: "15px 11px 8px 11px",
            minHeight: 346,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div data-eid="col-todo-header" style={columnHeaderStyle("#6170E3")}>
            To Do
            <span
              data-eid="col-todo-count"
              style={columnCountBadgeStyle("#3D428A")}
            >4</span>
          </div>
          {/* Task cards */}
          <TaskCard
            dataEid="task-0"
            titleEid="task-0-title"
            priorityEid="task-0-priority"
            title="Setup CI pipeline"
            date="Mar 8"
            priority="High"
            assignee="AC"
          />
          <TaskCard
            dataEid="task-1"
            titleEid="task-1-title"
            priorityEid="task-1-priority"
            title="Write unit tests"
            date="Mar 10"
            priority="Med"
            assignee="JS"
          />
          <div
            data-eid="task-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,32,56,0.85) 70%, rgba(41, 45, 73, 0.60) 100%)",
              border: "1.2px solid #282B46",
              borderRadius: 14,
              padding: "15px 16px 10px 16px",
              marginBottom: 15,
              boxShadow: "0 1px 2px 0 rgba(80,84,121,0.05)",
              minHeight: 77,
            }}
          >
            <div
              data-eid="task-2-title"
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Update API docs
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
              <PriorityBadge level="Low" />
              <UserBadge initials="PR" />
            </div>
            <div style={{ color: "#A2ADC7", fontSize: 13 }}>Mar 12</div>
          </div>
          <TaskCard
            dataEid="task-3"
            titleEid="task-3-title"
            priorityEid="task-3-priority"
            title="Refactor auth module"
            date="Mar 7"
            priority="High"
            assignee="KL"
          />
        </div>
        {/* In Progress Column */}
        <div
          data-eid="col-inprogress"
          style={{
            background: "linear-gradient(135deg,#231F17 70%,#22243B 100%)",
            borderRadius: 14,
            borderTop: "3px solid #FDB938",
            padding: "15px 11px 8px 11px",
            minHeight: 346,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div data-eid="col-inprogress-header" style={columnHeaderStyle("#FDB938")}>
            In Progress
            <span
              data-eid="col-inprogress-count"
              style={columnCountBadgeStyle("#91762F")}
            >3</span>
          </div>
          <TaskCard
            dataEid="task-4"
            titleEid="task-4-title"
            priorityEid="task-4-priority"
            title="Dashboard redesign"
            date="Mar 6"
            priority="High"
            assignee="MS"
          />
          <div
            data-eid="task-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,32,56,0.85) 70%, rgba(41, 45, 73, 0.60) 100%)",
              border: "1.2px solid #282B46",
              borderRadius: 14,
              padding: "15px 16px 10px 16px",
              marginBottom: 15,
              boxShadow: "0 1px 2px 0 rgba(80,84,121,0.05)",
              minHeight: 77,
            }}
          >
            <div
              data-eid="task-5-title"
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Fix login bug
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
              <PriorityBadge level="Med" />
              <UserBadge initials="AC" />
            </div>
            <div style={{ color: "#A2ADC7", fontSize: 13 }}>Mar 5</div>
          </div>
          <div
            data-eid="task-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,32,56,0.85) 70%, rgba(41, 45, 73, 0.60) 100%)",
              border: "1.2px solid #282B46",
              borderRadius: 14,
              padding: "15px 16px 10px 16px",
              marginBottom: 15,
              boxShadow: "0 1px 2px 0 rgba(80,84,121,0.05)",
              minHeight: 77,
            }}
          >
            <div
              data-eid="task-6-title"
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Add search filter
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
              <PriorityBadge level="Low" />
              <UserBadge initials="TW" />
            </div>
            <div style={{ color: "#A2ADC7", fontSize: 13 }}>Mar 9</div>
          </div>
        </div>
        {/* Done Column */}
        <div
          data-eid="col-done"
          style={{
            background: "linear-gradient(135deg,#192629 70%,#22243B 100%)",
            borderRadius: 14,
            borderTop: "3px solid #3AD29F",
            padding: "15px 11px 8px 11px",
            minHeight: 346,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div data-eid="col-done-header" style={columnHeaderStyle("#3AD29F")}>
            Done
            <span
              data-eid="col-done-count"
              style={columnCountBadgeStyle("#1D594A")}
            >2</span>
          </div>
          <div
            data-eid="task-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,32,56,0.85) 70%, rgba(41, 45, 73, 0.60) 100%)",
              border: "1.2px solid #282B46",
              borderRadius: 14,
              padding: "15px 16px 10px 16px",
              marginBottom: 15,
              boxShadow: "0 1px 2px 0 rgba(80,84,121,0.05)",
              minHeight: 77,
            }}
          >
            <div
              data-eid="task-7-title"
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Database migration
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
              <PriorityBadge level="High" />
              <UserBadge initials="JS" />
            </div>
            <div style={{ color: "#A2ADC7", fontSize: 13 }}>Mar 3</div>
          </div>
          <div
            data-eid="task-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,32,56,0.85) 70%, rgba(41, 45, 73, 0.60) 100%)",
              border: "1.2px solid #282B46",
              borderRadius: 14,
              padding: "15px 16px 10px 16px",
              marginBottom: 15,
              boxShadow: "0 1px 2px 0 rgba(80,84,121,0.05)",
              minHeight: 77,
            }}
          >
            <div
              data-eid="task-8-title"
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Setup monitoring
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
              <PriorityBadge level="Med" />
              <UserBadge initials="PR" />
            </div>
            <div style={{ color: "#A2ADC7", fontSize: 13 }}>Mar 2</div>
          </div>
        </div>
      </div>
    </section>
  );
}