import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import data from './data.json';

const CryptoPortfolioTracker = () => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getTrendIcon = (value) => {
    if (value >= 0) {
      return <TrendingUp size={16} className="text-green-400" />;
    } else {
      return <TrendingDown size={16} className="text-red-400" />;
    }
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#111827',
        borderRadius: '16px',
        padding: '24px',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Header Section */}
      <div data-eid="header" style={{ marginBottom: '24px' }}>
        <div data-eid="portfolio-title" style={{ fontSize: '24px', fontWeight: '700', color: '#f9fafb', marginBottom: '4px' }}>
          Crypto Portfolio
        </div>
        <div data-eid="total-value" style={{ fontSize: '32px', fontWeight: '800', color: '#f9fafb', marginBottom: '4px' }}>
          {formatCurrency(data.totalValue)}
        </div>
        <div data-eid="total-change" style={{ 
          fontSize: '16px', 
          fontWeight: '600',
          color: data.totalChange >= 0 ? '#10b981' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {getTrendIcon(data.totalChange)}
          {formatPercent(data.totalChange)} ({formatCurrency(data.totalChangeAmount)})
        </div>
      </div>

      {/* Chart Section */}
      <div data-eid="chart-section" style={{ marginBottom: '24px' }}>
        <div data-eid="chart-label" style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#9ca3af', 
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          7-day portfolio value
        </div>
        <div data-eid="area-chart" style={{ height: '200px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.chartData}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderColor: '#374151',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }} 
                formatter={(value) => [formatCurrency(value), 'Value']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                fill="url(#colorUv)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings Header */}
      <div data-eid="holdings-header" style={{ 
        fontSize: '16px', 
        fontWeight: '600', 
        color: '#f9fafb', 
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>Holdings</div>
        <div style={{ fontSize: '14px', color: '#9ca3af' }}>5 assets</div>
      </div>

      {/* Coin Rows */}
      {data.coins.map((coin, index) => (
        <div 
          key={coin.id}
          data-eid={`coin-row-${index}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: index < data.coins.length - 1 ? '1px solid #374151' : 'none'
          }}
        >
          {/* Coin Icon */}
          <div 
            data-eid={`coin-icon-${index}`}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: coin.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              flexShrink: 0
            }}
          >
            <span style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#f9fafb' 
            }}>
              {coin.symbol.charAt(0)}
            </span>
          </div>

          {/* Coin Name */}
          <div 
            data-eid={`coin-name-${index}`}
            style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#f9fafb',
              marginRight: 'auto'
            }}
          >
            <div>{coin.name}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{coin.symbol}</div>
          </div>

          {/* Coin Price */}
          <div 
            data-eid={`coin-price-${index}`}
            style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#f9fafb',
              textAlign: 'right',
              minWidth: '120px',
              marginRight: '16px'
            }}
          >
            {formatCurrency(coin.price)}
          </div>

          {/* Coin Change */}
          <div 
            data-eid={`coin-change-${index}`}
            style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              color: coin.change24h >= 0 ? '#10b981' : '#ef4444',
              textAlign: 'right',
              minWidth: '80px',
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {getTrendIcon(coin.change24h)}
            {formatPercent(coin.change24h)}
          </div>

          {/* Coin Holdings */}
          <div 
            data-eid={`coin-holdings-${index}`}
            style={{ 
              fontSize: '14px', 
              color: '#9ca3af',
              textAlign: 'right',
              minWidth: '140px'
            }}
          >
            <div>{coin.amount} {coin.symbol}</div>
            <div style={{ color: '#f9fafb', fontWeight: '600' }}>
              {formatCurrency(coin.value)}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CryptoPortfolioTracker;