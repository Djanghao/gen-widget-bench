import { Droplet, Zap, TrendingUp, GlassWater } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import data from './data.json'

const hourly = data.hourlyIntake as Array<{ hour: string; ml: number }>
const history = data.history as Array<{ day: string; intake: number; goalMet: boolean }>
const progressData = data.progressChartData as Array<{ name: string; value: number; fill: string }>

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0D1B2A 0%, #0A2E36 50%, #0D1B2A 100%)',
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
          <span data-eid="header-icon" style={{ color: '#2DD4BF', display: 'inline-flex' }}>
            <Droplet size={20} strokeWidth={2.5} />
          </span>
          <span data-eid="header-title" style={{ fontSize: 18, fontWeight: 700 }}>Hydration</span>
        </div>
        <span data-eid="header-date" style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
          {data.date}
        </span>
      </div>

      {/* Main Progress Ring */}
      <div
        data-eid="progress-ring"
        style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
      >
        <div data-eid="progress-chart">
          <RadialBarChart
            width={200}
            height={200}
            cx={100}
            cy={100}
            innerRadius={65}
            outerRadius={90}
            barSize={18}
            data={progressData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: 'rgba(45,212,191,0.1)' }}
              dataKey="value"
              angleAxisId={0}
              cornerRadius={9}
            />
          </RadialBarChart>
        </div>
        <div
          data-eid="progress-center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div data-eid="progress-current" style={{ fontSize: 30, fontWeight: 800, color: '#2DD4BF', lineHeight: 1 }}>
            {data.currentIntake}L
          </div>
          <div data-eid="progress-goal" style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
            / {data.goalIntake}L
          </div>
          <div data-eid="progress-percent" style={{ fontSize: 11, color: '#2DD4BF', fontWeight: 700, marginTop: 4, background: 'rgba(45,212,191,0.15)', borderRadius: 8, padding: '2px 8px', display: 'inline-block' }}>
            {data.percentage}%
          </div>
        </div>
      </div>

      {/* Hourly Chart */}
      <div data-eid="hourly-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div data-eid="hourly-title" style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Hourly Intake
        </div>
        <div data-eid="hourly-chart">
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={hourly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="hour"
                tick={{ fill: '#475569', fontSize: 7 }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis hide domain={[0, 350]} />
              <Bar dataKey="ml" fill="#2DD4BF" radius={[2, 2, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Add */}
      <div data-eid="quick-add-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="quick-add-title" style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Quick Add
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {data.quickAdd.map((ml: number) => (
            <div
              key={ml}
              data-eid={`quick-add-${ml}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                background: 'rgba(45,212,191,0.1)',
                border: '1px solid rgba(45,212,191,0.25)',
                borderRadius: 12,
                padding: '10px 8px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                color: '#2DD4BF',
              }}
            >
              <Droplet size={14} />
              {ml}ml
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div data-eid="history-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div data-eid="history-title" style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Last 7 Days
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
          {history.map((day, i) => (
            <div
              key={day.day}
              data-eid={`history-day-${i}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                flex: 1,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: day.goalMet ? 'rgba(45,212,191,0.25)' : 'rgba(255,255,255,0.05)',
                border: day.goalMet ? '2px solid #2DD4BF' : '2px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {day.goalMet && <Droplet size={12} color="#2DD4BF" />}
              </div>
              <div style={{ fontSize: 9, color: '#64748B', fontWeight: 500 }}>{day.day}</div>
              <div style={{ fontSize: 9, color: day.goalMet ? '#2DD4BF' : '#475569', fontWeight: 600 }}>{day.intake}L</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div
        data-eid="stats-row"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
      >
        <div
          data-eid="stat-daily-avg"
          style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <TrendingUp size={18} color="#2DD4BF" />
          <div>
            <div data-eid="stat-daily-avg-value" style={{ fontSize: 18, fontWeight: 800, color: '#2DD4BF' }}>
              {data.dailyAvg}L
            </div>
            <div data-eid="stat-daily-avg-label" style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>
              Daily Avg
            </div>
          </div>
        </div>
        <div
          data-eid="stat-streak"
          style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Zap size={18} color="#F59E0B" />
          <div>
            <div data-eid="stat-streak-value" style={{ fontSize: 18, fontWeight: 800, color: '#F59E0B' }}>
              {data.streak} days
            </div>
            <div data-eid="stat-streak-label" style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>
              Streak
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
