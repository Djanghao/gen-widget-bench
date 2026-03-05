import React from "react";
import data from "./data.json";
import { Play, Pause, SkipBack, SkipForward, Mic, Check, Circle } from "lucide-react";

export default function Widget() {
  // Calculated width for progress bar
  const progressPercent = 67;

  return (
    <section
      data-eid="root"
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "linear-gradient(180deg, #241945 0%, #18122B 100%)",
        borderRadius: 28,
        width: 400,
        margin: "40px auto",
        color: "#fff",
        boxShadow: "0 4px 32px 0 rgba(10,0,40,0.10)",
        padding: 0,
        position: "relative",
      }}
    >
      {/* Now Playing Block */}
      <div
        data-eid="now-playing"
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 32,
          paddingBottom: 20,
          gap: 22,
        }}
      >
        {/* Cover Art */}
        <div
          data-eid="cover-art"
          style={{
            minWidth: 80,
            height: 80,
            borderRadius: 16,
            background: "linear-gradient(140deg, #615DFC 0%, #6DF2FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Mic size={36} color="#cfd4ff" />
        </div>
        {/* Info and controls */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <span
            data-eid="podcast-name"
            style={{
              fontSize: 12,
              color: "#a2a2ce",
              letterSpacing: "0.11em",
              fontWeight: 600,
              marginBottom: 4,
              textTransform: "uppercase",
            }}
          >
            {data.podcastName}
          </span>
          <h2
            data-eid="episode-title"
            style={{
              fontSize: 20,
              fontWeight: 600,
              margin: 0,
              color: "#fff",
              lineHeight: "1.25",
            }}
          >
            {data.currentEpisode.title}
          </h2>
          {/* Controls Row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0 0 0",
            width: "100%",
            justifyContent: "center",
            gap: 32,
          }}>
            <button
              data-eid="skip-back-btn"
              style={{
                background: "transparent",
                border: "none",
                outline: 0,
                cursor: "pointer",
                padding: 0,
              }}
            >
              <SkipBack size={26} color="#a2a2ce" />
            </button>
            <button
              data-eid="play-button"
              style={{
                width: 52,
                height: 52,
                border: "none",
                borderRadius: "50%",
                background: "radial-gradient(circle at 60% 67%, #8e7efc 0%, #532bfa 100%)",
                boxShadow: "0 0 12px 2px #864CFF66",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "box-shadow 0.1s",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Play size={32} color="#fff" style={{ marginLeft: 3 }} />
            </button>
            <button
              data-eid="skip-forward-btn"
              style={{
                background: "transparent",
                border: "none",
                outline: 0,
                cursor: "pointer",
                padding: 0,
              }}
            >
              <SkipForward size={26} color="#a2a2ce" />
            </button>
          </div>
        </div>
      </div>
      {/* Progress Bar and Timing */}
      <div style={{ padding: "0 32px 0 32px", position: "relative", marginBottom: 10, marginTop: 6 }}>
        <div
          data-eid="progress-bar"
          style={{
            background: "#262154",
            height: 6,
            borderRadius: 4,
            position: "relative",
            width: "100%",
            marginBottom: 3,
          }}
        >
          <div
            data-eid="progress-fill"
            style={{
              height: "100%",
              borderRadius: 4,
              background: "linear-gradient(90deg, #8e7efc 0%, #56e7f7 100%)",
              width: `${progressPercent}%`,
              transition: "width 0.2s",
            }}
          />
        </div>
        <span
          data-eid="time-elapsed"
          style={{
            position: "absolute",
            left: 0,
            top: 9,
            fontSize: 12,
            color: "#adabe3",
            fontWeight: 500,
            letterSpacing: 0.03,
          }}
        >
          {data.currentEpisode.elapsed}
        </span>
        <span
          data-eid="time-total"
          style={{
            position: "absolute",
            right: 0,
            top: 9,
            fontSize: 12,
            color: "#adabe3",
            fontWeight: 500,
            letterSpacing: 0.03,
          }}
        >
          {data.currentEpisode.duration}
        </span>
      </div>

      {/* Episode List */}
      <div data-eid="episode-list" style={{ padding: "0 30px" }}>
        <h3
          data-eid="episode-list-title"
          style={{
            fontSize: 16,
            fontWeight: 700,
            margin: 0,
            color: "#eceafd",
            marginBottom: 14,
          }}
        >
          Recent Episodes
        </h3>
        {/* First Episode Row */}
        <div
          data-eid="ep-0"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "7px 0 7px 0",
            borderBottom: "1px solid #27234C",
            marginBottom: 3,
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}>
              <span
                data-eid="ep-0-number"
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#d5d1ff",
                  background: "#4326b5",
                  borderRadius: 6,
                  padding: "1px 10px",
                  marginRight: 5,
                }}
              >
                {data.episodes[0].number}
              </span>
              <span
                data-eid="ep-0-title"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: 15,
                  marginRight: 6,
                }}
              >
                {data.episodes[0].title}
              </span>
            </div>
            <span
              data-eid="ep-0-date"
              style={{
                fontSize: 13,
                color: "#b1aadb",
                marginTop: 1,
                marginLeft: 2,
              }}
            >
              {data.episodes[0].date}
            </span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
          }}>
            <span
              data-eid="ep-0-duration"
              style={{
                color: "#a2a2ce",
                fontSize: 14,
                fontWeight: 400,
                minWidth: 42,
                textAlign: "right",
              }}
            >
              {data.episodes[0].duration}
            </span>
            <span data-eid="ep-0-status" style={{marginRight: 2, color: "#89F287"}}>
              <Check size={18} strokeWidth={3} color="#89F287" />
            </span>
          </div>
        </div>
        {/* Second Episode Row */}
        <div
          data-eid="ep-1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "7px 0",
            borderBottom: "1px solid #27234C",
            marginBottom: 3,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span
              data-eid="ep-1-number"
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 600,
                color: "#d5d1ff",
                background: "#4326b5",
                borderRadius: 6,
                padding: "1px 10px",
                marginRight: 5,
              }}
            >
              {data.episodes[1].number}
            </span>
            <span
              data-eid="ep-1-title"
              style={{
                color: "#fff",
                fontWeight: 500,
                fontSize: 15,
                marginRight: 3,
              }}
            >
              {data.episodes[1].title}
            </span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
          }}>
            <span
              data-eid="ep-1-duration"
              style={{
                color: "#a2a2ce",
                fontSize: 14,
                fontWeight: 400,
                minWidth: 41,
                textAlign: "right",
              }}
            >
              {data.episodes[1].duration}
            </span>
            <span data-eid="ep-1-status">
              <Circle
                size={18}
                strokeWidth={2.1}
                color="#F7DE5B"
                style={{
                  verticalAlign: "middle",
                  marginBottom: 1,
                }}
                fill="none"
              />
            </span>
          </div>
        </div>
        {/* Third Episode Row */}
        <div
          data-eid="ep-2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "7px 0",
            borderBottom: "1px solid #27234C",
            marginBottom: 3,
          }}
        >
          <span
            data-eid="ep-2-title"
            style={{
              color: "#fff",
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            {data.episodes[2].title}
          </span>
          <span
            data-eid="ep-2-duration"
            style={{
              color: "#a2a2ce",
              fontSize: 14,
              fontWeight: 400,
              minWidth: 42,
              textAlign: "right",
            }}
          >
            {data.episodes[2].duration}
          </span>
        </div>
        {/* Fourth Episode Row */}
        <div
          data-eid="ep-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "7px 0 3px 0",
            marginBottom: 14,
          }}
        >
          <span
            data-eid="ep-3-title"
            style={{
              color: "#fff",
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            {data.episodes[3].title}
          </span>
          <span
            data-eid="ep-3-duration"
            style={{
              color: "#a2a2ce",
              fontSize: 14,
              fontWeight: 400,
              minWidth: 41,
              textAlign: "right",
            }}
          >
            {data.episodes[3].duration}
          </span>
        </div>
      </div>

      {/* Podcast Stats Row */}
      <div
        data-eid="stats-row"
        style={{
          background: "rgba(36,25,69,0.9)",
          borderRadius: "0 0 24px 24px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 0,
          padding: "20px 25px 18px 25px",
        }}
      >
        <div
          data-eid="stat-episodes"
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 22, color: "#B7A6FE", letterSpacing: "0.01em" }}>{data.stats.episodes}</div>
          <div style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#7A81A9",
            letterSpacing: "0.08em",
            marginTop: 3,
          }}>EPISODES</div>
        </div>
        <div
          data-eid="stat-listen-time"
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 22, color: "#72E0E4", letterSpacing: "0.01em" }}>{data.stats.listenTime}</div>
          <div style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#7A81A9",
            letterSpacing: "0.08em",
            marginTop: 3,
          }}>LISTEN TIME</div>
        </div>
        <div
          data-eid="stat-subscribers"
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 22, color: "#19E087", letterSpacing: "0.01em" }}>{data.stats.subscribers}</div>
          <div style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#7A81A9",
            letterSpacing: "0.08em",
            marginTop: 3,
          }}>SUBSCRIBERS</div>
        </div>
      </div>
    </section>
  );
}