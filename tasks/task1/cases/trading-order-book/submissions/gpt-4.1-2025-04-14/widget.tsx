import React from "react";
import data from "./data.json";

const barBase = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  height: "100%",
  borderRadius: 2,
  opacity: 0.18,
  pointerEvents: "none" as const,
};

const fontMono = {
  fontFamily: "Menlo, monospace",
  fontVariantNumeric: "tabular-nums",
};

export default function Widget() {
  // For depth bar visualization
  const asksTotal = data.asks.map((a) => a.total);
  const bidsTotal = data.bids.map((b) => b.total);
  const maxAsk = Math.max(...asksTotal);
  const maxBid = Math.max(...bidsTotal);

  return (
    <section
      data-eid="root"
      style={{
        background: "linear-gradient(180deg, #181F2A 0%, #151923 100%)",
        borderRadius: 24,
        padding: 0,
        width: 484,
        boxShadow: "0 2px 32px 0 rgba(31,52,87,0.14)",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        color: "#fff",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <header
        data-eid="header"
        style={{
          padding: "24px 0 0 0",
          marginBottom: 0,
          textAlign: "left",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 32,
            marginBottom: 8,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              display: "inline-flex",
              background:
                "linear-gradient(135deg,#ff9900 40%,#ffe27a 100%)",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 6,
              boxSizing: "border-box",
            }}
          >
            <svg width={17} height={17} viewBox="0 0 17 17" fill="none">
              <path
                d="M8.5 3.5v6l4 2"
                stroke="#181F2A"
                strokeWidth="1.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="7.5"
                stroke="#181F2A"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </div>
          <div
            data-eid="pair-label"
            style={{
              fontWeight: 700,
              fontSize: 22,
              lineHeight: 1,
              color: "#fff",
              marginRight: 12,
            }}
          >
            {data.pair}
          </div>
          <span
            data-eid="price-change-24h"
            style={{
              background: "#109b51",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              padding: "2.5px 14px",
              borderRadius: 14,
              marginLeft: 4,
              letterSpacing: 0.5,
              display: "inline-block",
              lineHeight: 1.35,
            }}
          >
            {data.priceChange24h}
          </span>
        </div>
        <div
          data-eid="current-price"
          style={{
            fontWeight: 700,
            fontSize: 40,
            color: "#38D430",
            marginLeft: 32,
            marginTop: 0,
            marginBottom: 6,
            letterSpacing: -1,
            lineHeight: "44px",
          }}
        >
          {data.currentPrice}
        </div>
        <span
          data-eid="price-usd"
          style={{
            color: "#BBC0C9",
            fontSize: 16,
            marginLeft: 32,
            letterSpacing: 0.2,
            fontWeight: 400,
          }}
        >
          ${data.currentPrice}
        </span>
      </header>

      <div
        style={{
          marginTop: 25,
          marginBottom: 24,
          marginLeft: 0,
          marginRight: 0,
        }}
      >
        {/* ASKS */}
        <div data-eid="asks-section" style={{}}>
          <div
            data-eid="asks-title"
            style={{
              color: "#FF5A5F",
              fontWeight: 600,
              fontSize: 19,
              marginLeft: 32,
              marginBottom: 0,
              lineHeight: 1.25,
            }}
          >
            Asks
          </div>
          <div
            data-eid="asks-col-header"
            style={{
              marginTop: 7,
              color: "#888FA3",
              fontSize: 13,
              fontWeight: 500,
              display: "flex",
              justifyContent: "space-between",
              width: 420,
              marginLeft: 32,
              marginBottom: 1,
            }}
          >
            <span style={{ width: 120 }}>PRICE (USDT)</span>
            <span style={{ width: 120, textAlign: "right" }}>
              AMOUNT (BTC)
            </span>
            <span style={{ width: 80, textAlign: "right" }}>TOTAL</span>
          </div>
          <div style={{ marginTop: 4 }}>
            {data.asks.map((row, i) => {
              const barWidth =
                (row.total / maxAsk) * 342 || 0; // max width px
              return (
                <div
                  data-eid={`ask-${i}`}
                  key={i}
                  style={{
                    position: "relative",
                    width: 420,
                    height: 28,
                    lineHeight: "28px",
                    marginLeft: 32,
                    marginBottom: 0,
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    ...fontMono,
                  }}
                >
                  {/* Depth bar */}
                  <div
                    data-eid={`ask-${i}-bar`}
                    style={{
                      ...barBase,
                      width: barWidth,
                      background:
                        "linear-gradient(90deg,#FF5A5F 10%,#790A1F 130%)",
                      zIndex: 0,
                    }}
                  />
                  <span
                    data-eid={`ask-${i}-price`}
                    style={{
                      color: "#FF5A5F",
                      fontWeight: 700,
                      width: 120,
                      zIndex: 1,
                    }}
                  >
                    {row.price}
                  </span>
                  <span
                    data-eid={`ask-${i}-amount`}
                    style={{
                      color: "#f3eff6",
                      textAlign: "right",
                      fontWeight: 500,
                      width: 120,
                      zIndex: 1,
                      marginLeft: 0,
                    }}
                  >
                    {row.amount}
                  </span>
                  <span
                    data-eid={`ask-${i}-total`}
                    style={{
                      color: "#f3eff6",
                      textAlign: "right",
                      fontWeight: 600,
                      width: 80,
                      zIndex: 1,
                      marginLeft: 0,
                    }}
                  >
                    {row.total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        data-eid="spread-indicator"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "12px 0 10px 0",
          width: "100%",
          borderTop: "1px solid #242834",
          borderBottom: "1px solid #242834",
          height: 44,
          fontSize: 17,
          background: "none",
          letterSpacing: 0.2,
        }}
      >
        <span
          data-eid="spread-label"
          style={{
            color: "#8F97AE",
            fontWeight: 600,
            fontSize: 14,
            marginRight: 6,
            letterSpacing: 0.1,
          }}
        >
          SPREAD
        </span>
        <span
          data-eid="spread-value"
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 17,
            marginRight: 7,
            letterSpacing: 0.1,
          }}
        >
          {data.spread.value}
        </span>
        <span
          data-eid="spread-pct"
          style={{
            color: "#8F97AE",
            fontWeight: 600,
            fontSize: 15,
            marginTop: 1,
            letterSpacing: 0.1,
          }}
        >
          ({data.spread.pct})
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        {/* BIDS */}
        <div data-eid="bids-section" style={{}}>
          <div
            data-eid="bids-title"
            style={{
              color: "#38D430",
              fontWeight: 600,
              fontSize: 19,
              marginLeft: 32,
              marginBottom: 0,
              marginTop: 0,
              lineHeight: 1.25,
            }}
          >
            Bids
          </div>
          <div
            data-eid="bids-col-header"
            style={{
              marginTop: 7,
              color: "#888FA3",
              fontSize: 13,
              fontWeight: 500,
              display: "flex",
              justifyContent: "space-between",
              width: 420,
              marginLeft: 32,
              marginBottom: 1,
            }}
          >
            <span style={{ width: 120 }}>PRICE (USDT)</span>
            <span style={{ width: 120, textAlign: "right" }}>
              AMOUNT (BTC)
            </span>
            <span style={{ width: 80, textAlign: "right" }}>TOTAL</span>
          </div>
          <div style={{ marginTop: 4 }}>
            {data.bids.map((row, i) => {
              const barWidth = (row.total / maxBid) * 342 || 0;
              return (
                <div
                  data-eid={`bid-${i}`}
                  key={i}
                  style={{
                    position: "relative",
                    width: 420,
                    height: 28,
                    lineHeight: "28px",
                    marginLeft: 32,
                    marginBottom: 0,
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    ...fontMono,
                  }}
                >
                  {/* Depth bar */}
                  <div
                    data-eid={`bid-${i}-bar`}
                    style={{
                      ...barBase,
                      width: barWidth,
                      background:
                        "linear-gradient(90deg,#38D430 10%,#1B5138 130%)",
                      zIndex: 0,
                    }}
                  />
                  <span
                    data-eid={`bid-${i}-price`}
                    style={{
                      color: "#38D430",
                      fontWeight: 700,
                      width: 120,
                      zIndex: 1,
                    }}
                  >
                    {row.price}
                  </span>
                  <span
                    data-eid={`bid-${i}-amount`}
                    style={{
                      color: "#f3eff6",
                      textAlign: "right",
                      fontWeight: 500,
                      width: 120,
                      zIndex: 1,
                      marginLeft: 0,
                    }}
                  >
                    {row.amount}
                  </span>
                  <span
                    data-eid={`bid-${i}-total`}
                    style={{
                      color: "#f3eff6",
                      textAlign: "right",
                      fontWeight: 600,
                      width: 80,
                      zIndex: 1,
                      marginLeft: 0,
                    }}
                  >
                    {row.total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        data-eid="footer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 26,
          background: "none",
          marginLeft: 32,
          marginBottom: 24,
          borderTop: "1px solid #242834",
          paddingTop: 18,
          fontSize: 15,
          color: "#BBC0C9",
        }}
      >
        <span
          data-eid="footer-volume-label"
          style={{ fontWeight: 500, color: "#b6bbdb" }}
        >
          24h Volume
        </span>
        <span
          data-eid="footer-volume-value"
          style={{ fontWeight: 700, color: "#fff" }}
        >
          {data.footer.volume}
        </span>
        <span
          data-eid="footer-high-label"
          style={{ marginLeft: 16, fontWeight: 500, color: "#b6bbdb" }}
        >
          24h High
        </span>
        <span
          data-eid="footer-high-value"
          style={{ fontWeight: 700, color: "#fff" }}
        >
          {data.footer.high}
        </span>
        <span
          data-eid="footer-low-label"
          style={{ marginLeft: 16, fontWeight: 500, color: "#b6bbdb" }}
        >
          24h Low
        </span>
        <span
          data-eid="footer-low-value"
          style={{ fontWeight: 700, color: "#fff" }}
        >
          {data.footer.low}
        </span>
      </div>
    </section>
  );
}