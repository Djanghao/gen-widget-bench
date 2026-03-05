import { Clock, Cpu, Trophy } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts'
import data from './data.json'

type ChessData = {
  white: { name: string; rating: number; clock: string }
  black: { name: string; rating: number; clock: string }
  board: Record<string, string>
  pieceSymbols: Record<string, string>
  evaluation: number
  moves: Array<{ num: number; white: string; black: string }>
  engine: { name: string; bestMove: string; score: string }
  captured: { byWhite: string[]; byBlack: string[] }
  materialDiff: string
  evalHistory: Array<{ move: number; eval: number }>
}

const chess = data as ChessData

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

const lightSquare = '#4a4a5c'
const darkSquare = '#2d2d3d'

function isLightSquare(file: string, rank: number): boolean {
  const fileIdx = files.indexOf(file)
  return (fileIdx + rank) % 2 === 1
}

export default function Widget() {
  const evalPct = Math.min(Math.max(((chess.evaluation + 5) / 10) * 100, 5), 95)

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f1e 100%)',
        borderRadius: 20,
        color: '#e2e8f0',
        display: 'grid',
        gap: 12,
        maxWidth: 460,
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
      }}
    >
      {/* Header: Players */}
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div data-eid="white-player" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            {chess.pieceSymbols.wK}
          </div>
          <div>
            <span data-eid="white-name" style={{ fontSize: 14, fontWeight: 700, display: 'block' }}>{chess.white.name}</span>
            <span data-eid="white-rating" style={{ fontSize: 10, color: '#94a3b8' }}>{chess.white.rating}</span>
          </div>
          <span
            data-eid="white-clock"
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#e2e8f0',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'monospace',
              padding: '3px 8px',
            }}
          >
            {chess.white.clock}
          </span>
        </div>

        <span data-eid="vs-label" style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>VS</span>

        <div data-eid="black-player" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            data-eid="black-clock"
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#e2e8f0',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'monospace',
              padding: '3px 8px',
            }}
          >
            {chess.black.clock}
          </span>
          <div style={{ textAlign: 'right' }}>
            <span data-eid="black-name" style={{ fontSize: 14, fontWeight: 700, display: 'block' }}>{chess.black.name}</span>
            <span data-eid="black-rating" style={{ fontSize: 10, color: '#94a3b8' }}>{chess.black.rating}</span>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2a2a3a', border: '2px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            {chess.pieceSymbols.bK}
          </div>
        </div>
      </header>

      {/* Chess Board */}
      <div
        data-eid="board"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          border: '2px solid rgba(148,163,184,0.2)',
          borderRadius: 8,
          overflow: 'hidden',
          aspectRatio: '1',
        }}
      >
        {ranks.map((rank) =>
          files.map((file) => {
            const sq = `${file}${rank}`
            const piece = chess.board[sq]
            const isLight = isLightSquare(file, rank)
            return (
              <div
                key={sq}
                data-eid={`sq-${sq}`}
                style={{
                  background: isLight ? lightSquare : darkSquare,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(16px, 4.5vw, 28px)',
                  aspectRatio: '1',
                  position: 'relative',
                  lineHeight: 1,
                }}
              >
                {piece ? chess.pieceSymbols[piece] || '' : ''}
                {/* File label on rank 1 */}
                {rank === 1 && (
                  <span style={{ position: 'absolute', bottom: 1, right: 2, fontSize: 7, color: isLight ? darkSquare : lightSquare, opacity: 0.6 }}>
                    {file}
                  </span>
                )}
                {/* Rank label on file a */}
                {file === 'a' && (
                  <span style={{ position: 'absolute', top: 1, left: 2, fontSize: 7, color: isLight ? darkSquare : lightSquare, opacity: 0.6 }}>
                    {rank}
                  </span>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Evaluation Bar */}
      <div
        data-eid="eval-bar"
        style={{
          background: '#2a2a3a',
          borderRadius: 6,
          height: 20,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(148,163,184,0.15)',
        }}
      >
        <div
          data-eid="eval-bar-fill"
          style={{
            background: 'linear-gradient(90deg, #e2e8f0, #cbd5e1)',
            height: '100%',
            width: `${evalPct}%`,
            borderRadius: 5,
          }}
        />
        <span
          data-eid="eval-score"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 11,
            fontWeight: 700,
            color: chess.evaluation >= 0 ? '#1a1a2e' : '#e2e8f0',
            textShadow: chess.evaluation >= 0 ? 'none' : '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {chess.evaluation >= 0 ? '+' : ''}{chess.evaluation}
        </span>
      </div>

      {/* Evaluation History Chart */}
      <div data-eid="eval-chart" style={{ height: 80 }}>
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={chess.evalHistory} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="evalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#4ade80" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
            <XAxis dataKey="move" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis domain={[-2, 2]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} width={25} />
            <ReferenceLine y={0} stroke="rgba(148,163,184,0.2)" />
            <Area type="monotone" dataKey="eval" stroke="#4ade80" strokeWidth={2} fill="url(#evalGrad)" dot={{ r: 3, fill: '#4ade80' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Move List */}
      <div data-eid="move-list" style={{ display: 'grid', gap: 4 }}>
        <div data-eid="move-list-title" style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 2 }}>
          Recent Moves
        </div>
        {chess.moves.map((move, i) => (
          <div
            key={i}
            data-eid={`move-row-${i}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr 1fr',
              gap: 4,
              padding: '3px 6px',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
              borderRadius: 4,
            }}
          >
            <span data-eid={`move-row-${i}-num`} style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>{move.num}.</span>
            <span data-eid={`move-row-${i}-white`} style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', fontFamily: 'monospace' }}>{move.white}</span>
            <span data-eid={`move-row-${i}-black`} style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', fontFamily: 'monospace' }}>{move.black}</span>
          </div>
        ))}
      </div>

      {/* Engine Analysis */}
      <div
        data-eid="engine-line"
        style={{
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
        }}
      >
        <Cpu size={14} color="#818cf8" />
        <span data-eid="engine-label" style={{ fontSize: 10, color: '#818cf8', fontWeight: 600 }}>{chess.engine.name}</span>
        <span data-eid="engine-move" style={{ fontSize: 13, fontWeight: 700, color: '#c7d2fe', fontFamily: 'monospace', flex: 1 }}>
          Best: {chess.engine.bestMove}
        </span>
        <span
          data-eid="engine-score"
          style={{
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 8,
            color: '#4ade80',
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
          }}
        >
          {chess.engine.score}
        </span>
      </div>

      {/* Captured Pieces */}
      <div data-eid="captured-section" style={{ display: 'grid', gap: 6 }}>
        <div data-eid="captured-by-white" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span data-eid="captured-by-white-label" style={{ fontSize: 10, color: '#94a3b8', width: 90 }}>White captured:</span>
          <span data-eid="captured-by-white-pieces" style={{ fontSize: 18, letterSpacing: 2 }}>
            {chess.captured.byWhite.map((p) => chess.pieceSymbols[p]).join(' ')}
          </span>
        </div>
        <div data-eid="captured-by-black" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span data-eid="captured-by-black-label" style={{ fontSize: 10, color: '#94a3b8', width: 90 }}>Black captured:</span>
          <span data-eid="captured-by-black-pieces" style={{ fontSize: 18, letterSpacing: 2 }}>
            {chess.captured.byBlack.map((p) => chess.pieceSymbols[p]).join(' ')}
          </span>
        </div>
      </div>

      {/* Material Count */}
      <div
        data-eid="material-count"
        style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#94a3b8',
          borderTop: '1px solid rgba(148,163,184,0.1)',
          paddingTop: 8,
        }}
      >
        Material: <span style={{ color: '#4ade80', fontWeight: 700 }}>{chess.materialDiff}</span> (White advantage)
      </div>
    </section>
  )
}
