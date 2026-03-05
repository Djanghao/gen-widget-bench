// submissions/<your-model-name>/widget.tsx
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Home, MapPin, Trophy } from "lucide-react";
import data from "./data.json";

const font = `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"`;

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const chartData = points.map((v, i) => ({ i, v }));
  return (
    <div style={{ width: "100%", height: 44 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 6, bottom: 0, left: 6 }}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Card({
  p,
  idx,
}: {
  p: any;
  idx: 0 | 1 | 2;
}) {
  const eid = (s: string) => `prop-${idx}${s ? "-" + s : ""}`;

  const statusColors: Record<string, { bg: string; fg: string }> = {
    Active: { bg: "rgba(34,197,94,0.18)", fg: "#34d399" },
    Hot: { bg: "rgba(239,68,68,0.18)", fg: "#fb7185" },
    "Price Cut": { bg: "rgba(250,204,21,0.18)", fg: "#facc15" },
  };

  const sc = statusColors[p.status] || { bg: "rgba(148,163,184,0.16)", fg: "#cbd5e1" };

  const gradByIdx = [
    "linear-gradient(180deg, rgba(59,130,246,0.30), rgba(59,130,246,0.10))",
    "linear-gradient(180deg, rgba(168,85,247,0.30), rgba(168,85,247,0.10))",
    "linear-gradient(180deg, rgba(34,197,94,0.28), rgba(34,197,94,0.10))",
  ][idx];

  const sparkColor = ["#60a5fa", "#22c55e", "#facc15"][idx];

  return (
    <div
      data-eid={eid("")}
      style={{
        flex: "1 1 0",
        borderRadius: 16,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        overflow: "hidden",
        boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
        minWidth: 0,
      }}
    >
      <div
        data-eid={eid("image")}
        style={{
          height: 78,
          background: gradByIdx,
          position: "relative",
        }}
      >
        <span
          data-eid={eid("status")}
          style={{
            position: "absolute",
            left: 12,
            top: 10,
            padding: "3px 8px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.2,
            background: sc.bg,
            color: sc.fg,
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {p.status}
        </span>
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            width: 18,
            height: 18,
            borderRadius: 6,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Home size={12} color="rgba(226,232,240,0.75)" />
        </div>
      </div>

      <div style={{ padding: "12px 14px 12px 14px" }}>
        <div
          data-eid={eid("address")}
          style={{
            color: "rgba(241,245,249,0.92)",
            fontWeight: 800,
            fontSize: 13,
            marginBottom: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {p.address}
        </div>
        <div
          data-eid={eid("neighborhood")}
          style={{
            color: "rgba(148,163,184,0.95)",
            fontSize: 11,
            marginBottom: 8,
          }}
        >
          {p.neighborhood}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div
            data-eid={eid("price")}
            style={{
              color: "rgba(248,250,252,0.95)",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: 0.2,
            }}
          >
            {p.price}
          </div>
        </div>

        <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            data-eid={eid("ppsqft")}
            style={{ color: "rgba(148,163,184,0.95)", fontSize: 11 }}
          >
            {p.ppsqft}
          </span>
        </div>

        <div
          data-eid={eid("stats")}
          style={{
            display: "flex",
            gap: 10,
            marginTop: 8,
            paddingBottom: 10,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(203,213,225,0.92)",
            fontSize: 11,
          }}
        >
          <span data-eid={eid("beds")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {p.beds}
          </span>
          <span data-eid={eid("baths")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {p.baths}
          </span>
          <span data-eid={eid("sqft")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {p.sqft}
          </span>
        </div>

        <div data-eid={eid("sparkline")} style={{ marginTop: 10, marginBottom: 10 }}>
          <Sparkline points={p.sparkline} color={sparkColor} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            rowGap: 8,
            columnGap: 10,
            fontSize: 10.5,
            color: "rgba(148,163,184,0.95)",
          }}
        >
          <div data-eid={eid("feat-0")} style={{ display: "contents" }}>
            <div>Year Built</div>
            <div style={{ color: "rgba(226,232,240,0.9)", fontWeight: 700 }}>{p.features.yearBuilt}</div>
          </div>
          <div data-eid={eid("feat-1")} style={{ display: "contents" }}>
            <div>Lot Size</div>
            <div style={{ color: "rgba(226,232,240,0.9)", fontWeight: 700 }}>{p.features.lotSize}</div>
          </div>
          <div data-eid={eid("feat-2")} style={{ display: "contents" }}>
            <div>HOA</div>
            <div style={{ color: "rgba(226,232,240,0.9)", fontWeight: 700 }}>{p.features.hoa}</div>
          </div>
          <div data-eid={eid("feat-3")} style={{ display: "contents" }}>
            <div>Taxes</div>
            <div style={{ color: "rgba(226,232,240,0.9)", fontWeight: 700 }}>{p.features.taxes}</div>
          </div>
          <div data-eid={eid("feat-4")} style={{ display: "contents" }}>
            <div>Days on Market</div>
            <div style={{ color: "rgba(226,232,240,0.9)", fontWeight: 700 }}>{p.features.daysOnMarket}</div>
          </div>
          <div data-eid={eid("feat-5")} style={{ display: "contents" }}>
            <div>Walk Score</div>
            <div style={{ color: "rgba(226,232,240,0.9)", fontWeight: 700 }}>{p.features.walkScore}</div>
          </div>
        </div>

        <div
          data-eid={eid("score")}
          style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span data-eid={eid("score-label")} style={{ color: "rgba(148,163,184,0.95)", fontSize: 10.5 }}>
              Score
            </span>
            <span
              data-eid={eid("score-value")}
              style={{
                color: sparkColor,
                fontWeight: 900,
                fontSize: 12,
              }}
            >
              {p.score}
            </span>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 999,
              background: "rgba(148,163,184,0.16)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              data-eid={eid("score-bar")}
              style={{
                height: "100%",
                width: p.score,
                background: `linear-gradient(90deg, ${sparkColor}, rgba(255,255,255,0.25))`,
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Widget() {
  const d: any = data;

  return (
    <section
      data-eid="root"
      style={{
        width: 601,
        height: 604,
        padding: 18,
        boxSizing: "border-box",
        borderRadius: 22,
        background:
          "radial-gradient(1200px 700px at 20% 15%, rgba(99,102,241,0.18) 0%, rgba(2,6,23,0.0) 40%), linear-gradient(180deg, #0b1021 0%, #060816 100%)",
        fontFamily: font,
        color: "white",
        position: "relative",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 8px 10px 8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 10,
              background: "rgba(99,102,241,0.14)",
              border: "1px solid rgba(255,255,255,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <Home size={16} color="rgba(199,210,254,0.95)" />
          </div>
          <div>
            <div data-eid="title" style={{ fontWeight: 900, fontSize: 20, letterSpacing: 0.2 }}>
              {d.header.titleLine1}
              <br />
              {d.header.titleLine2}
            </div>
            <div data-eid="subtitle" style={{ color: "rgba(148,163,184,0.95)", fontSize: 12, marginTop: 4 }}>
              {d.header.subtitle}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span
            data-eid="location-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(226,232,240,0.9)",
              fontSize: 12,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            <MapPin size={14} color="rgba(203,213,225,0.9)" />
            {d.header.location}
          </span>
          <span
            data-eid="price-range-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(34,197,94,0.14)",
              border: "1px solid rgba(34,197,94,0.30)",
              color: "rgba(74,222,128,0.95)",
              fontSize: 12,
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            {d.header.priceRange}
          </span>
        </div>
      </header>

      <div
        data-eid="cards-row"
        style={{
          display: "flex",
          gap: 14,
          marginTop: 10,
          padding: "0 4px",
        }}
      >
        <Card p={d.properties[0]} idx={0} />
        <Card p={d.properties[1]} idx={1} />
        <Card p={d.properties[2]} idx={2} />
      </div>

      <div
        data-eid="verdict"
        style={{
          marginTop: 16,
          marginLeft: 4,
          marginRight: 4,
          padding: 14,
          borderRadius: 16,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.30)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              background: "rgba(250,204,21,0.16)",
              border: "1px solid rgba(250,204,21,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Trophy size={12} color="#facc15" />
          </div>
          <div data-eid="verdict-title" style={{ color: "#facc15", fontWeight: 900, fontSize: 13 }}>
            {d.verdict.title}
          </div>
        </div>

        <div data-eid="verdict-winner" style={{ fontWeight: 900, fontSize: 18, color: "rgba(248,250,252,0.95)" }}>
          {d.verdict.winner}
        </div>
        <div
          data-eid="verdict-reason"
          style={{
            marginTop: 6,
            color: "rgba(148,163,184,0.95)",
            fontSize: 12,
            lineHeight: 1.35,
            maxWidth: 520,
          }}
        >
          {d.verdict.reason}
        </div>

        <div
          data-eid="verdict-score-bar"
          style={{
            marginTop: 12,
            height: 7,
            borderRadius: 999,
            background: "rgba(148,163,184,0.16)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            data-eid="verdict-score-fill"
            style={{
              width: d.verdict.barFill,
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(34,197,94,1), rgba(34,197,94,0.55))",
            }}
          />
        </div>
      </div>
    </section>
  );
}