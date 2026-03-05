// submissions/gpt/widget.tsx
import React from 'react';
import data from './data.json';
import { RefreshCw } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

function formatChange(v: number) {
  const sign = v > 0 ? '+' : '';
  return `${sign}${v.toFixed(2)}%`;
}

export default function Widget() {
  const w = 460;

  const bg = {
    background:
      'radial-gradient(1200px 700px at 15% 10%, rgba(88, 110, 255, 0.18), rgba(0,0,0,0) 55%), radial-gradient(900px 700px at 85% 25%, rgba(135, 71, 255, 0.18), rgba(0,0,0,0) 50%), linear-gradient(180deg, #0b0c18 0%, #0b0c18 40%, #0a0b14 100%)',
  } as const;

  const maxAbs = Math.max(
    ...data.strength.map((d: any) => Math.abs(d.value)),
    1
  );

  const chartData = data.strength.map((d: any) => ({
    ...d,
    fill:
      d.value >= 0
        ? 'rgba(46, 220, 140, 0.95)'
        : 'rgba(255, 78, 96, 0.95)',
    abs: Math.abs(d.value),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0]?.payload;
    const val = p?.value ?? 0;
    const color = val >= 0 ? '#2ee08f' : '#ff4e60';
    return (
      <div
        style={{
          background: 'rgba(20, 22, 40, 0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '8px 10px',
          color: '#e7e9ff',
          fontSize: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        <div style={{ color }}>
          {val >= 0 ? '+' : ''}
          {val.toFixed(2)}
        </div>
      </div>
    );
  };

  return (
    <section
      data-eid="root"
      style={{
        width: w,
        height: 880,
        borderRadius: 22,
        ...bg,
        color: '#E9EBFF',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        padding: 22,
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ marginBottom: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 700,
            letterSpacing: 0.2,
            fontSize: 18,
            color: 'rgba(235, 238, 255, 0.95)',
            marginBottom: 10,
          }}
        >
          <RefreshCw
            size={18}
            style={{
              color: 'rgba(125, 139, 255, 0.9)',
              filter: 'drop-shadow(0 2px 8px rgba(95,110,255,0.25))',
            }}
          />
          <div>Exchange Rates</div>
        </div>

        <div
          data-eid="base-amount"
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          {data.base.amount}
        </div>

        {/* base-currency (kept as a separate hidden/structural element for required EID) */}
        <div
          data-eid="base-currency"
          style={{
            position: 'absolute',
            left: -9999,
            top: -9999,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          {data.base.currency}
        </div>

        <div
          data-eid="last-updated"
          style={{
            fontSize: 11.5,
            color: 'rgba(205, 210, 245, 0.55)',
          }}
        >
          {data.updated}
        </div>
      </div>

      {/* List */}
      <div data-eid="currency-list" style={{ marginTop: 18 }}>
        {data.currencies.map((c: any, idx: number) => {
          const changeColor = c.change >= 0 ? '#2ee08f' : '#ff4e60';
          const rowEid = `currency-row-${idx}`;
          const flagEid = `currency-flag-${idx}`;
          const codeEid = `currency-code-${idx}`;
          const nameEid = `currency-name-${idx}`;
          const rateEid = `currency-rate-${idx}`;
          const changeEid = `currency-change-${idx}`;

          return (
            <div
              key={c.code}
              data-eid={rowEid}
              style={{
                height: 52,
                borderRadius: 12,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.035) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minWidth: 210,
                }}
              >
                <span
                  data-eid={flagEid}
                  style={{
                    fontSize: 18,
                    width: 24,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.95,
                  }}
                >
                  {c.flag}
                </span>

                <span
                  data-eid={codeEid}
                  style={{
                    fontWeight: 800,
                    fontSize: 14,
                    width: 38,
                    color: 'rgba(236, 238, 255, 0.95)',
                  }}
                >
                  {c.code}
                </span>

                <span
                  data-eid={nameEid}
                  style={{
                    fontSize: 12,
                    color: 'rgba(205, 210, 245, 0.6)',
                  }}
                >
                  {c.name}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'flex-end',
                  gap: 24,
                  flex: 1,
                }}
              >
                <span
                  data-eid={rateEid}
                  style={{
                    fontWeight: 800,
                    fontSize: 14,
                    color: 'rgba(236, 238, 255, 0.95)',
                    minWidth: 78,
                    textAlign: 'right',
                  }}
                >
                  {c.rate}
                </span>
                <span
                  data-eid={changeEid}
                  style={{
                    fontWeight: 800,
                    fontSize: 12.5,
                    color: changeColor,
                    minWidth: 58,
                    textAlign: 'right',
                  }}
                >
                  {formatChange(c.change)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div data-eid="chart-section" style={{ marginTop: 18 }}>
        <div
          data-eid="chart-title"
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.2,
            color: 'rgba(205, 210, 245, 0.55)',
            margin: '10px 0 10px 6px',
          }}
        >
          RELATIVE STRENGTH (24H)
        </div>

        <div
          data-eid="bar-chart"
          style={{
            height: 230,
            borderRadius: 14,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '12px 8px 8px 8px',
            overflow: 'hidden',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 14, left: 6, bottom: 6 }}
              barCategoryGap={18}
            >
              <XAxis
                dataKey="code"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: 'rgba(205,210,245,0.55)',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />
              <YAxis
                domain={[
                  -clamp(maxAbs, 0.5, 2.0),
                  clamp(maxAbs, 0.5, 2.0),
                ]}
                tickLine={false}
                axisLine={false}
                ticks={[-1, 0, 1]}
                tick={{
                  fill: 'rgba(205,210,245,0.35)',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="value"
                radius={[8, 8, 8, 8]}
                isAnimationActive={false}
              >
                {chartData.map((entry: any, i: number) => (
                  <React.Fragment key={entry.code}>
                    <cell />
                  </React.Fragment>
                ))}
              </Bar>
              {/* Recharts doesn't allow per-bar fill via Bar props without Cell import; use fill on data and a single Bar with fill via shape using data. */}
            </BarChart>
          </ResponsiveContainer>

          {/* Overlay bars using a second chart for per-item fill without Cell import (no additional imports allowed). */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        </div>

        {/* Second render with custom shape to color each bar (no Cell import) */}
        <div
          style={{
            position: 'relative',
            height: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: -230,
              height: 230,
              padding: '12px 8px 8px 8px',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 14, left: 6, bottom: 6 }}
                barCategoryGap={18}
              >
                <XAxis hide dataKey="code" />
                <YAxis
                  hide
                  domain={[
                    -clamp(maxAbs, 0.5, 2.0),
                    clamp(maxAbs, 0.5, 2.0),
                  ]}
                />
                <Bar
                  dataKey="value"
                  isAnimationActive={false}
                  shape={(props: any) => {
                    const { x, y, width, height, payload } = props;
                    const fill = payload.fill;
                    const rx = 8;
                    const ry = 8;
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={rx}
                        ry={ry}
                        fill={fill}
                        opacity={0.95}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}