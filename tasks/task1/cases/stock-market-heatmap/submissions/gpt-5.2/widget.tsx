// submissions/gpt-widget/widget.tsx
import React from "react";
import data from "./data.json";

type Stock = {
  ticker: string;
  company: string;
  price: string;
  changePct: string;
  tone: "green" | "red";
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function parsePct(s: string) {
  const m = String(s).match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : 0;
}

function cellGradient(tone: "green" | "red", pct: number) {
  const mag = clamp(Math.abs(pct), 0, 4); // normalize to ~0-4%
  const t = mag / 4;
  // Dark base + subtle vignette like target
  if (tone === "green") {
    const a = 0.30 + 0.28 * t;
    return `radial-gradient(120% 120% at 30% 20%, rgba(34,197,94,${a}) 0%, rgba(16,185,129,${a * 0.85}) 35%, rgba(15,23,42,0) 78%),
            linear-gradient(135deg, rgba(16,185,129,0.22) 0%, rgba(34,197,94,0.08) 35%, rgba(2,6,23,0) 100%),
            linear-gradient(180deg, rgba(20,34,54,0.9) 0%, rgba(10,15,30,0.92) 100%)`;
  }
  const a = 0.28 + 0.30 * t;
  return `radial-gradient(120% 120% at 30% 20%, rgba(239,68,68,${a}) 0%, rgba(244,63,94,${a * 0.85}) 35%, rgba(15,23,42,0) 78%),
          linear-gradient(135deg, rgba(244,63,94,0.22) 0%, rgba(239,68,68,0.08) 35%, rgba(2,6,23,0) 100%),
          linear-gradient(180deg, rgba(20,34,54,0.9) 0%, rgba(10,15,30,0.92) 100%)`;
}

const EIDS = [
  {
    cell: "stock-cell-0",
    ticker: "stock-ticker-0",
    company: "stock-company-0",
    price: "stock-price-0",
    change: "stock-change-0",
  },
  {
    cell: "stock-cell-1",
    ticker: "stock-ticker-1",
    company: "stock-company-1",
    price: "stock-price-1",
    change: "stock-change-1",
  },
  {
    cell: "stock-cell-2",
    ticker: "stock-ticker-2",
    company: "stock-company-2",
    price: "stock-price-2",
    change: "stock-change-2",
  },
  {
    cell: "stock-cell-3",
    ticker: "stock-ticker-3",
    company: "stock-company-3",
    price: "stock-price-3",
    change: "stock-change-3",
  },
  {
    cell: "stock-cell-4",
    ticker: "stock-ticker-4",
    company: "stock-company-4",
    price: "stock-price-4",
    change: "stock-change-4",
  },
  {
    cell: "stock-cell-5",
    ticker: "stock-ticker-5",
    company: "stock-company-5",
    price: "stock-price-5",
    change: "stock-change-5",
  },
  {
    cell: "stock-cell-6",
    ticker: "stock-ticker-6",
    company: "stock-company-6",
    price: "stock-price-6",
    change: "stock-change-6",
  },
  {
    cell: "stock-cell-7",
    ticker: "stock-ticker-7",
    company: "stock-company-7",
    price: "stock-price-7",
    change: "stock-change-7",
  },
  {
    cell: "stock-cell-8",
    ticker: "stock-ticker-8",
    company: "stock-company-8",
    price: "stock-price-8",
    change: "stock-change-8",
  },
  {
    cell: "stock-cell-9",
    ticker: "stock-ticker-9",
    company: "stock-company-9",
    price: "stock-price-9",
    change: "stock-change-9",
  },
  {
    cell: "stock-cell-10",
    ticker: "stock-ticker-10",
    company: "stock-company-10",
    price: "stock-price-10",
    change: "stock-change-10",
  },
  {
    cell: "stock-cell-11",
    ticker: "stock-ticker-11",
    company: "stock-company-11",
    price: "stock-price-11",
    change: "stock-change-11",
  },
];

export default function Widget() {
  const stocks: Stock[] = (data as any).stocks;

  return (
    <section
      data-eid="root"
      style={{
        width: 448,
        height: 448,
        borderRadius: 22,
        background:
          "radial-gradient(120% 120% at 10% 0%, rgba(99,102,241,0.18) 0%, rgba(2,6,23,0) 55%), radial-gradient(120% 120% at 100% 0%, rgba(168,85,247,0.10) 0%, rgba(2,6,23,0) 60%), linear-gradient(180deg, #0b0f1d 0%, #070a14 100%)",
        boxShadow:
          "0 20px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        padding: 18,
        boxSizing: "border-box",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: "#e5e7eb",
        overflow: "hidden",
      }}
    >
      <div
        data-eid="header"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "flex-end",
              gap: 2,
              opacity: 0.9,
            }}
            aria-hidden
          >
            <div
              style={{
                width: 3,
                height: 10,
                borderRadius: 2,
                background: "rgba(99,102,241,0.9)",
              }}
            />
            <div
              style={{
                width: 3,
                height: 14,
                borderRadius: 2,
                background: "rgba(99,102,241,0.75)",
              }}
            />
            <div
              style={{
                width: 3,
                height: 7,
                borderRadius: 2,
                background: "rgba(99,102,241,0.6)",
              }}
            />
            <div
              style={{
                width: 3,
                height: 12,
                borderRadius: 2,
                background: "rgba(99,102,241,0.5)",
              }}
            />
          </div>
          <div
            data-eid="index-name"
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 0.2,
              color: "#e5e7eb",
            }}
          >
            {data.index.name}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            data-eid="index-value"
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: -0.5,
              color: "#e5e7eb",
            }}
          >
            {data.index.value}
          </span>
          <span
            data-eid="index-change"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#22c55e",
            }}
          >
            {data.index.change}
          </span>
        </div>

        <div
          data-eid="last-updated"
          style={{
            fontSize: 12,
            color: "rgba(148,163,184,0.85)",
          }}
        >
          {data.index.lastUpdated}
        </div>
      </div>

      <div
        data-eid="heatmap-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "1fr",
          gap: 10,
          height: 448 - 18 * 2 - (18 + 8 + 12 + 14 + 14), // approximate remaining height
          minHeight: 320,
        }}
      >
        {stocks.slice(0, 12).map((s, i) => {
          const ids = EIDS[i];
          const pct = parsePct(s.changePct);
          const isPos = s.tone === "green";
          return (
            <div
              key={s.ticker}
              data-eid={ids.cell}
              style={{
                borderRadius: 14,
                padding: 10,
                boxSizing: "border-box",
                background: cellGradient(s.tone, pct),
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 18px rgba(0,0,0,0.25)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: 4,
              }}
            >
              <div
                data-eid={ids.ticker}
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#e5e7eb",
                }}
              >
                {s.ticker}
              </div>
              <div
                data-eid={ids.company}
                style={{
                  fontSize: 10,
                  color: "rgba(226,232,240,0.62)",
                  marginTop: -1,
                }}
              >
                {s.company}
              </div>
              <div
                data-eid={ids.price}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "rgba(226,232,240,0.92)",
                  marginTop: 4,
                }}
              >
                {s.price}
              </div>
              <div
                data-eid={ids.change}
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: isPos ? "#34d399" : "#fb7185",
                }}
              >
                {s.changePct}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}