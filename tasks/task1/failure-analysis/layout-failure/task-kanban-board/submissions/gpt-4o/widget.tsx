import React from 'react';
import data from './data.json';

const Widget = () => {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(to bottom, #1f1f2e, #29293b)',
        borderRadius: '8px',
        padding: '16px',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <div data-eid="sprint-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {data.sprintName}
        </div>
        <span data-eid="progress-pct" style={{ fontSize: '14px' }}>
          {data.progressPct}%
        </span>
      </header>
      <div
        data-eid="progress-bar"
        style={{ height: '6px', background: '#42425a', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}
      >
        <div data-eid="progress-fill" style={{ width: `${data.progressPct}%`, background: '#aa6fd9', height: '100%' }}></div>
      </div>
      <div data-eid="summary-row" style={{ marginBottom: '16px', fontSize: '14px' }}>
        <span data-eid="total-tasks">{data.totalTasks} tasks</span>
      </div>
      <div
        data-eid="columns-grid"
        style={{ display: 'flex', gap: '16px' }}
      >
        {data.columns.map((col, colIndex) => (
          <div
            key={colIndex}
            data-eid={`col-${col.id}`}
            style={{
              flex: 1,
              borderTop: `4px solid ${col.borderColor}`,
              padding: '8px',
              borderRadius: '4px',
              background: '#2a2a3b',
            }}
          >
            <div
              data-eid={`${col.id}-header`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {col.name}
              <span
                data-eid={`${col.id}-count`}
                style={{
                  background: col.countBadgeColor,
                  borderRadius: '12px',
                  padding: '2px 8px',
                  fontSize: '12px',
                }}
              >
                {col.count}
              </span>
            </div>
            {col.tasks.map((task, taskIndex) => (
              <div
                key={taskIndex}
                data-eid={`task-${task.id}`}
                style={{
                  background: '#353547',
                  borderRadius: '4px',
                  padding: '8px',
                  marginBottom: '8px',
                }}
              >
                <div data-eid={`task-${task.id}-title`} style={{ marginBottom: '4px', fontWeight: 'bold', fontSize: '14px' }}>
                  {task.title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {task.priority && (
                    <span
                      data-eid={`task-${task.id}-priority`}
                      style={{
                        background: task.priority.color,
                        borderRadius: '8px',
                        padding: '2px 6px',
                        fontSize: '12px',
                        marginRight: '8px',
                      }}
                    >
                      {task.priority.label}
                    </span>
                  )}
                  <span style={{ fontSize: '12px', color: '#aaa' }}>{task.date}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;