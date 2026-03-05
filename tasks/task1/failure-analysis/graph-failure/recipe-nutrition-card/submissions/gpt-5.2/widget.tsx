// submissions/chatgpt/widget.tsx
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Star, Clock, Users } from "lucide-react";
import data from "./data.json";

const fmt = (v: number) => (Number.isFinite(v) ? v : 0);

export default function Widget() {
  const w = 420;
  const cardRadius = 18;

  const chartData = data.macroChart.segments.map((s) => ({
    name: s.label,
    value: s.value,
    color: s.color,
  }));

  const statCardStyle: React.CSSProperties = {
    height: 74,
    borderRadius: 14,
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: 0.6,
    color: "rgba(255,255,255,0.55)",
    textTransform: "uppercase",
    marginTop: 2,
  };

  return (
    <section
      data-eid="root"
      style={{
        width: w,
        borderRadius: cardRadius,
        overflow: "hidden",
        background:
          "radial-gradient(900px 520px at 20% 35%, rgba(63,81,181,0.10), rgba(0,0,0,0) 55%), linear-gradient(180deg, #121a2b 0%, #0f2a4a 100%)",
        color: "#eaf0ff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif',
        boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
      }}
    >
      {/* Hero */}
      <div
        data-eid="hero-image"
        style={{
          height: 136,
          background:
            "linear-gradient(90deg, #ff3b00 0%, #d30000 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 26,
            transform: "translateX(-50%)",
            width: 16,
            height: 40,
            borderRadius: 2,
            border: "2px solid rgba(255,255,255,0.25)",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px 18px" }}>
        <h2
          data-eid="recipe-title"
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "rgba(255,255,255,0.95)",
          }}
        >
          {data.title}
        </h2>

        {/* Rating row */}
        <div
          data-eid="rating-row"
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.75)",
            fontSize: 12.5,
          }}
        >
          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            <span data-eid="star-1" style={{ display: "inline-flex" }}>
              <Star size={14} fill="#FFC83D" color="#FFC83D" />
            </span>
            <span data-eid="star-2" style={{ display: "inline-flex" }}>
              <Star size={14} fill="#FFC83D" color="#FFC83D" />
            </span>
            <span data-eid="star-3" style={{ display: "inline-flex" }}>
              <Star size={14} fill="#FFC83D" color="#FFC83D" />
            </span>
            <span data-eid="star-4" style={{ display: "inline-flex" }}>
              <Star size={14} fill="#FFC83D" color="#FFC83D" />
            </span>
            {/* partial star */}
            <span
              data-eid="star-5"
              style={{ position: "relative", display: "inline-flex" }}
            >
              <Star size={14} fill="none" color="#FFC83D" />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "62%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <Star size={14} fill="#FFC83D" color="#FFC83D" />
              </span>
            </span>
          </div>

          <span data-eid="rating-value" style={{ color: "rgba(255,255,255,0.9)" }}>
            {data.rating.value}
          </span>
          <span data-eid="review-count" style={{ color: "rgba(255,255,255,0.55)" }}>
            {data.rating.reviewsText}
          </span>
        </div>

        {/* Meta row */}
        <div
          data-eid="meta-row"
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "rgba(255,255,255,0.55)",
            fontSize: 12.5,
          }}
        >
          <span data-eid="cook-time" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <Clock size={14} color="rgba(255,255,255,0.45)" />
            <span>{data.meta.cookTime}</span>
          </span>
          <span data-eid="servings" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <Users size={14} color="rgba(255,255,255,0.45)" />
            <span>{data.meta.servings}</span>
          </span>
        </div>

        {/* Nutrition grid */}
        <div
          data-eid="nutrition-grid"
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          <div
            data-eid="stat-calories"
            style={{
              ...statCardStyle,
              borderColor: "rgba(255, 132, 48, 0.20)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#ff7a2f" }}>
              {data.nutrition.calories.value}
            </div>
            <span data-eid="calories-label" style={labelStyle}>
              {data.nutrition.calories.label}
            </span>
          </div>

          <div
            data-eid="stat-protein"
            style={{
              ...statCardStyle,
              borderColor: "rgba(82, 157, 255, 0.22)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#4ea0ff" }}>
              {data.nutrition.protein.value}
            </div>
            <span data-eid="protein-label" style={labelStyle}>
              {data.nutrition.protein.label}
            </span>
          </div>

          <div
            data-eid="stat-carbs"
            style={{
              ...statCardStyle,
              borderColor: "rgba(68, 227, 171, 0.22)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#31d7a2" }}>
              {data.nutrition.carbs.value}
            </div>
            <span data-eid="carbs-label" style={labelStyle}>
              {data.nutrition.carbs.label}
            </span>
          </div>

          <div
            data-eid="stat-fat"
            style={{
              ...statCardStyle,
              borderColor: "rgba(255, 93, 171, 0.22)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#ff5fae" }}>
              {data.nutrition.fat.value}
            </div>
            <span style={labelStyle}>{data.nutrition.fat.label}</span>
          </div>
        </div>

        {/* Ingredients */}
        <div data-eid="ingredients-section" style={{ marginTop: 18 }}>
          <h3
            data-eid="ingredients-title"
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 800,
              color: "rgba(255,255,255,0.80)",
            }}
          >
            {data.ingredients.title}
          </h3>

          <div style={{ marginTop: 10 }}>
            {data.ingredients.items.map((it, idx) => (
              <div
                key={idx}
                data-eid={`ingredient-${idx}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "76px 1fr",
                  gap: 16,
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom:
                    idx === data.ingredients.items.length - 1
                      ? "none"
                      : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 12.5,
                  }}
                >
                  {it.amount}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    color: "rgba(255,255,255,0.92)",
                    fontSize: 13,
                  }}
                >
                  {it.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Macro chart */}
        <div
          data-eid="macro-chart"
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 190, height: 150, position: "relative" }}>
            <PieChart width={190} height={150}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="60%"
                innerRadius={34}
                outerRadius={52}
                startAngle={110}
                endAngle={-250}
                stroke="rgba(0,0,0,0)"
                paddingAngle={1}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div
            data-eid="chart-legend"
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 6,
              color: "rgba(255,255,255,0.55)",
              fontSize: 11.5,
            }}
          >
            {data.macroChart.legend.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: l.color,
                    display: "inline-block",
                  }}
                />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div
          data-eid="tags-row"
          style={{
            marginTop: 14,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span
            data-eid="tag-asian"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(255, 200, 61, 0.12)",
              color: "#FFC83D",
              fontSize: 11.5,
              fontWeight: 700,
            }}
          >
            {data.tags[0]}
          </span>
          <span
            data-eid="tag-quick"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(48, 215, 162, 0.12)",
              color: "#31d7a2",
              fontSize: 11.5,
              fontWeight: 700,
            }}
          >
            {data.tags[1]}
          </span>
          <span
            data-eid="tag-high-protein"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(78, 160, 255, 0.12)",
              color: "#4ea0ff",
              fontSize: 11.5,
              fontWeight: 700,
            }}
          >
            {data.tags[2]}
          </span>
        </div>
      </div>
    </section>
  );
}