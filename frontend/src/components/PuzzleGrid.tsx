import React from 'react';

interface PuzzleGridProps {
  tiles: number[];
  onTileClick: (index: number) => void;
  isWon: boolean;
}

const TILE_COLORS = [
  '',
  'bg-[oklch(0.22_0.12_195)] border-[oklch(0.82_0.18_195)] text-[oklch(0.9_0.1_195)]',
  'bg-[oklch(0.22_0.12_330)] border-[oklch(0.75_0.22_330)] text-[oklch(0.9_0.1_330)]',
  'bg-[oklch(0.22_0.12_85)] border-[oklch(0.88_0.2_85)] text-[oklch(0.95_0.1_85)]',
  'bg-[oklch(0.22_0.12_145)] border-[oklch(0.78_0.2_145)] text-[oklch(0.9_0.1_145)]',
  'bg-[oklch(0.22_0.12_270)] border-[oklch(0.72_0.2_270)] text-[oklch(0.9_0.1_270)]',
  'bg-[oklch(0.22_0.12_195)] border-[oklch(0.82_0.18_195)] text-[oklch(0.9_0.1_195)]',
  'bg-[oklch(0.22_0.12_330)] border-[oklch(0.75_0.22_330)] text-[oklch(0.9_0.1_330)]',
  'bg-[oklch(0.22_0.12_85)] border-[oklch(0.88_0.2_85)] text-[oklch(0.95_0.1_85)]',
  'bg-[oklch(0.22_0.12_145)] border-[oklch(0.78_0.2_145)] text-[oklch(0.9_0.1_145)]',
  'bg-[oklch(0.22_0.12_270)] border-[oklch(0.72_0.2_270)] text-[oklch(0.9_0.1_270)]',
  'bg-[oklch(0.22_0.12_195)] border-[oklch(0.82_0.18_195)] text-[oklch(0.9_0.1_195)]',
  'bg-[oklch(0.22_0.12_330)] border-[oklch(0.75_0.22_330)] text-[oklch(0.9_0.1_330)]',
  'bg-[oklch(0.22_0.12_85)] border-[oklch(0.88_0.2_85)] text-[oklch(0.95_0.1_85)]',
  'bg-[oklch(0.22_0.12_145)] border-[oklch(0.78_0.2_145)] text-[oklch(0.9_0.1_145)]',
  'bg-[oklch(0.22_0.12_270)] border-[oklch(0.72_0.2_270)] text-[oklch(0.9_0.1_270)]',
];

const TILE_SHADOWS = [
  '',
  'shadow-[0_0_10px_oklch(0.82_0.18_195/0.6),0_0_20px_oklch(0.82_0.18_195/0.3)]',
  'shadow-[0_0_10px_oklch(0.75_0.22_330/0.6),0_0_20px_oklch(0.75_0.22_330/0.3)]',
  'shadow-[0_0_10px_oklch(0.88_0.2_85/0.6),0_0_20px_oklch(0.88_0.2_85/0.3)]',
  'shadow-[0_0_10px_oklch(0.78_0.2_145/0.6),0_0_20px_oklch(0.78_0.2_145/0.3)]',
  'shadow-[0_0_10px_oklch(0.72_0.2_270/0.6),0_0_20px_oklch(0.72_0.2_270/0.3)]',
  'shadow-[0_0_10px_oklch(0.82_0.18_195/0.6),0_0_20px_oklch(0.82_0.18_195/0.3)]',
  'shadow-[0_0_10px_oklch(0.75_0.22_330/0.6),0_0_20px_oklch(0.75_0.22_330/0.3)]',
  'shadow-[0_0_10px_oklch(0.88_0.2_85/0.6),0_0_20px_oklch(0.88_0.2_85/0.3)]',
  'shadow-[0_0_10px_oklch(0.78_0.2_145/0.6),0_0_20px_oklch(0.78_0.2_145/0.3)]',
  'shadow-[0_0_10px_oklch(0.72_0.2_270/0.6),0_0_20px_oklch(0.72_0.2_270/0.3)]',
  'shadow-[0_0_10px_oklch(0.82_0.18_195/0.6),0_0_20px_oklch(0.82_0.18_195/0.3)]',
  'shadow-[0_0_10px_oklch(0.75_0.22_330/0.6),0_0_20px_oklch(0.75_0.22_330/0.3)]',
  'shadow-[0_0_10px_oklch(0.88_0.2_85/0.6),0_0_20px_oklch(0.88_0.2_85/0.3)]',
  'shadow-[0_0_10px_oklch(0.78_0.2_145/0.6),0_0_20px_oklch(0.78_0.2_145/0.3)]',
  'shadow-[0_0_10px_oklch(0.72_0.2_270/0.6),0_0_20px_oklch(0.72_0.2_270/0.3)]',
];

const SOLVED_STATE = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

export function PuzzleGrid({ tiles, onTileClick, isWon }: PuzzleGridProps) {
  const emptyIdx = tiles.indexOf(0);

  const isAdjacent = (index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIdx / 4);
    const emptyCol = emptyIdx % 4;
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  return (
    <div
      className="relative p-3 rounded-lg"
      style={{
        background: 'oklch(0.14 0.02 265)',
        border: '2px solid oklch(0.28 0.06 265)',
        boxShadow: '0 0 30px oklch(0.82 0.18 195 / 0.15), inset 0 0 30px oklch(0 0 0 / 0.3)',
      }}
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines rounded-lg pointer-events-none z-10" />

      <div className="grid grid-cols-4 gap-2">
        {tiles.map((tile, index) => {
          if (tile === 0) {
            return (
              <div
                key="empty"
                className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded"
                style={{
                  background: 'oklch(0.1 0.01 265)',
                  border: '2px dashed oklch(0.28 0.04 265)',
                }}
              />
            );
          }

          const colorClass = TILE_COLORS[tile] || TILE_COLORS[1];
          const shadowClass = TILE_SHADOWS[tile] || TILE_SHADOWS[1];
          const canSlide = isAdjacent(index) && !isWon;
          const isInPlace = SOLVED_STATE[index] === tile;

          return (
            <button
              key={tile}
              onClick={() => onTileClick(index)}
              disabled={!canSlide}
              className={[
                'w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20',
                'rounded border-2 font-pixel text-sm',
                'transition-all duration-150 ease-out',
                'select-none relative overflow-hidden',
                colorClass,
                shadowClass,
                canSlide
                  ? 'cursor-pointer hover:scale-105 hover:brightness-125 active:scale-95'
                  : 'cursor-default',
                isWon && isInPlace ? 'animate-pulse-glow' : '',
              ].join(' ')}
              style={{
                fontSize: '0.7rem',
              }}
            >
              {/* Inner highlight */}
              <span
                className="absolute inset-0 rounded"
                style={{
                  background: 'linear-gradient(135deg, oklch(1 0 0 / 0.12) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <span className="relative z-10">{tile}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
