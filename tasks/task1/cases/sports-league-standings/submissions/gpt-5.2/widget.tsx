// submissions/chatgpt/widget.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy } from 'lucide-react';
import data from './data.json';

type FormChar = 'W' | 'D' | 'L';

const formColor = (c: FormChar) => {
  if (c === 'W') return '#39e07a';
  if (c === 'D') return '#9aa3b2';
  return '#ff5a60';
};

const Widget: React.FC = () => {
  const rows = data.standings;

  const col = {
    rank: 34,
    team: 170,
    mp: 40,
    w: 32,
    d: 32,
    l: 32,
    gf: 34,
    ga: 34,
    gd: 44,
    pts: 40,
    form: 92,
  };

  const headerCellStyle: React.CSSProperties = {
    color: '#74809a',
    fontSize: 11,
    letterSpacing: 0.8,
    fontWeight: 700,
  };

  const cellStyle: React.CSSProperties = {
    color: '#cfd6e3',
    fontSize: 13,
    fontWeight: 600,
  };

  const thinCellStyle: React.CSSProperties = {
    color: '#aab3c2',
    fontSize: 12,
    fontWeight: 600,
  };

  const card: React.CSSProperties = {
    width: 500,
    borderRadius: 18,
    padding: 16,
    background:
      'radial-gradient(120% 140% at 20% 10%, rgba(45,90,160,0.35), rgba(16,22,36,0.96) 55%), linear-gradient(180deg, rgba(26,33,52,0.98), rgba(12,16,27,0.98))',
    boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  };

  const tableOuter: React.CSSProperties = {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    background: 'rgba(6,10,18,0.18)',
    border: '1px solid rgba(255,255,255,0.06)',
  };

  const rowBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: 30,
    padding: '0 10px',
    boxSizing: 'border-box',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  };

  const renderFormDots = (form: FormChar[]) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 5, width: col.form }}>
      {form.map((c, i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: formColor(c),
            boxShadow: '0 0 0 2px rgba(255,255,255,0.04) inset',
          }}
        />
      ))}
    </div>
  );

  const chartData = rows.map((r) => ({
    team: r.teamShort,
    pts: r.pts,
    zone: r.zone,
  }));

  const barFill = (zone: string) => {
    if (zone === 'relegation') return '#c84445';
    if (zone === 'cl') return '#2c63c9';
    return '#5d6a7f';
  };

  return (
    <section data-eid="root" style={card}>
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Trophy size={18} color="#f5c84c" />
          <div
            data-eid="league-name"
            style={{ color: '#e8edf7', fontSize: 18, fontWeight: 800 }}
          >
            {data.league}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            data-eid="season-badge"
            style={{
              color: '#bcd3ff',
              fontWeight: 800,
              fontSize: 12,
              padding: '4px 10px',
              borderRadius: 999,
              background: 'rgba(61,110,200,0.18)',
              border: '1px solid rgba(120,170,255,0.22)',
            }}
          >
            {data.season}
          </span>
          <span
            data-eid="matchday-badge"
            style={{
              color: '#ffe39a',
              fontWeight: 800,
              fontSize: 12,
              padding: '4px 10px',
              borderRadius: 999,
              background: 'rgba(190,140,30,0.14)',
              border: '1px solid rgba(255,210,120,0.18)',
            }}
          >
            {data.matchday}
          </span>
        </div>
      </header>

      <div
        data-eid="legend-row"
        style={{ display: 'flex', alignItems: 'center', gap: 18, margin: '4px 0 10px 2px' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#97a3b8', fontSize: 12 }}>
          <span
            data-eid="legend-cl"
            style={{
              width: 10,
              height: 3,
              borderRadius: 3,
              background: '#2c63c9',
              display: 'inline-block',
            }}
          />
          Champions League
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#97a3b8', fontSize: 12 }}>
          <span
            data-eid="legend-relegation"
            style={{
              width: 10,
              height: 3,
              borderRadius: 3,
              background: '#c84445',
              display: 'inline-block',
            }}
          />
          Relegation
        </span>
      </div>

      <div data-eid="table-section" style={tableOuter}>
        <div
          data-eid="table-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 32,
            padding: '0 10px',
            boxSizing: 'border-box',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <span data-eid="table-header-rank" style={{ ...headerCellStyle, width: col.rank }}>
            #
          </span>
          <span data-eid="table-header-team" style={{ ...headerCellStyle, width: col.team }}>
            TEAM
          </span>
          <span data-eid="table-header-mp" style={{ ...headerCellStyle, width: col.mp, textAlign: 'right' }}>
            MP
          </span>
          <span data-eid="table-header-w" style={{ ...headerCellStyle, width: col.w, textAlign: 'right' }}>
            W
          </span>
          <span data-eid="table-header-d" style={{ ...headerCellStyle, width: col.d, textAlign: 'right' }}>
            D
          </span>
          <span data-eid="table-header-l" style={{ ...headerCellStyle, width: col.l, textAlign: 'right' }}>
            L
          </span>
          <span data-eid="table-header-gf" style={{ ...headerCellStyle, width: col.gf, textAlign: 'right' }}>
            GF
          </span>
          <span data-eid="table-header-ga" style={{ ...headerCellStyle, width: col.ga, textAlign: 'right' }}>
            GA
          </span>
          <span data-eid="table-header-gd" style={{ ...headerCellStyle, width: col.gd, textAlign: 'right' }}>
            GD
          </span>
          <span data-eid="table-header-pts" style={{ ...headerCellStyle, width: col.pts, textAlign: 'right' }}>
            PTS
          </span>
          <span data-eid="table-header-form" style={{ ...headerCellStyle, width: col.form, textAlign: 'right' }}>
            FORM
          </span>
        </div>

        {rows.map((r, idx) => {
          const isTop = r.zone === 'cl';
          const isRel = r.zone === 'relegation';

          const leftStripe = isTop ? '#2c63c9' : isRel ? '#c84445' : 'transparent';
          const bg =
            idx === 0
              ? 'rgba(30,55,95,0.38)'
              : 'rgba(255,255,255,0.015)';

          const rowStyle: React.CSSProperties = {
            ...rowBase,
            background: bg,
            position: 'relative',
          };

          const commonRankStyle: React.CSSProperties = {
            ...thinCellStyle,
            width: col.rank,
          };

          const commonTeamStyle: React.CSSProperties = {
            ...cellStyle,
            width: col.team,
            color: idx === 0 ? '#eaf0ff' : '#dce3f0',
          };

          const gdColor =
            r.gd > 0 ? '#39e07a' : r.gd < 0 ? '#ff5a60' : '#b6bfce';

          const ptsStyle: React.CSSProperties = {
            ...cellStyle,
            width: col.pts,
            textAlign: 'right',
            color: idx === 0 ? '#eaf0ff' : '#dbe2ef',
            fontWeight: 800,
          };

          const tagRowEid = `team-row-${idx}`;
          const stripe = (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 3,
                background: leftStripe,
                opacity: leftStripe === 'transparent' ? 0 : 1,
              }}
            />
          );

          if (idx === 0) {
            return (
              <div key={r.rank} data-eid={tagRowEid} style={rowStyle}>
                {stripe}
                <span data-eid="team-row-0-rank" style={commonRankStyle}>
                  {r.rank}
                </span>
                <span data-eid="team-row-0-name" style={commonTeamStyle}>
                  {r.team}
                </span>
                <span data-eid="team-row-0-mp" style={{ ...thinCellStyle, width: col.mp, textAlign: 'right' }}>
                  {r.mp}
                </span>
                <span data-eid="team-row-0-w" style={{ ...thinCellStyle, width: col.w, textAlign: 'right' }}>
                  {r.w}
                </span>
                <span data-eid="team-row-0-d" style={{ ...thinCellStyle, width: col.d, textAlign: 'right' }}>
                  {r.d}
                </span>
                <span data-eid="team-row-0-l" style={{ ...thinCellStyle, width: col.l, textAlign: 'right' }}>
                  {r.l}
                </span>
                <span data-eid="team-row-0-gf" style={{ ...thinCellStyle, width: col.gf, textAlign: 'right' }}>
                  {r.gf}
                </span>
                <span data-eid="team-row-0-ga" style={{ ...thinCellStyle, width: col.ga, textAlign: 'right' }}>
                  {r.ga}
                </span>
                <span
                  data-eid="team-row-0-gd"
                  style={{ ...cellStyle, width: col.gd, textAlign: 'right', color: gdColor, fontWeight: 900 }}
                >
                  {r.gd > 0 ? `+${r.gd}` : `${r.gd}`}
                </span>
                <span data-eid="team-row-0-pts" style={ptsStyle}>
                  {r.pts}
                </span>
                <div data-eid="team-row-0-form">{renderFormDots(r.form)}</div>
              </div>
            );
          }

          // For rows 1..11: only some eids exist; keep layout identical but attach required eids.
          const rankEid = `team-row-${idx}-rank`;
          const nameEid = `team-row-${idx}-name`;
          const ptsEid = `team-row-${idx}-pts`;
          const formEid = `team-row-${idx}-form`;

          return (
            <div key={r.rank} data-eid={tagRowEid} style={rowStyle}>
              {stripe}
              <span data-eid={rankEid} style={commonRankStyle}>
                {r.rank}
              </span>
              <span data-eid={nameEid} style={commonTeamStyle}>
                {r.team}
              </span>

              <span style={{ ...thinCellStyle, width: col.mp, textAlign: 'right' }}>{r.mp}</span>
              <span style={{ ...thinCellStyle, width: col.w, textAlign: 'right' }}>{r.w}</span>
              <span style={{ ...thinCellStyle, width: col.d, textAlign: 'right' }}>{r.d}</span>
              <span style={{ ...thinCellStyle, width: col.l, textAlign: 'right' }}>{r.l}</span>
              <span style={{ ...thinCellStyle, width: col.gf, textAlign: 'right' }}>{r.gf}</span>
              <span style={{ ...thinCellStyle, width: col.ga, textAlign: 'right' }}>{r.ga}</span>
              <span style={{ ...cellStyle, width: col.gd, textAlign: 'right', color: gdColor, fontWeight: 900 }}>
                {r.gd > 0 ? `+${r.gd}` : `${r.gd}`}
              </span>
              <span data-eid={ptsEid} style={ptsStyle}>
                {r.pts}
              </span>
              <div data-eid={formEid}>{renderFormDots(r.form)}</div>
            </div>
          );
        })}
      </div>

      <div data-eid="points-chart" style={{ marginTop: 14 }}>
        <div
          data-eid="points-chart-title"
          style={{ color: '#cfd6e3', fontSize: 14, fontWeight: 800, marginBottom: 10 }}
        >
          Points Distribution
        </div>

        <div
          style={{
            height: 150,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: 8,
            boxSizing: 'border-box',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 18, left: 0 }}>
              <XAxis
                dataKey="team"
                tick={{ fill: '#7e8aa3', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                angle={-35}
                textAnchor="end"
                height={45}
              />
              <YAxis hide domain={[0, 70]} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={{
                  background: 'rgba(10,14,24,0.95)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  color: '#e8edf7',
                  fontSize: 12,
                }}
                labelStyle={{ color: '#cfd6e3', fontWeight: 800 }}
              />
              <Bar
                dataKey="pts"
                radius={[4, 4, 4, 4]}
                isAnimationActive={false}
                fill="#5d6a7f"
              >
                {chartData.map((entry, i) => (
                  <React.Fragment key={i}>
                    {/* recharts Cell import not allowed, so render separate bars via Bar's fill isn't possible.
                        We'll instead set Bar fill overall and rely on overlay bars using multiple Bars. */}
                  </React.Fragment>
                ))}
              </Bar>
              {/* zone-specific overlays */}
              <Bar dataKey="pts" radius={[4, 4, 4, 4]} isAnimationActive={false} fill="transparent">
                {chartData.map((_e, i) => null)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Manual overlay bars (simple) */}
          <div style={{ position: 'relative', top: -150, height: 150, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', padding: '8px 8px 34px 34px', boxSizing: 'border-box' }}>
              {chartData.map((d, i) => {
                const max = 70;
                const h = Math.max(0, Math.min(1, d.pts / max)) * 92; // chart inner height approx
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div
                      style={{
                        width: 28,
                        height: h,
                        background: barFill(d.zone),
                        borderRadius: 4,
                        opacity: 0.95,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Widget;