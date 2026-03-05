import { Activity } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import data from './data.json'

const rings = data.rings as Array<{ name: string; current: number; goal: number; unit: string; color: string; percentage: number }>
const chartData = data.chartData as Array<{ name: string; value: number; fill: string }>

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #1C1C1E 0%, #121214 100%)',
        borderRadius: 24,
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 400,
        padding: 20,
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Header */}
      <div
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span data-eid="header-icon" style={{ color: '#FF3B30', display: 'inline-flex' }}>
            <Activity size={20} strokeWidth={2.5} />
          </span>
          <span data-eid="header-title" style={{ fontSize: 18, fontWeight: 700 }}>Activity</span>
        </div>
        <span data-eid="header-date" style={{ color: '#8E8E93', fontSize: 13, fontWeight: 500 }}>
          {data.date}
        </span>
      </div>

      {/* Rings */}
      <div
        data-eid="rings-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div data-eid="rings-chart">
          <RadialBarChart
            width={220}
            height={220}
            cx={110}
            cy={110}
            innerRadius={50}
            outerRadius={105}
            barSize={14}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: 'rgba(255,255,255,0.08)' }}
              dataKey="value"
              angleAxisId={0}
              cornerRadius={7}
            />
          </RadialBarChart>
        </div>
        <div
          data-eid="rings-center-label"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div
            data-eid="rings-center-value"
            style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}
          >
            {data.summary.totalCalories}
          </div>
          <div
            data-eid="rings-center-unit"
            style={{ fontSize: 10, fontWeight: 600, color: '#8E8E93', letterSpacing: 1.5, marginTop: 2 }}
          >
            CAL
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div
        data-eid="stats-row"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
        }}
      >
        {rings.map((ring) => {
          const eidBase = ring.name.toLowerCase()
          return (
            <div
              key={ring.name}
              data-eid={`stat-${eidBase}`}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 14,
                padding: '12px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span
                data-eid={`stat-${eidBase}-icon`}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: ring.color,
                  display: 'inline-block',
                }}
              />
              <div
                data-eid={`stat-${eidBase}-label`}
                style={{ fontSize: 11, color: '#8E8E93', fontWeight: 500 }}
              >
                {ring.name}
              </div>
              <div
                data-eid={`stat-${eidBase}-value`}
                style={{ fontSize: 13, fontWeight: 700 }}
              >
                {ring.current}/{ring.goal}{' '}
                <span style={{ fontSize: 10, color: '#8E8E93', fontWeight: 500 }}>{ring.unit}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div
        data-eid="summary-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          data-eid="summary-title"
          style={{ fontSize: 13, fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 0.5 }}
        >
          Today's Summary
        </div>
        {[
          { eid: 'summary-item-calories', label: 'Total Calories', value: `${data.summary.totalCalories} kcal`, color: '#FF3B30' },
          { eid: 'summary-item-active', label: 'Active Minutes', value: `${data.summary.activeMinutes} min`, color: '#30D158' },
          { eid: 'summary-item-stand', label: 'Stand Hours', value: `${data.summary.standHours} of 12 hrs`, color: '#0A84FF' },
        ].map((item) => (
          <div
            key={item.eid}
            data-eid={item.eid}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <span style={{ fontSize: 13, color: '#AEAEB2' }}>{item.label}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
