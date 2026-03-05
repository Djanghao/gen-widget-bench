// submissions/gpt-model/widget.tsx
import React from 'react';
import data from './data.json';
import { Satellite } from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const Card: React.FC<{
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  titleEid?: string;
  eid?: string;
}> = ({ title, children, style, titleEid, eid }) => (
  <div
    data-eid={eid}
    style={{
      borderRadius: 14,
      padding: 14,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 10px 24px rgba(0,0,0,0.35) inset',
      ...style,
    }}
  >
    {title ? (
      <div
        data-eid={titleEid}
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 0.2,
          color: 'rgba(170,190,255,0.95)',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

export default function Widget() {
  const orbitMarkerPercent = Math.max(
    0,
    Math.min(100, (data.groundTrack.markerPosition ?? 0.5) * 100)
  );
  const signalFillPercent = Math.max(0, Math.min(100, data.signal.fillPercent));

  return (
    <section
      data-eid="root"
      style={{
        width: 390,
        height: 760,
        borderRadius: 26,
        padding: 16,
        boxSizing: 'border-box',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
        color: 'rgba(240,245,255,0.95)',
        background:
          'radial-gradient(110% 70% at 20% 0%, rgba(58,78,180,0.35) 0%, rgba(15,18,40,0) 55%), linear-gradient(180deg, #14173a 0%, #0c0e26 55%, #090a1b 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow:
          '0 18px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          padding: '4px 6px 12px 6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(181,140,255,0.95)',
            }}
          >
            <Satellite size={18} />
          </div>
          <div
            data-eid="mission-name"
            style={{
              fontWeight: 800,
              letterSpacing: 1.1,
              fontSize: 18,
            }}
          >
            {data.mission.name}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            data-eid="orbit-badge"
            style={{
              fontSize: 12,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(167,140,255,0.14)',
              border: '1px solid rgba(167,140,255,0.28)',
              color: 'rgba(228,220,255,0.95)',
            }}
          >
            {data.mission.orbitType}
          </span>
          <span
            data-eid="elapsed-time"
            style={{
              fontSize: 12,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(120,140,255,0.10)',
              border: '1px solid rgba(120,140,255,0.18)',
              color: 'rgba(196,210,255,0.92)',
              letterSpacing: 0.2,
            }}
          >
            {data.mission.elapsed}
          </span>
        </div>
      </header>

      <Card
        eid="orbital-params"
        title="Orbital Parameters"
        titleEid="orbital-params-title"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 10,
          }}
        >
          <div
            data-eid="param-altitude"
            style={{
              borderRadius: 10,
              padding: '10px 10px 9px 10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}
          >
            <span
              data-eid="param-altitude-label"
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(200,210,255,0.55)',
                marginBottom: 6,
              }}
            >
              Altitude
            </span>
            <span
              data-eid="param-altitude-value"
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'baseline',
                fontWeight: 800,
                fontSize: 14,
                color: 'rgba(238,242,255,0.95)',
              }}
            >
              {data.orbitalParams.altitude.value}
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.75 }}>
                {data.orbitalParams.altitude.unit}
              </span>
            </span>
          </div>

          <div
            data-eid="param-velocity"
            style={{
              borderRadius: 10,
              padding: '10px 10px 9px 10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}
          >
            <span
              data-eid="param-velocity-label"
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(200,210,255,0.55)',
                marginBottom: 6,
              }}
            >
              Velocity
            </span>
            <span
              data-eid="param-velocity-value"
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'baseline',
                fontWeight: 800,
                fontSize: 14,
                color: 'rgba(238,242,255,0.95)',
              }}
            >
              {data.orbitalParams.velocity.value}
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.75 }}>
                {data.orbitalParams.velocity.unit}
              </span>
            </span>
          </div>

          <div
            data-eid="param-inclination"
            style={{
              borderRadius: 10,
              padding: '10px 10px 9px 10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}
          >
            <span
              data-eid="param-inclination-label"
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(200,210,255,0.55)',
                marginBottom: 6,
              }}
            >
              Inclination
            </span>
            <span
              data-eid="param-inclination-value"
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'baseline',
                fontWeight: 800,
                fontSize: 14,
                color: 'rgba(238,242,255,0.95)',
              }}
            >
              {data.orbitalParams.inclination.value}
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.75 }}>
                {data.orbitalParams.inclination.unit}
              </span>
            </span>
          </div>

          <div
            data-eid="param-period"
            style={{
              borderRadius: 10,
              padding: '10px 10px 9px 10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}
          >
            <span
              data-eid="param-period-label"
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(200,210,255,0.55)',
                marginBottom: 6,
              }}
            >
              Period
            </span>
            <span
              data-eid="param-period-value"
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'baseline',
                fontWeight: 800,
                fontSize: 14,
                color: 'rgba(238,242,255,0.95)',
              }}
            >
              {data.orbitalParams.period.value}
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.75 }}>
                {data.orbitalParams.period.unit}
              </span>
            </span>
          </div>

          <div
            data-eid="param-eccentricity"
            style={{
              borderRadius: 10,
              padding: '10px 10px 9px 10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}
          >
            <span
              data-eid="param-eccentricity-label"
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(200,210,255,0.55)',
                marginBottom: 6,
              }}
            >
              Eccentricity
            </span>
            <span
              data-eid="param-eccentricity-value"
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'baseline',
                fontWeight: 800,
                fontSize: 14,
                color: 'rgba(238,242,255,0.95)',
              }}
            >
              {data.orbitalParams.eccentricity.value}
            </span>
          </div>
        </div>
      </Card>

      <div style={{ height: 12 }} />

      <Card eid="ground-track" title="Ground Track" titleEid="ground-track-title">
        <div
          data-eid="ground-track-bar"
          style={{
            position: 'relative',
            height: 34,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          {/* grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${p * 100}%`,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'rgba(255,255,255,0.06)',
              }}
            />
          ))}
          <div
            data-eid="ground-track-marker"
            style={{
              position: 'absolute',
              left: `calc(${orbitMarkerPercent}% - 5px)`,
              top: '50%',
              width: 10,
              height: 10,
              transform: 'translateY(-50%)',
              borderRadius: 999,
              background: 'rgba(187,160,255,0.95)',
              boxShadow:
                '0 0 0 4px rgba(187,160,255,0.15), 0 0 18px rgba(187,160,255,0.35)',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 8,
            fontSize: 11,
            color: 'rgba(200,210,255,0.55)',
          }}
        >
          <span data-eid="ground-track-label-start">{data.groundTrack.startLabel}</span>
          <span data-eid="ground-track-label-end">{data.groundTrack.endLabel}</span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 14,
            marginTop: 8,
            fontSize: 12,
            color: 'rgba(205,215,255,0.78)',
            fontWeight: 700,
          }}
        >
          <span data-eid="ground-track-lat">
            Lat:&nbsp; <span style={{ color: 'rgba(238,242,255,0.95)' }}>{data.groundTrack.lat}</span>
          </span>
          <span data-eid="ground-track-lon">
            Lon:&nbsp; <span style={{ color: 'rgba(238,242,255,0.95)' }}>{data.groundTrack.lon}</span>
          </span>
        </div>
      </Card>

      <div style={{ height: 14 }} />

      <div
        data-eid="passes-section"
        style={{
          padding: '2px 4px 0 4px',
        }}
      >
        <div
          data-eid="passes-title"
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.2,
            marginBottom: 8,
            color: 'rgba(238,242,255,0.92)',
          }}
        >
          Next Passes
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr 1fr 0.8fr',
            gap: 8,
            padding: '0 8px 6px 8px',
            fontSize: 10,
            color: 'rgba(200,210,255,0.45)',
            fontWeight: 800,
            letterSpacing: 0.6,
          }}
        >
          <div>TIME</div>
          <div>DURATION</div>
          <div>MAX ELEV.</div>
          <div>DIR</div>
        </div>

        {data.passes.map((p: any, idx: number) => (
          <div
            key={idx}
            data-eid={`pass-${idx}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1fr 1fr 0.8fr',
              gap: 8,
              alignItems: 'center',
              padding: '10px 10px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: 8,
            }}
          >
            <span
              data-eid={`pass-${idx}-time`}
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: 'rgba(238,242,255,0.96)',
                letterSpacing: 0.2,
              }}
            >
              {p.time}
            </span>
            <span
              data-eid={`pass-${idx}-duration`}
              style={{ fontSize: 12, color: 'rgba(196,210,255,0.78)', fontWeight: 700 }}
            >
              {p.duration}
            </span>
            <span
              data-eid={`pass-${idx}-elevation`}
              style={{ fontSize: 12, color: 'rgba(196,210,255,0.78)', fontWeight: 700 }}
            >
              {p.maxElev}
            </span>
            <span
              data-eid={`pass-${idx}-direction`}
              style={{ fontSize: 12, color: 'rgba(196,210,255,0.62)', fontWeight: 800 }}
            >
              {p.dir}
            </span>
          </div>
        ))}
      </div>

      <div style={{ height: 6 }} />

      <div
        data-eid="telemetry-section"
        style={{
          padding: '0 4px',
        }}
      >
        <div
          data-eid="telemetry-title"
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.2,
            margin: '8px 0 10px 0',
            color: 'rgba(238,242,255,0.92)',
          }}
        >
          Subsystem Telemetry
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {(() => {
            const statusPill = (status: string) => (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  padding: '4px 9px',
                  borderRadius: 999,
                  background: 'rgba(120,255,200,0.08)',
                  border: '1px solid rgba(120,255,200,0.18)',
                  color: 'rgba(160,255,220,0.85)',
                  textTransform: 'lowercase',
                }}
              >
                {status}
              </span>
            );

            return (
              <>
                <div
                  data-eid="subsys-power"
                  style={{
                    borderRadius: 12,
                    padding: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span
                      data-eid="subsys-power-label"
                      style={{ fontSize: 11, color: 'rgba(200,210,255,0.55)', fontWeight: 800 }}
                    >
                      Power
                    </span>
                    <span
                      data-eid="subsys-power-value"
                      style={{ fontSize: 14, fontWeight: 900, color: 'rgba(238,242,255,0.95)' }}
                    >
                      {data.telemetry.power.value}
                    </span>
                  </div>
                  <span data-eid="subsys-power-status">{statusPill(data.telemetry.power.status)}</span>
                </div>

                <div
                  data-eid="subsys-comms"
                  style={{
                    borderRadius: 12,
                    padding: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span
                      data-eid="subsys-comms-label"
                      style={{ fontSize: 11, color: 'rgba(200,210,255,0.55)', fontWeight: 800 }}
                    >
                      Comms
                    </span>
                    <span
                      data-eid="subsys-comms-value"
                      style={{ fontSize: 14, fontWeight: 900, color: 'rgba(238,242,255,0.95)' }}
                    >
                      {data.telemetry.comms.value}
                    </span>
                  </div>
                  <span data-eid="subsys-comms-status">{statusPill(data.telemetry.comms.status)}</span>
                </div>

                <div
                  data-eid="subsys-thermal"
                  style={{
                    borderRadius: 12,
                    padding: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span
                      data-eid="subsys-thermal-label"
                      style={{ fontSize: 11, color: 'rgba(200,210,255,0.55)', fontWeight: 800 }}
                    >
                      Thermal
                    </span>
                    <span
                      data-eid="subsys-thermal-value"
                      style={{ fontSize: 14, fontWeight: 900, color: 'rgba(238,242,255,0.95)' }}
                    >
                      {data.telemetry.thermal.value}
                    </span>
                  </div>
                  <span data-eid="subsys-thermal-status">{statusPill(data.telemetry.thermal.status)}</span>
                </div>

                <div
                  data-eid="subsys-adcs"
                  style={{
                    borderRadius: 12,
                    padding: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span
                      data-eid="subsys-adcs-label"
                      style={{ fontSize: 11, color: 'rgba(200,210,255,0.55)', fontWeight: 800 }}
                    >
                      ADCS
                    </span>
                    <span
                      data-eid="subsys-adcs-value"
                      style={{ fontSize: 14, fontWeight: 900, color: 'rgba(238,242,255,0.95)' }}
                    >
                      {data.telemetry.adcs.value}
                    </span>
                  </div>
                  <span data-eid="subsys-adcs-status">{statusPill(data.telemetry.adcs.status)}</span>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      <div style={{ height: 12 }} />

      <div style={{ display: 'flex', gap: 12, padding: '0 4px' }}>
        <Card
          eid="signal-section"
          title="Signal Strength"
          titleEid="signal-title"
          style={{ flex: '0 0 150px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              data-eid="signal-bar"
              style={{
                width: 14,
                height: 78,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                data-eid="signal-bar-fill"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: `${signalFillPercent}%`,
                  borderRadius: 10,
                  background: 'linear-gradient(180deg, rgba(175,140,255,0.95) 0%, rgba(116,165,255,0.95) 55%, rgba(100,230,200,0.85) 100%)',
                  boxShadow: '0 0 16px rgba(160,160,255,0.25)',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span
                data-eid="signal-value"
                style={{ fontSize: 13, fontWeight: 900, color: 'rgba(238,242,255,0.95)' }}
              >
                {data.signal.value}
              </span>
              <span
                data-eid="signal-quality"
                style={{ fontSize: 12, fontWeight: 800, color: 'rgba(196,210,255,0.68)' }}
              >
                {data.signal.quality}
              </span>
            </div>
          </div>
        </Card>

        <Card
          eid="altitude-chart"
          title="Altitude History"
          titleEid="altitude-chart-title"
          style={{ flex: 1 }}
        >
          <div style={{ width: '100%', height: 110 }}>
            <ResponsiveContainer>
              <LineChart data={data.altitudeHistory} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="t"
                  tick={{ fill: 'rgba(200,210,255,0.35)', fontSize: 10 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'rgba(200,210,255,0.35)', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin-2', 'dataMax+2']}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15,18,40,0.92)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 10,
                    color: 'rgba(240,245,255,0.95)',
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'rgba(200,210,255,0.7)' }}
                  formatter={(v: any) => [`${v} km`, 'Altitude']}
                />
                <Line
                  type="monotone"
                  dataKey="alt"
                  stroke="rgba(185,155,255,0.95)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, fill: 'rgba(185,155,255,1)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}