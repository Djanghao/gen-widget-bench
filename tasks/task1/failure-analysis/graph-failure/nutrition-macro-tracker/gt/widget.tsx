import { Apple, Droplets, Coffee, UtensilsCrossed, Salad, Cookie } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import data from './data.json'

const macros = data.macros as Array<{ name: string; current: number; goal: number; unit: string; color: string; percentage: number }>
const meals = data.meals as Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; time: string }>

const mealIcons: Record<string, typeof Coffee> = {
  Breakfast: Coffee,
  Lunch: UtensilsCrossed,
  Dinner: Salad,
  Snacks: Cookie,
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #1A1A2E 0%, #16213E 60%, #1A1A2E 100%)',
        borderRadius: 24,
        color: '#E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 420,
        padding: 20,
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span data-eid="header-icon" style={{ color: '#34D399', display: 'inline-flex' }}>
            <Apple size={20} strokeWidth={2} />
          </span>
          <span data-eid="header-title" style={{ fontSize: 18, fontWeight: 700 }}>Nutrition</span>
        </div>
        <span data-eid="header-date" style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
          {data.date}
        </span>
      </div>

      {/* Calories */}
      <div
        data-eid="calories-section"
        style={{ textAlign: 'center', padding: '4px 0' }}
      >
        <div style={{ fontSize: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
          <span data-eid="calories-consumed" style={{ fontSize: 36, fontWeight: 800, color: '#34D399' }}>
            {data.calories.consumed.toLocaleString()}
          </span>
          <span data-eid="calories-separator" style={{ fontSize: 20, color: '#475569', fontWeight: 300 }}>/</span>
          <span data-eid="calories-goal" style={{ fontSize: 20, color: '#64748B', fontWeight: 600 }}>
            {data.calories.goal.toLocaleString()}
          </span>
        </div>
        <div data-eid="calories-label" style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 2 }}>
          Calories
        </div>
      </div>

      {/* Macro Rings */}
      <div
        data-eid="macros-row"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}
      >
        {macros.map((macro) => {
          const eid = macro.name.toLowerCase()
          const chartData = [{ name: macro.name, value: macro.percentage, fill: macro.color }]
          return (
            <div
              key={macro.name}
              data-eid={`macro-${eid}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 16,
                padding: '12px 8px 10px',
              }}
            >
              <div data-eid={`macro-${eid}-chart`} style={{ position: 'relative' }}>
                <RadialBarChart
                  width={80}
                  height={80}
                  cx={40}
                  cy={40}
                  innerRadius={28}
                  outerRadius={38}
                  barSize={8}
                  data={chartData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background={{ fill: 'rgba(255,255,255,0.08)' }}
                    dataKey="value"
                    angleAxisId={0}
                    cornerRadius={4}
                  />
                </RadialBarChart>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 12,
                  fontWeight: 800,
                  color: macro.color,
                }}>
                  {Math.round(macro.percentage)}%
                </div>
              </div>
              <div
                data-eid={`macro-${eid}-label`}
                style={{ fontSize: 10, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}
              >
                <div style={{ fontWeight: 600, color: macro.color }}>{macro.name}</div>
                <div style={{ marginTop: 2 }}>{macro.current}/{macro.goal}{macro.unit}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Meals */}
      <div data-eid="meals-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="meals-title" style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Meals
        </div>
        {meals.map((meal) => {
          const eid = meal.name.toLowerCase()
          const Icon = mealIcons[meal.name] || Coffee
          return (
            <div
              key={meal.name}
              data-eid={`meal-${eid}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 12,
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={16} color="#64748B" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{meal.name}</div>
                  <div style={{ fontSize: 9, color: '#64748B', marginTop: 1 }}>
                    P: {meal.protein}g &middot; C: {meal.carbs}g &middot; F: {meal.fat}g
                  </div>
                </div>
              </div>
              <span
                data-eid={`meal-${eid}-cals`}
                style={{ fontSize: 14, fontWeight: 700, color: '#34D399' }}
              >
                {meal.calories} cal
              </span>
            </div>
          )
        })}
      </div>

      {/* Water */}
      <div data-eid="water-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="water-title" style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Droplets size={14} color="#38BDF8" />
          Water ({data.water.cupsFilled}/{data.water.cupsGoal} cups)
        </div>
        <div
          data-eid="water-cups"
          style={{ display: 'flex', gap: 6, justifyContent: 'center' }}
        >
          {Array.from({ length: data.water.cupsGoal }).map((_, i) => {
            const filled = i < data.water.cupsFilled
            return (
              <span
                key={i}
                data-eid={`water-cup-${i}`}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: filled ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.05)',
                  border: filled ? '2px solid #38BDF8' : '2px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                }}
              >
                {filled ? <Droplets size={14} color="#38BDF8" /> : null}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
