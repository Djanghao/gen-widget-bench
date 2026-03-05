import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star } from 'lucide-react';
import data from './data.json';

const MusicFestivalSchedule = () => {
  const { 
    festivalName, 
    festivalDate, 
    favoritesCount,
    crowdChartData,
    stages,
    schedule,
    favorites,
    conflicts
  } = data;

  return (
    <section data-eid="root" style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    }}>
      {/* Header */}
      <header data-eid="header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div>
          <h1 data-eid="title" style={{ 
            margin: '0', 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1a1a1a' 
          }}>
            {festivalName}
          </h1>
          <span data-eid="date-label" style={{ 
            display: 'block', 
            marginTop: '4px', 
            fontSize: '16px', 
            color: '#666' 
          }}>
            {festivalDate}
          </span>
        </div>
        <span data-eid="favorites-count" style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#4a6fa5',
          backgroundColor: '#e6f0ff',
          padding: '6px 12px',
          borderRadius: '20px'
        }}>
          {favoritesCount} Favorites
        </span>
      </header>

      {/* Crowd Chart Section */}
      <div data-eid="crowd-chart-section" style={{ 
        marginBottom: '32px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 data-eid="crowd-chart-title" style={{ 
          margin: '0 0 16px 0', 
          fontSize: '20px', 
          fontWeight: '600',
          color: '#1a1a1a'
        }}>
          Crowd Density Prediction
        </h2>
        <div data-eid="crowd-area-chart" style={{ height: '200px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={crowdChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="density" 
                stroke="#4a6fa5" 
                fill="url(#colorUv)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4a6fa5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4a6fa5" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Schedule Grid */}
      <div data-eid="schedule-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {/* Stage Headers */}
        {stages.map((stage, index) => (
          <div 
            key={`stage-header-${index}`} 
            data-eid={`stage-header-${index}`} 
            style={{ 
              backgroundColor: '#4a6fa5', 
              color: 'white', 
              padding: '12px 16px', 
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            {stage}
          </div>
        ))}

        {/* Schedule Slots */}
        {schedule.map((stageSlots, stageIndex) => (
          stageSlots.map((slot, slotIndex) => (
            <div 
              key={`slot-${stageIndex}-${slotIndex}`}
              data-eid={`slot-${stageIndex}-${slotIndex}`}
              style={{
                backgroundColor: 'white',
                borderRadius: '6px',
                padding: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                borderLeft: '4px solid #4a6fa5'
              }}
            >
              <div style={{ marginBottom: '6px' }}>
                <span data-eid={`slot-${stageIndex}-${slotIndex}-artist`} style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  fontSize: '14px',
                  color: '#1a1a1a',
                  marginBottom: '2px'
                }}>
                  {slot.artist}
                </span>
                {slot.genre && (
                  <span data-eid={`slot-${stageIndex}-${slotIndex}-genre`} style={{ 
                    display: 'inline-block', 
                    fontSize: '12px', 
                    backgroundColor: '#e6f0ff',
                    color: '#4a6fa5',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    marginBottom: '4px'
                  }}>
                    {slot.genre}
                  </span>
                )}
                <span data-eid={`slot-${stageIndex}-${slotIndex}-time`} style={{ 
                  display: 'block', 
                  fontSize: '12px', 
                  color: '#666'
                }}>
                  {slot.time}
                </span>
              </div>
              <div data-eid={`slot-${stageIndex}-${slotIndex}-rating`} style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginTop: '4px'
              }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < slot.rating ? '#ffc107' : '#e0e0e0'} 
                    stroke={i < slot.rating ? '#ffc107' : '#e0e0e0'}
                  />
                ))}
                <span style={{ 
                  marginLeft: '4px', 
                  fontSize: '12px', 
                  color: '#666' 
                }}>
                  {slot.rating}.0
                </span>
              </div>
            </div>
          ))
        ))}
      </div>

      {/* Favorites Sidebar */}
      <div data-eid="favorites-sidebar" style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 data-eid="favorites-title" style={{ 
          margin: '0 0 16px 0', 
          fontSize: '20px', 
          fontWeight: '600',
          color: '#1a1a1a'
        }}>
          Your Favorites
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {favorites.map((favorite, index) => (
            <div 
              key={`fav-${index}`} 
              data-eid={`fav-${index}`} 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px'
              }}
            >
              <div style={{ 
                width: '40px', 
                height: '40px', 
                backgroundColor: '#4a6fa5', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '12px'
              }}>
                {favorite.initial}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: '600', 
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  {favorite.name}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666' 
                }}>
                  {favorite.stage} • {favorite.time}
                </div>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                color: '#ffc107'
              }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < favorite.rating ? '#ffc107' : '#e0e0e0'} 
                    stroke={i < favorite.rating ? '#ffc107' : '#e0e0e0'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conflict Indicators */}
      {conflicts.map((conflict, index) => (
        <span 
          key={`conflict-${index}`} 
          data-eid={`conflict-${index}`} 
          style={{ 
            display: 'block', 
            marginTop: '16px', 
            fontSize: '14px', 
            color: '#dc3545',
            fontWeight: '500',
            backgroundColor: '#fff5f5',
            padding: '8px 12px',
            borderRadius: '4px',
            borderLeft: '4px solid #dc3545'
          }}
        >
          ⚠️ {conflict}
        </span>
      ))}
    </section>
  );
};

export default MusicFestivalSchedule;