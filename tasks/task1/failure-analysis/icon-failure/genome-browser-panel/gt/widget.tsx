import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Dna, AlertCircle, Info, FileSearch } from 'lucide-react';
import data from './data.json';

const c = {
  bg: '#faf8f2',
  card: '#ffffff',
  border: 'rgba(203, 213, 225, 0.6)',
  text: '#334155',
  dim: '#94a3b8',
  accent: '#3b82f6',
  green: '#16a34a',
  red: '#dc2626',
  yellow: '#d97706',
  purple: '#7c3aed',
  cyan: '#0891b2',
  snp: '#3b82f6',
  indel: '#d97706',
  pathogenic: '#dc2626',
  benign: '#16a34a',
  uncertain: '#94a3b8',
};

const clinColors: Record<string, string> = {
  pathogenic: c.pathogenic,
  benign: c.benign,
  likely_benign: '#22c55e',
  uncertain: c.uncertain,
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: `linear-gradient(170deg, ${c.bg} 0%, #f5f0e8 100%)`,
        borderRadius: 14,
        color: c.text,
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        maxWidth: 480,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${c.border}`, paddingBottom: 10 }}>
        <div>
          <h1 data-eid="region-label" style={{ margin: 0, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, color: '#1e293b' }}>
            <Dna size={16} color={c.accent} />
            {data.region.chromosome}:{data.region.start.toLocaleString()}-{data.region.end.toLocaleString()}
          </h1>
          <span data-eid="region-size" style={{ fontSize: 11, color: c.dim, marginTop: 2, display: 'block' }}>
            {data.region.sizeKb} kb region
          </span>
        </div>
        <span data-eid="genome-build" style={{ fontSize: 10, color: c.accent, background: 'rgba(59,130,246,0.08)', padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>
          {data.region.build}
        </span>
      </header>

      {/* Ruler */}
      <div data-eid="ruler-section" style={{ padding: '4px 0' }}>
        <span data-eid="ruler-title" style={{ fontSize: 9, color: c.dim, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 4 }}>
          Coordinates
        </span>
        <div data-eid="ruler-bar" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', borderTop: `2px solid ${c.accent}`, paddingTop: 4 }}>
          {data.ruler.ticks.map((tick, i) => (
            <span
              key={i}
              data-eid={`ruler-tick-${i}`}
              style={{ fontSize: 8, color: c.dim, textAlign: 'center', position: 'relative' }}
            >
              <span style={{ position: 'absolute', top: -6, left: '50%', width: 1, height: 4, background: c.accent }} />
              {tick.label}
            </span>
          ))}
        </div>
      </div>

      {/* Gene Annotations */}
      <div data-eid="genes-section" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 10 }}>
        <span data-eid="genes-title" style={{ fontSize: 10, color: c.accent, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Gene Annotations (RefSeq)
        </span>
        <div data-eid="genes-track" style={{ position: 'relative', height: 80 }}>
          {data.genes.map((gene, i) => {
            const top = gene.row === 0 ? 0 : 42;
            return (
              <div
                key={i}
                data-eid={`gene-${i}`}
                style={{
                  position: 'absolute',
                  left: `${gene.startPct}%`,
                  width: `${gene.widthPct}%`,
                  top,
                  height: 32,
                }}
              >
                <span data-eid={`gene-${i}-label`} style={{ fontSize: 9, fontWeight: 700, color: gene.color, display: 'block', marginBottom: 2 }}>
                  {gene.name}
                </span>
                <div
                  data-eid={`gene-${i}-exons`}
                  style={{ position: 'relative', height: 12, display: 'flex', alignItems: 'center' }}
                >
                  {/* Intron line */}
                  <div style={{ position: 'absolute', top: 5, left: 0, right: 0, height: 2, background: `${gene.color}44` }} />
                  {/* Exon blocks */}
                  <div style={{ display: 'flex', gap: 1, width: '100%', position: 'relative', zIndex: 1 }}>
                    {gene.exonWidths.map((w, ei) => (
                      <div
                        key={ei}
                        style={{
                          flex: w,
                          height: 10,
                          background: gene.color,
                          borderRadius: 1,
                          opacity: 0.85,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span data-eid={`gene-${i}-strand`} style={{ fontSize: 8, color: c.dim }}>
                  {gene.strand === '+' ? '\u2192 sense' : '\u2190 antisense'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Variant Calls */}
      <div data-eid="variants-section" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 10 }}>
        <span data-eid="variants-title" style={{ fontSize: 10, color: c.accent, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Variant Calls
        </span>
        <div data-eid="variants-track" style={{ position: 'relative', height: 24, background: 'rgba(0,0,0,0.03)', borderRadius: 4 }}>
          {data.variants.map((v, i) => (
            <span
              key={i}
              data-eid={`variant-${i}`}
              style={{
                position: 'absolute',
                left: `${v.posPct}%`,
                top: v.type === 'SNP' ? 4 : 2,
                width: v.type === 'SNP' ? 8 : 10,
                height: v.type === 'SNP' ? 8 : 12,
                borderRadius: v.type === 'SNP' ? '50%' : 2,
                background: clinColors[v.clinical] || c.uncertain,
                border: v.clinical === 'pathogenic' ? `2px solid ${c.red}` : '1px solid transparent',
                boxShadow: v.clinical === 'pathogenic' ? `0 0 6px ${c.red}33` : 'none',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              title={`${v.type} ${v.ref}>${v.alt}`}
            />
          ))}
        </div>
        <div data-eid="variants-legend" style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 8, color: c.dim }}>
          <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: c.benign, marginRight: 3 }} />Benign</span>
          <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: c.uncertain, marginRight: 3 }} />VUS</span>
          <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: c.pathogenic, marginRight: 3 }} />Pathogenic</span>
          <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 1, background: c.indel, marginRight: 3 }} />Indel</span>
        </div>
      </div>

      {/* Coverage Chart */}
      <div data-eid="coverage-section" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span data-eid="coverage-title" style={{ fontSize: 10, color: c.accent, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
            Coverage Depth
          </span>
          <span data-eid="coverage-avg-label" style={{ fontSize: 9, color: c.dim }}>
            Avg: {data.avgCoverage}x
          </span>
        </div>
        <div data-eid="coverage-chart" style={{ width: '100%', height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.coverage}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="pos" tick={{ fontSize: 8, fill: c.dim }} stroke="transparent" />
              <YAxis tick={{ fontSize: 8, fill: c.dim }} stroke="transparent" />
              <Tooltip contentStyle={{ background: '#ffffff', border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 10, color: c.text }} />
              <ReferenceLine y={30} stroke={c.red} strokeDasharray="4 4" label={{ value: '30x', position: 'left', fontSize: 8, fill: c.red }} />
              <Area type="monotone" dataKey="depth" stroke={c.accent} fill="rgba(59,130,246,0.12)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GC Content */}
      <div data-eid="gc-section" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 10 }}>
        <span data-eid="gc-title" style={{ fontSize: 10, color: c.accent, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
          GC Content (%)
        </span>
        <div data-eid="gc-chart" style={{ width: '100%', height: 80 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.gcContent}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="pos" tick={{ fontSize: 8, fill: c.dim }} stroke="transparent" />
              <YAxis domain={[30, 70]} tick={{ fontSize: 8, fill: c.dim }} stroke="transparent" />
              <Tooltip contentStyle={{ background: '#ffffff', border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 10, color: c.text }} />
              <ReferenceLine y={50} stroke="rgba(0,0,0,0.1)" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="gc" stroke={c.green} strokeWidth={2} dot={{ r: 2, fill: c.green }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Selected Variant Detail */}
      <div data-eid="detail-section" style={{ background: '#fef3c7', border: `1px solid rgba(217, 119, 6, 0.3)`, borderRadius: 10, padding: 12 }}>
        <h2 data-eid="detail-title" style={{ fontSize: 12, fontWeight: 700, color: c.red, margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertCircle size={14} />
          Selected Variant Detail
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, fontSize: 10 }}>
          <span data-eid="detail-rsid" style={{ color: c.text }}>
            <span style={{ color: c.dim }}>rsID: </span>{data.selectedVariant.rsid}
          </span>
          <span data-eid="detail-position" style={{ color: c.text }}>
            <span style={{ color: c.dim }}>Pos: </span>{data.selectedVariant.position}
          </span>
          <span data-eid="detail-ref-alt" style={{ color: c.text }}>
            <span style={{ color: c.dim }}>Alleles: </span>
            <span style={{ color: c.green }}>{data.selectedVariant.ref}</span>
            {' > '}
            <span style={{ color: c.red }}>{data.selectedVariant.alt}</span>
          </span>
          <span data-eid="detail-type" style={{ color: c.text }}>
            <span style={{ color: c.dim }}>Type: </span>{data.selectedVariant.type}
          </span>
          <span data-eid="detail-consequence" style={{ color: c.yellow }}>
            <span style={{ color: c.dim }}>Consequence: </span>{data.selectedVariant.consequence}
          </span>
          <span data-eid="detail-gene" style={{ color: c.accent }}>
            <span style={{ color: c.dim }}>Gene: </span>{data.selectedVariant.gene}
          </span>
          <span data-eid="detail-protein" style={{ color: c.purple, fontWeight: 600 }}>
            <span style={{ color: c.dim, fontWeight: 400 }}>Protein: </span>{data.selectedVariant.protein}
          </span>
          <span data-eid="detail-clinvar" style={{ color: c.red, fontWeight: 700 }}>
            <span style={{ color: c.dim, fontWeight: 400 }}>ClinVar: </span>{data.selectedVariant.clinvar}
          </span>
          <span data-eid="detail-gnomad-af" style={{ color: c.text }}>
            <span style={{ color: c.dim }}>gnomAD AF: </span>{data.selectedVariant.gnomadAF}
          </span>
          <span data-eid="detail-sift" style={{ color: c.red }}>
            <span style={{ color: c.dim }}>SIFT: </span>{data.selectedVariant.sift}
          </span>
          <span data-eid="detail-polyphen" style={{ color: c.red }}>
            <span style={{ color: c.dim }}>PolyPhen: </span>{data.selectedVariant.polyphen}
          </span>
          <span data-eid="detail-cadd" style={{ color: c.yellow }}>
            <span style={{ color: c.dim }}>CADD: </span>{data.selectedVariant.cadd}
          </span>
          <span data-eid="detail-zygosity" style={{ color: c.text }}>
            <span style={{ color: c.dim }}>Zygosity: </span>{data.selectedVariant.zygosity}
          </span>
          <span data-eid="detail-quality" style={{ color: c.green }}>
            <span style={{ color: c.dim }}>Qual: </span>{data.selectedVariant.quality}
          </span>
          <span data-eid="detail-depth" style={{ color: c.accent }}>
            <span style={{ color: c.dim }}>Depth: </span>{data.selectedVariant.depth}x
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${c.border}`, paddingTop: 8, fontSize: 9, color: c.dim }}>
        <span data-eid="footer-sample">
          <FileSearch size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} />
          {data.sample}
        </span>
        <span data-eid="footer-pipeline">{data.pipeline}</span>
      </footer>
    </section>
  );
}
