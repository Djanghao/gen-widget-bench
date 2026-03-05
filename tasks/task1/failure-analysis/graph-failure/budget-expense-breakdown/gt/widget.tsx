import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { DollarSign } from 'lucide-react'
import data from './data.json'

type Category = {
  name: string
  amount: number
  percentage: number
  color: string
}

type BudgetData = {
  month: string
  totalBudget: number
  totalSpent: number
  remaining: number
  spentPercentage: number
  categories: Category[]
}

const budget = data as BudgetData

function formatUsd(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #0f0f1e 0%, #161625 50%, #0d0d1a 100%)',
        borderRadius: 20,
        color: '#e4e4ed',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        maxWidth: 460,
        padding: 22,
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DollarSign size={20} color="#6366f1" />
          <div data-eid="month-label" style={{ fontSize: 18, fontWeight: 700 }}>
            {budget.month}
          </div>
        </div>
        <div data-eid="budget-total" style={{ fontSize: 13, color: '#8b8fa3' }}>
          Total Budget: {formatUsd(budget.totalBudget)}
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
          <span data-eid="spent-amount" style={{ color: '#f87171', fontWeight: 600 }}>
            Spent: {formatUsd(budget.totalSpent)}
          </span>
          <span data-eid="remaining-amount" style={{ color: '#4ade80', fontWeight: 600 }}>
            Left: {formatUsd(budget.remaining)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div data-eid="progress-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#8b8fa3' }}>Overall Spending</span>
          <div data-eid="progress-label" style={{ fontSize: 13, fontWeight: 700, color: budget.spentPercentage > 80 ? '#f87171' : '#4ade80' }}>
            {budget.spentPercentage}%
          </div>
        </div>
        <div
          data-eid="progress-bar-bg"
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 6,
            height: 8,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <div
            data-eid="progress-bar-fill"
            style={{
              background: budget.spentPercentage > 80
                ? 'linear-gradient(90deg, #f87171, #ef4444)'
                : 'linear-gradient(90deg, #4ade80, #22c55e)',
              borderRadius: 6,
              height: '100%',
              width: `${budget.spentPercentage}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div data-eid="chart-section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div data-eid="pie-chart" style={{ width: 220, height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budget.categories}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                dataKey="amount"
                nameKey="name"
                strokeWidth={2}
                stroke="#0f0f1e"
              >
                {budget.categories.map((cat, idx) => (
                  <Cell key={cat.name} fill={cat.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category List */}
      <div data-eid="category-list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {budget.categories.map((cat, i) => (
          <div
            key={cat.name}
            data-eid={`category-row-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <span
              data-eid={`category-dot-${i}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: cat.color,
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span data-eid={`category-name-${i}`} style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>
              {cat.name}
            </span>
            <span data-eid={`category-amount-${i}`} style={{ fontSize: 14, fontWeight: 600, minWidth: 70, textAlign: 'right' }}>
              {formatUsd(cat.amount)}
            </span>
            <span
              data-eid={`category-pct-${i}`}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#8b8fa3',
                minWidth: 36,
                textAlign: 'right',
              }}
            >
              {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
