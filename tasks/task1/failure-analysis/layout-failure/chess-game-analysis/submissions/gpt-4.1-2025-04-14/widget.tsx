import React from "react";
import data from "./data.json";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Dot } from "recharts";
import { Chess, Crown, Crown as BlackCrown } from "lucide-react";

const pieceUnicode = {
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

function boardSquareColor(fileIdx: number, rankIdx: number) {
  return (fileIdx + rankIdx) % 2 === 0 ? "#353849" : "#232435";
}

// For data-eid attribute on each square, as required
function getSquareEid(file: string, rank: number) {
  return `sq-${file}${rank}`;
}

// Helper to render a chess piece (by FEN letter)
function pieceChar(letter: string) {
  switch (letter) {
    case "K":
      return pieceUnicode.wK;
    case "Q":
      return pieceUnicode.wQ;
    case "R":
      return pieceUnicode.wR;
    case "B":
      return pieceUnicode.wB;
    case "N":
      return pieceUnicode.wN;
    case "P":
      return pieceUnicode.wP;
    case "k":
      return pieceUnicode.bK;
    case "q":
      return pieceUnicode.bQ;
    case "r":
      return pieceUnicode.bR;
    case "b":
      return pieceUnicode.bB;
    case "n":
      return pieceUnicode.bN;
    case "p":
      return pieceUnicode.bP;
    default:
      return null;
  }
}

// Board position in target, from FEN (extracted visually)
const fen =
  "2R1R1K1/PP1N1P1P/8/4P3/2P5/6P1/PP2Q1PP/3rr1k1"; // One possible description from the board, customized after inspecting the image.

// Break the FEN into a board array
function fenBoardArray(fen: string) {
  // Only board, before ' ' if included
  return fen
    .split(" ")[0]
    .split("/")
    .map((row) => {
      let arr = [];
      for (let i = 0; i < row.length; ++i) {
        if (row[i].match(/[1-8]/)) {
          for (let j = 0; j < parseInt(row[i]); ++j) arr.push(null);
        } else {
          arr.push(row[i]);
        }
      }
      return arr;
    });
}
const boardArr = fenBoardArray(data.fen);

// For captured pieces, display the icons
function renderCaptured(array: string[]) {
  // Array of FEN letters, group and display with spacing
  if (!array.length) return null;
  // Sort by kind for nice order: Q, R, B, N, P (or lower for black)
  const priority = { Q: 1, R: 2, B: 3, N: 4, P: 5, q: 1, r: 2, b: 3, n: 4, p: 5 };
  array = [...array].sort((a, b) => (priority[a] || 9) - (priority[b] || 9));
  return array.map((l, idx) => (
    <span key={idx} style={{ fontSize: 18, marginRight: 4, verticalAlign: "middle" }}>
      {pieceChar(l)}
    </span>
  ));
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        background: "linear-gradient(180deg, #191B2A 80%, #232435 100%)",
        borderRadius: 24,
        width: 520,
        margin: "0 auto",
        marginTop: 8,
        padding: 0,
        boxShadow: "0 2px 28px rgba(40, 47, 95, 0.13)",
        position: "relative",
        fontFamily: "Inter, sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "18px 24px 5px 24px",
          minHeight: 54,
        }}
      >
        {/* LEFT: WHITE */}
        <div data-eid="white-player" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 110 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#fff",
              marginRight: 12,
              border: "2px solid #E3E5EB",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center"
            }}></span>
            <span data-eid="white-name" style={{
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 0.02,
              marginRight: 4,
              lineHeight: "1.1"
            }}>{data.white.name}</span>
          </div>
          <span data-eid="white-rating" style={{ color: "#98a4c3", fontSize: 14, marginTop: 2 }}>{data.white.rating}</span>
        </div>
        {/* Clocks and VS */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
          marginTop: 6
        }}>
          <span data-eid="white-clock"
            style={{
              background: "#2D3147",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 7,
              minWidth: 54,
              padding: "3px 12px",
              textAlign: "center",
              fontSize: 15,
              marginRight: 0,
              letterSpacing: 0.3
            }}
          >{data.white.clock}</span>
          <span data-eid="vs-label"
            style={{
              color: "#5c637e",
              fontWeight: 700,
              fontSize: 15,
              margin: "0 0",
              letterSpacing: 1,
            }}>VS</span>
          <span data-eid="black-clock"
            style={{
              background: "#2D3147",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 7,
              minWidth: 54,
              padding: "3px 12px",
              textAlign: "center",
              fontSize: 15,
              letterSpacing: 0.3
            }}>{data.black.clock}</span>
        </div>
        {/* RIGHT: BLACK */}
        <div data-eid="black-player" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 110 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end"
          }}>
            <span data-eid="black-name" style={{
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 0.02,
              marginRight: 4,
              lineHeight: "1.1"
            }}>{data.black.name}</span>
            <span style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#223",
              marginLeft: 12,
              border: "2px solid #3C4051",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#c5c7ce",
              fontSize: 16
            }}>
              <span style={{ display: "inline-block", fontSize: 18, marginLeft: 0, marginTop: 2 }}>{pieceUnicode.bK}</span>
            </span>
          </div>
          <span data-eid="black-rating" style={{ color: "#98a4c3", fontSize: 14, marginTop: 2 }}>{data.black.rating}</span>
        </div>
      </header>

      {/* Chess BOARD */}
      <div
        data-eid="board"
        style={{
          margin: "4px 10px",
          borderRadius: 10,
          background: "#232435",
          border: "1px solid #36394C",
          display: "grid",
          gridTemplateColumns: "repeat(8,40px)",
          gridTemplateRows: "repeat(8,40px)",
          width: 320,
          height: 320,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 16,
          marginTop: 2,
          boxSizing: "content-box",
          boxShadow: "0 1.5px 0 #262938, 0 1px 18px rgba(23,30,48,0.08)",
          position: "relative"
        }}
      >
        {ranks.map((rank, rIdx) =>
          files.map((file, fIdx) => {
            const eid = getSquareEid(file, rank);
            const squarePiece = boardArr[rIdx][fIdx];
            const isLight = (fIdx + rIdx) % 2 === 1;
            return (
              <div
                key={eid}
                data-eid={eid}
                style={{
                  width: 40,
                  height: 40,
                  background: isLight ? "#868ba3" : "#383a4c",
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 25,
                  color: squarePiece && squarePiece === squarePiece.toUpperCase() ? "#fff" : "#CBD2E7",
                  fontWeight: 500,
                  userSelect: "none"
                }}>
                {squarePiece ? pieceChar(squarePiece) : ""}
              </div>
            );
          }))}
      </div>

      {/* Eval BAR */}
      <div
        data-eid="eval-bar"
        style={{
          width: 340,
          height: 22,
          background: "#232435",
          margin: "0 auto",
          borderRadius: 7,
          marginBottom: 8,
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          position: "relative",
          border: "1px solid #32384b"
        }}>
        <div
          data-eid="eval-bar-fill"
          style={{
            height: "100%",
            background: "#C8E6C9",
            width: data.evalBarFill + "%",
            borderRadius: 7,
            transition: "width 0.4s",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
            opacity: 0.93,
            mixBlendMode: "screen"
          }} />
        <span
          data-eid="eval-score"
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            fontWeight: 700,
            fontSize: 16,
            textAlign: "center",
            color: "#232435",
            letterSpacing: 0.2,
            textShadow: "0 1px 4px #fff,0 1px 14px #d0ecd0"
          }}
        >{data.evalScore}</span>
      </div>

      {/* Eval line chart */}
      <div data-eid="eval-chart" style={{
        height: 58,
        width: 430,
        margin: "0 auto",
        marginBottom: 0,
        marginTop: 2
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.evalHistory}
            margin={{ left: 0, right: 0, top: 8, bottom: 8 }}>
            <CartesianGrid stroke="#252637" vertical={false} />
            <XAxis dataKey="moveNum" hide={true} />
            <YAxis domain={[-2, 2]} hide={false}
              tick={{ fill: "#7fb8a6", fontSize: 11, fontWeight: 500 }}
              ticks={[-2, 0, 2]}
              axisLine={false}
              style={{ outline: "none" }}
            />
            <Area
              type="linear"
              dataKey="eval"
              stroke="#42fc90"
              strokeWidth={2}
              fill="#36e48822"
              dot={({ cx, cy, index }) =>
                <circle cx={cx} cy={cy} r={5}
                  fill="#15151e"
                  stroke="#42fc90"
                  strokeWidth={2}
                  key={index}
                />}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}