import { Database, Table, Key, GitBranch } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts'
import data from './data.json'

type ColumnData = {
  name: string
  type: string
  key: string | null
  nullable: boolean
}

type TableData = {
  name: string
  rows: number
  indices: number
  columns: ColumnData[]
}

type MigrationData = {
  version: string
  description: string
  time: string
}

type QueryData = {
  day: string
  queries: number
}

type WidgetData = {
  dbName: string
  engine: string
  schemaVersion: string
  tables: TableData[]
  schemaStats: { totalTables: number; totalColumns: number; totalIndices: number; totalSize: string }
  migrations: MigrationData[]
  queryVolume: QueryData[]
}

const d = data as WidgetData

const typeColors: Record<string, { bg: string; text: string }> = {
  int: { bg: 'rgba(99,102,241,0.2)', text: '#a5b4fc' },
  varchar: { bg: 'rgba(34,197,94,0.2)', text: '#86efac' },
  bool: { bg: 'rgba(245,158,11,0.2)', text: '#fcd34d' },
  timestamp: { bg: 'rgba(236,72,153,0.2)', text: '#f9a8d4' },
  decimal: { bg: 'rgba(14,165,233,0.2)', text: '#7dd3fc' },
}

const keyColors: Record<string, { bg: string; text: string }> = {
  PK: { bg: 'rgba(251,191,36,0.2)', text: '#fbbf24' },
  FK: { bg: 'rgba(167,139,250,0.2)', text: '#c4b5fd' },
}

const nullableEids = new Set([
  'table-orders-col-5-nullable',
  'table-categories-col-3-nullable',
])

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1a1a2e 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 14,
        maxWidth: 460,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
      >
        <Database size={20} color="#818cf8" />
        <div data-eid="db-name" style={{ fontSize: 18, fontWeight: 700, flex: 1, fontFamily: 'monospace' }}>
          {d.dbName}
        </div>
        <span
          data-eid="engine-badge"
          style={{
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.4)',
            borderRadius: 12,
            color: '#93c5fd',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.engine}
        </span>
        <span
          data-eid="version-badge"
          style={{
            background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: 12,
            color: '#a5b4fc',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
          }}
        >
          {d.schemaVersion}
        </span>
      </header>

      {/* Tables */}
      <div data-eid="tables-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {d.tables.map((table) => (
          <div
            key={table.name}
            data-eid={`table-${table.name}`}
            style={{
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 12,
              padding: 10,
              display: 'grid',
              gap: 6,
            }}
          >
            <div
              data-eid={`table-${table.name}-name`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                color: '#c7d2fe',
                fontFamily: 'monospace',
              }}
            >
              <Table size={13} color="#818cf8" />
              {table.name}
            </div>
            <div
              data-eid={`table-${table.name}-meta`}
              style={{ display: 'flex', gap: 8, fontSize: 9, color: '#64748b' }}
            >
              <span>{table.rows.toLocaleString()} rows</span>
              <span>{table.indices} indices</span>
            </div>
            {table.columns.map((col, ci) => {
              const tc = typeColors[col.type] || typeColors.varchar
              const kc = col.key ? keyColors[col.key] : null
              return (
                <div
                  key={ci}
                  data-eid={`table-${table.name}-col-${ci}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 6px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 6,
                    borderLeft: col.key === 'FK' ? '2px dashed rgba(167,139,250,0.4)' : col.key === 'PK' ? '2px solid rgba(251,191,36,0.4)' : '2px solid transparent',
                  }}
                >
                  <span
                    data-eid={`table-${table.name}-col-${ci}-name`}
                    style={{ fontSize: 11, color: '#e2e8f0', fontFamily: 'monospace', flex: 1 }}
                  >
                    {col.name}
                  </span>
                  <span
                    data-eid={`table-${table.name}-col-${ci}-type`}
                    style={{
                      background: tc.bg,
                      borderRadius: 4,
                      color: tc.text,
                      fontSize: 9,
                      fontWeight: 600,
                      padding: '1px 5px',
                    }}
                  >
                    {col.type}
                  </span>
                  {col.key && kc && (
                    <span
                      data-eid={`table-${table.name}-col-${ci}-key`}
                      style={{
                        background: kc.bg,
                        borderRadius: 4,
                        color: kc.text,
                        fontSize: 8,
                        fontWeight: 700,
                        padding: '1px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Key size={8} />
                      {col.key}
                    </span>
                  )}
                  {col.nullable === false && !col.key && (
                    <span
                      data-eid={`table-${table.name}-col-${ci}-nullable`}
                      style={{
                        fontSize: 8,
                        color: '#f87171',
                        fontWeight: 600,
                      }}
                    >
                      NN
                    </span>
                  )}
                  {col.nullable === true && nullableEids.has(`table-${table.name}-col-${ci}-nullable`) && (
                    <span
                      data-eid={`table-${table.name}-col-${ci}-nullable`}
                      style={{
                        fontSize: 8,
                        color: '#64748b',
                        fontWeight: 600,
                      }}
                    >
                      NULL
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Schema Stats */}
      <div
        data-eid="schema-stats"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}
      >
        {[
          { key: 'tables', label: 'Tables', value: d.schemaStats.totalTables },
          { key: 'columns', label: 'Columns', value: d.schemaStats.totalColumns },
          { key: 'indices', label: 'Indices', value: d.schemaStats.totalIndices },
          { key: 'size', label: 'Size', value: d.schemaStats.totalSize },
        ].map((stat) => (
          <div
            key={stat.key}
            data-eid={`stat-${stat.key}`}
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 10,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <span data-eid={`stat-${stat.key}-label`} style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>
              {stat.label}
            </span>
            <span data-eid={`stat-${stat.key}-value`} style={{ fontSize: 18, fontWeight: 700, color: '#c7d2fe' }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Query Volume Chart */}
      <div
        data-eid="query-chart"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 12,
          padding: 10,
        }}
      >
        <div
          data-eid="query-chart-title"
          style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 8 }}
        >
          Query Volume (7d)
        </div>
        <div style={{ height: 90, width: '100%' }}>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={d.queryVolume} margin={{ top: 0, right: 0, bottom: 0, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  fontSize: 11,
                  color: '#e2e8f0',
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Queries']}
              />
              <Bar dataKey="queries" fill="rgba(129,140,248,0.6)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Migrations */}
      <div data-eid="migrations-section" style={{ display: 'grid', gap: 8 }}>
        <div data-eid="migrations-title" style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>
          Recent Migrations
        </div>
        {d.migrations.map((mig, i) => (
          <div
            key={i}
            data-eid={`migration-${i}`}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 10px',
            }}
          >
            <GitBranch size={13} color="#818cf8" />
            <span
              data-eid={`migration-${i}-version`}
              style={{
                background: 'rgba(99,102,241,0.15)',
                borderRadius: 4,
                color: '#a5b4fc',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              {mig.version}
            </span>
            <span
              data-eid={`migration-${i}-desc`}
              style={{
                flex: 1,
                fontSize: 11,
                color: '#cbd5e1',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {mig.description}
            </span>
            <span
              data-eid={`migration-${i}-time`}
              style={{ fontSize: 10, color: '#64748b', whiteSpace: 'nowrap' }}
            >
              {mig.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
