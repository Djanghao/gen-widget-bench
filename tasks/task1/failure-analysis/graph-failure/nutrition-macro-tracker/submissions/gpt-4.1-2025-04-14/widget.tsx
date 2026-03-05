import React from "react";
import data from "./data.json";
import { RadialBarChart, RadialBar } from "recharts";
import { Apple, Calendar, UtensilsCrossed, Drumstick, Cookie, Droplet } from "lucide-react";

const ringSize = 94;
const ringThickness = 10;
const ringBg = "#222943";

const macroConfigs = [
  {
    dataKey: "protein",
    color: "#B383FF",
    ringBg: ringBg,
    labelColor: "#B383FF",
  },
  {
    dataKey: "carbs",
    color: "#FDB900",
    ringBg: ringBg,
    labelColor: "#FDB900",
  },
  {
    dataKey: "fat",
    color: "#FF5698",
    ringBg: ringBg,
    labelColor: "#FF5698",
  },
];

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 480,
        padding: 32,
        borderRadius: 28,
        background: "#171e36",
        margin: "0 auto",
        fontFamily: "Inter, Arial, sans-serif",
        color: "white",
        position: "relative",
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
          marginBottom: 23,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span data-eid="header-icon" style={{ color: "#7EFFAA", marginRight: 9 }}>
            <Apple size={22} strokeWidth={2.2} />
          </span>
          <span
            data-eid="header-title"
            style={{ fontWeight: 600, fontSize: 21, letterSpacing: 0.1 }}
          >
            Nutrition
          </span>
        </div>
        <span
          data-eid="header-date"
          style={{
            fontSize: 15,
            color: "#8A98B8",
            fontWeight: 400,
          }}
        >
          Monday, Feb 24
        </span>
      </div>
      
      {/* Calories */}
      <div
        data-eid="calories-section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 23,
        }}
      >
        <div style={{ fontSize: 39, fontWeight: 700, marginBottom: 2, letterSpacing: 0.5 }}>
          <span data-eid="calories-consumed" style={{ color: "#32F58C" }}>
            1,847
          </span>
          <span data-eid="calories-separator" style={{ color: "#707793", fontWeight: 500 }}>
            / 
          </span>
          <span data-eid="calories-goal" style={{ color: "#707793", fontWeight: 500 }}>
            2,200
          </span>
        </div>
        <div
          data-eid="calories-label"
          style={{
            color: "#707793",
            fontSize: 16,
            fontWeight: 400,
            marginTop: 1,
            letterSpacing: 0.4,
          }}
        >
          Calories
        </div>
      </div>
      
      {/* Macronutrients */}
      <div
        data-eid="macros-row"
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "space-between",
          marginBottom: 34,
        }}
      >
        {/* Protein */}
        <div
          data-eid="macro-protein"
          style={{
            width: 146,
            background: "#21274B",
            borderRadius: 18,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div data-eid="macro-protein-chart" style={{ marginBottom: 3 }}>
            <RadialBarChart
              width={ringSize}
              height={ringSize}
              innerRadius={ringSize / 2 - ringThickness}
              outerRadius={ringSize / 2}
              barSize={ringThickness}
              data={[{ value: data.macros.protein.percent }, { value: 100 }]}
              startAngle={90}
              endAngle={-270}
              style={{ background: "transparent" }}
            >
              {/* Track */}
              <RadialBar
                cornerRadius={ringThickness / 2}
                clockWise
                dataKey="value"
                fill={ringBg}
                background
              />
              {/* Ring */}
              <RadialBar
                minAngle={15}
                clockWise
                cornerRadius={ringThickness / 2}
                dataKey="value"
                fill={macroConfigs[0].color}
                data={[{ value: data.macros.protein.percent }]}
              />
            </RadialBarChart>
            <div style={{
              position: "absolute",
              width: ringSize,
              height: ringSize,
              top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontWeight: 700,
                fontSize: 18,
                color: macroConfigs[0].labelColor,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-56%)",
                width: "100%",
                textAlign: "center",
              }}>{data.macros.protein.percent}%</span>
            </div>
          </div>
          <div data-eid="macro-protein-label" style={{ textAlign: "center" }}>
            <div style={{ color: macroConfigs[0].labelColor, fontWeight: 600, fontSize: 15, marginTop: -4 }}>
              Protein
            </div>
            <div style={{ color: "#A6AFF2", fontSize: 14, marginTop: 2 }}>
              {data.macros.protein.value}/{data.macros.protein.goal}g
            </div>
          </div>
        </div>
        
        {/* Carbs */}
        <div
          data-eid="macro-carbs"
          style={{
            width: 146,
            background: "#21274B",
            borderRadius: 18,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div data-eid="macro-carbs-chart" style={{ marginBottom: 3 }}>
            <RadialBarChart
              width={ringSize}
              height={ringSize}
              innerRadius={ringSize / 2 - ringThickness}
              outerRadius={ringSize / 2}
              barSize={ringThickness}
              data={[{ value: data.macros.carbs.percent }, { value: 100 }]}
              startAngle={90}
              endAngle={-270}
              style={{ background: "transparent" }}
            >
              {/* Track */}
              <RadialBar
                cornerRadius={ringThickness / 2}
                clockWise
                dataKey="value"
                fill={ringBg}
                background
              />
              {/* Ring */}
              <RadialBar
                minAngle={15}
                clockWise
                cornerRadius={ringThickness / 2}
                dataKey="value"
                fill={macroConfigs[1].color}
                data={[{ value: data.macros.carbs.percent }]}
              />
            </RadialBarChart>
            <div style={{
              position: "absolute",
              width: ringSize,
              height: ringSize,
              top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontWeight: 700,
                fontSize: 18,
                color: macroConfigs[1].labelColor,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-56%)",
                width: "100%",
                textAlign: "center",
              }}>{data.macros.carbs.percent}%</span>
            </div>
          </div>
          <div data-eid="macro-carbs-label" style={{ textAlign: "center" }}>
            <div style={{ color: macroConfigs[1].labelColor, fontWeight: 600, fontSize: 15, marginTop: -4 }}>
              Carbs
            </div>
            <div style={{ color: "#F2DCA6", fontSize: 14, marginTop: 2 }}>
              {data.macros.carbs.value}/{data.macros.carbs.goal}g
            </div>
          </div>
        </div>
        
        {/* Fat */}
        <div
          data-eid="macro-fat"
          style={{
            width: 146,
            background: "#21274B",
            borderRadius: 18,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div data-eid="macro-fat-chart" style={{ marginBottom: 3 }}>
            <RadialBarChart
              width={ringSize}
              height={ringSize}
              innerRadius={ringSize / 2 - ringThickness}
              outerRadius={ringSize / 2}
              barSize={ringThickness}
              data={[{ value: data.macros.fat.percent }, { value: 100 }]}
              startAngle={90}
              endAngle={-270}
              style={{ background: "transparent" }}
            >
              {/* Track */}
              <RadialBar
                cornerRadius={ringThickness / 2}
                clockWise
                dataKey="value"
                fill={ringBg}
                background
              />
              {/* Ring */}
              <RadialBar
                minAngle={15}
                clockWise
                cornerRadius={ringThickness / 2}
                dataKey="value"
                fill={macroConfigs[2].color}
                data={[{ value: data.macros.fat.percent }]}
              />
            </RadialBarChart>
            <div style={{
              position: "absolute",
              width: ringSize,
              height: ringSize,
              top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontWeight: 700,
                fontSize: 18,
                color: macroConfigs[2].labelColor,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-56%)",
                width: "100%",
                textAlign: "center",
              }}>{data.macros.fat.percent}%</span>
            </div>
          </div>
          <div data-eid="macro-fat-label" style={{ textAlign: "center" }}>
            <div style={{ color: macroConfigs[2].labelColor, fontWeight: 600, fontSize: 15, marginTop: -4 }}>
              Fat
            </div>
            <div style={{ color: "#F2A6C8", fontSize: 14, marginTop: 2 }}>
              {data.macros.fat.value}/{data.macros.fat.goal}g
            </div>
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div data-eid="meals-section" style={{ marginBottom: 24 }}>
        <div
          data-eid="meals-title"
          style={{
            color: "#737E97",
            fontWeight: 700,
            fontSize: 15,
            marginBottom: 5,
            letterSpacing: 0.5,
          }}
        >
          MEALS
        </div>
        {/* Breakfast */}
        <div
          data-eid="meal-breakfast"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 0 12px 0",
            borderRadius: 12,
            background: "#1B2241",
            marginBottom: 11,
          }}
        >
          <span style={{ width: 38, display: "flex", justifyContent: "center", color: "#8EA3B9" }}>
            <Calendar size={19} strokeWidth={1.7} />
          </span>
          <div style={{ flex: 1 }}>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>
              Breakfast
            </span>
            <div style={{ color: "#7b889e", fontSize: 13, marginTop: 2 }}>
              P: 28g · C: 48g · F: 14g
            </div>
          </div>
          <span
            data-eid="meal-breakfast-cals"
            style={{
              color: "#32F58C",
              fontWeight: 600,
              fontSize: 17,
              marginRight: 18,
              letterSpacing: 0.1,
            }}
          >
            412 cal
          </span>
        </div>
        {/* Lunch */}
        <div
          data-eid="meal-lunch"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 0 12px 0",
            borderRadius: 12,
            background: "#1B2241",
            marginBottom: 11,
          }}
        >
          <span style={{ width: 38, display: "flex", justifyContent: "center", color: "#8EA3B9" }}>
            <UtensilsCrossed size={19} strokeWidth={1.7} />
          </span>
          <div style={{ flex: 1 }}>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>
              Lunch
            </span>
            <div style={{ color: "#7b889e", fontSize: 13, marginTop: 2 }}>
              P: 42g · C: 71g · F: 22g
            </div>
          </div>
          <span
            data-eid="meal-lunch-cals"
            style={{
              color: "#32F58C",
              fontWeight: 600,
              fontSize: 17,
              marginRight: 18,
              letterSpacing: 0.1,
            }}
          >
            623 cal
          </span>
        </div>
        {/* Dinner */}
        <div
          data-eid="meal-dinner"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 0 12px 0",
            borderRadius: 12,
            background: "#1B2241",
            marginBottom: 11,
          }}
        >
          <span style={{ width: 38, display: "flex", justifyContent: "center", color: "#8EA3B9" }}>
            <Drumstick size={19} strokeWidth={1.7} />
          </span>
          <div style={{ flex: 1 }}>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>
              Dinner
            </span>
            <div style={{ color: "#7b889e", fontSize: 13, marginTop: 2 }}>
              P: 38g · C: 62g · F: 21g
            </div>
          </div>
          <span
            data-eid="meal-dinner-cals"
            style={{
              color: "#32F5B8",
              fontWeight: 600,
              fontSize: 17,
              marginRight: 18,
              letterSpacing: 0.1,
              // Actually: 584 cal is GREEN, but shade slightly different than others
              // #32F58C for other cals. We'll use #32F58C.
              color: "#32F58C"
            }}
          >
            584 cal
          </span>
        </div>
        {/* Snacks */}
        <div
          data-eid="meal-snacks"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 0 12px 0",
            borderRadius: 12,
            background: "#1B2241",
            marginBottom: 0,
          }}
        >
          <span style={{ width: 38, display: "flex", justifyContent: "center", color: "#8EA3B9" }}>
            <Cookie size={19} strokeWidth={1.7} />
          </span>
          <div style={{ flex: 1 }}>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>
              Snacks
            </span>
            <div style={{ color: "#7b889e", fontSize: 13, marginTop: 2 }}>
              P: 16g · C: 22g · F: 11g
            </div>
          </div>
          <span
            data-eid="meal-snacks-cals"
            style={{
              color: "#32F58C",
              fontWeight: 600,
              fontSize: 17,
              marginRight: 18,
              letterSpacing: 0.1,
            }}
          >
            228 cal
          </span>
        </div>
      </div>

      {/* Water Section */}
      <div data-eid="water-section" style={{}}>
        <div
          data-eid="water-title"
          style={{
            fontWeight: 700,
            color: "#4d5fa9",
            fontSize: 15,
            marginBottom: 8,
            letterSpacing: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <Droplet size={16} color="#41b4ef" style={{ marginRight: 1, marginTop: 2 }} />
          WATER (5/8 CUPS)
        </div>
        <div
          data-eid="water-cups"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingTop: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 2,
          }}
        >
          {Array.from({ length: 8 }, (_, idx) => {
            const eid = `water-cup-${idx}`;
            // filled: cups 0..4
            const filled = idx < 5;
            return (
              <span
                key={eid}
                data-eid={eid}
                style={{
                  display: "inline-flex",
                  width: 24,
                  height: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  background: filled ? "#41b4ef" : "transparent",
                  border: "2px solid #41b4ef",
                  borderRadius: 6,
                  opacity: filled ? 1 : 0.22,
                  marginRight: idx === 7 ? 0 : 0,
                  transition: "all 200ms",
                  position: "relative"
                }}
              >
                <Droplet size={16} color={filled ? "#fff" : "#41b4ef"} fill={filled ? "#fff" : "none"} />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}