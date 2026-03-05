// submissions/gpt-widget/widget.tsx
import React, { useMemo } from "react";
import data from "./data.json";
import { RadialBarChart, RadialBar } from "recharts";
import { CalendarDays } from "lucide-react";

type Task = {
  name: string;
  assigneeInitials: string;
  assigneeColor: string;
  category: "Design" | "Development" | "QA" | "Launch";
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  progress: number; // 0..1
  status: "Complete" | "In Progress" | "Not Started";
  datesLabel: string;
  barColor: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function parseDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}

function daysBetween(a: string, b: string) {
  const ms = parseDate(b) - parseDate(a);
  return ms / (1000 * 60 * 60 * 24);
}

function fmtShort(iso: string) {
  const d = new Date(parseDate(iso));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

export default function Widget() {
  const start = data.timeline.start as string;
  const end = data.timeline.end as string;
  const today = data.timeline.today as string;

  const totalDays = useMemo(() => Math.max(1, daysBetween(start, end)), [start, end]);

  const monthColumns = [
    { key: "Jan", label: "JAN" },
    { key: "Feb", label: "FEB" },
    { key: "Mar", label: "MAR" },
    { key: "Apr", label: "APR" },
  ];

  const leftColW = 158; // task label column
  const rightColW = 140; // status+date column area
  const timelineW = 340; // month grid width
  const rowH = 34;
  const gridTopPad = 8;

  const statusPill = (status: Task["status"]) => {
    if (status === "Complete") return { bg: "rgba(16,185,129,0.20)", fg: "#34d399", bd: "rgba(16,185,129,0.35)" };
    if (status === "In Progress") return { bg: "rgba(59,130,246,0.18)", fg: "#93c5fd", bd: "rgba(59,130,246,0.32)" };
    return { bg: "rgba(148,163,184,0.16)", fg: "#94a3b8", bd: "rgba(148,163,184,0.28)" };
  };

  const catLegend = [
    { label: "Design", color: "#a78bfa", eid: "legend-design" },
    { label: "Development", color: "#60a5fa", eid: "legend-dev" },
    { label: "QA", color: "#34d399", eid: "legend-qa" },
    { label: "Launch", color: "#fb923c", eid: "legend-launch" },
  ] as const;

  const tasks = data.tasks as Task[];

  const todayPosPx = useMemo(() => {
    const t = clamp(daysBetween(start, today) / totalDays, 0, 1);
    return Math.round(t * timelineW);
  }, [start, today, totalDays]);

  const milestonePosPx = (iso: string) => {
    const t = clamp(daysBetween(start, iso) / totalDays, 0, 1);
    return Math.round(t * timelineW);
  };

  const radialData = [{ name: "progress", value: data.header.progressPercent }];

  return (
    <section
      data-eid="root"
      style={{
        width: 470,
        height: 640,
        borderRadius: 18,
        padding: 18,
        boxSizing: "border-box",
        color: "#e5e7eb",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        background:
          "radial-gradient(1100px 560px at 20% 0%, rgba(99,102,241,0.25) 0%, rgba(15,23,42,0) 55%), linear-gradient(145deg, #10163a 0%, #0b1025 55%, #070a18 100%)",
        boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 10,
        }}
      >
        <div data-eid="header-left" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div data-eid="project-name" style={{ fontSize: 22, fontWeight: 750, letterSpacing: 0.2, display: "flex", alignItems: "center", gap: 8 }}>
            <span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                background: "rgba(59,130,246,0.18)",
                border: "1px solid rgba(99,102,241,0.35)",
              }}
            >
              <CalendarDays size={14} color="#c7d2fe" />
            </span>
            {data.header.projectName}
          </div>
          <div data-eid="project-subtitle" style={{ fontSize: 13, color: "rgba(226,232,240,0.72)" }}>
            {data.header.subtitle}
          </div>
        </div>

        <div data-eid="header-right" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            data-eid="progress-ring"
            style={{
              width: 46,
              height: 46,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RadialBarChart
              width={46}
              height={46}
              cx={23}
              cy={23}
              innerRadius={16}
              outerRadius={22}
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" cornerRadius={10} fill="#7c83ff" background={{ fill: "rgba(148,163,184,0.16)" }} />
            </RadialBarChart>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#e5e7eb",
              }}
            >
              {data.header.progressPercent}%
            </div>
          </div>

          <div
            data-eid="date-range"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12.5,
              color: "rgba(226,232,240,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "rgba(148,163,184,0.12)",
                border: "1px solid rgba(148,163,184,0.25)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarDays size={12} color="rgba(226,232,240,0.7)" />
            </span>
            {data.header.dateRange}
          </div>
        </div>
      </header>

      {/* Legend */}
      <div data-eid="legend-row" style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        {catLegend.map((l) => (
          <span key={l.label} data-eid={l.eid} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(226,232,240,0.8)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: l.color, boxShadow: `0 0 0 2px rgba(255,255,255,0.02) inset` }} />
            {l.label}
          </span>
        ))}
      </div>

      {/* Timeline Header */}
      <div
        data-eid="timeline-header"
        style={{
          display: "grid",
          gridTemplateColumns: `${leftColW}px ${timelineW}px ${rightColW}px`,
          alignItems: "center",
          padding: "0 0 8px 0",
          color: "rgba(148,163,184,0.85)",
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: 0.8,
        }}
      >
        <span data-eid="timeline-col-task" style={{ paddingLeft: 2 }}>
          TASK
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          <span data-eid="timeline-col-jan" style={{ textAlign: "center" }}>
            JAN
          </span>
          <span data-eid="timeline-col-feb" style={{ textAlign: "center" }}>
            FEB
          </span>
          <span data-eid="timeline-col-mar" style={{ textAlign: "center" }}>
            MAR
          </span>
          <span data-eid="timeline-col-apr" style={{ textAlign: "center" }}>
            APR
          </span>
        </div>
        <span style={{ opacity: 0 }}>.</span>
      </div>

      {/* Grid */}
      <div
        data-eid="timeline-grid"
        style={{
          position: "relative",
          height: 370,
          borderRadius: 14,
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(148,163,184,0.12)",
          overflow: "hidden",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* vertical month grid lines */}
        <div
          style={{
            position: "absolute",
            left: leftColW,
            top: 0,
            width: timelineW,
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(i * 100) / 4}%`,
                top: 0,
                bottom: 0,
                width: 1,
                background: i === 0 || i === 4 ? "rgba(148,163,184,0.10)" : "rgba(148,163,184,0.08)",
              }}
            />
          ))}
        </div>

        {/* Today marker */}
        <div
          data-eid="today-marker"
          style={{
            position: "absolute",
            left: leftColW + todayPosPx,
            top: 0,
            bottom: 0,
            width: 2,
            background: "rgba(239,68,68,0.65)",
            boxShadow: "0 0 0 1px rgba(239,68,68,0.12)",
            pointerEvents: "none",
          }}
        >
          <span
            data-eid="today-label"
            style={{
              position: "absolute",
              top: 6,
              left: -16,
              transform: "translateX(-50%)",
              fontSize: 11,
              color: "rgba(239,68,68,0.9)",
              fontWeight: 700,
            }}
          >
            Today
          </span>
        </div>

        {/* Task rows */}
        {tasks.map((t, idx) => {
          const x0 = clamp(daysBetween(start, t.start) / totalDays, 0, 1) * timelineW;
          const x1 = clamp(daysBetween(start, t.end) / totalDays, 0, 1) * timelineW;
          const w = Math.max(10, x1 - x0);
          const y = gridTopPad + idx * rowH;

          const pill = statusPill(t.status);

          const taskEid = `task-${idx}` as const;
          const nameEid = `task-${idx}-name` as const;
          const avatarEid = `task-${idx}-avatar` as const;
          const barEid = `task-${idx}-bar` as const;
          const barFillEid = `task-${idx}-bar-fill` as const;
          const statusEid = `task-${idx}-status` as const;
          const datesEid = `task-${idx}-dates` as const;

          return (
            <div
              key={t.name}
              data-eid={taskEid}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: y,
                height: rowH,
                display: "grid",
                gridTemplateColumns: `${leftColW}px ${timelineW}px ${rightColW}px`,
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 8 }}>
                <span
                  data-eid={avatarEid}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#0b1025",
                    background: t.assigneeColor,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)",
                    flex: "0 0 auto",
                  }}
                >
                  {t.assigneeInitials}
                </span>
                <span data-eid={nameEid} style={{ fontSize: 12.5, color: "rgba(226,232,240,0.9)" }}>
                  {t.name}
                </span>
              </div>

              <div style={{ position: "relative", height: 18 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 10,
                    right: 10,
                    top: 0,
                    bottom: 0,
                    borderRadius: 6,
                    background: "rgba(148,163,184,0.06)",
                    border: "1px solid rgba(148,163,184,0.10)",
                  }}
                />
                <div
                  data-eid={barEid}
                  style={{
                    position: "absolute",
                    left: 10 + x0,
                    top: 1,
                    height: 16,
                    width: w,
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(226,232,240,0.14)",
                    overflow: "hidden",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    data-eid={barFillEid}
                    style={{
                      height: "100%",
                      width: `${Math.round(t.progress * 100)}%`,
                      background: t.barColor,
                      opacity: 0.95,
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
                <span
                  data-eid={statusEid}
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: pill.bg,
                    border: `1px solid ${pill.bd}`,
                    color: pill.fg,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.status}
                </span>
                <span
                  data-eid={datesEid}
                  style={{
                    fontSize: 11,
                    color: "rgba(148,163,184,0.9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.datesLabel}
                </span>
              </div>
            </div>
          );
        })}

        {/* Milestones */}
        {data.milestones.map((m: any, i: number) => {
          const px = milestonePosPx(m.date);
          const top = 290 + i * 34;
          const e = `milestone-${i}` as const;
          const el = `milestone-${i}-label` as const;

          return (
            <div
              key={m.label}
              data-eid={e}
              style={{
                position: "absolute",
                left: leftColW + px,
                top,
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#fbbf24",
                  transform: "rotate(45deg)",
                  borderRadius: 2,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
                  border: "1px solid rgba(0,0,0,0.18)",
                }}
              />
              <span data-eid={el} style={{ fontSize: 11.5, fontWeight: 800, color: "#fbbf24", whiteSpace: "nowrap" }}>
                {m.label} ({fmtShort(m.date)})
              </span>
            </div>
          );
        })}
      </div>

      {/* Team */}
      <div data-eid="team-section" style={{ marginTop: 14 }}>
        <div data-eid="team-title" style={{ fontSize: 13, fontWeight: 800, color: "rgba(148,163,184,0.95)", marginBottom: 8 }}>
          Team
        </div>

        {/* member 0 */}
        <div
          data-eid="team-member-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 10px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(148,163,184,0.10)",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              data-eid="team-member-0-avatar"
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#a78bfa",
                color: "#0b1025",
                fontWeight: 900,
                fontSize: 11,
              }}
            >
              AK
            </span>
            <span data-eid="team-member-0-name" style={{ fontSize: 13, color: "rgba(226,232,240,0.92)", fontWeight: 700 }}>
              Anna Kim
            </span>
          </div>
          <span data-eid="team-member-0-role" style={{ fontSize: 12, color: "rgba(148,163,184,0.9)" }}>
            Product Lead
          </span>
        </div>

        {/* member 1 */}
        <div
          data-eid="team-member-1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 10px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(148,163,184,0.10)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              data-eid="team-member-1-avatar"
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#a78bfa",
                color: "#0b1025",
                fontWeight: 900,
                fontSize: 11,
              }}
            >
              LM
            </span>
            <span data-eid="team-member-1-name" style={{ fontSize: 13, color: "rgba(226,232,240,0.92)", fontWeight: 700 }}>
              Leo Martinez
            </span>
          </div>
          <span data-eid="team-member-1-role" style={{ fontSize: 12, color: "rgba(148,163,184,0.9)" }}>
            Designer
          </span>
        </div>
      </div>

      {/* Summary */}
      <div
        data-eid="summary-row"
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
        }}
      >
        {[
          { eid: "summary-total", big: data.summary.total, sub: "Tasks" },
          { eid: "summary-completed", big: data.summary.done, sub: "Done" },
          { eid: "summary-in-progress", big: data.summary.active, sub: "Active" },
          { eid: "summary-on-track", big: data.summary.onTrack, sub: "On Track" },
        ].map((s) => (
          <div
            key={s.eid}
            data-eid={s.eid}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(148,163,184,0.10)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 850, color: "rgba(226,232,240,0.94)" }}>{s.big}</div>
            <div style={{ marginTop: 2, fontSize: 11.5, color: "rgba(148,163,184,0.9)", fontWeight: 700 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}