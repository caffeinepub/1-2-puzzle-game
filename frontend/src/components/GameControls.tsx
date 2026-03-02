import React from 'react';
import { RotateCcw, Clock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameControlsProps {
  moveCount: number;
  elapsedSeconds: number;
  onNewGame: () => void;
  isWon: boolean;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function GameControls({ moveCount, elapsedSeconds, onNewGame, isWon }: GameControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {/* Move Counter */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded flex-1"
        style={{
          background: 'oklch(0.16 0.02 265)',
          border: '1px solid oklch(0.75 0.22 330 / 0.5)',
          boxShadow: '0 0 8px oklch(0.75 0.22 330 / 0.2)',
        }}
      >
        <Hash size={14} style={{ color: 'oklch(0.75 0.22 330)' }} />
        <div>
          <div className="text-xs font-mono-tech" style={{ color: 'oklch(0.6 0.04 220)' }}>
            MOVES
          </div>
          <div
            className="font-pixel text-base leading-tight"
            style={{
              color: 'oklch(0.75 0.22 330)',
              textShadow: '0 0 8px oklch(0.75 0.22 330 / 0.8)',
            }}
          >
            {moveCount.toString().padStart(4, '0')}
          </div>
        </div>
      </div>

      {/* Timer */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded flex-1"
        style={{
          background: 'oklch(0.16 0.02 265)',
          border: '1px solid oklch(0.82 0.18 195 / 0.5)',
          boxShadow: '0 0 8px oklch(0.82 0.18 195 / 0.2)',
        }}
      >
        <Clock size={14} style={{ color: 'oklch(0.82 0.18 195)' }} />
        <div>
          <div className="text-xs font-mono-tech" style={{ color: 'oklch(0.6 0.04 220)' }}>
            TIME
          </div>
          <div
            className="font-pixel text-base leading-tight"
            style={{
              color: 'oklch(0.82 0.18 195)',
              textShadow: '0 0 8px oklch(0.82 0.18 195 / 0.8)',
            }}
          >
            {formatTime(elapsedSeconds)}
          </div>
        </div>
      </div>

      {/* New Game Button */}
      <button
        onClick={onNewGame}
        className="flex items-center gap-2 px-4 py-3 rounded font-pixel text-xs transition-all duration-150 hover:scale-105 active:scale-95"
        style={{
          background: 'oklch(0.18 0.04 265)',
          border: '2px solid oklch(0.88 0.2 85)',
          color: 'oklch(0.88 0.2 85)',
          boxShadow: '0 0 10px oklch(0.88 0.2 85 / 0.4)',
          textShadow: '0 0 8px oklch(0.88 0.2 85 / 0.8)',
        }}
      >
        <RotateCcw size={14} />
        <span className="hidden sm:inline">NEW</span>
      </button>
    </div>
  );
}
