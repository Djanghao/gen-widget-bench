// submissions/gpt/widget.tsx
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { Star, Clapperboard, Video, BadgeDollarSign } from 'lucide-react';
import data from './data.json';

export default function Widget() {
  const bg = 'linear-gradient(180deg, rgba(10,20,35,0.95) 0%, rgba(20,18,65,0.95) 55%, rgba(8,18,35,0.98) 100%)';

  const cardStyle: React.CSSProperties = {
    width: 408,
    height: 795,
    borderRadius: 22,
    overflow: 'hidden',
    background: bg,
    color: '#EAF0FF',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif',
    boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
    position: 'relative',
  };

  const topPosterStyle: React.CSSProperties = {
    height: 240,
    width: '100%',
    background:
      'linear-gradient(90deg, rgba(12,30,46,0.75) 0%, rgba(15,26,60,0.6) 55%, rgba(67,44,125,0.7) 100%)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const innerWrap: React.CSSProperties = {
    padding: '18px 18px 16px 18px',
  };

  const muted: React.CSSProperties = { color: 'rgba(205,215,240,0.55)' };
  const smallMuted: React.CSSProperties = { color: 'rgba(205,215,240,0.52)', fontSize: 12 };

  const pillBase: React.CSSProperties = {
    borderRadius: 999,
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const castAvatar = (bgc: string): React.CSSProperties => ({
    width: 44,
    height: 44,
    borderRadius: 999,
    background: bgc,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#F4F8FF',
    fontWeight: 800,
    fontSize: 13,
    boxShadow: '0 10px 18px rgba(0,0,0,0.25)',
  });

  const chartContainerStyle: React.CSSProperties = {
    marginTop: 10,
    height: 140,
    width: '100%',
  };

  const axisStyle: React.CSSProperties = {
    fontSize: 11,
    fill: 'rgba(205,215,240,0.5)',
  };

  const labelRow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  };

  const infoRow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
    fontSize: 13,
  };

  return (
    <section data-eid="root" style={cardStyle}>
      <div data-eid="poster-area" style={topPosterStyle}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))',
          }}
        >
          <Clapperboard size={28} color="rgba(230,240,255,0.35)" />
        </div>
      </div>

      <div style={innerWrap}>
        <div
          data-eid="title-row"
          style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 2 }}
        >
          <h2
            data-eid="movie-title"
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            {data.title}
          </h2>
          <span data-eid="movie-year" style={{ ...muted, fontSize: 14 }}>
            ({data.year})
          </span>
        </div>

        <div data-eid="meta-row" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <span data-eid="runtime" style={{ ...muted, fontSize: 13 }}>
            {data.runtime}
          </span>
          <span
            data-eid="pg-rating"
            style={{
              ...pillBase,
              padding: '4px 10px',
              background: 'rgba(255,204,51,0.12)',
              border: '1px solid rgba(255,204,51,0.85)',
              color: '#FFCC33',
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            {data.pg}
          </span>
        </div>

        <div data-eid="score-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <span data-eid="score-star-1" style={{ display: 'inline-flex' }}>
            <Star size={18} color="#FFC928" fill="#FFC928" />
          </span>
          <span data-eid="score-star-2" style={{ display: 'inline-flex' }}>
            <Star size={18} color="#FFC928" fill="#FFC928" />
          </span>
          <span data-eid="score-star-3" style={{ display: 'inline-flex' }}>
            <Star size={18} color="#FFC928" fill="#FFC928" />
          </span>
          <span data-eid="score-star-4" style={{ display: 'inline-flex' }}>
            <Star size={18} color="#FFC928" fill="#FFC928" />
          </span>
          <span data-eid="score-star-5" style={{ display: 'inline-flex' }}>
            <Star size={18} color="#FFC928" fill="#FFC928" />
          </span>

          <span
            data-eid="score-value"
            style={{
              marginLeft: 2,
              color: '#FFCC33',
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            {data.score}
          </span>
        </div>

        <div data-eid="genre-row" style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <span
            data-eid="genre-scifi"
            style={{
              ...pillBase,
              background: 'rgba(132,85,255,0.18)',
              color: '#B8A6FF',
            }}
          >
            {data.genres[0]}
          </span>
          <span
            data-eid="genre-adventure"
            style={{
              ...pillBase,
              background: 'rgba(59,130,246,0.18)',
              color: '#57A3FF',
            }}
          >
            {data.genres[1]}
          </span>
          <span
            data-eid="genre-drama"
            style={{
              ...pillBase,
              background: 'rgba(236,72,153,0.16)',
              color: '#FF5AA7',
            }}
          >
            {data.genres[2]}
          </span>
        </div>

        <p
          data-eid="plot-summary"
          style={{
            margin: '14px 0 0 0',
            fontSize: 13.2,
            lineHeight: 1.55,
            color: 'rgba(222,231,252,0.6)',
            maxWidth: 360,
          }}
        >
          {data.plot}
        </p>

        <div data-eid="cast-section" style={{ marginTop: 18 }}>
          <h3 data-eid="cast-title" style={{ margin: '0 0 10px 0', fontSize: 14, fontWeight: 800 }}>
            {data.castTitle}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 6 }}>
            <div data-eid="cast-0" style={{ width: 86, textAlign: 'center' }}>
              <div data-eid="cast-0-avatar" style={castAvatar('#2D6CDF')}>
                {data.cast[0].initials}
              </div>
              <div style={{ ...smallMuted, marginTop: 7 }}>
                {data.cast[0].first}
                <br />
                {data.cast[0].last}
              </div>
            </div>

            <div data-eid="cast-1" style={{ width: 86, textAlign: 'center' }}>
              <div data-eid="cast-1-avatar" style={castAvatar('#6D4FE6')}>
                {data.cast[1].initials}
              </div>
              <div style={{ ...smallMuted, marginTop: 7 }}>
                {data.cast[1].first}
                <br />
                {data.cast[1].last}
              </div>
            </div>

            <div data-eid="cast-2" style={{ width: 86, textAlign: 'center' }}>
              <div data-eid="cast-2-avatar" style={castAvatar('#D83A92')}>
                {data.cast[2].initials}
              </div>
              <div style={{ ...smallMuted, marginTop: 7 }}>
                {data.cast[2].first}
                <br />
                {data.cast[2].last}
              </div>
            </div>

            <div data-eid="cast-3" style={{ width: 86, textAlign: 'center' }}>
              <div data-eid="cast-3-avatar" style={castAvatar('#0B9B73')}>
                {data.cast[3].initials}
              </div>
              <div style={{ ...smallMuted, marginTop: 7 }}>
                {data.cast[3].first}
                <br />
                {data.cast[3].last}
              </div>
            </div>
          </div>
        </div>

        <div data-eid="director-row" style={{ ...infoRow, marginTop: 10 }}>
          <Video size={15} color="rgba(205,215,240,0.55)" />
          <span style={{ ...muted }}>{data.directorLabel}</span>
          <span data-eid="director-name" style={{ fontWeight: 800, color: 'rgba(234,240,255,0.9)' }}>
            {data.director}
          </span>
        </div>

        <div data-eid="box-office-row" style={infoRow}>
          <BadgeDollarSign size={15} color="rgba(205,215,240,0.55)" />
          <span style={{ ...muted }}>{data.boxOfficeLabel}</span>
          <span
            data-eid="box-office-value"
            style={{ fontWeight: 900, color: '#26E3A6', letterSpacing: 0.1 }}
          >
            {data.boxOffice}
          </span>
        </div>

        <div data-eid="ratings-chart" style={{ marginTop: 14 }}>
          <span data-eid="chart-title" style={{ fontSize: 13, fontWeight: 800, color: 'rgba(234,240,255,0.82)' }}>
            {data.chartTitle}
          </span>

          <div style={chartContainerStyle}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.distribution} margin={{ top: 12, right: 10, left: 6, bottom: 10 }}>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ ...axisStyle }}
                />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  barSize={22}
                  fill="#3B82F6"
                />
                <Bar
                  dataKey="highlight"
                  radius={[4, 4, 0, 0]}
                  barSize={22}
                  fill="#FFC928"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
}