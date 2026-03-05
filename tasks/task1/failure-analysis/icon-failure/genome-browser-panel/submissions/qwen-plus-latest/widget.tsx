import React from 'react';
import { Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, LineChart } from 'recharts';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';
import data from './data.json';

const GenomeBrowserPanel = () => {
  const { header, ruler, genes, variants, coverage, gc, detail, footer } = data;

  return (
    <section 
      data-eid="root" 
      style={{
        backgroundColor: '#121212',
        color: '#e0e0e0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '16px',
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <h1 data-eid="region-label" style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>
          {header.regionLabel}
        </h1>
        <span data-eid="genome-build" style={{ fontSize: '14px', color: '#a0a0a0', backgroundColor: '#2d2d2d', padding: '2px 6px', borderRadius: '4px' }}>
          {header.genomeBuild}
        </span>
        <span data-eid="region-size" style={{ fontSize: '14px', color: '#a0a0a0' }}>
          {header.regionSize}
        </span>
      </header>

      {/* Ruler Section */}
      <div data-eid="ruler-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span data-eid="ruler-title" style={{ fontSize: '14px', fontWeight: 500, color: '#a0a0a0', marginBottom: '4px' }}>
          {ruler.title}
        </span>
        <div data-eid="ruler-bar" style={{
          display: 'flex',
          height: '24px',
          position: 'relative',
          backgroundColor: '#1e1e1e',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          {/* Tick marks and labels */}
          <span data-eid="ruler-tick-0" style={{
            position: 'absolute',
            left: '0%',
            top: '0',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: '#a0a0a0',
            marginTop: '4px'
          }}>
            {ruler.ticks[0]}
          </span>
          <span data-eid="ruler-tick-1" style={{
            position: 'absolute',
            left: '25%',
            top: '0',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: '#a0a0a0',
            marginTop: '4px'
          }}>
            {ruler.ticks[1]}
          </span>
          <span data-eid="ruler-tick-2" style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: '#a0a0a0',
            marginTop: '4px'
          }}>
            {ruler.ticks[2]}
          </span>
          <span data-eid="ruler-tick-3" style={{
            position: 'absolute',
            left: '75%',
            top: '0',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: '#a0a0a0',
            marginTop: '4px'
          }}>
            {ruler.ticks[3]}
          </span>
          <span data-eid="ruler-tick-4" style={{
            position: 'absolute',
            left: '100%',
            top: '0',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: '#a0a0a0',
            marginTop: '4px'
          }}>
            {ruler.ticks[4]}
          </span>
          {/* Ruler line */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '0',
            right: '0',
            height: '2px',
            backgroundColor: '#444'
          }} />
          {/* Tick lines */}
          {ruler.ticks.map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '0',
                left: `${i * 25}%`,
                width: '1px',
                height: '100%',
                backgroundColor: '#444'
              }}
            />
          ))}
        </div>
      </div>

      {/* Genes Section */}
      <div data-eid="genes-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span data-eid="genes-title" style={{ fontSize: '14px', fontWeight: 500, color: '#a0a0a0', marginBottom: '4px' }}>
          {genes.title}
        </span>
        <div data-eid="genes-track" style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '4px' }}>
          {genes.genes.map((gene, idx) => (
            <div key={idx} data-eid={`gene-${idx}`} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '24px'
            }}>
              <span data-eid={`gene-${idx}-label`} style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#bb8eff',
                minWidth: '100px',
                flexShrink: 0
              }}>
                {gene.label}
              </span>
              <div data-eid={`gene-${idx}-exons`} style={{
                flex: 1,
                height: '16px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                {/* Introns */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: '2px',
                  backgroundColor: '#444',
                  transform: 'translateY(-50%)'
                }} />
                {/* Exons */}
                {gene.exons.map((exon, exonIdx) => (
                  <div
                    key={exonIdx}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: `${exon.start}%`,
                      width: `${exon.width}%`,
                      height: '12px',
                      backgroundColor: '#bb8eff',
                      borderRadius: '2px',
                      transform: 'translateY(-50%)',
                      border: '1px solid #8a5cff'
                    }}
                  />
                ))}
              </div>
              <span data-eid={`gene-${idx}-strand`} style={{
                fontSize: '14px',
                color: gene.strand === '+' ? '#4caf50' : '#f44336',
                minWidth: '20px',
                textAlign: 'center',
                flexShrink: 0
              }}>
                {gene.strand === '+' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants Section */}
      <div data-eid="variants-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span data-eid="variants-title" style={{ fontSize: '14px', fontWeight: 500, color: '#a0a0a0', marginBottom: '4px' }}>
          {variants.title}
        </span>
        <div data-eid="variants-track" style={{
          display: 'flex',
          height: '24px',
          position: 'relative',
          backgroundColor: '#1e1e1e',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          {variants.variants.map((variant, idx) => (
            <span
              key={idx}
              data-eid={`variant-${idx}`}
              title={variant.tooltip}
              style={{
                position: 'absolute',
                left: `${variant.position}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '10px',
                height: '16px',
                backgroundColor: variant.color,
                borderRadius: '2px',
                cursor: 'pointer',
                boxShadow: '0 0 4px rgba(0,0,0,0.5)'
              }}
            />
          ))}
        </div>
        <div data-eid="variants-legend" style={{
          display: 'flex',
          gap: '12px',
          fontSize: '12px',
          color: '#a0a0a0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#2196f3', borderRadius: '2px' }} />
            <span>SNP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#ff9800', borderRadius: '2px' }} />
            <span>indel</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#f44336', borderRadius: '2px' }} />
            <span>pathogenic</span>
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div data-eid="coverage-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span data-eid="coverage-title" style={{ fontSize: '14px', fontWeight: 500, color: '#a0a0a0' }}>
            {coverage.title}
          </span>
          <span data-eid="coverage-avg-label" style={{ fontSize: '13px', color: '#81c784' }}>
            {coverage.avgLabel}
          </span>
        </div>
        <div data-eid="coverage-chart" style={{ height: '120px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={coverage.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="x" stroke="#777" tick={{ fontSize: 11 }} />
              <YAxis stroke="#777" tick={{ fontSize: 11 }} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#333', 
                  borderRadius: '4px',
                  color: '#e0e0e0'
                }} 
                labelStyle={{ color: '#bb8eff' }}
              />
              <Area 
                type="monotone" 
                dataKey="y" 
                stroke="#2196f3" 
                fill="url(#colorCoverage)" 
                strokeWidth={2} 
              />
              <defs>
                <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2196f3" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GC Section */}
      <div data-eid="gc-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span data-eid="gc-title" style={{ fontSize: '14px', fontWeight: 500, color: '#a0a0a0', marginBottom: '4px' }}>
          {gc.title}
        </span>
        <div data-eid="gc-chart" style={{ height: '120px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gc.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="x" stroke="#777" tick={{ fontSize: 11 }} />
              <YAxis stroke="#777" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#333', 
                  borderRadius: '4px',
                  color: '#e0e0e0'
                }} 
                labelStyle={{ color: '#bb8eff' }}
              />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#4caf50" 
                strokeWidth={2} 
                dot={{ r: 2, fill: '#4caf50' }}
                activeDot={{ r: 4, fill: '#81c784' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detail Section */}
      <div data-eid="detail-section" style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '6px',
        padding: '16px',
        border: '1px solid #333'
      }}>
        <h2 data-eid="detail-title" style={{ 
          margin: '0 0 12px 0', 
          fontSize: '16px', 
          fontWeight: 600, 
          color: '#ffffff' 
        }}>
          {detail.title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>rsID</div>
            <span data-eid="detail-rsid" style={{ fontSize: '14px', fontWeight: 500, color: '#bb8eff' }}>
              {detail.rsid}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Position</div>
            <span data-eid="detail-position" style={{ fontSize: '14px', fontWeight: 500 }}>
              {detail.position}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Ref/Alt</div>
            <span data-eid="detail-ref-alt" style={{ fontSize: '14px', fontWeight: 500 }}>
              {detail.refAlt}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Type</div>
            <span data-eid="detail-type" style={{ fontSize: '14px', fontWeight: 500, color: detail.typeColor }}>
              {detail.type}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Consequence</div>
            <span data-eid="detail-consequence" style={{ fontSize: '14px', fontWeight: 500, color: '#81c784' }}>
              {detail.consequence}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Gene</div>
            <span data-eid="detail-gene" style={{ fontSize: '14px', fontWeight: 500, color: '#bb8eff' }}>
              {detail.gene}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Protein</div>
            <span data-eid="detail-protein" style={{ fontSize: '14px', fontWeight: 500 }}>
              {detail.protein}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>ClinVar</div>
            <span data-eid="detail-clinvar" style={{ fontSize: '14px', fontWeight: 500, color: detail.clinvarColor }}>
              {detail.clinvar}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>gnomAD AF</div>
            <span data-eid="detail-gnomad-af" style={{ fontSize: '14px', fontWeight: 500 }}>
              {detail.gnomadAf}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>SIFT</div>
            <span data-eid="detail-sift" style={{ fontSize: '14px', fontWeight: 500, color: detail.siftColor }}>
              {detail.sift}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>PolyPhen-2</div>
            <span data-eid="detail-polyphen" style={{ fontSize: '14px', fontWeight: 500, color: detail.polyphenColor }}>
              {detail.polyphen}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>CADD Phred</div>
            <span data-eid="detail-cadd" style={{ fontSize: '14px', fontWeight: 500 }}>
              {detail.cadd}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Zygosity</div>
            <span data-eid="detail-zygosity" style={{ fontSize: '14px', fontWeight: 500, color: detail.zygosityColor }}>
              {detail.zygosity}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Quality</div>
            <span data-eid="detail-quality" style={{ fontSize: '14px', fontWeight: 500 }}>
              {detail.quality}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '4px' }}>Depth</div>
            <span data-eid="detail-depth" style={{ fontSize: '14px', fontWeight: 500 }}>
              {detail.depth}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '12px', 
        color: '#777',
        borderTop: '1px solid #333',
        paddingTop: '12px'
      }}>
        <span data-eid="footer-sample">
          Sample: {footer.sample}
        </span>
        <span data-eid="footer-pipeline">
          Pipeline: {footer.pipeline}
        </span>
      </footer>
    </section>
  );
};

// Helper components for strand icons
const ChevronRightIcon = () => (
  <ChevronDown size={14} style={{ transform: 'rotate(90deg)' }} />
);

const ChevronLeftIcon = () => (
  <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
);

export default GenomeBrowserPanel;