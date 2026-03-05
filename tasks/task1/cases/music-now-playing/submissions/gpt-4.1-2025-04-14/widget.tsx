import React from "react";
import data from "./data.json";
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Music } from "lucide-react";

export default function Widget() {
  // For icon sizes
  const iconSize = 28;
  const smallIconSize = 22;

  return (
    <section
      data-eid="root"
      style={{
        width: 380,
        background: "linear-gradient(180deg, #212A3B 80%, #192138 100%)",
        borderRadius: 32,
        padding: 0,
        boxShadow: "0 2px 24px rgba(0,0,0,0.13)",
        margin: "24px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      {/* Album Art */}
      <div
        data-eid="album-art"
        style={{
          width: 320,
          height: 180,
          marginTop: 14,
          borderRadius: 20,
          background:
            "linear-gradient(135deg, #F13E5C 0%, #9846E1 50%, #3553B1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Music
          color="white"
          strokeWidth={2.2}
          size={56}
          style={{ opacity: 0.9 }}
        />
      </div>

      {/* Track Info */}
      <div
        data-eid="track-info"
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 24,
          marginBottom: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          data-eid="track-name"
          style={{
            fontWeight: 700,
            fontSize: 26,
            marginBottom: 2,
            letterSpacing: -0.7,
          }}
        >
          {data.trackName}
        </div>
        <div
          data-eid="artist-name"
          style={{
            fontSize: 18,
            fontWeight: 400,
            opacity: 0.95,
            marginBottom: 1,
          }}
        >
          {data.artistName}
        </div>
        <div
          data-eid="album-name"
          style={{
            fontSize: 15,
            color: "#b2bcce",
            letterSpacing: 0,
            fontWeight: 400,
            marginBottom: 2,
            marginTop: 3,
          }}
        >
          {data.albumName}
        </div>
      </div>

      {/* Progress */}
      <div
        data-eid="progress-section"
        style={{
          width: 325,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 0 6px 0",
        }}
      >
        <div
          data-eid="progress-bar"
          style={{
            width: "100%",
            height: 6,
            borderRadius: 4,
            background: "#3b4160",
            overflow: "hidden",
            position: "relative",
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              width: `${(data.elapsedSec / data.totalSec) * 100}%`,
              background:
                "linear-gradient(90deg, #F13E5C 58%, #B03BCD 100%)",
              height: "100%",
              borderRadius: 4,
              position: "absolute",
              left: 0,
              top: 0,
              transition: "width 0.2s",
            }}
          ></div>
        </div>
        <div
          data-eid="time-display"
          style={{
            width: "100%",
            marginTop: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "#b2bcce",
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0,
          }}
        >
          <span data-eid="elapsed-time" style={{}}>{data.elapsed}</span>
          <span data-eid="total-time" style={{}}>{data.total}</span>
        </div>
      </div>

      {/* Controls */}
      <div
        data-eid="controls"
        style={{
          margin: "22px 0 0 0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 18,
          justifyContent: "center",
        }}
      >
        <span
          data-eid="btn-shuffle"
          style={{
            display: "flex",
            alignItems: "center",
            opacity: 0.84,
            color: "#b2bcce",
            cursor: "pointer"
          }}
        >
          <Shuffle size={smallIconSize} />
        </span>
        <span
          data-eid="btn-prev"
          style={{
            display: "flex",
            alignItems: "center",
            opacity: 0.92,
            color: "#b2bcce",
            cursor: "pointer"
          }}
        >
          <SkipBack size={smallIconSize} />
        </span>
        <span
          data-eid="btn-play"
          style={{
            background:
              "linear-gradient(135deg, #F13E5C 40%, #B03BCD 96%)",
            borderRadius: "50%",
            width: 49,
            height: 49,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 6px",
            boxShadow: "0 2px 16px rgba(241,56,92,0.21)",
            cursor: "pointer"
          }}
        >
          <Pause color="white" size={iconSize} strokeWidth={2.1} />
        </span>
        <span
          data-eid="btn-next"
          style={{
            display: "flex",
            alignItems: "center",
            opacity: 0.92,
            color: "#b2bcce",
            cursor: "pointer"
          }}
        >
          <SkipForward size={smallIconSize} />
        </span>
        <span
          data-eid="btn-repeat"
          style={{
            display: "flex",
            alignItems: "center",
            opacity: 0.82,
            color: "#b2bcce",
            cursor: "pointer"
          }}
        >
          <Repeat size={smallIconSize} />
        </span>
      </div>

      {/* Queue */}
      <div
        data-eid="queue-section"
        style={{
          width: 320,
          marginTop: 32,
          marginBottom: 12,
        }}
      >
        <div
          data-eid="queue-label"
          style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#b2bcce",
            letterSpacing: 1.3,
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          UP NEXT
        </div>
        {/* Queue Items */}
        {[0, 1, 2].map(i => (
          <div
            data-eid={`queue-item-${i}`}
            key={i}
            style={{
              background: "rgba(39,53,81,0.77)",
              borderRadius: 11,
              padding: "13px 17px 10px 18px",
              display: "flex",
              alignItems: "center",
              marginBottom: i !== 2 ? 9 : 0,
              boxSizing: "border-box"
            }}
          >
            <div style={{
              width: 22,
              fontSize: 15,
              marginRight: 16,
              color: "#b2bcce",
              fontWeight: 600,
              textAlign: "right",
              alignSelf: "flex-start"
            }}>
              {i + 1}
            </div>
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 0,
                color: "#fff",
                letterSpacing: -0.2
              }}>
                {data.queue[i].track}
              </div>
              <div style={{
                fontWeight: 400,
                fontSize: 15,
                color: "#b2bcce",
                letterSpacing: 0.1,
                marginTop: 0,
              }}>
                {data.queue[i].artist}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}