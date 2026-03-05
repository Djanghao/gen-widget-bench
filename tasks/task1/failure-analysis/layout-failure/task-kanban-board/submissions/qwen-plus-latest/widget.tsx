import React from 'react';
import data from './data.json';

const KanbanBoard = () => {
  const { sprint, summary, columns } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a202c, #2d3748)',
        borderRadius: '12px',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#e2e8f0',
        width: '920px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px' }}>
        <div data-eid="sprint-name" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
          {sprint.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span data-eid="progress-pct" style={{ fontSize: '14px', fontWeight: '500', color: '#a0aec0' }}>
            {sprint.progress} complete
          </span>
          <div data-eid="progress-bar" style={{
            flex: 1,
            height: '8px',
            backgroundColor: '#4a5568',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div 
              data-eid="progress-fill" 
              style={{
                height: '100%',
                width: `${sprint.progressValue}%`,
                backgroundColor: '#4299e1',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      </header>

      {/* Summary Row */}
      <div data-eid="summary-row" style={{ 
        fontSize: '14px', 
        color: '#a0aec0', 
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span data-eid="total-tasks">{summary.totalTasks}</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ color: '#4299e1' }}>{columns.todo.count} To Do</span>
          <span style={{ color: '#ed8936' }}>{columns.inProgress.count} In Progress</span>
          <span style={{ color: '#38a169' }}>{columns.done.count} Done</span>
        </div>
      </div>

      {/* Columns Grid */}
      <div data-eid="columns-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px' 
      }}>
        {/* To Do Column */}
        <div data-eid="col-todo" style={{ 
          backgroundColor: '#2d3748', 
          borderRadius: '8px',
          borderTop: '4px solid #4299e1',
          overflow: 'hidden',
        }}>
          <div data-eid="col-todo-header" style={{ 
            padding: '16px 20px', 
            backgroundColor: '#2d3748',
            borderBottom: '1px solid #4a5568',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#e2e8f0' }}>To Do</span>
              <span data-eid="col-todo-count" style={{ 
                backgroundColor: '#4299e1', 
                color: 'white', 
                borderRadius: '12px', 
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {columns.todo.count}
              </span>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            {columns.todo.tasks.map((task, index) => (
              <div 
                key={`todo-${index}`} 
                data-eid={`task-${index}`} 
                style={{
                  backgroundColor: '#2d3748',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  marginBottom: '12px',
                  borderLeft: '4px solid #4299e1',
                }}
              >
                <div data-eid={`task-${index}-title`} style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  marginBottom: '6px',
                  color: '#e2e8f0'
                }}>
                  {task.title}
                </div>
                <span 
                  data-eid={`task-${index}-priority`} 
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: task.priority === 'High' ? '#e53e3e' : task.priority === 'Med' ? '#ed8936' : '#38a169',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div data-eid="col-inprogress" style={{ 
          backgroundColor: '#2d3748', 
          borderRadius: '8px',
          borderTop: '4px solid #ed8936',
          overflow: 'hidden',
        }}>
          <div data-eid="col-inprogress-header" style={{ 
            padding: '16px 20px', 
            backgroundColor: '#2d3748',
            borderBottom: '1px solid #4a5568',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#e2e8f0' }}>In Progress</span>
              <span data-eid="col-inprogress-count" style={{ 
                backgroundColor: '#ed8936', 
                color: 'white', 
                borderRadius: '12px', 
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {columns.inProgress.count}
              </span>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            {columns.inProgress.tasks.map((task, index) => (
              <div 
                key={`inprogress-${index}`} 
                data-eid={`task-${4 + index}`} 
                style={{
                  backgroundColor: '#2d3748',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  marginBottom: '12px',
                  borderLeft: '4px solid #ed8936',
                }}
              >
                <div data-eid={`task-${4 + index}-title`} style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  marginBottom: '6px',
                  color: '#e2e8f0'
                }}>
                  {task.title}
                </div>
                <span 
                  data-eid={`task-${4 + index}-priority`} 
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: task.priority === 'High' ? '#e53e3e' : task.priority === 'Med' ? '#ed8936' : '#38a169',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div data-eid="col-done" style={{ 
          backgroundColor: '#2d3748', 
          borderRadius: '8px',
          borderTop: '4px solid #38a169',
          overflow: 'hidden',
        }}>
          <div data-eid="col-done-header" style={{ 
            padding: '16px 20px', 
            backgroundColor: '#2d3748',
            borderBottom: '1px solid #4a5568',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#e2e8f0' }}>Done</span>
              <span data-eid="col-done-count" style={{ 
                backgroundColor: '#38a169', 
                color: 'white', 
                borderRadius: '12px', 
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {columns.done.count}
              </span>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            {columns.done.tasks.map((task, index) => (
              <div 
                key={`done-${index}`} 
                data-eid={`task-${7 + index}`} 
                style={{
                  backgroundColor: '#2d3748',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  marginBottom: '12px',
                  borderLeft: '4px solid #38a169',
                }}
              >
                <div data-eid={`task-${7 + index}-title`} style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  marginBottom: '6px',
                  color: '#e2e8f0'
                }}>
                  {task.title}
                </div>
                <span 
                  data-eid={`task-${7 + index}-priority`} 
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: task.priority === 'High' ? '#e53e3e' : task.priority === 'Med' ? '#ed8936' : '#38a169',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;