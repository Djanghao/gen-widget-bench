import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, Memory, HardDrive, Network } from 'lucide-react';
import data from './data.json';

const ServerMonitoringDashboard = () => {
  const cpuData = [
    { time: '00:00', value: 65 },
    { time: '01:00', value: 68 },
    { time: '02:00', value: 70 },
    { time: '03:00', value: 72 },
    { time: '04:00', value: 73 },
    { time: '05:00', value: 71 },
    { time: '06:00', value: 69 },
  ];

  const networkData = [
    { time: '00:00', value: 780 },
    { time: '01:00', value: 802 },
    { time: '02:00', value: 815 },
    { time: '03:00', value: 822 },
    { time: '04:00', value: 847 },
    { time: '05:00', value: 835 },
    { time: '06:00', value: 828 },
  ];

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1f2e 0%, #252a3d 100%)',
        borderRadius: '12px',
        padding: '24px',
        color: '#e2e8f0',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div data-eid="cluster-name" style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>
          Production Cluster
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span 
            data-eid="status-badge"
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Healthy
          </span>
          <span 
            data-eid="uptime-badge"
            style={{
              backgroundColor: '#334155',
              color: '#cbd5e1',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            99.97%
          </span>
        </div>
      </header>

      {/* Metrics Grid */}
      <div data-eid="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {/* CPU Card */}
        <div data-eid="card-cpu" style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="cpu-icon" style={{ marginRight: '10px', color: '#3b82f6' }}>
              <Cpu size={20} />
            </span>
            <span data-eid="cpu-label" style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
              CPU Usage
            </span>
          </div>
          <div data-eid="cpu-value" style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            73%
          </div>
          <div data-eid="cpu-sparkline" style={{ height: '40px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData}>
                <defs>
                  <linearGradient id="cpuColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#cpuColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Card */}
        <div data-eid="card-memory" style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="memory-icon" style={{ marginRight: '10px', color: '#8b5cf6' }}>
              <Memory size={20} />
            </span>
            <span data-eid="memory-label" style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
              Memory
            </span>
          </div>
          <div data-eid="memory-value" style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            12.4 / 16 GB
          </div>
          <div data-eid="memory-bar" style={{ height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div data-eid="memory-bar-fill" style={{ height: '100%', width: '77.5%', backgroundColor: '#8b5cf6', borderRadius: '4px' }}></div>
          </div>
        </div>

        {/* Disk Card */}
        <div data-eid="card-disk" style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="disk-icon" style={{ marginRight: '10px', color: '#10b981' }}>
              <HardDrive size={20} />
            </span>
            <span data-eid="disk-label" style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
              Disk
            </span>
          </div>
          <div data-eid="disk-value" style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            234 / 500 GB
          </div>
          <div data-eid="disk-bar" style={{ height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div data-eid="disk-bar-fill" style={{ height: '100%', width: '46.8%', backgroundColor: '#10b981', borderRadius: '4px' }}></div>
          </div>
        </div>

        {/* Network Card */}
        <div data-eid="card-network" style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="network-icon" style={{ marginRight: '10px', color: '#f59e0b' }}>
              <Network size={20} />
            </span>
            <span data-eid="network-label" style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
              Network
            </span>
          </div>
          <div data-eid="network-value" style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            847 Mbps
          </div>
          <div data-eid="network-sparkline" style={{ height: '40px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkData}>
                <defs>
                  <linearGradient id="networkColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#f59e0b" fill="url(#networkColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div data-eid="alerts-section" style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div data-eid="alerts-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          Recent Alerts
        </div>
        
        {/* Alert 0 */}
        <div data-eid="alert-0" style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #334155' }}>
          <span data-eid="alert-0-severity" style={{ backgroundColor: '#ef4444', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', marginRight: '12px' }}>
            Critical
          </span>
          <span data-eid="alert-0-message" style={{ fontSize: '14px', color: '#cbd5e1' }}>
            High CPU usage detected on server node-03 (92%)
          </span>
        </div>
        
        {/* Alert 1 */}
        <div data-eid="alert-1" style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #334155' }}>
          <span data-eid="alert-1-severity" style={{ backgroundColor: '#f59e0b', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', marginRight: '12px' }}>
            Warning
          </span>
          <span data-eid="alert-1-message" style={{ fontSize: '14px', color: '#cbd5e1' }}>
            Memory usage approaching threshold on database server
          </span>
        </div>
        
        {/* Alert 2 */}
        <div data-eid="alert-2" style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
          <span data-eid="alert-2-severity" style={{ backgroundColor: '#3b82f6', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', marginRight: '12px' }}>
            Info
          </span>
          <span data-eid="alert-2-message" style={{ fontSize: '14px', color: '#cbd5e1' }}>
            Scheduled maintenance window starting in 2 hours
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServerMonitoringDashboard;