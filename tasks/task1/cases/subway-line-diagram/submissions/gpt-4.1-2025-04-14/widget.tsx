import React from "react";
import data from "./data.json";
import { ArrowRight, Wheelchair } from "lucide-react";

const lineBlue = "#3187ff";
const lineFg = "#fff";
const bgDark = "linear-gradient(180deg, #121e36 0%, #182137 100%)";
const bgSection = "#14203a";
const textOn = "#eaf1ff";
const textSub = "#a1b5d8";
const zoneBg = "#232e4a";
const localColor = "#a1b5d8";
const expressColor = "#ffd01c";
const statusOnTime = "#16c97f";
const alertWarning = "#ffd246";
const alertInfo = "#4ea0ff";

const transferColors: any = {
  "R": "#fd2135",
  "G": "#36cc59",
  "P": "#c649d7",
  "Y": "#ffd01c"
};

const transferFg: any = {
  "R": "#fff",
  "G": "#fff",
  "P": "#fff",
  "Y": "#212326"
};

function StationDot({ filled, express, highlighted }: any) {
  return (
    <div
      style={{
        position: "relative",
        width: 24,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 4,
          height: "100%",
          background: lineBlue,
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          width: highlighted ? 16 : 12,
          height: highlighted ? 16 : 12,
          background: highlighted ? "#2457c9" : lineBlue,
          border: `2px solid ${lineBlue}`,
          borderRadius: "50%",
          zIndex: 1,
          boxShadow: highlighted ? "0 0 0 3px #2457c955" : undefined,
        }}
      ></div>
      {express &&
        <div
          style={{
            position: "absolute",
            top: highlighted ? 11 : 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            border: `2.5px solid ${expressColor}`,
            borderRadius: "50%",
            background: "#182137"
          }}
        ></div>
      }
    </div>
  );
}

function ZoneBadge({ zone }: any) {
  const color =
    zone === "Zone 1"
      ? "#d5e2ff"
      : zone === "Zone 2"
      ? "#ffe167"
      : "#82c3f6";
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 12,
        background: zoneBg,
        color,
        borderRadius: 7,
        padding: "2px 10px",
        marginLeft: 8,
        marginRight: 6,
        fontWeight: 500,
        letterSpacing: 0.3,
        lineHeight: "16px",
        verticalAlign: "middle"
      }}
    >
      {zone}
    </span>
  );
}

function ServiceType({ type }: any) {
  return (
    <span
      style={{
        color: type === "Express" ? expressColor : localColor,
        fontWeight: 600,
        fontSize: 13,
        marginLeft: 2,
        letterSpacing: 0,
        verticalAlign: "middle"
      }}
    >
      {type}
    </span>
  );
}

function Transfers({ lines }: { lines: string[] }) {
  return (
    <div style={{ display: "inline-flex", gap: 4, marginLeft: 8 }}>
      {lines.map((l, idx) => (
        <span
          key={idx}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: transferColors[l],
            color: transferFg[l],
            fontWeight: 800,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid #fff`,
            boxShadow: "0 0 0 1px #cfdfff99",
            lineHeight: 1,
          }}
        >
          {l}
        </span>
      ))}
      <span
        style={{
          color: "#69e19b",
          fontSize: 12,
          fontWeight: 500,
          paddingLeft: 3,
          marginTop: 0,
          alignSelf: "center",
        }}
      >
        Transfer
      </span>
    </div>
  );
}

function Accessibility() {
  return (
    <span style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4, color: "#a1b5d8" }}>
      <Wheelchair size={15} strokeWidth={2} />
    </span>
  );
}

function StationRow({ s, index }: any) {
  const eidPrefix = `station-${index}`;
  const isHighlighted = s.highlighted;
  return (
    <div
      data-eid={eidPrefix}
      style={{
        background: isHighlighted ? bgSection : undefined,
        borderRadius: isHighlighted ? 13 : undefined,
        padding: isHighlighted ? "8px 0 8px 0" : "0",
        marginBottom: 0,
        display: "flex",
        alignItems: "flex-start"
      }}
    >
      <div data-eid={`${eidPrefix}-dot`}>
        <StationDot
          filled={true}
          express={s.type === "Express"}
          highlighted={isHighlighted}
        />
      </div>
      <div style={{ flex: 1, minHeight: 36 }}>
        <span
          data-eid={`${eidPrefix}-name`}
          style={{
            fontWeight: isHighlighted ? 700 : 500,
            fontSize: 16,
            color: isHighlighted ? "#fff" : "#eaf1ff",
            verticalAlign: "middle",
            lineHeight: "36px"
          }}
        >
          {s.name}
        </span>
        <span data-eid={`${eidPrefix}-zone`}>
          <ZoneBadge zone={s.zone} />
        </span>
        {s.transfers && (
          <div data-eid={`${eidPrefix}-transfers`} style={{ display: "inline" }}>
            <Transfers lines={s.transfers} />
          </div>
        )}
        <span data-eid={`${eidPrefix}-type`}>
          <ServiceType type={s.type} />
        </span>
        {s.accessible && (
          <span data-eid={`${eidPrefix}-accessibility`}>
            <Accessibility />
          </span>
        )}
        {s.time &&
          <div
            data-eid={`${eidPrefix}-time`}
            style={{
              fontSize: 15,
              color: isHighlighted ? "#5ac8fa" : "#62e9c5",
              fontWeight: 600,
              paddingLeft: 0,
              marginTop: 0,
              marginLeft: isHighlighted ? 0 : 8,
              lineHeight: "24px"
            }}
          >
            {s.time}
          </div>
        }
      </div>
    </div>
  );
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        background: bgDark,
        borderRadius: 24,
        maxWidth: 500,
        margin: "0 auto",
        marginTop: 8,
        padding: "18px 0px 36px 0px",
        boxShadow: "0 2px 10px #121e3630",
        minHeight: 730,
        position: "relative"
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          padding: "0 32px 14px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            data-eid="line-indicator"
            style={{
              background: lineBlue,
              color: lineFg,
              width: 34,
              height: 34,
              borderRadius: "50%",
              fontWeight: 700,
              fontSize: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 6,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              data-eid="line-name"
              style={{
                fontWeight: 700,
                fontSize: 23,
                color: "#fff",
                letterSpacing: 0,
                lineHeight: "24px",
              }}
            >
              Blue Line
            </div>
            <div
              data-eid="direction-label"
              style={{
                marginTop: 0,
                fontSize: 16,
                color: textSub,
                fontWeight: 500,
                letterSpacing: 0.1,
                lineHeight: "20px"
              }}
            >
              Northbound to Lakefront
            </div>
          </div>
          <span
            data-eid="status-badge"
            style={{
              background: statusOnTime,
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 15,
              padding: "4px 18px",
              marginLeft: 8,
              height: 28,
              display: "flex",
              alignItems: "center"
            }}
          >
            On Time
          </span>
        </div>
      </header>
      {/* Trip Info */}
      <div
        data-eid="trip-info"
        style={{
          marginTop: 2,
          marginBottom: 22,
          padding: "0 28px 0 28px"
        }}
      >
        <div
          style={{
            background: "#143065",
            borderRadius: 11,
            padding: "11px 20px",
            fontSize: 16,
            fontWeight: 600,
            color: "#f7fafc",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 1px 8px rgba(42,64,120,.13)"
          }}
        >
          <span data-eid="trip-origin" style={{ color: "#fff" }}>
            Central Square
          </span>
          <span data-eid="trip-arrow" style={{ display: 'flex', alignItems: 'center', color: "#4ea2ff" }}>
            <ArrowRight size={20} strokeWidth={2.4} />
          </span>
          <span data-eid="trip-destination" style={{ color: "#fff" }}>
            Harbor Point
          </span>
          <span data-eid="trip-time" style={{ color: "#67cbff", fontWeight: 500, fontSize: 15, marginLeft: "auto" }}>
            ~18 min
          </span>
        </div>
      </div>
      {/* Station List */}
      <div
        data-eid="station-list"
        style={{
          padding: "0 32px",
          marginBottom: 10
        }}
      >
        {data.stations.map((s: any, i: number) => (
          <StationRow key={i} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}