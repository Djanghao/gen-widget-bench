import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, DollarSign, Users, Percent, Clock, Ticket, Smile, GitBranch, AlertTriangle } from 'lucide-react';
import data from './data.json';

const DashboardKPIGrid = () => {
  const renderSparkline = (dataPoints: number[], color: string) => (
    <div style={{ width: '100%', height: '32px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dataPoints.map((v, i) => ({ x: i, y: v }))}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="y" stroke={color} fill="url(#colorUv)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const getIcon = (kpiId: string) => {
    switch (kpiId) {
      case 'kpi-0': return <DollarSign size={20} />;
      case 'kpi-1': return <Users size={20} />;
      case 'kpi-2': return <Percent size={20} />;
      case 'kpi-3': return <Clock size={20} />;
      case 'kpi-4': return <Ticket size={20} />;
      case 'kpi-5': return <Smile size={20} />;
      case 'kpi-6': return <GitBranch size={20} />;
      case 'kpi-7': return <AlertTriangle size={20} />;
      default: return null;
    }
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return <ArrowUp size={14} className="inline mr-1" />;
    if (change.startsWith('-')) return <ArrowDown size={14} className="inline mr-1" />;
    return null;
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#e6e6e6',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px',
        borderRadius: '12px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div data-eid="company-name" style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff' }}>Acme Corp</div>
          <div data-eid="subtitle" style={{ fontSize: '14px', color: '#a0a0c0', fontWeight: '500' }}>Engineering Dashboard</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span data-eid="department-badge" style={{ 
            backgroundColor: '#2d3748', 
            color: '#a0a0c0', 
            padding: '6px 12px', 
            borderRadius: '20px', 
            fontSize: '12px',
            fontWeight: '500'
          }}>Engineering</span>
          <span data-eid="period-badge" style={{ 
            backgroundColor: '#2d3748', 
            color: '#a0a0c0', 
            padding: '6px 12px', 
            borderRadius: '20px', 
            fontSize: '12px',
            fontWeight: '500'
          }}>Q1 2026</span>
          <span data-eid="refresh-timestamp" style={{ 
            color: '#a0a0c0', 
            fontSize: '12px',
            fontWeight: '500'
          }}>Last refreshed: {data.refreshTimestamp}</span>
        </div>
      </header>

      {/* KPI Grid */}
      <div data-eid="kpi-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px',
        flex: 1
      }}>
        {data.kpis.map((kpi, index) => {
          const kpiId = `kpi-${index}`;
          return (
            <div 
              key={kpiId}
              data-eid={kpiId}
              style={{
                backgroundColor: '#252a41',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span data-eid={`${kpiId}-icon`} style={{ marginRight: '10px', color: '#4cc9f0' }}>
                  {getIcon(kpiId)}
                </span>
                <span data-eid={`${kpiId}-label`} style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#a0a0c0' 
                }}>{kpi.label}</span>
              </div>
              
              <div data-eid={`${kpiId}-value`} style={{ 
                fontSize: '28px', 
                fontWeight: '700', 
                marginBottom: '8px',
                color: '#ffffff'
              }}>{kpi.value}</div>
              
              <div data-eid={`${kpiId}-change`} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {getChangeIcon(kpi.change)}
                <span style={{ 
                  color: kpi.change.startsWith('+') ? '#4ade80' : '#f87171' 
                }}>{kpi.change}</span>
              </div>
              
              <div data-eid={`${kpiId}-sparkline`} style={{ marginBottom: '12px' }}>
                {renderSparkline(kpi.sparkline, kpi.change.startsWith('+') ? '#4ade80' : '#f87171')}
              </div>
              
              <div data-eid={`${kpiId}-target`} style={{ 
                fontSize: '12px', 
                color: '#a0a0c0', 
                marginBottom: '6px' 
              }}>{kpi.targetText}</div>
              
              <div data-eid={`${kpiId}-progress`} style={{ 
                height: '6px', 
                backgroundColor: '#374151', 
                borderRadius: '3px', 
                overflow: 'hidden',
                marginBottom: '4px'
              }}>
                <div 
                  data-eid={`${kpiId}-progress-fill`} 
                  style={{ 
                    height: '100%', 
                    backgroundColor: kpi.progressColor,
                    width: `${kpi.progressPercentage}%`,
                    borderRadius: '3px',
                    transition: 'width 0.5s ease'
                  }}
                />
              </div>
              
              <div style={{ 
                fontSize: '12px', 
                color: '#a0a0c0',
                textAlign: 'right'
              }}>{kpi.progressPercentage}%</div>
            </div>
          );
        })}
      </div>

      {/* Summary Bar */}
      <div data-eid="summary-bar" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        backgroundColor: '#252a41',
        borderRadius: '12px',
        padding: '16px 24px',
        marginTop: 'auto'
      }}>
        <div data-eid="summary-revenue" style={{ display: 'flex', flexDirection: 'column' }}>
          <div data-eid="summary-revenue-label" style={{ 
            fontSize: '12px', 
            color: '#a0a0c0',
            fontWeight: '500'
          }}>Total Revenue</div>
          <div data-eid="summary-revenue-value" style={{ 
            fontSize: '18px', 
            fontWeight: '700',
            color: '#ffffff'
          }}>{data.summary.revenue}</div>
        </div>
        
        <div data-eid="summary-growth" style={{ display: 'flex', flexDirection: 'column' }}>
          <div data-eid="summary-growth-label" style={{ 
            fontSize: '12px', 
            color: '#a0a0c0',
            fontWeight: '500'
          }}>Growth Rate</div>
          <div data-eid="summary-growth-value" style={{ 
            fontSize: '18px', 
            fontWeight: '700',
            color: '#4ade80'
          }}>{data.summary.growth}</div>
        </div>
        
        <div data-eid="summary-team" style={{ display: 'flex', flexDirection: 'column' }}>
          <div data-eid="summary-team-label" style={{ 
            fontSize: '12px', 
            color: '#a0a0c0',
            fontWeight: '500'
          }}>Team Size</div>
          <div data-eid="summary-team-value" style={{ 
            fontSize: '18px', 
            fontWeight: '700',
            color: '#ffffff'
          }}>{data.summary.team}</div>
        </div>
      </div>
    </section>
  );
};

export default DashboardKPIGrid;