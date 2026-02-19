import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import data from './data.json'

const { alerts, condition, hourly, location, now } = data

export default function Widget() {
  return (
    <section
      style={{
        // 使用更深邃、高级的暗色渐变，搭配内阴影营造质感
        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: 460,
        overflow: 'hidden',
        padding: 28, // 增加留白，提升呼吸感
        width: '100%',
      }}
    >
      {/* 头部：加大主次层级对比 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: '-0.02em' }}>
            {location}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 500, margin: 0 }}>
            {condition}
          </p>
        </div>
        <strong style={{ fontSize: 56, fontWeight: 200, lineHeight: 1, letterSpacing: '-0.04em' }}>
          {now.temp}
        </strong>
      </header>

      {/* 指标面板：磨砂玻璃卡片风格 */}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <Metric label="Feels" value={now.feels} />
        <Metric label="Humidity" value={now.humidity} />
        <Metric label="Wind" value={now.wind} />
        <Metric label="UV" value={now.uv} />
      </div>

      {/* 图表区：极简无边框 Sparkline 风格 */}
      <article
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: '20px 0 10px 0', // 左右 padding 为 0，让图表填满边缘更美观
        }}
      >
        <div style={{ padding: '0 20px', color: '#64748b', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          24-Hour Forecast
        </div>
        <div style={{ height: 140, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {/* 移除了沉重的 CartesianGrid 和 YAxis，让图表更纯粹 */}
            <AreaChart data={hourly} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="premium-temp-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis 
                axisLine={false} 
                dataKey="time" 
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                tickLine={false} 
                tickMargin={8} 
              />
              <Tooltip
                cursor={{ stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                  color: '#f8fafc',
                }}
              />
              <Area 
                dataKey="temp" 
                fill="url(#premium-temp-fill)" 
                stroke="#38bdf8" 
                strokeWidth={3} 
                type="monotone" 
                animationDuration={1500} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>

      {/* 预警信息：优雅的左侧边框提示条 */}
      {alerts && alerts.length > 0 && (
        <div style={{ display: 'grid', gap: 8 }}>
          {alerts.map((item) => (
            <div
              key={item}
              style={{
                background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%)',
                borderLeft: '3px solid #f59e0b',
                borderRadius: '4px 10px 10px 4px',
                color: '#fcd34d',
                fontSize: 13,
                fontWeight: 500,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
               <span style={{ fontSize: 14 }}>⚠️</span> {item}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function Metric(props: { label: string; value: string }) {
  return (
    <article
      style={{
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        justifyContent: 'center',
        padding: '16px 8px',
      }}
    >
      <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {props.label}
      </span>
      <strong style={{ color: '#f8fafc', fontSize: 17, fontWeight: 600 }}>
        {props.value}
      </strong>
    </article>
  )
}