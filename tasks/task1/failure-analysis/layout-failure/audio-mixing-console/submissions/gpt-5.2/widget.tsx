// submissions/chatgpt/widget.tsx
import React from 'react';
import data from './data.json';

type Channel = {
  ch: string;
  name: string;
  color: string;
  meter: number; // 0..1
  panText: string;
  panPos: number; // -1..1
  mute: boolean;
  solo: boolean;
  db: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

function meterGradient(kind: 'standard' | 'vocal') {
  if (kind === 'vocal') return 'linear-gradient(180deg,#ff3b6a 0%,#ff8a00 32%,#ffd400 55%,#25e27c 100%)';
  return 'linear-gradient(180deg,#ffd400 0%,#25e27c 55%,#25e27c 100%)';
}

function renderChannelStrip(channel: Channel, idx: number) {
  const eidBase = `ch-${idx}` as const;
  const isVocal = channel.name.toLowerCase() === 'vocals';
  const meterFillH = `${clamp(channel.meter) * 100}%`;
  const panLeft = `${((clamp((channel.panPos + 1) / 2) as number) * 100)}%`;

  const headerColor =
    channel.color === 'red'
      ? '#ff465b'
      : channel.color === 'yellow'
        ? '#ffd400'
        : channel.color === 'cyan'
          ? '#37e6ff'
          : channel.color === 'blue'
            ? '#7aa5ff'
            : channel.color === 'magenta'
              ? '#ff4fd1'
              : channel.color === 'purple'
                ? '#b27cff'
                : '#cfd7e6';

  const panelStyle: React.CSSProperties = {
    width: 78,
    height: 255,
    borderRadius: 18,
    background:
      'linear-gradient(180deg, rgba(18,22,35,0.95) 0%, rgba(12,14,24,0.95) 100%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
    padding: '12px 10px 10px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  };

  const meterStyle: React.CSSProperties = {
    width: 18,
    height: 128,
    borderRadius: 10,
    background: 'rgba(255,255,255,0.06)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  };

  const meterFillStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: meterFillH,
    borderRadius: 10,
    background: isVocal ? meterGradient('vocal') : meterGradient('standard'),
  };

  const panWrapStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  };

  const panTextStyle: React.CSSProperties = {
    fontSize: 10,
    color: 'rgba(205,215,235,0.85)',
    letterSpacing: 0.2,
  };

  const panTrackStyle: React.CSSProperties = {
    width: 36,
    height: 6,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.08)',
    position: 'relative',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
  };

  const panDotStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: panLeft,
    transform: 'translate(-50%,-50%)',
    width: 8,
    height: 8,
    borderRadius: 999,
    background: headerColor,
    boxShadow: `0 0 0 2px rgba(0,0,0,0.35)`,
  };

  const badgeRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    marginTop: 2,
  };

  const badgeStyle = (active: boolean, kind: 'mute' | 'solo'): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: 22,
      height: 18,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 0.3,
      border: '1px solid rgba(255,255,255,0.10)',
      background: 'rgba(255,255,255,0.04)',
      color: 'rgba(210,220,240,0.55)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
    };
    if (!active) return base;
    if (kind === 'solo') {
      return {
        ...base,
        color: '#101318',
        background: '#ffd400',
        border: '1px solid rgba(255,212,0,0.75)',
      };
    }
    return {
      ...base,
      color: '#101318',
      background: '#ff465b',
      border: '1px solid rgba(255,70,91,0.75)',
    };
  };

  const dbStyle: React.CSSProperties = {
    marginTop: 2,
    fontSize: 11,
    color: 'rgba(230,238,250,0.92)',
    fontWeight: 700,
    letterSpacing: 0.1,
  };

  const chNumStyle: React.CSSProperties = {
    fontSize: 10,
    color: 'rgba(205,215,235,0.55)',
    fontWeight: 700,
    letterSpacing: 0.35,
    marginTop: 2,
  };

  const nameStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 800,
    color: headerColor,
    letterSpacing: 0.2,
  };

  return (
    <div key={idx} data-eid={eidBase} style={panelStyle}>
      <div data-eid={`${eidBase}-number`} style={chNumStyle}>
        {channel.ch}
      </div>
      <div data-eid={`${eidBase}-name`} style={nameStyle}>
        {channel.name}
      </div>

      <div data-eid={`${eidBase}-meter`} style={meterStyle}>
        <div data-eid={`${eidBase}-meter-fill`} style={meterFillStyle} />
      </div>

      <div data-eid={`${eidBase}-pan`} style={panWrapStyle}>
        <div style={panTextStyle}>{channel.panText}</div>
        <div data-eid={`${eidBase}-pan-bar`} style={panTrackStyle}>
          <div style={panDotStyle} />
        </div>
      </div>

      <div style={badgeRowStyle}>
        <span data-eid={`${eidBase}-mute`} style={badgeStyle(channel.mute, 'mute')}>
          M
        </span>
        <span data-eid={`${eidBase}-solo`} style={badgeStyle(channel.solo, 'solo')}>
          S
        </span>
      </div>

      <div data-eid={`${eidBase}-db`} style={dbStyle}>
        {channel.db}
      </div>
    </div>
  );
}

export default function Widget() {
  const rootStyle: React.CSSProperties = {
    width: 601,
    height: 441,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg,#f3f7ff 0%, #f3f7ff 100%)',
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  };

  const shellStyle: React.CSSProperties = {
    width: 470,
    height: 420,
    borderRadius: 22,
    padding: 18,
    background:
      'radial-gradient(120% 140% at 10% 0%, rgba(45,55,110,0.45) 0%, rgba(14,16,26,0.96) 40%, rgba(10,11,20,0.98) 100%)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    position: 'relative',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  };

  const leftHeadStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: '#eaf1ff',
    fontWeight: 900,
    fontSize: 20,
    letterSpacing: 0.2,
  };

  const musicIconStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    borderRadius: 6,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7f8cff',
    fontWeight: 900,
    fontSize: 18,
    marginTop: -2,
  };

  const pillsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  };

  const pillBase: React.CSSProperties = {
    height: 26,
    padding: '0 12px',
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.2,
    border: '1px solid rgba(255,255,255,0.10)',
  };

  const projectPill: React.CSSProperties = {
    ...pillBase,
    color: '#cdd6ff',
    background: 'rgba(95,110,255,0.12)',
    border: '1px solid rgba(140,155,255,0.18)',
  };

  const bpmPill: React.CSSProperties = {
    ...pillBase,
    color: '#2a1f00',
    background: 'linear-gradient(180deg, #ffd35a 0%, #ffb500 100%)',
    border: '1px solid rgba(255,196,64,0.55)',
    boxShadow: '0 8px 18px rgba(255,190,60,0.12)',
  };

  const channelsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    paddingLeft: 2,
    paddingRight: 2,
  };

  const masterStyle: React.CSSProperties = {
    marginTop: 14,
    width: '100%',
    height: 58,
    borderRadius: 16,
    background:
      'linear-gradient(180deg, rgba(20,24,40,0.92) 0%, rgba(12,14,26,0.92) 100%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    gap: 12,
  };

  const masterLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: 96,
    color: '#cfd7ff',
    fontWeight: 900,
    letterSpacing: 0.4,
    fontSize: 14,
  };

  const speakerStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    borderRadius: 6,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8ea0ff',
    fontWeight: 900,
    fontSize: 16,
  };

  const masterMeterStyle: React.CSSProperties = {
    flex: 1,
    height: 14,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  };

  const masterMeterFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${clamp(data.master.meter) * 100}%`,
    borderRadius: 999,
    background: 'linear-gradient(90deg,#25e27c 0%,#a6e43a 38%,#ffd400 62%,#ff8a00 78%,#ff3b6a 100%)',
  };

  const masterDbStyle: React.CSSProperties = {
    width: 64,
    textAlign: 'right',
    color: 'rgba(235,242,255,0.92)',
    fontWeight: 900,
    fontSize: 14,
    letterSpacing: 0.2,
  };

  const outputStyle: React.CSSProperties = {
    marginTop: 12,
    width: '100%',
    height: 86,
    borderRadius: 16,
    background:
      'linear-gradient(180deg, rgba(20,24,40,0.92) 0%, rgba(12,14,26,0.92) 100%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  const outHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'rgba(205,215,235,0.75)',
    fontWeight: 800,
    fontSize: 13,
  };

  const headphoneStyle: React.CSSProperties = {
    width: 16,
    height: 16,
    borderRadius: 6,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9aa7bd',
    fontWeight: 900,
    fontSize: 14,
  };

  const outRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '18px 1fr 64px',
    gap: 10,
    alignItems: 'center',
  };

  const outLabelStyle: React.CSSProperties = {
    color: 'rgba(205,215,235,0.65)',
    fontWeight: 900,
    fontSize: 12,
  };

  const outMeterStyle: React.CSSProperties = {
    height: 10,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  };

  const outFill = (w: number): React.CSSProperties => ({
    height: '100%',
    width: `${clamp(w) * 100}%`,
    borderRadius: 999,
    background: 'linear-gradient(90deg,#25e27c 0%,#cfe33a 45%,#ffd400 100%)',
  });

  const outDbStyle: React.CSSProperties = {
    textAlign: 'right',
    color: 'rgba(205,215,235,0.75)',
    fontWeight: 800,
    fontSize: 12,
  };

  return (
    <section data-eid="root" style={rootStyle}>
      <div style={shellStyle}>
        <header data-eid="header" style={headerStyle}>
          <div style={leftHeadStyle}>
            <span style={musicIconStyle}>♪</span>
            <div data-eid="console-title">Mix Console</div>
          </div>
          <div style={pillsStyle}>
            <span data-eid="project-name" style={projectPill}>
              {data.projectName}
            </span>
            <span data-eid="bpm-badge" style={bpmPill}>
              {data.bpm}
            </span>
          </div>
        </header>

        <div data-eid="channels-row" style={channelsRowStyle}>
          {data.channels.map((c: Channel, i: number) => renderChannelStrip(c, i))}
        </div>

        <div data-eid="master" style={masterStyle}>
          <div data-eid="master-label" style={masterLabelStyle}>
            <span style={speakerStyle}>🔊</span>
            MASTER
          </div>
          <div data-eid="master-meter" style={masterMeterStyle}>
            <div data-eid="master-meter-fill" style={masterMeterFillStyle} />
          </div>
          <div data-eid="master-db" style={masterDbStyle}>
            {data.master.db}
          </div>
        </div>

        <div data-eid="output-section" style={outputStyle}>
          <div data-eid="output-label" style={outHeaderStyle}>
            <span style={headphoneStyle}>🎧</span>
            Stereo Out
          </div>

          <div style={outRowStyle}>
            <span data-eid="output-left-label" style={outLabelStyle}>
              L
            </span>
            <div data-eid="output-left" style={outMeterStyle}>
              <div data-eid="output-left-fill" style={outFill(data.output.left.meter)} />
            </div>
            <span data-eid="output-db-left" style={outDbStyle}>
              {data.output.left.db}
            </span>
          </div>

          <div style={outRowStyle}>
            <span data-eid="output-right-label" style={outLabelStyle}>
              R
            </span>
            <div data-eid="output-right" style={outMeterStyle}>
              <div data-eid="output-right-fill" style={outFill(data.output.right.meter)} />
            </div>
            <span data-eid="output-db-right" style={outDbStyle}>
              {data.output.right.db}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}