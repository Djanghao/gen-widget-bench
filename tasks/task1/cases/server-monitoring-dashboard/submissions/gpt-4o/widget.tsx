import React from 'react';
import { AreaChart, Area } from 'recharts';
import data from './data.json';

const Widget = () => {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #1e2230, #252b3a)',
        borderRadius: '15px',
        padding: '20px',
        width: '350px',
        color: '#fff',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <div data-eid="cluster-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {data.clusterName}
        </div>
        <span
          data-eid="status-badge"
          style={{
            backgroundColor: '#28a745',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px'
          }}
        >
          {data.status}
        </span>
        <span
          data-eid="uptime-badge"
          style={{
            backgroundColor: '#007bff',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px'
          }}
        >
          {data.uptime}
        </span>
      </header>

      <div
        data-eid="metrics-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '20px'
        }}
      >
        {/* CPU Card */}
        <div
          data-eid="card-cpu"
          style={{
            background: '#2a2f40',
            borderRadius: '10px',
            padding: '10px'
          }}
        >
          <span data-eid="cpu-icon">🖥️</span>
          <span data-eid="cpu-label" style={{ fontSize: '14px', display: 'block' }}>
            {data.cpu.label}
          </span>
          <div data-eid="cpu-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {data.cpu.value}
          </div>
          <div data-eid="cpu-sparkline">
            <AreaChart width={150} height={30} data={data.cpu.history}>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </div>
        </div>

        {/* Memory Card */}
        <div
          data-eid="card-memory"
          style={{
            background: '#2a2f40',
            borderRadius: '10px',
            padding: '10px'
          }}
        >
          <span data-eid="memory-icon">💾</span>
          <span data-eid="memory-label" style={{ fontSize: '14px', display: 'block' }}>
            {data.memory.label}
          </span>
          <div data-eid="memory-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {data.memory.value}
          </div>
          <div
            data-eid="memory-bar"
            style={{
              background: '#444',
              borderRadius: '5px',
              overflow: 'hidden',
              height: '10px',
              marginTop: '5px'
            }}
          >
            <div
              data-eid="memory-bar-fill"
              style={{
                background: '#20c997',
                width: `${(parseFloat(data.memory.value) / parseFloat(data.memory.total)) * 100}%`,
                height: '100%'
              }}
            />
          </div>
        </div>

        {/* Disk Card */}
        <div
          data-eid="card-disk"
          style={{
            background: '#2a2f40',
            borderRadius: '10px',
            padding: '10px'
          }}
        >
          <span data-eid="disk-icon">🗄️</span>
          <span data-eid="disk-label" style={{ fontSize: '14px', display: 'block' }}>
            {data.disk.label}
          </span>
          <div data-eid="disk-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {data.disk.value}
          </div>
          <div
            data-eid="disk-bar"
            style={{
              background: '#444',
              borderRadius: '5px',
              overflow: 'hidden',
              height: '10px',
              marginTop: '5px'
            }}
          >
            <div
              data-eid="disk-bar-fill"
              style={{
                background: '#f0ad4e',
                width: `${(parseInt(data.disk.used) / parseInt(data.disk.total)) * 100}%`,
                height: '100%'
              }}
            />
          </div>
        </div>

        {/* Network Card */}
        <div
          data-eid="card-network"
          style={{
            background: '#2a2f40',
            borderRadius: '10px',
            padding: '10px'
          }}
        >
          <span data-eid="network-icon">🌐</span>
          <span data-eid="network-label" style={{ fontSize: '14px', display: 'block' }}>
            {data.network.label}
          </span>
          <div data-eid="network-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {data.network.value}
          </div>
          <div data-eid="network-sparkline">
            <AreaChart width={150} height={30} data={data.network.history}>
              <Area type="monotone" dataKey="value" stroke="#fa8072" fill="#fa8072" />
            </AreaChart>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div data-eid="alerts-section">
        <div data-eid="alerts-title" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
          Recent Alerts
        </div>
        {data.alerts.map((alert, index) => (
          <div
            key={index}
            data-eid={`alert-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#2a2f40',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: '5px'
            }}
          >
            <span
              data-eid={`alert-${index}-severity`}
              style={{
                background: alert.severityColor,
                borderRadius: '5px',
                padding: '5px 10px',
                fontSize: '12px',
                marginRight: '10px'
              }}
            >
              {alert.severity}
            </span>
            <span data-eid={`alert-${index}-message`} style={{ flex: '1' }}>
              {alert.message}
            </span>
            <span>{alert.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Widget;