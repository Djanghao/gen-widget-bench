import { Trophy, Shield } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid } from 'recharts'
import data from './data.json'

type Team = {
  rank: number
  name: string
  mp: number
  w: number
  d: number
  l: number
  gf: number
  ga: number
  gd: number
  pts: number
  form: string[]
  zone: string | null
}

type LeagueData = {
  league: string
  season: string
  matchday: number
  teams: Team[]
}

const league = data as LeagueData

const formColors: Record<string, string> = {
  W: '#4ade80',
  D: '#94a3b8',
  L: '#f87171',
}

const zoneStyles: Record<string, { borderColor: string; bg: string }> = {
  cl: { borderColor: 'rgba(59,130,246,0.5)', bg: 'rgba(59,130,246,0.06)' },
  relegation: { borderColor: 'rgba(239,68,68,0.5)', bg: 'rgba(239,68,68,0.06)' },
}

const colTemplate = '28px 1fr 28px 28px 28px 28px 28px 28px 32px 36px 70px'

export default function Widget() {
  const chartData = league.teams.map((t) => ({
    name: t.name.length > 6 ? t.name.slice(0, 6) : t.name,
    pts: t.pts,
    color: t.zone === 'cl' ? '#3b82f6' : t.zone === 'relegation' ? '#ef4444' : '#64748b',
  }))

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #172033 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 500,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
      >
        <Trophy size={18} color="#fbbf24" />
        <div data-eid="league-name" style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>
          {league.league}
        </div>
        <span
          data-eid="season-badge"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 8,
            color: '#a5b4fc',
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
          }}
        >
          {league.season}
        </span>
        <span
          data-eid="matchday-badge"
          style={{
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.3)',
            borderRadius: 8,
            color: '#fde68a',
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
          }}
        >
          Matchday {league.matchday}
        </span>
      </header>

      <div
        data-eid="legend-row"
        style={{ display: 'flex', gap: 16, fontSize: 10, color: '#94a3b8' }}
      >
        <span data-eid="legend-cl" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 3, background: '#3b82f6', borderRadius: 2, display: 'inline-block' }} />
          Champions League
        </span>
        <span data-eid="legend-relegation" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 3, background: '#ef4444', borderRadius: 2, display: 'inline-block' }} />
          Relegation
        </span>
      </div>

      <div data-eid="table-section" style={{ display: 'grid', gap: 2 }}>
        <div
          data-eid="table-header"
          style={{
            display: 'grid',
            gridTemplateColumns: colTemplate,
            gap: 2,
            padding: '4px 6px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            fontSize: 9,
            fontWeight: 700,
            color: '#475569',
            textTransform: 'uppercase',
          }}
        >
          <span data-eid="table-header-rank">#</span>
          <span data-eid="table-header-team">Team</span>
          <span data-eid="table-header-mp" style={{ textAlign: 'center' }}>MP</span>
          <span data-eid="table-header-w" style={{ textAlign: 'center' }}>W</span>
          <span data-eid="table-header-d" style={{ textAlign: 'center' }}>D</span>
          <span data-eid="table-header-l" style={{ textAlign: 'center' }}>L</span>
          <span data-eid="table-header-gf" style={{ textAlign: 'center' }}>GF</span>
          <span data-eid="table-header-ga" style={{ textAlign: 'center' }}>GA</span>
          <span data-eid="table-header-gd" style={{ textAlign: 'center' }}>GD</span>
          <span data-eid="table-header-pts" style={{ textAlign: 'center' }}>Pts</span>
          <span data-eid="table-header-form" style={{ textAlign: 'center' }}>Form</span>
        </div>

        {league.teams.map((team, i) => {
          const zs = team.zone ? zoneStyles[team.zone] : null
          return (
            <div
              key={i}
              data-eid={`team-row-${i}`}
              style={{
                display: 'grid',
                gridTemplateColumns: colTemplate,
                gap: 2,
                padding: '5px 6px',
                fontSize: 11,
                alignItems: 'center',
                background: zs ? zs.bg : i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                borderLeft: zs ? `3px solid ${zs.borderColor}` : '3px solid transparent',
                borderRadius: 4,
              }}
            >
              <span data-eid={`team-row-${i}-rank`} style={{ color: '#64748b', fontWeight: 600, fontSize: 10 }}>
                {team.rank}
              </span>
              <span data-eid={`team-row-${i}-name`} style={{ fontWeight: 600, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {team.name}
              </span>
              {i === 0 ? (
                <>
                  <span data-eid={`team-row-${i}-mp`} style={{ textAlign: 'center', color: '#94a3b8' }}>{team.mp}</span>
                  <span data-eid={`team-row-${i}-w`} style={{ textAlign: 'center', color: '#94a3b8' }}>{team.w}</span>
                  <span data-eid={`team-row-${i}-d`} style={{ textAlign: 'center', color: '#94a3b8' }}>{team.d}</span>
                  <span data-eid={`team-row-${i}-l`} style={{ textAlign: 'center', color: '#94a3b8' }}>{team.l}</span>
                  <span data-eid={`team-row-${i}-gf`} style={{ textAlign: 'center', color: '#94a3b8' }}>{team.gf}</span>
                  <span data-eid={`team-row-${i}-ga`} style={{ textAlign: 'center', color: '#94a3b8' }}>{team.ga}</span>
                  <span data-eid={`team-row-${i}-gd`} style={{ textAlign: 'center', color: team.gd > 0 ? '#4ade80' : '#f87171', fontWeight: 600 }}>
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ textAlign: 'center', color: '#94a3b8' }}>{team.mp}</span>
                  <span style={{ textAlign: 'center', color: '#94a3b8' }}>{team.w}</span>
                  <span style={{ textAlign: 'center', color: '#94a3b8' }}>{team.d}</span>
                  <span style={{ textAlign: 'center', color: '#94a3b8' }}>{team.l}</span>
                  <span style={{ textAlign: 'center', color: '#94a3b8' }}>{team.gf}</span>
                  <span style={{ textAlign: 'center', color: '#94a3b8' }}>{team.ga}</span>
                  <span style={{ textAlign: 'center', color: team.gd > 0 ? '#4ade80' : team.gd < 0 ? '#f87171' : '#94a3b8', fontWeight: 600 }}>
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </span>
                </>
              )}
              <span data-eid={`team-row-${i}-pts`} style={{ textAlign: 'center', fontWeight: 700, color: '#f1f5f9' }}>
                {team.pts}
              </span>
              <div
                data-eid={`team-row-${i}-form`}
                style={{ display: 'flex', gap: 3, justifyContent: 'center' }}
              >
                {team.form.map((f, fi) => (
                  <span
                    key={fi}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: formColors[f] || '#64748b',
                      display: 'inline-block',
                      fontSize: 0,
                    }}
                    title={f}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div data-eid="points-chart" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="points-chart-title" style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>
          Points Distribution
        </div>
        <div style={{ height: 120, width: '100%' }}>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 8 }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" height={30} />
              <YAxis hide />
              <Bar dataKey="pts" radius={[3, 3, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
