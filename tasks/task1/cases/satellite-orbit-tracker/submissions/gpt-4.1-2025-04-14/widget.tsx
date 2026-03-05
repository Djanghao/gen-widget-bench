import React from "react";
import data from "./data.json";
import { Satellite } from "lucide-react";

const labelStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: "#b8bce0",
  marginBottom: 2,
  display: "block",
};

const cardStyle = {
  background: "rgba(255,255,255,0.02)",
  borderRadius: 10,
  padding: "8px 16px",
  minWidth: 90,
  textAlign: "center",
  flex: 1,
  marginRight: 12,
  marginBottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.04)"
};

const removeRightMargin = { marginRight: 0 };

const orbitalParamValueStyle = {
  fontSize: 20,
  fontWeight: 700,
  color: "#fff",
  marginBottom: 1,
  letterSpacing: "0.1px"
};
const orbitalParamUnitStyle = {
  color: "#b8bce0",
  fontSize: 14,
  fontWeight: 400,
  marginLeft: 3
};

const sectionBoxStyle = {
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 13,
  padding: "19px 18px 11px 18px",
  marginBottom: 20,
  marginTop: 8,
};

const sectionTitleStyle = {
  fontWeight: 700,
  color: "#b8bce0",
  fontSize: 16,
  marginBottom: 15,
  letterSpacing: 0,
  lineHeight: 1
};

const passesHeaderStyle = {
  display: "grid",
  gridTemplateColumns: "90px 80px 90px 85px",
  fontWeight: 600,
  color: "#b8bce0",
  fontSize: 13,
  margin: "0 0 6px 0",
  letterSpacing: 0,
  gap: 1
};
const passRowStyle = {
  display: "grid",
  gridTemplateColumns: "90px 80px 90px 85px",
  alignItems: "center",
  background: "rgba(255,255,255,0.03)",
  borderRadius: 10,
  fontSize: 16,
  fontWeight: 500,
  color: "#fff",
  marginBottom: 8,
  height: 40,
  letterSpacing: "0.1px"
};

const groundTrackBar = {
  height: 18, width: "100%", background: "rgba(255,255,255,0.08)",
  borderRadius: 10,
  position: "relative",
  margin: "0 0 7px 0"
};
const groundTrackMarker = {
  position: "absolute",
  left: "32.5%", // visually matches about -43 deg on -180 to +180
  top: "50%",
  transform: "translate(-50%,-50%)",
  background: "linear-gradient(180deg, #b191fa 0%, #7566f1 100%)",
  width: 19, height: 19, borderRadius: 11,
  boxShadow: "0 2px 12px 0 #6c60e880, 0 0 5px #aa88fb"
};
const signalBarStyle = {
  width: 15, height: 74,
  background: "rgba(255,255,255,0.10)",
  borderRadius: 9,
  position: "relative",
  marginRight: 14,
  marginTop: 9
};
const signalBarFillStyle = {
  position: "absolute", left: 2, width: 11,
  bottom: 2,
  background: "linear-gradient(180deg,#8bffce 0%,#66baf1 95%)",
  borderRadius: 6,
  height: 51
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 465,
        background: "linear-gradient(180deg, #15132c 0%, #19174b 90%)",
        borderRadius: 20,
        boxShadow: "0 2px 24px #2e297132",
        padding: "26px 26px 0 26px",
        fontFamily: "system-ui,sans-serif",
        margin: "0 auto",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          marginBottom: 7,
        }}
      >
        <Satellite
          size={24}
          color="#c5bcff"
          strokeWidth={2.2}
          style={{ marginRight: 7, verticalAlign: "middle" }}
        />
        <div
          data-eid="mission-name"
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: "#fff",
            marginRight: "auto",
            letterSpacing: "0.1px",
            marginTop: 1,
          }}
        >
          {data.mission_name}
        </div>
        <span
          data-eid="orbit-badge"
          style={{
            background: "linear-gradient(90deg, #4747ed 0%, #7f5dff 100%)",
            color: "#e5ddff",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 16,
            padding: "3px 17px 3px 15px",
            marginRight: 7,
            letterSpacing: "0.5px",
            display: "inline-block",
            boxShadow: "0 1px 7px #31288218",
            lineHeight: "22px"
          }}
        >
          {data.orbit_type}
        </span>
        <span
          data-eid="elapsed-time"
          style={{
            background: "#23215d",
            color: "#d7e0ff",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 16,
            padding: "5px 15px 3px 15px",
            letterSpacing: 0.04,
            boxShadow: "0 1px 10px #31288211",
            display: "inline-block",
            marginLeft: "1px",
            marginTop: 1
          }}
        >
          {data.elapsed_time}
        </span>
      </header>

      {/* Orbital Parameters */}
      <div
        data-eid="orbital-params"
        style={{
          ...sectionBoxStyle,
          padding: "21px 18px 17px 18px",
          marginTop: 10,
        }}
      >
        <div data-eid="orbital-params-title" style={sectionTitleStyle}>
          Orbital Parameters
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 0 }}>
          <div data-eid="param-altitude" style={cardStyle}>
            <span data-eid="param-altitude-label" style={labelStyle}>
              Altitude
            </span>
            <span data-eid="param-altitude-value" style={orbitalParamValueStyle}>
              {data.orbital_parameters.altitude.value}
              <span style={orbitalParamUnitStyle}>{data.orbital_parameters.altitude.unit}</span>
            </span>
          </div>
          <div data-eid="param-velocity" style={cardStyle}>
            <span data-eid="param-velocity-label" style={labelStyle}>
              Velocity
            </span>
            <span data-eid="param-velocity-value" style={orbitalParamValueStyle}>
              {data.orbital_parameters.velocity.value}
              <span style={orbitalParamUnitStyle}>{data.orbital_parameters.velocity.unit}</span>
            </span>
          </div>
          <div data-eid="param-inclination" style={cardStyle}>
            <span data-eid="param-inclination-label" style={labelStyle}>
              Inclination
            </span>
            <span data-eid="param-inclination-value" style={orbitalParamValueStyle}>
              {data.orbital_parameters.inclination.value}
              <span style={orbitalParamUnitStyle}>{data.orbital_parameters.inclination.unit}</span>
            </span>
          </div>
          <div data-eid="param-period" style={cardStyle}>
            <span data-eid="param-period-label" style={labelStyle}>
              Period
            </span>
            <span data-eid="param-period-value" style={orbitalParamValueStyle}>
              {data.orbital_parameters.period.value}
              <span style={orbitalParamUnitStyle}>{data.orbital_parameters.period.unit}</span>
            </span>
          </div>
          <div
            data-eid="param-eccentricity"
            style={{ ...cardStyle, ...removeRightMargin, minWidth: 111 }}
          >
            <span data-eid="param-eccentricity-label" style={labelStyle}>
              Eccentricity
            </span>
            <span data-eid="param-eccentricity-value" style={orbitalParamValueStyle}>
              {data.orbital_parameters.eccentricity.value}
            </span>
          </div>
        </div>
      </div>

      {/* Ground Track */}
      <div data-eid="ground-track" style={{ ...sectionBoxStyle, padding: "15px 18px 11px 18px" }}>
        <div data-eid="ground-track-title" style={sectionTitleStyle}>
          Ground Track
        </div>
        {/* Bar and marker */}
        <div
          data-eid="ground-track-bar"
          style={{
            ...groundTrackBar,
            marginBottom: 0,
            marginTop: 2,
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <div data-eid="ground-track-marker" style={groundTrackMarker}></div>
          {/* Subtle tick marks */}
          {[0.2, 0.5, 0.8].map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${p * 100}%`,
                top: "53%",
                width: 2,
                height: 14,
                borderRadius: 1,
                background: "rgba(255,255,255,0.18)",
                transform: "translate(-50%,-50%)"
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginTop: 3,
            color: "#b8bce0",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0,
          }}
        >
          <span data-eid="ground-track-label-start" style={{ marginLeft: 1 }}>
            -180 deg
          </span>
          <span data-eid="ground-track-label-end" style={{ marginRight: 0 }}>
            +180 deg
          </span>
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 14,
            color: "#b8bce0",
            fontWeight: 500,
          }}
        >
          Lat:&nbsp;
          <span data-eid="ground-track-lat" style={{ color: "#fff", fontWeight: 700 }}>
            {data.ground_track.lat}
          </span>
          &nbsp;&nbsp;
          Lon:&nbsp;
          <span data-eid="ground-track-lon" style={{ color: "#fff", fontWeight: 700 }}>
            {data.ground_track.lon}
          </span>
        </div>
      </div>

      {/* Next Passes */}
      <div data-eid="passes-section" style={{ marginBottom: 24 }}>
        <div data-eid="passes-title" style={sectionTitleStyle}>
          Next Passes
        </div>
        <div style={passesHeaderStyle}>
          <span style={{ color: "#b8bce0", fontSize: 13, fontWeight: 700 }}>TIME</span>
          <span style={{ color: "#b8bce0", fontSize: 13, fontWeight: 700 }}>DURATION</span>
          <span style={{ color: "#b8bce0", fontSize: 13, fontWeight: 700 }}>MAX ELEV.</span>
          <span style={{ color: "#b8bce0", fontSize: 13, fontWeight: 700 }}>DIR</span>
        </div>
        {data.passes.map((pass, i) => (
          <div
            key={i}
            data-eid={`pass-${i}`}
            style={{
              ...passRowStyle,
              background: "rgba(255,255,255,0.025)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            <span data-eid={`pass-${i}-time`} style={{ fontWeight: 700 }}>{pass.time}</span>
            <span data-eid={`pass-${i}-duration`} style={{ color: "#b8bce0", fontWeight: 500, fontSize: 15 }}>{pass.duration}</span>
            <span data-eid={`pass-${i}-elevation`} style={{ color: "#b8bce0", fontWeight: 500, fontSize: 15 }}>{pass.elevation}</span>
            <span data-eid={`pass-${i}-direction`} style={{ color: "#b8bce0", fontWeight: 600, fontSize: 15 }}>{pass.direction}</span>
          </div>
        ))}
      </div>

      {/* Invisible lower buffer, as bottom of image is cut off */}
      <div style={{ height: 60 }}></div>
    </section>
  );
}