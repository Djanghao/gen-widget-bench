// submissions/gpt-4.1/widget.tsx
import React from 'react';
import data from './data.json';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Dna } from 'lucide-react';

type Nuc = 'A' | 'T' | 'G' | 'C';

const nucColors: Record<Nuc, { bg: string; fg: string; border: string }> = {
  A: { bg: 'rgba(34,197,94,0.14)', fg: '#9AF1B5', border: 'rgba(34,197,94,0.55)' },
  T: { bg: 'rgba(239,68,68,0.14)', fg: '#FFB4B4', border: 'rgba(239,68,68,0.55)' },
  G: { bg: 'rgba(234,179,8,0.16)', fg: '#FFE39A', border: 'rgba(234,179,8,0.60)' },
  C: { bg: 'rgba(59,130,246,0.16)', fg: '#B7D1FF', border: 'rgba(59,130,246,0.60)' },
};

function NucBlock({ base }: { base: Nuc }) {
  const c = nucColors[base];
  return (
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.fg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 11,
        lineHeight: '18px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {base}
    </div>
  );
}

function Badge({
  text,
  bg,
  border,
  color,
}: {
  text: string;
  bg: string;
  border: string;
  color: string;
}) {
  return (
    <span
      style={{
        padding: '6px 10px',
        borderRadius: 999,
        background: bg,
        border: `1px solid ${border}`,
        color,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.2,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}

export default function Widget() {
  const w = 460;

  return (
    <section
      data-eid="root"
      style={{
        width: w,
        borderRadius: 22,
        background:
          'radial-gradient(120% 120% at 20% 0%, rgba(79,70,229,0.20) 0%, rgba(2,6,23,0.0) 40%), radial-gradient(120% 120% at 110% 10%, rgba(59,130,246,0.18) 0%, rgba(2,6,23,0.0) 42%), linear-gradient(180deg, #0B1220 0%, #060B16 100%)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
        color: '#E5E7EB',
        padding: 18,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.35)',
            }}
          >
            <Dna size={16} color="#C7D2FE" />
          </div>
          <div>
            <div
              data-eid="gene-name"
              style={{
                fontWeight: 900,
                letterSpacing: 0.5,
                fontSize: 20,
                lineHeight: '22px',
              }}
            >
              {data.gene.name}
            </div>
            <div
              data-eid="gene-fullname"
              style={{
                marginTop: 2,
                fontSize: 11,
                color: 'rgba(203,213,225,0.75)',
                letterSpacing: 0.15,
              }}
            >
              {data.gene.subtitle}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
          <span data-eid="chromosome-badge">
            <Badge
              text={data.gene.location}
              bg="rgba(59,130,246,0.12)"
              border="rgba(59,130,246,0.35)"
              color="#BFDBFE"
            />
          </span>
          <span data-eid="strand-badge">
            <Badge
              text={data.gene.strand}
              bg="rgba(234,179,8,0.14)"
              border="rgba(234,179,8,0.35)"
              color="#FDE68A"
            />
          </span>
          <span data-eid="length-badge">
            <Badge
              text={data.gene.length}
              bg="rgba(34,197,94,0.14)"
              border="rgba(34,197,94,0.35)"
              color="#86EFAC"
            />
          </span>
        </div>
      </header>

      <div
        data-eid="ruler"
        style={{
          marginTop: 6,
          marginBottom: 8,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'rgba(15,23,42,0.55)',
          border: '1px solid rgba(148,163,184,0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'rgba(148,163,184,0.9)',
          fontSize: 10,
          letterSpacing: 0.25,
        }}
      >
        {data.ruler.map((m, i) => (
          <span
            key={m}
            data-eid={
              i === 0
                ? 'ruler-mark-0'
                : i === 1
                  ? 'ruler-mark-1'
                  : i === 2
                    ? 'ruler-mark-2'
                    : i === 3
                      ? 'ruler-mark-3'
                      : i === 4
                        ? 'ruler-mark-4'
                        : 'ruler-mark-5'
            }
            style={{ width: 16, textAlign: 'center' }}
          >
            {m}
          </span>
        ))}
      </div>

      <div
        data-eid="legend"
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
          color: 'rgba(203,213,225,0.8)',
          fontSize: 10,
        }}
      >
        <span data-eid="legend-a" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: '#22C55E' }} />
          Adenine
        </span>
        <span data-eid="legend-t" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: '#EF4444' }} />
          Thymine
        </span>
        <span data-eid="legend-g" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: '#EAB308' }} />
          Guanine
        </span>
        <span data-eid="legend-c" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: '#3B82F6' }} />
          Cytosine
        </span>
      </div>

      <div data-eid="tracks-section" style={{ marginBottom: 14 }}>
        <div
          data-eid="tracks-title"
          style={{
            fontWeight: 800,
            fontSize: 14,
            color: 'rgba(226,232,240,0.95)',
            marginBottom: 8,
            letterSpacing: 0.2,
          }}
        >
          Sequence Alignment
        </div>

        {data.tracks.map((t, idx) => {
          const trackEid = `track-${idx}` as const;
          const labelEid = `track-${idx}-label` as const;
          const seqEid = `track-${idx}-seq` as const;
          const covEid = `track-${idx}-coverage` as const;

          return (
            <div
              key={t.label}
              data-eid={trackEid}
              style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr 44px',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                data-eid={labelEid}
                style={{
                  fontSize: 11,
                  color: 'rgba(148,163,184,0.9)',
                  fontWeight: 700,
                }}
              >
                {t.label}
              </div>

              <div data-eid={seqEid} style={{ display: 'flex', gap: 4, flexWrap: 'nowrap' }}>
                {(t.sequence as Nuc[]).map((b, i) => (
                  <NucBlock key={i} base={b} />
                ))}
              </div>

              <div
                data-eid={covEid}
                style={{
                  textAlign: 'right',
                  fontSize: 11,
                  color: 'rgba(148,163,184,0.95)',
                  fontWeight: 800,
                }}
              >
                {t.coverage}
              </div>
            </div>
          );
        })}
      </div>

      <div data-eid="variants-section" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div
            data-eid="variants-title"
            style={{
              fontWeight: 800,
              fontSize: 14,
              color: 'rgba(226,232,240,0.95)',
              letterSpacing: 0.2,
            }}
          >
            Variant Annotations
          </div>
          <span
            data-eid="variants-count"
            style={{
              padding: '4px 10px',
              borderRadius: 999,
              background: 'rgba(190,24,93,0.14)',
              border: '1px solid rgba(190,24,93,0.30)',
              color: '#FBCFE8',
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            {data.variants.count}
          </span>
        </div>

        {data.variants.items.map((v, i) => {
          const impactColor =
            v.impact === 'High'
              ? { bg: 'rgba(251,191,36,0.18)', bd: 'rgba(251,191,36,0.40)', fg: '#FDE68A' }
              : v.impact === 'Low'
                ? { bg: 'rgba(34,197,94,0.16)', bd: 'rgba(34,197,94,0.38)', fg: '#BBF7D0' }
                : { bg: 'rgba(248,113,113,0.16)', bd: 'rgba(248,113,113,0.40)', fg: '#FECACA' };

          const rowBg =
            i === 0
              ? 'linear-gradient(90deg, rgba(234,179,8,0.18) 0%, rgba(15,23,42,0.35) 65%)'
              : i === 1
                ? 'linear-gradient(90deg, rgba(34,197,94,0.16) 0%, rgba(15,23,42,0.35) 65%)'
                : 'linear-gradient(90deg, rgba(239,68,68,0.16) 0%, rgba(15,23,42,0.35) 65%)';

          return (
            <div
              key={v.pos}
              data-eid={`variant-${i}`}
              style={{
                borderRadius: 10,
                background: rowBg,
                border: '1px solid rgba(148,163,184,0.14)',
                padding: '10px 10px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span
                  data-eid={`variant-${i}-pos`}
                  style={{
                    color: 'rgba(226,232,240,0.9)',
                    fontWeight: 800,
                    fontSize: 11,
                  }}
                >
                  {v.pos}
                </span>
                <span
                  data-eid={`variant-${i}-change`}
                  style={{
                    padding: '2px 6px',
                    borderRadius: 6,
                    background: 'rgba(15,23,42,0.55)',
                    border: '1px solid rgba(148,163,184,0.16)',
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    fontSize: 11,
                    color: 'rgba(226,232,240,0.9)',
                    fontWeight: 800,
                  }}
                >
                  {v.change}
                </span>
                <span
                  data-eid={`variant-${i}-type`}
                  style={{ color: 'rgba(148,163,184,0.9)', fontSize: 11 }}
                >
                  {v.type}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  data-eid={`variant-${i}-freq`}
                  style={{
                    color: 'rgba(148,163,184,0.85)',
                    fontSize: 10,
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  }}
                >
                  {v.af}
                </span>
                <span data-eid={`variant-${i}-impact`}>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: impactColor.bg,
                      border: `1px solid ${impactColor.bd}`,
                      color: impactColor.fg,
                      fontSize: 11,
                      fontWeight: 900,
                    }}
                  >
                    {v.impact}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div data-eid="quality-section" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div
            data-eid="quality-title"
            style={{
              fontWeight: 800,
              fontSize: 14,
              color: 'rgba(226,232,240,0.95)',
              letterSpacing: 0.2,
            }}
          >
            Quality Scores
          </div>
          <span
            data-eid="quality-avg"
            style={{
              color: '#86EFAC',
              fontSize: 11,
              fontWeight: 900,
            }}
          >
            {data.quality.avg}
          </span>
        </div>

        <div
          data-eid="quality-chart"
          style={{
            height: 92,
            borderRadius: 12,
            background: 'rgba(15,23,42,0.55)',
            border: '1px solid rgba(148,163,184,0.12)',
            padding: '10px 10px 16px 10px',
            position: 'relative',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.quality.bases} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <XAxis dataKey="i" tick={false} axisLine={false} />
              <YAxis hide domain={[0, 45]} />
              <ReferenceLine y={30} stroke="rgba(248,113,113,0.9)" strokeDasharray="4 4" />
              <Bar dataKey="q" isAnimationActive={false} radius={[2, 2, 0, 0]}>
                {data.quality.bases.map((d: any, idx: number) => {
                  const fill = d.color;
                  return <React.Fragment key={idx}>{/* placeholder */}</React.Fragment>;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* overlay custom bars for exact colors */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              top: 10,
              bottom: 16,
              display: 'flex',
              alignItems: 'flex-end',
              gap: 6,
              pointerEvents: 'none',
            }}
          >
            {data.quality.bases.map((d: any, idx: number) => (
              <div
                key={idx}
                style={{
                  width: 16,
                  height: `${Math.max(6, Math.round((d.q / 45) * 100))}%`,
                  background: d.color,
                  borderRadius: 2,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              />
            ))}
          </div>

          <div
            data-eid="quality-threshold"
            style={{
              position: 'absolute',
              right: 10,
              bottom: 2,
              fontSize: 10,
              color: 'rgba(248,113,113,0.95)',
              fontWeight: 700,
            }}
          >
            {data.quality.thresholdLabel}
          </div>
        </div>
      </div>

      <div data-eid="regions-section" style={{ marginBottom: 14 }}>
        <div
          data-eid="regions-title"
          style={{
            fontWeight: 800,
            fontSize: 14,
            color: 'rgba(226,232,240,0.95)',
            letterSpacing: 0.2,
            marginBottom: 8,
          }}
        >
          Gene Regions
        </div>

        <div
          data-eid="regions-bar"
          style={{
            height: 22,
            borderRadius: 8,
            background: 'rgba(15,23,42,0.55)',
            border: '1px solid rgba(148,163,184,0.12)',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <div
            data-eid="region-exon1"
            style={{
              width: '20%',
              background: 'linear-gradient(180deg, rgba(99,102,241,0.95) 0%, rgba(99,102,241,0.70) 100%)',
              color: '#E0E7FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 900,
            }}
          >
            Exon 1
          </div>
          <div
            data-eid="region-intron1"
            style={{
              width: '25%',
              background: 'rgba(51,65,85,0.65)',
              color: 'rgba(203,213,225,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 800,
            }}
          >
            Intron 1
          </div>
          <div
            data-eid="region-exon2"
            style={{
              width: '15%',
              background: 'linear-gradient(180deg, rgba(99,102,241,0.95) 0%, rgba(99,102,241,0.70) 100%)',
              color: '#E0E7FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 900,
            }}
          >
            Exon 2
          </div>
          <div
            data-eid="region-intron2"
            style={{
              width: '25%',
              background: 'rgba(51,65,85,0.65)',
              color: 'rgba(203,213,225,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 800,
            }}
          >
            Intron 2
          </div>
          <div
            data-eid="region-exon3"
            style={{
              width: '15%',
              background: 'linear-gradient(180deg, rgba(99,102,241,0.95) 0%, rgba(99,102,241,0.70) 100%)',
              color: '#E0E7FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 900,
            }}
          >
            Exon 3
          </div>
        </div>

        <div
          data-eid="regions-legend"
          style={{
            marginTop: 8,
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(148,163,184,0.9)',
            fontSize: 10,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(99,102,241,0.95)' }} /> Exon
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(51,65,85,0.75)' }} /> Intron
          </span>
        </div>
      </div>

      <div
        data-eid="gene-info"
        style={{
          borderRadius: 14,
          background: 'rgba(15,23,42,0.55)',
          border: '1px solid rgba(148,163,184,0.12)',
          padding: 12,
        }}
      >
        <div
          data-eid="gene-info-name"
          style={{ fontWeight: 900, color: 'rgba(226,232,240,0.95)', marginBottom: 6 }}
        >
          {data.geneInfo.name}
        </div>

        <div
          data-eid="gene-info-function"
          style={{ fontSize: 11, color: 'rgba(148,163,184,0.92)', marginBottom: 4 }}
        >
          <span style={{ color: 'rgba(203,213,225,0.8)', fontWeight: 800 }}>Function:</span>{' '}
          {data.geneInfo.function}
        </div>
        <div
          data-eid="gene-info-pathway"
          style={{ fontSize: 11, color: 'rgba(148,163,184,0.92)', marginBottom: 4 }}
        >
          <span style={{ color: 'rgba(203,213,225,0.8)', fontWeight: 800 }}>Pathway:</span>{' '}
          {data.geneInfo.pathway}
        </div>
        <div
          data-eid="gene-info-disease"
          style={{ fontSize: 11, color: 'rgba(148,163,184,0.92)', marginBottom: 10 }}
        >
          <span style={{ color: 'rgba(203,213,225,0.8)', fontWeight: 800 }}>Disease:</span>{' '}
          {data.geneInfo.disease}
        </div>

        <div
          data-eid="gene-info-expression"
          style={{
            borderRadius: 10,
            background: 'rgba(2,6,23,0.35)',
            border: '1px solid rgba(148,163,184,0.12)',
            padding: '8px 10px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span
              data-eid="gene-info-expression-label"
              style={{ fontSize: 11, fontWeight: 800, color: 'rgba(203,213,225,0.85)' }}
            >
              Expression
            </span>
            <span
              data-eid="gene-info-expression-value"
              style={{ fontSize: 11, fontWeight: 900, color: '#86EFAC' }}
            >
              {data.geneInfo.expression.value}
            </span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: 'rgba(51,65,85,0.75)',
              overflow: 'hidden',
              border: '1px solid rgba(148,163,184,0.10)',
            }}
          >
            <div
              data-eid="gene-info-expression-fill"
              style={{
                height: '100%',
                width: data.geneInfo.expression.percent,
                background: 'linear-gradient(90deg, rgba(34,197,94,0.95) 0%, rgba(16,185,129,0.95) 100%)',
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}