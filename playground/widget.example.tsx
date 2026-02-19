const shellStyle = {
  background: '#ffffff',
  border: '1px solid #dbe3ef',
  borderRadius: 16,
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.08)',
  color: '#0f172a',
  display: 'grid',
  gap: 14,
  maxWidth: 720,
  padding: 20,
  width: '100%',
} as const

const badgeRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
} as const

const badgeStyle = {
  background: '#f1f5f9',
  border: '1px solid #dbe3ef',
  borderRadius: 999,
  color: '#334155',
  fontSize: 13,
  padding: '6px 12px',
} as const

export default function Widget() {
  return (
    <section style={shellStyle}>
      <h2 style={{ fontSize: 20, margin: 0 }}>Minimal Example</h2>
      <p style={{ color: '#475569', margin: 0 }}>
        This is a clean starter widget. Paste your own TSX in the editor to replace it.
      </p>

      <div style={badgeRowStyle}>
        <span style={badgeStyle}>Status: Ready</span>
        <span style={badgeStyle}>Mode: Demo</span>
      </div>
    </section>
  )
}
