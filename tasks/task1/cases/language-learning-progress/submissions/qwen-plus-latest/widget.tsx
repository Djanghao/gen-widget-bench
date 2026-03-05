import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';
import { Flame, Trophy, BookOpen, Clock, Target, CheckCircle } from 'lucide-react';
import data from './data.json';

const LanguageLearningProgress = () => {
  const { 
    languageName, 
    flagEmoji, 
    levelBadge,
    overallProgress,
    skills,
    todayStats,
    lessons
  } = data;

  // Progress ring data for Recharts
  const progressData = [
    { name: 'Progress', value: overallProgress, fill: '#4F46E5' },
    { name: 'Remainder', value: 100 - overallProgress, fill: '#1E293B' }
  ];

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0F172A',
        color: '#F1F5F9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '16px',
        width: '360px',
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h2 data-eid="language-name" style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>
          {languageName}
        </h2>
        <span data-eid="flag-emoji" style={{ fontSize: '24px' }}>{flagEmoji}</span>
        <span data-eid="level-badge" style={{ 
          backgroundColor: '#1E293B', 
          color: '#94A3B8', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {levelBadge}
        </span>
      </div>

      {/* Progress Ring */}
      <div data-eid="progress-ring" style={{ 
        position: 'relative', 
        width: '200px', 
        height: '200px', 
        margin: '0 auto' 
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="60%" 
            outerRadius="80%" 
            barSize={16} 
            data={progressData}
          >
            <RadialBar 
              background 
              cornerRadius={10} 
              dataKey="value" 
              isAnimationActive={false}
            >
              {progressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
        <span 
          data-eid="progress-percent" 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            fontSize: '32px', 
            fontWeight: '700',
            color: '#F1F5F9'
          }}
        >
          {overallProgress}%
        </span>
      </div>

      {/* Skills Section */}
      <div data-eid="skills-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 data-eid="skills-title" style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#CBD5E1' }}>
          Skills
        </h3>
        
        {skills.map((skill, index) => (
          <div 
            key={skill.name} 
            data-eid={`skill-${skill.id}`} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{skill.name}</span>
              <span data-eid={`skill-${skill.id}-level`} style={{ 
                backgroundColor: '#1E293B', 
                color: '#94A3B8', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {skill.level}
              </span>
            </div>
            <div style={{ 
              height: '8px', 
              backgroundColor: '#1E293B', 
              borderRadius: '4px', 
              overflow: 'hidden' 
            }}>
              <div 
                data-eid={`skill-${skill.id}-bar`} 
                style={{ 
                  height: '100%', 
                  width: `${skill.progress}%`, 
                  backgroundColor: skill.color,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Today's Stats */}
      <div data-eid="today-stats" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px' 
      }}>
        <div data-eid="stat-xp" style={{ 
          backgroundColor: '#1E293B', 
          padding: '12px', 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{todayStats.xp}</div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>XP Earned</div>
        </div>
        <div data-eid="stat-streak" style={{ 
          backgroundColor: '#1E293B', 
          padding: '12px', 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
            <Flame size={16} color="#FBBF24" />
            <span style={{ fontSize: '24px', fontWeight: '700' }}>{todayStats.streak}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>Day Streak</div>
        </div>
        <div data-eid="stat-words" style={{ 
          backgroundColor: '#1E293B', 
          padding: '12px', 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{todayStats.words}</div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>Words Reviewed</div>
        </div>
        <div data-eid="stat-accuracy" style={{ 
          backgroundColor: '#1E293B', 
          padding: '12px', 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{todayStats.accuracy}</div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>Accuracy</div>
        </div>
      </div>

      {/* Lessons Section */}
      <div data-eid="lessons-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 data-eid="lessons-title" style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#CBD5E1' }}>
          Upcoming Lessons
        </h3>
        
        {lessons.map((lesson, index) => (
          <div 
            key={index} 
            data-eid={`lesson-${index}`} 
            style={{ 
              backgroundColor: '#1E293B', 
              padding: '12px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{ 
              backgroundColor: '#334155', 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {index === 0 && <BookOpen size={20} color="#94A3B8" />}
              {index === 1 && <Target size={20} color="#94A3B8" />}
              {index === 2 && <Trophy size={20} color="#94A3B8" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{lesson.title}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                <span data-eid={`lesson-${index}-time`}>{lesson.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LanguageLearningProgress;