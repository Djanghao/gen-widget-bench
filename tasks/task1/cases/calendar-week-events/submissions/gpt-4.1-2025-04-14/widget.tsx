import React from "react";
import data from "./data.json";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const dayCols = [
  { eid: "day-col-0", abbr: "Mon", day: "2" },
  { eid: "day-col-1", abbr: "Tue", day: "3" },
  { eid: "day-col-2", abbr: "Wed", day: "4", current: true },
  { eid: "day-col-3", abbr: "Thu", day: "5" },
  { eid: "day-col-4", abbr: "Fri", day: "6" },
];

const timeLabels = [
  { eid: "time-8am", label: "8 AM" },
  { eid: "time-9am", label: "9 AM" },
  { eid: "time-10am", label: "10 AM" },
  { eid: "time-11am", label: "11 AM" },
  { eid: "time-12pm", label: "12 PM" },
  { eid: "time-1pm", label: "1 PM" },
  { eid: "time-2pm", label: "2 PM" },
  { eid: "time-3pm", label: "3 PM" },
  { eid: "time-4pm", label: "4 PM" },
  { eid: "time-5pm", label: "5 PM" },
  { eid: "time-6pm", label: "6 PM" },
];

const eventColors: any = {
  Work: "#2873d7",
  Meeting: "#7a4fff",
  Personal: "#18b585",
};

const legendColors: any = {
  Work: "#2873d7",
  Personal: "#18b585",
  Meeting: "#7a4fff",
};

const EventBlock = ({
  eid,
  title,
  category,
  start,
  end,
  col,
}: {
  eid: string;
  title: string;
  category: string;
  start: string;
  end: string;
  col: number;
}) => {
  // Extract hour/min from time string e.g. "9:00"
  const toMinutes = (t: string) => {
    let [h, m] = t.split(":").map(Number);
    // Convert to 24h
    if (h < 7) h += 12;
    return h * 60 + m;
  };
  // Calendar is 8 AM = 480 mins, 6 PM = 1080 mins
  const top =
    ((toMinutes(start) - 480) / (1080 - 480)) * 524; // grid height: 524px for content area (excluding header/footer)
  const bottom =
    ((toMinutes(end) - 480) / (1080 - 480)) * 524;
  const left = 72 + col * 100.8;
  const width = 100.8 - 10;

  return (
    <div
      data-eid={eid}
      style={{
        position: "absolute",
        top: 72 + top,
        left: left,
        width: width,
        height: Math.max(bottom - top, 36),
        background: `linear-gradient(160deg, ${eventColors[category]}ee 90%, #14193c 120%)`,
        borderRadius: 8,
        zIndex: 3,
        color: "#fff",
        fontSize: 13,
        fontWeight: 500,
        padding: "6px 10px 4px 10px",
        boxSizing: "border-box",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        border: `1.5px solid ${eventColors[category] + "99"}`,
        boxShadow: "0 1px 10px #100d29b6",
        opacity: 0.98,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: 13, lineHeight: "16px" }}>
        {title}
      </span>
      <span
        style={{
          color: "#bdcada",
          fontWeight: 400,
          fontSize: 11.5,
          marginTop: 2,
          marginBottom: -1,
        }}
      >
        {start.replace(/:00/, "") + (["AM", "PM"].includes(end.slice(-2)) ? "" : " " + (parseInt(start) < 12 ? "AM" : "PM"))}
      </span>
    </div>
  );
};

// Mapping eid to event data
const eventsMeta = [
  {
    eid: "event-0",
    title: "Team Standup",
    category: "Work",
    start: "9:00",
    end: "9:30",
    col: 0,
  },
  {
    eid: "event-1",
    title: "Design Review",
    category: "Meeting",
    start: "2:00",
    end: "3:30",
    col: 0,
  },
  {
    eid: "event-2",
    title: "Sprint Planning",
    category: "Meeting",
    start: "10:00",
    end: "11:30",
    col: 1,
  },
  {
    eid: "event-3",
    title: "Dentist Appt",
    category: "Personal",
    start: "3:00",
    end: "4:00",
    col: 1,
  },
  {
    eid: "event-4",
    title: "API Integration",
    category: "Work",
    start: "9:00",
    end: "12:00",
    col: 2,
  },
  {
    eid: "event-5",
    title: "Lunch w/ Sarah",
    category: "Personal",
    start: "12:00",
    end: "1:00",
    col: 2,
  },
  {
    eid: "event-6",
    title: "Client Call",
    category: "Meeting",
    start: "11:00",
    end: "12:00",
    col: 3,
  },
  {
    eid: "event-7",
    title: "Code Deploy",
    category: "Work",
    start: "2:00",
    end: "4:00",
    col: 4,
  },
];

const gridCols = 5;
const gridRows = 10;

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 508,
        height: 606,
        background: "linear-gradient(160deg, #2c204d 65%, #181f33 100%)",
        borderRadius: 28,
        boxShadow: "0 1px 16px #53567c15",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* HEADER */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          minHeight: 68,
          padding: "24px 0px 0px 24px",
          position: "relative",
        }}
      >
        {/* Month title icon and text */}
        <CalendarIcon
          color="#fff"
          size={19}
          style={{ marginRight: 7, marginTop: 0, opacity: 0.83 }}
        />
        <div
          data-eid="month-title"
          style={{
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: 0.1,
            color: "#fff",
          }}
        >
          March 2026
        </div>
        <span style={{ flex: 1 }} />
        {/* Week badge */}
        <span
          data-eid="week-badge"
          style={{
            background: "#523b86",
            color: "#f3f3fa",
            fontWeight: 600,
            borderRadius: 16,
            fontSize: 15,
            padding: "4px 18px 4px 17px",
            marginRight: 10,
            marginLeft: 14,
            letterSpacing: 0.04,
            lineHeight: "20px",
            boxShadow: "0 1px 3px #6241b72e",
            position: "relative",
            top: 1,
          }}
        >
          W10
        </span>
        {/* Nav icons */}
        <span
          data-eid="nav-prev"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            marginLeft: 4,
            borderRadius: "50%",
            cursor: "pointer",
            background: "none",
            color: "#bcb7e8",
            transition: "background 0.17s",
          }}
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
        </span>
        <span
          data-eid="nav-next"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            marginLeft: 0,
            marginRight: 8,
            borderRadius: "50%",
            cursor: "pointer",
            background: "none",
            color: "#bcb7e8",
            transition: "background 0.17s",
          }}
        >
          <ChevronRight size={22} strokeWidth={2.4} />
        </span>
      </header>

      {/* GRID HEADER */}
      <div style={{ height: 40, display: "flex", flexDirection: "row", marginTop: 13, marginLeft: 60 }}>
        {/* Empty for time axis col */}
        <div style={{ width: 54 }} />
        {dayCols.map((d, idx) => (
          <div
            key={d.eid}
            data-eid={d.eid}
            style={{
              width: 100.8,
              textAlign: "center",
              color: d.current ? "#fff" : "#b2b8ca",
              padding: 0,
              fontWeight: d.current ? 700 : 500,
              fontSize: 15.5,
              letterSpacing: 0.02,
              background: d.current ? "#604fa067" : undefined,
              borderRadius: d.current ? 11 : undefined,
              margin: d.current ? "0 2px" : "0",
              boxShadow: d.current ? "0 1.5px 9px #47389042" : undefined,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: 37,
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 13, color: "#b2b8ca", fontWeight: 500, letterSpacing: 0, marginBottom: 0, height: 18 }}>
              {d.abbr}
            </div>
            <div
              style={{
                color: d.current ? "#fff" : "#c6c7df",
                fontWeight: d.current ? 700 : 600,
                fontSize: d.current ? 19 : 18,
                lineHeight: "15px",
                letterSpacing: "0.02em",
                marginTop: -3,
              }}
            >
              {d.day}
            </div>
          </div>
        ))}
      </div>

      {/* GRID BODY */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: 524,
          marginLeft: 8,
          marginRight: 10,
          marginTop: 0,
          position: "relative",
        }}
      >
        {/* Time Axis */}
        <div
          data-eid="time-axis"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            fontSize: 13.3,
            fontWeight: 500,
            color: "#b2b8ca",
            width: 54,
            marginLeft: 0,
            marginRight: 6,
            marginTop: 1,
            zIndex: 2,
            position: "relative",
            height: "100%",
            userSelect: "none",
          }}
        >
          {timeLabels.map((t, i) => (
            <span
              data-eid={t.eid}
              key={t.eid}
              style={{
                marginBottom: i === timeLabels.length - 1 ? 0 : 35.7,
                marginTop: i === 0 ? 2 : 0,
                height: 14,
                display: "block",
                color: "#b2b8ca",
                fontWeight: 500,
                fontSize: 13.2,
                letterSpacing: 0.01,
                textAlign: "right",
                lineHeight: "15px",
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
        {/* Calendar grid */}
        <div
          style={{
            flex: 1,
            position: "relative",
            height: 524,
            display: "block",
            boxSizing: "border-box",
            background: "none",
          }}
        >
          {/* Vertical grid lines */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={"v-grid" + i}
              style={{
                position: "absolute",
                top: 0,
                left: (i * 100.8),
                width: 0,
                borderLeft: "1.5px solid #333b54",
                height: 524,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          ))}
          {/* Horizontal grid lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={"h-grid" + i}
              style={{
                position: "absolute",
                left: 0,
                top: i * (524 / 10),
                width: 504,
                height: 0,
                borderTop: "1.5px solid #333b54",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          ))}
          {/* Render events */}
          {eventsMeta.map((ev, idx) => (
            <EventBlock key={ev.eid} {...ev} />
          ))}
        </div>
      </div>

      {/* LEGEND */}
      <div
        data-eid="legend"
        style={{
          marginTop: 6,
          marginBottom: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 38,
          fontSize: 15,
          fontWeight: 500,
          color: "#b8cbe1",
          width: "100%",
        }}
      >
        <span
          data-eid="legend-work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: 6,
            fontSize: 14.3,
          }}
        >
          <span
            style={{
              background: legendColors["Work"],
              borderRadius: "50%",
              display: "inline-block",
              width: 10,
              height: 10,
              marginRight: 7,
              marginLeft: 3,
              marginTop: 1,
              boxShadow: "0 0px 5px #2873d755",
            }}
          ></span>
          <span style={{ color: "#9cbbf0", marginTop: 0, fontWeight: 500 }}>
            Work
          </span>
        </span>
        <span
          data-eid="legend-personal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: 6,
            fontSize: 14.3,
          }}
        >
          <span
            style={{
              background: legendColors["Personal"],
              borderRadius: "50%",
              display: "inline-block",
              width: 10,
              height: 10,
              marginRight: 7,
              marginLeft: 3,
              marginTop: 1,
              boxShadow: "0 0px 4px #11a28155",
            }}
          ></span>
          <span style={{ color: "#89dbc9", marginTop: 0, fontWeight: 500 }}>
            Personal
          </span>
        </span>
        <span
          data-eid="legend-meeting"
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: 6,
            fontSize: 14.3,
          }}
        >
          <span
            style={{
              background: legendColors["Meeting"],
              borderRadius: "50%",
              display: "inline-block",
              width: 10,
              height: 10,
              marginRight: 7,
              marginLeft: 3,
              marginTop: 1,
              boxShadow: "0 0px 5px #7a4fff66",
            }}
          ></span>
          <span style={{ color: "#c3abef", marginTop: 0, fontWeight: 500 }}>
            Meeting
          </span>
        </span>
      </div>
    </section>
  );
}