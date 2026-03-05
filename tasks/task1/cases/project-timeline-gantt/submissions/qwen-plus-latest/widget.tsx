import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Users, Calendar, CheckCircle, AlertTriangle, Circle } from 'lucide-react';
import data from './data.json';

const ProjectTimelineGantt = () => {
  const { project, timeline, milestones, team, summary } = data;

  // Calculate position for today marker (assuming today is Mar 10 based on visual)
  const getTodayPosition = () => {
    // Jan (31) + Feb (29 in 2026) + Mar 10 = 70 days from Jan 6
    // Total duration: Jan 6 to Apr 18 = 103 days
    return (70 / 103) * 100;
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div data-eid="header-left" style={{ display: 'flex', flexDirection: 'column' }}>
          <div data-eid="project-name" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.2' }}>
            {project.name}
          </div>
          <div data-eid="project-subtitle" style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
            {project.subtitle}
          </div>
        </div>
        <div data-eid="header-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div data-eid="progress-ring" style={{ position: 'relative', width: '80px', height: '80px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="50%" barSize={12} data={[{ value: project.progress }]}>
                <RadialBar background clockWise dataKey="value" cornerRadius={10} fill="#6366f1" />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <div>{project.progress}%</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Done</div>
            </div>
          </div>
          <div data-eid="date-range" style={{ fontSize: '14px', color: '#94a3b8', textAlign: 'right' }}>
            {project.dateRange}
          </div>
        </div>
      </header>

      {/* Legend Row */}
      <div data-eid="legend-row" style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <span data-eid="legend-design" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', backgroundColor: '#818cf8', color: '#0f172a', padding: '4px 10px', borderRadius: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#818cf8', borderRadius: '2px' }}></div>
          Design
        </span>
        <span data-eid="legend-dev" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', backgroundColor: '#3b82f6', color: '#0f172a', padding: '4px 10px', borderRadius: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
          Development
        </span>
        <span data-eid="legend-qa" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', backgroundColor: '#22c55e', color: '#0f172a', padding: '4px 10px', borderRadius: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '2px' }}></div>
          QA
        </span>
        <span data-eid="legend-launch" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', backgroundColor: '#f97316', color: '#0f172a', padding: '4px 10px', borderRadius: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#f97316', borderRadius: '2px' }}></div>
          Launch
        </span>
      </div>

      {/* Timeline Header */}
      <div data-eid="timeline-header" style={{ display: 'grid', gridTemplateColumns: '240px repeat(4, 1fr)', gap: '1px', marginBottom: '12px', backgroundColor: '#1e293b', borderRadius: '6px' }}>
        <span data-eid="timeline-col-task" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', backgroundColor: '#1e293b' }}>Task</span>
        <span data-eid="timeline-col-jan" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', backgroundColor: '#1e293b', textAlign: 'center' }}>Jan</span>
        <span data-eid="timeline-col-feb" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', backgroundColor: '#1e293b', textAlign: 'center' }}>Feb</span>
        <span data-eid="timeline-col-mar" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', backgroundColor: '#1e293b', textAlign: 'center' }}>Mar</span>
        <span data-eid="timeline-col-apr" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', backgroundColor: '#1e293b', textAlign: 'center' }}>Apr</span>
      </div>

      {/* Timeline Grid */}
      <div data-eid="timeline-grid" style={{ position: 'relative', marginBottom: '40px' }}>
        {/* Vertical grid lines */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '240px', width: '1px', backgroundColor: '#334155' }}></div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: '#334155' }}></div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '75%', width: '1px', backgroundColor: '#334155' }}></div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '100%', width: '1px', backgroundColor: '#334155' }}></div>

        {/* Today marker */}
        <div data-eid="today-marker" style={{ position: 'absolute', top: 0, bottom: 0, left: `${getTodayPosition()}%`, width: '2px', backgroundColor: '#3b82f6', zIndex: 10 }}>
          <span data-eid="today-label" style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', backgroundColor: '#3b82f6', color: '#0f172a', padding: '2px 8px', borderRadius: '4px' }}>
            Today
          </span>
        </div>

        {/* Tasks */}
        {timeline.tasks.map((task, index) => (
          <div 
            key={task.id} 
            data-eid={`task-${index}`} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '240px repeat(4, 1fr)', 
              gap: '1px', 
              backgroundColor: index % 2 === 0 ? '#1e293b' : '#1e293b',
              marginBottom: '1px',
              borderRadius: '4px'
            }}
          >
            {/* Task Name and Avatar */}
            <div style={{ 
              padding: '12px 16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              backgroundColor: index % 2 === 0 ? '#1e293b' : '#1e293b'
            }}>
              <span data-eid={`task-${index}-name`} style={{ fontWeight: '600', fontSize: '14px' }}>{task.name}</span>
              <span data-eid={`task-${index}-avatar`} style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: task.color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '10px', 
                fontWeight: '600',
                color: '#0f172a'
              }}>{task.assignee.initials}</span>
              <span data-eid={`task-${index}-dates`} style={{ fontSize: '12px', color: '#94a3b8' }}>{task.dates}</span>
            </div>

            {/* Gantt Bar */}
            <div style={{ 
              gridColumn: '2 / -1',
              padding: '12px 16px',
              backgroundColor: index % 2 === 0 ? '#1e293b' : '#1e293b',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div data-eid={`task-${index}-bar`} style={{
                position: 'relative',
                width: '100%',
                height: '24px',
                backgroundColor: '#334155',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div 
                  data-eid={`task-${index}-bar-fill`} 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${task.progress}%`,
                    backgroundColor: task.color,
                    borderRadius: '4px'
                  }}
                ></div>
              </div>
            </div>

            {/* Status Badge */}
            <div style={{ 
              gridColumn: '1 / -1',
              padding: '12px 16px',
              backgroundColor: index % 2 === 0 ? '#1e293b' : '#1e293b',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <span data-eid={`task-${index}-status`} style={{
                fontSize: '12px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: task.statusColor,
                color: task.statusTextColor
              }}>
                {task.status}
              </span>
            </div>
          </div>
        ))}

        {/* Milestones */}
        {milestones.map((milestone, index) => (
          <div 
            key={milestone.id} 
            data-eid={`milestone-${index}`} 
            style={{ 
              position: 'absolute',
              top: `${100 + index * 40}px`,
              left: `${milestone.position}%`,
              transform: 'translate(-50%, -50%)',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '12px solid #f97316',
              zIndex: 5
            }}
          >
            <span data-eid={`milestone-${index}-label`} style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              backgroundColor: '#1e293b',
              padding: '2px 8px',
              borderRadius: '4px',
              whiteSpace: 'nowrap'
            }}>{milestone.label}</span>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div data-eid="team-section" style={{ marginBottom: '32px' }}>
        <div data-eid="team-title" style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={16} />
          Team
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {team.members.map((member, index) => (
            <div 
              key={member.id} 
              data-eid={`team-member-${index}`} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                minWidth: '200px'
              }}
            >
              <span data-eid={`team-member-${index}-avatar`} style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: member.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: '#0f172a'
              }}>{member.initials}</span>
              <div>
                <span data-eid={`team-member-${index}-name`} style={{ fontSize: '14px', fontWeight: '600' }}>{member.name}</span>
                <div data-eid={`team-member-${index}-role`} style={{ fontSize: '12px', color: '#94a3b8' }}>{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Row */}
      <div data-eid="summary-row" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', backgroundColor: '#1e293b', padding: '12px 16px', borderRadius: '8px' }}>
        <div data-eid="summary-total" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600' }}>
          <Calendar size={14} />
          {summary.total}
        </div>
        <div data-eid="summary-completed" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600', color: '#22c55e' }}>
          <CheckCircle size={14} />
          {summary.completed}
        </div>
        <div data-eid="summary-in-progress" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>
          <AlertTriangle size={14} />
          {summary.inProgress}
        </div>
        <div data-eid="summary-on-track" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600', color: '#22c55e' }}>
          <Circle size={14} />
          {summary.onTrack}
        </div>
      </div>
    </section>
  );
};

export default ProjectTimelineGantt;