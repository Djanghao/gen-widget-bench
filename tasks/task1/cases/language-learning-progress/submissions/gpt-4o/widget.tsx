import React from 'react';
import { RadialBarChart, RadialBar } from 'recharts';
import data from './data.json';

const Widget = () => {
  const radialBarData = [{ name: 'Progress', value: data.progressPercent, fill: '#9A6AFF' }];
  
  return (
    <section data-eid="root" style={{ backgroundColor: '#182346', borderRadius: '8px', padding: '20px', color: '#fff', width: '300px' }}>
      <div data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span data-eid="flag-emoji" style={{ fontSize: '24px', marginRight: '8px' }}>🇯🇵</span>
          <h2 data-eid="language-name" style={{ margin: 0, fontSize: '20px' }}>Japanese</h2>
        </div>
        <span data-eid="level-badge" style={{ backgroundColor: '#563E83', borderRadius: '12px', padding: '4px 8px', fontSize: '12px' }}>N3 Intermediate</span>
      </div>

      <div data-eid="progress-ring" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <RadialBarChart width={100} height={100} innerRadius="80%" outerRadius="100%" data={radialBarData} startAngle={90} endAngle={-270}>
          <RadialBar minAngle={15} background clockWise={true} dataKey="value" />
          <text data-eid="progress-percent" x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{ fill: '#fff', fontSize: '22px' }}>
            {data.progressPercent}%
          </text>
        </RadialBarChart>
      </div>

      <div data-eid="skills-section">
        <h3 data-eid="skills-title" style={{ fontSize: '16px', margin: '15px 0' }}>Skill Breakdown</h3>

        {data.skills.map(skill => (
          <div key={skill.name} data-eid={`skill-${skill.name.toLowerCase()}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px' }}>{skill.name}</span>
            <div style={{ flexGrow: 1, height: '6px', backgroundColor: '#252A41', margin: '0 10px', borderRadius: '3px', overflow: 'hidden' }}>
              <div data-eid={`skill-${skill.name.toLowerCase()}-bar`} style={{ width: `${skill.levelPercent}%`, background: skill.color, height: '100%' }}></div>
            </div>
            <span data-eid={`skill-${skill.name.toLowerCase()}-level`} style={{ fontSize: '14px', color: skill.color }}>{skill.level}</span>
          </div>
        ))}
      </div>

      <div data-eid="today-stats" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {data.stats.map(stat => (
          <div key={stat.label} data-eid={`stat-${stat.key}`} style={{ textAlign: 'center', flex: 1 }}>
            <span style={{ display: 'block', fontSize: '22px', marginBottom: '4px', color: stat.color }}>{stat.value}</span>
            <span style={{ fontSize: '12px', color: '#aaa' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div data-eid="lessons-section" style={{ marginTop: '20px' }}>
        <h3 data-eid="lessons-title" style={{ fontSize: '16px', margin: '15px 0' }}>Upcoming Lessons</h3>
        {data.lessons.map((lesson, index) => (
          <div key={lesson.title} data-eid={`lesson-${index}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: index < data.lessons.length - 1 ? '1px solid #252A41' : 'none' }}>
            <span data-eid={`lesson-${index}-icon`} style={{ fontSize: '18px', color: lesson.color, marginRight: '10px' }}>📖</span>
            <span style={{ flex: 1 }}>{lesson.title}</span>
            <span data-eid={`lesson-${index}-time`} style={{ fontSize: '12px', color: '#aaa' }}>{lesson.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Widget;