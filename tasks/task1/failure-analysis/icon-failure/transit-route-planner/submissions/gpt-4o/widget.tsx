import React from "react";
import { MapPin, ArrowRight, WalkIcon, BusIcon, DollarSign } from "lucide-react";
import data from "./data.json";

const TransitRoutePlanner: React.FC = () => {
  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: "#0e1420",
        color: "#ffffff",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
      }}
    >
      <header
        data-eid="header"
        style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span data-eid="origin-label" style={{ fontSize: "18px", fontWeight: "bold" }}>
            {data.origin}
          </span>
          <ArrowRight style={{ margin: "0 5px" }} />
          <span data-eid="dest-label" style={{ fontSize: "18px", fontWeight: "bold" }}>
            {data.destination}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            data-eid="total-time"
            style={{
              backgroundColor: "#2a57e5",
              borderRadius: "5px",
              padding: "3px 8px",
              fontSize: "14px",
              color: "#ffffff",
            }}
          >
            {data.totalTime}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            <div data-eid="departure-time" style={{ fontSize: "12px", color: "#adb5bd" }}>
              {data.departTime} — {data.arriveTime}
            </div>
          </div>
        </div>
      </header>
      <div data-eid="route-timeline" style={{ borderLeft: "2px solid #374151", paddingLeft: "10px" }}>
        {data.segments.map((segment, index) => (
          <div key={index} data-eid={`segment-${index}`} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span data-eid={`segment-${index}-icon`} style={{ marginRight: "10px" }}>
                {segment.mode === "Walk" ? (
                  <WalkIcon color="#70c040" />
                ) : (
                  <BusIcon color="#4aa8f0" />
                )}
              </span>
              <span data-eid={`segment-${index}-mode`} style={{ fontSize: "14px", fontWeight: "bold" }}>
                {segment.mode}
              </span>
              <span
                data-eid={`segment-${index}-duration`}
                style={{
                  backgroundColor: "#3a3f47",
                  borderRadius: "5px",
                  padding: "2px 5px",
                  fontSize: "12px",
                  color: "#70c040",
                  marginLeft: "auto",
                }}
              >
                {segment.duration}
              </span>
            </div>
            <div style={{ fontSize: "12px", color: "#adb5bd" }}>
              <span data-eid={`segment-${index}-from`}>{segment.from}</span>
              <br />
              <span data-eid={`segment-${index}-to`}>{segment.to}</span>
              {segment.stops && (
                <>
                  <br />
                  <span data-eid={`segment-${index}-stops`}>{segment.stops} stops</span>
                  <br />
                  <span data-eid={`segment-${index}-depart-time`}>Dep: {segment.depart}</span>
                  <br />
                  <span data-eid={`segment-${index}-arrive-time`}>Arr: {segment.arrive}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div data-eid="alternatives-section" style={{ marginTop: "20px" }}>
        <div
          data-eid="alt-title"
          style={{ fontSize: "14px", fontWeight: "bold", color: "#adb5bd", marginBottom: "10px" }}
        >
          Alternative Routes
        </div>
        {data.alternatives.map((alt, i) => (
          <div
            key={i}
            data-eid={`alt-${i}`}
            style={{
              backgroundColor: "#1d2330",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
              color: "#adb5bd",
              fontSize: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{alt.route}</span>
              <span
                data-eid={`alt-${i}-time`}
                style={{
                  backgroundColor: "#2a57e5",
                  borderRadius: "5px",
                  padding: "2px 5px",
                  fontSize: "12px",
                  color: "#ffffff",
                }}
              >
                {alt.time}
              </span>
            </div>
            <div style={{ fontSize: "12px" }}>
              {alt.departure} <DollarSign size={12} style={{ margin: "0 5px" }} />
              {alt.icons.map((icon, idx) =>
                icon === "walk" ? <WalkIcon key={idx} color="#70c040" size={12} /> : <BusIcon key={idx} color="#4aa8f0" size={12} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransitRoutePlanner;