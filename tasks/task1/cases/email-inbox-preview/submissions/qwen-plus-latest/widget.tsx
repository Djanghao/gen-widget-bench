import React from 'react';
import { Search, Star, Mail, Users, Bell } from 'lucide-react';
import data from './data.json';

const EmailInboxPreview = () => {
  const { 
    inboxTitle, 
    unreadCount, 
    tabs, 
    emails 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '16px',
        padding: '24px',
        width: '400px',
        height: '680px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#e6e6e6',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div data-eid="inbox-title" style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff' }}>
          {inboxTitle}
        </div>
        <span data-eid="unread-badge" style={{
          backgroundColor: '#4cc9f0',
          color: '#0d1b2a',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {unreadCount}
        </span>
        <span data-eid="search-icon" style={{ cursor: 'pointer' }}>
          <Search size={20} color="#a9d6e5" />
        </span>
      </header>

      {/* Tabs Row */}
      <div data-eid="tabs-row" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <span 
          data-eid="tab-primary" 
          style={{
            backgroundColor: '#4cc9f0',
            color: '#0d1b2a',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {tabs.primary.label} <span style={{ marginLeft: '4px', fontWeight: 'bold' }}>({tabs.primary.count})</span>
        </span>
        <span 
          data-eid="tab-social" 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#a9d6e5',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          {tabs.social.label} <span style={{ marginLeft: '4px', fontWeight: 'bold' }}>({tabs.social.count})</span>
        </span>
        <span 
          data-eid="tab-updates" 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#a9d6e5',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          {tabs.updates.label} <span style={{ marginLeft: '4px', fontWeight: 'bold' }}>({tabs.updates.count})</span>
        </span>
      </div>

      {/* Email List */}
      <div data-eid="email-list" style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
        {emails.map((email, index) => {
          const eid = `email-${index}`;
          const isUnread = email.status === 'unread';
          
          return (
            <div 
              key={eid}
              data-eid={eid}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < emails.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                cursor: 'pointer',
                opacity: isUnread ? 1 : 0.7
              }}
            >
              {/* Avatar */}
              <div 
                data-eid={`${eid}-avatar`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isUnread ? '#4cc9f0' : '#415a77',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isUnread ? '#0d1b2a' : '#e6e6e6'
                }}
              >
                {email.senderInitial}
              </div>
              
              {/* Email Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div data-eid={`${eid}-sender`} style={{ 
                  fontSize: '14px', 
                  fontWeight: isUnread ? '600' : '500',
                  marginBottom: '4px',
                  color: isUnread ? '#ffffff' : '#a9d6e5'
                }}>
                  {email.sender}
                </div>
                <div data-eid={`${eid}-subject`} style={{ 
                  fontSize: '14px', 
                  fontWeight: isUnread ? '600' : '400',
                  color: isUnread ? '#e6e6e6' : '#a9d6e5',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '4px'
                }}>
                  {email.subject}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span data-eid={`${eid}-time`} style={{ 
                    fontSize: '12px', 
                    color: '#a9d6e5',
                    fontWeight: '400'
                  }}>
                    {email.time}
                  </span>
                  {email.starred && (
                    <span data-eid={`${eid}-star`} style={{ display: 'flex' }}>
                      <Star size={14} fill="#ffd166" color="#ffd166" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EmailInboxPreview;