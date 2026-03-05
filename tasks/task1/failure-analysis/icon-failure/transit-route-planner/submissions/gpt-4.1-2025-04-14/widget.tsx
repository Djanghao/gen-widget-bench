import React from "react";
import data from "./data.json";
import { ArrowRight, Bus, Walk } from "lucide-react";

function WalkIcon({ color = "#BAF500" }) {
  // Simple walk icon replacement with Lucide's Walk
  return <Walk size={24} color={color} fill="none" strokeWidth={2.3} />;
}
function BusIcon({ color = "#3CA4FE" }) {
  // Lucide Bus icon
  return <Bus size={24} color={color} fill="none" strokeWidth={2.3} />;
}
const altModeIcons = {
  walk: <WalkIcon style={{ marginRight: 2 }} />,
  bus: <BusIcon style={{ marginRight: 2 }} />,
  train: (
    // Simple train/metro icon using Bus for replacement, but deep blue
    <BusIcon color="#3CA4FE" style={{ marginRight: 2 }} />
  ),
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        maxWidth: 410,
        background: "#141A27",
        borderRadius: 28,
        fontFamily:
          "Inter, system-ui, sans-serif",
        color: "#E5EEFF",
        padding: 0,
        margin: "0 auto",
        boxShadow: "none",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          padding: "24px 28px 0 28px",
          fontWeight: 600,
          fontSize: 22,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="origin-label">{data.origin}</span>
          <span
            data-eid="route-arrow"
            style={{
              margin: "0 3px",
              display: "flex",
              alignItems: "center",
              color: "#3CA4FE",
            }}
          >
            <ArrowRight size={20} strokeWidth={2.4} />
          </span>
          <span data-eid="dest-label">{data.destination}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            data-eid="total-time"
            style={{
              display: "inline-block",
              background: "#2448A1",
              borderRadius: 8,
              padding: "4px 18px",
              fontWeight: 700,
              fontSize: 18,
              color: "#B6CDFF",
              marginRight: 7,
            }}
          >
            {data.totalTime}
          </div>
          <div
            data-eid="departure-time"
            style={{
              fontWeight: 400,
              color: "#90ADC6",
              fontSize: 15.1,
            }}
          >
            Depart {data.departure} — Arrive {data.arrival}
          </div>
        </div>
      </header>

      <div
        data-eid="route-timeline"
        style={{
          marginTop: 18,
          padding: "0 28px 0 38px",
          position: "relative",
        }}
      >
        {/* Timeline line */}
        <div
          data-eid="timeline-line"
          style={{
            position: "absolute",
            top: 24,
            bottom: 72,
            left: 12,
            width: 3,
            background:
              "linear-gradient(to bottom, #C4E722 33%, #3376C4 33%, #3376C4 66%, #C4E722 66%)",
            borderRadius: 99,
            zIndex: 0,
          }}
        />
        {/* Segment 0: Walk */}
        <div
          data-eid="segment-0"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 18,
            zIndex: 1,
            position: "relative",
          }}
        >
          <span data-eid="segment-0-icon" style={{ marginTop: 0 }}>
            <WalkIcon />
          </span>
          <div style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                data-eid="segment-0-mode"
                style={{ fontWeight: 600, fontSize: 16, marginRight: 4 }}
              >
                Walk
              </span>
              <span
                data-eid="segment-0-duration"
                style={{
                  background: "#BAF500",
                  color: "#22301B",
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 6,
                  padding: "1px 12px",
                }}
              >
                {data.segments[0].duration}
              </span>
            </div>
            <span
              data-eid="segment-0-from"
              style={{
                display: "block",
                color: "#C4DAED",
                fontSize: 15,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              {data.segments[0].from}
            </span>
            <span
              data-eid="segment-0-to"
              style={{
                display: "block",
                color: "#7A8FAA",
                fontSize: 15,
                marginBottom: 4,
              }}
            >
              {data.segments[0].to}
            </span>
          </div>
        </div>
        {/* Segment 1: Bus */}
        <div
          data-eid="segment-1"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 18,
            marginTop: 10,
            zIndex: 1,
            position: "relative",
          }}
        >
          <span data-eid="segment-1-icon" style={{ marginTop: 0 }}>
            <BusIcon />
          </span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                data-eid="segment-1-route"
                style={{
                  color: "#B6CDFF",
                  fontWeight: 700,
                  fontSize: 16,
                  marginRight: 5,
                }}
              >
                {data.segments[1].route}
              </span>
              <span
                data-eid="segment-1-duration"
                style={{
                  background: "#2448A1",
                  color: "#B6CDFF",
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 6,
                  padding: "2px 11px",
                  marginRight: 8,
                }}
              >
                {data.segments[1].duration}
              </span>
              <span
                data-eid="segment-1-stops"
                style={{
                  color: "#7EA4C3",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {data.segments[1].stops}
              </span>
            </div>
            <span
              data-eid="segment-1-from"
              style={{
                display: "block",
                color: "#C4DAED",
                fontSize: 15,
                marginBottom: 0,
              }}
            >
              {data.segments[1].from}
            </span>
            <span
              data-eid="segment-1-to"
              style={{
                display: "block",
                color: "#C4DAED",
                fontSize: 15,
                marginBottom: 0,
              }}
            >
              {data.segments[1].to}
            </span>
            <div style={{ color: "#8BA4C7", fontSize: 14, marginTop: 2 }}>
              <span data-eid="segment-1-depart-time">
                Dep: {data.segments[1].depart}
              </span>
              <span style={{ margin: "0 8px" }}></span>
              <span data-eid="segment-1-arrive-time">
                Arr: {data.segments[1].arrive}
              </span>
            </div>
          </div>
        </div>
        {/* Segment 2: Walk */}
        <div
          data-eid="segment-2"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 18,
            marginTop: 10,
            zIndex: 1,
            position: "relative",
          }}
        >
          <span data-eid="segment-2-icon" style={{ marginTop: 0 }}>
            <WalkIcon />
          </span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                data-eid="segment-2-mode"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                Walk
              </span>
              <span
                data-eid="segment-2-duration"
                style={{
                  background: "#BAF500",
                  color: "#22301B",
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 6,
                  padding: "1px 12px",
                  marginLeft: 4,
                }}
              >
                {data.segments[2].duration}
              </span>
            </div>
            <span
              data-eid="segment-2-from"
              style={{
                display: "block",
                color: "#C4DAED",
                fontSize: 15,
              }}
            >
              {data.segments[2].from}
            </span>
            <span
              data-eid="segment-2-to"
              style={{
                display: "block",
                color: "#7A8FAA",
                fontSize: 15,
              }}
            >
              {data.segments[2].to}
            </span>
          </div>
        </div>
      </div>
      {/* Alternatives */}
      <div
        data-eid="alternatives-section"
        style={{
          marginTop: 34,
          padding: "0px 12px 24px 12px",
        }}
      >
        <div
          data-eid="alt-title"
          style={{
            padding: "0 14px",
            fontWeight: 700,
            fontSize: 13.5,
            letterSpacing: "1.2px",
            color: "#7A8FAA",
            marginBottom: 10,
          }}
        >
          ALTERNATIVE ROUTES
        </div>
        {/* Alt 0 */}
        <div
          data-eid="alt-0"
          style={{
            background: "#232A3A",
            borderRadius: 11,
            padding: "14px 18px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15.6,
                lineHeight: 1.17,
                color: "#E5EEFF",
              }}
            >
              Express Train + Walk
            </div>
            <div
              style={{
                marginTop: 2,
                color: "#90ADC6",
                fontSize: 14.5,
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
              }}
            >
              8:25 AM &nbsp; ${data.alternatives[0].cost} &nbsp;
              {/* Alt 0 Icons */}
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <BusIcon color="#3CA4FE" style={{ marginRight: 2 }} />
                <WalkIcon />
              </span>
            </div>
          </div>
          <span
            data-eid="alt-0-time"
            style={{
              background: "#2448A1",
              color: "#B6CDFF",
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 7,
              padding: "6px 20px",
              position: "absolute",
              right: 13,
              top: 22,
              minWidth: 58,
              textAlign: "center",
            }}
          >
            {data.alternatives[0].duration}
          </span>
        </div>
        {/* Alt 1 */}
        <div
          data-eid="alt-1"
          style={{
            background: "#232A3A",
            borderRadius: 11,
            padding: "14px 18px",
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15.6,
                lineHeight: 1.17,
                color: "#E5EEFF",
              }}
            >
              Bus 12 + Bus 45
            </div>
            <div
              style={{
                marginTop: 2,
                color: "#90ADC6",
                fontSize: 14.5,
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
              }}
            >
              8:10 AM &nbsp; ${data.alternatives[1].cost} &nbsp;
              {/* Alt 1 Icons */}
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <BusIcon />
                <BusIcon />
              </span>
            </div>
          </div>
          <span
            data-eid="alt-1-time"
            style={{
              background: "#2448A1",
              color: "#B6CDFF",
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 7,
              padding: "6px 20px",
              position: "absolute",
              right: 13,
              top: 22,
              minWidth: 58,
              textAlign: "center",
            }}
          >
            {data.alternatives[1].duration}
          </span>
        </div>
      </div>
    </section>
  );
}