import React from "react";
import data from "./data.json";
import { BarChart, Bar, XAxis, ReferenceLine, ResponsiveContainer } from "recharts";
import { Sparkles } from "lucide-react";

const nucColors: Record<string, string> = {
  "A": "#67c674",
  "T": "#ed7272",
  "G": "#edce58",
  "C": "#5ea6e5"
};

const variantImpactColors: Record<string, { bg: string; text: string; border?: string }> = {
  "High": { bg: "#ffe7b9", text: "#a87300", border: "#ffc76e" },
  "Low": { bg: "#deffe3", text: "#15803d", border: "#82de8b" },
  "Critical": { bg: "#ffd6de", text: "#c92451", border: "#ff7ba3" }
};

const SequenceTrack = ({
  label,
  seq,
  coverage,
  trackIndex
}: {
  label: string;
  seq: string[];
  coverage: string;
  trackIndex: number;
}) => (
  <div
    data-eid={`track-${trackIndex}`}
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: 3,
      position: "relative"
    }}
  >
    <div
      data-eid={`track-${trackIndex}-label`}
      style={{
        fontWeight: 600,
        minWidth: 82,
        color: "#dadada",
        fontSize: 15,
        textAlign: "right",
        marginRight: 14,
        letterSpacing: 0.2
      }}
    >
      {label}
    </div>
    <div
      data-eid={`track-${trackIndex}-seq`}
      style={{
        display: "flex",
        background: "rgba(255,255,255,0.04)",
        borderRadius: 6,
        padding: "2px 8px"
      }}
    >
      {seq.map((nuc, i) => (
        <span
          key={i}
          style={{
            width: 23,
            height: 26,
            fontSize: 16.5,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: "26px",
            color: nucColors[nuc] || "#fff",
            marginRight: 2,
            background:
              nuc === " "
                ? "transparent"
                : "rgba(44,53,76,0.7)",
            borderRadius: 4,
            transition: "background 0.2s"
          }}
        >
          {nuc}
        </span>
      ))}
    </div>
    <div
      data-eid={`track-${trackIndex}-coverage`}
      style={{
        fontSize: 14,
        color: "#bababa",
        marginLeft: 14,
        minWidth: 40,
        textAlign: "left"
      }}
    >
      {coverage}
    </div>
  </div>
);

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 635,
        borderRadius: "26px 0 0 0",
        background: "linear-gradient(160deg,#151b2c 85%,#f6faff 100%)",
        boxShadow: "0 0 0 1px #e7eafc, 0 6px 24px #22365a0b",
        padding: "32px 32px 18px 32px",
        margin: "44px auto 0 auto",
        fontFamily: "Inter, sans-serif",
        color: "#fff"
      }}
    >
      {/* HEADER */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 17
        }}
      >
        <Sparkles
          style={{ color: "#6491f7", marginRight: 13, minWidth: 25 }}
          size={25}
          strokeWidth={2.2}
        />
        <div style={{ flex: 1 }}>
          <div
            data-eid="gene-name"
            style={{
              fontWeight: 800,
              fontSize: 28,
              lineHeight: "34px",
              letterSpacing: 0.2
            }}
          >
            {data.gene_name}
          </div>
          <div
            data-eid="gene-fullname"
            style={{
              fontSize: 15,
              color: "#b2bad3",
              fontWeight: 500
            }}
          >
            {data.gene_fullname}
          </div>
        </div>
        <span
          data-eid="chromosome-badge"
          style={{
            background: "#35508c",
            padding: "5px 16px",
            color: "#d7e5fc",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 18,
            marginLeft: 8,
            marginRight: 3
          }}
        >
          {data.chromosome}
        </span>
        <span
          data-eid="strand-badge"
          style={{
            background: "#FFD264",
            color: "#141c1c",
            fontWeight: 700,
            fontSize: 15,
            padding: "5px 15px",
            borderRadius: 18,
            marginLeft: 5,
            marginRight: 3
          }}
        >
          {data.strand}
        </span>
        <span
          data-eid="length-badge"
          style={{
            background: "#41c370",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            padding: "5px 15px",
            borderRadius: 18,
            marginLeft: 5
          }}
        >
          {data.length}
        </span>
      </header>

      {/* RULER & LEGEND */}
      <div
        style={{
          marginBottom: 15,
          marginTop: 7
        }}
      >
        <div
          data-eid="ruler"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
            fontSize: 14,
            fontWeight: 600,
            color: "#9cbce1",
            marginBottom: 6,
            marginLeft: 4,
            letterSpacing: 0.7
          }}
        >
          <span style={{ flex: 1, position: "relative" }}>
            <span
              data-eid="ruler-mark-0"
              style={{
                position: "absolute",
                left: "7px"
              }}
            >
              10
            </span>
            <span
              data-eid="ruler-mark-1"
              style={{
                position: "absolute",
                left: "71px"
              }}
            >
              20
            </span>
            <span
              data-eid="ruler-mark-2"
              style={{
                position: "absolute",
                left: "138px"
              }}
            >
              30
            </span>
            <span
              data-eid="ruler-mark-3"
              style={{
                position: "absolute",
                left: "201px"
              }}
            >
              40
            </span>
            <span
              data-eid="ruler-mark-4"
              style={{
                position: "absolute",
                left: "267px"
              }}
            >
              50
            </span>
            <span
              data-eid="ruler-mark-5"
              style={{
                position: "absolute",
                left: "336px"
              }}
            >
              60
            </span>
          </span>
        </div>
        <div
          data-eid="legend"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 8,
            fontSize: 15,
            fontWeight: 600,
            gap: 15
          }}
        >
          <span data-eid="legend-a" style={{ color: "#67c674", display: "flex", alignItems: "center" }}>
            <span style={{
              display: "inline-block",
              background: "#67c674",
              width: 13, height: 13,
              borderRadius: 2, marginRight: 5
            }} /> Adenine
          </span>
          <span data-eid="legend-t" style={{ color: "#ed7272", display: "flex", alignItems: "center" }}>
            <span style={{
              display: "inline-block",
              background: "#ed7272",
              width: 13, height: 13,
              borderRadius: 2, marginRight: 5
            }} /> Thymine
          </span>
          <span data-eid="legend-g" style={{ color: "#edce58", display: "flex", alignItems: "center" }}>
            <span style={{
              display: "inline-block",
              background: "#edce58",
              width: 13, height: 13,
              borderRadius: 2, marginRight: 5
            }} /> Guanine
          </span>
          <span data-eid="legend-c" style={{ color: "#5ea6e5", display: "flex", alignItems: "center" }}>
            <span style={{
              display: "inline-block",
              background: "#5ea6e5",
              width: 13, height: 13,
              borderRadius: 2, marginRight: 5
            }} /> Cytosine
          </span>
        </div>
      </div>

      {/* TRACKS SECTION */}
      <div data-eid="tracks-section" style={{ marginBottom: 18 }}>
        <div
          data-eid="tracks-title"
          style={{
            fontWeight: 700,
            fontSize: 19,
            marginBottom: 6,
            color: "#fff"
          }}
        >
          Sequence Alignment
        </div>
        {data.sequence_tracks.map((track, i) => (
          <SequenceTrack
            key={i}
            trackIndex={i}
            label={track.label}
            seq={track.seq}
            coverage={track.coverage}
          />
        ))}
      </div>

      {/* VARIANT ANNOTATIONS */}
      <div
        data-eid="variants-section"
        style={{
          background: "#18213b",
          padding: "17px 17px 5px 17px",
          borderRadius: 11,
          marginBottom: 16
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          <div
            data-eid="variants-title"
            style={{
              fontWeight: 700,
              fontSize: 17
            }}
          >
            Variant Annotations
          </div>
          <span
            data-eid="variants-count"
            style={{
              marginLeft: 11,
              background: "#b1274f",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 15,
              padding: "1px 12px 1px 12px",
              marginBottom: 1
            }}
          >
            {data.variants.length} variants
          </span>
        </div>
        {data.variants.map((v, vi) => (
          <div
            key={vi}
            data-eid={`variant-${vi}`}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 15.1,
              background: "rgba(52,65,84,0.92)",
              borderRadius: 6,
              marginBottom: 8,
              height: 35,
              borderLeft: v.impact === "Critical" ? "4px solid #f2518f" : v.impact === "High" ? "4px solid #ffc76e" : "4px solid #82de8b"
            }}
          >
            <span
              data-eid={`variant-${vi}-pos`}
              style={{
                background: "#28304a",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 6,
                padding: "2px 9px",
                minWidth: 49,
                marginLeft: 6,
                marginRight: 6,
                letterSpacing: 0.1
              }}
            >
              pos {v.pos}
            </span>
            <span
              data-eid={`variant-${vi}-change`}
              style={{
                color: "#fff",
                background: "#2c3755",
                borderRadius: 4,
                fontSize: 14,
                padding: "2px 6px",
                fontWeight: 600,
                marginRight: 9,
                display: "inline-block",
                border: "1px solid #324267"
              }}
            >
              {v.change}
            </span>
            <span
              data-eid={`variant-${vi}-type`}
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                marginRight: 11
              }}
            >
              {v.type}
            </span>
            <span style={{
              flex: 1
            }} />
            <span style={{
              color: "#9bb",
              fontSize: 13.8,
              marginRight: 9
            }}>
              AF:<span data-eid={`variant-${vi}-freq`}> {v.af}</span>
            </span>
            <span
              data-eid={`variant-${vi}-impact`}
              style={{
                ...(
                  v.impact === "High"
                    ? {
                        background: variantImpactColors["High"].bg,
                        color: variantImpactColors["High"].text,
                        border: `1px solid ${variantImpactColors["High"].border}`,
                      }
                    : v.impact === "Low"
                    ? {
                        background: variantImpactColors["Low"].bg,
                        color: variantImpactColors["Low"].text,
                        border: `1px solid ${variantImpactColors["Low"].border}`,
                      }
                    : {
                        background: variantImpactColors["Critical"].bg,
                        color: variantImpactColors["Critical"].text,
                        border: `1px solid ${variantImpactColors["Critical"].border}`,
                      }
                ),
                fontWeight: 700,
                fontSize: 13.5,
                borderRadius: 8,
                padding: "2.5px 13px",
                marginRight: 7,
                marginLeft: 5,
                minWidth: 62,
                textAlign: "center"
              }}
            >
              {v.impact}
            </span>
          </div>
        ))}
      </div>

      {/* QUALITY SECTION */}
      <div
        data-eid="quality-section"
        style={{
          background: "#17223a",
          borderRadius: 12,
          padding: "14px 17px 18px 17px",
          marginBottom: 16
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <div
            data-eid="quality-title"
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: "#fff"
            }}
          >
            Quality Scores
          </div>
          <span
            data-eid="quality-avg"
            style={{
              marginLeft: 13,
              fontWeight: 700,
              color: "#42e850",
              fontSize: 15.8
            }}
          >
            Avg Q{data.quality_avg}
          </span>
        </div>
        <div
          data-eid="quality-chart"
          style={{
            width: "100%",
            height: 93,
            position: "relative"
          }}
        >
          <ResponsiveContainer width="100%" height={93}>
            <BarChart
              data={data.quality_scores}
              margin={{ left: 3, right: 3, top: 7, bottom: 3 }}
              barGap={0}
              barCategoryGap={1}
            >
              <XAxis dataKey="pos" hide />
              <Bar
                dataKey="score"
                radius={[4, 4, 0, 0]}
                minPointSize={2}
                fill="#39e650"
                isAnimationActive={false}
                background={false}
              >
                {data.quality_scores.map((q, i) => (
                  <React.Fragment key={i}>
                    {q.score >= 30 && (
                      <rect
                        x={i * 24.5 + 0.5}
                        y={70 - q.score}
                        width={19}
                        height={q.score * 1.9}
                        rx={4}
                        fill={q.score >= 35 ? "#39e650" : "#edce58"}
                        stroke="none"
                      />
                    )}
                    {q.score < 30 && (
                      <rect
                        x={i * 24.5 + 0.5}
                        y={70 - q.score}
                        width={19}
                        height={q.score * 1.9}
                        rx={4}
                        fill={q.score < 25 ? "#ed7272" : "#edce58"}
                        stroke="none"
                      />
                    )}
                  </React.Fragment>
                ))}
              </Bar>
              <ReferenceLine
                y={70 - 30}
                stroke="#ed7272"
                isFront
                strokeDasharray="3 2"
              />
            </BarChart>
          </ResponsiveContainer>
          <div
            data-eid="quality-threshold"
            style={{
              position: "absolute",
              right: 13,
              top: 13,
              color: "#ed7272",
              background: "transparent",
              fontWeight: 700,
              fontSize: 13
            }}
          >
            Q30 threshold
          </div>
        </div>
      </div>

      {/* REGIONS SECTION */}
      <div data-eid="regions-section">
        <div
          data-eid="regions-title"
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: "#fff",
            marginBottom: 10
          }}
        >
          Gene Regions
        </div>
        <div
          data-eid="regions-bar"
          style={{
            background: "#1c2541",
            borderRadius: 9,
            display: "flex",
            overflow: "hidden",
            marginBottom: 7
          }}
        >
          <div
            data-eid="region-exon1"
            style={{
              background: "#6876fb",
              color: "#fff",
              fontWeight: 700,
              padding: "7px 0",
              textAlign: "center",
              width: "23%",
              fontSize: 15.8,
              borderRight: "2px solid #262f4f"
            }}
          >
            Exon 1
          </div>
          <div
            data-eid="region-intron1"
            style={{
              background: "#242942",
              color: "#e9eaff",
              fontWeight: 600,
              fontSize: 14,
              textAlign: "center",
              width: "15%",
              padding: "7px 0",
              borderRight: "2px solid #262f4f"
            }}
          >
            Intron 1
          </div>
          <div
            data-eid="region-exon2"
            style={{
              background: "#6876fb",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15.8,
              textAlign: "center",
              width: "17%",
              padding: "7px 0",
              borderRight: "2px solid #262f4f"
            }}
          >
            Exon 2
          </div>
          <div
            data-eid="region-intron2"
            style={{
              background: "#242942",
              color: "#e9eaff",
              fontWeight: 600,
              fontSize: 14,
              textAlign: "center",
              width: "16%",
              padding: "7px 0",
              borderRight: "2px solid #262f4f"
            }}
          >
            Intron 2
          </div>
          <div
            data-eid="region-exon3"
            style={{
              background: "#6876fb",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15.8,
              textAlign: "center",
              width: "29%",
              padding: "7px 0"
            }}
          >
            Exon 3
          </div>
        </div>
        <div
          data-eid="regions-legend"
          style={{
            textAlign: "center",
            marginTop: 5,
            marginBottom: 6,
            fontSize: 15,
            letterSpacing: 0.3
          }}
        >
          <span
            style={{
              background: "#6876fb",
              color: "#fff",
              display: "inline-block",
              borderRadius: 6,
              padding: "2px 19px 2px 19px",
              fontWeight: 600,
              marginRight: 13,
              fontSize: 14.2
            }}
          >
            Exon
          </span>
          <span
            style={{
              background: "#242942",
              color: "#c8d6ef",
              display: "inline-block",
              borderRadius: 6,
              padding: "2px 17px 2px 17px",
              fontWeight: 500,
              fontSize: 14.2
            }}
          >
            Intron
          </span>
        </div>
      </div>

      {/* GENE INFO CARD */}
      <div
        data-eid="gene-info"
        style={{
          position: "absolute",
          top: 41,
          right: -268,
          width: 250,
          background: "#f7faff",
          boxShadow: "0 6px 40px #17307028, 0 0 0 1.5px #cad6ef",
          borderRadius: 15,
          padding: "22px 24px 16px 24px",
          color: "#133144"
        }}
      >
        <div
          data-eid="gene-info-name"
          style={{
            fontWeight: 900,
            fontSize: 21,
            marginBottom: 1
          }}
        >
          {data.gene_info.name}
        </div>
        <div
          data-eid="gene-info-function"
          style={{
            fontSize: 15.5,
            color: "#5670b7",
            fontWeight: 600,
            marginBottom: 9
          }}
        >
          {data.gene_info.function}
        </div>
        <div
          data-eid="gene-info-pathway"
          style={{
            color: "#263f98",
            fontWeight: 600,
            fontSize: 14.5,
            marginBottom: 7
          }}
        >
          {data.gene_info.pathway}
        </div>
        <div
          data-eid="gene-info-disease"
          style={{
            background: "#fbe7ef",
            color: "#c82d74",
            fontWeight: 700,
            fontSize: 14.5,
            borderRadius: 8,
            padding: "2px 9px",
            display: "inline-block",
            marginBottom: 8,
            marginTop: 2
          }}
        >
          {data.gene_info.disease}
        </div>
        <div
          data-eid="gene-info-expression"
          style={{
            marginTop: 13
          }}
        >
          <span
            data-eid="gene-info-expression-label"
            style={{
              fontWeight: 600,
              fontSize: 13.6,
              color: "#3c4daf"
            }}
          >
            Expression
          </span>
          <span
            data-eid="gene-info-expression-value"
            style={{
              marginLeft: 10,
              color: "#41c370",
              fontWeight: 800,
              fontSize: 15.7
            }}
          >
            87% High
          </span>
          <div
            style={{
              background: "#e8f3ed",
              borderRadius: 8,
              marginTop: 7,
              width: "100%",
              height: 18,
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              data-eid="gene-info-expression-fill"
              style={{
                background: "linear-gradient(90deg,#85ead8 20%,#41c370 100%)",
                width: "87%",
                height: 18,
                borderRadius: 8
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}