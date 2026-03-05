import React from "react";
import { Plane } from "lucide-react";
import data from "./data.json";

const statusColors: Record<string, { bg: string; color: string }> = {
  "On Time": {
    bg: "#18C77E",
    color: "#fff",
  },
  "Delayed": {
    bg: "#B48A33",
    color: "#fff",
  },
  "Boarding": {
    bg: "#4266B7",
    color: "#fff",
  },
  "Departed": {
    bg: "#282f37",
    color: "#a1a9b3",
  },
};

const FlightBoard: React.FC = () => (
  <section
    data-eid="root"
    style={{
      fontFamily:
        'Inter, "Roboto Mono", Menlo, "DejaVu Sans Mono", Consolas, monospace',
      borderRadius: 20,
      background: "linear-gradient(180deg, #182235 90%, #17181C 100%)",
      width: 525,
      boxShadow: "0 2px 10px #1114, 0 1.5px 0 #101725 inset",
      padding: 0,
      overflow: "hidden",
    }}
  >
    <header
      data-eid="header"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "24px 0 18px 0",
        justifyContent: "space-between",
        width: "100%",
        position: "relative",
        paddingLeft: 32,
        paddingRight: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span data-eid="plane-icon" style={{ marginRight: 8, color: "#5daaff" }}>
          <Plane size={22} strokeWidth={2.2} />
        </span>
        <div
          data-eid="airport-code"
          style={{
            fontWeight: 700,
            fontSize: 27,
            letterSpacing: "0.03em",
            color: "#fff",
            marginRight: 8,
          }}
        >
          {data.airportCode}
        </div>
      </div>
      <div
        data-eid="board-title"
        style={{
          color: "#a1a9b3",
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {data.title}
      </div>
      <div
        data-eid="current-time"
        style={{
          color: "#5daaff",
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: "0.03em",
          minWidth: 69,
          textAlign: "right",
        }}
      >
        {data.currentTime}
      </div>
    </header>
    <div
      data-eid="column-headers"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "none",
        padding: "0 0 0 0",
        borderBottom: "1px solid #29374c",
        fontSize: 13.4,
        color: "#6e7987",
        fontWeight: 700,
        letterSpacing: "0.11em",
      }}
    >
      <span data-eid="col-flight" style={{ flex: "0 0 85px", padding: "0 0 0 32px" }}>
        FLIGHT
      </span>
      <span data-eid="col-destination" style={{ flex: "1 1 150px" }}>
        DESTINATION
      </span>
      <span data-eid="col-scheduled" style={{ flex: "0 0 70px", textAlign: "right" }}>
        SCHED.
      </span>
      <span data-eid="col-actual" style={{ flex: "0 0 62px", textAlign: "right" }}>
        ACTUAL
      </span>
      <span data-eid="col-gate" style={{ flex: "0 0 56px", textAlign: "center" }}>
        GATE
      </span>
      <span data-eid="col-status" style={{ flex: "0 0 89px", paddingRight: 22, textAlign: "center" }}>
        STATUS
      </span>
    </div>
    <div
      data-eid="flight-list"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {data.flights.map((flight, i) => {
        const statusStyle = statusColors[flight.status] || {
          bg: "#262b34",
          color: "#a1a9b3",
        };
        return (
          <div
            key={i}
            data-eid={`flight-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              padding:
                i < 5
                  ? "0 0 0 0"
                  : "0 0 0 0",
              minHeight: 47,
              width: "100%",
              borderBottom: i !== 5 ? "1px solid #20273C" : undefined,
              background: i % 2 === 1 ? "rgba(30,35,45, 0.92)" : "none",
            }}
          >
            <span
              data-eid={`flight-${i}-number`}
              style={{
                flex: "0 0 85px",
                fontWeight: 700,
                fontSize: 16.4,
                letterSpacing: "0.02em",
                color: i === 0
                  ? "#fff"
                  : "#f2f2f3",
                paddingLeft: 32,
                fontFamily: "inherit",
              }}
            >
              {flight.number}
            </span>
            <span
              data-eid={`flight-${i}-dest`}
              style={{
                flex: "1 1 130px",
                fontWeight: 500,
                fontSize: 15.1,
                color: "#fff",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {flight.destination}
            </span>
            <span
              data-eid={`flight-${i}-sched`}
              style={{
                flex: "0 0 70px",
                fontSize: 15.1,
                color: "#b8bac3",
                fontFamily: "inherit",
                textAlign: "right",
                letterSpacing: "0.01em",
                fontWeight: 500,
              }}
            >
              {flight.scheduled}
            </span>
            <span
              data-eid={`flight-${i}-actual`}
              style={{
                flex: "0 0 62px",
                fontSize: 15.3,
                color:
                  flight.highlightActualTime
                    ? "#fed34d"
                    : "#b8bac3",
                fontFamily: "inherit",
                fontWeight: 700,
                textAlign: "right",
                letterSpacing: "0.01em",
              }}
            >
              {flight.actual}
            </span>
            <span
              data-eid={`flight-${i}-gate`}
              style={{
                flex: "0 0 56px",
                fontWeight: 700,
                fontSize: 15.5,
                color: "#b8bac3",
                textAlign: "center",
                fontFamily: "inherit",
              }}
            >
              {flight.gate}
            </span>
            <span
              data-eid={`flight-${i}-status`}
              style={{
                flex: "0 0 89px",
                textAlign: "center",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                minWidth: 80,
                background: statusStyle.bg,
                borderRadius: 17,
                color: statusStyle.color,
                fontWeight: 700,
                fontSize: 15.4,
                fontFamily: "inherit",
                marginLeft: 4,
                marginRight: 0,
                opacity: flight.status === "Departed" ? 0.8 : 1,
              }}
            >
              {flight.status}
            </span>
          </div>
        );
      })}
    </div>
    <footer
      data-eid="footer"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 13,
        color: "#586174",
        letterSpacing: "0.02em",
        background: "none",
        padding: "8px 28px 8px 30px",
        borderTop: "1px solid transparent",
      }}
    >
      <span data-eid="last-updated" style={{ fontFamily: "inherit" }}>
        {data.lastUpdated}
      </span>
      <span style={{ }}>{data.terminal}</span>
    </footer>
  </section>
);

export default FlightBoard;