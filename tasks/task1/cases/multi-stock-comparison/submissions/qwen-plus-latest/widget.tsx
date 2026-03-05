import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import data from './data.json';

const MultiStockComparisonWidget = () => {
  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getChangeColor = (value) => {
    return value >= 0 ? '#10b981' : '#ef4444';
  };

  const getPerformanceColor = (value) => {
    return value >= 0 ? '#10b981' : '#ef4444';
  };

  const formatDateRange = (range) => {
    return range === '1m' ? '1M' : range.toUpperCase();
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#f1f5f9',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '24px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div data-eid="portfolio-name" style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>
          Tech Growth Portfolio
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div data-eid="portfolio-value" style={{ fontSize: '20px', fontWeight: '700' }}>
            {formatCurrency(data.portfolioValue)}
          </div>
          <span 
            data-eid="portfolio-change" 
            style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: getChangeColor(data.portfolioChange),
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {data.portfolioChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {formatPercentage(data.portfolioChange)}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span 
            data-eid="date-range-1w" 
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              backgroundColor: '#334155',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {formatDateRange('1w')}
          </span>
          <span 
            data-eid="date-range-1m" 
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {formatDateRange('1m')}
          </span>
          <span 
            data-eid="date-range-3m" 
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              backgroundColor: '#334155',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {formatDateRange('3m')}
          </span>
          <span 
            data-eid="date-range-1y" 
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              backgroundColor: '#334155',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {formatDateRange('1y')}
          </span>
        </div>
      </header>

      {/* Chart Section */}
      <div data-eid="chart-section" style={{ marginBottom: '32px' }}>
        <div data-eid="chart-container" style={{ height: '300px', marginBottom: '24px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }} 
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area type="monotone" dataKey="aapl" stroke="#3b82f6" fill="url(#colorAAPL)" strokeWidth={2} />
              <Area type="monotone" dataKey="googl" stroke="#10b981" fill="url(#colorGOOGL)" strokeWidth={2} />
              <Area type="monotone" dataKey="msft" stroke="#8b5cf6" fill="url(#colorMSFT)" strokeWidth={2} />
              <defs>
                <linearGradient id="colorAAPL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorGOOGL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorMSFT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div data-eid="legend" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
          <span data-eid="legend-aapl" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
            AAPL
          </span>
          <span data-eid="legend-googl" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
            GOOGL
          </span>
          <span data-eid="legend-msft" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#8b5cf6', borderRadius: '2px' }}></div>
            MSFT
          </span>
        </div>
      </div>

      {/* Summary Row */}
      <div data-eid="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        {/* AAPL Summary */}
        <div data-eid="summary-aapl" style={{ 
          backgroundColor: '#1e293b', 
          borderRadius: '12px', 
          padding: '16px', 
          minWidth: '180px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <span data-eid="summary-aapl-symbol" style={{ fontSize: '20px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>AAPL</span>
          <span data-eid="summary-aapl-name" style={{ fontSize: '14px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Apple Inc.</span>
          <span data-eid="summary-aapl-price" style={{ fontSize: '24px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>{formatCurrency(data.stocks.aapl.currentPrice)}</span>
          <span 
            data-eid="summary-aapl-change" 
            style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: getChangeColor(data.stocks.aapl.change),
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {data.stocks.aapl.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatPercentage(data.stocks.aapl.change)}
          </span>
        </div>
        
        {/* GOOGL Summary */}
        <div data-eid="summary-googl" style={{ 
          backgroundColor: '#1e293b', 
          borderRadius: '12px', 
          padding: '16px', 
          minWidth: '180px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <span data-eid="summary-googl-symbol" style={{ fontSize: '20px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>GOOGL</span>
          <span data-eid="summary-googl-name" style={{ fontSize: '14px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Alphabet Inc.</span>
          <span data-eid="summary-googl-price" style={{ fontSize: '24px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>{formatCurrency(data.stocks.googl.currentPrice)}</span>
          <span 
            data-eid="summary-googl-change" 
            style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: getChangeColor(data.stocks.googl.change),
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {data.stocks.googl.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatPercentage(data.stocks.googl.change)}
          </span>
        </div>
        
        {/* MSFT Summary */}
        <div data-eid="summary-msft" style={{ 
          backgroundColor: '#1e293b', 
          borderRadius: '12px', 
          padding: '16px', 
          minWidth: '180px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <span data-eid="summary-msft-symbol" style={{ fontSize: '20px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>MSFT</span>
          <span data-eid="summary-msft-name" style={{ fontSize: '14px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Microsoft Corp.</span>
          <span data-eid="summary-msft-price" style={{ fontSize: '24px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>{formatCurrency(data.stocks.msft.currentPrice)}</span>
          <span 
            data-eid="summary-msft-change" 
            style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: getChangeColor(data.stocks.msft.change),
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {data.stocks.msft.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatPercentage(data.stocks.msft.change)}
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div data-eid="table-section" style={{ marginBottom: '32px' }}>
        <div data-eid="table-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Key Metrics</div>
        
        {/* Table Header */}
        <div data-eid="table-header" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          borderBottom: '1px solid #334155', 
          paddingBottom: '8px', 
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#94a3b8'
        }}>
          <span data-eid="table-header-metric"></span>
          <span data-eid="table-header-aapl">AAPL</span>
          <span data-eid="table-header-googl">GOOGL</span>
          <span data-eid="table-header-msft">MSFT</span>
        </div>
        
        {/* Open Row */}
        <div data-eid="table-row-open" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '8px 0',
          fontSize: '14px',
          borderBottom: '1px solid #1e293b'
        }}>
          <span data-eid="table-row-open-label" style={{ color: '#94a3b8' }}>Open</span>
          <span data-eid="table-row-open-aapl">{formatCurrency(data.stocks.aapl.open)}</span>
          <span data-eid="table-row-open-googl">{formatCurrency(data.stocks.googl.open)}</span>
          <span data-eid="table-row-open-msft">{formatCurrency(data.stocks.msft.open)}</span>
        </div>
        
        {/* Close Row */}
        <div data-eid="table-row-close" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '8px 0',
          fontSize: '14px',
          borderBottom: '1px solid #1e293b'
        }}>
          <span data-eid="table-row-close-label" style={{ color: '#94a3b8' }}>Close</span>
          <span data-eid="table-row-close-aapl">{formatCurrency(data.stocks.aapl.close)}</span>
          <span data-eid="table-row-close-googl">{formatCurrency(data.stocks.googl.close)}</span>
          <span data-eid="table-row-close-msft">{formatCurrency(data.stocks.msft.close)}</span>
        </div>
        
        {/* High Row */}
        <div data-eid="table-row-high" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '8px 0',
          fontSize: '14px',
          borderBottom: '1px solid #1e293b'
        }}>
          <span data-eid="table-row-high-label" style={{ color: '#94a3b8' }}>High</span>
          <span data-eid="table-row-high-aapl">{formatCurrency(data.stocks.aapl.high)}</span>
          <span data-eid="table-row-high-googl">{formatCurrency(data.stocks.googl.high)}</span>
          <span data-eid="table-row-high-msft">{formatCurrency(data.stocks.msft.high)}</span>
        </div>
        
        {/* Low Row */}
        <div data-eid="table-row-low" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '8px 0',
          fontSize: '14px',
          borderBottom: '1px solid #1e293b'
        }}>
          <span data-eid="table-row-low-label" style={{ color: '#94a3b8' }}>Low</span>
          <span data-eid="table-row-low-aapl">{formatCurrency(data.stocks.aapl.low)}</span>
          <span data-eid="table-row-low-googl">{formatCurrency(data.stocks.googl.low)}</span>
          <span data-eid="table-row-low-msft">{formatCurrency(data.stocks.msft.low)}</span>
        </div>
        
        {/* Volume Row */}
        <div data-eid="table-row-volume" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '8px 0',
          fontSize: '14px',
          borderBottom: '1px solid #1e293b'
        }}>
          <span data-eid="table-row-volume-label" style={{ color: '#94a3b8' }}>Volume</span>
          <span data-eid="table-row-volume-aapl">{(data.stocks.aapl.volume / 1000000).toFixed(1)}M</span>
          <span data-eid="table-row-volume-googl">{(data.stocks.googl.volume / 1000000).toFixed(1)}M</span>
          <span data-eid="table-row-volume-msft">{(data.stocks.msft.volume / 1000000).toFixed(1)}M</span>
        </div>
        
        {/* Market Cap Row */}
        <div data-eid="table-row-mktcap" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '8px 0',
          fontSize: '14px',
          borderBottom: '1px solid #1e293b'
        }}>
          <span data-eid="table-row-mktcap-label" style={{ color: '#94a3b8' }}>Market Cap</span>
          <span data-eid="table-row-mktcap-aapl">${(data.stocks.aapl.marketCap / 1000000000).toFixed(1)}B</span>
          <span data-eid="table-row-mktcap-googl">${(data.stocks.googl.marketCap / 1000000000).toFixed(1)}B</span>
          <span data-eid="table-row-mktcap-msft">${(data.stocks.msft.marketCap / 1000000000).toFixed(1)}B</span>
        </div>
        
        {/* P/E Ratio Row */}
        <div data-eid="table-row-pe" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '8px 0',
          fontSize: '14px'
        }}>
          <span data-eid="table-row-pe-label" style={{ color: '#94a3b8' }}>P/E Ratio</span>
          <span data-eid="table-row-pe-aapl">{data.stocks.aapl.peRatio.toFixed(1)}</span>
          <span data-eid="table-row-pe-googl">{data.stocks.googl.peRatio.toFixed(1)}</span>
          <span data-eid="table-row-pe-msft">{data.stocks.msft.peRatio.toFixed(1)}</span>
        </div>
      </div>

      {/* Performance Section */}
      <div data-eid="performance-section" style={{ marginBottom: '32px' }}>
        <div data-eid="performance-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>1-Month Performance</div>
        
        {/* AAPL Performance */}
        <div data-eid="perf-aapl" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span data-eid="perf-aapl-label" style={{ fontSize: '14px', color: '#94a3b8' }}>AAPL</span>
            <span data-eid="perf-aapl-value" style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: getPerformanceColor(data.stocks.aapl.performance1M)
            }}>
              {formatPercentage(data.stocks.aapl.performance1M)}
            </span>
          </div>
          <div data-eid="perf-aapl-bar" style={{ 
            height: '8px', 
            backgroundColor: '#334155', 
            borderRadius: '4px', 
            overflow: 'hidden' 
          }}>
            <div 
              data-eid="perf-aapl-fill" 
              style={{ 
                height: '100%', 
                width: `${Math.min(Math.abs(data.stocks.aapl.performance1M), 100)}%`,
                backgroundColor: data.stocks.aapl.performance1M >= 0 ? '#10b981' : '#ef4444',
                borderRadius: '4px'
              }}
            ></div>
          </div>
        </div>
        
        {/* GOOGL Performance */}
        <div data-eid="perf-googl" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span data-eid="perf-googl-label" style={{ fontSize: '14px', color: '#94a3b8' }}>GOOGL</span>
            <span data-eid="perf-googl-value" style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: getPerformanceColor(data.stocks.googl.performance1M)
            }}>
              {formatPercentage(data.stocks.googl.performance1M)}
            </span>
          </div>
          <div data-eid="perf-googl-bar" style={{ 
            height: '8px', 
            backgroundColor: '#334155', 
            borderRadius: '4px', 
            overflow: 'hidden' 
          }}>
            <div 
              data-eid="perf-googl-fill" 
              style={{ 
                height: '100%', 
                width: `${Math.min(Math.abs(data.stocks.googl.performance1M), 100)}%`,
                backgroundColor: data.stocks.googl.performance1M >= 0 ? '#10b981' : '#ef4444',
                borderRadius: '4px'
              }}
            ></div>
          </div>
        </div>
        
        {/* MSFT Performance */}
        <div data-eid="perf-msft" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span data-eid="perf-msft-label" style={{ fontSize: '14px', color: '#94a3b8' }}>MSFT</span>
            <span data-eid="perf-msft-value" style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: getPerformanceColor(data.stocks.msft.performance1M)
            }}>
              {formatPercentage(data.stocks.msft.performance1M)}
            </span>
          </div>
          <div data-eid="perf-msft-bar" style={{ 
            height: '8px', 
            backgroundColor: '#334155', 
            borderRadius: '4px', 
            overflow: 'hidden' 
          }}>
            <div 
              data-eid="perf-msft-fill" 
              style={{ 
                height: '100%', 
                width: `${Math.min(Math.abs(data.stocks.msft.performance1M), 100)}%`,
                backgroundColor: data.stocks.msft.performance1M >= 0 ? '#10b981' : '#ef4444',
                borderRadius: '4px'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div data-eid="footer" style={{ textAlign: 'center', paddingTop: '16px', borderTop: '1px solid #334155', fontSize: '14px', color: '#94a3b8' }}>
        <span data-eid="footer-timestamp">Last updated: {data.lastUpdated}</span>
      </div>
    </section>
  );
};

export default MultiStockComparisonWidget;