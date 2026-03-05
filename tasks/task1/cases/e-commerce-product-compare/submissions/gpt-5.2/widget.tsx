// submissions/chatgpt/widget.tsx
import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Headphones, Star, Truck, Store, CheckCircle2, XCircle, Package } from "lucide-react";
import data from "./data.json";

const StarRating = ({
  value,
  count,
  color = "#F59E0B",
}: {
  value: number;
  count: string;
  color?: string;
}) => {
  const full = Math.round(value);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
        {new Array(5).fill(0).map((_, i) => (
          <Star key={i} size={14} color={color} fill={i < full ? color : "transparent"} />
        ))}
      </div>
      <div style={{ fontSize: 10, color: "#5b6b63" }}>({count})</div>
    </div>
  );
};

const Badge = ({
  text,
  tone,
}: {
  text: string;
  tone: "ok" | "warn" | "neutral";
}) => {
  const map = {
    ok: { bg: "#E8F7EF", fg: "#1B7A57", border: "#BFEAD3" },
    warn: { bg: "#FDECEC", fg: "#C2410C", border: "#F7C3C3" },
    neutral: { bg: "#ECF7F2", fg: "#2A6B55", border: "#CBEBDD" },
  } as const;
  const t = map[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        fontSize: 11,
        fontWeight: 600,
        lineHeight: "14px",
        whiteSpace: "nowrap",
      }}
    >
      {tone === "warn" ? <XCircle size={14} color={t.fg} /> : <CheckCircle2 size={14} color={t.fg} />}
      {text}
    </span>
  );
};

const ProductCard = ({
  p,
  accent,
  eidPrefix,
}: {
  p: any;
  accent: string;
  eidPrefix: string;
}) => {
  const availabilityTone = p.availabilityTone as "ok" | "warn" | "neutral";
  return (
    <div
      data-eid={eidPrefix}
      style={{
        flex: 1,
        background: "#ffffff",
        borderRadius: 12,
        border: "1px solid #D7EFE3",
        padding: 14,
        boxShadow: "0 1px 0 rgba(11, 66, 50, 0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        minWidth: 0,
      }}
    >
      <div
        data-eid={`${eidPrefix}-image`}
        style={{
          width: 52,
          height: 52,
          borderRadius: 10,
          background: p.imageBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <Headphones size={26} color={accent} />
      </div>

      <span
        data-eid={`${eidPrefix}-name`}
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: accent,
          marginTop: 2,
          textAlign: "center",
        }}
      >
        {p.name}
      </span>

      <span
        data-eid={`${eidPrefix}-price`}
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: "#0B3D32",
          marginTop: -6,
        }}
      >
        {p.price}
      </span>

      <div data-eid={`${eidPrefix}-rating`}>
        <StarRating value={p.rating} count={p.ratingCount} />
      </div>

      <span data-eid={`${eidPrefix}-availability`} style={{ display: "inline-flex" }}>
        <Badge text={p.availability} tone={availabilityTone} />
      </span>

      <span
        data-eid={`${eidPrefix}-shipping`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#5b6b63",
          marginTop: -2,
          whiteSpace: "nowrap",
        }}
      >
        <Truck size={14} color="#5b6b63" />
        {p.shipping}
      </span>

      <span
        data-eid={`${eidPrefix}-seller`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#5b6b63",
          marginTop: -6,
          whiteSpace: "nowrap",
        }}
      >
        <Store size={14} color="#5b6b63" />
        {p.seller}
      </span>
    </div>
  );
};

export default function Widget() {
  const palette: Record<string, string> = {
    SoundMaxPro: "#2F73FF",
    AudioEliteX1: "#8B5CF6",
    BassKing700: "#FF4D5E",
    ClearToneUltra: "#10B981",
  };

  return (
    <section
      data-eid="root"
      style={{
        width: 471,
        height: 893,
        background: "#F1FBF6",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        color: "#0B3D32",
        boxSizing: "border-box",
        padding: 14,
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Headphones size={18} color="#0B6B57" />
          <h1
            data-eid="title"
            style={{
              fontSize: 18,
              margin: 0,
              fontWeight: 800,
              color: "#0B6B57",
            }}
          >
            {data.title}
          </h1>
        </div>

        <span
          data-eid="category-label"
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "6px 12px",
            borderRadius: 999,
            background: "#DFF5EB",
            color: "#0B6B57",
            border: "1px solid #C3E9D8",
          }}
        >
          {data.category}
        </span>
      </header>

      <div
        data-eid="radar-chart-section"
        style={{
          background: "#ffffff",
          border: "1px solid #D7EFE3",
          borderRadius: 12,
          padding: 14,
          boxShadow: "0 1px 0 rgba(11, 66, 50, 0.04)",
        }}
      >
        <h2
          data-eid="radar-chart-title"
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 800,
            color: "#0B6B57",
          }}
        >
          {data.performanceTitle}
        </h2>

        <div
          data-eid="radar-chart"
          style={{
            height: 230,
            marginTop: 10,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data.radar.data} outerRadius="70%">
              <PolarGrid stroke="#DCEFE6" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: "#0B6B57", fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: "#9BB7AB", fontSize: 9 }}
                axisLine={false}
              />
              {data.radar.series.map((s: any) => (
                <Radar
                  key={s.key}
                  name={s.name}
                  dataKey={s.key}
                  stroke={palette[s.colorKey]}
                  fill={palette[s.colorKey]}
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            marginTop: -2,
          }}
        >
          {data.radar.legend.map((l: any) => (
            <div key={l.key} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span
                style={{
                  width: 14,
                  height: 10,
                  borderRadius: 2,
                  background: palette[l.colorKey],
                }}
              />
              <span style={{ fontSize: 10, color: palette[l.colorKey] }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        data-eid="products-row"
        style={{
          display: "flex",
          gap: 12,
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        <ProductCard p={data.products[0]} accent="#2F73FF" eidPrefix="product-0" />
        <ProductCard p={data.products[1]} accent="#8B5CF6" eidPrefix="product-1" />
        <ProductCard p={data.products[2]} accent="#FF4D5E" eidPrefix="product-2" />
        <ProductCard p={data.products[3]} accent="#10B981" eidPrefix="product-3" />
      </div>

      <div data-eid="specs-section" style={{ marginTop: 6 }}>
        <h2
          data-eid="specs-title"
          style={{
            margin: "0 0 8px 0",
            fontSize: 13,
            fontWeight: 900,
            color: "#0B6B57",
          }}
        >
          {data.specsTitle}
        </h2>

        <div
          data-eid="specs-table"
          style={{
            background: "#ffffff00",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {data.specs.map((row: any, idx: number) => {
            const bg = idx % 2 === 0 ? "#E7F7F0" : "#DFF3EA";
            const rowEid = `spec-row-${idx}`;
            return (
              <div
                key={row.label}
                data-eid={rowEid}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr 1fr 1fr 1fr",
                  gap: 0,
                  background: bg,
                  padding: "7px 10px",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(11, 66, 50, 0.03)",
                }}
              >
                <span
                  data-eid={`${rowEid}-label`}
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#0B3D32",
                  }}
                >
                  {row.label}
                </span>
                {row.values.map((v: string, cidx: number) => (
                  <span
                    key={cidx}
                    data-eid={`${rowEid}-val-${cidx}`}
                    style={{
                      fontSize: 11,
                      color: "#2A5F52",
                      textAlign: "center",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div data-eid="pros-cons-section" style={{ marginTop: 12 }}>
        <h2
          data-eid="pros-cons-title"
          style={{
            margin: "0 0 8px 0",
            fontSize: 13,
            fontWeight: 900,
            color: "#0B6B57",
          }}
        >
          {data.prosConsTitle}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {data.prosCons.map((pc: any, idx: number) => {
            const accent = pc.accent;
            const pcEid = `pc-${idx}`;
            return (
              <div
                key={pc.product}
                data-eid={pcEid}
                style={{
                  background: "#ffffff",
                  borderRadius: 10,
                  border: "1px solid #D7EFE3",
                  padding: 10,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, marginBottom: 8 }}>
                  {pc.product}
                </div>

                <div data-eid={`${pcEid}-pros`} style={{ marginBottom: 8 }}>
                  {pc.pros.map((t: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                        fontSize: 10,
                        color: "#2A5F52",
                        margin: "4px 0",
                      }}
                    >
                      <CheckCircle2 size={12} color="#1B7A57" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                <div data-eid={`${pcEid}-cons`}>
                  {pc.cons.map((t: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                        fontSize: 10,
                        color: idx === 1 || idx === 2 ? "#D24B4B" : "#D24B4B",
                        margin: "4px 0",
                      }}
                    >
                      <Package size={12} color="#D24B4B" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}