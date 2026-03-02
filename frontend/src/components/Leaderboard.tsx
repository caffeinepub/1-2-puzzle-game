import React from 'react';
import { Trophy, RefreshCw, Loader2 } from 'lucide-react';
import { useGetTopScores } from '@/hooks/useQueries';
import type { ScoreEntry } from '../backend';

function formatTime(seconds: bigint): string {
  const s = Number(seconds);
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

const RANK_COLORS = [
  { color: 'oklch(0.88 0.2 85)', shadow: 'oklch(0.88 0.2 85 / 0.8)' },
  { color: 'oklch(0.75 0.15 220)', shadow: 'oklch(0.75 0.15 220 / 0.8)' },
  { color: 'oklch(0.72 0.15 50)', shadow: 'oklch(0.72 0.15 50 / 0.8)' },
];

export function Leaderboard() {
  const { data: scores, isLoading, isError, refetch, isFetching } = useGetTopScores();

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={16} style={{ color: 'oklch(0.88 0.2 85)' }} />
          <h2
            className="font-pixel text-xs"
            style={{
              color: 'oklch(0.88 0.2 85)',
              textShadow: '0 0 10px oklch(0.88 0.2 85 / 0.7)',
            }}
          >
            TOP SCORES
          </h2>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded font-mono-tech text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          style={{
            background: 'oklch(0.18 0.02 265)',
            border: '1px solid oklch(0.28 0.04 265)',
            color: 'oklch(0.6 0.04 220)',
          }}
        >
          {isFetching ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <RefreshCw size={12} />
          )}
          REFRESH
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded overflow-hidden"
        style={{
          border: '1px solid oklch(0.28 0.04 265)',
          background: 'oklch(0.14 0.015 265)',
        }}
      >
        {/* Column headers */}
        <div
          className="grid grid-cols-12 px-4 py-2 text-xs font-mono-tech"
          style={{
            background: 'oklch(0.18 0.02 265)',
            borderBottom: '1px solid oklch(0.28 0.04 265)',
            color: 'oklch(0.5 0.03 220)',
          }}
        >
          <span className="col-span-1">#</span>
          <span className="col-span-5">PLAYER</span>
          <span className="col-span-3 text-right">MOVES</span>
          <span className="col-span-3 text-right">TIME</span>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-10 gap-2">
            <Loader2 size={16} className="animate-spin" style={{ color: 'oklch(0.82 0.18 195)' }} />
            <span className="font-mono-tech text-xs" style={{ color: 'oklch(0.5 0.03 220)' }}>
              Loading...
            </span>
          </div>
        )}

        {isError && (
          <div className="text-center py-10 font-mono-tech text-xs" style={{ color: 'oklch(0.65 0.22 25)' }}>
            Failed to load scores.
          </div>
        )}

        {!isLoading && !isError && (!scores || scores.length === 0) && (
          <div className="text-center py-10 space-y-2">
            <div className="font-pixel text-xs" style={{ color: 'oklch(0.4 0.02 220)' }}>
              NO SCORES YET
            </div>
            <div className="font-mono-tech text-xs" style={{ color: 'oklch(0.35 0.02 220)' }}>
              Be the first to complete the puzzle!
            </div>
          </div>
        )}

        {!isLoading && scores && scores.length > 0 && (
          <div>
            {scores.map((entry: ScoreEntry, idx: number) => {
              const rankStyle = RANK_COLORS[idx] || { color: 'oklch(0.6 0.04 220)', shadow: 'none' };
              const isTop3 = idx < 3;
              return (
                <div
                  key={`${entry.playerName}-${idx}`}
                  className="grid grid-cols-12 px-4 py-3 font-mono-tech text-sm transition-colors"
                  style={{
                    borderBottom: idx < scores.length - 1 ? '1px solid oklch(0.2 0.02 265)' : 'none',
                    background: isTop3 ? `oklch(0.16 0.02 265)` : 'transparent',
                  }}
                >
                  <span
                    className="col-span-1 font-pixel text-xs"
                    style={{
                      color: rankStyle.color,
                      textShadow: isTop3 ? `0 0 8px ${rankStyle.shadow}` : 'none',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className="col-span-5 truncate"
                    style={{ color: isTop3 ? 'oklch(0.85 0.04 220)' : 'oklch(0.65 0.03 220)' }}
                  >
                    {entry.playerName}
                  </span>
                  <span
                    className="col-span-3 text-right"
                    style={{
                      color: 'oklch(0.75 0.22 330)',
                      textShadow: isTop3 ? '0 0 6px oklch(0.75 0.22 330 / 0.6)' : 'none',
                    }}
                  >
                    {Number(entry.moveCount)}
                  </span>
                  <span
                    className="col-span-3 text-right"
                    style={{
                      color: 'oklch(0.82 0.18 195)',
                      textShadow: isTop3 ? '0 0 6px oklch(0.82 0.18 195 / 0.6)' : 'none',
                    }}
                  >
                    {formatTime(entry.timeInSeconds)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
