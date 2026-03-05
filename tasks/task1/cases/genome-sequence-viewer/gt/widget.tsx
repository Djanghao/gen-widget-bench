import { Dna, FlaskConical } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import data from './data.json'

type Track = { label: string; sequence: string; coverage: string }
type Variant = { position: number; change: string; type: string; impact: string; alleleFreq: number }
type Region = { id: string; label: string; widthPct: number; type: string }
type GenomeData = {
  geneName: string
  geneFullName: string
  chromosome: string
  strand: string
  sequenceLength: string
  rulerMarks: number[]
  tracks: Track[]
  variants: Variant[]
  qualityScores: number[]
  qualityAvg: number
  regions: Region[]
  geneInfo: {
    name: string
    fullName: string
    function: string
    pathway: string
    disease: string
    expressionLevel: number
  }
}

const genome = data as GenomeData

const nucleotideColors: Record<string, string> = {
  A: '#4ade80',
  T: '#f87171',
  G: '#fbbf24',
  C: '#60a5fa',
}

const impactColors: Record<string, { bg: string; border: string; text: string }> = {
  High: { bg: 'rgba(251,146,60,0.15)', border: '#fb923c', text: '#fdba74' },
  Low: { bg: 'rgba(34,197,94,0.15)', border: '#22c55e', text: '#86efac' },
  Critical: { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', text: '#fca5a5' },
}

export default function Widget() {
  const qualityData = genome.qualityScores.map((v, i) => ({ i: i + 1, q: v }))

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0a1628 0%, #121a30 50%, #0a1628 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 460,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
      >
        <Dna size={20} color="#818cf8" />
        <div style={{ flex: 1 }}>
          <div data-eid="gene-name" style={{ fontSize: 18, fontWeight: 700 }}>
            {genome.geneName}
          </div>
          <div data-eid="gene-fullname" style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>
            {genome.geneFullName}
          </div>
        </div>
        <span
          data-eid="chromosome-badge"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
          }}
        >
          {genome.chromosome}
        </span>
        <span
          data-eid="strand-badge"
          style={{
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.3)',
            borderRadius: 12,
            color: '#fcd34d',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
          }}
        >
          {genome.strand}
        </span>
        <span
          data-eid="length-badge"
          style={{
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 12,
            color: '#4ade80',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
          }}
        >
          {genome.sequenceLength}
        </span>
      </header>

      <div
        data-eid="ruler"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '4px 8px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 6,
          borderBottom: '2px solid rgba(129,140,248,0.2)',
        }}
      >
        {genome.rulerMarks.map((mark, i) => (
          <span
            key={i}
            data-eid={`ruler-mark-${i}`}
            style={{ fontSize: 9, color: '#64748b', fontWeight: 600, fontFamily: 'monospace' }}
          >
            {mark}
          </span>
        ))}
      </div>

      <div
        data-eid="legend"
        style={{ display: 'flex', gap: 12, justifyContent: 'center' }}
      >
        {(['A', 'T', 'G', 'C'] as const).map((nt) => (
          <span
            key={nt}
            data-eid={`legend-${nt.toLowerCase()}`}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <div style={{
              width: 10, height: 10, borderRadius: 2,
              background: `${nucleotideColors[nt]}30`,
              border: `1px solid ${nucleotideColors[nt]}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 7, fontWeight: 700, color: nucleotideColors[nt], fontFamily: 'monospace',
            }}>
              {nt}
            </div>
            <span style={{ fontSize: 8, color: '#94a3b8' }}>
              {nt === 'A' ? 'Adenine' : nt === 'T' ? 'Thymine' : nt === 'G' ? 'Guanine' : 'Cytosine'}
            </span>
          </span>
        ))}
      </div>

      <div data-eid="tracks-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="tracks-title" style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1' }}>
          Sequence Alignment
        </div>
        {genome.tracks.map((track, ti) => (
          <div
            key={ti}
            data-eid={`track-${ti}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <div
              data-eid={`track-${ti}-label`}
              style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, width: 55, flexShrink: 0, textAlign: 'right' }}
            >
              {track.label}
            </div>
            <div
              data-eid={`track-${ti}-seq`}
              style={{ display: 'flex', gap: 1, flex: 1, overflow: 'hidden' }}
            >
              {track.sequence.split('').map((nt, ni) => {
                const isVariantPos = genome.variants.some(v => v.position === ni + 1) && ti > 0
                return (
                  <div
                    key={ni}
                    style={{
                      width: 17, height: 18,
                      background: isVariantPos ? `${nucleotideColors[nt]}40` : `${nucleotideColors[nt]}20`,
                      border: isVariantPos ? `1px solid ${nucleotideColors[nt]}` : '1px solid transparent',
                      borderRadius: 3,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, fontWeight: 700, color: nucleotideColors[nt] || '#94a3b8', fontFamily: 'monospace',
                    }}
                  >
                    {nt}
                  </div>
                )
              })}
            </div>
            <div
              data-eid={`track-${ti}-coverage`}
              style={{ fontSize: 8, color: '#64748b', fontWeight: 600, width: 28, flexShrink: 0, textAlign: 'right' }}
            >
              {track.coverage}
            </div>
          </div>
        ))}
      </div>

      <div data-eid="variants-section" style={{ display: 'grid', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div data-eid="variants-title" style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1' }}>
            Variant Annotations
          </div>
          <span
            data-eid="variants-count"
            style={{
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 8,
              color: '#fca5a5',
              fontSize: 9,
              fontWeight: 600,
              padding: '1px 6px',
            }}
          >
            {genome.variants.length} variants
          </span>
        </div>
        {genome.variants.map((v, vi) => {
          const ic = impactColors[v.impact] || impactColors.Low
          return (
            <div
              key={vi}
              data-eid={`variant-${vi}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: ic.bg, border: `1px solid ${ic.border}33`,
                borderRadius: 8, padding: '6px 8px',
              }}
            >
              <span
                data-eid={`variant-${vi}-pos`}
                style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', fontFamily: 'monospace' }}
              >
                pos {v.position}
              </span>
              <span
                data-eid={`variant-${vi}-change`}
                style={{
                  fontSize: 9, fontWeight: 700, color: '#f1f5f9',
                  background: 'rgba(255,255,255,0.08)', borderRadius: 4, padding: '2px 5px', fontFamily: 'monospace',
                }}
              >
                {v.change}
              </span>
              <span data-eid={`variant-${vi}-type`} style={{ fontSize: 9, color: '#94a3b8', flex: 1 }}>
                {v.type}
              </span>
              <span
                data-eid={`variant-${vi}-freq`}
                style={{ fontSize: 8, color: '#64748b', fontFamily: 'monospace' }}
              >
                AF: {v.alleleFreq}
              </span>
              <span
                data-eid={`variant-${vi}-impact`}
                style={{
                  fontSize: 8, fontWeight: 700, color: ic.text,
                  background: ic.bg, border: `1px solid ${ic.border}55`,
                  borderRadius: 6, padding: '2px 5px',
                }}
              >
                {v.impact}
              </span>
            </div>
          )
        })}
      </div>

      <div data-eid="quality-section" style={{ display: 'grid', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div data-eid="quality-title" style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1' }}>
            Quality Scores
          </div>
          <span
            data-eid="quality-avg"
            style={{ fontSize: 9, color: '#4ade80', fontWeight: 600 }}
          >
            Avg Q{genome.qualityAvg}
          </span>
        </div>
        <div data-eid="quality-chart" style={{ height: 70, width: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height={70}>
            <BarChart data={qualityData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <ReferenceLine y={30} stroke="#ef444466" strokeDasharray="3 3" />
              <Bar dataKey="q" radius={[2, 2, 0, 0]}>
                {qualityData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.q >= 35 ? '#4ade80' : entry.q >= 25 ? '#fbbf24' : '#ef4444'}
                    fillOpacity={0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div data-eid="quality-threshold" style={{ fontSize: 8, color: '#ef4444', textAlign: 'right', opacity: 0.7 }}>
          Q30 threshold
        </div>
      </div>

      <div data-eid="regions-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="regions-title" style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1' }}>
          Gene Regions
        </div>
        <div
          data-eid="regions-bar"
          style={{ display: 'flex', height: 20, borderRadius: 6, overflow: 'hidden' }}
        >
          {genome.regions.map((r) => (
            <div
              key={r.id}
              data-eid={`region-${r.id}`}
              style={{
                width: `${r.widthPct}%`, height: '100%',
                background: r.type === 'exon' ? 'linear-gradient(180deg, #818cf8, #6366f1)' : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 7, fontWeight: 600,
                color: r.type === 'exon' ? '#e0e7ff' : '#64748b',
                borderRight: '1px solid rgba(0,0,0,0.3)',
              }}
            >
              {r.label}
            </div>
          ))}
        </div>
        <div data-eid="regions-legend" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#818cf8' }} />
            <span style={{ fontSize: 9, color: '#94a3b8' }}>Exon</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 9, color: '#94a3b8' }}>Intron</span>
          </div>
        </div>
      </div>

      <div
        data-eid="gene-info"
        style={{
          background: 'rgba(129,140,248,0.08)',
          border: '1px solid rgba(129,140,248,0.2)',
          borderRadius: 12, padding: 12, display: 'grid', gap: 5,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <FlaskConical size={14} color="#818cf8" />
          <div data-eid="gene-info-name" style={{ fontSize: 13, fontWeight: 700, color: '#c7d2fe' }}>
            {genome.geneInfo.fullName}
          </div>
        </div>
        <div data-eid="gene-info-function" style={{ fontSize: 10, color: '#94a3b8' }}>
          Function: {genome.geneInfo.function}
        </div>
        <div data-eid="gene-info-pathway" style={{ fontSize: 10, color: '#94a3b8' }}>
          Pathway: {genome.geneInfo.pathway}
        </div>
        <div data-eid="gene-info-disease" style={{ fontSize: 10, color: '#94a3b8' }}>
          Disease: {genome.geneInfo.disease}
        </div>
        <div data-eid="gene-info-expression">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span data-eid="gene-info-expression-label" style={{ fontSize: 9, color: '#64748b' }}>
              Expression Level
            </span>
            <span data-eid="gene-info-expression-value" style={{ fontSize: 9, fontWeight: 700, color: '#4ade80' }}>
              {genome.geneInfo.expressionLevel}% (High)
            </span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
            <div
              data-eid="gene-info-expression-fill"
              style={{
                width: `${genome.geneInfo.expressionLevel}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
