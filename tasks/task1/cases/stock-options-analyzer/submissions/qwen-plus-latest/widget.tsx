import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import data from './data.json';

const StockOptionsAnalyzer = () => {
  const { 
    ticker, price, priceChange, expiryDate,
    ivRank, ivPercentile, hv30,
    optionsChain,
    payoff,
    greeks,
    riskMetrics,
    volSurface,
    lastUpdated, dataSource
  } = data;

  // Format price change with proper sign and color
  const formatPriceChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${((change / (price - change)) * 100).toFixed(2)}%)`;
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  // Generate volatility surface rows
  const renderVolSurfaceRow = (rowIndex: number, rowLabel: string) => {
    const row = volSurface[rowIndex];
    return (
      <div key={`volsurface-row-${rowIndex}`} data-eid={`volsurface-row-${rowIndex}`} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        <span style={{ width: '50px', fontSize: '12px', fontWeight: 500, color: '#9CA3AF' }}>{rowLabel}</span>
        {row.map((cell, cellIndex) => (
          <div 
            key={`cell-${rowIndex}-${cellIndex}`} 
            style={{ 
              width: '40px', 
              height: '24px', 
              backgroundColor: cell.color,
              borderRadius: '4px',
              border: '1px solid #374151'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section data-eid="root" style={{
      backgroundColor: '#111827',
      color: '#F9FAFB',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '1200px',
      margin: '0 auto',
      border: '1px solid #374151'
    }}>
      {/* Header */}
      <header data-eid="header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        borderBottom: '1px solid #374151',
        paddingBottom: '16px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 data-eid="ticker-symbol" style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            margin: 0,
            color: '#F9FAFB'
          }}>
            {ticker}
          </h1>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            <span data-eid="stock-price" style={{ 
              fontSize: '20px', 
              fontWeight: '600',
              color: '#F9FAFB'
            }}>
              ${price.toFixed(2)}
            </span>
            <span data-eid="price-change" style={{ 
              fontSize: '16px',
              fontWeight: '500',
              color: priceChange >= 0 ? '#10B981' : '#EF4444'
            }}>
              {formatPriceChange(priceChange)}
            </span>
          </div>
        </div>
        <span data-eid="expiry-label" style={{ 
          fontSize: '16px', 
          fontWeight: '500',
          color: '#9CA3AF'
        }}>
          Expiry: {expiryDate}
        </span>
      </header>

      {/* Underlying Info */}
      <div data-eid="underlying-info" style={{ 
        display: 'flex', 
        gap: '24px', 
        marginBottom: '24px',
        padding: '12px 16px',
        backgroundColor: '#1F2937',
        borderRadius: '6px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>IV Rank</span>
          <span data-eid="iv-rank" style={{ fontSize: '16px', fontWeight: '600', color: '#F9FAFB' }}>
            {ivRank}%
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>IV Percentile</span>
          <span data-eid="iv-percentile" style={{ fontSize: '16px', fontWeight: '600', color: '#F9FAFB' }}>
            {ivPercentile}%
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>HV (30D)</span>
          <span data-eid="hv-30" style={{ fontSize: '16px', fontWeight: '600', color: '#F9FAFB' }}>
            {hv30}%
          </span>
        </div>
      </div>

      {/* Options Chain Section */}
      <div data-eid="options-chain-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="chain-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#F9FAFB'
        }}>
          Options Chain
        </h2>
        
        {/* Headers */}
        <div data-eid="chain-header-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(11, 1fr)',
          fontWeight: '600',
          fontSize: '14px',
          color: '#9CA3AF',
          marginBottom: '8px',
          padding: '8px 0',
          borderBottom: '1px solid #374151'
        }}>
          <div style={{ gridColumn: '1 / 3' }}></div>
          <span data-eid="calls-label" style={{ textAlign: 'center' }}>CALLS</span>
          <span data-eid="strike-label" style={{ textAlign: 'center' }}>STRIKE</span>
          <span data-eid="puts-label" style={{ textAlign: 'center' }}>PUTS</span>
          <div style={{ gridColumn: '8 / 12' }}></div>
        </div>

        {/* Rows */}
        {optionsChain.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            data-eid={`call-row-${rowIndex}`} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(11, 1fr)',
              fontSize: '14px',
              padding: '8px 0',
              borderBottom: rowIndex === optionsChain.length - 1 ? 'none' : '1px solid #374151'
            }}
          >
            {/* CALLS */}
            <span data-eid={`call-${rowIndex}-bid`} style={{ textAlign: 'right', color: '#10B981' }}>
              ${row.call.bid.toFixed(2)}
            </span>
            <span data-eid={`call-${rowIndex}-ask`} style={{ textAlign: 'right', color: '#EF4444' }}>
              ${row.call.ask.toFixed(2)}
            </span>
            <span data-eid={`call-${rowIndex}-vol`} style={{ textAlign: 'right', color: '#9CA3AF' }}>
              {formatNumber(row.call.volume)}
            </span>
            <span data-eid={`call-${rowIndex}-oi`} style={{ textAlign: 'right', color: '#9CA3AF' }}>
              {formatNumber(row.call.openInterest)}
            </span>
            <span data-eid={`call-${rowIndex}-iv`} style={{ textAlign: 'right', color: '#9CA3AF' }}>
              {row.call.iv.toFixed(1)}%
            </span>
            
            {/* STRIKE */}
            <span data-eid={`strike-${rowIndex}`} style={{ 
              textAlign: 'center', 
              fontWeight: '600',
              color: rowIndex === 2 ? '#F9FAFB' : '#9CA3AF'
            }}>
              ${row.strike.toFixed(2)}
            </span>
            
            {/* PUTS */}
            <span data-eid={`put-${rowIndex}-bid`} style={{ textAlign: 'left', color: '#10B981' }}>
              ${row.put.bid.toFixed(2)}
            </span>
            <span data-eid={`put-${rowIndex}-ask`} style={{ textAlign: 'left', color: '#EF4444' }}>
              ${row.put.ask.toFixed(2)}
            </span>
            <span data-eid={`put-${rowIndex}-vol`} style={{ textAlign: 'left', color: '#9CA3AF' }}>
              {formatNumber(row.put.volume)}
            </span>
            <span data-eid={`put-${rowIndex}-oi`} style={{ textAlign: 'left', color: '#9CA3AF' }}>
              {formatNumber(row.put.openInterest)}
            </span>
            <span data-eid={`put-${rowIndex}-iv`} style={{ textAlign: 'left', color: '#9CA3AF' }}>
              {row.put.iv.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      {/* Payoff Section */}
      <div data-eid="payoff-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="payoff-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#F9FAFB'
        }}>
          P/L Payoff Diagram
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span data-eid="payoff-strategy-label" style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#9CA3AF',
            backgroundColor: '#1F2937',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            {payoff.strategy}
          </span>
          <span data-eid="payoff-max-profit" style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#10B981',
            backgroundColor: '#1F2937',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            Max Profit: ${payoff.maxProfit.toFixed(2)}
          </span>
          <span data-eid="payoff-max-loss" style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#EF4444',
            backgroundColor: '#1F2937',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            Max Loss: ${payoff.maxLoss.toFixed(2)}
          </span>
          <span data-eid="payoff-breakeven" style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#9CA3AF',
            backgroundColor: '#1F2937',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            Breakeven: ${payoff.breakeven.toFixed(2)}
          </span>
        </div>
        
        <div data-eid="payoff-chart" style={{ 
          height: '200px',
          backgroundColor: '#1F2937',
          borderRadius: '6px',
          padding: '12px'
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payoff.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="price" 
                stroke="#9CA3AF" 
                fontSize={12} 
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12} 
                tick={{ fill: '#9CA3AF' }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151',
                  borderRadius: '6px'
                }} 
                itemStyle={{ color: '#F9FAFB' }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 3, fill: '#3B82F6' }}
                activeDot={{ r: 5, fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Greeks Section */}
      <div data-eid="greeks-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="greeks-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#F9FAFB'
        }}>
          Portfolio Greeks
        </h2>
        
        <div data-eid="greeks-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px'
        }}>
          <div data-eid="greek-delta" style={{ 
            backgroundColor: '#1F2937', 
            padding: '12px', 
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span data-eid="greek-delta-label" style={{ 
              fontSize: '12px', 
              color: '#9CA3AF',
              display: 'block',
              marginBottom: '4px'
            }}>
              Delta
            </span>
            <span data-eid="greek-delta-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: greeks.delta >= 0 ? '#10B981' : '#EF4444'
            }}>
              {greeks.delta.toFixed(3)}
            </span>
          </div>
          
          <div data-eid="greek-gamma" style={{ 
            backgroundColor: '#1F2937', 
            padding: '12px', 
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span data-eid="greek-gamma-label" style={{ 
              fontSize: '12px', 
              color: '#9CA3AF',
              display: 'block',
              marginBottom: '4px'
            }}>
              Gamma
            </span>
            <span data-eid="greek-gamma-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#F9FAFB'
            }}>
              {greeks.gamma.toFixed(3)}
            </span>
          </div>
          
          <div data-eid="greek-theta" style={{ 
            backgroundColor: '#1F2937', 
            padding: '12px', 
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span data-eid="greek-theta-label" style={{ 
              fontSize: '12px', 
              color: '#9CA3AF',
              display: 'block',
              marginBottom: '4px'
            }}>
              Theta
            </span>
            <span data-eid="greek-theta-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: greeks.theta >= 0 ? '#10B981' : '#EF4444'
            }}>
              {greeks.theta.toFixed(3)}
            </span>
          </div>
          
          <div data-eid="greek-vega" style={{ 
            backgroundColor: '#1F2937', 
            padding: '12px', 
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span data-eid="greek-vega-label" style={{ 
              fontSize: '12px', 
              color: '#9CA3AF',
              display: 'block',
              marginBottom: '4px'
            }}>
              Vega
            </span>
            <span data-eid="greek-vega-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#F9FAFB'
            }}>
              {greeks.vega.toFixed(3)}
            </span>
          </div>
          
          <div data-eid="greek-rho" style={{ 
            backgroundColor: '#1F2937', 
            padding: '12px', 
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span data-eid="greek-rho-label" style={{ 
              fontSize: '12px', 
              color: '#9CA3AF',
              display: 'block',
              marginBottom: '4px'
            }}>
              Rho
            </span>
            <span data-eid="greek-rho-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: greeks.rho >= 0 ? '#10B981' : '#EF4444'
            }}>
              {greeks.rho.toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      {/* Risk Section */}
      <div data-eid="risk-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="risk-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#F9FAFB'
        }}>
          Risk Metrics
        </h2>
        
        <div data-eid="risk-pop" style={{ 
          marginBottom: '16px',
          backgroundColor: '#1F2937',
          padding: '12px',
          borderRadius: '6px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span data-eid="risk-pop-label" style={{ 
              fontSize: '14px', 
              color: '#9CA3AF',
              fontWeight: '500'
            }}>
              Probability of Profit
            </span>
            <span data-eid="risk-pop-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: riskMetrics.pop >= 50 ? '#10B981' : '#EF4444'
            }}>
              {riskMetrics.pop.toFixed(1)}%
            </span>
          </div>
          <div data-eid="risk-pop-bar" style={{ 
            height: '8px', 
            backgroundColor: '#374151', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${riskMetrics.pop}%`,
              backgroundColor: riskMetrics.pop >= 50 ? '#10B981' : '#EF4444',
              borderRadius: '4px'
            }} />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div data-eid="risk-expected" style={{ 
            backgroundColor: '#1F2937',
            padding: '12px',
            borderRadius: '6px'
          }}>
            <span data-eid="risk-expected-label" style={{ 
              fontSize: '14px', 
              color: '#9CA3AF',
              fontWeight: '500',
              display: 'block',
              marginBottom: '4px'
            }}>
              Expected Value
            </span>
            <span data-eid="risk-expected-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: riskMetrics.expected >= 0 ? '#10B981' : '#EF4444'
            }}>
              ${riskMetrics.expected.toFixed(2)}
            </span>
          </div>
          
          <div data-eid="risk-ratio" style={{ 
            backgroundColor: '#1F2937',
            padding: '12px',
            borderRadius: '6px'
          }}>
            <span data-eid="risk-ratio-label" style={{ 
              fontSize: '14px', 
              color: '#9CA3AF',
              fontWeight: '500',
              display: 'block',
              marginBottom: '4px'
            }}>
              Risk/Reward Ratio
            </span>
            <span data-eid="risk-ratio-value" style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#F9FAFB'
            }}>
              {riskMetrics.riskRewardRatio.toFixed(2)}:1
            </span>
          </div>
        </div>
      </div>

      {/* Volatility Surface Section */}
      <div data-eid="volsurface-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="volsurface-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#F9FAFB'
        }}>
          Volatility Surface
        </h2>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div data-eid="volsurface-grid" style={{ 
            flex: 1,
            backgroundColor: '#1F2937',
            padding: '12px',
            borderRadius: '6px'
          }}>
            {renderVolSurfaceRow(0, '7 DTE')}
            {renderVolSurfaceRow(1, '14 DTE')}
            {renderVolSurfaceRow(2, '30 DTE')}
            {renderVolSurfaceRow(3, '60 DTE')}
            {renderVolSurfaceRow(4, '90 DTE')}
          </div>
          
          <div data-eid="volsurface-legend" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            minWidth: '120px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '8px' 
            }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: '#EF4444',
                marginRight: '8px',
                borderRadius: '3px'
              }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>High</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '8px' 
            }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: '#F59E0B',
                marginRight: '8px',
                borderRadius: '3px'
              }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Medium</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: '#10B981',
                marginRight: '8px',
                borderRadius: '3px'
              }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ 
        borderTop: '1px solid #374151',
        paddingTop: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#9CA3AF'
      }}>
        <span data-eid="footer-timestamp">
          Last updated: {lastUpdated}
        </span>
        <span data-eid="footer-source">
          Data source: {dataSource}
        </span>
      </footer>
    </section>
  );
};

export default StockOptionsAnalyzer;