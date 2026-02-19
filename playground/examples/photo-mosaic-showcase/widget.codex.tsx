import type { CSSProperties } from 'react'
import data from './data.json'

const { photos, subtitle, tags, title } = data

const serifFont = '"Fraunces", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif'
const sansFont = '"Manrope", "Avenir Next", "Segoe UI", sans-serif'

export default function Widget() {
  return (
    <section
      style={{
        background:
          'radial-gradient(140% 80% at 100% 0%, rgba(250, 204, 21, 0.2) 0%, rgba(250, 204, 21, 0) 42%), radial-gradient(110% 80% at 0% 100%, rgba(45, 212, 191, 0.2) 0%, rgba(45, 212, 191, 0) 46%), linear-gradient(155deg, #0b1b24 0%, #101f2e 54%, #172535 100%)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderRadius: 22,
        boxShadow:
          '0 24px 56px rgba(3, 10, 19, 0.52), inset 0 1px 0 rgba(255, 255, 255, 0.24), inset 0 -1px 0 rgba(255, 255, 255, 0.08)',
        color: '#eef2f7',
        display: 'grid',
        fontFamily: sansFont,
        gap: 12,
        isolation: 'isolate',
        maxWidth: 560,
        overflow: 'hidden',
        padding: 14,
        position: 'relative',
        width: '100%',
      }}
    >
      <style>
        {`
          @keyframes widgetEntrance {
            0% {
              opacity: 0;
              transform: translateY(12px) scale(0.985);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes tileEntrance {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div
        aria-hidden
        style={{
          animation: 'widgetEntrance 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
          background:
            'radial-gradient(120px 76px at 100% 10%, rgba(250, 204, 21, 0.16), transparent 74%), radial-gradient(160px 90px at 0% 100%, rgba(45, 212, 191, 0.2), transparent 72%)',
          borderRadius: 20,
          inset: 0,
          pointerEvents: 'none',
          position: 'absolute',
          zIndex: -1,
        }}
      />

      <header
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          gap: 12,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.72)',
              fontSize: 10,
              letterSpacing: '0.18em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Curated Selection
          </p>
          <h2
            style={{
              fontFamily: serifFont,
              fontSize: 'clamp(20px, 3.3vw, 30px)',
              fontWeight: 560,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '4px 0 0',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              color: 'rgba(236, 253, 245, 0.8)',
              fontSize: 11,
              letterSpacing: '0.02em',
              margin: '6px 0 0',
              maxWidth: '58ch',
            }}
          >
            {subtitle}
          </p>
        </div>

        <span
          style={{
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(20, 184, 166, 0.22))',
            border: '1px solid rgba(255, 255, 255, 0.34)',
            borderRadius: 999,
            color: '#fffaf0',
            display: 'inline-flex',
            flexShrink: 0,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.13em',
            padding: '4px 10px',
            textTransform: 'uppercase',
          }}
        >
          Gallery
        </span>
      </header>

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 8,
          minWidth: 0,
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(245, 158, 11, 0.42) 0%, rgba(20, 184, 166, 0.42) 100%)',
            borderRadius: 999,
            height: 4,
            minWidth: 40,
            width: '12%',
          }}
        />
        <p
          style={{
            color: 'rgba(222, 247, 238, 0.9)',
            fontSize: 11,
            letterSpacing: '0.04em',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {photos.length} Visual Stories
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: 'minmax(0, 1.22fr) minmax(0, 0.78fr)',
          gridTemplateRows: 'clamp(96px, 19vw, 124px) clamp(96px, 19vw, 124px)',
        }}
      >
        <PhotoTile photo={photos[0]} delay={90} style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }} />
        <PhotoTile photo={photos[1]} delay={170} style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }} />
        <PhotoTile photo={photos[2]} delay={250} style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }} />
      </div>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <PhotoTile photo={photos[3]} delay={330} style={{ minHeight: 'clamp(78px, 15vw, 102px)' }} />
        <PhotoTile photo={photos[4]} delay={410} style={{ minHeight: 'clamp(78px, 15vw, 102px)' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tags.map((tag, index) => (
          <span
            key={tag}
            style={{
              animation: `tileEntrance 550ms cubic-bezier(0.22, 1, 0.36, 1) ${460 + index * 55}ms both`,
              backdropFilter: 'blur(6px)',
              background: 'rgba(15, 23, 42, 0.46)',
              border: '1px solid rgba(255, 255, 255, 0.24)',
              borderRadius: 999,
              color: '#ddf6ef',
              fontSize: 9,
              letterSpacing: '0.06em',
              padding: '4px 9px',
              textTransform: 'uppercase',
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
  delay?: number
}) {
  return (
    <article
      style={{
        animation: `tileEntrance 680ms cubic-bezier(0.22, 1, 0.36, 1) ${props.delay ?? 0}ms both`,
        border: '1px solid rgba(255, 255, 255, 0.28)',
        borderRadius: 12,
        boxShadow: '0 12px 24px rgba(3, 10, 19, 0.32)',
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
          filter: 'saturate(1.08) contrast(1.04) brightness(1.03)',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(1.01)',
          transition: 'transform 500ms ease',
          width: '100%',
        }}
      />
      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(2, 6, 23, 0.02) 0%, rgba(2, 6, 23, 0.74) 64%, rgba(2, 6, 23, 0.9) 100%)',
          bottom: 0,
          color: '#f8fafc',
          left: 0,
          padding: '18px 8px 6px',
          position: 'absolute',
          right: 0,
        }}
      >
        <strong
          style={{
            display: 'block',
            fontFamily: serifFont,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.01em',
            lineHeight: 1.1,
          }}
        >
          {props.photo.title}
        </strong>
        <span
          style={{
            color: 'rgba(231, 245, 255, 0.8)',
            fontSize: 9,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          by {props.photo.author}
        </span>
      </div>
    </article>
  )
}
