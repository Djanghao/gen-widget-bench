import React from 'react';
import data from './data.json';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ParkingCircle } from 'lucide-react';

const Widget: React.FC = () => (
  <section
    data-eid="root"
    style={{
      backgroundColor: '#0e1526',
      borderRadius: '12px',
      padding: '20px',
      color: '#fff',
      maxWidth: '400px',
    }}
  >
    <header data-eid="header" style={{ marginBottom: '20px' }}>
      <h2 data-eid="garage-name" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>
        <ParkingCircle style={{ marginRight: '8px' }} />
        Central Garage
      </h2>
      <div data-eid="garage-address" style={{ fontSize: '14px', color: '#9b9b9b' }}>
        📍 200 Congress Ave, Austin, TX 78701
      </div>
      <span data-eid="status-badge" style={{ backgroundColor: '#39cb75', borderRadius: '5px', padding: '4px 8px', fontSize: '14px', float: 'right' }}>
        Open
      </span>
    </header>
    <div data-eid="floors-section" style={{ marginBottom: '20px' }}>
      {data.floors.map(floor => (
        <div key={floor.id} data-eid={`floor-${floor.id}`} style={{ marginBottom: '10px' }}>
          <span data-eid={`floor-${floor.id}-label`} style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: floor.color }}>
            {floor.label}
          </span>
          <div data-eid={`floor-${floor.id}-bar`} style={{ background: '#1e2639', borderRadius: '8px', overflow: 'hidden', marginBottom: '4px' }}>
            <div style={{ background: floor.color, width: `${(floor.available / floor.total) * 100}%`, height: '8px' }} />
          </div>
          <span data-eid={`floor-${floor.id}-spots`} style={{ marginRight: '10px', fontSize: '14px' }}>
            {floor.available}/{floor.total}
          </span>
          <span data-eid={`floor-${floor.id}-rate`} style={{ fontSize: '14px', float: 'right', color: '#9b9b9b' }}>
            ${floor.rate}/hr
          </span>
        </div>
      ))}
    </div>
    <div data-eid="summary-section" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <span data-eid="total-spots" style={{ textAlign: 'center' }}>
        <strong>TOTAL</strong>
        <br />
        {data.total}
      </span>
      <span data-eid="available-spots" style={{ textAlign: 'center', color: '#39cb75' }}>
        <strong>AVAILABLE</strong>
        <br />
        {data.available}
      </span>
      <span data-eid="hourly-rate" style={{ textAlign: 'center', color: '#39cb75' }}>
        <strong>RATE</strong>
        <br />
        ${data.rate}
      </span>
    </div>
    <div data-eid="quick-stats" style={{ marginBottom: '20px', fontSize: '14px', color: '#9b9b9b' }}>
      <span data-eid="avg-stay">⏳ Avg Stay: {data.avgStay}</span>
      <span data-eid="busiest-hour" style={{ marginLeft: '12px' }}>🚀 Busiest: {data.busiestHour}</span>
    </div>
    <div data-eid="occupancy-chart" style={{ backgroundColor: '#1e2639', borderRadius: '8px', overflow: 'hidden', padding: '16px' }}>
      <BarChart width={340} height={150} data={data.hourlyOccupancy}>
        <XAxis dataKey="time" stroke="#9b9b9b" />
        <YAxis stroke="#9b9b9b" />
        <Tooltip />
        <Bar dataKey="occupancy" fill="#fdda4b" barSize={20} />
      </BarChart>
    </div>
  </section>
);

export default Widget;