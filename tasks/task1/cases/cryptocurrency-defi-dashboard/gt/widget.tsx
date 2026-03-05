import data from './data.json'
import { Wallet, Fuel, ArrowDownUp, TrendingUp, TrendingDown, Droplets, Sprout, Circle, Coins, ArrowRight } from 'lucide-react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #050505 0%, #0a0a0a 40%, #050505 100%)',
        borderRadius: 20,
        color: '#e0e0e0',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        maxWidth: 480,
        overflow: 'hidden',
        padding: 14,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <header data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 data-eid="title" style={{ fontSize: 17, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Wallet size={18} color="#00ff41" /> DeFi Portfolio
          </h1>
          <span data-eid="wallet-address" style={{ fontSize: 10, color: '#00d4ff', background: 'rgba(0,212,255,0.1)', padding: '2px 8px', borderRadius: 8 }}>
            {data.wallet}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div data-eid="total-value" style={{ fontSize: 24, fontWeight: 800, color: '#00ff41' }}>
            ${data.totalValue.toLocaleString()}
          </div>
          <span data-eid="total-change" style={{ fontSize: 12, fontWeight: 600, color: '#00ff41' }}>
            +{data.change24h}%
          </span>
        </div>
      </header>

      <div data-eid="gas-tracker" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0a0a0a', borderRadius: 8, padding: '6px 10px', flexWrap: 'wrap', border: '1px solid rgba(0,255,65,0.15)', boxShadow: '0 0 8px rgba(0,255,65,0.05)' }}>
        <span data-eid="gas-title" style={{ fontSize: 10, color: '#00d4ff', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Fuel size={10} /> Gas
        </span>
        <span data-eid="gas-low" style={{ fontSize: 10, color: '#00ff41' }}>Low: {data.gas.low} gwei</span>
        <span data-eid="gas-avg" style={{ fontSize: 10, color: '#00d4ff' }}>Avg: {data.gas.avg} gwei</span>
        <span data-eid="gas-high" style={{ fontSize: 10, color: '#ff006e' }}>High: {data.gas.high} gwei</span>
        <span data-eid="gas-trend" style={{ fontSize: 10, color: '#00ff41', display: 'flex', alignItems: 'center', gap: 2 }}>
          <TrendingDown size={9} /> {data.gas.trend}
        </span>
      </div>

      <div data-eid="holdings-section" style={{ background: '#0a0a0a', borderRadius: 12, padding: 10, border: '1px solid rgba(0,212,255,0.15)', boxShadow: '0 0 12px rgba(0,212,255,0.05)' }}>
        <h2 data-eid="holdings-title" style={{ fontSize: 13, fontWeight: 600, margin: '0 0 6px 0', color: '#00d4ff' }}>
          <Coins size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Token Holdings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.holdings.map((h, i) => (
            <div
              key={h.symbol}
              data-eid={`holding-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 6px',
                borderRadius: 6,
                background: i % 2 === 0 ? 'rgba(0,255,65,0.03)' : 'transparent',
              }}
            >
              <span data-eid={`holding-${i}-symbol`} style={{ fontSize: 11, fontWeight: 700, color: h.color, width: 42 }}>
                <Circle size={6} fill={h.color} color={h.color} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {h.symbol}
              </span>
              <span data-eid={`holding-${i}-amount`} style={{ fontSize: 10, color: '#666', width: 60, textAlign: 'right' }}>{h.amount}</span>
              <span data-eid={`holding-${i}-value`} style={{ fontSize: 11, fontWeight: 600, width: 65, textAlign: 'right', color: '#e0e0e0' }}>{h.value}</span>
              <span data-eid={`holding-${i}-change`} style={{ fontSize: 10, fontWeight: 600, color: h.change.startsWith('+') ? '#00ff41' : h.change.startsWith('-') ? '#ff006e' : '#666', width: 45, textAlign: 'right' }}>
                {h.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div data-eid="portfolio-chart-section" style={{ background: '#0a0a0a', borderRadius: 12, padding: 10, border: '1px solid rgba(255,0,110,0.15)', boxShadow: '0 0 12px rgba(255,0,110,0.05)' }}>
        <h2 data-eid="portfolio-chart-title" style={{ fontSize: 13, fontWeight: 600, margin: '0 0 6px 0', color: '#ff006e' }}>
          Portfolio Allocation
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div data-eid="portfolio-pie-chart" style={{ width: 120, height: 120 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.portfolio}
                  dataKey="value"
                  nameKey="token"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={55}
                  strokeWidth={0}
                >
                  {data.portfolio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div data-eid="portfolio-legend" style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {data.portfolio.map((item, i) => (
              <span key={item.token} data-eid={`legend-item-${i}`} style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Circle size={8} fill={item.color} color={item.color} />
                <span style={{ color: '#e0e0e0', fontWeight: 600 }}>{item.token}</span>
                <span style={{ color: '#555', marginLeft: 'auto' }}>{item.percentage}%</span>
                <span style={{ color: '#00d4ff' }}>${item.value.toLocaleString()}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div data-eid="price-chart-section" style={{ background: '#0a0a0a', borderRadius: 12, padding: 10, border: '1px solid rgba(0,255,65,0.15)', boxShadow: '0 0 12px rgba(0,255,65,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h2 data-eid="price-chart-title" style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#00ff41' }}>
            <TrendingUp size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} /> ETH Price (7d)
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <span data-eid="price-current" style={{ fontSize: 10, color: '#e0e0e0', fontWeight: 600 }}>{data.priceStats.current}</span>
            <span data-eid="price-high" style={{ fontSize: 9, color: '#00ff41' }}>H: {data.priceStats.high7d}</span>
            <span data-eid="price-low" style={{ fontSize: 9, color: '#ff006e' }}>L: {data.priceStats.low7d}</span>
          </div>
        </div>
        <div data-eid="price-line-chart" style={{ width: '100%', height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,65,0.06)" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#555' }} />
              <YAxis domain={['dataMin - 50', 'dataMax + 50']} tick={{ fontSize: 9, fill: '#555' }} tickFormatter={(v: number) => `$${v}`} />
              <Tooltip
                contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 8, fontSize: 11, color: '#e0e0e0' }}
                labelStyle={{ color: '#00d4ff' }}
              />
              <Line type="monotone" dataKey="price" stroke="#00ff41" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="pools-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 data-eid="pools-title" style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#00d4ff' }}>
            <Droplets size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Liquidity Pools
          </h2>
          <span data-eid="pools-total-tvl" style={{ fontSize: 10, color: '#555' }}>Total TVL: {data.poolsTotalTvl}</span>
        </div>
        {data.pools.map((pool, i) => (
          <div
            key={pool.name}
            data-eid={`pool-${i}`}
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: 10,
              padding: '8px 10px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 4,
              alignItems: 'center',
              boxShadow: '0 0 6px rgba(0,212,255,0.03)',
            }}
          >
            <div>
              <span data-eid={`pool-${i}-name`} style={{ fontSize: 12, fontWeight: 700, color: '#e0e0e0' }}>{pool.name}</span>
              <br />
              <span data-eid={`pool-${i}-tvl`} style={{ fontSize: 9, color: '#555' }}>TVL: {pool.tvl}</span>
              <br />
              <span data-eid={`pool-${i}-fees`} style={{ fontSize: 9, color: '#00ff41' }}>Fees: {pool.fees}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span data-eid={`pool-${i}-apy`} style={{ fontSize: 13, fontWeight: 700, color: '#00ff41' }}>{pool.apy}%</span>
              <br />
              <span data-eid={`pool-${i}-il`} style={{ fontSize: 9, color: '#ff006e' }}>IL: {pool.il}%</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span data-eid={`pool-${i}-position`} style={{ fontSize: 11, fontWeight: 600, color: '#00d4ff' }}>{pool.position}</span>
            </div>
          </div>
        ))}
      </div>

      <div data-eid="swap-section" style={{ background: '#0a0a0a', borderRadius: 12, padding: 10, border: '1px solid rgba(255,0,110,0.15)', boxShadow: '0 0 12px rgba(255,0,110,0.05)' }}>
        <h2 data-eid="swap-title" style={{ fontSize: 13, fontWeight: 600, margin: '0 0 8px 0', color: '#ff006e' }}>
          <ArrowDownUp size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Swap
        </h2>
        <div data-eid="swap-from-token" style={{ background: 'rgba(0,255,65,0.05)', borderRadius: 8, padding: 8, marginBottom: 4, border: '1px solid rgba(0,255,65,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span data-eid="swap-from-label" style={{ fontSize: 12, fontWeight: 600, color: '#00ff41' }}>{data.swap.fromToken}</span>
            <span data-eid="swap-from-amount" style={{ fontSize: 14, fontWeight: 700, color: '#e0e0e0' }}>{data.swap.fromAmount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span data-eid="swap-from-usd" style={{ fontSize: 10, color: '#555' }}>{data.swap.fromUsd}</span>
            <span data-eid="swap-from-balance" style={{ fontSize: 9, color: '#666' }}>Balance: {data.swap.fromBalance}</span>
          </div>
        </div>
        <div data-eid="swap-arrow" style={{ textAlign: 'center', padding: 2 }}>
          <ArrowDownUp size={16} color="#ff006e" />
        </div>
        <div data-eid="swap-to-token" style={{ background: 'rgba(0,212,255,0.05)', borderRadius: 8, padding: 8, marginTop: 4, border: '1px solid rgba(0,212,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span data-eid="swap-to-label" style={{ fontSize: 12, fontWeight: 600, color: '#00d4ff' }}>{data.swap.toToken}</span>
            <span data-eid="swap-to-amount" style={{ fontSize: 14, fontWeight: 700, color: '#e0e0e0' }}>{data.swap.toAmount}</span>
          </div>
          <span data-eid="swap-to-usd" style={{ fontSize: 10, color: '#555' }}>{data.swap.toUsd}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, flexWrap: 'wrap', gap: 4 }}>
          <span data-eid="swap-rate" style={{ fontSize: 9, color: '#555' }}>{data.swap.rate}</span>
          <span data-eid="swap-slippage" style={{ fontSize: 9, color: '#666' }}>Slippage: {data.swap.slippage}</span>
          <span data-eid="swap-fee" style={{ fontSize: 9, color: '#666' }}>Fee: {data.swap.fee}</span>
          <span data-eid="swap-route" style={{ fontSize: 9, color: '#555', display: 'flex', alignItems: 'center', gap: 2 }}>
            <ArrowRight size={8} /> {data.swap.route}
          </span>
        </div>
      </div>

      <div data-eid="farming-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 data-eid="farming-title" style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#00d4ff' }}>
            <Sprout size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Yield Farming
          </h2>
          <span data-eid="farming-total-earned" style={{ fontSize: 11, color: '#00ff41', fontWeight: 600 }}>
            Total: {data.farmingTotalEarned}
          </span>
        </div>
        {data.farms.map((farm, i) => (
          <div
            key={farm.name}
            data-eid={`farm-${i}`}
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(0,255,65,0.08)',
              borderRadius: 10,
              padding: '8px 10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 0 6px rgba(0,255,65,0.03)',
            }}
          >
            <div>
              <span data-eid={`farm-${i}-name`} style={{ fontSize: 12, fontWeight: 600, color: '#e0e0e0' }}>{farm.name}</span>
              <br />
              <span data-eid={`farm-${i}-deposited`} style={{ fontSize: 10, color: '#666' }}>Deposited: {farm.deposited}</span>
              <br />
              <span data-eid={`farm-${i}-protocol`} style={{ fontSize: 8, color: '#00d4ff', background: 'rgba(0,212,255,0.1)', padding: '0 4px', borderRadius: 4 }}>
                {farm.protocol}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span data-eid={`farm-${i}-earned`} style={{ fontSize: 11, fontWeight: 600, color: '#00ff41' }}>+{farm.earned}</span>
              <br />
              <span data-eid={`farm-${i}-apy`} style={{ fontSize: 10, color: '#ff006e' }}>{farm.apy}% APY</span>
            </div>
          </div>
        ))}
      </div>

      <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,255,65,0.1)', paddingTop: 8 }}>
        <span data-eid="footer-network" style={{ fontSize: 10, color: '#555' }}>{data.network}</span>
        <span data-eid="footer-block" style={{ fontSize: 10, color: '#555' }}>Block: {data.blockNumber.toLocaleString()}</span>
      </footer>
    </section>
  )
}
