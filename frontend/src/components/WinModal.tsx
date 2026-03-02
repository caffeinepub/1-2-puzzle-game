import React, { useState } from 'react';
import { Trophy, RotateCcw, Send, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useSaveScore } from '@/hooks/useQueries';

interface WinModalProps {
  open: boolean;
  moveCount: number;
  elapsedSeconds: number;
  onPlayAgain: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function WinModal({ open, moveCount, elapsedSeconds, onPlayAgain }: WinModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const saveScore = useSaveScore();

  const handleSubmit = async () => {
    if (!playerName.trim()) return;
    await saveScore.mutateAsync({
      playerName: playerName.trim(),
      moveCount,
      timeInSeconds: elapsedSeconds,
    });
    setSubmitted(true);
  };

  const handlePlayAgain = () => {
    setPlayerName('');
    setSubmitted(false);
    onPlayAgain();
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-sm border-0 p-0 overflow-hidden"
        style={{
          background: 'oklch(0.13 0.02 265)',
          border: '2px solid oklch(0.88 0.2 85)',
          boxShadow: '0 0 40px oklch(0.88 0.2 85 / 0.4), 0 0 80px oklch(0.88 0.2 85 / 0.2)',
        }}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header glow bar */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, oklch(0.82 0.18 195), oklch(0.88 0.2 85), oklch(0.75 0.22 330))',
          }}
        />

        <div className="p-6 space-y-5">
          <DialogHeader className="space-y-3">
            <div className="flex justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center animate-win-bounce"
                style={{
                  background: 'oklch(0.2 0.06 85)',
                  border: '2px solid oklch(0.88 0.2 85)',
                  boxShadow: '0 0 20px oklch(0.88 0.2 85 / 0.6)',
                }}
              >
                <Trophy size={28} style={{ color: 'oklch(0.88 0.2 85)' }} />
              </div>
            </div>
            <DialogTitle
              className="text-center font-pixel text-sm"
              style={{
                color: 'oklch(0.88 0.2 85)',
                textShadow: '0 0 12px oklch(0.88 0.2 85 / 0.8)',
              }}
            >
              PUZZLE SOLVED!
            </DialogTitle>
            <DialogDescription className="text-center font-mono-tech text-xs" style={{ color: 'oklch(0.6 0.04 220)' }}>
              Congratulations! You completed the puzzle.
            </DialogDescription>
          </DialogHeader>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="text-center p-3 rounded"
              style={{
                background: 'oklch(0.18 0.04 330)',
                border: '1px solid oklch(0.75 0.22 330 / 0.5)',
              }}
            >
              <div className="text-xs font-mono-tech" style={{ color: 'oklch(0.6 0.04 220)' }}>MOVES</div>
              <div
                className="font-pixel text-lg mt-1"
                style={{
                  color: 'oklch(0.75 0.22 330)',
                  textShadow: '0 0 8px oklch(0.75 0.22 330 / 0.8)',
                }}
              >
                {moveCount}
              </div>
            </div>
            <div
              className="text-center p-3 rounded"
              style={{
                background: 'oklch(0.18 0.04 195)',
                border: '1px solid oklch(0.82 0.18 195 / 0.5)',
              }}
            >
              <div className="text-xs font-mono-tech" style={{ color: 'oklch(0.6 0.04 220)' }}>TIME</div>
              <div
                className="font-pixel text-lg mt-1"
                style={{
                  color: 'oklch(0.82 0.18 195)',
                  textShadow: '0 0 8px oklch(0.82 0.18 195 / 0.8)',
                }}
              >
                {formatTime(elapsedSeconds)}
              </div>
            </div>
          </div>

          {/* Score submission */}
          {!submitted ? (
            <div className="space-y-3">
              <p className="text-xs font-mono-tech text-center" style={{ color: 'oklch(0.6 0.04 220)' }}>
                Save your score to the leaderboard:
              </p>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter your name..."
                maxLength={20}
                className="font-mono-tech text-sm text-center"
                style={{
                  background: 'oklch(0.18 0.02 265)',
                  border: '1px solid oklch(0.82 0.18 195 / 0.5)',
                  color: 'oklch(0.9 0.05 195)',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!playerName.trim() || saveScore.isPending}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded font-pixel text-xs transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'oklch(0.2 0.06 195)',
                  border: '2px solid oklch(0.82 0.18 195)',
                  color: 'oklch(0.82 0.18 195)',
                  boxShadow: '0 0 10px oklch(0.82 0.18 195 / 0.4)',
                }}
              >
                {saveScore.isPending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Send size={12} />
                )}
                {saveScore.isPending ? 'SAVING...' : 'SAVE SCORE'}
              </button>
            </div>
          ) : (
            <div
              className="text-center py-3 rounded font-mono-tech text-sm"
              style={{
                background: 'oklch(0.18 0.06 145)',
                border: '1px solid oklch(0.78 0.2 145 / 0.5)',
                color: 'oklch(0.78 0.2 145)',
              }}
            >
              ✓ Score saved!
            </div>
          )}

          {/* Play Again */}
          <button
            onClick={handlePlayAgain}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded font-pixel text-xs transition-all duration-150 hover:scale-105 active:scale-95"
            style={{
              background: 'oklch(0.2 0.06 85)',
              border: '2px solid oklch(0.88 0.2 85)',
              color: 'oklch(0.88 0.2 85)',
              boxShadow: '0 0 10px oklch(0.88 0.2 85 / 0.4)',
              textShadow: '0 0 8px oklch(0.88 0.2 85 / 0.6)',
            }}
          >
            <RotateCcw size={12} />
            PLAY AGAIN
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
