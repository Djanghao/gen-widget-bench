// submissions/chatgpt/widget.tsx
import React from 'react';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import data from './data.json';

const fmtMoney = (v: number) =>
  v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

const Widget: React.FC = () => {
  const d: any = data;

  const styles: Record<string, React.CSSProperties> = {
    root: {
      width: 460,
      height: 640,
      borderRadius: 22,
      background:
        'radial-gradient(120% 120% at 30% 20%, rgba(55,60,100,0.35) 0%, rgba(20,22,35,0.95) 45%, rgba(12,13,22,1) 100%)',
      color: '#E9ECF6',
      boxShadow: '0 22px 50px rgba(10,12,20,0.35)',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
      position: 'relative',
      overflow: 'hidden',
      padding: 22,
    },
    headerRow: { display: 'flex', flexDirection: 'column', gap: 8 },
    title: {
      fontSize: 12,
      letterSpacing: 1.2,
      color: 'rgba(233,236,246,0.55)',
      textTransform: 'uppercase',
    },
    total: { fontSize: 34, fontWeight: 800, lineHeight: 1.05 },
    change: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: '#3BEA87',
      fontSize: 14,
      fontWeight: 700,
    },
    changeSmall: { color: '#3BEA87', fontWeight: 700 },
    chartSection: { marginTop: 18 },
    chartLabel: { fontSize: 12, color: 'rgba(233,236,246,0.45)' },
    chartWrap: {
      marginTop: 10,
      height: 165,
      borderRadius: 14,
      position: 'relative',
    },
    holdingsHeader: {
      marginTop: 16,
      fontSize: 12,
      letterSpacing: 1.2,
      color: 'rgba(233,236,246,0.45)',
      fontWeight: 800,
      textTransform: 'uppercase',
    },
    list: { marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 },
    row: {
      height: 68,
      borderRadius: 14,
      background:
        'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      display: 'grid',
      gridTemplateColumns: '52px 1fr 120px 110px',
      alignItems: 'center',
      padding: '0 14px',
      columnGap: 10,
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0B0C14',
      fontWeight: 900,
      position: 'relative',
    },
    iconMark: {
      width: 18,
      height: 18,
      borderRadius: 6,
      background: 'rgba(255,255,255,0.22)',
      position: 'absolute',
      inset: 0,
      margin: 'auto',
      opacity: 0,
    },
    nameBlock: { display: 'flex', flexDirection: 'column', gap: 4 },
    name: { fontSize: 15, fontWeight: 800, color: '#E9ECF6' },
    symbol: { fontSize: 12, color: 'rgba(233,236,246,0.45)', marginTop: -2 },
    priceBlock: {
      justifySelf: 'end',
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      paddingRight: 12,
      borderRight: '1px solid rgba(255,255,255,0.08)',
    },
    price: { fontSize: 13, color: 'rgba(233,236,246,0.92)', fontWeight: 700 },
    pct: { fontSize: 12, fontWeight: 800 },
    holdings: {
      justifySelf: 'end',
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
    holdingsValue: { fontSize: 13, fontWeight: 800, color: 'rgba(233,236,246,0.95)' },
    holdingsAmt: { fontSize: 12, color: 'rgba(233,236,246,0.45)' },
  };

  const renderRow = (coin: any, idx: number) => {
    const pctColor = coin.changePct >= 0 ? '#3BEA87' : '#FF5B6E';
    const iconBg = `linear-gradient(135deg, ${coin.iconColorFrom} 0%, ${coin.iconColorTo} 100%)`;

    return (
      <div
        key={coin.symbol}
        data-eid={`coin-row-${idx}`}
        style={styles.row}
      >
        <div data-eid={`coin-icon-${idx}`} style={{ ...styles.icon, background: iconBg }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              border: '2px solid rgba(255,255,255,0.9)',
              opacity: 0.9,
            }}
          />
        </div>

        <div data-eid={`coin-name-${idx}`} style={styles.nameBlock}>
          <div style={styles.name}>{coin.name}</div>
          <div style={styles.symbol}>{coin.symbol}</div>
        </div>

        <div data-eid={`coin-price-${idx}`} style={styles.priceBlock}>
          <div style={styles.price}>{fmtMoney(coin.priceUsd)}</div>
          <div data-eid={`coin-change-${idx}`} style={{ ...styles.pct, color: pctColor }}>
            {coin.changePct >= 0 ? '+' : ''}
            {coin.changePct.toFixed(2)}%
          </div>
        </div>

        <div data-eid={`coin-holdings-${idx}`} style={styles.holdings}>
          <div style={styles.holdingsValue}>{fmtMoney(coin.holdingsValueUsd)}</div>
          <div style={styles.holdingsAmt}>
            {coin.holdingsAmount} {coin.symbol}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section data-eid="root" style={styles.root}>
      <div data-eid="header" style={styles.headerRow}>
        <div data-eid="portfolio-title" style={styles.title}>
          {d.header.title}
        </div>
        <div data-eid="total-value" style={styles.total}>
          {d.header.totalValue}
        </div>
        <div data-eid="total-change" style={styles.change}>
          <TrendingUp size={18} color="#3BEA87" />
          <span style={styles.changeSmall}>
            {d.header.totalChangeLine}
          </span>
        </div>
      </div>

      <div data-eid="chart-section" style={styles.chartSection}>
        <div data-eid="chart-label" style={styles.chartLabel}>
          {d.chart.label}
        </div>
        <div data-eid="area-chart" style={styles.chartWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={d.chart.series} margin={{ top: 10, right: 6, left: 6, bottom: 0 }}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3BEA87" stopOpacity={0.35} />
                  <stop offset="55%" stopColor="#3BEA87" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#3BEA87" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(233,236,246,0.4)', fontSize: 11 }}
                dy={8}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3BEA87"
                strokeWidth={2.2}
                fill="url(#g)"
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="holdings-header" style={styles.holdingsHeader}>
        {d.holdingsHeader}
      </div>

      <div style={styles.list}>
        {d.holdings.slice(0, 5).map((c: any, i: number) => renderRow(c, i))}
      </div>
    </section>
  );
};

export default Widget;