import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Tag } from 'lucide-react';
import data from './data.json';

const RealEstateCompareWidget = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const renderSparkline = (points: number[], eid: string) => {
    const dataPoints = points.map((value, index) => ({ x: index, y: value }));
    
    return (
      <div data-eid={eid} style={{ 
        width: '100%', 
        height: '40px',
        marginTop: '8px'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataPoints}>
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 4, fill: '#3b82f6' }} 
            />
            <XAxis dataKey="x" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                borderColor: '#334155',
                borderRadius: '8px'
              }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#f1f5f9',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '24px',
        borderRadius: '16px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px' }}>
        <div data-eid="title" style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          marginBottom: '4px',
          lineHeight: '1.2'
        }}>
          Property Comparison
        </div>
        <div data-eid="subtitle" style={{ 
          fontSize: '16px', 
          color: '#94a3b8', 
          marginBottom: '12px',
          lineHeight: '1.4'
        }}>
          3 Active Listings
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span 
            data-eid="location-badge"
            style={{
              backgroundColor: '#1e40af',
              color: '#e0f2fe',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Tag size={14} />
            San Francisco, CA
          </span>
          <span 
            data-eid="price-range-badge"
            style={{
              backgroundColor: '#059669',
              color: '#d1fae5',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            $1.1M - $1.5M
          </span>
        </div>
      </header>

      {/* Cards Row */}
      <div data-eid="cards-row" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Property 0 */}
        <div data-eid="prop-0" style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}>
          <div data-eid="prop-0-image" style={{
            height: '160px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            position: 'relative'
          }}>
            <span 
              data-eid="prop-0-status"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Active
            </span>
          </div>
          
          <div style={{ padding: '16px' }}>
            <div data-eid="prop-0-address" style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              marginBottom: '4px',
              lineHeight: '1.3'
            }}>
              742 Evergreen Terrace
            </div>
            <div data-eid="prop-0-neighborhood" style={{ 
              fontSize: '14px', 
              color: '#94a3b8', 
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              Sunset District
            </div>
            
            <div data-eid="prop-0-price" style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '4px',
              lineHeight: '1.2'
            }}>
              {formatPrice(data.properties[0].price)}
            </div>
            <span data-eid="prop-0-ppsqft" style={{ 
              fontSize: '14px', 
              color: '#64748b', 
              marginBottom: '16px',
              display: 'block'
            }}>
              {data.properties[0].pricePerSqft}/sqft
            </span>
            
            <div data-eid="prop-0-stats" style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '16px',
              fontSize: '14px',
              color: '#cbd5e1'
            }}>
              <span data-eid="prop-0-beds">{data.properties[0].beds}</span>
              <span data-eid="prop-0-baths">{data.properties[0].baths}</span>
              <span data-eid="prop-0-sqft">{formatNumber(data.properties[0].sqft)} sqft</span>
            </div>
            
            <div data-eid="prop-0-sparkline">
              {renderSparkline(data.properties[0].priceHistory, 'prop-0-sparkline')}
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div data-eid="prop-0-feat-0" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Year Built</span>
                <span>{data.properties[0].yearBuilt}</span>
              </div>
              <div data-eid="prop-0-feat-1" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Lot Size</span>
                <span>{formatNumber(data.properties[0].lotSize)} sqft</span>
              </div>
              <div data-eid="prop-0-feat-2" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>HOA</span>
                <span>${formatNumber(data.properties[0].hoa)}/mo</span>
              </div>
              <div data-eid="prop-0-feat-3" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Taxes</span>
                <span>${formatNumber(data.properties[0].taxes)}/yr</span>
              </div>
              <div data-eid="prop-0-feat-4" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Days on Market</span>
                <span>{data.properties[0].daysOnMarket}</span>
              </div>
              <div data-eid="prop-0-feat-5" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                fontSize: '14px'
              }}>
                <span>Walk Score</span>
                <span>{data.properties[0].walkScore}</span>
              </div>
            </div>
            
            <div data-eid="prop-0-score" style={{ 
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid #334155'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '6px',
                fontSize: '14px'
              }}>
                <span data-eid="prop-0-score-label">Overall Score</span>
                <span data-eid="prop-0-score-value">{data.properties[0].score}%</span>
              </div>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#334155', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div 
                  data-eid="prop-0-score-bar"
                  style={{ 
                    height: '100%', 
                    width: `${data.properties[0].score}%`, 
                    backgroundColor: '#3b82f6',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property 1 */}
        <div data-eid="prop-1" style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}>
          <div data-eid="prop-1-image" style={{
            height: '160px',
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            position: 'relative'
          }}>
            <span 
              data-eid="prop-1-status"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Zap size={12} />
              Hot
            </span>
          </div>
          
          <div style={{ padding: '16px' }}>
            <div data-eid="prop-1-address" style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              marginBottom: '4px',
              lineHeight: '1.3'
            }}>
              1401 Mission St
            </div>
            <div data-eid="prop-1-neighborhood" style={{ 
              fontSize: '14px', 
              color: '#94a3b8', 
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              SoMa
            </div>
            
            <div data-eid="prop-1-price" style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '4px',
              lineHeight: '1.2'
            }}>
              {formatPrice(data.properties[1].price)}
            </div>
            <span data-eid="prop-1-ppsqft" style={{ 
              fontSize: '14px', 
              color: '#64748b', 
              marginBottom: '16px',
              display: 'block'
            }}>
              {data.properties[1].pricePerSqft}/sqft
            </span>
            
            <div data-eid="prop-1-stats" style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '16px',
              fontSize: '14px',
              color: '#cbd5e1'
            }}>
              <span data-eid="prop-1-beds">{data.properties[1].beds}</span>
              <span data-eid="prop-1-baths">{data.properties[1].baths}</span>
              <span data-eid="prop-1-sqft">{formatNumber(data.properties[1].sqft)} sqft</span>
            </div>
            
            <div data-eid="prop-1-sparkline">
              {renderSparkline(data.properties[1].priceHistory, 'prop-1-sparkline')}
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div data-eid="prop-1-feat-0" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Year Built</span>
                <span>{data.properties[1].yearBuilt}</span>
              </div>
              <div data-eid="prop-1-feat-1" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Lot Size</span>
                <span>{formatNumber(data.properties[1].lotSize)} sqft</span>
              </div>
              <div data-eid="prop-1-feat-2" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>HOA</span>
                <span>${formatNumber(data.properties[1].hoa)}/mo</span>
              </div>
              <div data-eid="prop-1-feat-3" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Taxes</span>
                <span>${formatNumber(data.properties[1].taxes)}/yr</span>
              </div>
              <div data-eid="prop-1-feat-4" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Days on Market</span>
                <span>{data.properties[1].daysOnMarket}</span>
              </div>
              <div data-eid="prop-1-feat-5" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                fontSize: '14px'
              }}>
                <span>Walk Score</span>
                <span>{data.properties[1].walkScore}</span>
              </div>
            </div>
            
            <div data-eid="prop-1-score" style={{ 
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid #334155'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '6px',
                fontSize: '14px'
              }}>
                <span data-eid="prop-1-score-label">Overall Score</span>
                <span data-eid="prop-1-score-value">{data.properties[1].score}%</span>
              </div>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#334155', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div 
                  data-eid="prop-1-score-bar"
                  style={{ 
                    height: '100%', 
                    width: `${data.properties[1].score}%`, 
                    backgroundColor: '#059669',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property 2 */}
        <div data-eid="prop-2" style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}>
          <div data-eid="prop-2-image" style={{
            height: '160px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
            position: 'relative'
          }}>
            <span 
              data-eid="prop-2-status"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#ea580c',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <TrendingDown size={12} />
              Price Cut
            </span>
          </div>
          
          <div style={{ padding: '16px' }}>
            <div data-eid="prop-2-address" style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              marginBottom: '4px',
              lineHeight: '1.3'
            }}>
              88 Pacific Heights Blvd
            </div>
            <div data-eid="prop-2-neighborhood" style={{ 
              fontSize: '14px', 
              color: '#94a3b8', 
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              Pacific Heights
            </div>
            
            <div data-eid="prop-2-price" style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '4px',
              lineHeight: '1.2'
            }}>
              {formatPrice(data.properties[2].price)}
            </div>
            <span data-eid="prop-2-ppsqft" style={{ 
              fontSize: '14px', 
              color: '#64748b', 
              marginBottom: '16px',
              display: 'block'
            }}>
              {data.properties[2].pricePerSqft}/sqft
            </span>
            
            <div data-eid="prop-2-stats" style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '16px',
              fontSize: '14px',
              color: '#cbd5e1'
            }}>
              <span data-eid="prop-2-beds">{data.properties[2].beds}</span>
              <span data-eid="prop-2-baths">{data.properties[2].baths}</span>
              <span data-eid="prop-2-sqft">{formatNumber(data.properties[2].sqft)} sqft</span>
            </div>
            
            <div data-eid="prop-2-sparkline">
              {renderSparkline(data.properties[2].priceHistory, 'prop-2-sparkline')}
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div data-eid="prop-2-feat-0" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Year Built</span>
                <span>{data.properties[2].yearBuilt}</span>
              </div>
              <div data-eid="prop-2-feat-1" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Lot Size</span>
                <span>{formatNumber(data.properties[2].lotSize)} sqft</span>
              </div>
              <div data-eid="prop-2-feat-2" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>HOA</span>
                <span>${formatNumber(data.properties[2].hoa)}/mo</span>
              </div>
              <div data-eid="prop-2-feat-3" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Taxes</span>
                <span>${formatNumber(data.properties[2].taxes)}/yr</span>
              </div>
              <div data-eid="prop-2-feat-4" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                borderBottom: '1px solid #334155',
                fontSize: '14px'
              }}>
                <span>Days on Market</span>
                <span>{data.properties[2].daysOnMarket}</span>
              </div>
              <div data-eid="prop-2-feat-5" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0',
                fontSize: '14px'
              }}>
                <span>Walk Score</span>
                <span>{data.properties[2].walkScore}</span>
              </div>
            </div>
            
            <div data-eid="prop-2-score" style={{ 
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid #334155'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '6px',
                fontSize: '14px'
              }}>
                <span data-eid="prop-2-score-label">Overall Score</span>
                <span data-eid="prop-2-score-value">{data.properties[2].score}%</span>
              </div>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#334155', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div 
                  data-eid="prop-2-score-bar"
                  style={{ 
                    height: '100%', 
                    width: `${data.properties[2].score}%`, 
                    backgroundColor: '#7c3aed',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Section */}
      <div data-eid="verdict" style={{ 
        backgroundColor: '#0f172a',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center'
      }}>
        <div data-eid="verdict-title" style={{ 
          fontSize: '20px', 
          fontWeight: '700', 
          marginBottom: '12px',
          color: '#60a5fa'
        }}>
          Best Value
        </div>
        <div data-eid="verdict-winner" style={{ 
          fontSize: '24px', 
          fontWeight: '800', 
          marginBottom: '12px',
          color: '#f1f5f9'
        }}>
          1401 Mission St
        </div>
        <div data-eid="verdict-reason" style={{ 
          fontSize: '16px', 
          color: '#94a3b8', 
          marginBottom: '20px',
          lineHeight: '1.5',
          maxWidth: '600px',
          margin: '0 auto 20px'
        }}>
          Highest overall score with strong price appreciation potential and excellent walkability in a high-demand neighborhood.
        </div>
        
        <div data-eid="verdict-score-bar" style={{ 
          maxWidth: '400px',
          margin: '0 auto',
          height: '12px',
          backgroundColor: '#334155',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div 
            data-eid="verdict-score-fill"
            style={{ 
              height: '100%', 
              width: `${data.verdict.score}%`, 
              backgroundColor: '#059669',
              borderRadius: '6px',
              transition: 'width 0.5s ease'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default RealEstateCompareWidget;