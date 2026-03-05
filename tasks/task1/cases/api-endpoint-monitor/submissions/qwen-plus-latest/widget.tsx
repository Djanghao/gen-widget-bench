import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Circle } from 'lucide-react';
import data from './data.json';

const APIEndpointMonitor = () => {
  const { 
    apiName, 
    apiVersion, 
    healthScore, 
    uptime, 
    summaryStats, 
    endpoints, 
    responseCodes, 
    footer 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#e6e6e6',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div data-eid="api-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>{apiName}</h1>
          <span data-eid="api-version" style={{ 
            backgroundColor: '#2d3748', 
            color: '#a0aec0', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: '600' 
          }}>
            {apiVersion}
          </span>
        </div>
        
        <div data-eid="health-score" style={{ position: 'relative', width: '120px', height: '120px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="70%" barSize={12} data={[{ value: healthScore }]}>
              <RadialBar 
                background 
                dataKey="value" 
                cornerRadius={10} 
                fill="#4a5568" 
              />
              <RadialBar 
                dataKey="value" 
                cornerRadius={10} 
                fill={healthScore >= 90 ? "#48bb78" : healthScore >= 75 ? "#ecc94b" : "#e53e3e"} 
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <span 
            data-eid="health-score-value" 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#e2e8f0' 
            }}
          >
            {healthScore}%
          </span>
        </div>
        
        <span 
          data-eid="uptime-badge" 
          style={{ 
            backgroundColor: '#2d3748', 
            color: '#a0aec0', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '14px', 
            fontWeight: '600' 
          }}
        >
          Uptime: {uptime}
        </span>
      </header>

      {/* Summary Stats */}
      <div data-eid="summary-stats" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div data-eid="stat-avg-latency" style={{ 
          backgroundColor: '#2d3748', 
          borderRadius: '12px', 
          padding: '16px', 
          minWidth: '180px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span data-eid="stat-avg-latency-label" style={{ color: '#a0aec0', fontSize: '12px', fontWeight: '600' }}>AVG LATENCY</span>
          <span data-eid="stat-avg-latency-value" style={{ fontSize: '20px', fontWeight: '700', marginTop: '4px' }}>{summaryStats.avgLatency}</span>
        </div>
        
        <div data-eid="stat-error-rate" style={{ 
          backgroundColor: '#2d3748', 
          borderRadius: '12px', 
          padding: '16px', 
          minWidth: '180px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span data-eid="stat-error-rate-label" style={{ color: '#a0aec0', fontSize: '12px', fontWeight: '600' }}>ERROR RATE</span>
          <span data-eid="stat-error-rate-value" style={{ fontSize: '20px', fontWeight: '700', marginTop: '4px', color: summaryStats.errorRate >= 5 ? '#e53e3e' : summaryStats.errorRate >= 2 ? '#ecc94b' : '#48bb78' }}>{summaryStats.errorRate}%</span>
        </div>
        
        <div data-eid="stat-rpm" style={{ 
          backgroundColor: '#2d3748', 
          borderRadius: '12px', 
          padding: '16px', 
          minWidth: '180px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span data-eid="stat-rpm-label" style={{ color: '#a0aec0', fontSize: '12px', fontWeight: '600' }}>REQUESTS/MIN</span>
          <span data-eid="stat-rpm-value" style={{ fontSize: '20px', fontWeight: '700', marginTop: '4px' }}>{summaryStats.rpm}</span>
        </div>
      </div>

      {/* Endpoints Section */}
      <div data-eid="endpoints-section" style={{ marginBottom: '24px' }}>
        <div data-eid="endpoints-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#e2e8f0' }}>
          Endpoints
        </div>
        
        {endpoints.map((endpoint, index) => (
          <div 
            key={index} 
            data-eid={`endpoint-${index}`} 
            style={{ 
              backgroundColor: '#2d3748', 
              borderRadius: '12px', 
              padding: '16px', 
              marginBottom: '16px',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto auto auto auto auto',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <span 
              data-eid={`endpoint-${index}-method`} 
              style={{ 
                backgroundColor: endpoint.method === 'GET' ? '#4299e1' : 
                               endpoint.method === 'POST' ? '#38a169' : 
                               endpoint.method === 'PUT' ? '#ed8936' : 
                               endpoint.method === 'DELETE' ? '#e53e3e' : '#4a5568',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {endpoint.method}
            </span>
            
            <span data-eid={`endpoint-${index}-path`} style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>
              {endpoint.path}
            </span>
            
            <span data-eid={`endpoint-${index}-status`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Circle 
                size={12} 
                color={endpoint.status === 'healthy' ? '#48bb78' : endpoint.status === 'warning' ? '#ecc94b' : '#e53e3e'} 
              />
              <span style={{ fontSize: '12px', color: endpoint.status === 'healthy' ? '#48bb78' : endpoint.status === 'warning' ? '#ecc94b' : '#e53e3e' }}>
                {endpoint.status === 'healthy' ? 'Healthy' : endpoint.status === 'warning' ? 'Warning' : 'Critical'}
              </span>
            </span>
            
            <span data-eid={`endpoint-${index}-avg-latency-label`} style={{ color: '#a0aec0', fontSize: '12px', fontWeight: '600' }}>Avg</span>
            <span data-eid={`endpoint-${index}-avg-latency`} style={{ fontSize: '14px', fontWeight: '600' }}>{endpoint.avgLatency}</span>
            
            <span data-eid={`endpoint-${index}-p99-latency-label`} style={{ color: '#a0aec0', fontSize: '12px', fontWeight: '600' }}>P99</span>
            <span data-eid={`endpoint-${index}-p99-latency`} style={{ fontSize: '14px', fontWeight: '600' }}>{endpoint.p99Latency}</span>
            
            <div data-eid={`endpoint-${index}-sparkline`} style={{ 
              backgroundColor: '#4a5568', 
              borderRadius: '4px', 
              height: '24px', 
              width: '80px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '0 2px'
            }}>
              {endpoint.sparkline.map((height, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: '4px', 
                    backgroundColor: '#4299e1', 
                    height: `${height}%`,
                    borderRadius: '1px 1px 0 0'
                  }} 
                />
              ))}
            </div>
            
            <span data-eid={`endpoint-${index}-error-rate-label`} style={{ color: '#a0aec0', fontSize: '12px', fontWeight: '600' }}>Error</span>
            <span data-eid={`endpoint-${index}-error-rate`} style={{ fontSize: '14px', fontWeight: '600', color: endpoint.errorRate >= 5 ? '#e53e3e' : endpoint.errorRate >= 2 ? '#ecc94b' : '#48bb78' }}>
              {endpoint.errorRate}%
            </span>
            
            <span data-eid={`endpoint-${index}-rpm`} style={{ fontSize: '14px', fontWeight: '600' }}>{endpoint.rpm}</span>
          </div>
        ))}
      </div>

      {/* Response Codes Section */}
      <div data-eid="response-codes-section" style={{ marginBottom: '24px' }}>
        <div data-eid="response-codes-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#e2e8f0' }}>
          Response Codes
        </div>
        
        <div data-eid="response-codes-bar" style={{ 
          backgroundColor: '#4a5568', 
          borderRadius: '8px', 
          height: '24px', 
          marginBottom: '16px',
          overflow: 'hidden'
        }}>
          <div 
            data-eid="response-codes-2xx-fill" 
            style={{ 
              backgroundColor: '#48bb78', 
              height: '100%', 
              width: `${responseCodes['2xx']}%`,
              float: 'left'
            }} 
          />
          <div 
            data-eid="response-codes-4xx-fill" 
            style={{ 
              backgroundColor: '#ecc94b', 
              height: '100%', 
              width: `${responseCodes['4xx']}%`,
              float: 'left'
            }} 
          />
          <div 
            data-eid="response-codes-5xx-fill" 
            style={{ 
              backgroundColor: '#e53e3e', 
              height: '100%', 
              width: `${responseCodes['5xx']}%`,
              float: 'left'
            }} 
          />
        </div>
        
        <div data-eid="response-codes-legend" style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
          <span data-eid="response-codes-2xx-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#48bb78', borderRadius: '50%' }} />
            2xx: {responseCodes['2xx']}%
          </span>
          <span data-eid="response-codes-4xx-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#ecc94b', borderRadius: '50%' }} />
            4xx: {responseCodes['4xx']}%
          </span>
          <span data-eid="response-codes-5xx-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#e53e3e', borderRadius: '50%' }} />
            5xx: {responseCodes['5xx']}%
          </span>
        </div>
      </div>

      {/* Footer */}
      <div data-eid="footer" style={{ 
        borderTop: '1px solid #4a5568', 
        paddingTop: '16px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '14px', 
        color: '#a0aec0' 
      }}>
        <span data-eid="footer-total-requests">Total Requests: {footer.totalRequests}</span>
        <span data-eid="footer-last-checked">Last Checked: {footer.lastChecked}</span>
      </div>
    </section>
  );
};

export default APIEndpointMonitor;