import React from 'react';
import data from './data.json';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Heart } from 'lucide-react';

const Widget = () => {
  return (
    <section
      data-eid="root"
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
        backgroundColor: '#202040',
        color: '#ffffff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <div
        data-eid="profile-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          data-eid="profile-avatar"
          style={{
            backgroundColor: '#6246ea',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          TC
        </div>
        <div>
          <h2
            data-eid="profile-name"
            style={{
              margin: '0',
              fontSize: '18px',
            }}
          >
            @techcreator
          </h2>
          <div>
            <span data-eid="followers-count" style={{ marginRight: '10px' }}>
              142.8K followers
            </span>
            <span data-eid="following-count">892 following</span>
          </div>
        </div>
        <span
          data-eid="growth-badge"
          style={{
            marginLeft: 'auto',
            backgroundColor: '#2c7a7b',
            borderRadius: '12px',
            padding: '4px 8px',
            fontSize: '12px',
          }}
        >
          &#x2B06;+2.4K this month
        </span>
      </div>

      <div
        data-eid="stats-grid"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '20px',
        }}
      >
        <div
          data-eid="stat-posts"
          style={{
            textAlign: 'center',
          }}
        >
          <span
            data-eid="stat-posts-value"
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            1,247
          </span>
          <span>POSTS</span>
        </div>
        <div
          data-eid="stat-likes"
          style={{
            textAlign: 'center',
          }}
        >
          <span
            data-eid="stat-likes-value"
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            89.3K
          </span>
          <span>LIKES</span>
        </div>
        <div
          data-eid="stat-comments"
          style={{
            textAlign: 'center',
          }}
        >
          <span
            data-eid="stat-comments-value"
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            12.4K
          </span>
          <span>COMMENTS</span>
        </div>
        <div
          data-eid="stat-shares"
          style={{
            textAlign: 'center',
          }}
        >
          <span
            data-eid="stat-shares-value"
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            5.7K
          </span>
          <span>SHARES</span>
        </div>
      </div>

      <div data-eid="chart-section" style={{ marginBottom: '20px' }}>
        <h3
          data-eid="chart-title"
          style={{
            margin: '0 0 10px 0',
            fontSize: '16px',
            fontWeight: 'normal',
          }}
        >
          Engagement (14 days)
        </h3>
        <div data-eid="chart-container" style={{ height: '200px', marginBottom: '10px' }}>
          <ResponsiveContainer>
            <LineChart data={data.chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="likes" stroke="#ff6347" strokeWidth={2} />
              <Line type="monotone" dataKey="comments" stroke="#ffd700" strokeWidth={2} />
              <Line type="monotone" dataKey="shares" stroke="#32cd32" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          data-eid="chart-legend"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            fontSize: '12px',
          }}
        >
          <span style={{ color: '#ff6347' }}>Likes</span>
          <span style={{ color: '#ffd700' }}>Comments</span>
          <span style={{ color: '#32cd32' }}>Shares</span>
        </div>
      </div>

      <div data-eid="recent-posts">
        <h3
          data-eid="recent-title"
          style={{
            margin: '0 0 10px 0',
            fontSize: '16px',
            fontWeight: 'normal',
          }}
        >
          Recent Posts
        </h3>
        {data.recentPosts.map((post, index) => (
          <div
            key={index}
            data-eid={`post-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: index < data.recentPosts.length - 1 ? '1px solid #333' : 'none',
            }}
          >
            <span data-eid={`post-${index}-date`} style={{ marginRight: '10px', fontSize: '14px' }}>
              {post.date}
            </span>
            <div style={{ flexGrow: 1 }}>
              <span data-eid={`post-${index}-preview`} style={{ fontSize: '14px' }}>
                {post.preview}
              </span>
            </div>
            <span data-eid={`post-${index}-engagement`} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
              <Heart size={16} style={{ marginRight: '4px', color: '#c53030' }} />
              {post.engagement}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;