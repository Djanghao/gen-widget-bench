import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Heart, MessageCircle, Share2, Calendar, Clock } from 'lucide-react';
import data from './data.json';

const SocialMediaAnalyticsWidget = () => {
  const { profile, stats, chartData, recentPosts } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        width: '800px',
        margin: '0 auto'
      }}
    >
      {/* Profile Header */}
      <div data-eid="profile-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
        <div 
          data-eid="profile-avatar" 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          TC
        </div>
        <div style={{ flex: 1 }}>
          <h2 data-eid="profile-name" style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>
            @techcreator
          </h2>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#AAAAAA' }}>
            <span data-eid="followers-count">{profile.followers}</span>
            <span data-eid="following-count">{profile.following}</span>
          </div>
        </div>
        <span data-eid="growth-badge" style={{ 
          backgroundColor: '#2D7D46', 
          color: 'white', 
          padding: '6px 12px', 
          borderRadius: '20px', 
          fontSize: '14px',
          fontWeight: '600'
        }}>
          +{profile.growth}
        </span>
      </div>

      {/* Stats Grid */}
      <div data-eid="stats-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div data-eid="stat-posts" style={{ 
          backgroundColor: '#1E1E1E', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#AAAAAA', marginBottom: '4px' }}>Posts</div>
          <span data-eid="stat-posts-value" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.posts}</span>
        </div>
        
        <div data-eid="stat-likes" style={{ 
          backgroundColor: '#1E1E1E', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#AAAAAA', marginBottom: '4px' }}>Likes</div>
          <span data-eid="stat-likes-value" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.likes}</span>
        </div>
        
        <div data-eid="stat-comments" style={{ 
          backgroundColor: '#1E1E1E', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#AAAAAA', marginBottom: '4px' }}>Comments</div>
          <span data-eid="stat-comments-value" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.comments}</span>
        </div>
        
        <div data-eid="stat-shares" style={{ 
          backgroundColor: '#1E1E1E', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#AAAAAA', marginBottom: '4px' }}>Shares</div>
          <span data-eid="stat-shares-value" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.shares}</span>
        </div>
      </div>

      {/* Chart Section */}
      <div data-eid="chart-section" style={{ marginBottom: '32px' }}>
        <h3 data-eid="chart-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          Engagement (14 days)
        </h3>
        <div data-eid="chart-container" style={{ height: '300px', marginBottom: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="date" 
                stroke="#AAAAAA" 
                fontSize={12} 
                tick={{ dy: 6 }} 
              />
              <YAxis 
                stroke="#AAAAAA" 
                fontSize={12} 
                tick={{ dx: -6 }} 
                domain={['dataMin - 1000', 'dataMax + 1000']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  borderColor: '#333', 
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }} 
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="likes" 
                name="Likes" 
                stroke="#3B82F6" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#3B82F6' }} 
                activeDot={{ r: 6, fill: '#3B82F6' }} 
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                name="Comments" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#10B981' }} 
                activeDot={{ r: 6, fill: '#10B981' }} 
              />
              <Line 
                type="monotone" 
                dataKey="shares" 
                name="Shares" 
                stroke="#8B5CF6" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#8B5CF6' }} 
                activeDot={{ r: 6, fill: '#8B5CF6' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div data-eid="chart-legend" style={{ 
          display: 'flex', 
          gap: '24px', 
          fontSize: '14px',
          color: '#AAAAAA'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#3B82F6', borderRadius: '2px' }}></div>
            <span>Likes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981', borderRadius: '2px' }}></div>
            <span>Comments</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#8B5CF6', borderRadius: '2px' }}></div>
            <span>Shares</span>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div data-eid="recent-posts">
        <h3 data-eid="recent-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          Recent Posts
        </h3>
        
        {recentPosts.map((post, index) => {
          const eidPrefix = `post-${index}`;
          return (
            <div 
              key={index} 
              data-eid={eidPrefix} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '12px 0', 
                borderBottom: index < recentPosts.length - 1 ? '1px solid #333' : 'none'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '8px', 
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Calendar size={16} color="#AAAAAA" />
                </div>
                <div>
                  <span data-eid={`${eidPrefix}-date`} style={{ 
                    fontSize: '14px', 
                    color: '#AAAAAA',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    {post.date}
                  </span>
                  <span data-eid={`${eidPrefix}-preview`} style={{ 
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {post.preview}
                  </span>
                </div>
              </div>
              <span data-eid={`${eidPrefix}-engagement`} style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: '#3B82F6'
              }}>
                {post.engagement}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SocialMediaAnalyticsWidget;