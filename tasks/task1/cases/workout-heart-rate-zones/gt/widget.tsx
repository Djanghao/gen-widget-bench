import { Heart, Timer, Flame, Activity } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts'
import data from './data.json'

const hrData = data.heartRateData as Array<{ min: number; hr: number }>
const zones = data.zones as Array<{ name: string; range: string; time: string; percentage: number; color: string }>

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #18181B 0%, #1F1F23 50%, #18181B 100%)',
        borderRadius: 24,
        color: '#F4F4F5',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        maxWidth: 420,
        padding: 20,
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span data-eid="header-icon" style={{ color: '#22C55E', display: 'inline-flex' }}>
              <Activity size={20} strokeWidth={2.5} />
            </span>
            <span data-eid="header-workout-type" style={{ fontSize: 18, fontWeight: 700 }}>
              {data.workoutType}
            </span>
          </div>
          <span data-eid="header-date" style={{ fontSize: 12, color: '#71717A', fontWeight: 500 }}>
            {data.date}
          </span>
        </div>
        <div
          data-eid="header-duration"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 32,
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <Timer size={20} color="#71717A" />
          {data.duration}
        </div>
      </div>

      {/* HR Chart */}
      <div data-eid="hr-chart-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div data-eid="hr-chart-title" style={{ fontSize: 12, color: '#71717A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Heart Rate
        </div>
        <div data-eid="hr-chart">
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={hrData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="min"
                tick={{ fill: '#52525B', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}m`}
              />
              <YAxis
                domain={[60, 190]}
                tick={{ fill: '#52525B', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
              />
              <ReferenceLine y={155} stroke="#F59E0B" strokeDasharray="3 3" strokeOpacity={0.4} />
              <ReferenceLine y={130} stroke="#22C55E" strokeDasharray="3 3" strokeOpacity={0.4} />
              <Area
                type="monotone"
                dataKey="hr"
                stroke="#EF4444"
                strokeWidth={2}
                fill="url(#hrGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Row */}
      <div
        data-eid="stats-row"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}
      >
        <div
          data-eid="stat-avg-hr"
          style={{ background: 'rgba(239,68,68,0.1)', borderRadius: 14, padding: '12px 10px', textAlign: 'center' }}
        >
          <div data-eid="stat-avg-hr-value" style={{ fontSize: 24, fontWeight: 800, color: '#EF4444' }}>
            {data.avgHR}
          </div>
          <div data-eid="stat-avg-hr-label" style={{ fontSize: 10, color: '#71717A', marginTop: 2, fontWeight: 500 }}>
            Avg HR
          </div>
        </div>
        <div
          data-eid="stat-max-hr"
          style={{ background: 'rgba(239,68,68,0.1)', borderRadius: 14, padding: '12px 10px', textAlign: 'center' }}
        >
          <div data-eid="stat-max-hr-value" style={{ fontSize: 24, fontWeight: 800, color: '#F87171' }}>
            {data.maxHR}
          </div>
          <div data-eid="stat-max-hr-label" style={{ fontSize: 10, color: '#71717A', marginTop: 2, fontWeight: 500 }}>
            Max HR
          </div>
        </div>
        <div
          data-eid="stat-calories"
          style={{ background: 'rgba(245,158,11,0.1)', borderRadius: 14, padding: '12px 10px', textAlign: 'center' }}
        >
          <div data-eid="stat-calories-value" style={{ fontSize: 24, fontWeight: 800, color: '#F59E0B' }}>
            {data.calories}
          </div>
          <div data-eid="stat-calories-label" style={{ fontSize: 10, color: '#71717A', marginTop: 2, fontWeight: 500 }}>
            Calories
          </div>
        </div>
      </div>

      {/* Zones */}
      <div data-eid="zones-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="zones-title" style={{ fontSize: 12, color: '#71717A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          HR Zones
        </div>
        {zones.map((zone) => {
          const eid = zone.name.toLowerCase().replace(' ', '-')
          return (
            <div
              key={zone.name}
              data-eid={`zone-${eid}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 10,
                padding: '8px 12px',
              }}
            >
              <div style={{ width: 70, fontSize: 11, fontWeight: 600, color: zone.color }}>
                {zone.name}
              </div>
              <div style={{ width: 50, fontSize: 9, color: '#52525B' }}>{zone.range} bpm</div>
              <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                <div
                  data-eid={`zone-${eid}-bar`}
                  style={{
                    width: `${zone.percentage}%`,
                    height: '100%',
                    background: zone.color,
                    borderRadius: 3,
                  }}
                />
              </div>
              <span
                data-eid={`zone-${eid}-time`}
                style={{ fontSize: 12, fontWeight: 700, width: 40, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
              >
                {zone.time}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
