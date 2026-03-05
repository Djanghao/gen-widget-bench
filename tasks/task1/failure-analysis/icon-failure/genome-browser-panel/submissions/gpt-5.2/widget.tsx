// submissions/gpt-widget/widget.tsx
import React from "react";
import data from "./data.json";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle } from "lucide-react";

type VariantType = "Benign" | "VUS" | "Pathogenic" | "Indel";

const colors = {
  bg: "#F6F2EB",
  panel: "#FFFFFF",
  border: "#D7DEE8",
  text: "#1F2A37",
  muted: "#8A99AA",
  blue: "#2F6FFF",
  blue2: "#3B82F6",
  green: "#16A34A",
  red: "#DC2626",
  grayDot: "#94A3B8",
  indel: "#94A3B8",
  tick: "#9AA7B5",
  grid: "#E8EDF4",
  warnBg: "#FFF2C9",
  warnBorder: "#F2C662",
  warnText: "#D12A1E",
  link: "#7C3AED",
};

function LegendDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: 999,
        background: color,
        display: "inline-block",
        marginRight: 6,
      }}
    />
  );
}

function TrackHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
      <span
        style={{
          color: colors.blue,
          fontWeight: 800,
          fontSize: 11,
          letterSpacing: 1.2,
        }}
      >
        {title}
      </span>
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

function exonBar(exons: { x: number; w: number }[], color: string) {
  return (
    <div
      style={{
        position: "relative",
        height: 12,
        borderRadius: 2,
        background: "transparent",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 5,
          left: 0,
          right: 0,
          height: 2,
          background: color,
          opacity: 0.65,
        }}
      />
      {exons.map((e, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${e.x}%`,
            width: `${e.w}%`,
            top: 2,
            height: 8,
            borderRadius: 1,
            background: color,
          }}
        />
      ))}
    </div>
  );
}

function VariantMark({
  leftPct,
  color,
  shape,
}: {
  leftPct: number;
  color: string;
  shape: "circle" | "pill";
}) {
  const common: React.CSSProperties = {
    position: "absolute",
    left: `calc(${leftPct}% - 5px)`,
    top: 8,
  };
  if (shape === "circle") {
    return (
      <span
        style={{
          ...common,
          width: 8,
          height: 8,
          borderRadius: 999,
          background: color,
        }}
      />
    );
  }
  return (
    <span
      style={{
        ...common,
        width: 10,
        height: 12,
        borderRadius: 3,
        background: color,
      }}
    />
  );
}

export default function Widget() {
  const rulerTicks = data.rulerTicks;

  const variantColor = (t: VariantType) => {
    if (t === "Benign") return colors.green;
    if (t === "VUS") return colors.grayDot;
    if (t === "Pathogenic") return colors.red;
    return colors.indel;
  };

  const variantShape = (t: VariantType) => (t === "Indel" ? "pill" : "circle");

  return (
    <section
      data-eid="root"
      style={{
        width: 479,
        height: 980,
        background: colors.bg,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        color: colors.text,
        boxSizing: "border-box",
        padding: 14,
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1
            data-eid="region-label"
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 0.2,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ color: colors.blue2, fontSize: 18, marginTop: -1 }}>
              ⌁
            </span>
            {data.regionLabel}
          </h1>
          <div style={{ flex: 1 }} />
          <span
            data-eid="genome-build"
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: colors.blue2,
              background: "#E7F0FF",
              borderRadius: 10,
              padding: "4px 8px",
              letterSpacing: 0.3,
            }}
          >
            {data.genomeBuild}
          </span>
        </div>
        <div style={{ marginTop: 6 }}>
          <span
            data-eid="region-size"
            style={{
              color: colors.muted,
              fontSize: 12,
              letterSpacing: 0.2,
            }}
          >
            {data.regionSize}
          </span>
        </div>
        <div
          style={{
            marginTop: 10,
            height: 1,
            background: "#D8DFE8",
          }}
        />
      </header>

      {/* Ruler */}
      <div data-eid="ruler-section" style={{ paddingTop: 10 }}>
        <span
          data-eid="ruler-title"
          style={{
            fontSize: 9,
            letterSpacing: 1.6,
            color: colors.tick,
            fontWeight: 800,
          }}
        >
          COORDINATES
        </span>
        <div
          data-eid="ruler-bar"
          style={{
            marginTop: 6,
            position: "relative",
            height: 26,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 12,
              height: 1,
              background: "#D8DFE8",
            }}
          />
          {rulerTicks.map((t, i) => {
            const eid = `ruler-tick-${i}` as const;
            const left = (i / (rulerTicks.length - 1)) * 100;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  top: 3,
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  width: 72,
                }}
              >
                <div
                  style={{
                    height: 8,
                    width: 1,
                    margin: "0 auto",
                    background: "#CCD6E2",
                  }}
                />
                <span
                  data-eid={eid}
                  style={{
                    fontSize: 10,
                    color: colors.tick,
                    marginTop: 3,
                    display: "inline-block",
                  }}
                >
                  {t}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gene annotations */}
      <div
        data-eid="genes-section"
        style={{
          marginTop: 10,
          background: colors.panel,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: 12,
        }}
      >
        <span data-eid="genes-title" style={{ display: "none" }}>
          {data.genesTitle}
        </span>
        <TrackHeader title={data.genesTitle} />
        <div data-eid="genes-track" style={{ position: "relative" }}>
          {/* Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {/* gene-0 TP53 */}
            <div data-eid="gene-0" style={{ position: "relative" }}>
              <span
                data-eid="gene-0-label"
                style={{ fontSize: 10, fontWeight: 800, color: colors.blue2 }}
              >
                {data.genes[0].name}
              </span>
              <div data-eid="gene-0-exons" style={{ marginTop: 4 }}>
                {exonBar(data.genes[0].exons, "#3B82F6")}
              </div>
              <span
                data-eid="gene-0-strand"
                style={{
                  fontSize: 10,
                  color: colors.tick,
                  marginTop: 6,
                  display: "inline-block",
                }}
              >
                {data.genes[0].strand}
              </span>
            </div>

            {/* gene-2 EFNB3 */}
            <div data-eid="gene-2" style={{ position: "relative" }}>
              <span
                data-eid="gene-2-label"
                style={{ fontSize: 10, fontWeight: 800, color: "#16A34A" }}
              >
                {data.genes[2].name}
              </span>
              <div data-eid="gene-2-exons" style={{ marginTop: 4 }}>
                {exonBar(data.genes[2].exons, "#22C55E")}
              </div>
              <span
                data-eid="gene-2-strand"
                style={{
                  fontSize: 10,
                  color: colors.tick,
                  marginTop: 6,
                  display: "inline-block",
                }}
              >
                {data.genes[2].strand}
              </span>
            </div>

            {/* gene-4 ATP1B2 */}
            <div data-eid="gene-4" style={{ position: "relative" }}>
              <span
                data-eid="gene-4-label"
                style={{ fontSize: 10, fontWeight: 800, color: "#DC2626" }}
              >
                {data.genes[4].name}
              </span>
              <div data-eid="gene-4-exons" style={{ marginTop: 4 }}>
                {exonBar(data.genes[4].exons, "#EF4444")}
              </div>
              <span
                data-eid="gene-4-strand"
                style={{
                  fontSize: 10,
                  color: colors.tick,
                  marginTop: 6,
                  display: "inline-block",
                }}
              >
                {data.genes[4].strand}
              </span>
            </div>
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
              marginTop: 10,
            }}
          >
            {/* gene-1 WRAP53 */}
            <div data-eid="gene-1" style={{ position: "relative" }}>
              <span
                data-eid="gene-1-label"
                style={{ fontSize: 10, fontWeight: 800, color: "#8B5CF6" }}
              >
                {data.genes[1].name}
              </span>
              <div data-eid="gene-1-exons" style={{ marginTop: 4 }}>
                {exonBar(data.genes[1].exons, "#A78BFA")}
              </div>
              <span
                data-eid="gene-1-strand"
                style={{
                  fontSize: 10,
                  color: colors.tick,
                  marginTop: 6,
                  display: "inline-block",
                }}
              >
                {data.genes[1].strand}
              </span>
            </div>

            {/* gene-5 SHBG */}
            <div data-eid="gene-5" style={{ position: "relative" }}>
              <span
                data-eid="gene-5-label"
                style={{ fontSize: 10, fontWeight: 800, color: "#06B6D4" }}
              >
                {data.genes[5].name}
              </span>
              <div data-eid="gene-5-exons" style={{ marginTop: 4 }}>
                {exonBar(data.genes[5].exons, "#22D3EE")}
              </div>
              <span
                data-eid="gene-5-strand"
                style={{
                  fontSize: 10,
                  color: colors.tick,
                  marginTop: 6,
                  display: "inline-block",
                }}
              >
                {data.genes[5].strand}
              </span>
            </div>

            {/* gene-3 DLGAP1-AS1 */}
            <div data-eid="gene-3" style={{ position: "relative" }}>
              <span
                data-eid="gene-3-label"
                style={{ fontSize: 10, fontWeight: 800, color: "#F59E0B" }}
              >
                {data.genes[3].name}
              </span>
              <div data-eid="gene-3-exons" style={{ marginTop: 4 }}>
                {exonBar(data.genes[3].exons, "#F59E0B")}
              </div>
              <span
                data-eid="gene-3-strand"
                style={{
                  fontSize: 10,
                  color: colors.tick,
                  marginTop: 6,
                  display: "inline-block",
                }}
              >
                {data.genes[3].strand}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Variant calls */}
      <div
        data-eid="variants-section"
        style={{
          marginTop: 12,
          background: colors.panel,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: 12,
        }}
      >
        <span data-eid="variants-title" style={{ display: "none" }}>
          {data.variantsTitle}
        </span>
        <TrackHeader title={data.variantsTitle} />
        <div
          data-eid="variants-track"
          style={{
            position: "relative",
            height: 30,
            borderRadius: 4,
            background: "#F1F4F8",
          }}
        >
          {data.variants.map((v, i) => {
            const eid = `variant-${i}` as const;
            return (
              <span data-eid={eid} key={i} style={{ position: "absolute", left: 0, top: 0 }}>
                <VariantMark
                  leftPct={v.posPct}
                  color={variantColor(v.type as VariantType)}
                  shape={variantShape(v.type as VariantType)}
                />
              </span>
            );
          })}
        </div>

        <div
          data-eid="variants-legend"
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginTop: 8,
            fontSize: 10,
            color: colors.muted,
          }}
        >
          <span>
            <LegendDot color={colors.green} />
            Benign
          </span>
          <span>
            <LegendDot color={colors.grayDot} />
            VUS
          </span>
          <span>
            <LegendDot color={colors.red} />
            Pathogenic
          </span>
          <span>
            <LegendDot color={colors.indel} />
            Indel
          </span>
        </div>
      </div>

      {/* Coverage depth */}
      <div
        data-eid="coverage-section"
        style={{
          marginTop: 12,
          background: colors.panel,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: 12,
        }}
      >
        <span data-eid="coverage-title" style={{ display: "none" }}>
          {data.coverageTitle}
        </span>
        <TrackHeader
          title={data.coverageTitle}
          right={
            <span
              data-eid="coverage-avg-label"
              style={{ fontSize: 10, color: colors.tick }}
            >
              Avg:{" "}
              <span style={{ color: colors.tick, fontWeight: 700 }}>
                {data.coverageAvg}
              </span>
            </span>
          }
        />
        <div data-eid="coverage-chart" style={{ width: "100%", height: 130 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.coverageData} margin={{ left: 0, right: 6, top: 6, bottom: 0 }}>
              <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                tick={{ fill: colors.tick, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 160]}
                ticks={[30, 80, 160]}
                tick={{ fill: colors.tick, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Area
                type="monotone"
                dataKey="y"
                stroke={colors.blue2}
                strokeWidth={2}
                fill="#CFE3FF"
                fillOpacity={1}
                dot={false}
                isAnimationActive={false}
              />
              {/* red dashed threshold at 30x */}
              <Line
                type="linear"
                dataKey={() => 30}
                stroke={colors.red}
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GC content */}
      <div
        data-eid="gc-section"
        style={{
          marginTop: 12,
          background: colors.panel,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: 12,
        }}
      >
        <span data-eid="gc-title" style={{ display: "none" }}>
          {data.gcTitle}
        </span>
        <TrackHeader title={data.gcTitle} />
        <div data-eid="gc-chart" style={{ width: "100%", height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.gcData} margin={{ left: 0, right: 6, top: 6, bottom: 0 }}>
              <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                tick={{ fill: colors.tick, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[30, 70]}
                ticks={[30, 50, 70]}
                tick={{ fill: colors.tick, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke={colors.green}
                strokeWidth={2}
                dot={{ r: 3, fill: colors.green, stroke: colors.green }}
                isAnimationActive={false}
              />
              <Line
                type="linear"
                dataKey={() => 50}
                stroke={colors.green}
                strokeDasharray="4 4"
                strokeWidth={1.2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detail */}
      <div
        data-eid="detail-section"
        style={{
          marginTop: 14,
          background: colors.warnBg,
          border: `1px solid ${colors.warnBorder}`,
          borderRadius: 10,
          padding: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <AlertCircle size={16} color={colors.warnText} />
          <h2
            data-eid="detail-title"
            style={{
              margin: 0,
              color: colors.warnText,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            {data.detail.title}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <span data-eid="detail-rsid" style={{ fontSize: 11, color: colors.tick }}>
              rsID: <span style={{ color: colors.text }}>{data.detail.rsid}</span>
            </span>
            <span data-eid="detail-ref-alt" style={{ fontSize: 11, color: colors.tick }}>
              Alleles: <span style={{ color: colors.warnText, fontWeight: 800 }}>{data.detail.alleles}</span>
            </span>
            <span data-eid="detail-consequence" style={{ fontSize: 11, color: colors.tick }}>
              Consequence: <span style={{ color: "#D97706" }}>{data.detail.consequence}</span>
            </span>
            <span data-eid="detail-protein" style={{ fontSize: 11, color: colors.tick }}>
              Protein:{" "}
              <span style={{ color: colors.link, fontWeight: 800 }}>{data.detail.protein}</span>
            </span>
            <span data-eid="detail-gnomad-af" style={{ fontSize: 11, color: colors.tick }}>
              gnomAD AF: <span style={{ color: colors.text }}>{data.detail.gnomadAF}</span>
            </span>
            <span data-eid="detail-polyphen" style={{ fontSize: 11, color: colors.tick }}>
              PolyPhen:{" "}
              <span style={{ color: colors.warnText }}>{data.detail.polyphen}</span>
            </span>
            <span data-eid="detail-zygosity" style={{ fontSize: 11, color: colors.tick }}>
              Zygosity: <span style={{ color: colors.text }}>{data.detail.zygosity}</span>
            </span>
            <span data-eid="detail-depth" style={{ fontSize: 11, color: colors.tick }}>
              Depth: <span style={{ color: colors.blue2, fontWeight: 800 }}>{data.detail.depth}</span>
            </span>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <span data-eid="detail-position" style={{ fontSize: 11, color: colors.tick }}>
              Pos: <span style={{ color: colors.text }}>{data.detail.position}</span>
            </span>
            <span data-eid="detail-type" style={{ fontSize: 11, color: colors.tick }}>
              Type: <span style={{ color: colors.text }}>{data.detail.type}</span>
            </span>
            <span data-eid="detail-gene" style={{ fontSize: 11, color: colors.tick }}>
              Gene: <span style={{ color: colors.warnText }}>{data.detail.gene}</span>
            </span>
            <span data-eid="detail-clinvar" style={{ fontSize: 11, color: colors.tick }}>
              ClinVar:{" "}
              <span style={{ color: colors.warnText, fontWeight: 800 }}>
                {data.detail.clinvar}
              </span>
            </span>
            <span data-eid="detail-sift" style={{ fontSize: 11, color: colors.tick }}>
              SIFT: <span style={{ color: colors.warnText }}>{data.detail.sift}</span>
            </span>
            <span data-eid="detail-cadd" style={{ fontSize: 11, color: colors.tick }}>
              CADD: <span style={{ color: colors.warnText }}>{data.detail.cadd}</span>
            </span>
            <span data-eid="detail-quality" style={{ fontSize: 11, color: colors.tick }}>
              Qual: <span style={{ color: colors.warnText, fontWeight: 800 }}>{data.detail.qual}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        data-eid="footer"
        style={{
          marginTop: 10,
          paddingTop: 8,
          display: "flex",
          alignItems: "center",
          color: colors.tick,
          fontSize: 10,
        }}
      >
        <span data-eid="footer-sample" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: colors.tick }}>⌬</span>
          {data.footer.sample}
        </span>
        <div style={{ flex: 1 }} />
        <span data-eid="footer-pipeline" style={{ fontWeight: 700 }}>
          {data.footer.pipeline}
        </span>
      </footer>
    </section>
  );
}