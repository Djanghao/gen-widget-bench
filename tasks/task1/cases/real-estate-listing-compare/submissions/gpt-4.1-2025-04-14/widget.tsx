import React from "react";
import data from "./data.json";
import { Home, MapPin, Tag } from "lucide-react";
import { LineChart, Line } from "recharts";

const statusColors = {
  Active: {
    bg: "#1be1c2",
    fg: "#00383a",
  },
  Hot: {
    bg: "#ac6fea",
    fg: "#2a2041",
  },
  "Price Cut": {
    bg: "#ffd54a",
    fg: "#705d13",
  },
};

const cardHeaderColors = [
  // border and header glows for each card
  {
    border: "1px solid #23e2d4",
    shadow: "0 0 0px 1.5px #23e2d4,0 2px 32px 0px rgba(35,226,212,0.09)",
  },
  {
    border: "1px solid #ac6fea",
    shadow: "0 0 0px 1.5px #ac6fea,0 2px 32px 0px rgba(172,111,234,0.09)",
  },
  {
    border: "1px solid #ffd54a",
    shadow: "0 0 0px 1.5px #ffd54a,0 2px 32px 0px rgba(255,213,74,0.09)",
  },
];
const getScoreBarColor = (score: number, idx: number) => {
  if (score > 90) return "#13e087";
  if (score > 80) return "#7984f8";
  if (score > 70) return "#ffd54a";
  return "#aaa";
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        borderRadius: 24,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #191a21 75%, #24144b 100%)",
        boxShadow: "0 14px 48px #0004",
        width: 588,
        margin: "0 auto",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#e4eeff",
        border: "1px solid #222236",
        padding: 0,
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: "28px 28px 8px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div data-eid="title" style={{ fontWeight: 700, fontSize: 24, letterSpacing: -1.5, display: "flex", alignItems: "center", lineHeight: "28px" }}>
              <Home size={22} strokeWidth={2} style={{ marginRight: 9, color: "#6badff" }} />
              Property<br/>Comparison
            </div>
            <div data-eid="subtitle" style={{ color: "#90a0cf", fontWeight: 500, fontSize: 14, marginTop: 8, marginLeft: 4 }}>3 Active Listings</div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <span
              data-eid="location-badge"
              style={{
                background: "linear-gradient(90deg,#212c4a 60%,#2067e0 100%)",
                color: "#cffcff",
                fontWeight: 600,
                fontSize: 15,
                padding: "5px 16px",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginRight: 0,
              }}
            >
              <MapPin size={16} style={{marginRight:5,color:"#5ddeec"}}/> San Francisco, CA
            </span>
            <span
              data-eid="price-range-badge"
              style={{
                background: "linear-gradient(90deg,#30874c 20%,#0ad699 100%)",
                color: "#05322e",
                fontWeight: 600,
                fontSize: 15,
                padding: "5px 16px",
                borderRadius: 16,
                display: "inline-block",
                alignItems: "center",
                letterSpacing: 0.5,
              }}
            >
              $1.1M - $1.5M
            </span>
          </div>
        </div>
      </header>
      <div
        data-eid="cards-row"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 18,
          padding: "15px 20px 0 20px",
          justifyContent: "space-between",
        }}
      >
        {data.cards.map((card, idx) => (
          <div
            key={card.address}
            data-eid={`prop-${idx}`}
            style={{
              background: "linear-gradient(132deg,#23234e 60%,#1e232d 100%)",
              borderRadius: 12,
              flex: 1,
              minWidth: 0,
              padding: "0 0 12px 0",
              border: cardHeaderColors[idx].border,
              boxShadow: cardHeaderColors[idx].shadow,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              data-eid={`prop-${idx}-image`}
              style={{
                height: 44,
                width: "100%",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                background: idx === 0
                  ? "linear-gradient(90deg,#226065 50%,#22e8d7 100%)"
                  : idx === 1
                    ? "linear-gradient(90deg,#40266d 30%, #a27ffb 100%)"
                    : "linear-gradient(90deg,#7f4620 40%,#ffd54a 100%)",
                position: "relative",
                marginBottom: 6,
              }}
            >
              <span
                data-eid={`prop-${idx}-status`}
                style={{
                  position: "absolute",
                  left: 10,
                  top: 11,
                  background: statusColors[card.status].bg,
                  color: statusColors[card.status].fg,
                  padding: "2px 10px",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 8,
                  boxShadow: "0 2px 12px #1233",
                  zIndex: 2,
                  letterSpacing: 0.2,
                }}
              >
                {card.status}
              </span>
              <span style={{
                position:"absolute",
                right:9,top:11,opacity:0.3,background: "#0002",borderRadius:4,padding:3,
              }}><Home size={16} strokeWidth={2} /></span>
            </div>
            <div style={{ padding: "0 14px 0 14px", display: "flex", flexDirection: "column", gap: 0 }}>
              <div
                data-eid={`prop-${idx}-address`}
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: -2,
                  maxWidth: "95%",
                }}
              >
                {card.address}
              </div>
              <div
                data-eid={`prop-${idx}-neighborhood`}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#98a9dc",
                  marginBottom: 6,
                }}
              >
                {card.neighborhood}
              </div>
              <div
                data-eid={`prop-${idx}-price`}
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: -1,
                  marginBottom: -3,
                  color: "#fff",
                  marginTop: -1,
                }}
              >
                {card.price}
              </div>
              <span
                data-eid={`prop-${idx}-ppsqft`}
                style={{
                  color: "#91d0ea",
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 4,
                  display: "block",
                  letterSpacing: "0.2px",
                }}
              >
                {card.ppsqft}
              </span>
              <div
                data-eid={`prop-${idx}-stats`}
                style={{
                  display: "flex",
                  gap: 8,
                  margin: "2px 0 2px 0",
                  fontSize: 14,
                  color: "#c2daf7",
                  fontWeight: 500,
                  alignItems: "center",
                }}
              >
                <span data-eid={`prop-${idx}-beds`} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {card.beds}
                </span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>·</span>
                <span data-eid={`prop-${idx}-baths`} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {card.baths}
                </span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>·</span>
                <span data-eid={`prop-${idx}-sqft`} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {card.sqft}
                </span>
              </div>
              <div data-eid={`prop-${idx}-sparkline`} style={{ margin: "7px 0 3px 0" }}>
                <LineChart width={116} height={22} data={card.sparkline}>
                  <Line
                    type="monotone"
                    dataKey="y"
                    dot={false}
                    stroke={
                      idx === 0
                        ? "#36e5ea"
                        : idx === 1
                        ? "#ae84f7"
                        : "#ffd44a"
                    }
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 0 }}>
                <div data-eid={`prop-${idx}-feat-0`} style={{ fontSize: 13.2, color: "#b2befb", display: "flex", justifyContent: "space-between", margin: "0.5px 0" }}>
                  <span>Year Built</span>
                  <span style={{ color: "#f7eeff", fontWeight: 700 }}>{card.yearBuilt}</span>
                </div>
                <div data-eid={`prop-${idx}-feat-1`} style={{ fontSize: 13.2, color: "#b2befb", display: "flex", justifyContent: "space-between", margin: "0.5px 0" }}>
                  <span>Lot Size</span>
                  <span style={{ color: "#f7eeff", fontWeight: 700 }}>{card.lotSize}</span>
                </div>
                <div data-eid={`prop-${idx}-feat-2`} style={{ fontSize: 13.2, color: "#b2befb", display: "flex", justifyContent: "space-between", margin: "0.5px 0" }}>
                  <span>HOA</span>
                  <span style={{ color: "#f7eeff", fontWeight: 700 }}>{card.hoa}</span>
                </div>
                <div data-eid={`prop-${idx}-feat-3`} style={{ fontSize: 13.2, color: "#b2befb", display: "flex", justifyContent: "space-between", margin: "0.5px 0" }}>
                  <span>Taxes</span>
                  <span style={{ color: "#f7eeff", fontWeight: 700 }}>{card.taxes}</span>
                </div>
                <div data-eid={`prop-${idx}-feat-4`} style={{ fontSize: 13.2, color: "#b2befb", display: "flex", justifyContent: "space-between", margin: "0.5px 0" }}>
                  <span>Days on Market</span>
                  <span style={{ color: "#f7eeff", fontWeight: 700 }}>{card.daysOnMarket}</span>
                </div>
                <div data-eid={`prop-${idx}-feat-5`} style={{ fontSize: 13.2, color: "#b2befb", display: "flex", justifyContent: "space-between", margin: "0.5px 0" }}>
                  <span>Walk Score</span>
                  <span style={{ color: "#f7eeff", fontWeight: 700 }}>{card.walkScore}</span>
                </div>
                <div data-eid={`prop-${idx}-score`} style={{ marginTop: 8 }}>
                  <span data-eid={`prop-${idx}-score-label`} style={{ color: "#abbde7", fontWeight: 600, fontSize: 12 }}>
                    Score{" "}
                  </span>
                  <span data-eid={`prop-${idx}-score-value`} style={{
                    color: getScoreBarColor(card.score, idx),
                    fontWeight: 700,
                    fontSize: 15,
                    marginLeft: 4,
                  }}>
                    {card.score}%
                  </span>
                  <div data-eid={`prop-${idx}-score-bar`} style={{
                    marginTop: 3,
                    width: "100%",
                    height: 8,
                    background: "#262b66",
                    borderRadius: 6,
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      width: `${card.score}%`,
                      height: "100%",
                      background: getScoreBarColor(card.score, idx),
                      borderRadius: 6,
                      boxShadow: getScoreBarColor(card.score, idx) + "66 0px 2px 9px 1px",
                      transition: "width 0.2s",
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        data-eid="verdict"
        style={{
          background: "#252944",
          borderRadius: 16,
          margin: "22px 17px 17px 17px",
          boxShadow: "0 1px 8px #1112",
          padding: "20px 21px 12px 22px",
        }}
      >
        <div
          data-eid="verdict-title"
          style={{
            color: "#ffd54a",
            fontWeight: 700,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            lineHeight: "24px",
            gap: 8,
          }}
        >
          <Tag size={18} style={{ marginRight: 7, color: "#ffd54a" }} />
          Best Value
        </div>
        <div
          data-eid="verdict-winner"
          style={{
            fontWeight: 800,
            color: "#fff",
            fontSize: 21,
            margin: "1px 0 7px 0",
            letterSpacing: -0.8,
            lineHeight: "21px",
          }}
        >
          1401 Mission St
        </div>
        <div
          data-eid="verdict-reason"
          style={{
            color: "#d6e5fc",
            fontSize: 15,
            lineHeight: "22px",
            fontWeight: 500,
            margin: "0px 0 13px 0",
            letterSpacing: -0.1,
          }}
        >
          Highest overall score with modern construction, best walk score, and lowest days on market despite premium pricing.
        </div>
        <div data-eid="verdict-score-bar" style={{
          height: 8,
          background: "#2b305d",
          borderRadius: 6,
          width: "100%",
          position: "relative",
          marginTop: 2,
          marginBottom: 2,
          overflow: "hidden",
        }}>
          <div data-eid="verdict-score-fill" style={{
            width: "91%",
            height: "100%",
            background: "#13e087",
            borderRadius: 6,
            transition: "width 0.2s",
          }}/>
        </div>
      </div>
    </section>
  );
}