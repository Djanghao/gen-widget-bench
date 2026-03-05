import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, TrendingDown, Circle } from 'lucide-react';
import data from './data.json';

const SportsStandingsWidget = () => {
  const { league, season, matchday, legend, table, chartData } = data;

  // Helper to render form dots
  const renderFormDots = (form: string[]) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {form.map((result, idx) => {
          let color = '#9CA3AF'; // default gray
          if (result === 'W') color = '#10B981'; // green for win
          else if (result === 'D') color = '#3B82F6'; // blue for draw
          else if (result === 'L') color = '#EF4444'; // red for loss
          return (
            <Circle key={idx} size={12} color={color} style={{ flexShrink: 0 }} />
          );
        })}
      </div>
    );
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#E2E8F0',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div data-eid="league-name" style={{ fontSize: '24px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={24} />
          {league}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span data-eid="season-badge" style={{ backgroundColor: '#334155', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
            {season}
          </span>
          <span data-eid="matchday-badge" style={{ backgroundColor: '#334155', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
            {matchday}
          </span>
        </div>
      </header>

      {/* Legend */}
      <div data-eid="legend-row" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', gap: '32px' }}>
        <span data-eid="legend-cl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#3B82F6', borderRadius: '3px' }}></div>
          Champions League
        </span>
        <span data-eid="legend-relegation" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#EF4444', borderRadius: '3px' }}></div>
          Relegation Zone
        </span>
      </div>

      {/* Standings Table */}
      <div data-eid="table-section" style={{ marginBottom: '32px' }}>
        {/* Table Header */}
        <div data-eid="table-header" style={{ display: 'grid', gridTemplateColumns: '40px 220px 50px 40px 40px 40px 50px 50px 50px 50px 100px', backgroundColor: '#1E293B', padding: '12px 16px', borderRadius: '8px', marginBottom: '12px', fontWeight: '600', fontSize: '14px', borderBottom: '1px solid #334155' }}>
          <span data-eid="table-header-rank" style={{ textAlign: 'center' }}>#</span>
          <span data-eid="table-header-team">Team</span>
          <span data-eid="table-header-mp" style={{ textAlign: 'center' }}>MP</span>
          <span data-eid="table-header-w" style={{ textAlign: 'center' }}>W</span>
          <span data-eid="table-header-d" style={{ textAlign: 'center' }}>D</span>
          <span data-eid="table-header-l" style={{ textAlign: 'center' }}>L</span>
          <span data-eid="table-header-gf" style={{ textAlign: 'center' }}>GF</span>
          <span data-eid="table-header-ga" style={{ textAlign: 'center' }}>GA</span>
          <span data-eid="table-header-gd" style={{ textAlign: 'center' }}>GD</span>
          <span data-eid="table-header-pts" style={{ textAlign: 'center' }}>Pts</span>
          <span data-eid="table-header-form" style={{ textAlign: 'center' }}>Form</span>
        </div>

        {/* Team Rows */}
        {table.map((team, index) => {
          // Determine row styling based on rank
          let rowBg = '#1E293B';
          let rankColor = '#9CA3AF';
          let nameColor = '#E2E8F0';
          
          if (index === 0) {
            rowBg = '#0F172A';
            rankColor = '#3B82F6';
            nameColor = '#FFFFFF';
          } else if (index < 4) {
            rowBg = '#1E293B';
            rankColor = '#3B82F6';
            nameColor = '#E2E8F0';
          } else if (index >= 9) {
            rowBg = '#1E293B';
            rankColor = '#EF4444';
            nameColor = '#FECACA';
          }

          return (
            <div 
              key={team.rank} 
              data-eid={`team-row-${index}`} 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '40px 220px 50px 40px 40px 40px 50px 50px 50px 50px 100px', 
                backgroundColor: rowBg, 
                padding: '12px 16px', 
                borderRadius: '8px', 
                marginBottom: '8px',
                borderLeft: index === 0 ? '4px solid #3B82F6' : 'none'
              }}
            >
              <span data-eid={`team-row-${index}-rank`} style={{ textAlign: 'center', fontWeight: '700', color: rankColor }}>{team.rank}</span>
              <span data-eid={`team-row-${index}-name`} style={{ fontWeight: '600', color: nameColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {index === 0 && <TrendingUp size={16} color="#3B82F6" />}
                {index === table.length - 1 && <TrendingDown size={16} color="#EF4444" />}
                {team.name}
              </span>
              <span data-eid={`team-row-${index}-mp`} style={{ textAlign: 'center' }}>{team.mp}</span>
              <span data-eid={`team-row-${index}-w`} style={{ textAlign: 'center' }}>{team.w}</span>
              <span data-eid={`team-row-${index}-d`} style={{ textAlign: 'center' }}>{team.d}</span>
              <span data-eid={`team-row-${index}-l`} style={{ textAlign: 'center' }}>{team.l}</span>
              <span data-eid={`team-row-${index}-gf`} style={{ textAlign: 'center' }}>{team.gf}</span>
              <span data-eid={`team-row-${index}-ga`} style={{ textAlign: 'center' }}>{team.ga}</span>
              <span data-eid={`team-row-${index}-gd`} style={{ textAlign: 'center', color: team.gd >= 0 ? '#10B981' : '#EF4444' }}>{team.gd}</span>
              <span data-eid={`team-row-${index}-pts`} style={{ textAlign: 'center', fontWeight: '700' }}>{team.pts}</span>
              <div data-eid={`team-row-${index}-form`} style={{ textAlign: 'center' }}>
                {renderFormDots(team.form)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Points Chart */}
      <div data-eid="points-chart" style={{ backgroundColor: '#1E293B', padding: '24px', borderRadius: '12px' }}>
        <div data-eid="points-chart-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={20} />
          Points Distribution
        </div>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                axisLine={{ stroke: '#334155' }} 
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                axisLine={{ stroke: '#334155' }} 
                tickLine={{ stroke: '#334155' }}
                domain={[0, 'dataMax + 5']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  borderColor: '#334155', 
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }} 
                itemStyle={{ color: '#E2E8F0' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="points" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default SportsStandingsWidget;