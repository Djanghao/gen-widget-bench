import { Search, Star, Mail } from 'lucide-react'
import data from './data.json'

type EmailData = {
  tabs: Array<{ name: string; count: number; active: boolean }>
  unreadCount: number
  emails: Array<{
    sender: string
    initial: string
    avatarColor: string
    subject: string
    preview: string
    time: string
    unread: boolean
    starred: boolean
  }>
}

const inbox = data as EmailData

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(155deg, #111827 0%, #1f1535 50%, #111827 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 0,
        maxWidth: 460,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 16px 10px',
        }}
      >
        <Mail size={20} color="#818cf8" />
        <div data-eid="inbox-title" style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>
          Inbox
        </div>
        <span
          data-eid="unread-badge"
          style={{
            background: '#6366f1',
            borderRadius: 10,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            minWidth: 20,
            padding: '2px 7px',
            textAlign: 'center',
          }}
        >
          {inbox.unreadCount}
        </span>
        <span data-eid="search-icon" style={{ cursor: 'pointer', display: 'inline-flex', padding: 4 }}>
          <Search size={18} color="#94a3b8" />
        </span>
      </header>

      {/* Tabs */}
      <div
        data-eid="tabs-row"
        style={{
          display: 'flex',
          gap: 4,
          padding: '0 16px 10px',
        }}
      >
        {inbox.tabs.map((tab) => (
          <span
            key={tab.name}
            data-eid={`tab-${tab.name.toLowerCase()}`}
            style={{
              background: tab.active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
              border: tab.active ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 8,
              color: tab.active ? '#a5b4fc' : '#64748b',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              fontWeight: 500,
              padding: '5px 10px',
            }}
          >
            {tab.name}
            <span
              style={{
                background: tab.active ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.08)',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 600,
                padding: '1px 5px',
              }}
            >
              {tab.count}
            </span>
          </span>
        ))}
      </div>

      {/* Email List */}
      <div data-eid="email-list" style={{ display: 'grid', gap: 0 }}>
        {inbox.emails.map((email, i) => (
          <div
            key={i}
            data-eid={`email-${i}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr auto',
              gap: 10,
              padding: '10px 16px',
              alignItems: 'start',
              background: email.unread ? 'rgba(99,102,241,0.04)' : 'transparent',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {/* Unread dot */}
            {email.unread && (
              <div
                style={{
                  position: 'absolute',
                  left: 6,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#6366f1',
                }}
              />
            )}

            {/* Avatar */}
            <div
              data-eid={`email-${i}-avatar`}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: email.avatarColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {email.initial}
            </div>

            {/* Content */}
            <div style={{ minWidth: 0, display: 'grid', gap: 2 }}>
              <div
                data-eid={`email-${i}-sender`}
                style={{
                  fontSize: 13,
                  fontWeight: email.unread ? 700 : 500,
                  color: email.unread ? '#e2e8f0' : '#94a3b8',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {email.sender}
              </div>
              <div
                data-eid={`email-${i}-subject`}
                style={{
                  fontSize: 12,
                  fontWeight: email.unread ? 600 : 400,
                  color: email.unread ? '#cbd5e1' : '#78818e',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {email.subject}
              </div>
              {email.preview && (
                <div
                  data-eid={`email-${i}-preview`}
                  style={{
                    fontSize: 11,
                    color: '#64748b',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {email.preview}
                </div>
              )}
            </div>

            {/* Time + Star */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
              <span
                data-eid={`email-${i}-time`}
                style={{
                  fontSize: 10,
                  color: email.unread ? '#818cf8' : '#64748b',
                  whiteSpace: 'nowrap',
                }}
              >
                {email.time}
              </span>
              <span
                data-eid={`email-${i}-star`}
                style={{ cursor: 'pointer', display: 'inline-flex' }}
              >
                <Star
                  size={14}
                  color={email.starred ? '#fbbf24' : '#475569'}
                  fill={email.starred ? '#fbbf24' : 'none'}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
