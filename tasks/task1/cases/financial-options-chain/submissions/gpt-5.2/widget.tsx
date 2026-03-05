// submissions/<your-model-name>/widget.tsx
import React from "react";
import data from "./data.json";
import { ArrowUpRight } from "lucide-react";

type Row = {
  bid: string;
  ask: string;
  last: string;
  vol: string;
  oi: string;
  iv: string;
  delta: string;
  deltaColor: "green" | "red";
};

const colW = [70, 70, 70, 82, 82, 70, 70];

function Cell({
  children,
  width,
  color,
  align,
  weight,
}: {
  children: React.ReactNode;
  width: number;
  color?: string;
  align?: "left" | "center" | "right";
  weight?: number;
}) {
  return (
    <div
      style={{
        width,
        fontSize: 11,
        color: color ?? "#d7dbea",
        textAlign: align ?? "center",
        letterSpacing: 0.2,
        fontWeight: weight ?? 600,
      }}
    >
      {children}
    </div>
  );
}

function HeaderRow({ eid }: { eid: string }) {
  const headers = ["BID", "ASK", "LAST", "VOL", "OI", "IV", "DELTA"];
  return (
    <div
      data-eid={eid}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        padding: "6px 10px 6px 10px",
        color: "#7f8aa6",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.9,
      }}
    >
      {headers.map((h, i) => (
        <div
          key={h}
          style={{
            width: colW[i],
            textAlign: "center",
          }}
        >
          {h}
        </div>
      ))}
    </div>
  );
}

function DataRow({
  eid,
  row,
  eids,
  highlight,
}: {
  eid: string;
  row: Row;
  eids: {
    bid: string;
    ask: string;
    last: string;
    vol: string;
    oi: string;
    iv: string;
    delta: string;
  };
  highlight?: boolean;
}) {
  const deltaCol = row.deltaColor === "green" ? "#26d07c" : "#ff4d57";

  return (
    <div
      data-eid={eid}
      style={{
        margin: "6px 10px",
        borderRadius: 7,
        padding: "7px 10px",
        display: "flex",
        alignItems: "center",
        background: highlight
          ? "linear-gradient(180deg, rgba(66,96,185,0.22), rgba(42,54,96,0.14))"
          : "linear-gradient(180deg, rgba(22,27,48,0.72), rgba(15,18,34,0.72))",
        border: highlight ? "1px solid rgba(78,110,210,0.45)" : "1px solid rgba(255,255,255,0.06)",
        boxShadow: highlight ? "0 0 0 1px rgba(0,0,0,0.15) inset" : "none",
      }}
    >
      <span data-eid={eids.bid} style={{ display: "none" }} />
      <span data-eid={eids.ask} style={{ display: "none" }} />
      <span data-eid={eids.last} style={{ display: "none" }} />
      <span data-eid={eids.vol} style={{ display: "none" }} />
      <span data-eid={eids.oi} style={{ display: "none" }} />
      <span data-eid={eids.iv} style={{ display: "none" }} />
      <span data-eid={eids.delta} style={{ display: "none" }} />

      <Cell width={colW[0]}>{row.bid}</Cell>
      <Cell width={colW[1]}>{row.ask}</Cell>
      <Cell width={colW[2]}>{row.last}</Cell>
      <Cell width={colW[3]}>{row.vol}</Cell>
      <Cell width={colW[4]}>{row.oi}</Cell>
      <Cell width={colW[5]}>{row.iv}</Cell>
      <Cell width={colW[6]} color={deltaCol}>
        {row.delta}
      </Cell>
    </div>
  );
}

export default function Widget() {
  const bg = {
    background:
      "radial-gradient(120% 120% at 20% 10%, #141a34 0%, #0c1022 45%, #070a16 100%)",
    borderRadius: 18,
    width: 520,
    height: 760,
    boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.08)",
    position: "relative" as const,
    overflow: "hidden" as const,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
  };

  const pill = (tone: "blue" | "gold") => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.2,
    color: tone === "blue" ? "#b8c6ff" : "#ffd46a",
    background:
      tone === "blue"
        ? "linear-gradient(180deg, rgba(76,108,220,0.22), rgba(28,40,86,0.22))"
        : "linear-gradient(180deg, rgba(181,125,31,0.25), rgba(95,67,16,0.22))",
    border:
      tone === "blue"
        ? "1px solid rgba(92,121,232,0.45)"
        : "1px solid rgba(255,199,94,0.35)",
  });

  const strikes = data.strikes as string[];

  return (
    <section data-eid="root" style={bg}>
      {/* subtle diagonal sheen */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          background:
            "linear-gradient(60deg, rgba(90,120,255,0.06) 0%, rgba(90,120,255,0.0) 45%, rgba(255,205,110,0.04) 100%)",
          transform: "rotate(-8deg)",
          pointerEvents: "none",
        }}
      />

      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 18px 8px 18px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              background: "rgba(46,67,170,0.18)",
              border: "1px solid rgba(110,140,255,0.22)",
            }}
          >
            <ArrowUpRight size={16} color="#87a2ff" />
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <div
              data-eid="stock-symbol"
              style={{
                color: "#eef1ff",
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: 0.4,
              }}
            >
              {data.symbol}
            </div>
            <div
              data-eid="stock-price"
              style={{
                color: "#23d17a",
                fontWeight: 900,
                fontSize: 18,
                letterSpacing: 0.2,
              }}
            >
              {data.price}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="expiry-badge" style={pill("blue")}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                border: "1px solid rgba(184,198,255,0.55)",
                display: "inline-block",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 2,
                  right: 2,
                  top: 3,
                  height: 1,
                  background: "rgba(184,198,255,0.55)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 3,
                  right: 3,
                  top: 1,
                  height: 2,
                  borderLeft: "1px solid rgba(184,198,255,0.55)",
                  borderRight: "1px solid rgba(184,198,255,0.55)",
                }}
              />
            </span>
            {data.expiry}
          </span>
          <span data-eid="type-badge" style={pill("gold")}>
            {data.type}
          </span>
        </div>
      </header>

      {/* CALLS */}
      <div data-eid="calls-section" style={{ position: "relative", zIndex: 1 }}>
        <div
          data-eid="calls-title"
          style={{
            padding: "6px 18px 0 18px",
            color: "#26d07c",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 1.6,
          }}
        >
          CALLS
        </div>

        <HeaderRow eid="calls-header-row" />

        {data.calls.map((r: any, idx: number) => (
          <DataRow
            key={idx}
            eid={`call-${idx}`}
            row={r}
            highlight={idx === 0 || idx === 1}
            eids={{
              bid: `call-${idx}-bid`,
              ask: `call-${idx}-ask`,
              last: `call-${idx}-last`,
              vol: `call-${idx}-vol`,
              oi: `call-${idx}-oi`,
              iv: `call-${idx}-iv`,
              delta: `call-${idx}-delta`,
            }}
          />
        ))}
      </div>

      {/* STRIKE DIVIDER */}
      <div
        data-eid="strike-divider"
        style={{
          margin: "10px 18px 8px 18px",
          padding: "10px 12px",
          borderRadius: 10,
          background:
            "linear-gradient(180deg, rgba(24,28,52,0.65), rgba(16,18,35,0.65))",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#98a3be",
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: 0.2,
          position: "relative",
          zIndex: 1,
        }}
      >
        {strikes.map((s, i) => {
          const selected = i === 0 || i === 1;
          return (
            <div
              key={s}
              style={{
                minWidth: 56,
                textAlign: "center",
                padding: "4px 8px",
                borderRadius: 6,
                color: selected ? "#cdd6ff" : "#9aa6c2",
                background: selected ? "rgba(86,110,230,0.20)" : "transparent",
                border: selected ? "1px solid rgba(110,140,255,0.28)" : "1px solid transparent",
              }}
            >
              {s}
            </div>
          );
        })}
      </div>

      {/* PUTS */}
      <div data-eid="puts-section" style={{ position: "relative", zIndex: 1 }}>
        <div
          data-eid="puts-title"
          style={{
            padding: "6px 18px 0 18px",
            color: "#ff4d57",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 1.6,
          }}
        >
          PUTS
        </div>

        <HeaderRow eid="puts-header-row" />

        {data.puts.map((r: any, idx: number) => (
          <DataRow
            key={idx}
            eid={`put-${idx}`}
            row={r}
            highlight={idx === 0 || idx === 1}
            eids={{
              bid: `put-${idx}-bid`,
              ask: `put-${idx}-ask`,
              last: `put-${idx}-last`,
              vol: `put-${idx}-vol`,
              oi: `put-${idx}-oi`,
              iv: `put-${idx}-iv`,
              delta: `put-${idx}-delta`,
            }}
          />
        ))}
      </div>

      {/* Greeks summary */}
      <div
        data-eid="greeks-summary"
        style={{
          position: "relative",
          zIndex: 1,
          margin: "10px 18px 10px 18px",
          borderRadius: 12,
          padding: "12px 14px",
          background:
            "linear-gradient(180deg, rgba(23,28,54,0.72), rgba(14,16,32,0.70))",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            data-eid="greeks-iv-label"
            style={{
              color: "#7f8aa6",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            Avg IV
          </span>
          <span
            data-eid="greeks-iv-value"
            style={{
              color: "#aab8ff",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 0.2,
            }}
          >
            {data.greeks.avgIV}
          </span>
        </div>

        <div
          style={{
            width: 1,
            height: 18,
            background: "rgba(255,255,255,0.10)",
            opacity: 0.8,
          }}
        />

        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            data-eid="greeks-pcr-label"
            style={{
              color: "#7f8aa6",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            P/C Ratio
          </span>
          <span
            data-eid="greeks-pcr-value"
            style={{
              color: "#ffcf57",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 0.2,
            }}
          >
            {data.greeks.pcr}
          </span>
        </div>
      </div>

      {/* Volume summary */}
      <div
        data-eid="volume-summary"
        style={{
          position: "relative",
          zIndex: 1,
          margin: "0 18px 16px 18px",
          borderRadius: 12,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(21,24,45,0.85), rgba(12,14,28,0.85))",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
        }}
      >
        <div
          data-eid="total-volume"
          style={{
            flex: 1,
            padding: "14px 14px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#e7ebff",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: 0.2,
            }}
          >
            {data.totals.totalVolume}
          </div>
          <div
            style={{
              marginTop: 4,
              color: "#7f8aa6",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            Total Volume
          </div>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,0.10)" }} />
        <div
          data-eid="total-oi"
          style={{
            flex: 1,
            padding: "14px 14px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#e7ebff",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: 0.2,
            }}
          >
            {data.totals.totalOI}
          </div>
          <div
            style={{
              marginTop: 4,
              color: "#7f8aa6",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            Total Open Interest
          </div>
        </div>
      </div>
    </section>
  );
}