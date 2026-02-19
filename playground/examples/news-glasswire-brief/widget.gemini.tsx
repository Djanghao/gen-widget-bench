import data from './data.json'

const { edition, lead, stories, ticker, updatedAt } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        boxShadow: '0 24px 40px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        gap: 20,
        maxWidth: 640,
        overflow: 'hidden',
        padding: 24,
        position: 'relative',
        width: '100%',
      }}
    >
      {/* 氛围光晕：左上角 */}
      <div
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
          height: 300,
          left: -100,
          pointerEvents: 'none',
          position: 'absolute',
          top: -100,
          width: 300,
          zIndex: 0,
        }}
      />
      
      {/* 氛围光晕：右下角 */}
      <div
        style={{
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%)',
          bottom: -150,
          height: 300,
          pointerEvents: 'none',
          position: 'absolute',
          right: -100,
          width: 300,
          zIndex: 0,
        }}
      />

      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div>
          <h2 
            style={{ 
              background: 'linear-gradient(to right, #f8fafc, #cbd5e1)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 20, 
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0 
            }}
          >
            {edition}
          </h2>
          <p style={{ color: '#64748b', fontSize: 12, fontWeight: 500, margin: '4px 0 0' }}>{updatedAt}</p>
        </div>
        <span
          style={{
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 999,
            color: '#7dd3fc',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            padding: '6px 14px',
            textTransform: 'uppercase',
          }}
        >
          Live Desk
        </span>
      </header>

      <article
        style={{
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderLeft: '4px solid #38bdf8',
          borderRadius: 16,
          display: 'grid',
          gap: 10,
          padding: 20,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ color: '#38bdf8', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {lead.category}
        </span>
        <h3 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
          {lead.headline}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          {lead.summary}
        </p>
      </article>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', position: 'relative', zIndex: 1 }}>
        {stories.map((story) => (
          <article
            key={story.title}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 14,
              display: 'grid',
              gap: 8,
              padding: 16,
            }}
          >
            <span style={{ color: '#67e8f9', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {story.category}
            </span>
            <strong style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: '#e2e8f0' }}>{story.title}</strong>
            <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5, margin: 0 }}>{story.summary}</p>
          </article>
        ))}
      </div>

      <div
        style={{
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 999,
          color: '#bae6fd',
          display: 'flex',
          fontSize: 12,
          fontWeight: 500,
          gap: 24,
          overflowX: 'auto',
          padding: '10px 20px',
          position: 'relative',
          whiteSpace: 'nowrap',
          zIndex: 1,
          scrollbarWidth: 'none', // 隐藏 Firefox 滚动条
          msOverflowStyle: 'none', // 隐藏 IE/Edge 滚动条
        }}
      >
        {/* 用分隔圆点增加 Ticker 的精致感 */}
        {ticker.map((item, index) => (
          <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span>{item}</span>
            {index !== ticker.length - 1 && (
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(56, 189, 248, 0.5)' }} />
            )}
          </span>
        ))}
      </div>
    </section>
  )
}