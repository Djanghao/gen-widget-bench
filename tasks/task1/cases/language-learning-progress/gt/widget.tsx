import data from './data.json'
import { Flame, Zap, BookOpen, Pencil, Headphones, Target, CheckCircle } from 'lucide-react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

type LangData = {
  language: string
  flag: string
  level: string
  overallProgress: number
  skills: Array<{ name: string; progress: number; level: string; color: string }>
  todayStats: { xpEarned: number; streakDays: number; wordsReviewed: number; accuracyPercent: number }
  upcomingLessons: Array<{ title: string; icon: string; estimatedMin: number }>
  radialData: Array<{ name: string; value: number; fill: string }>
}

const lang = data as LangData

const lessonIcons: Record<string, React.ElementType> = {
  'book-open': BookOpen,
  'pencil': Pencil,
  'headphones': Headphones,
}

export default function Widget() {
  const radialData = [{ name: 'Progress', value: lang.overallProgress, fill: '#8b5cf6' }]

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
        borderRadius: 20,
        color: '#e8e8f0',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div data-eid="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span data-eid="flag-emoji" style={{ fontSize: 28 }}>{lang.flag}</span>
          <h2 data-eid="language-name" style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            {lang.language}
          </h2>
        </div>
        <span
          data-eid="level-badge"
          style={{
            background: 'rgba(139,92,246,0.2)',
            color: '#a78bfa',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: 600,
            border: '1px solid rgba(139,92,246,0.3)',
          }}
        >
          {lang.level}
        </span>
      </div>

      <div data-eid="progress-ring" style={{ position: 'relative', height: 160 }}>
        <ResponsiveContainer width="100%" height={160}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            startAngle={90}
            endAngle={-270}
            data={radialData}
            barSize={12}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={6}
              background={{ fill: 'rgba(255,255,255,0.08)' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <span
          data-eid="progress-percent"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 26,
            fontWeight: 800,
            color: '#a78bfa',
          }}
        >
          {lang.overallProgress}%
        </span>
      </div>

      <div data-eid="skills-section">
        <h3 data-eid="skills-title" style={{ fontSize: 14, fontWeight: 600, margin: '0 0 10px', color: '#cbd5e1' }}>
          Skill Breakdown
        </h3>
        {lang.skills.map((skill) => {
          const skillKey = skill.name.toLowerCase()
          return (
            <div
              key={skill.name}
              data-eid={`skill-${skillKey}`}
              style={{ marginBottom: 10 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>{skill.name}</span>
                <span
                  data-eid={`skill-${skillKey}-level`}
                  style={{ fontSize: 11, color: skill.color, fontWeight: 600 }}
                >
                  {skill.level}
                </span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                <div
                  data-eid={`skill-${skillKey}-bar`}
                  style={{
                    width: `${skill.progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div data-eid="today-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        <div data-eid="stat-xp" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
          <Zap size={16} color="#fbbf24" style={{ marginBottom: 2 }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24' }}>{lang.todayStats.xpEarned}</div>
          <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase' }}>XP</div>
        </div>
        <div data-eid="stat-streak" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
          <Flame size={16} color="#f97316" style={{ marginBottom: 2 }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: '#f97316' }}>{lang.todayStats.streakDays}</div>
          <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase' }}>Days</div>
        </div>
        <div data-eid="stat-words" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
          <BookOpen size={16} color="#60a5fa" style={{ marginBottom: 2 }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: '#60a5fa' }}>{lang.todayStats.wordsReviewed}</div>
          <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase' }}>Words</div>
        </div>
        <div data-eid="stat-accuracy" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
          <Target size={16} color="#34d399" style={{ marginBottom: 2 }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: '#34d399' }}>{lang.todayStats.accuracyPercent}%</div>
          <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase' }}>Accuracy</div>
        </div>
      </div>

      <div data-eid="lessons-section">
        <h3 data-eid="lessons-title" style={{ fontSize: 14, fontWeight: 600, margin: '0 0 10px', color: '#cbd5e1' }}>
          Upcoming Lessons
        </h3>
        {lang.upcomingLessons.map((lesson, i) => {
          const Icon = lessonIcons[lesson.icon] || BookOpen
          return (
            <div
              key={i}
              data-eid={`lesson-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                marginBottom: i < lang.upcomingLessons.length - 1 ? 6 : 0,
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {i === 0 && (
                <span data-eid="lesson-0-icon" style={{ display: 'flex' }}>
                  <Icon size={18} color="#a78bfa" />
                </span>
              )}
              {i !== 0 && (
                <span style={{ display: 'flex' }}>
                  <Icon size={18} color="#a78bfa" />
                </span>
              )}
              <span style={{ flex: 1, fontSize: 13 }}>{lesson.title}</span>
              <span
                data-eid={i <= 1 ? `lesson-${i}-time` : undefined}
                style={{ fontSize: 11, color: '#64748b' }}
              >
                {lesson.estimatedMin} min
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
