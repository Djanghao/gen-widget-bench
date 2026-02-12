export default function Widget() {
  const now = new Date().toLocaleTimeString()

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #d6f5ff 0%, #f3e8ff 100%)',
        border: '1px solid #cbd5e1',
        borderRadius: 16,
        boxShadow: '0 20px 40px rgba(30, 41, 59, 0.08)',
        color: '#0f172a',
        display: 'grid',
        gap: 12,
        maxWidth: 420,
        padding: 24,
      }}
    >
      <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Widget Placeholder Example</h2>
      <p style={{ margin: 0 }}>
        Edit <code>widget.tsx</code> in the left editor and preview the live result here.
      </p>
      <button
        style={{
          background: '#0f172a',
          border: 'none',
          borderRadius: 10,
          color: '#f8fafc',
          cursor: 'pointer',
          fontWeight: 600,
          justifySelf: 'start',
          padding: '10px 14px',
        }}
        type="button"
      >
        Sample Action
      </button>
      <small style={{ color: '#334155' }}>Rendered at {now}</small>
    </section>
  )
}
