import React from 'react';
import { Mail, Search, Star } from 'lucide-react';
import data from './data.json';

const Widget: React.FC = () => {
  const avatarColors: { [key: string]: string } = {
    A: '#5C6BC0', // Blue
    M: '#EC407A', // Pink
    D: '#FFA726', // Orange
    J: '#66BB6A', // Green
    P: '#AB47BC', // Purple
    G: '#90A4AE', // Grey-blue
  };

  return (
    <section
      data-eid="root"
      style={{
        width: '360px',
        padding: '24px',
        borderRadius: '16px',
        background: 'linear-gradient(180deg, #2D2747 0%, #1C182B 100%)',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#E6E6E6',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          <Mail size={24} color="#E6E6E6" />
          <div data-eid="inbox-title">{data.header.title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            data-eid="unread-badge"
            style={{
              background: '#7C3AED',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {data.header.unreadCount}
          </span>
          <span data-eid="search-icon" style={{ cursor: 'pointer' }}>
            <Search size={20} color="#E6E6E6" />
          </span>
        </div>
      </header>

      <div
        data-eid="tabs-row"
        style={{
          display: 'flex',
          gap: '12px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#9F9BAF',
        }}
      >
        {data.tabs.map((tab, index) => (
          <span
            key={index}
            data-eid={`tab-${tab.name.toLowerCase()}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '8px',
              background: tab.active ? '#363050' : 'transparent',
              color: tab.active ? '#FFFFFF' : '#9F9BAF',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {tab.name}
            <span
              style={{
                background: tab.active ? '#7C3AED' : '#5C527F',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              {tab.count}
            </span>
          </span>
        ))}
      </div>

      <div data-eid="email-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.emails.map((email, index) => (
          <div
            key={index}
            data-eid={`email-${index}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gridTemplateRows: 'auto auto auto',
              gridTemplateAreas: `'avatar content-header time' 'avatar subject starred' 'avatar preview starred'`,
              alignItems: 'center',
              padding: '12px 16px',
              borderRadius: '12px',
              background: email.unread ? '#27223D' : 'transparent',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              gap: '0px 16px',
            }}
          >
            {email.unread && (
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: avatarColors[email.avatarInitial],
                }}
              />
            )}
            <div
              data-eid={`email-${index}-avatar`}
              style={{
                gridArea: 'avatar',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: avatarColors[email.avatarInitial],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {email.avatarInitial}
            </div>
            <div
              style={{
                gridArea: 'content-header',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                data-eid={`email-${index}-sender`}
                style={{
                  fontSize: '15px',
                  fontWeight: email.unread ? 600 : 500,
                  color: email.unread ? '#E6E6E6' : '#D9D7E0',
                }}
              >
                {email.sender}
              </div>
            </div>
            <span
              data-eid={`email-${index}-time`}
              style={{
                gridArea: 'time',
                fontSize: '13px',
                color: '#A09CA8',
                justifySelf: 'flex-end',
              }}
            >
              {email.time}
            </span>
            <div
              data-eid={`email-${index}-subject`}
              style={{
                gridArea: 'subject',
                fontSize: '14px',
                fontWeight: email.unread ? 600 : 500,
                color: email.unread ? '#D9D7E0' : '#A09CA8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {email.subject}
            </div>
            <div
              style={{
                gridArea: 'preview',
                fontSize: '13px',
                color: '#A09CA8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {email.preview}
            </div>
            <span
              data-eid={`email-${index}-star`}
              style={{
                gridArea: 'starred',
                justifySelf: 'flex-end',
                cursor: 'pointer',
              }}
            >
              {email.starred ? (
                <Star size={18} color="#FADB14" fill="#FADB14" />
              ) : (
                <Star size={18} color="#A09CA8" />
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;