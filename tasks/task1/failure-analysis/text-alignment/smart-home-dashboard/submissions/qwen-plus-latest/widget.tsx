import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wifi, AlertTriangle, Camera, Shield, Thermometer, Droplets, Wind, Sun, Moon } from 'lucide-react';
import data from './data.json';

const SmartHomeDashboard = () => {
  const energyData = [
    { hour: '6AM', usage: 1.2 },
    { hour: '8AM', usage: 2.4 },
    { hour: '10AM', usage: 3.1 },
    { hour: '12PM', usage: 4.5 },
    { hour: '2PM', usage: 5.2 },
    { hour: '4PM', usage: 4.8 },
    { hour: '6PM', usage: 5.6 },
    { hour: '8PM', usage: 6.3 },
    { hour: '10PM', usage: 4.1 },
  ];

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <header 
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: '1px solid #334155',
          paddingBottom: '16px'
        }}
      >
        <div 
          data-eid="title"
          style={{
            fontSize: '24px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Shield size={24} />
          Smart Home
        </div>
        <div 
          data-eid="home-name"
          style={{
            backgroundColor: '#334155',
            borderRadius: '8px',
            padding: '4px 12px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Maple St.
        </div>
        <div 
          data-eid="wifi-indicator"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px'
          }}
        >
          <Wifi size={16} />
          <span>Excellent</span>
        </div>
        <div 
          data-eid="device-count"
          style={{
            fontSize: '14px',
            color: '#94a3b8'
          }}
        >
          24 devices
        </div>
      </header>

      {/* Rooms Grid */}
      <div 
        data-eid="rooms-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px'
        }}
      >
        {/* Living Room */}
        <div 
          data-eid="room-0"
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #334155'
          }}
        >
          <div 
            data-eid="room-0-name"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Living Room</span>
            <Thermometer size={16} />
          </div>
          <div style={{ marginBottom: '12px', fontSize: '14px', color: '#94a3b8' }}>
            <span 
              data-eid="room-0-temp-current"
              style={{ fontSize: '24px', fontWeight: '700' }}
            >
              72° F
            </span>
            <span> • </span>
            <span 
              data-eid="room-0-temp-target"
              style={{ color: '#60a5fa' }}
            >
              70° F
            </span>
          </div>
          
          <div 
            data-eid="room-0-device-light"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Light</span>
            <span 
              data-eid="room-0-device-light-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              On 80%
            </span>
          </div>
          
          <div 
            data-eid="room-0-device-thermostat"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Thermostat</span>
            <span 
              data-eid="room-0-device-thermostat-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              Cooling
            </span>
          </div>
          
          <div 
            data-eid="room-0-device-sensor"
            style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Sensor</span>
            <span 
              data-eid="room-0-device-sensor-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              Motion
            </span>
          </div>
          
          <div 
            data-eid="room-0-energy-bar"
            style={{
              height: '6px',
              backgroundColor: '#334155',
              borderRadius: '3px',
              overflow: 'hidden'
            }}
          >
            <div 
              data-eid="room-0-energy-bar-fill"
              style={{
                height: '100%',
                width: '75%',
                backgroundColor: '#60a5fa',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>

        {/* Kitchen */}
        <div 
          data-eid="room-1"
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #334155'
          }}
        >
          <div 
            data-eid="room-1-name"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Kitchen</span>
            <Thermometer size={16} />
          </div>
          <div style={{ marginBottom: '12px', fontSize: '14px', color: '#94a3b8' }}>
            <span 
              data-eid="room-1-temp-current"
              style={{ fontSize: '24px', fontWeight: '700' }}
            >
              74° F
            </span>
            <span> • </span>
            <span 
              data-eid="room-1-temp-target"
              style={{ color: '#60a5fa' }}
            >
              72° F
            </span>
          </div>
          
          <div 
            data-eid="room-1-device-light"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Light</span>
            <span 
              data-eid="room-1-device-light-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              On 100%
            </span>
          </div>
          
          <div 
            data-eid="room-1-device-thermostat"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Thermostat</span>
            <span 
              data-eid="room-1-device-thermostat-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              Cooling
            </span>
          </div>
          
          <div 
            data-eid="room-1-device-sensor"
            style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Sensor</span>
            <span 
              data-eid="room-1-device-sensor-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              Smoke OK
            </span>
          </div>
          
          <div 
            data-eid="room-1-energy-bar"
            style={{
              height: '6px',
              backgroundColor: '#334155',
              borderRadius: '3px',
              overflow: 'hidden'
            }}
          >
            <div 
              data-eid="room-1-energy-bar-fill"
              style={{
                height: '100%',
                width: '90%',
                backgroundColor: '#60a5fa',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>

        {/* Bedroom */}
        <div 
          data-eid="room-2"
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #334155'
          }}
        >
          <div 
            data-eid="room-2-name"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Bedroom</span>
            <Thermometer size={16} />
          </div>
          <div style={{ marginBottom: '12px', fontSize: '14px', color: '#94a3b8' }}>
            <span 
              data-eid="room-2-temp-current"
              style={{ fontSize: '24px', fontWeight: '700' }}
            >
              68° F
            </span>
            <span> • </span>
            <span 
              data-eid="room-2-temp-target"
              style={{ color: '#60a5fa' }}
            >
              67° F
            </span>
          </div>
          
          <div 
            data-eid="room-2-device-light"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Light</span>
            <span 
              data-eid="room-2-device-light-status"
              style={{ color: '#94a3b8', fontWeight: '500' }}
            >
              Off
            </span>
          </div>
          
          <div 
            data-eid="room-2-device-thermostat"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Thermostat</span>
            <span 
              data-eid="room-2-device-thermostat-status"
              style={{ color: '#94a3b8', fontWeight: '500' }}
            >
              Idle
            </span>
          </div>
          
          <div 
            data-eid="room-2-device-sensor"
            style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Sensor</span>
            <span 
              data-eid="room-2-device-sensor-status"
              style={{ color: '#94a3b8', fontWeight: '500' }}
            >
              No Motion
            </span>
          </div>
          
          <div 
            data-eid="room-2-energy-bar"
            style={{
              height: '6px',
              backgroundColor: '#334155',
              borderRadius: '3px',
              overflow: 'hidden'
            }}
          >
            <div 
              data-eid="room-2-energy-bar-fill"
              style={{
                height: '100%',
                width: '45%',
                backgroundColor: '#60a5fa',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>

        {/* Garage */}
        <div 
          data-eid="room-3"
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #334155'
          }}
        >
          <div 
            data-eid="room-3-name"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Garage</span>
            <Thermometer size={16} />
          </div>
          <div style={{ marginBottom: '12px', fontSize: '14px', color: '#94a3b8' }}>
            <span 
              data-eid="room-3-temp-current"
              style={{ fontSize: '24px', fontWeight: '700' }}
            >
              81° F
            </span>
            <span> • </span>
            <span 
              data-eid="room-3-temp-target"
              style={{ color: '#94a3b8' }}
            >
              --° F
            </span>
          </div>
          
          <div 
            data-eid="room-3-device-light"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Light</span>
            <span 
              data-eid="room-3-device-light-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              On 40%
            </span>
          </div>
          
          <div 
            data-eid="room-3-device-thermostat"
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Thermostat</span>
            <span 
              data-eid="room-3-device-thermostat-status"
              style={{ color: '#94a3b8', fontWeight: '500' }}
            >
              N/A
            </span>
          </div>
          
          <div 
            data-eid="room-3-device-sensor"
            style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Sensor</span>
            <span 
              data-eid="room-3-device-sensor-status"
              style={{ color: '#60a5fa', fontWeight: '500' }}
            >
              Door Closed
            </span>
          </div>
          
          <div 
            data-eid="room-3-energy-bar"
            style={{
              height: '6px',
              backgroundColor: '#334155',
              borderRadius: '3px',
              overflow: 'hidden'
            }}
          >
            <div 
              data-eid="room-3-energy-bar-fill"
              style={{
                height: '100%',
                width: '65%',
                backgroundColor: '#60a5fa',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Energy Section */}
      <div 
        data-eid="energy-section"
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #334155'
        }}
      >
        <div 
          data-eid="energy-title"
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sun size={20} />
          Daily Energy Usage
        </div>
        
        <div 
          data-eid="energy-chart"
          style={{
            height: '200px',
            marginBottom: '20px'
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }} 
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="usage" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div 
          data-eid="energy-cost"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          <span 
            data-eid="energy-cost-label"
            style={{ color: '#94a3b8' }}
          >
            This Week
          </span>
          <span 
            data-eid="energy-cost-value"
            style={{ color: '#60a5fa' }}
          >
            $47.32
          </span>
        </div>
      </div>

      {/* Security Section */}
      <div 
        data-eid="security-section"
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #334155'
        }}
      >
        <div 
          data-eid="security-title"
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertTriangle size={20} />
          Security
        </div>
        
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            data-eid="alarm-status"
            style={{
              backgroundColor: '#0ea5e9',
              color: 'white',
              borderRadius: '6px',
              padding: '4px 12px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Armed - Away
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div 
            data-eid="camera-0"
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center'
            }}
          >
            <Camera size={24} style={{ marginBottom: '8px', color: '#94a3b8' }} />
            <div 
              data-eid="camera-0-name"
              style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}
            >
              Front Door
            </div>
            <div 
              data-eid="camera-0-status"
              style={{ fontSize: '12px', color: '#4ade80' }}
            >
              Online
            </div>
          </div>
          
          <div 
            data-eid="camera-1"
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center'
            }}
          >
            <Camera size={24} style={{ marginBottom: '8px', color: '#94a3b8' }} />
            <div 
              data-eid="camera-1-name"
              style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}
            >
              Backyard
            </div>
            <div 
              data-eid="camera-1-status"
              style={{ fontSize: '12px', color: '#4ade80' }}
            >
              Online
            </div>
          </div>
          
          <div 
            data-eid="camera-2"
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center'
            }}
          >
            <Camera size={24} style={{ marginBottom: '8px', color: '#94a3b8' }} />
            <div 
              data-eid="camera-2-name"
              style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}
            >
              Garage
            </div>
            <div 
              data-eid="camera-2-status"
              style={{ fontSize: '12px', color: '#f87171' }}
            >
              Offline
            </div>
          </div>
        </div>
      </div>

      {/* Environment Section */}
      <div 
        data-eid="environment-section"
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #334155'
        }}
      >
        <div 
          data-eid="environment-title"
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Wind size={20} />
          Environment
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div 
            data-eid="env-indoor-temp"
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}
          >
            <div 
              data-eid="env-indoor-temp-label"
              style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}
            >
              Indoor
            </div>
            <div 
              data-eid="env-indoor-temp-value"
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              71° F
            </div>
          </div>
          
          <div 
            data-eid="env-outdoor-temp"
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}
          >
            <div 
              data-eid="env-outdoor-temp-label"
              style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}
            >
              Outdoor
            </div>
            <div 
              data-eid="env-outdoor-temp-value"
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              89° F
            </div>
          </div>
          
          <div 
            data-eid="env-aqi"
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}
          >
            <div 
              data-eid="env-aqi-label"
              style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}
            >
              AQI
            </div>
            <div 
              data-eid="env-aqi-value"
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              42 (Good)
            </div>
          </div>
          
          <div 
            data-eid="env-humidity"
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}
          >
            <div 
              data-eid="env-humidity-label"
              style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}
            >
              Humidity
            </div>
            <div 
              data-eid="env-humidity-value"
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              52%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartHomeDashboard;