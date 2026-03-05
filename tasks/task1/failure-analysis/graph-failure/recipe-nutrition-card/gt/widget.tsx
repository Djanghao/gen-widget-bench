import data from './data.json'
import { Star, Clock, Users } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

type RecipeData = {
  title: string
  rating: number
  reviewCount: number
  cookTimeMin: number
  servings: number
  nutrition: { calories: number; proteinG: number; carbsG: number; fatG: number }
  macroChart: Array<{ name: string; value: number; color: string }>
  ingredients: Array<{ qty: string; name: string }>
  tags: string[]
}

const recipe = data as RecipeData

export default function Widget() {
  const fullStars = Math.floor(recipe.rating)
  const hasHalf = recipe.rating - fullStars >= 0.5

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: 20,
        color: '#f0f0f0',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div
        data-eid="hero-image"
        style={{
          background: 'linear-gradient(135deg, #e85d04 0%, #dc2f02 40%, #9d0208 100%)',
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          position: 'relative',
        }}
      >
        <span style={{ opacity: 0.3, fontSize: 64 }}>🍳</span>
      </div>

      <div style={{ padding: '16px 18px 18px' }}>
        <h2
          data-eid="recipe-title"
          style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.2 }}
        >
          {recipe.title}
        </h2>

        <div
          data-eid="rating-row"
          style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} data-eid={`star-${i}`}>
              <Star
                size={16}
                fill={i <= fullStars ? '#fbbf24' : i === fullStars + 1 && hasHalf ? '#fbbf24' : 'none'}
                color="#fbbf24"
                strokeWidth={i <= fullStars || (i === fullStars + 1 && hasHalf) ? 0 : 1.5}
              />
            </span>
          ))}
          <span
            data-eid="rating-value"
            style={{ fontSize: 14, fontWeight: 600, color: '#fbbf24', marginLeft: 4 }}
          >
            {recipe.rating}
          </span>
          <span
            data-eid="review-count"
            style={{ fontSize: 12, color: '#94a3b8', marginLeft: 4 }}
          >
            {recipe.reviewCount} reviews
          </span>
        </div>

        <div
          data-eid="meta-row"
          style={{ display: 'flex', gap: 16, marginBottom: 14, color: '#94a3b8', fontSize: 13 }}
        >
          <span data-eid="cook-time" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={14} /> {recipe.cookTimeMin} min
          </span>
          <span data-eid="servings" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={14} /> {recipe.servings} servings
          </span>
        </div>

        <div
          data-eid="nutrition-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}
        >
          {[
            { eid: 'stat-calories', labelEid: 'calories-label', label: 'Calories', value: recipe.nutrition.calories, unit: '', color: '#f97316' },
            { eid: 'stat-protein', labelEid: 'protein-label', label: 'Protein', value: recipe.nutrition.proteinG, unit: 'g', color: '#60a5fa' },
            { eid: 'stat-carbs', labelEid: 'carbs-label', label: 'Carbs', value: recipe.nutrition.carbsG, unit: 'g', color: '#34d399' },
            { eid: 'stat-fat', labelEid: undefined, label: 'Fat', value: recipe.nutrition.fatG, unit: 'g', color: '#f472b6' },
          ].map((s) => (
            <div
              key={s.eid}
              data-eid={s.eid}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '10px 6px',
                textAlign: 'center',
                border: `1px solid ${s.color}33`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>
                {s.value}{s.unit}
              </div>
              {s.labelEid ? (
                <span data-eid={s.labelEid} style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {s.label}
                </span>
              ) : (
                <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {s.label}
                </span>
              )}
            </div>
          ))}
        </div>

        <div data-eid="ingredients-section" style={{ marginBottom: 16 }}>
          <h3
            data-eid="ingredients-title"
            style={{ fontSize: 14, fontWeight: 600, margin: '0 0 8px', color: '#cbd5e1' }}
          >
            Ingredients
          </h3>
          {recipe.ingredients.map((ing, i) => (
            <div
              key={i}
              data-eid={`ingredient-${i}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontSize: 13,
              }}
            >
              <span style={{ color: '#94a3b8' }}>{ing.qty}</span>
              <span>{ing.name}</span>
            </div>
          ))}
        </div>

        <div data-eid="macro-chart" style={{ marginBottom: 14 }}>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={recipe.macroChart}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                dataKey="value"
                strokeWidth={0}
              >
                {recipe.macroChart.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div
            data-eid="chart-legend"
            style={{ display: 'flex', justifyContent: 'center', gap: 14, fontSize: 11 }}
          >
            {recipe.macroChart.map((m) => (
              <span key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, display: 'inline-block' }} />
                <span style={{ color: '#94a3b8' }}>{m.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div data-eid="tags-row" style={{ display: 'flex', gap: 8 }}>
          <span
            data-eid="tag-asian"
            style={{
              background: 'rgba(251,191,36,0.15)',
              color: '#fbbf24',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {recipe.tags[0]}
          </span>
          <span
            data-eid="tag-quick"
            style={{
              background: 'rgba(52,211,153,0.15)',
              color: '#34d399',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {recipe.tags[1]}
          </span>
          <span
            data-eid="tag-high-protein"
            style={{
              background: 'rgba(96,165,250,0.15)',
              color: '#60a5fa',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {recipe.tags[2]}
          </span>
        </div>
      </div>
    </section>
  )
}
