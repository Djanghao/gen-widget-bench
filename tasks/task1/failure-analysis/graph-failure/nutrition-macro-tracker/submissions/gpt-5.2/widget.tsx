// submissions/frontend-developer/widget.tsx
import React from "react";
import { RadialBarChart, RadialBar } from "recharts";
import { Apple, Coffee, UtensilsCrossed, Soup, Cookie, Droplet } from "lucide-react";
import data from "./data.json";

function Ring({
  percent,
  color,
  label,
  valueText,
  eidContainer,
  eidChart,
  eidLabel,
}: {
  percent: number;
  color: string;
  label: string;
  valueText: string;
  eidContainer: string;
  eidChart: string;
  eidLabel: string;
}) {
  const chartData = [{ name: label, value: percent }];

  return (
    <div
      data-eid={eidContainer}
      style={{
        width: 124,
        height: 124,
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 8,
      }}
    >
      <div
        data-eid={eidChart}
        style={{
          width: 92,
          height: 74,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <RadialBarChart
          width={92}
          height={92}
          cx={46}
          cy={46}
          innerRadius={30}
          outerRadius={41}
          barSize={9}
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            fill={color}
            background={{ fill: "rgba(255,255,255,0.08)" }}
          />
        </RadialBarChart>
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 12,
            color: color,
            fontWeight: 700,
            letterSpacing: 0.2,
          }}
        >
          {percent}%
        </div>
      </div>

      <div
        data-eid={eidLabel}
        style={{
          marginTop: 2,
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color }}>{label}</div>
        <div style={{ fontSize: 11, color: "rgba(230,235,255,0.65)", marginTop: 3 }}>
          {valueText}
        </div>
      </div>
    </div>
  );
}

function MealRow({
  icon,
  title,
  macros,
  caloriesText,
  eidRow,
  eidCals,
}: {
  icon: React.ReactNode;
  title: string;
  macros: string;
  caloriesText: string;
  eidRow: string;
  eidCals: string;
}) {
  return (
    <div
      data-eid={eidRow}
      style={{
        height: 52,
        borderRadius: 12,
        background: "rgba(255,255,255,0.035)",
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ width: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div style={{ flex: 1, marginLeft: 10 }}>
        <div style={{ fontSize: 13, color: "rgba(240,245,255,0.92)", fontWeight: 700 }}>
          {title}
        </div>
        <div style={{ marginTop: 2, fontSize: 10, color: "rgba(210,220,245,0.45)" }}>{macros}</div>
      </div>
      <span
        data-eid={eidCals}
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: "#2fe6aa",
          letterSpacing: 0.2,
        }}
      >
        {caloriesText}
      </span>
    </div>
  );
}

export default function Widget() {
  const bg = "radial-gradient(900px 520px at 40% 0%, rgba(124,92,255,0.14), transparent 60%), linear-gradient(180deg, #0f1327 0%, #0b1023 100%)";

  return (
    <section
      data-eid="root"
      style={{
        width: 440,
        height: 691,
        borderRadius: 28,
        background: bg,
        color: "rgba(240,245,255,0.92)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        position: "relative",
        overflow: "hidden",
        padding: 22,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="header-icon" style={{ display: "inline-flex", alignItems: "center" }}>
            <Apple size={18} color="#2fe6aa" />
          </span>
          <span
            data-eid="header-title"
            style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.2 }}
          >
            {data.header.title}
          </span>
        </div>
        <span
          data-eid="header-date"
          style={{ fontSize: 12, color: "rgba(210,220,245,0.45)" }}
        >
          {data.header.date}
        </span>
      </div>

      {/* Calories */}
      <div
        data-eid="calories-section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            data-eid="calories-consumed"
            style={{ fontSize: 38, fontWeight: 900, color: "#2fe6aa", letterSpacing: 0.5 }}
          >
            {data.calories.consumed}
          </span>
          <span
            data-eid="calories-separator"
            style={{ fontSize: 18, color: "rgba(210,220,245,0.45)", fontWeight: 800 }}
          >
            /
          </span>
          <span
            data-eid="calories-goal"
            style={{ fontSize: 18, color: "rgba(210,220,245,0.45)", fontWeight: 800 }}
          >
            {data.calories.goal}
          </span>
        </div>
        <div
          data-eid="calories-label"
          style={{ marginTop: 6, fontSize: 12, color: "rgba(210,220,245,0.45)" }}
        >
          Calories
        </div>
      </div>

      {/* Macros */}
      <div
        data-eid="macros-row"
        style={{
          display: "flex",
          gap: 14,
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <Ring
          percent={data.macros.protein.percent}
          color={data.macros.protein.color}
          label="Protein"
          valueText={data.macros.protein.valueText}
          eidContainer="macro-protein"
          eidChart="macro-protein-chart"
          eidLabel="macro-protein-label"
        />
        <Ring
          percent={data.macros.carbs.percent}
          color={data.macros.carbs.color}
          label="Carbs"
          valueText={data.macros.carbs.valueText}
          eidContainer="macro-carbs"
          eidChart="macro-carbs-chart"
          eidLabel="macro-carbs-label"
        />
        <Ring
          percent={data.macros.fat.percent}
          color={data.macros.fat.color}
          label="Fat"
          valueText={data.macros.fat.valueText}
          eidContainer="macro-fat"
          eidChart="macro-fat-chart"
          eidLabel="macro-fat-label"
        />
      </div>

      {/* Meals */}
      <div data-eid="meals-section" style={{ marginTop: 6 }}>
        <div
          data-eid="meals-title"
          style={{
            fontSize: 12,
            letterSpacing: 1.2,
            fontWeight: 900,
            color: "rgba(210,220,245,0.42)",
            marginBottom: 10,
          }}
        >
          MEALS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MealRow
            eidRow="meal-breakfast"
            eidCals="meal-breakfast-cals"
            icon={<Coffee size={16} color="rgba(210,220,245,0.5)" />}
            title="Breakfast"
            macros="P: 28g • C: 48g • F: 14g"
            caloriesText={data.meals.breakfast.caloriesText}
          />
          <MealRow
            eidRow="meal-lunch"
            eidCals="meal-lunch-cals"
            icon={<UtensilsCrossed size={16} color="rgba(210,220,245,0.5)" />}
            title="Lunch"
            macros="P: 42g • C: 71g • F: 22g"
            caloriesText={data.meals.lunch.caloriesText}
          />
          <MealRow
            eidRow="meal-dinner"
            eidCals="meal-dinner-cals"
            icon={<Soup size={16} color="rgba(210,220,245,0.5)" />}
            title="Dinner"
            macros="P: 38g • C: 62g • F: 21g"
            caloriesText={data.meals.dinner.caloriesText}
          />
          <MealRow
            eidRow="meal-snacks"
            eidCals="meal-snacks-cals"
            icon={<Cookie size={16} color="rgba(210,220,245,0.5)" />}
            title="Snacks"
            macros="P: 16g • C: 22g • F: 11g"
            caloriesText={data.meals.snacks.caloriesText}
          />
        </div>
      </div>

      {/* Water */}
      <div data-eid="water-section" style={{ marginTop: 18 }}>
        <div
          data-eid="water-title"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            letterSpacing: 1.2,
            fontWeight: 900,
            color: "rgba(120,210,255,0.85)",
            marginBottom: 10,
          }}
        >
          <Droplet size={14} color="#22b7ff" />
          WATER (5/8 CUPS)
        </div>

        <div data-eid="water-cups" style={{ display: "flex", gap: 8 }}>
          {data.water.cups.map((filled: boolean, i: number) => {
            const eid = (`water-cup-${i}` as const) as any;
            return (
              <span
                key={i}
                data-eid={eid}
                style={{
                  width: 34,
                  height: 30,
                  borderRadius: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: filled ? "2px solid rgba(34,183,255,0.95)" : "2px solid rgba(255,255,255,0.10)",
                  background: filled ? "rgba(34,183,255,0.10)" : "rgba(255,255,255,0.03)",
                  boxShadow: filled ? "inset 0 0 0 1px rgba(0,0,0,0.18)" : "inset 0 1px 0 rgba(255,255,255,0.02)",
                }}
              >
                {filled ? <Droplet size={14} color="#22b7ff" /> : null}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}