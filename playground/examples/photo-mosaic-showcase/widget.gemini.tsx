import type { CSSProperties } from 'react'
import data from './data.json'

const { photos, subtitle, tags, title } = data

export default function Widget() {
  return (
    <section
      style={{
        // 使用更深邃、过渡更平滑的暗色渐变背景
        background: 'linear-gradient(145deg, #0f172a 0%, #020617 100%)',
        // 模拟玻璃边缘的微光反射
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        // 组合阴影：深层大阴影增加立体感 + 内部顶部高光模拟物理质感
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: 24, // 增加留白，让整体呼吸感更强
        maxWidth: 580, // 稍微放宽尺寸，给图片更好的展示比例
        overflow: 'hidden',
        padding: 28, // 更宽裕的内边距
        width: '100%',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <header style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>
            {title}
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: 13, margin: 0, fontWeight: 400 }}>
            {subtitle}
          </p>
        </div>
        <span
          style={{
            // 引入毛玻璃 (Glassmorphism) 质感的标签
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 999,
            color: '#e2e8f0',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
            padding: '6px 14px',
            textTransform: 'uppercase',
          }}
        >
          Mosaic
        </span>
      </header>

      {/* 图片网格区域：调整了间距和比例 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: '140px 140px' }}>
          <PhotoTile photo={photos[0]} style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }} />
          <PhotoTile photo={photos[1]} style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }} />
          <PhotoTile photo={photos[2]} style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }} />
        </div>

        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          <PhotoTile photo={photos[3]} style={{ minHeight: 120 }} />
          <PhotoTile photo={photos[4]} style={{ minHeight: 120 }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 8, // 从胶囊形改为带圆角的矩形，显得更具现代感
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: 12,
              fontWeight: 500,
              padding: '6px 12px',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  )
}

function PhotoTile(props: {
  photo: {
    author: string
    title: string
    url: string
  }
  style?: CSSProperties
}) {
  return (
    <article
      style={{
        borderRadius: 16,
        boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)', // 使用内阴影代替边框，避免图片被裁切产生毛边
        minHeight: 0,
        overflow: 'hidden',
        position: 'relative',
        ...props.style,
      }}
    >
      <img
        alt={props.photo.title}
        src={props.photo.url}
        style={{
          display: 'block',
          filter: 'saturate(1.15) contrast(1.05)',
          height: '100%',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      {/* 优化的底部渐变遮罩：增加渐变节点让文字背景过渡更平滑自然 */}
      <div
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
          bottom: 0,
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          left: 0,
          padding: '24px 14px 12px',
          position: 'absolute',
          right: 0,
        }}
      >
        <strong style={{ display: 'block', fontSize: 13, fontWeight: 600, letterSpacing: '0.01em' }}>
          {props.photo.title}
        </strong>
        <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 11, fontWeight: 400 }}>
          by {props.photo.author}
        </span>
      </div>
    </article>
  )
}