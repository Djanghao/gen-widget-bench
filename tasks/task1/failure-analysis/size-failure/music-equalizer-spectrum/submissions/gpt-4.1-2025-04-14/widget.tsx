import React from "react";
import data from "./data.json";
import { BarChart, Bar, XAxis, YAxis, AreaChart, Area } from "recharts";
import {
  Volume2,
  SkipBack,
  Play,
  SkipForward,
  Shuffle,
  Repeat,
  Volume1,
  Music,
} from "lucide-react";

const spectrumColors = [
  "#3ADE72","#3ADE72","#26DC57","#4BDC73",
  "#81D859","#CBDF45","#FFDB41","#FFCA33","#FFC132","#FFB51F","#FFB00C",
  "#FFA50C","#FF9C07","#FF8D0B","#FF780F","#FF5F18","#FF4223","#FF2630",
  "#FF1C27","#F92226","#EC2246","#E12860","#D92A74","#C1327B"
];

const spectrumData = data.spectrumBands.map((y, i) => ({
  name: data.frequencyLabels[i] || "",
  value: y,
  color: spectrumColors[i],
}));

const waveformChartData = data.waveform.map((y, i) => ({
  value: y,
}));

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 480,
        background: "linear-gradient(180deg, #23153B 0%, #23153B 60%, #181027 100%)",
        borderRadius: 24,
        padding: "24px 20px 20px 24px",
        fontFamily: '"Inter",sans-serif',
        color: "#fff",
        position: "relative",
        boxSizing: "border-box",
        boxShadow: "0 2px 10px 0 #0003",
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <div style={{ marginRight: 12, display: "flex", alignItems: "center" }}>
          <Music size={20} color="#A78BFA" style={{marginRight: 8, verticalAlign:"middle"}} />
          <div
            data-eid="title"
            style={{
              fontWeight: 700,
              fontSize: 22,
              lineHeight: "25px",
              letterSpacing: "-0.5px",
              marginRight: 12,
              marginTop: 3,
            }}
          >
            Audio Spectrum
          </div>
        </div>
        <span
          data-eid="badge-bitrate"
          style={{
            background: "#443d66",
            color: "#d6daf0",
            borderRadius: 16,
            fontWeight: 600,
            fontSize: 13,
            padding: "2px 13px 2px 12px",
            marginLeft: "auto",
            marginRight: 10,
            letterSpacing: "0.2px",
          }}
        >
          320kbps
        </span>
        <span
          data-eid="badge-format"
          style={{
            background: "#11d152",
            color: "#20211d",
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 13,
            padding: "2px 16px 2px 14px",
            letterSpacing: "0.2px",
          }}
        >
          FLAC
        </span>
      </header>
      {/* Spectrum Section */}
      <div data-eid="spectrum-section" style={{ marginTop: 4, marginBottom: 0 }}>
        {/* dB Scale */}
        <div
          data-eid="db-scale"
          style={{
            position: "relative",
            left: 0,
            fontSize: 12,
            width: 32,
            height: 192,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#B4B8DE",
            position: "absolute",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <span data-eid="db-label-plus12" style={{marginBottom: 5}}>+12</span>
          <span data-eid="db-label-plus6" style={{marginBottom: 1}}>+6</span>
          <span data-eid="db-label-0" style={{marginBottom: 1}}>0</span>
          <span data-eid="db-label-minus6" style={{marginBottom: 1}}>-6</span>
          <span data-eid="db-label-minus12">-12</span>
        </div>
        {/* Spectrum Bar Chart */}
        <div
          data-eid="spectrum-chart"
          style={{
            marginLeft: 38,
            marginTop: 0,
            marginBottom: 0,
            width: 400,
            height: 170,
            position: "relative",
          }}
        >
          <BarChart
            width={386}
            height={172}
            data={spectrumData}
            margin={{ top: 10, right: 6, left: 0, bottom: 0 }}
            barGap={2}
          >
            <YAxis
              axisLine={false}
              tick={false}
              ticks={[]}
              domain={[-12, 12]}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
              barSize={13}
              fill="#888"
            >
              {spectrumData.map((entry, index) => (
                <cell
                  key={index}
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={2}
                  radius={[6,6,0,0]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        {/* Frequency Labels */}
        <div
          data-eid="freq-labels"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-around",
            width: 400,
            marginLeft: 38,
            fontSize: 12.3,
            color: "#B4B8DE",
            marginTop: -4,
            marginBottom: 10,
            position: "relative",
            zIndex: 3,
            letterSpacing: "-0.2px"
          }}
        >
          {[...data.frequencyLabels].map((lbl, i) => (
            <span
              key={i}
              data-eid={`freq-label-${i}`}
              style={{
                flex: 1,
                textAlign: "center",
                whiteSpace: "nowrap",
                fontFeatureSettings: "'tnum'",
                fontVariantNumeric: "tabular-nums",
                fontSize: i >=5 ? 12.1 : 12.3
              }}
            >
              {lbl}
            </span>
          ))}
        </div>
      </div>
      {/* Waveform Section */}
      <div data-eid="waveform-section" style={{ marginTop: 8, marginBottom: 0 }}>
        <div
          data-eid="waveform-title"
          style={{
            fontWeight: 600,
            color: "#DBDEFE",
            fontSize: 14.5,
            marginBottom: 2,
            letterSpacing: 0.15,
          }}
        >
          Waveform
        </div>
        <div
          data-eid="waveform-chart"
          style={{
            width: 400,
            height: 52,
            marginLeft: 0,
            marginBottom: 2,
            marginTop: 0,
            position: "relative",
          }}
        >
          <AreaChart
            width={400}
            height={54}
            data={waveformChartData}
            margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
          >
            <Area
              type="monotone"
              dataKey="value"
              stroke="#9B91F7"
              strokeWidth={2}
              fill="none"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
          <div style={{
            borderTop: "1px solid #43416B",
            position: "absolute",
            left: 0, right: 0, bottom: 6, zIndex: -1
          }} />
        </div>
      </div>
      {/* Channel meters */}
      <div data-eid="channel-meters" style={{
        display:"flex", alignItems:"center", marginTop: -2, marginLeft: 0, marginRight: 0, marginBottom: 10, width: 400
      }}>
        {/* Left meter */}
        <div
          data-eid="meter-left"
          style={{ display: "flex", alignItems: "center", marginRight: 12, width: 197 }}
        >
          <span data-eid="meter-left-label" style={{ fontWeight: 700, fontSize: 13, color: "#C7DED2", marginRight: 4 }}>L</span>
          <div data-eid="meter-left-bar" style={{ background: "#23223a", borderRadius: 8, width: 130, height: 12, position: "relative", marginRight: 6, overflow: "hidden" }}>
            <div data-eid="meter-left-fill"
              style={{
                height: "100%",
                width: `${data.channelMeters.left.pct}%`,
                background: "linear-gradient(90deg, #3ADE72 0%, #FFBA2F 50%, #EC2246 100%)",
                borderRadius: 8,
                transition: "width 120ms",
              }}
            />
          </div>
          <span data-eid="meter-left-value" style={{ fontWeight: 600, fontSize: 13, marginLeft: 0, color: "#B1B7D6" }}>
            {data.channelMeters.left.db}
          </span>
        </div>
        {/* Right meter */}
        <div
          data-eid="meter-right"
          style={{ display: "flex", alignItems: "center", width: 180 }}
        >
          <span data-eid="meter-right-label" style={{ fontWeight: 700, fontSize: 13, color: "#C7DED2", marginRight: 4 }}>R</span>
          <div data-eid="meter-right-bar" style={{ background: "#23223a", borderRadius: 8, width: 130, height: 12, position: "relative", marginRight: 6, overflow: "hidden" }}>
            <div data-eid="meter-right-fill"
              style={{
                height: "100%",
                width: `${data.channelMeters.right.pct}%`,
                background: "linear-gradient(90deg, #3ADE72 0%, #FFBA2F 50%, #EC2246 100%)",
                borderRadius: 8,
                transition: "width 120ms",
              }}
            />
          </div>
          <span data-eid="meter-right-value" style={{ fontWeight: 600, fontSize: 13, marginLeft: 0, color: "#B1B7D6" }}>
            {data.channelMeters.right.db}
          </span>
        </div>
      </div>
      {/* Now Playing Card */}
      <div data-eid="now-playing"
        style={{
          background: "rgba(35, 21, 59, 0.9)",
          borderRadius: 16,
          marginTop: 8,
          marginBottom: 9,
          padding: "15px 16px 16px 15px",
          boxShadow: "0 0 0 1.5px #433a625C",
          width: 410,
        }}
      >
        <div data-eid="now-playing-label"
          style={{ color: "#B2AAC7", fontWeight: 700, fontSize: 12.7, letterSpacing: 0.9, marginBottom: 8 }}>
          NOW PLAYING
        </div>
        <div style={{
          display: "flex",
          alignItems: "flex-start",
        }}>
          {/* Album Art */}
          <div data-eid="album-art"
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(135deg, #FD5CFD 0%, #5F54E8 80%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
              fontSize: 27
            }}>
              <Music size={28} color="#fff" style={{opacity:0.78}} />
          </div>
          {/* Track Info */}
          <div data-eid="track-info"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}>
            <div data-eid="song-title" style={{ fontWeight: 700, fontSize: 16, marginBottom: 0.5, color: "#fff" }}>
              Midnight Reverie
            </div>
            <div data-eid="artist-name" style={{ fontWeight: 450, fontSize: 13.7, color: "#C8BDF1", marginBottom: -2 }}>
              Aurora Synth
            </div>
            <div data-eid="album-name" style={{ fontWeight: 500, fontSize: 12.7, color: "#7DE9F6", marginBottom: 2 }}>
              Neon Dreams
            </div>
            {/* Bar */}
            <div data-eid="duration-bar"
              style={{
                position: "relative", width: "100%", height: 4, background: "#262c41", borderRadius: 3, margin: "3px 0 2px 0"
              }}
            >
              <div
                data-eid="duration-bar-fill"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${(154/292)*100}%`,
                  background: "linear-gradient(90deg,#A967F4 65%,#F875ED 120%)",
                  borderRadius: 3,
                }}
              />
            </div>
            {/* times */}
            <div data-eid="duration-times"
              style={{
                marginTop: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                color: "#BBC5DE",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.16px"
              }}
            >
              <span data-eid="duration-current">2:34</span>
              <span data-eid="duration-total">4:52</span>
            </div>
          </div>
        </div>
      </div>
      {/* Playback Controls */}
      <div data-eid="playback-controls" style={{
        display: "flex",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0,
        height: 56,
        width: 412,
        paddingLeft: 5,
      }}>
        <span data-eid="btn-shuffle" style={{marginRight:20, cursor:"pointer",color:"#9C8ECB"}}>
          <Shuffle size={22}/>
        </span>
        <span data-eid="btn-prev" style={{marginRight:20,cursor:"pointer",color:"#9C8ECB"}}>
          <SkipBack size={22} />
        </span>
        <span data-eid="btn-play"
          style={{
            background: "radial-gradient(closest-side,#5B44D9 60%,#3C229B 110%)",
            borderRadius: "50%", width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginRight: 20, boxShadow: "0px 0px 0 2px #403065",
            cursor:"pointer"
          }}>
          <Play size={26} style={{marginLeft: 2}}/>
        </span>
        <span data-eid="btn-next" style={{marginRight:20, cursor:"pointer", color:"#9C8ECB"}}>
          <SkipForward size={22} />
        </span>
        <span data-eid="btn-repeat" style={{marginRight:16,cursor:"pointer",color:"#9C8ECB"}}>
          <Repeat size={22}/>
        </span>
        <div data-eid="volume-control"
          style={{
            marginLeft:16,
            display:"flex", alignItems:"center", flex:1,
            minWidth: 0,
          }}
        >
          <span data-eid="volume-icon" style={{marginRight:8, color:"#DBDEFE", fontSize:18}}><Volume1 size={18}/></span>
          <div
            data-eid="volume-bar"
            style={{
              background: "#262c41",
              width: 72,
              height: 5,
              borderRadius: 3,
              marginRight: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              data-eid="volume-bar-fill"
              style={{
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: `${data.volume.percent}%`,
                background: "linear-gradient(90deg, #AE85FF 0%, #F875ED 100%)",
                borderRadius: 3,
                height: "100%",
              }}
            />
          </div>
          <span data-eid="volume-value" style={{
            color: "#BEB3CF",
            fontSize: 13.1,
            fontWeight: 500,
            letterSpacing: "-0.17px",
            width: 32,
            textAlign: "left"
          }}>{data.volume.str}</span>
        </div>
      </div>
    </section>
  );
}