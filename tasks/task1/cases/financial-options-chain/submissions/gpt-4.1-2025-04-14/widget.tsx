import React from "react";
import data from "./data.json";

const accent = "#38d996";
const bgGradient =
  "linear-gradient(180deg, #181e30 0%, #181c27 55%, #181a20 100%)";
const headerBg = "rgba(22,24,38,1)";
const darkBorder = "#23263a";
const callITM = "#232742";
const putITM = "#44252b";
const putText = "#ff4762";
const callDelta = "#4be169";
const putDelta = "#ff8989";
const grey = "#bac1d0";
const muted = "#636e8b";

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: bgGradient,
        borderRadius: 20,
        overflow: "hidden",
        width: 520,
        margin: "32px auto",
        border: "1px solid #eaeaea",
        boxShadow: "0 2px 16px 0 #06091616",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "18px 24px 13px 23px",
          borderBottom: `1px solid ${darkBorder}`,
          background: headerBg,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Icon (simple trend arrow) */}
          <svg
            width={24}
            height={24}
            style={{ marginRight: 2 }}
            viewBox="0 0 20 20"
          >
            <polyline
              points="2,15 7,10 12,15 18,9"
              fill="none"
              stroke="#5866f2"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <polyline
              points="15,9 18,9 18,12"
              fill="none"
              stroke="#5866f2"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <div
            data-eid="stock-symbol"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 23,
              letterSpacing: 0.5,
              marginRight: 7,
              lineHeight: "120%",
            }}
          >
            {data.header.symbol}
          </div>
          <div
            data-eid="stock-price"
            style={{
              color: accent,
              fontWeight: 700,
              fontSize: 21,
              letterSpacing: 0.5,
              lineHeight: "120%",
            }}
          >
            {data.header.price}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span
            data-eid="expiry-badge"
            style={{
              background: "#262c44",
              borderRadius: 8,
              color: "#c3c9e3",
              padding: "3px 14px",
              fontWeight: 600,
              fontSize: 15,
              marginRight: 2,
              display: "inline-block",
              lineHeight: "110%",
            }}
          >
            {data.header.expiry}
          </span>
          <span
            data-eid="type-badge"
            style={{
              background: "#fde68a",
              borderRadius: 8,
              color: "#664c00",
              fontWeight: 600,
              padding: "3px 14px",
              fontSize: 15,
              lineHeight: "110%",
            }}
          >
            {data.header.type}
          </span>
        </div>
      </header>
      {/* CHAIN */}
      <div style={{ padding: 0, background: "none" }}>
        {/* Calls & puts table */}
        <div style={{ display: "flex", alignItems: "stretch" }}>
          {/* CALLS */}
          <div data-eid="calls-section" style={{ width: "47%", minWidth: 0 }}>
            <div
              data-eid="calls-title"
              style={{
                color: "#4be169",
                fontWeight: 700,
                padding: "19px 0 3px 0",
                fontSize: 15,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginLeft: 32,
              }}
            >
              CALLS
            </div>
            <div
              data-eid="calls-header-row"
              style={{
                color: muted,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 0.2,
                display: "flex",
                paddingLeft: 12,
                paddingRight: 0,
                marginTop: 3,
                marginBottom: 2,
                gap: 0,
              }}
            >
              <div style={{ width: 53 }}>BID</div>
              <div style={{ width: 53 }}>ASK</div>
              <div style={{ width: 53 }}>LAST</div>
              <div style={{ width: 55 }}>VOL</div>
              <div style={{ width: 60 }}>OI</div>
              <div style={{ width: 50 }}>IV</div>
              <div style={{ width: 46 }}>DELTA</div>
            </div>
            {data.calls.map((call, i) => (
              <div
                key={i}
                data-eid={`call-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 15,
                  color: "#f6f6fa",
                  fontFamily: "inherit",
                  background:
                    call.style === "itm"
                      ? callITM
                      : "none",
                  padding:
                    call.style === "itm"
                      ? "0 0 0 4px"
                      : "0 0 0 4px",
                  borderRadius: call.style === "itm" ? 7 : 0,
                  marginBottom: 2,
                  minHeight: 32,
                  fontWeight: 500,
                }}
              >
                <span
                  data-eid={`call-${i}-bid`}
                  style={{ width: 53, display: "inline-block" }}
                >
                  {call.bid}
                </span>
                <span
                  data-eid={`call-${i}-ask`}
                  style={{ width: 53, display: "inline-block" }}
                >
                  {call.ask}
                </span>
                <span
                  data-eid={`call-${i}-last`}
                  style={{ width: 53, display: "inline-block" }}
                >
                  {call.last}
                </span>
                <span
                  data-eid={`call-${i}-vol`}
                  style={{
                    width: 55,
                    display: "inline-block",
                    color: "#70b5ff",
                    fontWeight: 600,
                  }}
                >
                  {call.vol}
                </span>
                <span
                  data-eid={`call-${i}-oi`}
                  style={{
                    width: 60,
                    display: "inline-block",
                    color: "#c5e083",
                    fontWeight: 600,
                  }}
                >
                  {call.oi}
                </span>
                <span
                  data-eid={`call-${i}-iv`}
                  style={{
                    width: 50,
                    display: "inline-block",
                    color: "#ffc877",
                  }}
                >
                  {call.iv}
                </span>
                <span
                  data-eid={`call-${i}-delta`}
                  style={{
                    width: 46,
                    display: "inline-block",
                    fontWeight: 700,
                    color: call.delta > 0.5 ? callDelta : accent,
                  }}
                >
                  {call.delta}
                </span>
              </div>
            ))}
          </div>
          {/* STRIKE DIVIDER */}
          <div
            data-eid="strike-divider"
            style={{
              width: "11%",
              minWidth: 74,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              borderLeft: `1.5px solid ${darkBorder}`,
              borderRight: `1.5px solid ${darkBorder}`,
              margin: "-3px 0 0 0",
              background: "transparent",
            }}
          >
            <div style={{ height: 42 }} />
            {data.strikes.map((strike, i) => (
              <div
                key={i}
                style={{
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: strike.selected ? 700 : 600,
                  color: strike.selected ? "#fff" : grey,
                  background: strike.selected
                    ? "#293059"
                    : undefined,
                  borderRadius: strike.selected ? 7 : 0,
                  margin: "0 6px 2px 6px",
                  letterSpacing: 0.2,
                }}
              >
                {"$" + strike.label}
              </div>
            ))}
          </div>
          {/* PUTS */}
          <div data-eid="puts-section" style={{ width: "42%", minWidth: 0 }}>
            <div
              data-eid="puts-title"
              style={{
                color: putText,
                fontWeight: 700,
                padding: "19px 0 3px 0",
                fontSize: 15,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginLeft: 13,
              }}
            >
              PUTS
            </div>
            <div
              data-eid="puts-header-row"
              style={{
                color: muted,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 0.2,
                display: "flex",
                marginTop: 3,
                marginBottom: 2,
                paddingLeft: 11,
                gap: 0,
              }}
            >
              <div style={{ width: 53 }}>BID</div>
              <div style={{ width: 53 }}>ASK</div>
              <div style={{ width: 53 }}>LAST</div>
              <div style={{ width: 55 }}>VOL</div>
              <div style={{ width: 60 }}>OI</div>
              <div style={{ width: 50 }}>IV</div>
              <div style={{ width: 46 }}>DELTA</div>
            </div>
            {data.puts.map((put, i) => (
              <div
                key={i}
                data-eid={`put-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 15,
                  color: "#f6f6fa",
                  fontFamily: "inherit",
                  background:
                    put.style === "itm"
                      ? putITM
                      : "none",
                  padding: put.style === "itm" ? "0 0 0 4px" : "0 0 0 4px",
                  borderRadius: put.style === "itm" ? 7 : 0,
                  marginBottom: 2,
                  minHeight: 32,
                  fontWeight: 500,
                }}
              >
                <span
                  data-eid={`put-${i}-bid`}
                  style={{ width: 53, display: "inline-block" }}
                >
                  {put.bid}
                </span>
                <span
                  data-eid={`put-${i}-ask`}
                  style={{ width: 53, display: "inline-block" }}
                >
                  {put.ask}
                </span>
                <span
                  data-eid={`put-${i}-last`}
                  style={{ width: 53, display: "inline-block" }}
                >
                  {put.last}
                </span>
                <span
                  data-eid={`put-${i}-vol`}
                  style={{
                    width: 55,
                    display: "inline-block",
                    color: "#70b5ff",
                    fontWeight: 600,
                  }}
                >
                  {put.vol}
                </span>
                <span
                  data-eid={`put-${i}-oi`}
                  style={{
                    width: 60,
                    display: "inline-block",
                    color: "#c5e083",
                    fontWeight: 600,
                  }}
                >
                  {put.oi}
                </span>
                <span
                  data-eid={`put-${i}-iv`}
                  style={{
                    width: 50,
                    display: "inline-block",
                    color: "#ffc877",
                  }}
                >
                  {put.iv}
                </span>
                <span
                  data-eid={`put-${i}-delta`}
                  style={{
                    width: 46,
                    display: "inline-block",
                    fontWeight: 700,
                    color: "#ff8989",
                  }}
                >
                  {put.delta}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Greeks summary */}
        <div
          data-eid="greeks-summary"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 0 8px 0",
            fontSize: 16,
            margin: "4px 11px 0 11px",
            borderTop: `1.5px solid ${darkBorder}`,
            borderBottom: `1.5px solid ${darkBorder}`,
            justifyContent: "space-between",
          }}
        >
          <span
            data-eid="greeks-iv-label"
            style={{
              color: muted,
              fontWeight: 600,
              marginLeft: 11,
              marginRight: 3,
              fontSize: 15,
            }}
          >
            Avg IV
          </span>
          <span
            data-eid="greeks-iv-value"
            style={{
              color: "#4be1ef",
              fontWeight: 700,
              fontSize: 17,
              marginRight: "auto",
              marginLeft: 5,
            }}
          >
            {data.greeks.iv}
          </span>
          <span
            data-eid="greeks-pcr-label"
            style={{
              color: muted,
              fontWeight: 600,
              marginLeft: 12,
              fontSize: 15,
            }}
          >
            P/C Ratio
          </span>
          <span
            data-eid="greeks-pcr-value"
            style={{
              color: "#ffd76c",
              fontWeight: 700,
              marginLeft: 7,
              fontSize: 17,
            }}
          >
            {data.greeks.pcr}
          </span>
        </div>
        {/* Totals summary */}
        <div
          data-eid="volume-summary"
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            padding: "24px 55px 22px 55px",
            fontSize: 16,
            background: "rgba(16,18,30,0.93)",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        >
          <div
            data-eid="total-volume"
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            <div style={{ color: "#fff", fontSize: 23 }}>
              {data.summary.totalVolume}
            </div>
            <div
              style={{
                fontWeight: 500,
                color: muted,
                fontSize: 13,
                marginTop: 1,
                letterSpacing: 0.2,
              }}
            >
              Total Volume
            </div>
          </div>
          <div
            data-eid="total-oi"
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            <div style={{ color: "#fff", fontSize: 23 }}>
              {data.summary.totalOI}
            </div>
            <div
              style={{
                fontWeight: 500,
                color: muted,
                fontSize: 13,
                marginTop: 1,
                letterSpacing: 0.2,
              }}
            >
              Total Open Interest
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}