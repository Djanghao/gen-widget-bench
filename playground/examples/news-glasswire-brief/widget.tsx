import data from './data.json'

const { edition, lead, stories, ticker, updatedAt } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #0f172a 100%)',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        borderRadius: 16,
        boxShadow: '0 16px 34px rgba(2, 6, 23, 0.5)',
        color: '#e2e8f0',
        display: 'grid',
        gap: 8,
        maxWidth: 540,
        overflow: 'hidden',
        padding: 12,
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(56, 189, 248, 0) 70%)',
          height: 160,
          pointerEvents: 'none',
          position: 'absolute',
          right: -30,
          top: -30,
          width: 160,
        }}
      />

      <header style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div>
          <h2 style={{ fontSize: 15, margin: 0 }}>{edition}</h2>
          <p style={{ color: '#94a3b8', fontSize: 10, margin: '2px 0 0' }}>{updatedAt}</p>
        </div>
        <span
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.35)',
            borderRadius: 999,
            color: '#bae6fd',
            fontSize: 10,
            letterSpacing: '0.08em',
            padding: '2px 8px',
            textTransform: 'uppercase',
          }}
        >
          live desk
        </span>
      </header>

      <article
        style={{
          backdropFilter: 'blur(7px)',
          background: 'rgba(15, 23, 42, 0.55)',
          border: '1px solid rgba(148, 163, 184, 0.35)',
          borderRadius: 12,
          display: 'grid',
          gap: 5,
          padding: 9,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ color: '#38bdf8', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{lead.category}</span>
        <h3 style={{ fontSize: 14, lineHeight: 1.3, margin: 0 }}>{lead.headline}</h3>
        <p style={{ color: '#cbd5e1', fontSize: 11, lineHeight: 1.4, margin: 0 }}>{lead.summary}</p>
      </article>

      <div style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', position: 'relative', zIndex: 1 }}>
        {stories.map((story) => (
          <article
            key={story.title}
            style={{
              background: 'rgba(15, 23, 42, 0.62)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              borderRadius: 10,
              display: 'grid',
              gap: 4,
              padding: '6px 7px',
            }}
          >
            <span style={{ color: '#67e8f9', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {story.category}
            </span>
            <strong style={{ fontSize: 11, lineHeight: 1.3 }}>{story.title}</strong>
            <p style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.35, margin: 0 }}>{story.summary}</p>
          </article>
        ))}
      </div>

      <div
        style={{
          background: '#020617',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          borderRadius: 999,
          color: '#a5f3fc',
          display: 'flex',
          fontSize: 10,
          gap: 10,
          overflowX: 'auto',
          padding: '4px 8px',
          position: 'relative',
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        {ticker.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}
