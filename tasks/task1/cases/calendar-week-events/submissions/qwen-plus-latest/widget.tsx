import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import data from './data.json';

const CalendarWeekEvents = () => {
  const { 
    monthTitle, 
    weekBadge, 
    timeLabels, 
    days, 
    events, 
    legend 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        borderRadius: '16px',
        padding: '24px',
        width: '920px',
        height: '720px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#e2e8f0',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <header 
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #4a5568'
        }}
      >
        <div 
          data-eid="month-title"
          style={{
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '1.2'
          }}
        >
          {monthTitle}
        </div>
        <span 
          data-eid="week-badge"
          style={{
            backgroundColor: '#4a5568',
            color: '#a0aec0',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          {weekBadge}
        </span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span 
            data-eid="nav-prev"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#4a5568',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d3748'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a5568'}
          >
            <ChevronLeft size={18} color="#a0aec0" />
          </span>
          <span 
            data-eid="nav-next"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#4a5568',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d3748'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a5568'}
          >
            <ChevronRight size={18} color="#a0aec0" />
          </span>
        </div>
      </header>

      {/* Main content grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '64px 1fr 1fr 1fr 1fr 1fr', 
        gap: '16px',
        flex: 1,
        position: 'relative'
      }}>
        {/* Time axis */}
        <div 
          data-eid="time-axis"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingTop: '8px'
          }}
        >
          {timeLabels.map((label, index) => (
            <span 
              key={index}
              data-eid={`time-${label.toLowerCase().replace(' ', '-')}`}
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#a0aec0',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Day columns */}
        {days.map((day, dayIndex) => (
          <div 
            key={dayIndex}
            data-eid={`day-col-${dayIndex}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: day.isCurrent ? '#6366f1' : '#a0aec0',
              textAlign: 'center',
              padding: '4px 8px',
              borderRadius: '8px',
              backgroundColor: day.isCurrent ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
            }}>
              {day.dayName}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#a0aec0',
              textAlign: 'center',
              marginBottom: '8px'
            }}>
              {day.date}
            </div>
            
            {/* Event slots for this day (8am-6pm in 30-min intervals) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flex: 1
            }}>
              {/* We'll render events in their appropriate time positions */}
              {timeLabels.map((_, timeIndex) => {
                const hour = parseInt(timeLabels[timeIndex].split(' ')[0]);
                const period = timeLabels[timeIndex].includes('AM') ? 'AM' : 'PM';
                
                // Find events that overlap with this time slot (30 min duration)
                const dayEvents = events.filter(event => 
                  event.day === dayIndex && 
                  ((event.startTime.includes('AM') && period === 'AM' && 
                    parseInt(event.startTime.split(':')[0]) === hour) ||
                   (event.startTime.includes('PM') && period === 'PM' && 
                    (hour === 12 ? parseInt(event.startTime.split(':')[0]) === 12 : 
                     parseInt(event.startTime.split(':')[0]) === (hour === 12 ? 12 : hour - 12))))
                );
                
                return (
                  <div 
                    key={`${dayIndex}-${timeIndex}`} 
                    style={{ 
                      height: '40px',
                      position: 'relative'
                    }}
                  >
                    {dayEvents.map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        data-eid={`event-${events.indexOf(event)}`}
                        style={{
                          position: 'absolute',
                          top: `${eventIndex * 16}px`,
                          left: '0',
                          right: '0',
                          backgroundColor: event.color,
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#ffffff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div 
        data-eid="legend"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #4a5568'
        }}
      >
        {legend.map((item, index) => (
          <span 
            key={index}
            data-eid={`legend-${item.category.toLowerCase()}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#a0aec0'
            }}
          >
            <span 
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: item.color
              }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default CalendarWeekEvents;