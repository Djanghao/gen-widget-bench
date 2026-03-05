import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Lightning, Fire, BookOpen, Target, NotebookText, Clock } from 'lucide-react';
import data from './data.json';

const iconMap: { [key: string]: React.ElementType } = {
  Lightning: Lightning,
  Fire: Fire,
  BookOpen: BookOpen,
  Target: Target,
  NotebookText: NotebookText,
  Clock: Clock
};

const LanguageLearningProgressWidget: React.FC = () => {
  const progressData = [{
    name: 'progress',
    value: data.overallProgress,
    fill: '#8880d8' // Purple color for the progress ring
  }];

  return (
    <section
      data-eid="root"
      style={{
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: 'rgb(24, 21, 41)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '380px',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      <div
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <h2 data-eid="language-name" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: 'white' }}>
          {data.language.name}
        </h2>
        <span data-eid="flag-emoji" style={{ fontSize: '1.5rem' }}>
          {data.language.flag}
        </span>
        <span
          data-eid="level-badge"
          style={{
            marginLeft: 'auto',
            backgroundColor: '#8880d8',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'white'
          }}
        >
          {data.language.level}
        </span>
      </div>

      <div
        data-eid="progress-ring"
        style={{
          position: 'relative',
          width: '100%',
          height: '160px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            barSize={16}
            data={progressData}
            startAngle={90}
            endAngle={90 + (360 * data.overallProgress / 100)}
          >
            <RadialBar
              minAngle={15}
              background={{ fill: 'rgba(255,255,255,0.1)' }}
              clockWise
              dataKey="value"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <span
          data-eid="progress-percent"
          style={{
            position: 'absolute',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'white'
          }}
        >
          {data.overallProgress}%
        </span>
      </div>

      <div data-eid="skills-section" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 data-eid="skills-title" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>
          Skill Breakdown
        </h3>
        {data.skills.map((skill, index) => (
          <div
            key={skill.name}
            data-eid={`skill-${skill.name.toLowerCase()}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'rgba(255,255,255,0.7)'
            }}
          >
            <span style={{ minWidth: '80px' }}>{skill.name}</span>
            <div
              style={{
                flexGrow: 1,
                height: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div
                data-eid={`skill-${skill.name.toLowerCase()}-bar`}
                style={{
                  width: `${skill.progress}%`,
                  height: '100%',
                  backgroundColor: skill.color,
                  borderRadius: '4px'
                }}
              ></div>
            </div>
            <span data-eid={`skill-${skill.name.toLowerCase()}-level`} style={{ minWidth: '30px', textAlign: 'right', fontWeight: 500 }}>
              {skill.level}
            </span>
          </div>
        ))}
      </div>

      <div
        data-eid="today-stats"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginTop: '16px'
        }}
      >
        {data.todayStats.map((stat, index) => {
          const IconComponent = iconMap[stat.icon];
          return (
            <div
              key={stat.label}
              data-eid={`stat-${stat.label.toLowerCase().replace('%', '')}`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'center'
              }}
            >
              {IconComponent && <IconComponent size={24} style={{ color: stat.color }} />}
              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: stat.color }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      <div data-eid="lessons-section" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
        <h3 data-eid="lessons-title" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>
          Upcoming Lessons
        </h3>
        {data.upcomingLessons.map((lesson, index) => {
          const IconComponent = iconMap[lesson.icon];
          return (
            <div
              key={index}
              data-eid={`lesson-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: '12px 16px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.95rem'
              }}
            >
              {IconComponent && <IconComponent data-eid={`lesson-${index}-icon`} size={20} style={{ color: 'rgba(255,255,255,0.7)' }} />}
              <span style={{ flexGrow: 1 }}>{lesson.title}</span>
              {lesson.time && (
                <span data-eid={`lesson-${index}-time`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  <Clock size={16} />
                  {lesson.time}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LanguageLearningProgressWidget;