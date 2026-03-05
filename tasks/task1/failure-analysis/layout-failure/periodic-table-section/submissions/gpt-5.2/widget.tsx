// submissions/<your-model-name>/widget.tsx
import React, { useMemo } from "react";
import data from "./data.json";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Atom } from "lucide-react";

type ElementItem = {
  number: number;
  symbol: string;
  name: string;
  mass: string;
  category: "Alkali Metal" | "Alkaline Earth" | "Transition Metal" | "Post-Transition" | "Metalloid";
};

const catColors: Record<ElementItem["category"], { border: string; glow: string; text: string; chipBg: string }> = {
  "Alkali Metal": {
    border: "rgba(239,68,68,0.55)",
    glow: "rgba(239,68,68,0.15)",
    text: "#ff5a5a",
    chipBg: "rgba(239,68,68,0.18)",
  },
  "Alkaline Earth": {
    border: "rgba(249,115,22,0.55)",
    glow: "rgba(249,115,22,0.15)",
    text: "#ff8a3d",
    chipBg: "rgba(249,115,22,0.18)",
  },
  "Transition Metal": {
    border: "rgba(234,179,8,0.55)",
    glow: "rgba(234,179,8,0.14)",
    text: "#f2c21b",
    chipBg: "rgba(234,179,8,0.16)",
  },
  "Post-Transition": {
    border: "rgba(20,184,166,0.55)",
    glow: "rgba(20,184,166,0.13)",
    text: "#2dd4bf",
    chipBg: "rgba(20,184,166,0.18)",
  },
  Metalloid: {
    border: "rgba(34,211,238,0.55)",
    glow: "rgba(34,211,238,0.12)",
    text: "#22d3ee",
    chipBg: "rgba(34,211,238,0.16)",
  },
};

function chipStyle(bg: string, color: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 11,
    lineHeight: "14px",
    letterSpacing: 0.2,
    background: bg,
    color,
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
    whiteSpace: "nowrap",
  };
}

function cellStyle(cat: ElementItem["category"]): React.CSSProperties {
  const c = catColors[cat];
  return {
    position: "relative",
    borderRadius: 10,
    height: 78,
    padding: 10,
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${c.border}`,
    boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.03), 0 14px 30px rgba(0,0,0,0.35)`,
    overflow: "hidden",
  };
}

export default function Widget() {
  const elements = (data.elements as ElementItem[]).slice(0, 20);

  const selected = data.selected as typeof data.selected;

  const chartData = useMemo(() => {
    // Transition metal melting points for comparison
    return (data.chart as { symbol: string; melting: number }[]).map((d) => ({
      name: d.symbol,
      melting: d.melting,
    }));
  }, []);

  return (
    <section
      data-eid="root"
      style={{
        width: 520,
        height: 760,
        borderRadius: 26,
        padding: 22,
        boxSizing: "border-box",
        color: "#e8eefc",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        background:
          "radial-gradient(1200px 600px at 15% 10%, rgba(59,130,246,0.12), rgba(0,0,0,0) 55%), radial-gradient(900px 520px at 70% 25%, rgba(168,85,247,0.10), rgba(0,0,0,0) 60%), linear-gradient(180deg, #0b1221 0%, #070b14 100%)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 14,
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div
            style={{
              marginTop: 2,
              width: 28,
              height: 28,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 10px 22px rgba(0,0,0,0.35)",
            }}
          >
            <Atom size={16} color="#a7b7ff" />
          </div>
          <div data-eid="title" style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.2 }}>
            Periodic
            <br />
            Table
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end", marginTop: 2 }}>
          <span data-eid="filter-alkali" style={chipStyle("rgba(239,68,68,0.18)", "#ff6767")}>
            Alkali Metal
          </span>
          <span data-eid="filter-alkaline" style={chipStyle("rgba(249,115,22,0.18)", "#ff9b54")}>
            Alkaline Earth
          </span>
          <span data-eid="filter-transition" style={chipStyle("rgba(234,179,8,0.16)", "#f3cc2e")}>
            Transition Metal
          </span>
          <span data-eid="filter-post-transition" style={chipStyle("rgba(20,184,166,0.18)", "#2ee6cf")}>
            Post-Transition
          </span>
        </div>
      </header>

      <div
        data-eid="elements-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {elements.map((el, idx) => {
          const c = catColors[el.category];
          return (
            <div key={idx} data-eid={`el-${idx}`} style={cellStyle(el.category)}>
              <div
                style={{
                  position: "absolute",
                  inset: -40,
                  background: `radial-gradient(220px 160px at 20% 10%, ${c.glow}, rgba(0,0,0,0) 65%)`,
                  pointerEvents: "none",
                }}
              />
              <span
                data-eid={`el-${idx}-number`}
                style={{
                  position: "absolute",
                  top: 8,
                  left: 10,
                  fontSize: 11,
                  color: "rgba(231,238,255,0.62)",
                }}
              >
                {el.number}
              </span>
              <div style={{ height: 12 }} />
              <span
                data-eid={`el-${idx}-symbol`}
                style={{
                  display: "block",
                  marginTop: 6,
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  color: c.text,
                  textAlign: "center",
                }}
              >
                {el.symbol}
              </span>
              <span
                data-eid={`el-${idx}-name`}
                style={{
                  display: "block",
                  marginTop: 2,
                  fontSize: 11,
                  color: "rgba(231,238,255,0.72)",
                  textAlign: "center",
                }}
              >
                {el.name}
              </span>
              <span
                data-eid={`el-${idx}-mass`}
                style={{
                  display: "block",
                  marginTop: 2,
                  fontSize: 10,
                  color: "rgba(231,238,255,0.50)",
                  textAlign: "center",
                }}
              >
                {el.mass}
              </span>
            </div>
          );
        })}
      </div>

      <div
        data-eid="detail-card"
        style={{
          borderRadius: 16,
          padding: 14,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
          marginBottom: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -80,
            background:
              "radial-gradient(520px 220px at 25% 20%, rgba(234,179,8,0.12), rgba(0,0,0,0) 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", position: "relative" }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(234,179,8,0.10)",
              border: "1px solid rgba(234,179,8,0.35)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              flex: "0 0 auto",
            }}
          >
            <div data-eid="detail-symbol" style={{ fontSize: 30, fontWeight: 900, color: "#f2c21b" }}>
              {selected.symbol}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div data-eid="detail-name" style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>
              {selected.name}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 2, flexWrap: "wrap" }}>
              <div data-eid="detail-number" style={{ fontSize: 13, color: "rgba(231,238,255,0.78)" }}>
                Atomic Number: <span style={{ color: "rgba(231,238,255,0.95)" }}>{selected.number}</span>
              </div>
              <div data-eid="detail-mass" style={{ fontSize: 13, color: "rgba(231,238,255,0.78)" }}>
                Atomic Mass: <span style={{ color: "rgba(231,238,255,0.95)" }}>{selected.mass}</span>
              </div>
            </div>

            <div
              data-eid="detail-electron-config"
              style={{
                marginTop: 10,
                padding: "8px 10px",
                borderRadius: 10,
                background: "rgba(9,12,18,0.55)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(231,238,255,0.86)",
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 12,
              }}
            >
              e- config: {selected.electronConfig}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <span data-eid="detail-category" style={chipStyle("rgba(234,179,8,0.16)", "#f3cc2e")}>
              {selected.category}
            </span>
            <div
              data-eid="detail-period-group"
              style={{ fontSize: 12, color: "rgba(231,238,255,0.70)", marginTop: 2 }}
            >
              Period {selected.period}, Group {selected.group}
            </div>
          </div>
        </div>

        <div
          data-eid="detail-props"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginTop: 12,
            position: "relative",
          }}
        >
          {[
            { eid: "detail-melting", label: "Melting", value: `${selected.props.melting} C` },
            { eid: "detail-boiling", label: "Boiling", value: `${selected.props.boiling} C` },
            { eid: "detail-density", label: "Density", value: `${selected.props.density} g/cm3` },
            { eid: "detail-electronegativity", label: "Electroneg.", value: `${selected.props.electronegativity}` },
          ].map((p) => (
            <div
              key={p.eid}
              data-eid={p.eid}
              style={{
                borderRadius: 12,
                padding: "10px 10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(231,238,255,0.60)" }}>{p.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, color: "rgba(231,238,255,0.92)" }}>
                {p.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        data-eid="comparison-chart"
        style={{
          borderRadius: 16,
          padding: 14,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
          marginBottom: 12,
        }}
      >
        <div
          data-eid="comparison-title"
          style={{ fontSize: 13, fontWeight: 800, color: "rgba(231,238,255,0.90)", marginBottom: 8 }}
        >
          Melting Point Comparison
        </div>

        <div data-eid="comparison-bars" style={{ width: "100%", height: 150 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ left: 0, right: 8, top: 6, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "rgba(231,238,255,0.62)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.10)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.10)" }}
              />
              <YAxis
                tick={{ fill: "rgba(231,238,255,0.55)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.10)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.10)" }}
                width={34}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.06)" }}
                contentStyle={{
                  background: "rgba(10,14,22,0.92)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 10,
                  color: "rgba(231,238,255,0.92)",
                  fontSize: 12,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
                }}
                labelStyle={{ color: "rgba(231,238,255,0.75)" }}
              />
              <Bar dataKey="melting" fill="rgba(234,179,8,0.75)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        data-eid="legend"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 2,
        }}
      >
        <span data-eid="legend-alkali" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(231,238,255,0.78)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#ef4444", boxShadow: "0 10px 18px rgba(239,68,68,0.25)" }} />
          Alkali Metal
        </span>
        <span data-eid="legend-alkaline" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(231,238,255,0.78)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#f97316", boxShadow: "0 10px 18px rgba(249,115,22,0.25)" }} />
          Alkaline Earth
        </span>
        <span data-eid="legend-transition" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(231,238,255,0.78)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#eab308", boxShadow: "0 10px 18px rgba(234,179,8,0.22)" }} />
          Transition Metal
        </span>
        <span data-eid="legend-post-transition" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(231,238,255,0.78)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#14b8a6", boxShadow: "0 10px 18px rgba(20,184,166,0.22)" }} />
          Post-Transition
        </span>
        <span data-eid="legend-metalloid" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(231,238,255,0.78)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#22d3ee", boxShadow: "0 10px 18px rgba(34,211,238,0.20)" }} />
          Metalloid
        </span>
      </div>
    </section>
  );
}