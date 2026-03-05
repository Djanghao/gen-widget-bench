import data from './data.json'
import { Music, Star, Heart, AlertTriangle, Calendar, Users } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function StarRating({ count, eid }: { count: number; eid: string }) {
  return (
    <div data-eid={eid} style={{ display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={8} fill={s <= count ? '#fbbf24' : 'transparent'} color={s <= count ? '#fbbf24' : 'rgba(255,255,255,0.25)'} />
      ))}
    </div>
  )
}

export default function Widget() {
  const stages = data.stages

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #2d1b69 0%, #7c2d8e 30%, #f97316 70%, #ec4899 100%)',
        borderRadius: 20,
        color: '#ffffff',
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
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 data-eid="title" style={{ fontSize: 17, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Music size={18} color="#ffffff" /> {data.festivalName}
          </h1>
          <span data-eid="date-label" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
            <Calendar size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />
            {data.date}
          </span>
        </div>
        <span data-eid="favorites-count" style={{ fontSize: 11, color: '#ffffff', background: 'rgba(236,72,153,0.4)', padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>
          <Heart size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />
          {data.favorites.length} Favorites
        </span>
      </header>

      <div data-eid="crowd-chart-section" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 10, border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
        <h2 data-eid="crowd-chart-title" style={{ fontSize: 12, fontWeight: 600, margin: '0 0 6px 0', color: 'rgba(255,255,255,0.8)' }}>
          <Users size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Crowd Density Predictions
        </h2>
        <div data-eid="crowd-area-chart" style={{ width: '100%', height: 130 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.crowdDensity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="time" tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.5)' }} />
              <YAxis tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.5)' }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: 'rgba(45,27,105,0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, fontSize: 10, color: '#ffffff' }} />
              <Area type="monotone" dataKey="main" stackId="1" stroke="#ec4899" fill="rgba(236,72,153,0.4)" />
              <Area type="monotone" dataKey="sunset" stackId="1" stroke="#f97316" fill="rgba(249,115,22,0.4)" />
              <Area type="monotone" dataKey="forest" stackId="1" stroke="#fbbf24" fill="rgba(251,191,36,0.3)" />
              <Area type="monotone" dataKey="electronic" stackId="1" stroke="#a78bfa" fill="rgba(167,139,250,0.3)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="schedule-grid" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {stages.map((stage, si) => (
          <div key={stage.name}>
            <div
              data-eid={`stage-header-${si}`}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#ffffff',
                padding: '4px 8px',
                marginBottom: 4,
                borderLeft: `3px solid ${stage.color}`,
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              {stage.name}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              {stage.slots.map((slot, ti) => (
                <div
                  key={slot.artist}
                  data-eid={`slot-${si}-${ti}`}
                  style={{
                    background: slot.favorite ? `rgba(236,72,153,0.25)` : 'rgba(255,255,255,0.1)',
                    border: `1px solid ${slot.favorite ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 8,
                    padding: '5px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span data-eid={`slot-${si}-${ti}-artist`} style={{ fontSize: 10, fontWeight: 700, color: '#ffffff' }}>
                    {slot.favorite && <Heart size={8} color="#ec4899" fill="#ec4899" style={{ marginRight: 2, verticalAlign: 'middle' }} />}
                    {slot.artist}
                  </span>
                  {si < 2 && (
                    <span data-eid={`slot-${si}-${ti}-genre`} style={{ fontSize: 8, color: '#ffffff', background: `rgba(255,255,255,0.15)`, padding: '0 4px', borderRadius: 4, alignSelf: 'flex-start' }}>
                      {slot.genre}
                    </span>
                  )}
                  <span data-eid={`slot-${si}-${ti}-time`} style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>{slot.time}</span>
                  <StarRating count={slot.stars} eid={`slot-${si}-${ti}-rating`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {data.conflicts.map((conflict, ci) => (
          <span
            key={ci}
            data-eid={`conflict-${ci}`}
            style={{
              fontSize: 9,
              color: '#fbbf24',
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.3)',
              padding: '3px 6px',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <AlertTriangle size={9} /> {conflict.artists.join(' vs ')} @ {conflict.time}
          </span>
        ))}
      </div>

      <div data-eid="favorites-sidebar" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 10, border: '1px solid rgba(236,72,153,0.3)', backdropFilter: 'blur(10px)' }}>
        <h2 data-eid="favorites-title" style={{ fontSize: 12, fontWeight: 600, margin: '0 0 6px 0', color: '#ec4899' }}>
          <Heart size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} /> My Lineup
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.favorites.map((fav, fi) => (
            <div
              key={fav.artist}
              data-eid={`fav-${fi}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 10,
                padding: '3px 6px',
                background: 'rgba(236,72,153,0.1)',
                borderRadius: 6,
              }}
            >
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{fav.artist}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{fav.stage} - {fav.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
