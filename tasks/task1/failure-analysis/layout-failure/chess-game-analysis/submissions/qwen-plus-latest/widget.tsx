import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Clock, Zap } from 'lucide-react';
import data from './data.json';

const ChessAnalysisWidget = () => {
  const { players, board, evalBar, evalChart, moves, engine, captured, materialCount } = data;

  // Generate chess board squares
  const generateBoardSquares = () => {
    const squares = [];
    const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let row of rows) {
      for (let col of cols) {
        const squareId = `sq-${col}${row}`;
        const isLight = (cols.indexOf(col) + rows.indexOf(row)) % 2 === 0;
        const piece = board.find(sq => sq.id === squareId)?.piece || null;

        squares.push(
          <div
            key={squareId}
            data-eid={squareId}
            style={{
              width: '52px',
              height: '52px',
              backgroundColor: isLight ? '#f0d9b5' : '#b58863',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {piece && (
              <span style={{ 
                color: piece.color === 'white' ? '#ffffff' : '#000000',
                textShadow: piece.color === 'white' ? '1px 1px 2px rgba(0,0,0,0.5)' : '1px 1px 2px rgba(255,255,255,0.5)'
              }}>
                {piece.symbol}
              </span>
            )}
          </div>
        );
      }
    }
    return squares;
  };

  return (
    <section
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#e6e6e6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 10px' }}>
        <div data-eid="white-player" style={{ textAlign: 'right', flex: '1', paddingRight: '15px' }}>
          <span data-eid="white-name" style={{ fontSize: '18px', fontWeight: 'bold', display: 'block' }}>{players.white.name}</span>
          <span data-eid="white-rating" style={{ fontSize: '14px', color: '#a0a0c0', display: 'block' }}>{players.white.rating}</span>
          <span data-eid="white-clock" style={{ fontSize: '16px', fontWeight: 'bold', color: '#4ade80', display: 'block', marginTop: '4px' }}>{players.white.clock}</span>
        </div>
        
        <span data-eid="vs-label" style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 15px', color: '#60a5fa' }}>VS</span>
        
        <div data-eid="black-player" style={{ textAlign: 'left', flex: '1', paddingLeft: '15px' }}>
          <span data-eid="black-name" style={{ fontSize: '18px', fontWeight: 'bold', display: 'block' }}>{players.black.name}</span>
          <span data-eid="black-rating" style={{ fontSize: '14px', color: '#a0a0c0', display: 'block' }}>{players.black.rating}</span>
          <span data-eid="black-clock" style={{ fontSize: '16px', fontWeight: 'bold', color: '#f87171', display: 'block', marginTop: '4px' }}>{players.black.clock}</span>
        </div>
      </header>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Left Column: Board and Evaluation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Chess Board */}
          <div data-eid="board" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(8, 52px)', 
            gap: '0',
            border: '2px solid #4b5563',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            {generateBoardSquares()}
          </div>

          {/* Evaluation Bar */}
          <div data-eid="eval-bar" style={{ 
            height: '24px', 
            backgroundColor: '#374151', 
            borderRadius: '12px', 
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div 
              data-eid="eval-bar-fill" 
              style={{ 
                height: '100%', 
                width: `${evalBar.width}%`, 
                backgroundColor: evalBar.color,
                borderRadius: '12px',
                transition: 'width 0.3s ease'
              }}
            />
            <span 
              data-eid="eval-score" 
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                fontWeight: 'bold', 
                fontSize: '14px',
                color: '#e6e6e6',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)'
              }}
            >
              {evalBar.score}
            </span>
          </div>

          {/* Evaluation Chart */}
          <div data-eid="eval-chart" style={{ height: '150px', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evalChart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="move" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} domain={[-5, 5]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#374151',
                    borderRadius: '8px',
                    color: '#e6e6e6'
                  }} 
                  labelStyle={{ color: '#60a5fa' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="url(#colorUv)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Move List, Engine, Captured, Material */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Move List */}
          <div data-eid="move-list" style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}>
            <div data-eid="move-list-title" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} />
              Recent Moves
            </div>
            
            {moves.map((move, index) => (
              <div 
                key={`move-${index}`} 
                data-eid={`move-row-${index}`} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '6px 0',
                  borderBottom: index < moves.length - 1 ? '1px solid #374151' : 'none'
                }}
              >
                <span data-eid={`move-row-${index}-num`} style={{ fontWeight: 'bold', color: '#9ca3af', minWidth: '30px' }}>{move.number}</span>
                <span data-eid={`move-row-${index}-white`} style={{ fontWeight: 'bold', color: '#e6e6e6', flex: '1', textAlign: 'left', marginRight: '10px' }}>{move.white}</span>
                <span data-eid={`move-row-${index}-black`} style={{ fontWeight: 'bold', color: '#e6e6e6', flex: '1', textAlign: 'right', marginLeft: '10px' }}>{move.black}</span>
              </div>
            ))}
          </div>

          {/* Engine Analysis */}
          <div data-eid="engine-line" style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Trophy size={16} color="#8b5cf6" />
              <span data-eid="engine-label" style={{ fontWeight: 'bold', color: '#8b5cf6', fontSize: '14px' }}>{engine.label}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span data-eid="engine-move" style={{ fontWeight: 'bold', fontSize: '16px', color: '#3b82f6' }}>{engine.move}</span>
              <span data-eid="engine-score" style={{ fontWeight: 'bold', fontSize: '16px', color: '#4ade80' }}>{engine.score}</span>
            </div>
          </div>

          {/* Captured Pieces */}
          <div data-eid="captured-section" style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ marginBottom: '12px' }}>
              <div data-eid="captured-by-white" style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span data-eid="captured-by-white-label" style={{ fontWeight: 'bold', color: '#9ca3af', fontSize: '14px', marginRight: '8px' }}>White captured:</span>
                <span data-eid="captured-by-white-pieces" style={{ fontSize: '18px', color: '#f87171' }}>{captured.white}</span>
              </div>
              <div data-eid="captured-by-black" style={{ display: 'flex', alignItems: 'center' }}>
                <span data-eid="captured-by-black-label" style={{ fontWeight: 'bold', color: '#9ca3af', fontSize: '14px', marginRight: '8px' }}>Black captured:</span>
                <span data-eid="captured-by-black-pieces" style={{ fontSize: '18px', color: '#4ade80' }}>{captured.black}</span>
              </div>
            </div>
          </div>

          {/* Material Count */}
          <div data-eid="material-count" style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '8px', 
            padding: '15px', 
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '4px' }}>Material Balance</div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: materialCount.value > 0 ? '#4ade80' : materialCount.value < 0 ? '#f87171' : '#9ca3af'
            }}>
              {materialCount.value > 0 ? '+' : ''}{materialCount.value}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChessAnalysisWidget;