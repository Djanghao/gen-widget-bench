import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, Shield, CheckCircle, AlertTriangle, Radio, Heart, Zap, Thermometer } from 'lucide-react';
import data from './data.json';

const colors = {
  bg: '#0a0a0a',
  card: 'rgba(17, 17, 17, 0.9)',
  border: 'rgba(255, 176, 0, 0.25)',
  accent: '#ffb000',
  green: '#33ff33',
  yellow: '#ffb000',
  red: '#ff3333',
  text: '#ffb000',
  dim: '#7a6a30',
  cyan: '#33ff33',
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, #0d0d0d 50%, #080808 100%)`,
        borderRadius: 16,
        color: colors.text,
        fontFamily: "'SF Mono', 'Courier New', 'Fira Code', monospace",
        maxWidth: 480,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Rocket size={22} color={colors.green} />
          <div>
            <h1
              data-eid="mission-name"
              style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: 2, color: colors.accent }}
            >
              {data.mission.name}
            </h1>
            <span data-eid="mission-id" style={{ fontSize: 11, color: colors.dim }}>
              {data.mission.id}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span
            data-eid="mission-status-badge"
            style={{
              background: 'rgba(51, 255, 51, 0.1)',
              border: '1px solid rgba(51, 255, 51, 0.4)',
              borderRadius: 12,
              color: colors.green,
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 10px',
              letterSpacing: 1,
            }}
          >
            {data.mission.status}
          </span>
          <span
            data-eid="mission-phase-label"
            style={{ display: 'block', fontSize: 11, color: colors.dim, marginTop: 4 }}
          >
            Phase: {data.mission.phase}
          </span>
        </div>
      </header>

      {/* Countdown */}
      <div
        data-eid="countdown-section"
        style={{
          background: 'rgba(51, 255, 51, 0.04)',
          border: `1px solid rgba(51, 255, 51, 0.2)`,
          borderRadius: 10,
          padding: 12,
          textAlign: 'center',
        }}
      >
        <span data-eid="countdown-title" style={{ fontSize: 10, color: colors.green, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
          {data.countdown.label}
        </span>
        <div data-eid="countdown-display" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
          {[
            { eid: 'countdown-days', val: data.countdown.days, label: 'DAYS' },
            { eid: 'countdown-hours', val: data.countdown.hours, label: 'HRS' },
            { eid: 'countdown-minutes', val: data.countdown.minutes, label: 'MIN' },
            { eid: 'countdown-seconds', val: data.countdown.seconds, label: 'SEC' },
          ].map((item) => (
            <span
              key={item.eid}
              data-eid={item.eid}
              style={{
                background: 'rgba(255, 176, 0, 0.08)',
                borderRadius: 8,
                padding: '6px 12px',
                minWidth: 50,
                display: 'inline-block',
                border: '1px solid rgba(255, 176, 0, 0.15)',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: colors.accent }}>
                {String(item.val).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 8, color: colors.dim, letterSpacing: 1 }}>{item.label}</div>
            </span>
          ))}
        </div>
        <span data-eid="countdown-target" style={{ fontSize: 10, color: colors.dim, marginTop: 6, display: 'block' }}>
          Target: Lunar Orbit Insertion at 384,400 km
        </span>
      </div>

      {/* Telemetry */}
      <div data-eid="telemetry-section">
        <h2 data-eid="telemetry-title" style={{ fontSize: 12, fontWeight: 600, color: colors.green, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          <Zap size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Telemetry Readouts
        </h2>
        <div data-eid="telemetry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[
            { key: 'altitude', label: 'Altitude', color: '#ffb000' },
            { key: 'velocity', label: 'Velocity', color: '#33ff33' },
            { key: 'fuel', label: 'Fuel', color: '#33ff33' },
            { key: 'gforce', label: 'G-Force', color: '#ffb000' },
            { key: 'temp', label: 'Temperature', color: '#ff6633' },
            { key: 'pressure', label: 'Cabin Pressure', color: '#33ff33' },
          ].map((gauge) => {
            const t = (data.telemetry as any)[gauge.key === 'temp' ? 'temperature' : gauge.key];
            const pct = (t.value / t.max) * 100;
            return (
              <div
                key={gauge.key}
                data-eid={`gauge-${gauge.key}`}
                style={{
                  background: '#111',
                  border: `1px solid rgba(255, 176, 0, 0.2)`,
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                <span data-eid={`gauge-${gauge.key}-label`} style={{ fontSize: 9, color: colors.dim, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {gauge.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 2 }}>
                  <span data-eid={`gauge-${gauge.key}-value`} style={{ fontSize: 18, fontWeight: 700, color: gauge.color }}>
                    {typeof t.value === 'number' && t.value > 1000 ? t.value.toLocaleString() : t.value}
                  </span>
                  <span data-eid={`gauge-${gauge.key}-unit`} style={{ fontSize: 10, color: colors.dim }}>
                    {t.unit}
                  </span>
                </div>
                <div
                  data-eid={`gauge-${gauge.key}-bar`}
                  style={{
                    background: 'rgba(255, 176, 0, 0.1)',
                    borderRadius: 3,
                    height: 4,
                    marginTop: 6,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      background: gauge.color,
                      borderRadius: 3,
                      height: '100%',
                      width: `${Math.min(pct, 100)}%`,
                      transition: 'width 0.5s',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trajectory Chart */}
      <div data-eid="trajectory-section" style={{ background: '#111', border: `1px solid rgba(255, 176, 0, 0.2)`, borderRadius: 10, padding: 12 }}>
        <h2 data-eid="trajectory-title" style={{ fontSize: 12, fontWeight: 600, color: colors.green, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Trajectory Profile
        </h2>
        <div data-eid="trajectory-chart" style={{ width: '100%', height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trajectory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 176, 0, 0.08)" />
              <XAxis dataKey="time" tick={{ fontSize: 9, fill: colors.dim }} stroke="transparent" />
              <YAxis tick={{ fontSize: 9, fill: colors.dim }} stroke="transparent" tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#111', border: `1px solid rgba(255, 176, 0, 0.3)`, borderRadius: 8, fontSize: 11, color: '#ffb000' }}
                labelStyle={{ color: colors.dim }}
              />
              <Line type="monotone" dataKey="altitude" stroke={colors.green} strokeWidth={2} dot={{ r: 3, fill: colors.green }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crew Roster */}
      <div data-eid="crew-section">
        <h2 data-eid="crew-title" style={{ fontSize: 12, fontWeight: 600, color: colors.green, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Crew Roster
        </h2>
        <div data-eid="crew-list" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.crew.map((member, i) => (
            <div
              key={i}
              data-eid={`crew-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#111',
                border: `1px solid rgba(255, 176, 0, 0.2)`,
                borderRadius: 8,
                padding: '6px 10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Heart size={12} color={member.status === 'nominal' ? colors.green : colors.yellow} />
                <span data-eid={`crew-${i}-name`} style={{ fontSize: 12, fontWeight: 600, color: colors.accent }}>
                  {member.name}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span data-eid={`crew-${i}-role`} style={{ fontSize: 10, color: colors.dim }}>
                  {member.role}
                </span>
                <span
                  data-eid={`crew-${i}-status`}
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: member.status === 'nominal' ? colors.green : colors.yellow,
                    background: member.status === 'nominal' ? 'rgba(51,255,51,0.1)' : 'rgba(255,176,0,0.1)',
                    padding: '2px 6px',
                    borderRadius: 6,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {member.heartRate} BPM
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Systems Checklist */}
      <div data-eid="systems-section">
        <h2 data-eid="systems-title" style={{ fontSize: 12, fontWeight: 600, color: colors.green, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          <Shield size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Systems Check
        </h2>
        <div data-eid="systems-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
          {data.systems.map((sys, i) => (
            <div
              key={i}
              data-eid={`sys-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: '#111',
                borderRadius: 6,
                padding: '5px 8px',
                border: `1px solid ${sys.status === 'warn' ? 'rgba(255,176,0,0.4)' : 'rgba(255,176,0,0.15)'}`,
              }}
            >
              <span data-eid={`sys-${i}-icon`}>
                {sys.status === 'pass' ? (
                  <CheckCircle size={12} color={colors.green} />
                ) : (
                  <AlertTriangle size={12} color={colors.yellow} />
                )}
              </span>
              <span data-eid={`sys-${i}-name`} style={{ fontSize: 10, color: sys.status === 'warn' ? colors.yellow : colors.accent }}>
                {sys.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Comms Log */}
      <div data-eid="comms-section" style={{ background: '#111', border: `1px solid rgba(51, 255, 51, 0.2)`, borderRadius: 10, padding: 10 }}>
        <h2 data-eid="comms-title" style={{ fontSize: 12, fontWeight: 600, color: colors.green, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          <Radio size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Comms Log
        </h2>
        <div data-eid="comms-log" style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 160, overflow: 'auto' }}>
          {data.comms.map((entry, i) => (
            <div
              key={i}
              data-eid={`comms-${i}`}
              style={{
                display: 'flex',
                gap: 6,
                fontSize: 10,
                borderBottom: i < data.comms.length - 1 ? `1px solid rgba(255, 176, 0, 0.08)` : 'none',
                paddingBottom: 5,
              }}
            >
              <span data-eid={`comms-${i}-time`} style={{ color: colors.dim, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                {entry.time}
              </span>
              <span
                data-eid={`comms-${i}-source`}
                style={{
                  color: entry.source === 'HOUSTON' ? colors.green : colors.accent,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                [{entry.source}]
              </span>
              <span data-eid={`comms-${i}-msg`} style={{ color: colors.accent }}>
                {entry.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Phase Timeline */}
      <div data-eid="timeline-section">
        <h2 data-eid="timeline-title" style={{ fontSize: 12, fontWeight: 600, color: colors.green, margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
          Mission Timeline
        </h2>
        <div data-eid="timeline-track" style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
          {data.phases.map((phase, i) => {
            const dotColor = phase.status === 'complete' ? colors.green : phase.status === 'current' ? colors.accent : colors.dim;
            return (
              <div
                key={i}
                data-eid={`phase-${i}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {i > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 7,
                      left: '-50%',
                      right: '50%',
                      height: 2,
                      background: phase.status === 'complete' || phase.status === 'current' ? colors.green : 'rgba(255, 176, 0, 0.15)',
                    }}
                  />
                )}
                <span
                  data-eid={`phase-${i}-dot`}
                  style={{
                    width: phase.status === 'current' ? 14 : 10,
                    height: phase.status === 'current' ? 14 : 10,
                    borderRadius: '50%',
                    background: dotColor,
                    border: phase.status === 'current' ? `2px solid rgba(255,176,0,0.4)` : 'none',
                    zIndex: 1,
                    display: 'inline-block',
                    boxShadow: phase.status === 'current' ? `0 0 8px ${colors.accent}` : 'none',
                  }}
                />
                <span
                  data-eid={`phase-${i}-label`}
                  style={{
                    fontSize: 8,
                    color: phase.status === 'current' ? colors.accent : colors.dim,
                    marginTop: 4,
                    textAlign: 'center',
                    fontWeight: phase.status === 'current' ? 700 : 400,
                  }}
                >
                  {phase.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer
        data-eid="footer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: `1px solid ${colors.border}`,
          paddingTop: 8,
          fontSize: 10,
          color: colors.dim,
        }}
      >
        <span data-eid="met-label">
          MET: T+{data.mission.metHours}:{String(data.mission.metMinutes).padStart(2, '0')}:{String(data.mission.metSeconds).padStart(2, '0')}
        </span>
        <span data-eid="signal-label" style={{ color: colors.green }}>
          Signal: {data.mission.signalStrength}% ●
        </span>
      </footer>
    </section>
  );
}
