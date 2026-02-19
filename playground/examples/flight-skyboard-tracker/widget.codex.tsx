import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import data from './data.json'

const { airport, delayByHour, departures, onTimeRate, window } = data

const monoFont = '"IBM Plex Mono", "JetBrains Mono", "SFMono-Regular", Menlo, monospace'
const uiFont =
  '"Space Grotesk", "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif'

const averageDelay =
  delayByHour.length > 0
    ? Math.round(
        delayByHour.reduce((sum, point) => sum + point.minutes, 0) / delayByHour.length
      )
    : 0

const peakDelayPoint =
  delayByHour.length > 0
    ? delayByHour.reduce((peak, point) => (point.minutes > peak.minutes ? point : peak))
    : null

function getStatusTone(status: string) {
  const normalized = status.toLowerCase()

  if (normalized.includes('delay')) {
    return {
      border: 'rgba(251, 146, 60, 0.46)',
      text: '#fed7aa',
      bg: 'rgba(154, 52, 18, 0.35)',
    }
  }

  if (normalized.includes('boarding')) {
    return {
      border: 'rgba(125, 211, 252, 0.46)',
      text: '#dbeafe',
      bg: 'rgba(14, 116, 144, 0.34)',
    }
  }

  return {
    border: 'rgba(134, 239, 172, 0.44)',
    text: '#dcfce7',
    bg: 'rgba(21, 128, 61, 0.3)',
  }
}

export default function Widget() {
  return (
    <section
      style={{
        background:
          'radial-gradient(120% 120% at 90% 0%, rgba(56, 189, 248, 0.22) 0%, rgba(15, 23, 42, 0) 45%), radial-gradient(100% 120% at 0% 100%, rgba(99, 102, 241, 0.24) 0%, rgba(15, 23, 42, 0) 52%), linear-gradient(160deg, #020617 0%, #0b1120 54%, #0f172a 100%)',
        border: '1px solid rgba(148, 163, 184, 0.24)',
        borderRadius: 22,
        boxShadow: '0 20px 56px rgba(2, 6, 23, 0.62), inset 0 1px 0 rgba(226, 232, 240, 0.08)',
        color: '#f8fafc',
        display: 'grid',
        fontFamily: uiFont,
        gap: 12,
        maxWidth: 620,
        overflow: 'hidden',
        padding: 14,
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          background:
            'linear-gradient(140deg, rgba(56, 189, 248, 0.24) 0%, rgba(99, 102, 241, 0.14) 42%, rgba(15, 23, 42, 0) 100%)',
          borderRadius: '50%',
          filter: 'blur(16px)',
          height: 180,
          pointerEvents: 'none',
          position: 'absolute',
          right: -50,
          top: -90,
          width: 180,
        }}
      />

      <header
        style={{
          alignItems: 'center',
          backdropFilter: 'blur(6px)',
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 14,
          display: 'flex',
          gap: 10,
          justifyContent: 'space-between',
          padding: '10px 12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: '#7dd3fc',
              fontFamily: monoFont,
              fontSize: 10,
              letterSpacing: '0.11em',
              marginBottom: 3,
              textTransform: 'uppercase',
            }}
          >
            Flight Skyboard
          </div>
          <h2
            style={{
              fontSize: 'clamp(14px, 2.4vw, 18px)',
              fontWeight: 600,
              letterSpacing: '0.02em',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={airport}
          >
            {airport}
          </h2>
          <p
            style={{
              color: '#bfdbfe',
              fontFamily: monoFont,
              fontSize: 10,
              letterSpacing: '0.06em',
              margin: '2px 0 0',
              textTransform: 'uppercase',
            }}
          >
            {window}
          </p>
        </div>

        <div
          style={{
            background: 'linear-gradient(150deg, rgba(16, 185, 129, 0.34), rgba(5, 150, 105, 0.18))',
            border: '1px solid rgba(110, 231, 183, 0.56)',
            borderRadius: 12,
            boxShadow: 'inset 0 1px 0 rgba(236, 253, 245, 0.18)',
            minWidth: 94,
            padding: '6px 9px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#bbf7d0',
              fontFamily: monoFont,
              fontSize: 9,
              letterSpacing: '0.09em',
              marginBottom: 2,
              textTransform: 'uppercase',
            }}
          >
            On-Time
          </div>
          <strong
            style={{
              fontFamily: monoFont,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            {onTimeRate}
          </strong>
        </div>
      </header>

      <section
        style={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 1fr))',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <article
          style={{
            background: 'linear-gradient(160deg, rgba(30, 41, 59, 0.82), rgba(15, 23, 42, 0.82))',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: 12,
            minHeight: 62,
            padding: '8px 9px',
          }}
        >
          <div
            style={{
              color: '#94a3b8',
              fontFamily: monoFont,
              fontSize: 9,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            Flights
          </div>
          <strong
            style={{
              display: 'block',
              fontFamily: monoFont,
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.1,
              marginTop: 6,
            }}
          >
            {departures.length}
          </strong>
        </article>

        <article
          style={{
            background: 'linear-gradient(160deg, rgba(15, 118, 110, 0.36), rgba(6, 78, 59, 0.3))',
            border: '1px solid rgba(45, 212, 191, 0.33)',
            borderRadius: 12,
            minHeight: 62,
            padding: '8px 9px',
          }}
        >
          <div
            style={{
              color: '#99f6e4',
              fontFamily: monoFont,
              fontSize: 9,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            Avg Delay
          </div>
          <strong
            style={{
              display: 'block',
              fontFamily: monoFont,
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.1,
              marginTop: 6,
            }}
          >
            {averageDelay}
            <span style={{ fontSize: 11, marginLeft: 4 }}>min</span>
          </strong>
        </article>

        <article
          style={{
            background: 'linear-gradient(160deg, rgba(37, 99, 235, 0.33), rgba(30, 58, 138, 0.28))',
            border: '1px solid rgba(96, 165, 250, 0.35)',
            borderRadius: 12,
            minHeight: 62,
            padding: '8px 9px',
          }}
        >
          <div
            style={{
              color: '#bfdbfe',
              fontFamily: monoFont,
              fontSize: 9,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            Peak Hour
          </div>
          <strong
            style={{
              display: 'block',
              fontFamily: monoFont,
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1.2,
              marginTop: 8,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {peakDelayPoint ? peakDelayPoint.hour : '--:--'}
          </strong>
        </article>
      </section>

      <article
        style={{
          backdropFilter: 'blur(5px)',
          background:
            'linear-gradient(170deg, rgba(15, 23, 42, 0.86), rgba(15, 23, 42, 0.56) 55%, rgba(30, 41, 59, 0.38) 100%)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 14,
          display: 'grid',
          gap: 6,
          padding: 10,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            alignItems: 'baseline',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.05em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Departure Board
          </h3>
          <span
            style={{
              color: '#94a3b8',
              fontFamily: monoFont,
              fontSize: 9,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Live Snapshot
          </span>
        </div>

        <div style={{ display: 'grid', gap: 7 }}>
          {departures.map((flight) => {
            const tone = getStatusTone(flight.status)

            return (
              <article
                key={flight.code}
                style={{
                  alignItems: 'center',
                  background:
                    'linear-gradient(140deg, rgba(15, 23, 42, 0.78), rgba(30, 41, 59, 0.34) 65%, rgba(30, 58, 138, 0.16) 100%)',
                  border: '1px solid rgba(148, 163, 184, 0.22)',
                  borderRadius: 11,
                  columnGap: 8,
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                  padding: '7px 8px',
                  rowGap: 5,
                }}
              >
                <strong
                  style={{
                    background:
                      'linear-gradient(150deg, rgba(148, 163, 184, 0.22), rgba(71, 85, 105, 0.2))',
                    border: '1px solid rgba(148, 163, 184, 0.32)',
                    borderRadius: 7,
                    fontFamily: monoFont,
                    fontSize: 11,
                    letterSpacing: '0.03em',
                    padding: '3px 6px',
                  }}
                >
                  {flight.code}
                </strong>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: '#e2e8f0',
                      fontSize: 12,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={flight.route}
                  >
                    {flight.route}
                  </div>
                  <div
                    style={{
                      color: '#93c5fd',
                      fontFamily: monoFont,
                      fontSize: 10,
                      letterSpacing: '0.04em',
                      marginTop: 2,
                    }}
                  >
                    Gate {flight.gate}
                  </div>
                </div>

                <div
                  style={{
                    color: '#f8fafc',
                    fontFamily: monoFont,
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    textAlign: 'right',
                  }}
                >
                  {flight.time}
                </div>

                <span
                  style={{
                    background: tone.bg,
                    border: `1px solid ${tone.border}`,
                    borderRadius: 999,
                    color: tone.text,
                    fontFamily: monoFont,
                    fontSize: 9,
                    gridColumn: '2 / 4',
                    justifySelf: 'start',
                    letterSpacing: '0.04em',
                    padding: '2px 8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {flight.status}
                </span>
              </article>
            )
          })}
        </div>
      </article>

      <article
        style={{
          backdropFilter: 'blur(5px)',
          background:
            'linear-gradient(175deg, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.6) 60%, rgba(30, 58, 138, 0.22) 100%)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 14,
          padding: 10,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            alignItems: 'baseline',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              color: '#93c5fd',
              fontFamily: monoFont,
              fontSize: 10,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
            }}
          >
            Delay Trend
          </div>
          <div
            style={{
              color: '#cbd5e1',
              fontFamily: monoFont,
              fontSize: 9,
              letterSpacing: '0.05em',
            }}
          >
            Peak {peakDelayPoint ? `${peakDelayPoint.hour} · ${peakDelayPoint.minutes}m` : '--'}
          </div>
        </div>

        <div style={{ height: 164 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={delayByHour} margin={{ bottom: 2, left: -8, right: 6, top: 6 }}>
              <CartesianGrid
                stroke="rgba(148, 163, 184, 0.2)"
                strokeDasharray="3 4"
                vertical={false}
              />
              <XAxis
                axisLine={false}
                dataKey="hour"
                tick={{ fill: '#cbd5e1', fontFamily: monoFont, fontSize: 9 }}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tick={{ fill: '#94a3b8', fontFamily: monoFont, fontSize: 9 }}
                tickLine={false}
                width={26}
              />
              <Tooltip
                contentStyle={{
                  backdropFilter: 'blur(6px)',
                  background: 'rgba(2, 6, 23, 0.92)',
                  border: '1px solid rgba(96, 165, 250, 0.35)',
                  borderRadius: 10,
                  color: '#dbeafe',
                  fontFamily: monoFont,
                  fontSize: 10,
                  padding: '6px 8px',
                }}
                cursor={{ fill: 'rgba(96, 165, 250, 0.08)' }}
                formatter={(value: number | string) => [`${value} min`, 'Delay']}
                labelStyle={{ color: '#93c5fd', marginBottom: 3 }}
              />
              <Bar dataKey="minutes" radius={[7, 7, 0, 0]}>
                {delayByHour.map((point) => (
                  <Cell
                    key={point.hour}
                    fill={
                      point.hour === peakDelayPoint?.hour
                        ? 'rgba(250, 204, 21, 0.95)'
                        : 'rgba(96, 165, 250, 0.82)'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}
