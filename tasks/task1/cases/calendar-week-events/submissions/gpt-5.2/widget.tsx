// submissions/gpt/widget.tsx
import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import data from "./data.json";

type EventItem = {
  title: string;
  dayIndex: number; // 0..4 (Mon..Fri)
  startHour: number; // 8..18
  startMinute: number; // 0..59
  endHour: number;
  endMinute: number;
  category: "Work" | "Personal" | "Meeting";
};

const COLORS: Record<string, { edge: string; fill: string; text: string }> = {
  Work: { edge: "#3B82F6", fill: "rgba(59,130,246,0.16)", text: "#7DB0FF" },
  Personal: { edge: "#22C55E", fill: "rgba(34,197,94,0.16)", text: "#57E08A" },
  Meeting: { edge: "#A855F7", fill: "rgba(168,85,247,0.16)", text: "#D07CFF" },
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Widget() {
  const startHour = 8;
  const endHour = 18;
  const hours = useMemo(() => {
    const arr: { label: string; h: number; eid: string }[] = [];
    const map: Record<number, string> = {
      8: "time-8am",
      9: "time-9am",
      10: "time-10am",
      11: "time-11am",
      12: "time-12pm",
      13: "time-1pm",
      14: "time-2pm",
      15: "time-3pm",
      16: "time-4pm",
      17: "time-5pm",
      18: "time-6pm",
    };
    for (let h = startHour; h <= endHour; h++) {
      const isPM = h >= 12;
      const display = ((h + 11) % 12) + 1;
      const suffix = isPM ? "PM" : "AM";
      arr.push({ label: `${display} ${suffix}`, h, eid: map[h] });
    }
    return arr;
  }, []);

  const gridTop = 92; // space for header + day headings
  const gridLeft = 62; // time axis width
  const gridRight = 18;
  const gridBottom = 62; // legend
  const height = 580;
  const width = 560;

  const gridW = width - gridLeft - gridRight;
  const gridH = height - gridTop - gridBottom;

  const dayCount = data.days.length;
  const colW = gridW / dayCount;

  const minuteToY = (h: number, m: number) => {
    const total = (h - startHour) * 60 + m;
    const max = (endHour - startHour) * 60;
    return (total / max) * gridH;
  };

  const renderEvent = (ev: EventItem, idx: number) => {
    const cat = COLORS[ev.category] || COLORS.Work;

    const y1 = clamp(minuteToY(ev.startHour, ev.startMinute), 0, gridH);
    const y2 = clamp(minuteToY(ev.endHour, ev.endMinute), 0, gridH);
    const top = gridTop + y1;
    const h = Math.max(28, y2 - y1);

    const left = gridLeft + ev.dayIndex * colW + 10;
    const w = colW - 20;

    const startLabel = (() => {
      const isPM = ev.startHour >= 12;
      const display = ((ev.startHour + 11) % 12) + 1;
      if (ev.startMinute === 0) return `${display} ${isPM ? "PM" : "AM"}`;
      const mm = String(ev.startMinute).padStart(2, "0");
      return `${display}:${mm} ${isPM ? "PM" : "AM"}`;
    })();

    const eid = `event-${idx}`;

    return (
      <div
        key={idx}
        data-eid={eid}
        style={{
          position: "absolute",
          left,
          top,
          width: w,
          height: h,
          borderRadius: 10,
          background: `linear-gradient(180deg, ${cat.fill}, rgba(0,0,0,0))`,
          boxShadow: "0 10px 18px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: cat.edge,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <div style={{ padding: "8px 10px 8px 10px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: cat.text,
              lineHeight: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
            title={ev.title}
          >
            {ev.title}
          </div>
          <div style={{ marginTop: 2, fontSize: 10, color: "rgba(214,227,255,0.65)" }}>
            {startLabel}
          </div>
        </div>
      </div>
    );
  };

  const hourLineCount = endHour - startHour + 1;

  return (
    <section
      data-eid="root"
      style={{
        width,
        height,
        borderRadius: 24,
        padding: 14,
        boxSizing: "border-box",
        background:
          "radial-gradient(1200px 600px at 30% 15%, rgba(74,62,255,0.22), rgba(0,0,0,0) 55%), linear-gradient(180deg, #14173a 0%, #0d1230 50%, #0a1029 100%)",
        color: "#E9EEFF",
        position: "relative",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 8px 8px 8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 8,
              background: "rgba(140,130,255,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 0 1px rgba(160,170,255,0.10)",
            }}
          >
            <CalendarIcon size={14} color="#BFC8FF" />
          </div>
          <div
            data-eid="month-title"
            style={{ fontSize: 20, fontWeight: 800, letterSpacing: 0.2 }}
          >
            {data.monthTitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            data-eid="week-badge"
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(170,160,255,0.10)",
              color: "rgba(226,230,255,0.80)",
              boxShadow: "inset 0 0 0 1px rgba(190,190,255,0.14)",
            }}
          >
            {data.weekBadge}
          </span>
          <span
            data-eid="nav-prev"
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(222,228,255,0.75)",
            }}
          >
            <ChevronLeft size={18} />
          </span>
          <span
            data-eid="nav-next"
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(222,228,255,0.75)",
            }}
          >
            <ChevronRight size={18} />
          </span>
        </div>
      </header>

      {/* Day headers */}
      <div style={{ position: "absolute", left: gridLeft, top: 56, right: gridRight, height: 50 }}>
        <div style={{ display: "flex", height: "100%" }}>
          {data.days.map(
            (
              d: { dow: string; date: number; current?: boolean },
              i: number
            ) => {
              const eid = `day-col-${i}` as const;
              const isCurrent = !!d.current;
              return (
                <div
                  key={i}
                  data-eid={eid}
                  style={{
                    width: colW,
                    textAlign: "center",
                    color: "rgba(196,205,255,0.65)",
                    fontSize: 12,
                    position: "relative",
                    paddingTop: 4,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ fontSize: 11, marginBottom: 4 }}>{d.dow}</div>
                  <div
                    style={{
                      margin: "0 auto",
                      width: 64,
                      height: 34,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 800,
                      color: isCurrent ? "#EDEBFF" : "#E7ECFF",
                      background: isCurrent ? "rgba(160,140,255,0.18)" : "transparent",
                      boxShadow: isCurrent
                        ? "inset 0 0 0 1px rgba(196,180,255,0.22)"
                        : "none",
                    }}
                  >
                    {d.date}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Time axis */}
      <div
        data-eid="time-axis"
        style={{
          position: "absolute",
          left: 10,
          top: gridTop,
          width: gridLeft - 10,
          height: gridH,
          color: "rgba(196,205,255,0.55)",
          fontSize: 11,
        }}
      >
        {hours.map((t) => {
          const y = ((t.h - startHour) / (endHour - startHour)) * gridH;
          return (
            <span
              key={t.h}
              data-eid={t.eid}
              style={{
                position: "absolute",
                left: 0,
                top: y - 7,
                width: "100%",
                textAlign: "left",
              }}
            >
              {t.label}
            </span>
          );
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          left: gridLeft,
          top: gridTop,
          width: gridW,
          height: gridH,
          borderRadius: 14,
          background: "rgba(255,255,255,0.02)",
          boxShadow: "inset 0 0 0 1px rgba(170,180,255,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Vertical lines */}
        {Array.from({ length: dayCount + 1 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: i * colW,
              width: 1,
              background: "rgba(170,180,255,0.06)",
            }}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: hourLineCount }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: (i / (hourLineCount - 1)) * gridH,
              height: 1,
              background: "rgba(170,180,255,0.06)",
            }}
          />
        ))}
      </div>

      {/* Events overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {(data.events as EventItem[]).map((ev, idx) => renderEvent(ev, idx))}
      </div>

      {/* Legend */}
      <div
        data-eid="legend"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 18,
          display: "flex",
          justifyContent: "center",
          gap: 18,
          fontSize: 12,
          color: "rgba(205,214,255,0.70)",
        }}
      >
        <span data-eid="legend-work" style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: COLORS.Work.edge,
              display: "inline-block",
            }}
          />
          Work
        </span>
        <span
          data-eid="legend-personal"
          style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: COLORS.Personal.edge,
              display: "inline-block",
            }}
          />
          Personal
        </span>
        <span
          data-eid="legend-meeting"
          style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: COLORS.Meeting.edge,
              display: "inline-block",
            }}
          />
          Meeting
        </span>
      </div>
    </section>
  );
}