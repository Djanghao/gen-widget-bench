// submissions/<your-model-name>/widget.tsx
import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import data from "./data.json";

const pieceGlyph: Record<string, string> = {
  wK: "♔",
  wQ: "♕",
  wR: "♖",
  wB: "♗",
  wN: "♘",
  wP: "♙",
  bK: "♚",
  bQ: "♛",
  bR: "♜",
  bB: "♝",
  bN: "♞",
  bP: "♟",
};

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

function eidForSquare(file: string, rank: number) {
  return `sq-${file}${rank}`;
}

export default function Widget() {
  const w = data.white;
  const b = data.black;

  const boardSize = 428;

  const squareStyleBase: React.CSSProperties = {
    width: "12.5%",
    height: "12.5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    lineHeight: 1,
    color: "#e9eef7",
    userSelect: "none",
  };

  return (
    <section
      data-eid="root"
      style={{
        width: 460,
        height: 660,
        margin: "0 auto",
        background: "linear-gradient(135deg,#1f2030 0%, #14182a 55%, #101529 100%)",
        borderRadius: 18,
        padding: 14,
        boxSizing: "border-box",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: "#e9eef7",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2px 2px 10px 2px",
        }}
      >
        <div
          data-eid="white-player"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 170,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "rgba(255,255,255,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 0 5px rgba(255,255,255,0.12)",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.85)",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span
              data-eid="white-name"
              style={{ fontWeight: 650, letterSpacing: 0.2, fontSize: 16 }}
            >
              {w.name}
            </span>
            <span
              data-eid="white-rating"
              style={{ opacity: 0.7, fontSize: 12 }}
            >
              {w.rating}
            </span>
          </div>

          <span
            data-eid="white-clock"
            style={{
              marginLeft: "auto",
              background: "rgba(255,255,255,0.08)",
              padding: "6px 10px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.3,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
            }}
          >
            {w.clock}
          </span>
        </div>

        <span
          data-eid="vs-label"
          style={{
            opacity: 0.45,
            fontWeight: 700,
            letterSpacing: 1.2,
            fontSize: 13,
            marginTop: 2,
          }}
        >
          VS
        </span>

        <div
          data-eid="black-player"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 170,
            justifyContent: "flex-end",
          }}
        >
          <span
            data-eid="black-clock"
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "6px 10px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.3,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
            }}
          >
            {b.clock}
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" }}>
            <span
              data-eid="black-name"
              style={{ fontWeight: 650, letterSpacing: 0.2, fontSize: 16 }}
            >
              {b.name}
            </span>
            <span
              data-eid="black-rating"
              style={{ opacity: 0.7, fontSize: 12 }}
            >
              {b.rating}
            </span>
          </div>

          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "rgba(0,0,0,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 0 5px rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.75)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#1a1b26",
                }}
              >
                ♚
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        data-eid="board"
        style={{
          width: boardSize,
          height: boardSize,
          margin: "0 auto",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow:
            "0 10px 24px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
          }}
        >
          {ranks.map((rank, rIdx) =>
            files.map((file, fIdx) => {
              const isDark = (rIdx + fIdx) % 2 === 0;
              const eid = eidForSquare(file, rank);
              const piece = (data.position as any)[`${file}${rank}`] as string | undefined;

              return (
                <div
                  key={`${file}${rank}`}
                  data-eid={eid}
                  style={{
                    ...squareStyleBase,
                    background: isDark ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.10)",
                  }}
                >
                  <span
                    style={{
                      transform: "translateY(-1px)",
                      filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.35))",
                    }}
                  >
                    {piece ? pieceGlyph[piece] : ""}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div
        data-eid="eval-bar"
        style={{
          width: boardSize,
          margin: "12px auto 8px auto",
          height: 22,
          borderRadius: 7,
          background: "rgba(255,255,255,0.08)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          data-eid="eval-bar-fill"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${data.evalBarFillPct}%`,
            background: "rgba(236,242,249,0.95)",
          }}
        />
        <span
          data-eid="eval-score"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            fontWeight: 700,
            color: "#1a1b26",
            fontSize: 13,
            letterSpacing: 0.2,
          }}
        >
          {data.evalScore}
        </span>
      </div>

      <div
        data-eid="eval-chart"
        style={{
          width: boardSize,
          height: 62,
          margin: "0 auto",
          background: "rgba(16,20,36,0.35)",
          borderRadius: 10,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          padding: "6px 10px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.evalHistory} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
              <Area
                type="monotone"
                dataKey="v"
                stroke="rgba(46, 225, 117, 0.9)"
                strokeWidth={2}
                fill="rgba(46, 225, 117, 0.12)"
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  stroke: "rgba(112, 255, 167, 0.95)",
                  fill: "rgba(16,20,36,0.9)",
                }}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            position: "absolute",
            left: 28,
            bottom: 14,
            display: "flex",
            flexDirection: "column",
            gap: 34,
            pointerEvents: "none",
          }}
        >
          <div style={{ opacity: 0.55, fontSize: 10, transform: "translateY(-2px)" }}>2</div>
          <div style={{ opacity: 0.55, fontSize: 10 }}>-2</div>
        </div>
      </div>

      <div data-eid="move-list" style={{ display: "none" }}>
        <div data-eid="move-list-title">Moves</div>
        <div data-eid="move-row-0">
          <span data-eid="move-row-0-num">18.</span>
          <span data-eid="move-row-0-white">Qd2</span>
          <span data-eid="move-row-0-black">Rfe8</span>
        </div>
        <div data-eid="move-row-1">
          <span data-eid="move-row-1-num">19.</span>
          <span data-eid="move-row-1-white">Rad1</span>
          <span data-eid="move-row-1-black">Bf8</span>
        </div>
        <div data-eid="move-row-2">
          <span data-eid="move-row-2-num">20.</span>
          <span data-eid="move-row-2-white">Ne5</span>
          <span data-eid="move-row-2-black">Nxe5</span>
        </div>
        <div data-eid="move-row-3">
          <span data-eid="move-row-3-num">21.</span>
          <span data-eid="move-row-3-white">dxe5</span>
          <span data-eid="move-row-3-black">Nd7</span>
        </div>
      </div>

      <div data-eid="engine-line" style={{ display: "none" }}>
        <span data-eid="engine-label">Stockfish 16</span>
        <span data-eid="engine-move">22. f4</span>
        <span data-eid="engine-score">+1.3</span>
      </div>

      <div data-eid="captured-section" style={{ display: "none" }}>
        <div data-eid="captured-by-white">
          <span data-eid="captured-by-white-label">White captured</span>
          <span data-eid="captured-by-white-pieces"></span>
        </div>
        <div data-eid="captured-by-black">
          <span data-eid="captured-by-black-label">Black captured</span>
          <span data-eid="captured-by-black-pieces"></span>
        </div>
      </div>

      <div data-eid="material-count" style={{ display: "none" }}>
        +1
      </div>
    </section>
  );
}