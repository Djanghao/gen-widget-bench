import React from "react";
import data from "./data.json";
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";

const categoryColors: any = {
  alkali: "#c74444",
  alkaline: "#e0a949",
  transition: "#e3bc32",
  "post-transition": "#22c0a8",
  metalloid: "#35b9c9",
};

const elementBg = (cat: string, selected=false) => {
  const border = selected
    ? `2px solid ${categoryColors[cat] || "#444"}`
    : `1.5px solid ${categoryColors[cat] || "#444"}`;
  return {
    background: "rgba(19,32,47,0.65)",
    borderRadius: 12,
    border,
    boxSizing: "border-box",
    margin: 8,
    padding: 0,
    width: 110,
    height: 98,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    transition: "box-shadow 0.2s",
    boxShadow: selected
      ? `0 0 8px 2px ${categoryColors[cat]+'88'}`
      : "none",
  };
};

const badgeStyle = (color: string) => ({
  padding: "4px 16px",
  borderRadius: "8px",
  background: color,
  color: color === "#e0a949" || color === "#e3bc32" ? "#222" : "#fff",
  fontWeight: 700 as const,
  fontSize: 16,
  marginLeft: 12,
  marginBottom: 0,
  letterSpacing: 0.25,
  display: "inline-block",
  boxShadow: "0 1px 2px 0 #1112",
});

const headerBadgeStyle = (color: string) => ({
  ...badgeStyle(color),
  fontSize: 15,
  padding: "4.5px 13px"
});

const legendDot = (col: string) => ({
  display: "inline-block",
  width: 14,
  height: 14,
  marginRight: 7,
  borderRadius: 6,
  background: col,
  verticalAlign: "middle"
});

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gap: "4px",
  marginBottom: 20,
};

const mainBg =
  "linear-gradient(139deg, #21293c 55%, #1b262a 100%)";

export default function Widget() {
  // only Iron (Fe) is selected/expanded in this mock
  const selectedIdx = data.elements.findIndex((el: any) => el.symbol === "Fe");
  return (
    <section
      data-eid="root"
      style={{
        width: 540,
        margin: "0 auto",
        borderRadius: 24,
        background: mainBg,
        minHeight: 900,
        boxShadow: "1px 2.5px 30px 3px #0a0a2060",
        padding: 0,
        position: "relative",
        overflow: "visible"
      }}
    >
      <header
        data-eid="header"
        style={{
          padding: "24px 0 6px 24px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-end"
        }}
      >
        <div
          data-eid="title"
          style={{
            fontWeight: 700,
            fontSize: 30,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            lineHeight: "38px",
            paddingRight: 18,
            display: "flex",
            alignItems: "center"
          }}
        >
          <svg style={{marginRight: 10, marginTop: 2}} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><rect width="7.7" height="7.7" x="3" y="3" stroke="#949fc9" strokeWidth="2" rx="2.35"/><rect width="7.7" height="7.7" x="17.5" y="3" stroke="#949fc9" strokeWidth="2" rx="2.35"/><rect width="7.7" height="7.7" x="3" y="17.5" stroke="#949fc9" strokeWidth="2" rx="2.35"/><rect width="7.7" height="7.7" x="17.5" y="17.5" stroke="#949fc9" strokeWidth="2" rx="2.35"/></svg>
          {data.title}
        </div>
        <span data-eid="filter-alkali" style={headerBadgeStyle("#c74444")}>Alkali Metal</span>
        <span data-eid="filter-alkaline" style={headerBadgeStyle("#e0a949")}>Alkaline Earth</span>
        <span data-eid="filter-transition" style={headerBadgeStyle("#e3bc32")}>Transition Metal</span>
        <span data-eid="filter-post-transition" style={headerBadgeStyle("#22c0a8")}>Post-Transition</span>
        <span style={{flexBasis: "100%", height: 9}}></span>
        <span
          data-eid="filter-post-transition"
          style={{
            ...badgeStyle("#22c0a8"),
            fontSize: 16,
            marginLeft: 0,
            marginTop: 2,
            marginBottom: 0,
            padding: "3.5px 14px",
            color: "#fff",
          }}
        >
          Post-Transition
        </span>
      </header>

      <div data-eid="elements-grid" style={{ ...gridStyle, padding: 6, marginLeft: 10 }}>
        {data.elements.map((el: any, idx: number) => {
          const eid = `el-${idx}`;
          const selected = idx === selectedIdx;
          return (
            <div
              key={el.symbol}
              data-eid={eid}
              style={elementBg(el.category, selected)}
            >
              <span
                data-eid={`${eid}-number`}
                style={{
                  fontSize: 15,
                  color: "#bfc8cc",
                  fontWeight: 500,
                  marginTop: 7,
                  marginLeft: 9
                }}
              >
                {el.number}
              </span>
              <span
                data-eid={`${eid}-symbol`}
                style={{
                  fontWeight: 700,
                  fontSize: 32,
                  color: "#fff",
                  marginLeft: 9,
                  marginTop: -7,
                  marginBottom: 0,
                  letterSpacing: 0.6,
                  ...(
                    selected
                      ? {textShadow: `0 0 0.5px ${categoryColors[el.category]}, 0 1px 9px ${categoryColors[el.category]}42`}
                      : {}
                  )
                }}
              >
                {el.symbol}
              </span>
              <span
                data-eid={`${eid}-name`}
                style={{
                  fontSize: 14.2,
                  marginLeft: 9,
                  marginBottom: 2,
                  color: "#abb7ba"
                }}
              >
                {el.name}
              </span>
              <span
                data-eid={`${eid}-mass`}
                style={{
                  fontSize: 13.5,
                  marginLeft: 9,
                  marginBottom: 8,
                  color: "#7e8a93"
                }}
              >
                {el.mass}
              </span>
            </div>
          );
        })}
      </div>
      {/* Detail card */}
      <div
        data-eid="detail-card"
        style={{
          margin: "12px 0 0 0",
          background: "linear-gradient(99deg,#333418 70%,#282912 120%)",
          borderRadius: 17,
          color: "#fbeedd",
          padding: "22px 36px 18px 23px",
          maxWidth: 490,
          boxShadow: `0 0 0 3px #3c3900 inset, 0 2px 10px #14120822`,
          marginLeft: 19,
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <div
            data-eid="detail-symbol"
            style={{
              background: "#3c3900",
              borderRadius: 12,
              width: 60,
              height: 60,
              marginRight: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 34,
              color: "#e3bc32",
              border: "2.7px solid #e3bc32",
              textAlign: "center"
            }}
          >
            {data.selected.symbol}
          </div>
          <div>
            <div
              data-eid="detail-name"
              style={{
                fontWeight: 700,
                fontSize: 24,
                color: "#fff",
                marginBottom: 4,
                marginTop: 2,
                marginLeft: 0,
                letterSpacing: 0.1
              }}
            >{data.selected.name}</div>
            <div>
              <span
                data-eid="detail-number"
                style={{
                  fontSize: 16,
                  marginRight: 15,
                  color: "#fbeedd"
                }}
              >Atomic Number: {data.selected.number}</span>
              <span
                data-eid="detail-mass"
                style={{
                  fontSize: 16,
                  color: "#fbeedd"
                }}>
                Atomic Mass: {data.selected.mass}
              </span>
            </div>
            <span data-eid="detail-category"
              style={{
                ...badgeStyle("#e3bc32"),
                color: "#222",
                fontWeight: 700,
                padding: "3.5px 15px",
                marginLeft: 0,
                fontSize: 15,
                marginTop: 9,
                marginBottom: 0,
                display: 'inline-block'
              }}
            >Transition Metal</span>
          </div>
        </div>
        <div data-eid="detail-electron-config" style={{
          fontFamily: "monospace",
          fontSize: 14.1,
          marginLeft: 2,
          marginTop: 15,
          color:"#eeeecc"
        }}>
          e- config: {data.selected.electronConfig}
        </div>
        <div data-eid="detail-period-group" style={{
          marginTop: 7,
          fontSize: 15,
          color: "#fbeedd",
          marginLeft: 2,
          fontWeight: 500
        }}>
          Period {data.selected.period}, Group {data.selected.group}
        </div>
        <div
          data-eid="detail-props"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "5px 28px",
            marginTop: 13,
            marginBottom: -3
          }}
        >
          <div data-eid="detail-melting" style={{fontSize:15,fontWeight:500,color:"#fee655"}}>Melting point: <span style={{color: "#fcf8d2"}}>{data.selected.melting}</span></div>
          <div data-eid="detail-boiling" style={{fontSize:15,fontWeight:500,color:"#fea463"}}>Boiling point: <span style={{color: "#fcf8d2"}}>{data.selected.boiling}</span></div>
          <div data-eid="detail-density" style={{fontSize:15,fontWeight:500,color:"#4ff6cb"}}>Density: <span style={{color: "#fcf8d2"}}>{data.selected.density}</span></div>
          <div data-eid="detail-electronegativity" style={{fontSize:15,fontWeight:500,color:"#86c7ff"}}>Electronegativity: <span style={{color: "#fcf8d2"}}>{data.selected.electronegativity}</span></div>
        </div>
      </div>

      {/* Chart */}
      <div data-eid="comparison-chart"
        style={{
          marginLeft: 19,
          marginTop: 24,
          background: "linear-gradient(89deg, #21293c 70%, #1b262a 120%)",
          borderRadius: 13,
          padding: "17px 27px 13px 17px",
          width: 346,
          boxShadow: "0 1px 10px #1b122522"
        }}
      >
        <div data-eid="comparison-title" style={{
          fontSize: 17,
          color: "#efeed5",
          fontWeight: 700,
          marginBottom: 5,
          letterSpacing: .05
        }}>
          {data.comparisonChart.title}
        </div>
        <div data-eid="comparison-bars" style={{width: "100%", height: 136,}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.comparisonChart.bars}>
              <XAxis dataKey="symbol" tick={{fill:"#fff",fontSize:13,fontWeight:600}} axisLine={false} tickLine={false}/>
              <YAxis hide />
              <Bar
                dataKey="melting"
                radius={[8,8,0,0]}
                barSize={22}
              >
                {data.comparisonChart.bars.map((entry: any, i: number) => (
                  <Cell
                    key={entry.symbol}
                    fill={
                      entry.symbol === "Fe"
                        ? "#e3bc32"
                        : "#e7f2e815"
                    }
                    stroke={entry.symbol === "Fe" ? "#e3bc32" : "#e7f2e850"}
                    strokeWidth={entry.symbol === "Fe" ? 2.4 : 1.3}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div
        data-eid="legend"
        style={{
          marginTop: 33,
          marginLeft: 20,
          paddingBottom: 18,
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <span data-eid="legend-alkali" style={{
          fontSize: 15.2,
          color: "#fff",
          marginRight: 17,
          verticalAlign: "middle"
        }}>
          <span style={legendDot(categoryColors.alkali)}></span>
          Alkali Metal
        </span>
        <span data-eid="legend-alkaline" style={{
          fontSize: 15.2,
          color: "#fff",
          marginRight: 17,
          verticalAlign: "middle"
        }}>
          <span style={legendDot(categoryColors.alkaline)}></span>
          Alkaline Earth
        </span>
        <span data-eid="legend-transition" style={{
          fontSize: 15.2,
          color: "#fff",
          marginRight: 17,
          verticalAlign: "middle"
        }}>
          <span style={legendDot(categoryColors.transition)}></span>
          Transition Metal
        </span>
        <span data-eid="legend-post-transition" style={{
          fontSize: 15.2,
          color: "#fff",
          marginRight: 17,
          verticalAlign: "middle"
        }}>
          <span style={legendDot(categoryColors['post-transition'])}></span>
          Post-Transition
        </span>
        <span data-eid="legend-metalloid" style={{
          fontSize: 15.2,
          color: "#fff",
          marginRight: 6,
          verticalAlign: "middle"
        }}>
          <span style={legendDot(categoryColors['metalloid'])}></span>
          Metalloid
        </span>
      </div>
    </section>
  );
}