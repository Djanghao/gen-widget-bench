import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import data from "./data.json";

const pieColors = [
  "#4746ee", // Housing
  "#f9a825", // Food & Dining
  "#18b082", // Transportation
  "#8930f5", // Savings
  "#56e0e3", // Entertainment
  "#fe53bb", // Healthcare
];

const visibleCategories = data.categories.slice(0, 4);

export default function Widget() {
  // Adjusted for correct pie chart arc
  const pieData = data.categories.map((c, i) => ({
    value: c.value,
    color: pieColors[i],
    name: c.name,
  }));

  return (
    <section
      data-eid="root"
      style={{
        width: 480,
        background: "#141327",
        borderRadius: 24,
        padding: "28px 0 0 0",
        boxSizing: "border-box",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{ padding: "0 36px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg
            width={22}
            height={22}
            viewBox="0 0 20 20"
            style={{ display: "block" }}
          >
            <text
              x="10"
              y="15.3"
              fontSize="18"
              fill="#6454fe"
              fontFamily="inherit"
              textAnchor="middle"
            >
              $
            </text>
          </svg>
          <div
            data-eid="month-label"
            style={{
              fontWeight: 700,
              fontSize: 24,
              color: "white",
              letterSpacing: 0.2,
              marginBottom: 1,
            }}
          >
            {data.month}
          </div>
        </div>
        <div
          data-eid="budget-total"
          style={{
            color: "#b3b0c8",
            fontSize: 16,
            margin: "2px 0 0 2px",
          }}
        >
          Total Budget: {data.total}
        </div>
        <div style={{ lineHeight: "21px", marginTop: 4, marginBottom: 2 }}>
          <span
            data-eid="spent-amount"
            style={{ color: "#ff4757", fontWeight: 700, fontSize: 17 }}
          >
            Spent: {data.spent}
          </span>
          <span style={{ margin: "0 7px" }} />
          <span
            data-eid="remaining-amount"
            style={{
              color: "#27c46b",
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            Left: {data.left}
          </span>
        </div>
      </div>
      {/* Progress */}
      <div data-eid="progress-section" style={{ padding: "4px 36px" }}>
        <div style={{ fontSize: 13.5, color: "#b3b0c8", marginBottom: 3 }}>
          Overall Spending
          <span style={{ float: "right", color: "#ff4757", fontWeight: 600 }} data-eid="progress-label">
            {data.progress}
          </span>
        </div>
        <div
          data-eid="progress-bar-bg"
          style={{
            height: 8,
            background: "#292840",
            borderRadius: 10,
            width: "100%",
            marginTop: 2,
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            data-eid="progress-bar-fill"
            style={{
              width: data.progressBarFill,
              height: 8,
              background: "#ff4757",
              borderRadius: 8,
              transition: "width .3s",
            }}
          />
        </div>
      </div>
      {/* Chart */}
      <div
        data-eid="chart-section"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div data-eid="pie-chart" style={{ margin: "0 auto" }}>
          <PieChart width={245} height={120}>
            <Pie
              data={pieData}
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              startAngle={215}
              endAngle={-35}
              cx={120}
              cy={100}
              stroke="none"
              isAnimationActive={false}
              paddingAngle={2}
            >
              {pieData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={pieColors[i]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      {/* Category List */}
      <div
        data-eid="category-list"
        style={{
          padding: "20px 0 30px 0",
          maxWidth: "440px",
          margin: "0 auto",
        }}
      >
        {/* Only show 4 categories as in the target */}
        {visibleCategories.map((cat, i) => (
          <div
            key={i}
            data-eid={`category-row-${i}`}
            style={{
              background: "#212137",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              marginBottom: i !== visibleCategories.length - 1 ? 12 : 0,
              minHeight: 40,
            }}
          >
            <span
              data-eid={`category-dot-${i}`}
              style={{
                display: "inline-block",
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: pieColors[i],
                marginRight: 14,
                marginLeft: 2,
              }}
            />
            <span
              data-eid={`category-name-${i}`}
              style={{
                color: "#e9e8f5",
                fontSize: 17,
                fontWeight: 500,
                minWidth: 0,
                flex: "1 1 auto",
                lineHeight: "22px",
                letterSpacing: 0.02,
                whiteSpace: "nowrap",
              }}
            >
              {cat.name}
            </span>
            <span style={{ flexBasis: 0, flexGrow: 9999 }} />
            <span
              data-eid={`category-amount-${i}`}
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 800,
                marginRight: 15,
                letterSpacing: "0.03em",
              }}
            >
              {cat.amount}
            </span>
            <span
              data-eid={`category-pct-${i}`}
              style={{
                color: "#b3b0c8",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "0.05em",
                minWidth: 38,
                textAlign: "right",
              }}
            >
              {cat.percent}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}