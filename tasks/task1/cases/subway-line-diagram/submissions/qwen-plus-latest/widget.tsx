import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wheelchair, Train, AlertTriangle, Info } from 'lucide-react';
import data from './data.json';

const SubwayLineDiagram = () => {
  const { 
    header, tripInfo, stations, alerts, ridershipData, travelTimes, footer 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
        <div data-eid="line-indicator" style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: '#3b82f6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          B
        </div>
        <div>
          <div data-eid="line-name" style={{ fontSize: '20px', fontWeight: '700', lineHeight: '1.2' }}>
            Blue Line
          </div>
          <div data-eid="direction-label" style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
            Northbound to Lakefront
          </div>
        </div>
        <span 
          data-eid="status-badge" 
          style={{ 
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: '600',
            marginLeft: 'auto'
          }}
        >
          On Time
        </span>
      </header>

      {/* Trip Info */}
      <div data-eid="trip-info" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '24px',
        padding: '12px 16px',
        backgroundColor: '#1e293b',
        borderRadius: '8px'
      }}>
        <span data-eid="trip-origin" style={{ fontWeight: '600', fontSize: '16px' }}>
          {tripInfo.origin}
        </span>
        <span data-eid="trip-arrow" style={{ margin: '0 12px', color: '#94a3b8' }}>
          →
        </span>
        <span data-eid="trip-destination" style={{ fontWeight: '600', fontSize: '16px' }}>
          {tripInfo.destination}
        </span>
        <span data-eid="trip-time" style={{ marginLeft: 'auto', color: '#60a5fa', fontWeight: '600' }}>
          {tripInfo.time}
        </span>
      </div>

      {/* Station List */}
      <div data-eid="station-list" style={{ 
        position: 'relative', 
        marginBottom: '32px',
        paddingLeft: '40px'
      }}>
        {/* Track line */}
        <div style={{ 
          position: 'absolute', 
          left: '16px', 
          top: '0', 
          bottom: '0', 
          width: '4px', 
          backgroundColor: '#3b82f6',
          borderRadius: '2px'
        }}></div>

        {/* Stations */}
        {stations.map((station, index) => (
          <div 
            key={index} 
            data-eid={`station-${index}`} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '24px',
              position: 'relative',
              paddingLeft: '32px'
            }}
          >
            {/* Station dot */}
            <div 
              data-eid={`station-${index}-dot`} 
              style={{ 
                position: 'absolute', 
                left: '14px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: station.isOrigin || station.isDestination ? '16px' : '10px',
                height: station.isOrigin || station.isDestination ? '16px' : '10px',
                borderRadius: '50%',
                backgroundColor: station.isOrigin || station.isDestination ? '#3b82f6' : '#94a3b8',
                border: station.isOrigin || station.isDestination ? '3px solid #1e40af' : 'none'
              }}
            ></div>

            {/* Station content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span data-eid={`station-${index}-name`} style={{ 
                  fontWeight: station.isOrigin || station.isDestination ? '700' : '600',
                  fontSize: station.isOrigin || station.isDestination ? '16px' : '14px'
                }}>
                  {station.name}
                </span>
                {station.isOrigin && (
                  <span data-eid={`station-${index}-time`} style={{ 
                    backgroundColor: '#0ea5e9', 
                    color: 'white', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Board here
                  </span>
                )}
                {station.isDestination && (
                  <span data-eid={`station-${index}-time`} style={{ 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Arrive {station.arrivalTime}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                <span data-eid={`station-${index}-zone`} style={{ 
                  backgroundColor: '#1e293b', 
                  color: '#94a3b8', 
                  padding: '2px 8px', 
                  borderRadius: '4px'
                }}>
                  {station.zone}
                </span>
                
                {station.transfers && station.transfers.length > 0 && (
                  <div data-eid={`station-${index}-transfers`} style={{ display: 'flex', gap: '4px' }}>
                    {station.transfers.map((transfer, i) => (
                      <div key={i} style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '50%', 
                        backgroundColor: transfer.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: 'white'
                      }}>
                        {transfer.line}
                      </div>
                    ))}
                  </div>
                )}
                
                <span data-eid={`station-${index}-type`} style={{ 
                  backgroundColor: station.type === 'Express' ? '#3b82f6' : '#64748b',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {station.type}
                </span>
                
                {station.accessible && (
                  <span data-eid={`station-${index}-accessibility`} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Wheelchair size={14} color="#60a5fa" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div data-eid="alerts-section" style={{ 
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: '#1e293b',
        borderRadius: '8px'
      }}>
        <div data-eid="alerts-title" style={{ 
          fontSize: '16px', 
          fontWeight: '700', 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertTriangle size={16} color="#f59e0b" />
          Service Alerts
        </div>
        
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            data-eid={`alert-${index}`} 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              marginBottom: '12px',
              gap: '8px'
            }}
          >
            <span 
              data-eid={`alert-${index}-severity`} 
              style={{ 
                backgroundColor: alert.severity === 'Warning' ? '#f59e0b' : '#3b82f6',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                minWidth: '60px',
                textAlign: 'center'
              }}
            >
              {alert.severity}
            </span>
            <span data-eid={`alert-${index}-message`} style={{ fontSize: '14px', lineHeight: '1.4' }}>
              {alert.message}
            </span>
          </div>
        ))}
      </div>

      {/* Ridership Section */}
      <div data-eid="ridership-section" style={{ 
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: '#1e293b',
        borderRadius: '8px'
      }}>
        <div data-eid="ridership-title" style={{ 
          fontSize: '16px', 
          fontWeight: '700', 
          marginBottom: '16px'
        }}>
          Today's Ridership
        </div>
        
        <div data-eid="ridership-chart" style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ridershipData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 'dataMax + 100']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderColor: '#334155',
                  borderRadius: '8px'
                }} 
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area 
                type="monotone" 
                dataKey="riders" 
                stroke="#3b82f6" 
                fill="url(#colorRiders)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorRiders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Travel Times Section */}
      <div data-eid="travel-times" style={{ 
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: '#1e293b',
        borderRadius: '8px'
      }}>
        <div data-eid="travel-times-title" style={{ 
          fontSize: '16px', 
          fontWeight: '700', 
          marginBottom: '16px'
        }}>
          Travel Times
        </div>
        
        {travelTimes.map((segment, index) => (
          <div 
            key={index} 
            data-eid={`travel-segment-${index}`} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < travelTimes.length - 1 ? '1px solid #334155' : 'none'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span data-eid={`travel-segment-${index}-from`} style={{ 
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {segment.from}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>to</span>
              <span data-eid={`travel-segment-${index}-to`} style={{ 
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {segment.to}
              </span>
            </div>
            <span data-eid={`travel-segment-${index}-time`} style={{ 
              fontWeight: '700',
              fontSize: '16px',
              color: '#60a5fa'
            }}>
              {segment.time}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div data-eid="footer" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
        fontSize: '14px'
      }}>
        <div data-eid="next-train" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px'
        }}>
          <Train size={16} color="#60a5fa" />
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Next Train</div>
            <div style={{ fontWeight: '700', fontSize: '16px' }}>{footer.nextTrain}</div>
          </div>
        </div>
        
        <div data-eid="frequency" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px'
        }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Frequency</div>
            <div style={{ fontWeight: '700', fontSize: '16px' }}>{footer.frequency}</div>
          </div>
        </div>
        
        <div data-eid="last-updated" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          justifyContent: 'flex-end'
        }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Last updated</div>
          <div style={{ fontWeight: '600' }}>{footer.lastUpdated}</div>
        </div>
      </div>
    </section>
  );
};

export default SubwayLineDiagram;