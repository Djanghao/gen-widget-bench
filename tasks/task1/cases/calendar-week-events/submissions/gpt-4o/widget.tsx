import React from 'react';
import data from './data.json';

const CalendarWidget = () => {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(to bottom, #10122d, #1a2a6c)',
        borderRadius: '10px',
        width: '300px',
        padding: '20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div data-eid="month-title">March 2026</div>
        <span data-eid="week-badge" style={{ backgroundColor: '#5a4e9d', padding: '5px 10px', borderRadius: '5px' }}>
          W10
        </span>
        <span data-eid="nav-prev" style={{ cursor: 'pointer' }}>◄</span>
        <span data-eid="nav-next" style={{ cursor: 'pointer' }}>►</span>
      </header>
      <div style={{ display: 'flex' }}>
        <div
          data-eid="time-axis"
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '10px',
            fontSize: '12px',
          }}
        >
          <span data-eid="time-8am">8 AM</span>
          <span data-eid="time-9am">9 AM</span>
          <span data-eid="time-10am">10 AM</span>
          <span data-eid="time-11am">11 AM</span>
          <span data-eid="time-12pm">12 PM</span>
          <span data-eid="time-1pm">1 PM</span>
          <span data-eid="time-2pm">2 PM</span>
          <span data-eid="time-3pm">3 PM</span>
          <span data-eid="time-4pm">4 PM</span>
          <span data-eid="time-5pm">5 PM</span>
          <span data-eid="time-6pm">6 PM</span>
        </div>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <div data-eid="day-col-0" style={{ flexGrow: 1, borderRight: '1px solid #333' }}>Mon<br />2</div>
          <div data-eid="day-col-1" style={{ flexGrow: 1, borderRight: '1px solid #333' }}>Tue<br />3</div>
          <div data-eid="day-col-2" style={{ flexGrow: 1, borderRight: '1px solid #333', backgroundColor: '#444', borderRadius: '5px' }}>Wed<br />4</div>
          <div data-eid="day-col-3" style={{ flexGrow: 1, borderRight: '1px solid #333' }}>Thu<br />5</div>
          <div data-eid="day-col-4" style={{ flexGrow: 1 }}>Fri<br />6</div>
        </div>
      </div>
      <div style={{ position: 'relative', height: '440px', marginTop: '-430px', marginLeft: '40px'}}>
        {data.events.map(event => (
          <div
            key={event.id}
            data-eid={event.eid}
            style={{
              position: 'absolute',
              top: `${event.top}px`,
              height: `${event.height}px`,
              width: '34px',
              backgroundColor: event.bgColor,
              color: 'white',
              fontSize: '10px',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            {event.name}<br />{event.time}
          </div>
        ))}
      </div>
      <div data-eid="legend" style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <span data-eid="legend-work" style={{marginRight: '15px'}}>
          <span style={{width: '10px', height: '10px', backgroundColor: '#4180f7', display: 'inline-block', borderRadius: '50%', marginRight: '5px'}}></span>
          Work
        </span>
        <span data-eid="legend-personal" style={{marginRight: '15px'}}>
          <span style={{width: '10px', height: '10px', backgroundColor: '#5c9e57', display: 'inline-block', borderRadius: '50%', marginRight: '5px'}}></span>
          Personal
        </span>
        <span data-eid="legend-meeting">
          <span style={{width: '10px', height: '10px', backgroundColor: '#8e44ad', display: 'inline-block', borderRadius: '50%', marginRight: '5px'}}></span>
          Meeting
        </span>
      </div>
    </section>
  );
};

export default CalendarWidget;