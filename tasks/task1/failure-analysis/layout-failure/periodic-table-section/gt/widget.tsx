import { Atom, Beaker, Thermometer, Droplets } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts'
import data from './data.json'

type Category = {
  label: string
  color: string
  bg: string
  border: string
}

type Element = {
  number: number
  symbol: string
  name: string
  mass: number
  category: string
}

type SelectedElement = Element & {
  electronConfig: string
  meltingPoint: string
  boilingPoint: string
  density: string
  electronegativity: string
  period: number
  group: number
}

type PropertyComparison = { symbol: string; meltingPoint: number; density: number }

type PeriodicData = {
  title: string
  categories: Record<string, Category>
  elements: Element[]
  propertyComparison: PropertyComparison[]
  selectedElement: SelectedElement
}

const periodic = data as PeriodicData

export default function Widget() {
  const sel = periodic.selectedElement
  const selCat = periodic.categories[sel.category]

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #0a0f1e 0%, #121a2d 40%, #0d1117 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 14,
        maxWidth: 480,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Atom size={20} color="#a78bfa" />
        <div data-eid="title" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>{periodic.title}</div>
        {(['alkali', 'alkaline', 'transition', 'post-transition'] as const).map((key) => {
          const cat = periodic.categories[key]
          return (
            <span
              key={key}
              data-eid={`filter-${key}`}
              style={{
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                borderRadius: 8,
                color: cat.color,
                fontSize: 9,
                fontWeight: 600,
                padding: '2px 6px',
              }}
            >
              {cat.label}
            </span>
          )
        })}
      </header>

      {/* Elements Grid: 4 columns x 5 rows */}
      <div
        data-eid="elements-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
        }}
      >
        {periodic.elements.map((el, i) => {
          const cat = periodic.categories[el.category]
          const isSelected = el.number === sel.number
          return (
            <div
              key={el.number}
              data-eid={`el-${i}`}
              style={{
                background: cat.bg,
                border: `1px solid ${isSelected ? cat.color : cat.border}`,
                borderRadius: 10,
                display: 'grid',
                gap: 1,
                padding: '6px 8px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: isSelected ? `0 0 8px ${cat.color}44` : 'none',
              }}
            >
              <span data-eid={`el-${i}-number`} style={{ fontSize: 8, color: '#94a3b8', textAlign: 'left' }}>{el.number}</span>
              <span data-eid={`el-${i}-symbol`} style={{ fontSize: 20, fontWeight: 800, color: cat.color, lineHeight: 1.1 }}>{el.symbol}</span>
              <span data-eid={`el-${i}-name`} style={{ fontSize: 8, color: '#94a3b8', lineHeight: 1 }}>{el.name}</span>
              <span data-eid={`el-${i}-mass`} style={{ fontSize: 7, color: '#64748b' }}>{el.mass}</span>
            </div>
          )
        })}
      </div>

      {/* Selected Element Detail Card */}
      <div
        data-eid="detail-card"
        style={{
          background: selCat.bg,
          border: `1px solid ${selCat.border}`,
          borderRadius: 14,
          padding: 16,
          display: 'grid',
          gap: 10,
        }}
      >
        {/* Top row: symbol + basic info */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div
            data-eid="detail-symbol"
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: `${selCat.color}22`,
              border: `2px solid ${selCat.color}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 800,
              color: selCat.color,
            }}
          >
            {sel.symbol}
          </div>
          <div style={{ flex: 1 }}>
            <div data-eid="detail-name" style={{ fontSize: 18, fontWeight: 700 }}>{sel.name}</div>
            <div data-eid="detail-number" style={{ fontSize: 12, color: '#94a3b8' }}>Atomic Number: {sel.number}</div>
            <div data-eid="detail-mass" style={{ fontSize: 12, color: '#94a3b8' }}>Atomic Mass: {sel.mass}</div>
          </div>
        </div>

        {/* Electron Configuration */}
        <div
          data-eid="detail-electron-config"
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 8,
            padding: '6px 10px',
            fontSize: 12,
            fontFamily: 'monospace',
            color: '#c7d2fe',
          }}
        >
          e- config: {sel.electronConfig}
        </div>

        {/* Properties Grid */}
        <div
          data-eid="detail-props"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          <div
            data-eid="detail-melting"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: '8px 10px',
              display: 'grid',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 9, color: '#64748b' }}>Melting Point</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#f97316' }}>{sel.meltingPoint} °C</span>
          </div>
          <div
            data-eid="detail-boiling"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: '8px 10px',
              display: 'grid',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 9, color: '#64748b' }}>Boiling Point</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>{sel.boilingPoint} °C</span>
          </div>
          <div
            data-eid="detail-density"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: '8px 10px',
              display: 'grid',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 9, color: '#64748b' }}>Density</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#3b82f6' }}>{sel.density} g/cm³</span>
          </div>
          <div
            data-eid="detail-electronegativity"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              padding: '8px 10px',
              display: 'grid',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 9, color: '#64748b' }}>Electronegativity</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#a78bfa' }}>{sel.electronegativity}</span>
          </div>
        </div>

        {/* Category badge + Period/Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            data-eid="detail-category"
            style={{
              background: selCat.bg,
              border: `1px solid ${selCat.color}`,
              borderRadius: 10,
              color: selCat.color,
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
            }}
          >
            {selCat.label}
          </span>
          <div data-eid="detail-period-group" style={{ fontSize: 11, color: '#94a3b8' }}>
            Period {sel.period}, Group {sel.group}
          </div>
        </div>
      </div>

      {/* Property Comparison Chart */}
      <div data-eid="comparison-chart" style={{ display: 'grid', gap: 4 }}>
        <div data-eid="comparison-title" style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>Melting Point Comparison (°C)</div>
        <div data-eid="comparison-bars" style={{ height: 100 }}>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={periodic.propertyComparison} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
              <XAxis dataKey="symbol" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} width={35} />
              <Bar dataKey="meltingPoint" fill="#eab308" radius={[4, 4, 0, 0]} barSize={30} fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div data-eid="legend" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {(['alkali', 'alkaline', 'transition', 'post-transition', 'metalloid'] as const).map((key) => {
          const cat = periodic.categories[key]
          return (
            <span
              key={key}
              data-eid={`legend-${key}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 9,
                color: '#94a3b8',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: cat.color, display: 'inline-block' }} />
              {cat.label}
            </span>
          )
        })}
      </div>
    </section>
  )
}
