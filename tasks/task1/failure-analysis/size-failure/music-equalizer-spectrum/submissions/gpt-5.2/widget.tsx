// submissions/<your-model-name>/widget.tsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Volume2,
  Shuffle,
  SkipBack,
  Play,
  SkipForward,
  Repeat,
  Music2,
} from "lucide-react";
import data from "./data.json";

export default function Widget() {
  const spectrum = data.spectrumBands;

  const waveform = useMemo(() => {
    // build a smooth waveform similar to the target
    const n = 64;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const y =
        0.62 +
        0.22 * Math.sin(t * Math.PI * 2.2 + 0.5) +
        0.08 * Math.sin(t * Math.PI * 5.2);
      pts.push({ x: i, y });
    }
    return pts;
  }, []);

  const styles = {
    root: {
      width: 480,
      height: 760,
      padding: 18,
      boxSizing: "border-box" as const,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
      color: "#E9E7FF",
      background:
        "radial-gradient(120% 90% at 10% 0%, rgba(148, 112, 255, 0.22) 0%, rgba(20, 10, 40, 0.0) 45%), radial-gradient(120% 90% at 90% 0%, rgba(40, 220, 160, 0.10) 0%, rgba(20, 10, 40, 0.0) 45%), linear-gradient(180deg, #120A26 0%, #0E0720 52%, #0B0619 100%)",
      borderRadius: 0,
      position: "relative" as const,
      overflow: "hidden" as const,
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    titleLeft: { display: "flex", alignItems: "center", gap: 10 },
    title: {
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: 0.2,
      color: "#EDEBFF",
    },
    badges: { display: "flex", alignItems: "center", gap: 10 },
    badge: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 0.4,
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.06)",
      color: "rgba(236, 234, 255, 0.85)",
    },
    badgeFlac: {
      fontSize: 12,
      fontWeight: 800,
      padding: "4px 12px",
      borderRadius: 999,
      border: "1px solid rgba(61, 255, 173, 0.25)",
      background: "rgba(18, 255, 170, 0.10)",
      color: "#3DFFAD",
    },
    spectrumWrap: {
      position: "relative" as const,
      height: 210,
      marginTop: 6,
      marginBottom: 6,
      borderRadius: 14,
    },
    gridHint: {
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: 14,
      bottom: 36,
      pointerEvents: "none" as const,
      opacity: 0.55,
    },
    gridLine: (top: number) => ({
      position: "absolute" as const,
      left: 34,
      right: 0,
      top,
      height: 1,
      background: "rgba(255,255,255,0.08)",
      borderTop: "1px dashed rgba(255,255,255,0.10)",
    }),
    dbScale: {
      position: "absolute" as const,
      left: 0,
      top: 10,
      bottom: 42,
      width: 34,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      alignItems: "flex-start",
      color: "rgba(227,224,255,0.55)",
      fontSize: 12,
      paddingLeft: 2,
      boxSizing: "border-box" as const,
    },
    chartBox: {
      position: "absolute" as const,
      left: 34,
      right: 0,
      top: 0,
      bottom: 34,
      paddingTop: 8,
      boxSizing: "border-box" as const,
    },
    freqRow: {
      position: "absolute" as const,
      left: 34,
      right: 0,
      bottom: 0,
      height: 34,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingRight: 6,
      boxSizing: "border-box" as const,
      color: "rgba(227,224,255,0.50)",
      fontSize: 11,
    },
    waveformSection: { marginTop: 8, marginBottom: 10 },
    sectionLabel: {
      fontSize: 13,
      fontWeight: 700,
      color: "rgba(227,224,255,0.65)",
      marginBottom: 6,
    },
    waveformBox: {
      height: 78,
      borderRadius: 12,
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      padding: "8px 10px",
      boxSizing: "border-box" as const,
    },
    meters: { marginTop: 10, display: "flex", flexDirection: "column" as const, gap: 8 },
    meterRow: {
      display: "grid",
      gridTemplateColumns: "16px 1fr 56px",
      alignItems: "center",
      gap: 10,
      color: "rgba(227,224,255,0.70)",
      fontSize: 12,
    },
    meterLabel: { color: "rgba(227,224,255,0.55)", fontWeight: 700 },
    meterBar: {
      height: 8,
      borderRadius: 999,
      background: "rgba(255,255,255,0.08)",
      overflow: "hidden" as const,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
    },
    meterFill: (pct: number, hue: "green" | "orange") => ({
      width: `${pct}%`,
      height: "100%",
      borderRadius: 999,
      background:
        hue === "green"
          ? "linear-gradient(90deg, #27E58B 0%, #FFC23A 68%, #FF4B4B 100%)"
          : "linear-gradient(90deg, #27E58B 0%, #FFB22A 64%, #FF4B4B 100%)",
    }),
    nowPlaying: {
      marginTop: 12,
      borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      padding: 14,
      boxSizing: "border-box" as const,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    },
    nowPlayingLabel: {
      fontSize: 11,
      letterSpacing: 1.0,
      fontWeight: 800,
      color: "rgba(227,224,255,0.42)",
      marginBottom: 10,
    },
    npRow: { display: "grid", gridTemplateColumns: "56px 1fr", gap: 12, alignItems: "center" },
    albumArt: {
      width: 56,
      height: 56,
      borderRadius: 12,
      background:
        "radial-gradient(90% 90% at 30% 20%, rgba(255, 77, 170, 0.9) 0%, rgba(255, 133, 72, 0.85) 35%, rgba(140, 90, 255, 0.9) 75%, rgba(44, 22, 78, 0.9) 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.10)",
    },
    trackTitle: { fontSize: 18, fontWeight: 800, marginBottom: 2, color: "#F0EEFF" },
    trackMeta: { fontSize: 12, color: "rgba(227,224,255,0.70)", marginBottom: 2 },
    trackAlbum: { fontSize: 12, color: "rgba(227,224,255,0.35)", marginBottom: 10 },
    durationBar: {
      height: 4,
      borderRadius: 999,
      background: "rgba(255,255,255,0.10)",
      overflow: "hidden" as const,
    },
    durationFill: (pct: number) => ({
      width: `${pct}%`,
      height: "100%",
      borderRadius: 999,
      background: "linear-gradient(90deg, rgba(177, 129, 255, 1) 0%, rgba(209, 175, 255, 1) 100%)",
      boxShadow: "0 0 0 1px rgba(210,170,255,0.10)",
    }),
    durationTimes: {
      marginTop: 8,
      display: "flex",
      justifyContent: "space-between",
      fontSize: 11,
      color: "rgba(227,224,255,0.55)",
    },
    controls: {
      marginTop: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
      color: "rgba(236,234,255,0.78)",
    },
    iconBtn: {
      width: 26,
      height: 26,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.95,
    },
    playBtn: {
      width: 40,
      height: 40,
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
    },
    vol: { marginLeft: 10, display: "flex", alignItems: "center", gap: 10, minWidth: 150 },
    volBar: {
      width: 78,
      height: 4,
      borderRadius: 999,
      background: "rgba(255,255,255,0.10)",
      overflow: "hidden" as const,
    },
    volFill: (pct: number) => ({
      width: `${pct}%`,
      height: "100%",
      borderRadius: 999,
      background: "linear-gradient(90deg, rgba(177, 129, 255, 1) 0%, rgba(209, 175, 255, 1) 100%)",
    }),
    volVal: { fontSize: 11, color: "rgba(227,224,255,0.55)" },
  };

  const freqLabels = data.frequencyLabels;
  const dbLabels = data.dbScale;

  return (
    <section data-eid="root" style={styles.root}>
      <header data-eid="header" style={styles.headerRow}>
        <div style={styles.titleLeft}>
          <Music2 size={18} color="rgba(196,182,255,0.9)" />
          <div data-eid="title" style={styles.title}>
            {data.title}
          </div>
        </div>
        <div style={styles.badges}>
          <span data-eid="badge-bitrate" style={styles.badge}>
            {data.bitrate}
          </span>
          <span data-eid="badge-format" style={styles.badgeFlac}>
            {data.format}
          </span>
        </div>
      </header>

      <div data-eid="spectrum-section" style={styles.spectrumWrap}>
        <div style={styles.gridHint}>
          <div style={styles.gridLine(10)} />
          <div style={styles.gridLine(52)} />
          <div style={styles.gridLine(94)} />
          <div style={styles.gridLine(136)} />
        </div>

        <div data-eid="db-scale" style={styles.dbScale}>
          <span data-eid="db-label-plus12">{dbLabels[0]}</span>
          <span data-eid="db-label-plus6">{dbLabels[1]}</span>
          <span data-eid="db-label-0">{dbLabels[2]}</span>
          <span data-eid="db-label-minus6">{dbLabels[3]}</span>
          <span data-eid="db-label-minus12">{dbLabels[4]}</span>
        </div>

        <div data-eid="spectrum-chart" style={styles.chartBox}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spectrum} margin={{ top: 10, right: 8, bottom: 0, left: 0 }}>
              <XAxis hide dataKey="band" />
              <YAxis hide domain={[-12, 12]} />
              <Tooltip content={() => null} />
              <Bar
                dataKey="value"
                isAnimationActive={false}
                radius={[3, 3, 0, 0]}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.5}
              >
                {spectrum.map((d, i) => (
                  <React.Fragment key={i}>
                    {/* Recharts cell needs import; avoid by using per-item fill via dataKey? Use Bar's fill via data */}
                  </React.Fragment>
                ))}
              </Bar>
              <Bar
                dataKey="value"
                isAnimationActive={false}
                radius={[3, 3, 0, 0]}
                fill="rgba(255,255,255,0.0)"
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Overlay custom bars to match multicolor groups precisely */}
          <div
            style={{
              position: "absolute",
              inset: 8,
              bottom: 6,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 5,
              padding: "0 6px 0 6px",
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          >
            {spectrum.map((d, idx) => {
              const h = ((d.value + 12) / 24) * 100;
              const fill =
                d.group === "low"
                  ? "#2ED27D"
                  : d.group === "mid"
                    ? "#E0B022"
                    : "#D54A4A";
              const bg =
                d.group === "low"
                  ? "linear-gradient(180deg, rgba(46,210,125,1) 0%, rgba(46,210,125,0.95) 100%)"
                  : d.group === "mid"
                    ? "linear-gradient(180deg, rgba(224,176,34,1) 0%, rgba(224,176,34,0.95) 100%)"
                    : "linear-gradient(180deg, rgba(213,74,74,1) 0%, rgba(213,74,74,0.95) 100%)";
              return (
                <div
                  key={idx}
                  style={{
                    flex: "1 1 0",
                    maxWidth: 18,
                    minWidth: 10,
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${h}%`,
                      borderRadius: 4,
                      background: bg,
                      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.10)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div data-eid="freq-labels" style={styles.freqRow}>
          <span data-eid="freq-label-0">{freqLabels[0]}</span>
          <span data-eid="freq-label-1">{freqLabels[1]}</span>
          <span data-eid="freq-label-2">{freqLabels[2]}</span>
          <span data-eid="freq-label-3">{freqLabels[3]}</span>
          <span data-eid="freq-label-4">{freqLabels[4]}</span>
          <span data-eid="freq-label-5">{freqLabels[5]}</span>
          <span data-eid="freq-label-6">{freqLabels[6]}</span>
          <span data-eid="freq-label-7">{freqLabels[7]}</span>
          <span data-eid="freq-label-8">{freqLabels[8]}</span>
          <span data-eid="freq-label-9">{freqLabels[9]}</span>
        </div>
      </div>

      <div data-eid="waveform-section" style={styles.waveformSection}>
        <div data-eid="waveform-title" style={styles.sectionLabel}>
          {data.waveformTitle}
        </div>
        <div data-eid="waveform-chart" style={styles.waveformBox}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={waveform} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
              <defs>
                <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(196, 162, 255, 0.85)" />
                  <stop offset="60%" stopColor="rgba(176, 138, 255, 0.95)" />
                  <stop offset="100%" stopColor="rgba(210, 180, 255, 0.85)" />
                </linearGradient>
                <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(168, 135, 255, 0.18)" />
                  <stop offset="100%" stopColor="rgba(168, 135, 255, 0.00)" />
                </linearGradient>
              </defs>
              <XAxis hide dataKey="x" />
              <YAxis hide domain={[0.2, 1.1]} />
              <Tooltip content={() => null} />
              <Area
                type="monotone"
                dataKey="y"
                stroke="url(#waveStroke)"
                strokeWidth={2}
                fill="url(#waveFill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="channel-meters" style={styles.meters}>
        <div data-eid="meter-left" style={styles.meterRow}>
          <span data-eid="meter-left-label" style={styles.meterLabel}>
            {data.meters.left.label}
          </span>
          <div data-eid="meter-left-bar" style={styles.meterBar}>
            <div
              data-eid="meter-left-fill"
              style={styles.meterFill(data.meters.left.percent, "green")}
            />
          </div>
          <span data-eid="meter-left-value" style={{ textAlign: "right", color: "rgba(227,224,255,0.60)" }}>
            {data.meters.left.value}
          </span>
        </div>

        <div data-eid="meter-right" style={styles.meterRow}>
          <span data-eid="meter-right-label" style={styles.meterLabel}>
            {data.meters.right.label}
          </span>
          <div data-eid="meter-right-bar" style={styles.meterBar}>
            <div
              data-eid="meter-right-fill"
              style={styles.meterFill(data.meters.right.percent, "orange")}
            />
          </div>
          <span data-eid="meter-right-value" style={{ textAlign: "right", color: "rgba(227,224,255,0.60)" }}>
            {data.meters.right.value}
          </span>
        </div>
      </div>

      <div data-eid="now-playing" style={styles.nowPlaying}>
        <div data-eid="now-playing-label" style={styles.nowPlayingLabel}>
          {data.nowPlaying.label}
        </div>

        <div style={styles.npRow}>
          <div data-eid="album-art" style={styles.albumArt}>
            <Music2 size={22} color="rgba(255,255,255,0.90)" />
          </div>

          <div data-eid="track-info">
            <div data-eid="song-title" style={styles.trackTitle}>
              {data.nowPlaying.songTitle}
            </div>
            <div data-eid="artist-name" style={styles.trackMeta}>
              {data.nowPlaying.artist}
            </div>
            <div data-eid="album-name" style={styles.trackAlbum}>
              {data.nowPlaying.album}
            </div>

            <div data-eid="duration-bar" style={styles.durationBar}>
              <div
                data-eid="duration-bar-fill"
                style={styles.durationFill(data.nowPlaying.progressPercent)}
              />
            </div>

            <div data-eid="duration-times" style={styles.durationTimes}>
              <span data-eid="duration-current">{data.nowPlaying.currentTime}</span>
              <span data-eid="duration-total">{data.nowPlaying.totalTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div data-eid="playback-controls" style={styles.controls}>
        <span data-eid="btn-shuffle" style={styles.iconBtn}>
          <Shuffle size={18} />
        </span>
        <span data-eid="btn-prev" style={styles.iconBtn}>
          <SkipBack size={20} />
        </span>
        <span data-eid="btn-play" style={styles.playBtn}>
          <Play size={18} fill="rgba(236,234,255,0.85)" />
        </span>
        <span data-eid="btn-next" style={styles.iconBtn}>
          <SkipForward size={20} />
        </span>
        <span data-eid="btn-repeat" style={styles.iconBtn}>
          <Repeat size={18} />
        </span>

        <div data-eid="volume-control" style={styles.vol}>
          <span data-eid="volume-icon" style={{ display: "flex", alignItems: "center" }}>
            <Volume2 size={18} />
          </span>
          <div data-eid="volume-bar" style={styles.volBar}>
            <div data-eid="volume-bar-fill" style={styles.volFill(data.volume.percent)} />
          </div>
          <span data-eid="volume-value" style={styles.volVal}>
            {data.volume.label}
          </span>
        </div>
      </div>

      {/* Hidden-required elements not present in target crop but required by catalog */}
      <div data-eid="audio-stats" style={{ display: "none" }}>
        <div data-eid="stat-sample-rate">
          <span data-eid="stat-sample-rate-label">Sample Rate</span>
          <span data-eid="stat-sample-rate-value">96 kHz</span>
        </div>
        <div data-eid="stat-bit-depth">
          <span data-eid="stat-bit-depth-label">Bit Depth</span>
          <span data-eid="stat-bit-depth-value">24-bit</span>
        </div>
        <div data-eid="stat-channels">
          <span data-eid="stat-channels-label">Channels</span>
          <span data-eid="stat-channels-value">Stereo</span>
        </div>
        <div data-eid="stat-dynamic-range">
          <span data-eid="stat-dynamic-range-label">Dynamic Range</span>
          <span data-eid="stat-dynamic-range-value">14.2 dB</span>
        </div>
        <div data-eid="stat-codec">
          <span data-eid="stat-codec-label">Codec</span>
          <span data-eid="stat-codec-value">FLAC</span>
        </div>
        <div data-eid="stat-file-size">
          <span data-eid="stat-file-size-label">File Size</span>
          <span data-eid="stat-file-size-value">42.3 MB</span>
        </div>
      </div>

      <div data-eid="presets-section" style={{ display: "none" }}>
        <div data-eid="presets-label">EQ Presets</div>
        <div data-eid="preset-row">
          <span data-eid="preset-flat">Flat</span>
          <span data-eid="preset-rock">Rock</span>
          <span data-eid="preset-jazz">Jazz</span>
          <span data-eid="preset-classical">Classical</span>
          <span data-eid="preset-vocal">Vocal</span>
          <span data-eid="preset-bass">Bass Boost</span>
        </div>
      </div>

      <div data-eid="queue-section" style={{ display: "none" }}>
        <div data-eid="queue-title">Up Next</div>
        <div data-eid="queue-item-0">
          <span data-eid="queue-item-0-title">Solar Winds</span>
          <span data-eid="queue-item-0-artist">Neon Pulse</span>
          <span data-eid="queue-item-0-duration">3:45</span>
        </div>
        <div data-eid="queue-item-1">
          <span data-eid="queue-item-1-title">Crystal Rain</span>
          <span data-eid="queue-item-1-artist">Echo Wave</span>
          <span data-eid="queue-item-1-duration">5:12</span>
        </div>
        <div data-eid="queue-item-2">
          <span data-eid="queue-item-2-title">Deep Blue</span>
          <span data-eid="queue-item-2-artist">Synth Ocean</span>
          <span data-eid="queue-item-2-duration">4:08</span>
        </div>
      </div>
    </section>
  );
}