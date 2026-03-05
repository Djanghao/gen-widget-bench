import React from 'react';
import data from './data.json';
import { Search, Mail, Star } from 'lucide-react';

const Widget = () => (
  <section
    data-eid="root"
    style={{
      background: 'linear-gradient(145deg, #1a2a3a, #151f2d)',
      borderRadius: '18px',
      color: '#fff',
      width: '380px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    <header
      data-eid="header"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}
    >
      <div data-eid="inbox-title" style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
        <Mail size={24} style={{ marginRight: '10px' }} />
        Inbox
      </div>
      <span
        data-eid="unread-badge"
        style={{
          backgroundColor: '#3b82f6',
          color: '#fff',
          fontSize: '14px',
          borderRadius: '999px',
          padding: '5px 10px',
        }}
      >
        3
      </span>
      <span data-eid="search-icon">
        <Search size={24} color="#fff" />
      </span>
    </header>
    <div data-eid="tabs-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <span
        data-eid="tab-primary"
        style={{
          backgroundColor: '#3b82f6',
          color: '#fff',
          borderRadius: '12px',
          padding: '5px 12px',
          fontSize: '14px',
        }}
      >
        Primary 12
      </span>
      <span
        data-eid="tab-social"
        style={{
          color: '#94a3b8',
          padding: '5px 12px',
          fontSize: '14px',
        }}
      >
        Social 5
      </span>
      <span
        data-eid="tab-updates"
        style={{
          color: '#94a3b8',
          padding: '5px 12px',
          fontSize: '14px',
        }}
      >
        Updates 8
      </span>
    </div>
    <div data-eid="email-list">
      {data.emails.map((email, index) => (
        <div
          key={index}
          data-eid={`email-${index}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #3b82f6',
            color: email.read ? '#94a3b8' : '#f8fafc',
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              data-eid={`email-${index}-avatar`}
              style={{
                backgroundColor: email.avatarColor,
                color: '#fff',
                fontSize: '16px',
                borderRadius: '999px',
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
              }}
            >
              {email.initial}
            </div>
            <div>
              <div data-eid={`email-${index}-sender`} style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {email.sender}
              </div>
              <div data-eid={`email-${index}-subject`} style={{ fontSize: '12px', color: email.read ? '#babec9' : '#f8fafc' }}>
                {email.subject}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span data-eid={`email-${index}-time`} style={{ fontSize: '11px', display: 'block', color: email.read ? '#babec9' : '#f8fafc' }}>
              {email.time}
            </span>
            {email.starred && (
              <span data-eid={`email-${index}-star`}>
                <Star size={16} color="#fbbf24" />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Widget;