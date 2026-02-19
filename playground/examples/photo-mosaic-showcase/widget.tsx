import type { CSSProperties } from 'react'
import data from './data.json'

const { photos, subtitle, tags, title } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1e1b4b 100%)',
        border: '1px solid rgba(167, 139, 250, 0.32)',
        borderRadius: 16,
        boxShadow: '0 16px 34px rgba(2, 6, 23, 0.55)',
        color: '#f9fafb',
        display: 'grid',
        gap: 8,
        maxWidth: 540,
        overflow: 'hidden',
        padding: 12,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 15, margin: 0 }}>{title}</h2>
          <p style={{ color: '#c4b5fd', fontSize: 10, margin: '2px 0 0' }}>{subtitle}</p>
        </div>
        <span
          style={{
            background: 'rgba(76, 29, 149, 0.45)',
            border: '1px solid rgba(167, 139, 250, 0.4)',
            borderRadius: 999,
            fontSize: 10,
            padding: '2px 8px',
          }}
        >
          Mosaic
        </span>
      </header>

      <div style={{ display: 'grid', gap: 6, gridTemplateColumns: '1.2fr 0.8fr', gridTemplateRows: '108px 108px' }}>
        <PhotoTile photo={photos[0]} style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }} />
        <PhotoTile photo={photos[1]} style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }} />
        <PhotoTile photo={photos[2]} style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }} />
      </div>

      <div style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <PhotoTile photo={photos[3]} style={{ minHeight: 72 }} />
        <PhotoTile photo={photos[4]} style={{ minHeight: 72 }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(167, 139, 250, 0.28)',
              borderRadius: 999,
              color: '#ddd6fe',
              fontSize: 9,
              padding: '2px 7px',
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
        border: '1px solid rgba(148, 163, 184, 0.32)',
        borderRadius: 10,
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
          filter: 'saturate(1.1) contrast(1.02)',
          height: '100%',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.82) 100%)',
          bottom: 0,
          color: '#f9fafb',
          left: 0,
          padding: '16px 7px 5px',
          position: 'absolute',
          right: 0,
        }}
      >
        <strong style={{ display: 'block', fontSize: 10 }}>{props.photo.title}</strong>
        <span style={{ color: '#cbd5e1', fontSize: 9 }}>by {props.photo.author}</span>
      </div>
    </article>
  )
}
