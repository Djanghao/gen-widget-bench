import React from 'react';
import './data.json';
import { BatteryCharging, Smartphone, Laptop, Tablet, Watch, Headphones, Speaker } from 'lucide-react';

const Widget = () => {
  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(to top, #2c2c54, #24243e)',
        borderRadius: '10px',
        padding: '20px',
        color: '#ffffff',
        width: '340px',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <div data-eid="title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          My Devices
        </div>
        <span
          data-eid="sync-time"
          style={{ fontSize: '12px', color: '#cfcfcf' }}
        >
          Synced 2 min ago
        </span>
      </header>
      <div data-eid="device-list">
        <div
          data-eid="device-0"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            borderBottom: '1px solid #383856',
            paddingBottom: '15px',
          }}
        >
          <span data-eid="device-0-icon" style={{ marginRight: '10px' }}>
            <Smartphone color="#00ce8e" />
          </span>
          <div style={{ flex: 1 }}>
            <div
              data-eid="device-0-name"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              iPhone 15 Pro
            </div>
            <div style={{ fontSize: '12px', color: '#aaaaaa' }}>A2484 - iOS 19.3</div>
            <div
              data-eid="device-0-bar"
              style={{
                background: '#383856',
                height: '5px',
                borderRadius: '5px',
                marginTop: '5px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: '#00ce8e',
                  width: '87%',
                  height: '5px',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
          <span
            data-eid="device-0-pct"
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ce8e' }}
          >
            87%
          </span>
        </div>
        <div
          data-eid="device-1"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            borderBottom: '1px solid #383856',
            paddingBottom: '15px',
          }}
        >
          <span data-eid="device-1-icon" style={{ marginRight: '10px' }}>
            <Laptop color="#e3a008" />
          </span>
          <div style={{ flex: 1 }}>
            <div
              data-eid="device-1-name"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              MacBook Pro 14" <BatteryCharging color="#e3a008" />
            </div>
            <div style={{ fontSize: '12px', color: '#aaaaaa' }}>
              M3 Pro - macOS 16.2
            </div>
            <div
              data-eid="device-1-bar"
              style={{
                background: '#383856',
                height: '5px',
                borderRadius: '5px',
                marginTop: '5px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: '#e3a008',
                  width: '45%',
                  height: '5px',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
          <span
            data-eid="device-1-pct"
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#e3a008' }}
          >
            45%
          </span>
        </div>
        <div
          data-eid="device-2"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            borderBottom: '1px solid #383856',
            paddingBottom: '15px',
          }}
        >
          <span data-eid="device-2-icon" style={{ marginRight: '10px' }}>
            <Tablet color="#e23028" />
          </span>
          <div style={{ flex: 1 }}>
            <div
              data-eid="device-2-name"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              iPad Air
            </div>
            <div style={{ fontSize: '12px', color: '#aaaaaa' }}>M2 - iPadOS 19.3</div>
            <div
              data-eid="device-2-bar"
              style={{
                background: '#383856',
                height: '5px',
                borderRadius: '5px',
                marginTop: '5px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: '#e23028',
                  width: '12%',
                  height: '5px',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
          <span
            data-eid="device-2-pct"
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#e23028' }}
          >
            12%
          </span>
        </div>
        <div
          data-eid="device-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            borderBottom: '1px solid #383856',
            paddingBottom: '15px',
          }}
        >
          <span data-eid="device-3-icon" style={{ marginRight: '10px' }}>
            <Watch color="#00ce8e" />
          </span>
          <div style={{ flex: 1 }}>
            <div
              data-eid="device-3-name"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Apple Watch Ultra <BatteryCharging color="#00ce8e" />
            </div>
            <div style={{ fontSize: '12px', color: '#aaaaaa' }}>
              Series 3 - watchOS 12
            </div>
            <div
              data-eid="device-3-bar"
              style={{
                background: '#383856',
                height: '5px',
                borderRadius: '5px',
                marginTop: '5px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: '#00ce8e',
                  width: '93%',
                  height: '5px',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
          <span
            data-eid="device-3-pct"
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ce8e' }}
          >
            93%
          </span>
        </div>
        <div
          data-eid="device-4"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            borderBottom: '1px solid #383856',
            paddingBottom: '15px',
          }}
        >
          <span data-eid="device-4-icon" style={{ marginRight: '10px' }}>
            <Headphones color="#e3a008" />
          </span>
          <div style={{ flex: 1 }}>
            <div
              data-eid="device-4-name"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              AirPods Pro
            </div>
            <div style={{ fontSize: '12px', color: '#aaaaaa' }}>
              2nd Gen - FW 7A305
            </div>
            <div
              data-eid="device-4-bar"
              style={{
                background: '#383856',
                height: '5px',
                borderRadius: '5px',
                marginTop: '5px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: '#e3a008',
                  width: '34%',
                  height: '5px',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
          <span
            data-eid="device-4-pct"
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#e3a008' }}
          >
            34%
          </span>
        </div>
        <div
          data-eid="device-5"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <span data-eid="device-5-icon" style={{ marginRight: '10px' }}>
            <Speaker color="#00ce8e" />
          </span>
          <div style={{ flex: 1 }}>
            <div
              data-eid="device-5-name"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              HomePod Mini
            </div>
            <div style={{ fontSize: '12px', color: '#aaaaaa' }}>
              2nd Gen - audioOS 19
            </div>
            <div
              data-eid="device-5-bar"
              style={{
                background: '#383856',
                height: '5px',
                borderRadius: '5px',
                marginTop: '5px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: '#00ce8e',
                  width: '100%',
                  height: '5px',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
          <span
            data-eid="device-5-pct"
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ce8e' }}
          >
            100%
          </span>
        </div>
      </div>
      <div
        data-eid="summary"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '15px',
        }}
      >
        <span
          data-eid="charging-count"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#cfcfcf',
          }}
        >
          <BatteryCharging color="#e3a008" style={{ marginRight: '5px' }} />
          Charging 2/6
        </span>
        <span
          data-eid="low-battery-alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#e23028',
          }}
        >
          <Tablet color="#e23028" style={{ marginRight: '5px' }} />
          iPad Air at 12%
        </span>
      </div>
    </section>
  );
};

export default Widget;