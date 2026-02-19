import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from './data.json'

const { allocationByRegion, summary } = data

export default function Widget() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
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
          <h2 style={{ fontSize: 16, margin: 0 }}>Capital Flow Mini</h2>
          <p style={{ color: '#475569', fontSize: 12, margin: '3px 0 0' }}>Regional allocation</p>
        </div>
        <strong style={{ color: '#1d4ed8', fontSize: 13 }}>{summary.aum}</strong>
      </header>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <Stat label="Daily Net" value={summary.dailyNet} />
        <Stat label="Risk" value={summary.riskLevel} />
        <Stat label="Rebalance" value={summary.rebalanceWindow} />
      </div>

      <article
        style={{
          background: '#ffffff',
          border: '1px solid #dbe3ef',
          borderRadius: 12,
          padding: 8,
        }}
      >
        <div style={{ color: '#334155', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>Allocation By Region</div>
        <div style={{ height: 170 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={allocationByRegion}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey="region" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="weight" radius={[8, 8, 0, 0]}>
                {allocationByRegion.map((item) => (
                  <Cell fill={item.color} key={item.region} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
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
