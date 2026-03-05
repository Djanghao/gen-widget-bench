// submissions/<your-model-name>/widget.tsx
import React from "react";
import { Plane } from "lucide-react";
import data from "./data.json";

const font = '"SF Pro Display","SF Pro Text",system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif';

function StatusPill({
  text,
  variant,
}: {
  text: string;
  variant: "onTime" | "delayed" | "boarding" | "departed";
}) {
  const styles: Record<string, { bg: string; fg: string }> = {
    onTime: { bg: "rgba(20, 140, 90, 0.35)", fg: "#2EE68A" },
    delayed: { bg: "rgba(170, 130, 0, 0.35)", fg: "#FFD21A" },
    boarding: { bg: "rgba(35, 95, 200, 0.35)", fg: "#62A6FF" },
    departed: { bg: "rgba(120, 130, 145, 0.35)", fg: "#B8C0CF" },
  };
  const s = styles[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 22,
        minWidth: 78,
        padding: "0 12px",
        borderRadius: 999,
        background: s.bg,
        color: s.fg,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.2,
      }}
    >
      {text}
    </span>
  );
}

export default function Widget() {
  const w = 472;
  const accent = "#6FB7FF";
  const muted = "rgba(200,215,235,0.55)";
  const faint = "rgba(200,215,235,0.35)";

  return (
    <section
      data-eid="root"
      style={{
        width: w,
        borderRadius: 18,
        overflow: "hidden",
        fontFamily: font,
        color: "#EAF2FF",
        background:
          "radial-gradient(120% 140% at 10% 0%, #12284c 0%, #0b1930 45%, #081424 100%)",
        boxShadow: "0 16px 30px rgba(0,0,0,0.25)",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: "16px 18px 14px 18px",
          borderBottom: "1px solid rgba(160,190,230,0.12)",
          background:
            "linear-gradient(180deg, rgba(20,45,85,0.55) 0%, rgba(10,25,45,0.0) 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span data-eid="plane-icon" style={{ display: "inline-flex" }}>
            <Plane size={18} color={accent} />
          </span>
          <div
            data-eid="airport-code"
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            {data.airportCode}
          </div>
        </div>

        <div
          data-eid="board-title"
          style={{
            textAlign: "center",
            fontSize: 12,
            letterSpacing: 1.8,
            fontWeight: 800,
            color: "rgba(220,235,255,0.55)",
          }}
        >
          {data.title.toUpperCase()}
        </div>

        <div
          data-eid="current-time"
          style={{
            textAlign: "right",
            fontSize: 13,
            fontWeight: 800,
            color: accent,
            letterSpacing: 0.6,
          }}
        >
          {data.currentTime}
        </div>
      </header>

      {/* Column headers */}
      <div
        data-eid="column-headers"
        style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr 74px 74px 50px 92px",
          gap: 0,
          padding: "10px 18px 8px 18px",
          borderBottom: "1px solid rgba(160,190,230,0.10)",
          color: faint,
          fontSize: 11,
          letterSpacing: 1.6,
          fontWeight: 800,
        }}
      >
        <span data-eid="col-flight">FLIGHT</span>
        <span data-eid="col-destination">DESTINATION</span>
        <span data-eid="col-scheduled" style={{ textAlign: "right" }}>
          SCHED.
        </span>
        <span data-eid="col-actual" style={{ textAlign: "right" }}>
          ACTUAL
        </span>
        <span data-eid="col-gate" style={{ textAlign: "right" }}>
          GATE
        </span>
        <span data-eid="col-status" style={{ textAlign: "right" }}>
          STATUS
        </span>
      </div>

      {/* Flight list */}
      <div data-eid="flight-list" style={{ padding: "2px 0 6px 0" }}>
        {data.flights.map((f: any, idx: number) => {
          const rowEid = `flight-${idx}`;
          const numEid = `flight-${idx}-number`;
          const statusEid = `flight-${idx}-status`;

          return (
            <div
              key={idx}
              data-eid={rowEid}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr 74px 74px 50px 92px",
                alignItems: "center",
                padding: "11px 18px",
                borderBottom:
                  idx === data.flights.length - 1
                    ? "none"
                    : "1px solid rgba(160,190,230,0.08)",
              }}
            >
              <span
                data-eid={numEid}
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.4,
                  color: "#F1F6FF",
                }}
              >
                {f.flight}
              </span>

              {/* Destination cell includes city and airport code */}
              <span
                data-eid={idx === 0 ? "flight-0-dest" : undefined}
                style={{
                  fontSize: 12,
                  color: "rgba(235,245,255,0.85)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  paddingRight: 10,
                }}
              >
                <span style={{ color: "rgba(235,245,255,0.85)" }}>{f.city}</span>
                <span style={{ color: muted, marginLeft: 8, fontWeight: 700 }}>
                  {f.code}
                </span>
              </span>

              <span
                data-eid={idx === 0 ? "flight-0-sched" : undefined}
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  color: muted,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {f.scheduled}
              </span>

              <span
                data-eid={idx === 0 ? "flight-0-actual" : undefined}
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  fontWeight: f.actualHighlight ? 900 : 700,
                  color: f.actualHighlight ? "#FFD21A" : muted,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {f.actual}
              </span>

              <span
                data-eid={idx === 0 ? "flight-0-gate" : undefined}
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  color: "rgba(235,245,255,0.72)",
                  fontWeight: 700,
                }}
              >
                {f.gate}
              </span>

              <div style={{ textAlign: "right" }}>
                <span data-eid={statusEid}>
                  <StatusPill
                    text={f.status}
                    variant={
                      f.statusVariant as "onTime" | "delayed" | "boarding" | "departed"
                    }
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer
        data-eid="footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 18px 14px 18px",
          color: "rgba(200,215,235,0.32)",
          fontSize: 11,
          letterSpacing: 0.4,
        }}
      >
        <span data-eid="last-updated">{data.lastUpdated}</span>
        <span style={{ color: "rgba(200,215,235,0.30)" }}>{data.terminal}</span>
      </footer>
    </section>
  );
}