import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowDown, Ethereum, DollarSign, TrendingUp, TrendingDown, Zap, Coins, RotateCcw, Wallet, Network } from 'lucide-react';
import data from './data.json';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

const DeFiDashboard = () => {
  const { 
    header, gasTracker, holdings, portfolioChart, priceChart, pools, swap, farming, footer 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#f1f5f9',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 data-eid="title" style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>DeFi Portfolio</h1>
          <span data-eid="wallet-address" style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>{header.walletAddress}</span>
        </div>
        <div data-eid="total-value" style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '700' }}>${header.totalValue.toLocaleString()}</div>
          <span data-eid="total-change" style={{ 
            fontSize: '14px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            color: header.totalChange >= 0 ? '#10b981' : '#ef4444'
          }}>
            {header.totalChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(header.totalChange)}%
          </span>
        </div>
      </header>

      {/* Gas Tracker */}
      <div data-eid="gas-tracker" style={{ 
        backgroundColor: '#1e293b', 
        borderRadius: '12px', 
        padding: '16px', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span data-eid="gas-title" style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={16} />
          Gas Tracker
        </span>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span data-eid="gas-low" style={{ color: '#10b981', fontWeight: '600' }}>{gasTracker.low} Gwei</span>
            <span style={{ color: '#94a3b8' }}>Low</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span data-eid="gas-avg" style={{ color: '#f59e0b', fontWeight: '600' }}>{gasTracker.avg} Gwei</span>
            <span style={{ color: '#94a3b8' }}>Avg</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span data-eid="gas-high" style={{ color: '#ef4444', fontWeight: '600' }}>{gasTracker.high} Gwei</span>
            <span style={{ color: '#94a3b8' }}>High</span>
          </div>
        </div>
        <span data-eid="gas-trend" style={{ 
          fontSize: '14px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          color: gasTracker.trend >= 0 ? '#10b981' : '#ef4444'
        }}>
          {gasTracker.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(gasTracker.trend)}%
        </span>
      </div>

      {/* Holdings Section */}
      <div data-eid="holdings-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 data-eid="holdings-title" style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Token Holdings</h2>
        
        {holdings.map((holding, index) => (
          <div 
            key={`holding-${index}`} 
            data-eid={`holding-${index}`} 
            style={{ 
              backgroundColor: '#1e293b', 
              borderRadius: '12px', 
              padding: '16px', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}>
                {holding.symbol === 'ETH' && <Ethereum size={20} />}
                {holding.symbol === 'USDC' && <DollarSign size={20} />}
                {holding.symbol === 'WBTC' && <Coins size={20} />}
                {holding.symbol === 'AAVE' && <Network size={20} />}
                {holding.symbol === 'UNI' && <RotateCcw size={20} />}
              </div>
              <div>
                <span data-eid={`holding-${index}-symbol`} style={{ fontSize: '16px', fontWeight: '600' }}>{holding.symbol}</span>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>{holding.amount} {holding.symbol}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span data-eid={`holding-${index}-value`} style={{ fontSize: '16px', fontWeight: '600' }}>${holding.value.toLocaleString()}</span>
              <div data-eid={`holding-${index}-change`} style={{ 
                fontSize: '14px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                justifyContent: 'flex-end',
                color: holding.change >= 0 ? '#10b981' : '#ef4444'
              }}>
                {holding.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(holding.change)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Chart Section */}
      <div data-eid="portfolio-chart-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 data-eid="portfolio-chart-title" style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Portfolio Allocation</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div data-eid="portfolio-pie-chart" style={{ flex: 1, minWidth: '250px', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioChart.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioChart.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div data-eid="portfolio-legend" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            flex: 1,
            minWidth: '200px'
          }}>
            {portfolioChart.data.map((entry, index) => (
              <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  style={{ 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '4px',
                    backgroundColor: COLORS[index % COLORS.length]
                  }} 
                />
                <span 
                  data-eid={`legend-item-${index}`} 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <span>{entry.name}</span>
                  <span>{entry.percent}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Chart Section */}
      <div data-eid="price-chart-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 data-eid="price-chart-title" style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>ETH Price History (7d)</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div data-eid="price-line-chart" style={{ flex: 1, minWidth: '300px', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceChart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    borderColor: '#334155',
                    borderRadius: '8px'
                  }} 
                  labelStyle={{ color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#6366f1" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#6366f1' }} 
                  activeDot={{ r: 6, fill: '#6366f1' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            flex: 1,
            minWidth: '200px'
          }}>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>Current Price</div>
              <span data-eid="price-current" style={{ fontSize: '20px', fontWeight: '700' }}>${priceChart.currentPrice.toLocaleString()}</span>
            </div>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>7d High</div>
              <span data-eid="price-high" style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>${priceChart.high.toLocaleString()}</span>
            </div>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>7d Low</div>
              <span data-eid="price-low" style={{ fontSize: '20px', fontWeight: '700', color: '#ef4444' }}>${priceChart.low.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pools Section */}
      <div data-eid="pools-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 data-eid="pools-title" style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Liquidity Pools</h2>
          <span data-eid="pools-total-tvl" style={{ fontSize: '16px', fontWeight: '600' }}>${pools.totalTVL.toLocaleString()} TVL</span>
        </div>
        
        {pools.pools.map((pool, index) => (
          <div 
            key={`pool-${index}`} 
            data-eid={`pool-${index}`} 
            style={{ 
              backgroundColor: '#1e293b', 
              borderRadius: '12px', 
              padding: '16px', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <div>
              <span data-eid={`pool-${index}-name`} style={{ fontSize: '16px', fontWeight: '600' }}>{pool.name}</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>TVL</div>
              <span data-eid={`pool-${index}-tvl`} style={{ fontSize: '16px', fontWeight: '600' }}>${pool.tvl.toLocaleString()}</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>APY</div>
              <span data-eid={`pool-${index}-apy`} style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: pool.apy >= 0 ? '#10b981' : '#ef4444'
              }}>{pool.apy}%</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>IL</div>
              <span data-eid={`pool-${index}-il`} style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: pool.il >= 0 ? '#10b981' : '#ef4444'
              }}>{pool.il}%</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Your Position</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span data-eid={`pool-${index}-position`} style={{ fontSize: '16px', fontWeight: '600' }}>${pool.position.toLocaleString()}</span>
                <span data-eid={`pool-${index}-fees`} style={{ fontSize: '14px', color: '#10b981' }}>${pool.fees.toLocaleString()} fees</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Swap Section */}
      <div data-eid="swap-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 data-eid="swap-title" style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Swap Tokens</h2>
        
        <div style={{ 
          backgroundColor: '#1e293b', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div data-eid="swap-from-token" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span data-eid="swap-from-label" style={{ fontSize: '14px', color: '#94a3b8' }}>From</span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Balance: {swap.from.balance} {swap.from.symbol}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}>
                {swap.from.symbol === 'ETH' && <Ethereum size={20} />}
                {swap.from.symbol === 'USDC' && <DollarSign size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <span data-eid="swap-from-amount" style={{ fontSize: '24px', fontWeight: '700' }}>{swap.from.amount}</span>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>{swap.from.symbol}</div>
              </div>
              <span data-eid="swap-from-usd" style={{ fontSize: '16px', fontWeight: '600' }}>${swap.from.usdValue.toLocaleString()}</span>
            </div>
          </div>
          
          <div data-eid="swap-arrow" style={{ 
            display: 'flex', 
            justifyContent: 'center',
            padding: '8px',
            backgroundColor: '#334155',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            margin: '0 auto'
          }}>
            <ArrowDown size={20} />
          </div>
          
          <div data-eid="swap-to-token" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span data-eid="swap-to-label" style={{ fontSize: '14px', color: '#94a3b8' }}>To</span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Balance: {swap.to.balance} {swap.to.symbol}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}>
                {swap.to.symbol === 'ETH' && <Ethereum size={20} />}
                {swap.to.symbol === 'USDC' && <DollarSign size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <span data-eid="swap-to-amount" style={{ fontSize: '24px', fontWeight: '700' }}>{swap.to.amount}</span>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>{swap.to.symbol}</div>
              </div>
              <span data-eid="swap-to-usd" style={{ fontSize: '16px', fontWeight: '600' }}>${swap.to.usdValue.toLocaleString()}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#94a3b8', paddingTop: '8px', borderTop: '1px solid #334155' }}>
            <span data-eid="swap-rate">1 {swap.from.symbol} = {swap.rate} {swap.to.symbol}</span>
            <span data-eid="swap-slippage">Slippage: {swap.slippage}%</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#94a3b8', paddingTop: '4px' }}>
            <span data-eid="swap-fee">Fee: {swap.fee}%</span>
            <span data-eid="swap-route">Route: {swap.route}</span>
          </div>
        </div>
      </div>

      {/* Farming Section */}
      <div data-eid="farming-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 data-eid="farming-title" style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Yield Farming</h2>
          <span data-eid="farming-total-earned" style={{ fontSize: '16px', fontWeight: '600' }}>${farming.totalEarned.toLocaleString()} earned</span>
        </div>
        
        {farming.farms.map((farm, index) => (
          <div 
            key={`farm-${index}`} 
            data-eid={`farm-${index}`} 
            style={{ 
              backgroundColor: '#1e293b', 
              borderRadius: '12px', 
              padding: '16px', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <div>
              <span data-eid={`farm-${index}-name`} style={{ fontSize: '16px', fontWeight: '600' }}>{farm.name}</span>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}><span data-eid={`farm-${index}-protocol`}>{farm.protocol}</span></div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Deposited</div>
              <span data-eid={`farm-${index}-deposited`} style={{ fontSize: '16px', fontWeight: '600' }}>${farm.deposited.toLocaleString()}</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Earned</div>
              <span data-eid={`farm-${index}-earned`} style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>${farm.earned.toLocaleString()}</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>APY</div>
              <span data-eid={`farm-${index}-apy`} style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: farm.apy >= 0 ? '#10b981' : '#ef4444'
              }}>{farm.apy}%</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Status</div>
              <div style={{ 
                display: 'inline-block', 
                padding: '4px 12px', 
                backgroundColor: '#0f172a',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500'
              }}>Active</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '12px 0',
        borderTop: '1px solid #334155',
        marginTop: 'auto'
      }}>
        <span data-eid="footer-network" style={{ fontSize: '14px', color: '#94a3b8' }}>{footer.network}</span>
        <span data-eid="footer-block" style={{ fontSize: '14px', color: '#94a3b8' }}>Block #{footer.blockNumber}</span>
      </footer>
    </section>
  );
};

export default DeFiDashboard;