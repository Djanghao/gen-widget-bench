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

const { alerts, ridership, summary } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f6faff 100%)',
        border: '1px solid #dbe3ef',
        borderRadius: 16,
        boxShadow: '0 16px 32px rgba(15, 23, 42, 0.1)',
        color: '#0f172a',
        display: 'grid',
        gap: 10,
        maxWidth: 540,
        padding: 12,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 16, margin: 0 }}>Mobility Pulse Mini</h2>
          <p style={{ color: '#475569', fontSize: 12, margin: '3px 0 0' }}>Ridership and punctuality</p>
        </div>
        <strong style={{ color: '#0f766e', fontSize: 13 }}>{summary.serviceIndex}</strong>
      </header>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <Stat label="Peak Pax/h" value={summary.peakRidership} />
        <Stat label="On-time" value={summary.punctuality} />
        <Stat label="Incidents" value={summary.incidents} />
      </div>

      <article
        style={{
          background: '#ffffff',
          border: '1px solid #dbe3ef',
          borderRadius: 12,
          padding: 8,
        }}
      >
        <div style={{ color: '#334155', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Ridership By Hour</div>
        <div style={{ height: 170 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ridership}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line dataKey="value" dot={false} stroke="#2563eb" strokeWidth={2.6} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <div style={{ display: 'grid', gap: 4 }}>
        {alerts.map((item) => (
          <div
            key={item.name}
            style={{
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid #dbe3ef',
              borderRadius: 10,
              color: '#334155',
              display: 'flex',
              fontSize: 12,
              justifyContent: 'space-between',
              padding: '5px 8px',
            }}
          >
            <span>{item.name}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function Stat(props: { label: string; value: string }) {
  return (
    <article
      style={{
        background: '#f8fbff',
        border: '1px solid #dbe3ef',
        borderRadius: 10,
        display: 'grid',
        gap: 2,
        padding: '7px 8px',
      }}
    >
      <span style={{ color: '#64748b', fontSize: 11 }}>{props.label}</span>
      <strong style={{ color: '#0f172a', fontSize: 14 }}>{props.value}</strong>
    </article>
  )
}
