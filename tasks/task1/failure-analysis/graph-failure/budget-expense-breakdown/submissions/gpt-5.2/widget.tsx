// submissions/chatgpt/widget.tsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import data from "./data.json";

export default function Widget() {
  const spentPct = useMemo(() => {
    if (!data.totalBudget) return 0;
    return Math.round((data.spent / data.totalBudget) * 100);
  }, []);

  const chartData = data.categories.map((c) => ({
    name: c.name,
    value: c.amount,
    color: c.color,
  }));

  return (
    <section
      data-eid="root"
      style={{
        width: 460,
        height: 560,
        borderRadius: 22,
        padding: 22,
        boxSizing: "border-box",
        color: "#E9ECFF",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        background:
          "radial-gradient(120% 120% at 20% 15%, #1a1c3a 0%, #111327 35%, #0b0d1a 100%)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              color: "#6C74FF",
              fontSize: 22,
              fontWeight: 700,
              lineHeight: "22px",
              transform: "translateY(-1px)",
            }}
          >
            $
          </div>
          <div
            data-eid="month-label"
            style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}
          >
            {data.month}
          </div>
        </div>

        <div
          data-eid="budget-total"
          style={{ color: "rgba(233,236,255,0.65)", fontSize: 12 }}
        >
          Total Budget:{" "}
          <span style={{ color: "rgba(233,236,255,0.75)" }}>
            {data.totalBudgetFormatted}
          </span>
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 18, fontSize: 13 }}>
          <span
            data-eid="spent-amount"
            style={{ color: "#FF5B61", fontWeight: 700 }}
          >
            Spent: {data.spentFormatted}
          </span>
          <span
            data-eid="remaining-amount"
            style={{ color: "#2CF58A", fontWeight: 700 }}
          >
            Left: {data.remainingFormatted}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div data-eid="progress-section" style={{ marginTop: 22 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ color: "rgba(233,236,255,0.55)", fontSize: 12 }}>
            Overall Spending
          </div>
          <div
            data-eid="progress-label"
            style={{ color: "#FF5B61", fontWeight: 700, fontSize: 13 }}
          >
            {spentPct}%
          </div>
        </div>

        <div
          data-eid="progress-bar-bg"
          style={{
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
            overflow: "hidden",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div
            data-eid="progress-bar-fill"
            style={{
              height: "100%",
              width: `${Math.min(100, Math.max(0, spentPct))}%`,
              borderRadius: 999,
              background: "linear-gradient(90deg, #FF5B61 0%, #FF3D48 100%)",
            }}
          />
        </div>
      </div>

      {/* Chart */}
      <div
        data-eid="chart-section"
        style={{
          marginTop: 18,
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div data-eid="pie-chart" style={{ width: 260, height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="55%"
                innerRadius={55}
                outerRadius={95}
                startAngle={90}
                endAngle={-270}
                stroke="rgba(0,0,0,0.55)"
                strokeWidth={2}
                paddingAngle={0}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category list */}
      <div data-eid="category-list" style={{ marginTop: 6 }}>
        {data.categories.map((c, i) => (
          <div
            key={c.name}
            data-eid={`category-row-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              borderRadius: 12,
              marginBottom: 10,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 18px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                data-eid={`category-dot-${i}`}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: c.color,
                  boxShadow: "0 0 0 3px rgba(255,255,255,0.02)",
                }}
              />
              <span
                data-eid={`category-name-${i}`}
                style={{ fontSize: 14, color: "rgba(233,236,255,0.92)" }}
              >
                {c.name}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
              <span
                data-eid={`category-amount-${i}`}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "rgba(233,236,255,0.92)",
                  minWidth: 88,
                  textAlign: "right",
                }}
              >
                {c.amountFormatted}
              </span>
              <span
                data-eid={`category-pct-${i}`}
                style={{
                  fontSize: 12,
                  color: "rgba(233,236,255,0.45)",
                  width: 34,
                  textAlign: "right",
                }}
              >
                {c.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}