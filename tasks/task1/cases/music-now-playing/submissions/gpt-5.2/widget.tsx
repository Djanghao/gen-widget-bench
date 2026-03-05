// submissions/chatgpt/widget.tsx
import React from "react";
import {
  Music2,
  Shuffle,
  SkipBack,
  Pause,
  SkipForward,
  Repeat,
} from "lucide-react";
import data from "./data.json";

export default function Widget() {
  const progressPct =
    data.totalSeconds > 0
      ? Math.max(0, Math.min(1, data.elapsedSeconds / data.totalSeconds)) * 100
      : 0;

  return (
    <section
      data-eid="root"
      style={{
        width: 360,
        height: 607,
        borderRadius: 26,
        background:
          "radial-gradient(120% 120% at 20% 0%, rgba(84,120,255,0.18) 0%, rgba(0,0,0,0) 42%), radial-gradient(120% 120% at 80% 30%, rgba(255,76,142,0.12) 0%, rgba(0,0,0,0) 45%), linear-gradient(180deg, #0b1426 0%, #0c1c33 35%, #0a1a2f 100%)",
        boxShadow:
          "0 16px 28px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)",
        color: "#eaf0ff",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: 18,
          paddingTop: 18,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          data-eid="album-art"
          style={{
            height: 230,
            borderRadius: 20,
            background:
              "linear-gradient(135deg, #d84a69 0%, #4f3a91 45%, #0a2f62 100%)",
            position: "relative",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Music2 size={46} color="rgba(255,255,255,0.92)" />
        </div>

        <div
          data-eid="track-info"
          style={{
            paddingTop: 18,
            textAlign: "center",
          }}
        >
          <div
            data-eid="track-name"
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 0.2,
              color: "rgba(255,255,255,0.95)",
              marginBottom: 4,
            }}
          >
            {data.trackName}
          </div>
          <div
            data-eid="artist-name"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(210,224,255,0.85)",
              marginBottom: 6,
            }}
          >
            {data.artistName}
          </div>
          <div
            data-eid="album-name"
            style={{
              fontSize: 12,
              color: "rgba(210,224,255,0.55)",
            }}
          >
            {data.albumName}
          </div>
        </div>

        <div
          data-eid="progress-section"
          style={{
            paddingTop: 14,
          }}
        >
          <div
            data-eid="progress-bar"
            style={{
              height: 4,
              borderRadius: 999,
              background: "rgba(173,195,230,0.25)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              data-eid="progress-fill"
              style={{
                width: `${progressPct}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #ff4a6b 0%, #ff3f62 100%)",
              }}
            />
          </div>

          <div
            data-eid="time-display"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 12,
              color: "rgba(210,224,255,0.7)",
            }}
          >
            <span data-eid="elapsed-time">{data.elapsedTime}</span>
            <span data-eid="total-time">{data.totalTime}</span>
          </div>
        </div>

        <div
          data-eid="controls"
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
          }}
        >
          <span
            data-eid="btn-shuffle"
            style={{
              width: 28,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(210,224,255,0.55)",
            }}
          >
            <Shuffle size={18} />
          </span>

          <span
            data-eid="btn-prev"
            style={{
              width: 34,
              height: 34,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <SkipBack size={22} />
          </span>

          <span
            data-eid="btn-play"
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background: "#ff4a63",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 18px rgba(255,74,99,0.25)",
              color: "white",
            }}
          >
            <Pause size={22} />
          </span>

          <span
            data-eid="btn-next"
            style={{
              width: 34,
              height: 34,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <SkipForward size={22} />
          </span>

          <span
            data-eid="btn-repeat"
            style={{
              width: 28,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(210,224,255,0.55)",
            }}
          >
            <Repeat size={18} />
          </span>
        </div>

        <div
          data-eid="queue-section"
          style={{
            marginTop: 16,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            data-eid="queue-label"
            style={{
              fontSize: 11,
              letterSpacing: 0.8,
              color: "rgba(210,224,255,0.45)",
              marginBottom: 10,
            }}
          >
            {data.queueLabel}
          </div>

          {data.queue.map((q: any, idx: number) => (
            <div
              key={q.title}
              data-eid={`queue-item-${idx}`}
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 16,
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgba(210,224,255,0.4)",
                }}
              >
                {q.index}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.92)",
                    lineHeight: 1.15,
                  }}
                >
                  {q.title}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    color: "rgba(210,224,255,0.5)",
                  }}
                >
                  {q.artist}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}