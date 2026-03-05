import { Moon, BedDouble, Sun } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import data from './data.json'

const timeline = data.timeline as Array<{ time: string; awake: number; rem: number; light: number; deep: number }>
const stages = data.stages as Record<string, { duration: string; color: string }>

const stageColors = {
  deep: '#1E40AF',
  light: '#60A5FA',
  rem: '#A78BFA',
  awake: '#FF6B6B',
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        borderRadius: 24,
        color: '#F1F5F9',
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
          <span data-eid="header-icon" style={{ color: '#A78BFA', display: 'inline-flex' }}>
            <Moon size={20} strokeWidth={2} />
          </span>
          <span data-eid="header-title" style={{ fontSize: 18, fontWeight: 700 }}>Sleep Analysis</span>
        </div>
        <span data-eid="header-date" style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
          {data.date}
        </span>
      </div>

      {/* Score */}
      <div
        data-eid="score-section"
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
          justifyContent: 'center',
          padding: '8px 0',
        }}
      >
        <div data-eid="score-value" style={{ fontSize: 48, fontWeight: 800, color: '#A78BFA' }}>
          {data.sleepScore}
        </div>
        <span data-eid="score-max" style={{ fontSize: 18, color: '#64748B', fontWeight: 500 }}>/100</span>
        <div data-eid="score-label" style={{ fontSize: 12, color: '#64748B', marginLeft: 8, fontWeight: 500 }}>
          Sleep Score
        </div>
      </div>

      {/* Timeline Chart */}
      <div data-eid="timeline-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="timeline-chart">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={timeline} barSize={18} barGap={0} barCategoryGap={1}>
              <XAxis
                dataKey="time"
                tick={{ fill: '#475569', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval={3}
              />
              <YAxis hide domain={[0, 1]} />
              <Tooltip
                contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: '#94A3B8' }}
              />
              <Bar dataKey="deep" stackId="sleep" fill={stageColors.deep} radius={[0, 0, 0, 0]} />
              <Bar dataKey="light" stackId="sleep" fill={stageColors.light} />
              <Bar dataKey="rem" stackId="sleep" fill={stageColors.rem} />
              <Bar dataKey="awake" stackId="sleep" fill={stageColors.awake} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          data-eid="timeline-legend"
          style={{ display: 'flex', gap: 14, justifyContent: 'center' }}
        >
          {(['awake', 'rem', 'light', 'deep'] as const).map((stage) => (
            <span
              key={stage}
              data-eid={`legend-${stage}`}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#94A3B8' }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: stageColors[stage], display: 'inline-block' }} />
              {stage.charAt(0).toUpperCase() + stage.slice(1)} ({stages[stage].duration})
            </span>
          ))}
        </div>
      </div>

      {/* Bedtime / Wake */}
      <div
        data-eid="times-row"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}
      >
        <div style={{ background: 'rgba(167,139,250,0.1)', borderRadius: 14, padding: '12px 14px' }}>
          <div data-eid="bedtime-label" style={{ fontSize: 10, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Bedtime
          </div>
          <div data-eid="bedtime-value" style={{ fontSize: 20, fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Moon size={14} color="#A78BFA" />
            {data.bedtime}
          </div>
        </div>
        <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: 14, padding: '12px 14px' }}>
          <div data-eid="waketime-label" style={{ fontSize: 10, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Wake Time
          </div>
          <div data-eid="waketime-value" style={{ fontSize: 20, fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sun size={14} color="#FBBF24" />
            {data.wakeTime}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        data-eid="stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
        }}
      >
        <div
          data-eid="stat-total-sleep"
          style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}
        >
          <div data-eid="stat-total-sleep-value" style={{ fontSize: 18, fontWeight: 700, color: '#60A5FA' }}>
            {data.totalSleep}
          </div>
          <div data-eid="stat-total-sleep-label" style={{ fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: 500 }}>
            Total Sleep
          </div>
        </div>
        <div
          data-eid="stat-time-in-bed"
          style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}
        >
          <div data-eid="stat-time-in-bed-value" style={{ fontSize: 18, fontWeight: 700, color: '#A78BFA' }}>
            {data.timeInBed}
          </div>
          <div data-eid="stat-time-in-bed-label" style={{ fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: 500 }}>
            Time in Bed
          </div>
        </div>
        <div
          data-eid="stat-efficiency"
          style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}
        >
          <div data-eid="stat-efficiency-value" style={{ fontSize: 18, fontWeight: 700, color: '#34D399' }}>
            {data.efficiency}
          </div>
          <div data-eid="stat-efficiency-label" style={{ fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: 500 }}>
            Efficiency
          </div>
        </div>
      </div>
    </section>
  )
}
