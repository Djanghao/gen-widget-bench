import React from 'react';
import data from './data.json';

const GenomeSequenceViewer = () => {
  const { 
    gene, 
    rulerMarks, 
    legend, 
    tracks, 
    variants, 
    quality, 
    regions, 
    geneInfo 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '1200px',
        margin: '0 auto',
        lineHeight: '1.5'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div data-eid="gene-name" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f1f5f9' }}>
          {gene.name}
        </div>
        <div data-eid="gene-fullname" style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic' }}>
          {gene.fullname}
        </div>
        <span data-eid="chromosome-badge" style={{ 
          backgroundColor: '#1e293b', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '12px',
          border: '1px solid #334155'
        }}>
          {gene.chromosome}
        </span>
        <span data-eid="strand-badge" style={{ 
          backgroundColor: '#1e293b', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '12px',
          border: '1px solid #334155'
        }}>
          {gene.strand}
        </span>
        <span data-eid="length-badge" style={{ 
          backgroundColor: '#1e293b', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '12px',
          border: '1px solid #334155'
        }}>
          {gene.length}
        </span>
      </header>

      {/* Ruler */}
      <div data-eid="ruler" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '16px',
        padding: '0 8px',
        borderBottom: '1px solid #334155'
      }}>
        {rulerMarks.map((mark, idx) => (
          <span 
            key={idx} 
            data-eid={`ruler-mark-${idx}`} 
            style={{ 
              fontSize: '12px', 
              color: '#94a3b8',
              width: '40px',
              textAlign: 'center'
            }}
          >
            {mark}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div data-eid="legend" style={{ 
        display: 'flex', 
        gap: '24px', 
        marginBottom: '24px',
        padding: '8px 0',
        borderBottom: '1px solid #334155'
      }}>
        {legend.map((item, idx) => (
          <span 
            key={idx} 
            data-eid={`legend-${item.nucleotide.toLowerCase()}`} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '12px'
            }}
          >
            <span style={{ 
              width: '16px', 
              height: '16px', 
              backgroundColor: item.color,
              borderRadius: '3px',
              display: 'inline-block'
            }}></span>
            <span>{item.label}</span>
          </span>
        ))}
      </div>

      {/* Tracks Section */}
      <div data-eid="tracks-section" style={{ marginBottom: '32px' }}>
        <div data-eid="tracks-title" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          color: '#f1f5f9'
        }}>
          {tracks.title}
        </div>
        
        {tracks.tracks.map((track, trackIdx) => (
          <div 
            key={trackIdx} 
            data-eid={`track-${trackIdx}`} 
            style={{ 
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div data-eid={`track-${trackIdx}-label`} style={{ 
              fontSize: '14px', 
              fontWeight: 'bold',
              color: '#cbd5e1'
            }}>
              {track.label}
            </div>
            
            <div data-eid={`track-${trackIdx}-seq`} style={{ 
              display: 'flex', 
              gap: '2px',
              padding: '4px 0',
              minHeight: '32px'
            }}>
              {track.sequence.split('').map((nuc, nucIdx) => {
                const color = legend.find(l => l.nucleotide === nuc)?.color || '#64748b';
                return (
                  <span 
                    key={nucIdx} 
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: color,
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#0f172a'
                    }}
                  >
                    {nuc}
                  </span>
                );
              })}
            </div>
            
            <div data-eid={`track-${trackIdx}-coverage`} style={{ 
              fontSize: '12px', 
              color: '#94a3b8'
            }}>
              Coverage: {track.coverage}
            </div>
          </div>
        ))}
      </div>

      {/* Variants Section */}
      <div data-eid="variants-section" style={{ marginBottom: '32px' }}>
        <div data-eid="variants-title" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          color: '#f1f5f9'
        }}>
          {variants.title}
        </div>
        
        <span data-eid="variants-count" style={{ 
          fontSize: '14px', 
          color: '#60a5fa',
          marginBottom: '16px',
          display: 'block'
        }}>
          {variants.count}
        </span>
        
        {variants.variants.map((variant, idx) => (
          <div 
            key={idx} 
            data-eid={`variant-${idx}`} 
            style={{ 
              display: 'flex', 
              gap: '16px', 
              padding: '8px 0',
              borderBottom: idx < variants.variants.length - 1 ? '1px solid #334155' : 'none'
            }}
          >
            <span data-eid={`variant-${idx}-pos`} style={{ 
              fontSize: '14px', 
              color: '#94a3b8',
              minWidth: '60px'
            }}>
              {variant.position}
            </span>
            <span data-eid={`variant-${idx}-change`} style={{ 
              fontSize: '14px', 
              color: '#60a5fa',
              minWidth: '60px'
            }}>
              {variant.change}
            </span>
            <span data-eid={`variant-${idx}-type`} style={{ 
              fontSize: '14px', 
              color: '#94a3b8',
              minWidth: '100px'
            }}>
              {variant.type}
            </span>
            <span data-eid={`variant-${idx}-impact`} style={{ 
              fontSize: '14px', 
              color: variant.impact === 'Critical' ? '#ef4444' : variant.impact === 'High' ? '#f59e0b' : '#10b981',
              minWidth: '80px'
            }}>
              {variant.impact}
            </span>
            <span data-eid={`variant-${idx}-freq`} style={{ 
              fontSize: '14px', 
              color: '#94a3b8',
              minWidth: '80px'
            }}>
              AF: {variant.frequency}
            </span>
          </div>
        ))}
      </div>

      {/* Quality Section */}
      <div data-eid="quality-section" style={{ marginBottom: '32px' }}>
        <div data-eid="quality-title" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          color: '#f1f5f9'
        }}>
          {quality.title}
        </div>
        
        <span data-eid="quality-avg" style={{ 
          fontSize: '14px', 
          color: '#60a5fa',
          marginBottom: '16px',
          display: 'block'
        }}>
          {quality.average}
        </span>
        
        <div data-eid="quality-chart" style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          height: '120px', 
          gap: '2px',
          marginBottom: '16px',
          padding: '0 4px'
        }}>
          {quality.scores.map((score, idx) => {
            const height = Math.max(10, (score / 40) * 100);
            const color = score >= 30 ? '#10b981' : score >= 20 ? '#f59e0b' : '#ef4444';
            return (
              <div 
                key={idx} 
                style={{ 
                  width: '24px', 
                  backgroundColor: color,
                  borderRadius: '2px 2px 0 0',
                  height: `${height}px`,
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'center',
                  paddingBottom: '4px'
                }}
              >
                <span style={{ 
                  fontSize: '10px', 
                  color: '#f1f5f9',
                  fontWeight: 'bold'
                }}>
                  {score}
                </span>
              </div>
            );
          })}
        </div>
        
        <div data-eid="quality-threshold" style={{ 
          fontSize: '12px', 
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{ 
            width: '20px', 
            height: '2px', 
            backgroundColor: '#60a5fa',
            position: 'relative',
            top: '2px'
          }}></div>
          Q30 threshold
        </div>
      </div>

      {/* Regions Section */}
      <div data-eid="regions-section" style={{ marginBottom: '32px' }}>
        <div data-eid="regions-title" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          color: '#f1f5f9'
        }}>
          {regions.title}
        </div>
        
        <div data-eid="regions-bar" style={{ 
          display: 'flex', 
          height: '24px', 
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '16px',
          border: '1px solid #334155'
        }}>
          <div data-eid="region-exon1" style={{ 
            backgroundColor: '#8b5cf6',
            width: '30%',
            height: '100%'
          }}></div>
          <div data-eid="region-intron1" style={{ 
            backgroundColor: '#64748b',
            width: '25%',
            height: '100%'
          }}></div>
          <div data-eid="region-exon2" style={{ 
            backgroundColor: '#8b5cf6',
            width: '20%',
            height: '100%'
          }}></div>
          <div data-eid="region-intron2" style={{ 
            backgroundColor: '#64748b',
            width: '15%',
            height: '100%'
          }}></div>
          <div data-eid="region-exon3" style={{ 
            backgroundColor: '#8b5cf6',
            width: '10%',
            height: '100%'
          }}></div>
        </div>
        
        <div data-eid="regions-legend" style={{ 
          display: 'flex', 
          gap: '24px',
          fontSize: '12px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: '#8b5cf6',
              borderRadius: '2px'
            }}></span>
            Exon
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: '#64748b',
              borderRadius: '2px'
            }}></span>
            Intron
          </span>
        </div>
      </div>

      {/* Gene Info */}
      <div data-eid="gene-info" style={{ 
        backgroundColor: '#1e293b', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #334155'
      }}>
        <div data-eid="gene-info-name" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '12px',
          color: '#f1f5f9'
        }}>
          {geneInfo.name}
        </div>
        
        <div data-eid="gene-info-function" style={{ 
          fontSize: '14px', 
          marginBottom: '8px',
          color: '#cbd5e1'
        }}>
          Function: {geneInfo.function}
        </div>
        
        <div data-eid="gene-info-pathway" style={{ 
          fontSize: '14px', 
          marginBottom: '8px',
          color: '#cbd5e1'
        }}>
          Pathway: {geneInfo.pathway}
        </div>
        
        <div data-eid="gene-info-disease" style={{ 
          fontSize: '14px', 
          marginBottom: '16px',
          color: '#cbd5e1'
        }}>
          Disease: {geneInfo.disease}
        </div>
        
        <div data-eid="gene-info-expression" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px'
        }}>
          <span data-eid="gene-info-expression-label" style={{ 
            fontSize: '14px', 
            color: '#94a3b8'
          }}>
            Expression:
          </span>
          <span data-eid="gene-info-expression-value" style={{ 
            fontSize: '14px', 
            fontWeight: 'bold',
            color: '#60a5fa'
          }}>
            {geneInfo.expression.value}
          </span>
          <div data-eid="gene-info-expression-fill" style={{ 
            flex: 1,
            height: '12px',
            backgroundColor: '#334155',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              backgroundColor: '#10b981',
              width: `${geneInfo.expression.percent}%`,
              borderRadius: '6px'
            }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenomeSequenceViewer;