// submissions/gpt/widget.tsx
import React from "react";
import data from "./data.json";

type Level = { price: string; amount: string; total: string; barPct: number };

const fmtMono: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum" 1, "lnum" 1',
};

function Row({
  eidBase,
  side,
  level,
}: {
  eidBase: string;
  side: "ask" | "bid";
  level: Level;
}) {
  const isAsk = side === "ask";
  const barColor = isAsk ? "rgba(239,68,68,0.14)" : "rgba(34,197,94,0.14)";
  const barEdge = isAsk ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)";
  const priceColor = isAsk ? "#ff4d4f" : "#1fe37a";

  return (
    <div
      data-eid={eidBase}
      style={{
        position: "relative",
        height: 26,
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr 0.8fr",
        alignItems: "center",
        padding: "0 12px",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <div
        data-eid={`${eidBase}-bar`}
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          top: 3,
          bottom: 3,
          borderRadius: 3,
          background: "transparent",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: isAsk ? 0 : "auto",
            left: isAsk ? "auto" : 0,
            width: `${Math.max(2, Math.min(100, level.barPct))}%`,
            background: `linear-gradient(90deg, ${barEdge}, ${barColor})`,
            borderRadius: 3,
          }}
        />
      </div>

      <span
        data-eid={`${eidBase}-price`}
        style={{
          ...fmtMono,
          position: "relative",
          zIndex: 1,
          color: priceColor,
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: 0.2,
        }}
      >
        {level.price}
      </span>
      <span
        data-eid={`${eidBase}-amount`}
        style={{
          ...fmtMono,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "#cfd7e4",
          fontSize: 12,
        }}
      >
        {level.amount}
      </span>
      <span
        data-eid={`${eidBase}-total`}
        style={{
          ...fmtMono,
          position: "relative",
          zIndex: 1,
          textAlign: "right",
          color: "#aab4c6",
          fontSize: 12,
        }}
      >
        {level.total}
      </span>
    </div>
  );
}

export default function Widget() {
  const asks = data.asks as Level[];
  const bids = data.bids as Level[];

  return (
    <section
      data-eid="root"
      style={{
        width: 495,
        height: 640,
        padding: 18,
        borderRadius: 22,
        background:
          "radial-gradient(1200px 700px at 20% 0%, rgba(32,56,92,0.55), rgba(10,16,28,0.92) 55%, rgba(6,10,18,0.98) 100%)",
        boxShadow: "0 18px 38px rgba(0,0,0,0.45)",
        color: "#e6edf7",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        position: "relative",
      }}
    >
      <header data-eid="header" style={{ padding: "2px 2px 10px 2px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 18,
              height: 18,
              display: "grid",
              placeItems: "center",
              color: "#ffb300",
              fontWeight: 900,
              fontSize: 16,
              lineHeight: "18px",
            }}
          >
            ∿
          </div>
          <div
            data-eid="pair-label"
            style={{
              fontWeight: 800,
              letterSpacing: 0.4,
              fontSize: 18,
            }}
          >
            {data.pair}
          </div>
          <span
            data-eid="price-change-24h"
            style={{
              marginLeft: 2,
              ...fmtMono,
              fontSize: 12,
              color: "#55f0a5",
              background: "rgba(21, 214, 123, 0.12)",
              border: "1px solid rgba(21, 214, 123, 0.35)",
              padding: "3px 10px",
              borderRadius: 999,
            }}
          >
            {data.change24h}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10 }}>
          <div
            data-eid="current-price"
            style={{
              ...fmtMono,
              fontSize: 32,
              fontWeight: 900,
              color: "#1fe37a",
              letterSpacing: 0.4,
            }}
          >
            {data.currentPrice}
          </div>
          <span
            data-eid="price-usd"
            style={{
              ...fmtMono,
              fontSize: 13,
              color: "#7f8aa3",
              marginTop: 6,
            }}
          >
            {data.usdPrice}
          </span>
        </div>
      </header>

      <div data-eid="asks-section" style={{ marginTop: 4 }}>
        <div
          data-eid="asks-title"
          style={{
            color: "#ff4d4f",
            fontWeight: 800,
            fontSize: 13,
            margin: "6px 0 6px 2px",
          }}
        >
          Asks
        </div>

        <div
          data-eid="asks-col-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr 0.8fr",
            padding: "0 12px",
            marginBottom: 4,
            color: "#5e6a83",
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: "uppercase",
          }}
        >
          <div>PRICE (USDT)</div>
          <div style={{ textAlign: "center" }}>AMOUNT (BTC)</div>
          <div style={{ textAlign: "right" }}>TOTAL</div>
        </div>

        <div style={{ display: "grid", gap: 3 }}>
          {asks.map((lvl, i) => (
            <Row key={i} eidBase={`ask-${i}`} side="ask" level={lvl} />
          ))}
        </div>
      </div>

      <div
        data-eid="spread-indicator"
        style={{
          marginTop: 14,
          marginBottom: 12,
          padding: "10px 12px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          color: "#8691a7",
        }}
      >
        <span
          data-eid="spread-label"
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: "#51607b",
            textTransform: "uppercase",
          }}
        >
          SPREAD
        </span>
        <span data-eid="spread-value" style={{ ...fmtMono, fontSize: 13, fontWeight: 800 }}>
          {data.spreadValue}
        </span>
        <span data-eid="spread-pct" style={{ ...fmtMono, fontSize: 12, color: "#6f7d95" }}>
          {data.spreadPct}
        </span>
      </div>

      <div data-eid="bids-section">
        <div
          data-eid="bids-title"
          style={{
            color: "#22c55e",
            fontWeight: 800,
            fontSize: 13,
            margin: "4px 0 6px 2px",
          }}
        >
          Bids
        </div>

        <div
          data-eid="bids-col-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr 0.8fr",
            padding: "0 12px",
            marginBottom: 4,
            color: "#5e6a83",
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: "uppercase",
          }}
        >
          <div>PRICE (USDT)</div>
          <div style={{ textAlign: "center" }}>AMOUNT (BTC)</div>
          <div style={{ textAlign: "right" }}>TOTAL</div>
        </div>

        <div style={{ display: "grid", gap: 3 }}>
          {bids.map((lvl, i) => (
            <Row key={i} eidBase={`bid-${i}`} side="bid" level={lvl} />
          ))}
        </div>
      </div>

      <div
        data-eid="footer"
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 16,
          paddingTop: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          color: "#92a0b8",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span data-eid="footer-volume-label" style={{ fontSize: 10.5, color: "#66738a" }}>
            24h Volume
          </span>
          <span data-eid="footer-volume-value" style={{ ...fmtMono, fontSize: 12.5, color: "#cfd7e4" }}>
            {data.footer.volume}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "center" }}>
          <span data-eid="footer-high-label" style={{ fontSize: 10.5, color: "#66738a" }}>
            24h High
          </span>
          <span data-eid="footer-high-value" style={{ ...fmtMono, fontSize: 12.5, color: "#cfd7e4" }}>
            {data.footer.high}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "right" }}>
          <span data-eid="footer-low-label" style={{ fontSize: 10.5, color: "#66738a" }}>
            24h Low
          </span>
          <span data-eid="footer-low-value" style={{ ...fmtMono, fontSize: 12.5, color: "#cfd7e4" }}>
            {data.footer.low}
          </span>
        </div>
      </div>
    </section>
  );
}