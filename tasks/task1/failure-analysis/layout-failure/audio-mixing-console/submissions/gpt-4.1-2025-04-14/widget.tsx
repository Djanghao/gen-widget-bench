import React from 'react';
import data from './data.json';
import { Volume2, Lock } from 'lucide-react';

const meterGradient = 'linear-gradient(to top, #fc4444 0%, #ffd700 40%, #21d07a 100%)';
const altMeterGradient = 'linear-gradient(to top, #ffd700 0%, #21d07a 100%)';

function getPanBarPosition(pan) {
  // pan: 'C', 'L15', 'R30', etc.
  if (pan === 'C') return '50%';
  if (pan.startsWith('L')) return `${30 - (parseInt(pan.slice(1)) * 30 / 45)}%`;
  if (pan.startsWith('R')) return `${70 + (parseInt(pan.slice(1)) * 30 / 45)}%`;
  return '50%';
}

const soloActiveStyle = {
  background: '#ffd700',
  border: '1px solid #ffd700',
  color: '#252945'
};
const muteInactiveStyle = {
  background: '#222936',
  border: '1px solid #505469',
  color: '#99a0be'
};
const soloInactiveStyle = {
  background: 'none',
  border: '1px solid #505469',
  color: '#99a0be'
};

const panColor = pan =>
  pan === 'C'
    ? '#ff357c'
    : pan.startsWith('L')
    ? '#ff9800'
    : '#00baff';

function Meter({ fill, height = 88, eid, eidFill, gradient }) {
  // fill: 0~1
  const fillHeight = Math.round(fill * height);
  return (
    <div
      data-eid={eid}
      style={{
        height,
        width: 22,
        background: '#202439',
        borderRadius: 6,
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #262a40',
        display: 'flex',
        alignItems: 'flex-end'
      }}
    >
      <div
        data-eid={eidFill}
        style={{
          width: '100%',
          height: fillHeight,
          background: gradient || meterGradient,
          borderRadius: '0 0 6px 6px',
          position: 'absolute',
          bottom: 0,
          left: 0,
          transition: 'height 0.3s'
        }}
      />
    </div>
  );
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: 'radial-gradient(150% 120% at 40% 30%, #222337 80%, #181926 100%)',
        borderRadius: 24,
        boxShadow: '0 4px 20px #0003',
        padding: 28,
        width: 470,
        margin: 0,
        fontFamily: 'Inter, sans-serif',
        color: '#fff',
        display: 'inline-block',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 20,
          justifyContent: 'space-between',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#7eb1ff', fontSize: 21 }}>
            <Volume2 size={22} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          </span>
          <div
            data-eid="console-title"
            style={{
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: -0.5,
              color: '#fff',
              marginRight: 8
            }}
          >
            {data.title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span
            data-eid="project-name"
            style={{
              background: '#23284a',
              color: '#b9c7f7',
              fontSize: 14,
              fontWeight: 500,
              padding: '3.5px 14px',
              borderRadius: 13,
              letterSpacing: 0.1,
              border: '1px solid #434768',
            }}
          >
            {data.project}
          </span>
          <span
            data-eid="bpm-badge"
            style={{
              background: '#ffd700',
              color: '#252945',
              fontSize: 14,
              fontWeight: 600,
              padding: '3.5px 13px',
              borderRadius: 13,
              letterSpacing: 0.2,
              border: '1px solid #fff3',
            }}
          >
            {data.bpm}
          </span>
        </div>
      </header>

      {/* Channels */}
      <div
        data-eid="channels-row"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 18,
          justifyContent: 'space-between',
          marginBottom: 22,
        }}
      >
        {data.channels.map((ch, i) => (
          <div
            data-eid={`ch-${i}`}
            key={ch.name}
            style={{
              background: '#1a1d2c',
              borderRadius: 11,
              padding: '12px 6px 10px 6px',
              width: 66,
              boxSizing: 'border-box',
              boxShadow: '0 1px 3px #0002',
              border: '1px solid #24253a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <div
              data-eid={`ch-${i}-number`}
              style={{
                color: '#939cae',
                fontWeight: 500,
                fontSize: 11.6,
                marginBottom: 0,
                letterSpacing: 0.2,
              }}
            >
              CH {i + 1}
            </div>
            <div
              data-eid={`ch-${i}-name`}
              style={{
                color: ch.nameColor,
                fontWeight: 700,
                fontSize: 15.5,
                marginBottom: 4,
                marginTop: 0,
                letterSpacing: 0,
                textShadow: '0 1px 2px #0002',
              }}
            >
              {ch.name}
            </div>
            <Meter
              eid={`ch-${i}-meter`}
              eidFill={`ch-${i}-meter-fill`}
              fill={ch.meter}
              height={72}
              gradient={meterGradient}
            />
            {/* Pan section */}
            <div
              data-eid={`ch-${i}-pan`}
              style={{
                margin: '5px 0 0 0',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                height: 22,
              }}
            >
              <div
                data-eid={`ch-${i}-pan-bar`}
                style={{
                  width: 43,
                  height: 3,
                  background: '#232847',
                  borderRadius: 2,
                  margin: '0 auto 1.5px auto',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left:
                      ch.pan === 'C'
                        ? 20
                        : ch.pan.startsWith('L')
                        ? 9
                        : ch.pan.startsWith('R')
                        ? 32
                        : 20,
                    top: -2,
                    width: 7.5,
                    height: 7.5,
                    background: panColor(ch.pan),
                    border: '2px solid #15182a',
                    borderRadius: '50%',
                    // highlight selected knob
                    boxShadow: ch.pan === 'C' ? '0 0 3px #ff357c66' : '',
                  }}
                />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  marginTop: 0,
                  color: panColor(ch.pan),
                  letterSpacing: 0
                }}
              >
                {ch.pan}
              </span>
            </div>
            {/* Mute/Solo badges */}
            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 3 }}>
              <span
                data-eid={`ch-${i}-mute`}
                style={{
                  ...muteInactiveStyle,
                  width: 23,
                  display: 'inline-block',
                  fontSize: 13,
                  borderRadius: 5,
                  textAlign: 'center',
                  fontWeight: 700,
                  height: 22,
                  lineHeight: '22px',
                  boxSizing: 'border-box',
                  background:
                    ch.mute
                      ? '#ff357c'
                      : muteInactiveStyle.background,
                  border:
                    ch.mute
                      ? '1.5px solid #ff689c'
                      : muteInactiveStyle.border,
                  color:
                    ch.mute
                      ? '#fff'
                      : muteInactiveStyle.color,
                }}
              >
                M
              </span>
              <span
                data-eid={`ch-${i}-solo`}
                style={{
                  ...soloInactiveStyle,
                  width: 23,
                  display: 'inline-block',
                  fontSize: 13,
                  borderRadius: 5,
                  textAlign: 'center',
                  fontWeight: 700,
                  height: 22,
                  lineHeight: '22px',
                  boxSizing: 'border-box',
                  ...(ch.solo && {
                    ...soloActiveStyle,
                  }),
                }}
              >
                S
              </span>
            </div>
            <div
              data-eid={`ch-${i}-db`}
              style={{
                fontWeight: 600,
                fontSize: 14.4,
                letterSpacing: 0.2,
                marginTop: 4,
                color: '#b9cacb',
                textAlign: 'center'
              }}
            >
              {ch.db}
            </div>
          </div>
        ))}
      </div>

      {/* MASTER */}
      <div
        data-eid="master"
        style={{
          background: 'rgba(26,29,44,0.8)',
          borderRadius: 10,
          padding: '14px 18px 12px 18px',
          marginBottom: 18,
          marginTop: 0,
          boxShadow: '0 1px 5px #0002',
          border: '1.2px solid #252947',
          display: 'flex',
          alignItems: 'center',
          gap: 17,
        }}
      >
        <div
          data-eid="master-label"
          style={{
            fontWeight: 700,
            letterSpacing: 0.06,
            fontSize: 15,
            color: '#7eb1ff',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            minWidth: 76
          }}
        >
          <Volume2 size={18} style={{ marginRight: 4, color: '#7eb1ff', opacity: 0.9 }} />
          MASTER
        </div>
        <div style={{ flex: 1, marginRight: 12 }}>
          <div
            data-eid="master-meter"
            style={{
              width: '100%',
              height: 16,
              background: '#222445',
              borderRadius: 10,
              position: 'relative',
              overflow: 'hidden',
              border: '1.2px solid #2e3352'
            }}
          >
            <div
              data-eid="master-meter-fill"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${data.master.meter * 100}%`,
                borderRadius: 10,
                background: 'linear-gradient(to right, #21d07a 0%, #ffd700 55%, #fc4444 100%)',
                transition: 'width 0.3s',
              }}
            ></div>
          </div>
        </div>
        <div
          data-eid="master-db"
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: '#fff',
            letterSpacing: 0.2,
            textShadow: '0 1px 0 #15182a44'
          }}
        >
          {data.master.db}
        </div>
      </div>

      {/* OUTPUT */}
      <div
        data-eid="output-section"
        style={{
          background: '#191d2a',
          borderRadius: 11,
          padding: '12px 14px 11px 19px',
          border: '1.2px solid #242845',
        }}
      >
        <div
          data-eid="output-label"
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: '#8fa1c3',
            marginBottom: 7,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Lock size={13} style={{ marginRight: 5, color: '#505469', verticalAlign: -2 }} />
          Stereo Out
        </div>
        {/* Output meters and dB values */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {/* LEFT channel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              data-eid="output-left-label"
              style={{
                color: '#7fd583',
                fontWeight: 700,
                fontSize: 15,
                width: 19,
                display: 'inline-block',
                textAlign: 'right',
                marginRight: 4
              }}
            >
              L
            </span>
            <div
              data-eid="output-left"
              style={{
                height: 9,
                flexGrow: 1,
                background: '#232847',
                borderRadius: 7,
                position: 'relative',
                border: '1px solid #21293c',
                width: 162,
                marginRight: 0
              }}
            >
              <div
                data-eid="output-left-fill"
                style={{
                  position: 'absolute',
                  height: 9,
                  left: 0,
                  top: 0,
                  borderRadius: 7,
                  width: `${data.output.left.meter * 100}%`,
                  background: altMeterGradient,
                }}
              ></div>
            </div>
            <span
              data-eid="output-db-left"
              style={{
                width: 55,
                textAlign: 'right',
                color: '#c6d167',
                fontWeight: 600,
                fontSize: 13.7,
                letterSpacing: 0.15,
                marginLeft: 5,
              }}
            >
              {data.output.left.db}
            </span>
          </div>
          {/* RIGHT channel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
            <span
              data-eid="output-right-label"
              style={{
                color: '#ffd700',
                fontWeight: 700,
                fontSize: 15,
                width: 19,
                textAlign: 'right',
                display: 'inline-block',
                marginRight: 4
              }}
            >
              R
            </span>
            <div
              data-eid="output-right"
              style={{
                height: 9,
                flexGrow: 1,
                background: '#232847',
                borderRadius: 7,
                position: 'relative',
                border: '1px solid #21293c',
                width: 162,
                marginRight: 0
              }}
            >
              <div
                data-eid="output-right-fill"
                style={{
                  position: 'absolute',
                  height: 9,
                  left: 0,
                  top: 0,
                  borderRadius: 7,
                  width: `${data.output.right.meter * 100}%`,
                  background: altMeterGradient,
                }}
              ></div>
            </div>
            <span
              data-eid="output-db-right"
              style={{
                width: 55,
                textAlign: 'right',
                color: '#ffd700',
                fontWeight: 600,
                fontSize: 13.7,
                letterSpacing: 0.13,
                marginLeft: 5,
              }}
            >
              {data.output.right.db}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}