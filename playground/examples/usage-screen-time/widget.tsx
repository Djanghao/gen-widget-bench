import data from './data.json'
import {
  AppWindow,
  BarChart3,
  Bot,
  Briefcase,
  Calculator,
  Clock3,
  Film,
  Mail,
  MessageCircle,
  Music2,
  type LucideIcon,
  Users,
  Youtube,
} from 'lucide-react'

type UsageData = {
  totalMinutes: number
  hourly: Array<{ hour: string; minutes: number }>
  categories: Array<{ name: string; minutes: number; color: string }>
  topApps: Array<{ name: string; minutes: number; icon: string }>
}

const usage = data as UsageData

function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}

function categoryIcon(name: string): LucideIcon {
  const key = name.toLowerCase()
  if (key.includes('productivity')) return Briefcase
  if (key.includes('social')) return Users
  if (key.includes('entertainment')) return Film
  return BarChart3
}

function appIcon(name: string): LucideIcon {
  const key = name.toLowerCase()
  if (key.includes('numbers')) return Calculator
  if (key.includes('chatgpt')) return Bot
  if (key.includes('youtube')) return Youtube
  if (key.includes('whatsapp')) return MessageCircle
  if (key.includes('mail')) return Mail
  if (key.includes('music')) return Music2
  return AppWindow
}

export default function Widget() {
  const maxMinute = Math.max(...usage.hourly.map((point) => point.minutes), 1)
  const peakMinute = Math.max(...usage.hourly.map((point) => point.minutes), 0)
  const topCategories = usage.categories.slice(0, 3)
  const topApps = usage.topApps.slice(0, 6)

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #1a1d23 0%, #13161c 100%)',
        borderRadius: 22,
        color: '#f2f4f8',
        display: 'grid',
        gap: 10,
        maxWidth: 360,
        overflow: 'hidden',
        padding: 14,
        width: '100%',
      }}
    >
      <header style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
        <span
          style={{
            background: 'linear-gradient(180deg, #a7d1ff 0%, #6fa9f0 100%)',
            borderRadius: '50%',
            color: '#091833',
            display: 'inline-grid',
            height: 24,
            placeItems: 'center',
            width: 24,
          }}
        >
          <Clock3 size={14} strokeWidth={2.2} />
        </span>
        <strong style={{ fontSize: 42, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 0.9 }}>
          {formatDuration(usage.totalMinutes)}
        </strong>
      </header>

      <div
        style={{
          background: 'linear-gradient(180deg, rgba(9, 15, 31, 0.85) 0%, rgba(6, 11, 25, 0.78) 100%)',
          border: '1px solid rgba(141, 164, 213, 0.2)',
          borderRadius: 12,
          display: 'grid',
          gap: 4,
          padding: '8px 8px 8px',
        }}
      >
        <div style={{ color: '#7f9ad1', display: 'flex', fontSize: 10, justifyContent: 'space-between' }}>
          <span>Usage by hour</span>
          <span>Peak {peakMinute}m</span>
        </div>
        <div
          style={{
            borderRadius: 10,
            display: 'grid',
            overflow: 'hidden',
            padding: '4px 0 2px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: 0,
              gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
              inset: '4px 0 16px',
              pointerEvents: 'none',
              position: 'absolute',
            }}
          >
            <div style={{ borderTop: '1px solid rgba(117, 143, 201, 0.24)' }} />
            <div style={{ borderTop: '1px solid rgba(117, 143, 201, 0.16)' }} />
            <div style={{ borderTop: '1px solid rgba(117, 143, 201, 0.1)' }} />
          </div>
          <div
            style={{
              alignItems: 'end',
              display: 'grid',
              gap: 4,
              gridTemplateColumns: `repeat(${usage.hourly.length}, minmax(0, 1fr))`,
              height: 58,
              position: 'relative',
            }}
          >
            {usage.hourly.map((point) => {
              const ratio = point.minutes / maxMinute
              const height = point.minutes === 0 ? 2 : Math.max(8, Math.round(ratio * 46))
              const isPeak = point.minutes > 0 && point.minutes === peakMinute
              return (
                <div key={point.hour} style={{ display: 'grid', justifyItems: 'center' }}>
                  <div
                    style={{
                      background: 'rgba(103, 132, 194, 0.18)',
                      borderRadius: 999,
                      display: 'grid',
                      height: 46,
                      overflow: 'hidden',
                      width: 9,
                    }}
                  >
                    <span
                      style={{
                        alignSelf: 'end',
                        background: isPeak
                          ? 'linear-gradient(180deg, #86ddff 0%, #4da5ff 100%)'
                          : 'linear-gradient(180deg, #73bbff 0%, #3f79dc 100%)',
                        borderRadius: 999,
                        boxShadow: isPeak ? '0 0 8px rgba(103, 196, 255, 0.5)' : 'none',
                        display: 'block',
                        height,
                        width: '100%',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ color: '#8f9bb2', display: 'flex', fontSize: 10, justifyContent: 'space-between' }}>
          <span>{usage.hourly[0]?.hour}:00</span>
          <span>{usage.hourly[Math.floor((usage.hourly.length - 1) / 2)]?.hour}:00</span>
          <span>{usage.hourly[usage.hourly.length - 1]?.hour}:00</span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {topCategories.map((category) => {
          const CategoryIcon = categoryIcon(category.name)
          return (
            <div key={category.name}>
              <div style={{ alignItems: 'center', color: category.color, display: 'flex', fontSize: 11, fontWeight: 600, gap: 4 }}>
                <CategoryIcon size={12} strokeWidth={2.2} />
                <span>{category.name}</span>
              </div>
              <div style={{ color: '#e4e9f3', fontSize: 22, lineHeight: 1 }}>{formatDuration(category.minutes)}</div>
            </div>
          )
        })}
      </div>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 12,
          display: 'grid',
          gap: 8,
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          padding: 8,
        }}
      >
        {topApps.map((app) => {
          const AppIcon = appIcon(app.name)
          return (
            <article key={app.name} style={{ alignItems: 'center', display: 'flex', gap: 8, minWidth: 0 }}>
              <span
                style={{
                  background: '#222834',
                  borderRadius: 8,
                  color: '#d8e2f8',
                  display: 'inline-grid',
                  height: 20,
                  placeItems: 'center',
                  width: 20,
                }}
              >
                <AppIcon size={12} strokeWidth={2.2} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: '#f2f4f8',
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {app.name}
                </div>
                <div style={{ color: '#8f9bb2', fontSize: 11 }}>{app.minutes}m</div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
