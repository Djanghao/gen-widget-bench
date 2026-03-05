import React from "react";
import data from "./data.json";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Bitcoin, Ethereum, Link2 } from "lucide-react";

const coinIcons: Record<string, React.ReactNode> = {
  Bitcoin: (
    <svg width="28" height="28" viewBox="0 0 40 40" style={{display:'block'}}>
      <circle cx="20" cy="20" r="20" fill="#FFAA2C"/>
      <text x="20" y="25" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#fff">₿</text>
    </svg>
  ),
  Ethereum: (
    <svg width="28" height="28" viewBox="0 0 40 40" style={{display:'block'}}>
      <circle cx="20" cy="20" r="20" fill="#676AD6"/>
      <polygon points="20,9 29,21 20,17 11,21" fill="#fff" opacity="0.8" />
      <polygon points="20,32 29,22 20,25 11,22" fill="#fff" />
    </svg>
  ),
  Solana: (
    <svg width="28" height="28" viewBox="0 0 40 40" style={{display:'block'}}>
      <circle cx="20" cy="20" r="20" fill="#9646E5"/>
      <rect x="11" y="13" width="18" height="4" rx="2" fill="#fff" opacity="0.8"/>
      <rect x="11" y="19" width="18" height="4" rx="2" fill="#43FFD8" />
      <rect x="11" y="25" width="18" height="4" rx="2" fill="#FDE68A" />
    </svg>
  ),
  Cardano: (
    <svg width="28" height="28" viewBox="0 0 40 40" style={{display:'block'}}>
      <circle cx="20" cy="20" r="20" fill="#3ED6F5"/>
      <circle cx="20" cy="20" r="6" fill="#fff" opacity="0.70"/>
      <circle cx="20" cy="10.5" r="1.7" fill="#fff"/>
      <circle cx="28" cy="17" r="1.7" fill="#fff"/>
      <circle cx="12" cy="17" r="1.7" fill="#fff"/>
      <circle cx="25.5" cy="26" r="1.7" fill="#fff"/>
      <circle cx="14.5" cy="26" r="1.7" fill="#fff"/>
    </svg>
  ),
  Chainlink: (
    <svg width="28" height="28" viewBox="0 0 40 40" style={{display:'block'}}>
      <circle cx="20" cy="20" r="20" fill="#2A5ADA"/>
      <polygon points="20,10 28,15 28,25 20,30 12,25 12,15" fill="#fff"/>
    </svg>
  )
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: "linear-gradient(180deg, #202235 95%, #20223500 100%)",
        borderRadius: 24,
        padding: 32,
        width: 430,
        margin: "0 auto",
        color: "#fff",
        fontFamily: "'Inter', Arial, sans-serif",
        boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
        minHeight: 690
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ marginBottom: 22 }}>
        <div
          data-eid="portfolio-title"
          style={{
            letterSpacing: 1.1,
            fontWeight: 500,
            fontSize: 13,
            textTransform: "uppercase",
            color: "#b2b8d4",
            marginBottom: 6
          }}
        >
          {data.title}
        </div>
        <div
          data-eid="total-value"
          style={{
            fontWeight: 700,
            fontSize: 36,
            marginBottom: 8,
            lineHeight: 1.1,
            color: "#fff"
          }}
        >
          {data.totalValue}
        </div>
        <div
          data-eid="total-change"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 17,
            fontWeight: 600,
            color: data.totalChange.positive ? "#3AFF7A" : "#FF4040",
            marginBottom: 10
          }}
        >
          <span style={{marginRight: 5}}>
            <svg width="20" height="20" style={{verticalAlign:"middle"}}>
              <polyline
                points={data.totalChange.positive ? "4,14 9,18 16,6" : "4,6 9,18 16,13"}
                fill="none"
                stroke={data.totalChange.positive ? "#3AFF7A" : "#FF4040"}
                strokeWidth="2.3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span style={{ color: "#3AFF7A" }}>{data.totalChange.percent}</span>
          <span style={{ color: "#3AFF7A", marginLeft: 3 }}>{data.totalChange.value}</span>
          <span style={{ marginLeft: 4, fontWeight: 500, color: "#3AFF7A", fontSize:15, opacity:.88 }}>
            24h
          </span>
        </div>
      </div>

      {/* Chart */}
      <div data-eid="chart-section" style={{ marginBottom: 30 }}>
        <div
          data-eid="chart-label"
          style={{
            fontSize: 15,
            color: "#b2b8d4",
            marginBottom: 9,
            fontWeight: 400,
            letterSpacing:0.2
          }}
        >
          {data.chartLabel}
        </div>
        <div data-eid="area-chart" style={{ width: "100%", height: 110 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.chartData} margin={{ left: -35, right: 0, top: 13, bottom: 0 }}>
              <defs>
                <linearGradient id="portfoliograd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0.5" stopColor="#43FFD8" stopOpacity={0.33}/>
                  <stop offset="0.97" stopColor="#43FFD8" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false}
                tick={{ fontSize: 14, fill: '#8891ad' }}
                interval={0}
                padding={{left:8,right:8}}
                tickFormatter={v=>v}
              />
              <YAxis hide domain={['dataMin', 'dataMax']} />
              <Tooltip
                contentStyle={{
                  background: "#23243C",
                  border: "none",
                  borderRadius: 7,
                  color: "#fff",
                  fontWeight:'bold',
                  fontSize:15,
                  boxShadow:"0 2px 16px rgba(40,64,200,0.11)",
                  padding: 9
                }}
                labelStyle={{
                  color: "#b2b8d4",
                  fontSize: 12
                }}
                formatter={v=>`$${v.toLocaleString()}`}
                labelFormatter={v=>`${v}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#43FFD8"
                strokeWidth={3}
                fill="url(#portfoliograd)"
                dot={false}
                activeDot={{ r: 6, fill: "#43FFD8", stroke: "#fff", strokeWidth:1.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings Header */}
      <div
        data-eid="holdings-header"
        style={{
          color: "#b2b8d4",
          letterSpacing: 0.8,
          fontSize: 15,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 14,
        }}
      >
        HOLDINGS
      </div>

      {/* Holdings List */}
      {data.holdings.map((coin, idx) => (
        <div
          key={coin.name}
          data-eid={`coin-row-${idx}`}
          style={{
            display:"flex",
            alignItems: "center",
            background: "rgba(35,36,60,0.85)",
            borderRadius: 16,
            marginBottom: 12,
            padding: "18px 18px",
            gap: 15,
            minHeight: 62,
          }}
        >
          {/* Icon */}
          <div
            data-eid={`coin-icon-${idx}`}
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              flexShrink: 0,
              background:
                idx === 0 // Bitcoin
                  ? "linear-gradient(135deg,#FFAA2C 60%,#E38C1A 100%)"
                : idx === 1 // Ethereum
                ? "linear-gradient(135deg,#676AD6 60%,#4D50B4 100%)"
                : idx === 2 // Solana
                ? "linear-gradient(135deg,#9646E5 70%,#7826BC 100%)"
                : idx === 3 // Cardano
                ? "linear-gradient(135deg,#3ED6F5 70%,#2496c7 100%)"
                : "linear-gradient(135deg,#2A5ADA 70%,#18387C 100%)"
            }}
          >
            {coinIcons[coin.name]}
          </div>
          {/* Name */}
          <div
            data-eid={`coin-name-${idx}`}
            style={{
              flex: 2.1,
              color: "#fff",
              fontWeight: 600,
              fontSize: 17,
              minWidth: 70,
              display: 'flex',
              flexDirection: "column"
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 17, marginBottom: 0.5 }}>
              {coin.name}
            </span>
            <span style={{ color: "#b2b8d4", fontSize: 15, fontWeight:500, letterSpacing:0.5 }}>{coin.symbol}</span>
          </div>
          {/* Price */}
          <div
            data-eid={`coin-price-${idx}`}
            style={{
              flex: 2.1,
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "right",
            }}
          >
            {coin.price}
          </div>
          {/* Change */}
          <div
            data-eid={`coin-change-${idx}`}
            style={{
              flex: 1.4,
              textAlign: "right",
              color: coin.change[0] === "-" ? "#FF4040" : "#3AFF7A",
              fontWeight: 700,
              fontSize: 15,
              marginLeft:14
            }}
          >
            {coin.change}
          </div>
          {/* Holdings */}
          <div
            data-eid={`coin-holdings-${idx}`}
            style={{
              flex: 2.2,
              textAlign: "right",
              display:'flex',
              flexDirection:'column',
              alignItems:'flex-end'
            }}
          >
            <div style={{
              fontSize: 16,
              color: "#fff",
              fontWeight: 700,
              marginBottom:1
            }}>
              {coin.holdingValue}
            </div>
            <div style={{
              fontSize: 14.3,
              color: "#b2b8d4",
              fontWeight: 500,
              letterSpacing:0.3
            }}>
              {coin.holdingAmount}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}