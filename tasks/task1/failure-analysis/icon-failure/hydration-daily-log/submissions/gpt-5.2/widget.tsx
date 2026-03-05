// submissions/<your-model-name>/widget.tsx
import React from 'react';
import { Droplet, Zap, TrendingUp } from 'lucide-react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import data from './data.json';

export default function Widget() {
  const bg0 = '#071A24';
  const bg1 = '#0A2230';
  const card = 'rgba(255,255,255,0.05)';
  const muted = 'rgba(230,245,255,0.45)';
  const muted2 = 'rgba(230,245,255,0.32)';
  const text = 'rgba(235,250,255,0.92)';
  const accent = '#22E0D0';
  const accent2 = '#16CDBD';
  const ringTrack = 'rgba(34,224,208,0.12)';
  const divider = 'rgba(34,224,208,0.22)';
  const orange = '#FFB020';

  const ringData = [{ name: 'progress', value: data.progress.percent, fill: accent }];

  return (
    <section
      data-eid="root"
      style={{
        width: 420,
        height: 690,
        borderRadius: 26,
        overflow: 'hidden',
        background: `radial-gradient(1200px 700px at 30% 15%, ${bg1} 0%, ${bg0} 55%, #061620 100%)`,
        boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        position: 'relative',
      }}
    >
      {/* header */}
      <div
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px 6px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span data-eid="header-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Droplet size={18} color={accent} />
          </span>
          <span
            data-eid="header-title"
            style={{ color: text, fontWeight: 700, fontSize: 18, letterSpacing: 0.2 }}
          >
            {data.header.title}
          </span>
        </div>
        <span
          data-eid="header-date"
          style={{
            color: muted2,
            fontSize: 12,
            letterSpacing: 0.2,
            marginTop: 2,
          }}
        >
          {data.header.date}
        </span>
      </div>

      {/* progress ring */}
      <div
        data-eid="progress-ring"
        style={{
          height: 230,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div data-eid="progress-chart" style={{ width: 260, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="74%"
              outerRadius="94%"
              startAngle={220}
              endAngle={-140}
              data={ringData}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={18}
                background={{ fill: ringTrack }}
                clockWise
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div
          data-eid="progress-center"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            data-eid="progress-current"
            style={{
              color: accent,
              fontWeight: 800,
              fontSize: 34,
              lineHeight: 1.05,
              marginTop: 2,
            }}
          >
            {data.progress.current}
          </div>
          <div
            data-eid="progress-goal"
            style={{
              color: muted2,
              fontSize: 12,
              marginTop: 4,
              letterSpacing: 0.2,
            }}
          >
            {data.progress.goal}
          </div>
          <div
            data-eid="progress-percent"
            style={{
              marginTop: 10,
              color: accent,
              fontSize: 12,
              fontWeight: 700,
              background: 'rgba(34,224,208,0.12)',
              borderRadius: 999,
              padding: '4px 10px',
              letterSpacing: 0.2,
            }}
          >
            {data.progress.percentText}
          </div>
        </div>
      </div>

      {/* hourly */}
      <div
        data-eid="hourly-section"
        style={{
          padding: '0 20px',
          marginTop: 6,
        }}
      >
        <div
          data-eid="hourly-title"
          style={{
            color: muted2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.1,
            marginBottom: 8,
          }}
        >
          {data.hourly.title}
        </div>

        <div
          data-eid="hourly-chart"
          style={{
            height: 120,
            background: 'transparent',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.hourly.bars} margin={{ top: 4, right: 0, bottom: 10, left: 0 }}>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'rgba(230,245,255,0.28)',
                  fontSize: 9,
                }}
                interval={0}
              />
              <YAxis hide domain={[0, data.hourly.max]} />
              <Bar
                dataKey="v"
                radius={[3, 3, 0, 0]}
                fill={accent2}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* quick add */}
      <div
        data-eid="quick-add-section"
        style={{
          padding: '10px 20px 0 20px',
          marginTop: 6,
        }}
      >
        <div
          data-eid="quick-add-title"
          style={{
            color: muted2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.1,
            marginBottom: 10,
          }}
        >
          {data.quickAdd.title}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {data.quickAdd.buttons.map((b: any) => (
            <div
              key={b.eid}
              data-eid={b.eid}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 12,
                background: 'rgba(34,224,208,0.08)',
                border: `1px solid ${divider}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: accent,
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              <Droplet size={14} color={accent} />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* history */}
      <div
        data-eid="history-section"
        style={{
          padding: '14px 20px 0 20px',
        }}
      >
        <div
          data-eid="history-title"
          style={{
            color: muted2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.1,
            marginBottom: 10,
          }}
        >
          {data.history.title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          {data.history.days.map((d: any, idx: number) => {
            const selected = !!d.active;
            return (
              <div
                key={d.day}
                data-eid={`history-day-${idx}`}
                style={{
                  width: 48,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    border: selected ? `2px solid ${accent}` : `2px solid rgba(230,245,255,0.12)`,
                    background: selected ? 'rgba(34,224,208,0.08)' : 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 999,
                      background: selected ? accent : 'transparent',
                    }}
                  />
                </div>
                <div style={{ color: muted2, fontSize: 10, marginTop: -2 }}>{d.day}</div>
                <div
                  style={{
                    color: selected ? accent : 'rgba(230,245,255,0.35)',
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {d.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* stats */}
      <div
        data-eid="stats-row"
        style={{
          padding: '16px 20px 18px 20px',
          display: 'flex',
          gap: 14,
          marginTop: 6,
        }}
      >
        <div
          data-eid="stat-daily-avg"
          style={{
            flex: 1,
            borderRadius: 16,
            background: card,
            padding: '14px 16px',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <TrendingUp size={18} color={accent} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div
              data-eid="stat-daily-avg-value"
              style={{ color: accent, fontWeight: 900, fontSize: 18, lineHeight: 1 }}
            >
              {data.stats.dailyAvg.value}
            </div>
            <div
              data-eid="stat-daily-avg-label"
              style={{ color: muted2, fontSize: 11 }}
            >
              {data.stats.dailyAvg.label}
            </div>
          </div>
        </div>

        <div
          data-eid="stat-streak"
          style={{
            flex: 1,
            borderRadius: 16,
            background: card,
            padding: '14px 16px',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <Zap size={18} color={orange} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div
              data-eid="stat-streak-value"
              style={{ color: orange, fontWeight: 900, fontSize: 18, lineHeight: 1 }}
            >
              {data.stats.streak.value}
            </div>
            <div data-eid="stat-streak-label" style={{ color: muted2, fontSize: 11 }}>
              {data.stats.streak.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}