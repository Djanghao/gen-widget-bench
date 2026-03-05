import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Activity, BarChart3, Grid3X3 } from 'lucide-react';
import data from './data.json';

const c = {
  bg: '#1a1a1a',
  card: 'rgba(30, 30, 30, 0.95)',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#ff6600',
  green: '#4da6ff',
  red: '#ff4444',
  text: '#e0e0e0',
  dim: '#999999',
  gold: '#ff6600',
  purple: '#cc99ff',
};

function volColor(iv: number): string {
  if (iv >= 58) return '#ff4444';
  if (iv >= 52) return '#ff6600';
  if (iv >= 48) return '#cc8800';
  if (iv >= 45) return '#4da6ff';
  if (iv >= 43) return '#3388cc';
  return '#2266aa';
}

export default function Widget() {
  const isUp = data.change >= 0;
  return (
    <section
      data-eid="root"
      style={{
        background: `linear-gradient(160deg, ${c.bg} 0%, #222222 100%)`,
        borderRadius: 16,
        color: c.text,
        fontFamily: "'SF Mono', 'Consolas', 'Courier New', monospace",
        maxWidth: 480,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${c.border}`, paddingBottom: 10 }}>
        <div>
          <h1 data-eid="ticker-symbol" style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: 1, color: '#ffffff' }}>
            {data.ticker}
          </h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
            <span data-eid="stock-price" style={{ fontSize: 20, fontWeight: 700, color: '#ffffff' }}>${data.price.toFixed(2)}</span>
            <span data-eid="price-change" style={{ fontSize: 13, fontWeight: 600, color: isUp ? c.green : c.red }}>
              {isUp ? <TrendingUp size={12} style={{ verticalAlign: 'middle', marginRight: 2 }} /> : <TrendingDown size={12} style={{ verticalAlign: 'middle', marginRight: 2 }} />}
              {isUp ? '+' : ''}{data.change.toFixed(2)} ({data.changePct.toFixed(2)}%)
            </span>
          </div>
        </div>
        <span data-eid="expiry-label" style={{ fontSize: 11, color: c.dim, background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 6 }}>
          Exp: {data.expiry}
        </span>
      </header>

      {/* Underlying Info Bar */}
      <div data-eid="underlying-info" style={{ display: 'flex', gap: 12, fontSize: 11, padding: '6px 10px', background: c.card, borderRadius: 8, border: `1px solid ${c.border}` }}>
        <span data-eid="iv-rank" style={{ color: c.gold }}>IV Rank: {data.ivRank}%</span>
        <span data-eid="iv-percentile" style={{ color: c.purple }}>IV %ile: {data.ivPercentile}%</span>
        <span data-eid="hv-30" style={{ color: c.dim }}>HV30: {data.hv30}%</span>
      </div>

      {/* Options Chain */}
      <div data-eid="options-chain-section">
        <h2 data-eid="chain-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
          <BarChart3 size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Options Chain
        </h2>
        <div
          data-eid="chain-header-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 1fr 5fr',
            fontSize: 8,
            color: c.dim,
            textTransform: 'uppercase',
            letterSpacing: 1,
            padding: '4px 6px',
            textAlign: 'center',
          }}
        >
          <span data-eid="calls-label" style={{ color: c.green }}>CALLS (Bid / Ask / Vol / OI / IV)</span>
          <span data-eid="strike-label">Strike</span>
          <span data-eid="puts-label" style={{ color: c.red }}>PUTS (Bid / Ask / Vol / OI / IV)</span>
        </div>
        {data.chain.map((row, i) => {
          const isATM = row.strike === 890;
          return (
            <div
              key={i}
              data-eid={`call-row-${i}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '5fr 1fr 5fr',
                fontSize: 10,
                padding: '5px 6px',
                background: isATM ? 'rgba(255, 102, 0, 0.08)' : i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                border: isATM ? `1px solid rgba(255, 102, 0, 0.3)` : '1px solid transparent',
                borderRadius: isATM ? 6 : 0,
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <span data-eid={`call-${i}-bid`} style={{ color: c.green }}>{row.call.bid.toFixed(2)}</span>
                <span data-eid={`call-${i}-ask`} style={{ color: c.text }}>{row.call.ask.toFixed(2)}</span>
                <span data-eid={`call-${i}-vol`} style={{ color: c.dim }}>{row.call.vol.toLocaleString()}</span>
                <span data-eid={`call-${i}-oi`} style={{ color: c.dim }}>{row.call.oi.toLocaleString()}</span>
                <span data-eid={`call-${i}-iv`} style={{ color: c.gold }}>{row.call.iv}%</span>
              </div>
              <span data-eid={`strike-${i}`} style={{ textAlign: 'center', fontWeight: 700, color: isATM ? c.accent : c.text }}>
                {row.strike}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <span data-eid={`put-${i}-bid`} style={{ color: c.red }}>{row.put.bid.toFixed(2)}</span>
                <span data-eid={`put-${i}-ask`} style={{ color: c.text }}>{row.put.ask.toFixed(2)}</span>
                <span data-eid={`put-${i}-vol`} style={{ color: c.dim }}>{row.put.vol.toLocaleString()}</span>
                <span data-eid={`put-${i}-oi`} style={{ color: c.dim }}>{row.put.oi.toLocaleString()}</span>
                <span data-eid={`put-${i}-iv`} style={{ color: c.gold }}>{row.put.iv}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payoff Diagram */}
      <div data-eid="payoff-section" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 10 }}>
        <h2 data-eid="payoff-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
          P/L Payoff Diagram
        </h2>
        <div data-eid="payoff-chart" style={{ width: '100%', height: 150 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.payoff}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="price" tick={{ fontSize: 9, fill: c.dim }} stroke="transparent" label={{ value: 'Stock Price', position: 'insideBottom', offset: -2, fontSize: 9, fill: c.dim }} />
              <YAxis tick={{ fontSize: 9, fill: c.dim }} stroke="transparent" tickFormatter={(v: number) => `$${v}`} />
              <Tooltip contentStyle={{ background: '#2a2a2a', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 8, fontSize: 11, color: '#e0e0e0' }} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
              <Line type="linear" dataKey="pl" stroke={c.accent} strokeWidth={2} dot={{ r: 3, fill: c.accent }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10 }}>
          <span data-eid="payoff-strategy-label" style={{ color: c.accent, fontWeight: 600 }}>
            {data.strategy.name} ({data.strategy.legs})
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 10 }}>
          <span data-eid="payoff-max-profit" style={{ color: c.green }}>Max Profit: ${data.strategy.maxProfit}</span>
          <span data-eid="payoff-max-loss" style={{ color: c.red }}>Max Loss: ${Math.abs(data.strategy.maxLoss)}</span>
          <span data-eid="payoff-breakeven" style={{ color: c.gold }}>BE: ${data.strategy.breakeven}</span>
        </div>
      </div>

      {/* Greeks */}
      <div data-eid="greeks-section">
        <h2 data-eid="greeks-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
          <Activity size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Portfolio Greeks
        </h2>
        <div data-eid="greeks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
          {[
            { key: 'delta', label: 'Delta', val: data.greeks.delta, color: c.green },
            { key: 'gamma', label: 'Gamma', val: data.greeks.gamma, color: c.purple },
            { key: 'theta', label: 'Theta', val: data.greeks.theta, color: c.red },
            { key: 'vega', label: 'Vega', val: data.greeks.vega, color: c.gold },
            { key: 'rho', label: 'Rho', val: data.greeks.rho, color: c.accent },
          ].map((g) => (
            <div
              key={g.key}
              data-eid={`greek-${g.key}`}
              style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, padding: '6px 4px', textAlign: 'center' }}
            >
              <span data-eid={`greek-${g.key}-label`} style={{ fontSize: 9, color: c.dim, textTransform: 'uppercase', display: 'block' }}>
                {g.label}
              </span>
              <span data-eid={`greek-${g.key}-value`} style={{ fontSize: 16, fontWeight: 700, color: g.color, display: 'block', marginTop: 2 }}>
                {g.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Metrics */}
      <div data-eid="risk-section" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 10 }}>
        <h2 data-eid="risk-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Risk Metrics
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div data-eid="risk-pop">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              <span data-eid="risk-pop-label" style={{ color: c.dim }}>Probability of Profit</span>
              <span data-eid="risk-pop-value" style={{ fontWeight: 700, color: c.green }}>{data.strategy.pop}%</span>
            </div>
            <div data-eid="risk-pop-bar" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 3, height: 6, marginTop: 4, overflow: 'hidden' }}>
              <div style={{ background: c.green, height: '100%', width: `${data.strategy.pop}%`, borderRadius: 3 }} />
            </div>
          </div>
          <div data-eid="risk-expected" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span data-eid="risk-expected-label" style={{ color: c.dim }}>Expected Value</span>
            <span data-eid="risk-expected-value" style={{ fontWeight: 700, color: c.green }}>+${data.strategy.expectedValue}</span>
          </div>
          <div data-eid="risk-ratio" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span data-eid="risk-ratio-label" style={{ color: c.dim }}>Risk/Reward Ratio</span>
            <span data-eid="risk-ratio-value" style={{ fontWeight: 700, color: c.accent }}>{data.strategy.riskReward}</span>
          </div>
        </div>
      </div>

      {/* Volatility Surface */}
      <div data-eid="volsurface-section">
        <h2 data-eid="volsurface-title" style={{ fontSize: 12, fontWeight: 600, color: c.accent, margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
          <Grid3X3 size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Implied Volatility Surface
        </h2>
        <div data-eid="volsurface-grid" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '40px repeat(7, 1fr)', gap: 2, fontSize: 8, color: c.dim, textAlign: 'center' }}>
            <span>DTE</span>
            {data.volSurface.strikes.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          {data.volSurface.data.map((row, ri) => (
            <div
              key={ri}
              data-eid={`volsurface-row-${ri}`}
              style={{ display: 'grid', gridTemplateColumns: '40px repeat(7, 1fr)', gap: 2, fontSize: 9 }}
            >
              <span style={{ color: c.dim, fontSize: 8, display: 'flex', alignItems: 'center' }}>{data.volSurface.dtes[ri]}d</span>
              {row.map((iv, ci) => (
                <span
                  key={ci}
                  style={{
                    background: volColor(iv),
                    opacity: 0.7,
                    borderRadius: 3,
                    padding: '3px 0',
                    textAlign: 'center',
                    fontSize: 8,
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  {iv.toFixed(1)}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div data-eid="volsurface-legend" style={{ display: 'flex', gap: 8, marginTop: 6, fontSize: 8, color: c.dim, justifyContent: 'center' }}>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#2266aa', marginRight: 3 }} />Low</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#4da6ff', marginRight: 3 }} />Med</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#cc8800', marginRight: 3 }} />High</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#ff4444', marginRight: 3 }} />Very High</span>
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${c.border}`, paddingTop: 8, fontSize: 9, color: c.dim }}>
        <span data-eid="footer-timestamp">Last Updated: {data.lastUpdated}</span>
        <span data-eid="footer-source">Data: CBOE / OCC</span>
      </footer>
    </section>
  );
}
