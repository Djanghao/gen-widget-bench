import data from './data.json'
import { Star, Film, Clapperboard } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'

type MovieData = {
  title: string
  year: number
  runtime: string
  contentRating: string
  score: number
  maxScore: number
  genres: string[]
  plot: string
  cast: Array<{ name: string; initials: string; color: string }>
  director: string
  boxOffice: string
  ratingsDistribution: Array<{ stars: string; count: number }>
}

const movie = data as MovieData

export default function Widget() {
  const fullStars = Math.floor(movie.score / 2)
  const hasHalf = (movie.score / 2) - fullStars >= 0.3

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0c0c1d 0%, #1a1a3e 50%, #0d1b2a 100%)',
        borderRadius: 20,
        color: '#e8e8f0',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div
        data-eid="poster-area"
        style={{
          background: 'linear-gradient(135deg, #1b2838 0%, #0d1b2a 30%, #1a1a3e 60%, #2d1b69 100%)',
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Film size={56} color="rgba(255,255,255,0.12)" />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: 'linear-gradient(transparent, #0c0c1d)',
        }} />
      </div>

      <div style={{ padding: '14px 18px 18px' }}>
        <div data-eid="title-row" style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <h2 data-eid="movie-title" style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            {movie.title}
          </h2>
          <span data-eid="movie-year" style={{ fontSize: 14, color: '#64748b' }}>
            ({movie.year})
          </span>
        </div>

        <div data-eid="meta-row" style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
          <span data-eid="runtime" style={{ fontSize: 13, color: '#94a3b8' }}>
            {movie.runtime}
          </span>
          <span
            data-eid="pg-rating"
            style={{
              fontSize: 11,
              color: '#fbbf24',
              border: '1px solid #fbbf24',
              borderRadius: 4,
              padding: '1px 6px',
              fontWeight: 600,
            }}
          >
            {movie.contentRating}
          </span>
        </div>

        <div data-eid="score-row" style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} data-eid={`score-star-${i}`}>
              <Star
                size={18}
                fill={i <= fullStars ? '#fbbf24' : (i === fullStars + 1 && hasHalf) ? '#fbbf24' : 'none'}
                color="#fbbf24"
                strokeWidth={i <= fullStars || (i === fullStars + 1 && hasHalf) ? 0 : 1.5}
              />
            </span>
          ))}
          <span data-eid="score-value" style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24', marginLeft: 6 }}>
            {movie.score}/{movie.maxScore}
          </span>
        </div>

        <div data-eid="genre-row" style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {movie.genres.map((g, i) => {
            const eidMap: Record<string, string> = { 'Sci-Fi': 'genre-scifi', 'Adventure': 'genre-adventure', 'Drama': 'genre-drama' }
            const colors = ['#8b5cf6', '#3b82f6', '#ec4899']
            return (
              <span
                key={g}
                data-eid={eidMap[g]}
                style={{
                  background: `${colors[i]}22`,
                  color: colors[i],
                  borderRadius: 20,
                  padding: '3px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {g}
              </span>
            )
          })}
        </div>

        <p data-eid="plot-summary" style={{ fontSize: 13, lineHeight: 1.5, color: '#94a3b8', margin: '0 0 16px' }}>
          {movie.plot}
        </p>

        <div data-eid="cast-section" style={{ marginBottom: 14 }}>
          <h3 data-eid="cast-title" style={{ fontSize: 14, fontWeight: 600, margin: '0 0 10px', color: '#cbd5e1' }}>
            Cast
          </h3>
          <div style={{ display: 'flex', gap: 12 }}>
            {movie.cast.map((actor, i) => (
              <div
                key={actor.name}
                data-eid={`cast-${i}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
              >
                <div
                  data-eid={`cast-${i}-avatar`}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${actor.color}, ${actor.color}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {actor.initials}
                </div>
                <span style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', maxWidth: 70 }}>
                  {actor.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div data-eid="director-row" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13 }}>
          <Clapperboard size={14} color="#64748b" />
          <span style={{ color: '#64748b' }}>Director:</span>
          <span data-eid="director-name" style={{ fontWeight: 600 }}>{movie.director}</span>
        </div>

        <div data-eid="box-office-row" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13 }}>
          <span style={{ color: '#64748b' }}>Box Office:</span>
          <span data-eid="box-office-value" style={{ fontWeight: 700, color: '#34d399' }}>{movie.boxOffice}</span>
        </div>

        <div data-eid="ratings-chart" style={{ marginBottom: 4 }}>
          <span data-eid="chart-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 8 }}>
            Rating Distribution
          </span>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={movie.ratingsDistribution} barCategoryGap="15%">
              <XAxis dataKey="stars" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#1a1a3e', border: '1px solid #333', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: '#e8e8f0' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {movie.ratingsDistribution.map((_, i) => (
                  <Cell key={i} fill={i >= 7 ? '#fbbf24' : i >= 4 ? '#3b82f6' : '#64748b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
