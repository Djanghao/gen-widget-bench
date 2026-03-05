import { Home, MapPin, Bed, Bath, Maximize, Trophy } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import data from './data.json'

type Feature = { label: string; value: string }
type Property = {
  address: string
  neighborhood: string
  status: string
  statusColor: string
  price: string
  pricePerSqft: string
  beds: number
  baths: number
  sqft: string
  gradient: string
  priceHistory: number[]
  features: Feature[]
  score: number
}
type ListingData = {
  title: string
  subtitle: string
  location: string
  priceRange: string
  properties: Property[]
  verdict: { title: string; winner: string; winnerScore: number; reason: string }
}

const listing = data as ListingData

const scoreColors = (score: number) => {
  if (score >= 90) return '#4ade80'
  if (score >= 80) return '#818cf8'
  return '#fbbf24'
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a1035 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 14,
        maxWidth: 460,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
      >
        <Home size={20} color="#818cf8" />
        <div style={{ flex: 1 }}>
          <div data-eid="title" style={{ fontSize: 18, fontWeight: 700 }}>
            {listing.title}
          </div>
          <div data-eid="subtitle" style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>
            {listing.subtitle}
          </div>
        </div>
        <span
          data-eid="location-badge"
          style={{
            background: 'rgba(129,140,248,0.15)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <MapPin size={9} color="#a5b4fc" />
          {listing.location}
        </span>
        <span
          data-eid="price-range-badge"
          style={{
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 12,
            color: '#4ade80',
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 8px',
          }}
        >
          {listing.priceRange}
        </span>
      </header>

      <div
        data-eid="cards-row"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}
      >
        {listing.properties.map((prop, i) => {
          const barColor = scoreColors(prop.score)
          const sparkData = prop.priceHistory.map((v, j) => ({ i: j, v }))
          return (
            <div
              key={i}
              data-eid={`prop-${i}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                overflow: 'hidden',
                display: 'grid',
                gap: 0,
              }}
            >
              <div
                data-eid={`prop-${i}-image`}
                style={{
                  background: prop.gradient,
                  height: 56,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: 6,
                  position: 'relative',
                }}
              >
                <span
                  data-eid={`prop-${i}-status`}
                  style={{
                    background: `${prop.statusColor}25`,
                    border: `1px solid ${prop.statusColor}55`,
                    borderRadius: 6,
                    color: prop.statusColor,
                    fontSize: 7,
                    fontWeight: 700,
                    padding: '2px 5px',
                  }}
                >
                  {prop.status}
                </span>
                <Home size={14} color="rgba(255,255,255,0.4)" />
              </div>
              <div style={{ padding: '8px 8px 10px' }}>
                <div
                  data-eid={`prop-${i}-address`}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#cbd5e1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {prop.address}
                </div>
                <div
                  data-eid={`prop-${i}-neighborhood`}
                  style={{ fontSize: 8, color: '#64748b', marginBottom: 4 }}
                >
                  {prop.neighborhood}
                </div>
                <div
                  data-eid={`prop-${i}-price`}
                  style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}
                >
                  {prop.price}
                </div>
                <span
                  data-eid={`prop-${i}-ppsqft`}
                  style={{ fontSize: 8, color: '#64748b' }}
                >
                  {prop.pricePerSqft}
                </span>

                <div
                  data-eid={`prop-${i}-stats`}
                  style={{
                    display: 'flex',
                    gap: 5,
                    marginTop: 5,
                    paddingBottom: 5,
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span
                    data-eid={`prop-${i}-beds`}
                    style={{ fontSize: 8, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 2 }}
                  >
                    <Bed size={8} color="#94a3b8" />
                    {prop.beds} bd
                  </span>
                  <span
                    data-eid={`prop-${i}-baths`}
                    style={{ fontSize: 8, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 2 }}
                  >
                    <Bath size={8} color="#94a3b8" />
                    {prop.baths} ba
                  </span>
                  <span
                    data-eid={`prop-${i}-sqft`}
                    style={{ fontSize: 8, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 2 }}
                  >
                    <Maximize size={8} color="#94a3b8" />
                    {prop.sqft}
                  </span>
                </div>

                <div data-eid={`prop-${i}-sparkline`} style={{ height: 28, width: '100%', marginTop: 4, marginBottom: 4 }}>
                  <ResponsiveContainer width="100%" height={28}>
                    <AreaChart data={sparkData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id={`propGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={barColor} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={barColor} stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={barColor}
                        strokeWidth={1}
                        fill={`url(#propGrad${i})`}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {prop.features.map((feat, fi) => (
                  <div
                    key={fi}
                    data-eid={`prop-${i}-feat-${fi}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '3px 0',
                      borderBottom: fi < prop.features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 7, color: '#64748b' }}>{feat.label}</span>
                    <span style={{ fontSize: 7, color: '#cbd5e1', fontWeight: 600 }}>{feat.value}</span>
                  </div>
                ))}

                <div data-eid={`prop-${i}-score`} style={{ marginTop: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span data-eid={`prop-${i}-score-label`} style={{ fontSize: 7, color: '#64748b' }}>Score</span>
                    <span data-eid={`prop-${i}-score-value`} style={{ fontSize: 8, fontWeight: 700, color: barColor }}>{prop.score}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
                    <div
                      data-eid={`prop-${i}-score-bar`}
                      style={{
                        background: `linear-gradient(90deg, ${barColor}cc, ${barColor})`,
                        height: '100%',
                        width: `${prop.score}%`,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div
        data-eid="verdict"
        style={{
          background: 'rgba(129,140,248,0.08)',
          border: '1px solid rgba(129,140,248,0.2)',
          borderRadius: 12,
          padding: 12,
          display: 'grid',
          gap: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Trophy size={14} color="#fbbf24" />
          <div data-eid="verdict-title" style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>
            {listing.verdict.title}
          </div>
        </div>
        <div data-eid="verdict-winner" style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>
          {listing.verdict.winner}
        </div>
        <div data-eid="verdict-reason" style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.4 }}>
          {listing.verdict.reason}
        </div>
        <div
          data-eid="verdict-score-bar"
          style={{
            height: 6,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
            marginTop: 2,
          }}
        >
          <div
            data-eid="verdict-score-fill"
            style={{
              width: `${listing.verdict.winnerScore}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4ade80, #22c55e)',
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    </section>
  )
}
