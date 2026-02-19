import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from './data.json'

const { change, market, price, series, ticker, volume, watchlist } = data

export default function Widget() {
  // 动态判断主资产的涨跌颜色
  const isPositive = !change.startsWith('-');
  const changeColor = isPositive ? '#10b981' : '#ef4444'; // 柔和的翠绿 / 珊瑚红
  const changeBg = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';

  return (
    <section
      style={{
        background: '#0B0F19', // 深邃的高级暗色
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 540,
        padding: 24,
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* 顶部 Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{ticker}</h2>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, fontWeight: 500 }}>{market}</p>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <strong style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', fontFamily: 'JetBrains Mono, monospace' }}>
            {price}
          </strong>
          <div
            style={{
              background: changeBg,
              color: changeColor,
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              display: 'inline-block',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            {change}
          </div>
        </div>
      </header>

      {/* 主图表区域 */}
      <article style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Intraday Tape
          </span>
          <span style={{ color: '#64748B', fontSize: 12, fontWeight: 500 }}>
            VOL <span style={{ color: '#E2E8F0', fontFamily: 'JetBrains Mono, monospace' }}>{volume}</span>
          </span>
        </div>
        
        <div style={{ height: 180, margin: '0 -10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              {/* 只保留横向网格线，透明度调低 */}
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }} 
              />
              
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                  color: '#F8FAFC',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                }}
                itemStyle={{ color: '#E2E8F0' }}
              />
              
              <Line 
                dataKey="ma" 
                dot={false} 
                name="MA" 
                stroke="#475569" 
                strokeDasharray="4 4" 
                strokeWidth={1.5} 
                type="monotone" 
              />
              <Line 
                dataKey="price" 
                dot={false} 
                name="Price" 
                stroke="#38BDF8" // 高级亮蓝色
                strokeWidth={3} 
                type="monotone" 
                activeDot={{ r: 6, fill: '#0EA5E9', stroke: '#0B0F19', strokeWidth: 3 }} // 增加 hover 圆点特效
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      {/* 底部自选股列表 */}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {watchlist.map((item) => {
          const isItemPos = !item.move.startsWith('-');
          return (
            <div
              key={item.symbol}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '12px 8px',
              }}
            >
              <span style={{ color: '#CBD5E1', fontSize: 13, fontWeight: 600 }}>
                {item.symbol}
              </span>
              <strong
                style={{
                  color: isItemPos ? '#10B981' : '#EF4444',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {item.move}
              </strong>
            </div>
          );
        })}
      </div>
    </section>
  )
}