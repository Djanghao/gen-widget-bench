import data from './data.json'
import { Heart, MessageCircle, Share2, TrendingUp, FileText } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

type SocialData = {
  profile: { handle: string; initials: string; followers: string; following: string; growth: string }
  stats: { posts: string; likes: string; comments: string; shares: string }
  engagementData: Array<{ day: string; likes: number; comments: number; shares: number }>
  recentPosts: Array<{ date: string; preview: string; engagement: string }>
}

const social = data as SocialData

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        borderRadius: 20,
        color: '#e8e8f0',
        maxWidth: 420,
        overflow: 'hidden',
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div data-eid="profile-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          data-eid="profile-avatar"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {social.profile.initials}
        </div>
        <div style={{ flex: 1 }}>
          <h2 data-eid="profile-name" style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
            {social.profile.handle}
          </h2>
          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
            <span data-eid="followers-count">
              <strong style={{ color: '#e8e8f0' }}>{social.profile.followers}</strong> followers
            </span>
            <span data-eid="following-count">
              <strong style={{ color: '#e8e8f0' }}>{social.profile.following}</strong> following
            </span>
          </div>
        </div>
        <span
          data-eid="growth-badge"
          style={{
            background: 'rgba(52,211,153,0.15)',
            color: '#34d399',
            borderRadius: 20,
            padding: '4px 10px',
            fontSize: 11,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <TrendingUp size={12} />
          {social.profile.growth}
        </span>
      </div>

      <div data-eid="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { eid: 'stat-posts', valueEid: 'stat-posts-value', label: 'Posts', value: social.stats.posts, icon: FileText, color: '#60a5fa' },
          { eid: 'stat-likes', valueEid: 'stat-likes-value', label: 'Likes', value: social.stats.likes, icon: Heart, color: '#f472b6' },
          { eid: 'stat-comments', valueEid: 'stat-comments-value', label: 'Comments', value: social.stats.comments, icon: MessageCircle, color: '#fbbf24' },
          { eid: 'stat-shares', valueEid: 'stat-shares-value', label: 'Shares', value: social.stats.shares, icon: Share2, color: '#34d399' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.eid}
              data-eid={s.eid}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                padding: '10px 6px',
                textAlign: 'center',
                border: `1px solid ${s.color}22`,
              }}
            >
              <Icon size={14} color={s.color} style={{ marginBottom: 4 }} />
              <span data-eid={s.valueEid} style={{ display: 'block', fontSize: 16, fontWeight: 700, color: s.color }}>
                {s.value}
              </span>
              <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>{s.label}</span>
            </div>
          )
        })}
      </div>

      <div data-eid="chart-section">
        <h3 data-eid="chart-title" style={{ fontSize: 14, fontWeight: 600, margin: '0 0 8px', color: '#cbd5e1' }}>
          Engagement (14 days)
        </h3>
        <div data-eid="chart-container">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={social.engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#64748b', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#1e1b4b', border: '1px solid #333', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: '#e8e8f0' }}
              />
              <Line type="monotone" dataKey="likes" stroke="#f472b6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="comments" stroke="#fbbf24" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="shares" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div data-eid="chart-legend" style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 11, marginTop: 6 }}>
          {[
            { label: 'Likes', color: '#f472b6' },
            { label: 'Comments', color: '#fbbf24' },
            { label: 'Shares', color: '#34d399' },
          ].map((item) => (
            <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 3, borderRadius: 2, background: item.color, display: 'inline-block' }} />
              <span style={{ color: '#94a3b8' }}>{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div data-eid="recent-posts">
        <h3 data-eid="recent-title" style={{ fontSize: 14, fontWeight: 600, margin: '0 0 10px', color: '#cbd5e1' }}>
          Recent Posts
        </h3>
        {social.recentPosts.map((post, i) => (
          <div
            key={i}
            data-eid={`post-${i}`}
            style={{
              padding: '10px 0',
              borderBottom: i < social.recentPosts.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span data-eid={`post-${i}-date`} style={{ fontSize: 11, color: '#64748b' }}>
                {post.date}
              </span>
              <span data-eid={`post-${i}-engagement`} style={{ fontSize: 11, color: '#f472b6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Heart size={10} /> {post.engagement}
              </span>
            </div>
            <span data-eid={`post-${i}-preview`} style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>
              {post.preview}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
