import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PuzzleGrid } from '@/components/PuzzleGrid';
import { GameControls } from '@/components/GameControls';
import { WinModal } from '@/components/WinModal';
import { Leaderboard } from '@/components/Leaderboard';
import { usePuzzleGame } from '@/hooks/usePuzzleGame';

const HOW_TO_PLAY = [
  'Click tiles adjacent to the empty space to slide them.',
  'Arrange tiles 1–15 in order from left to right, top to bottom.',
  'The empty space should end up in the bottom-right corner.',
  'Try to solve it in as few moves as possible!',
];

export default function App() {
  const { tiles, moveCount, elapsedSeconds, isWon, slideTile, newGame } = usePuzzleGame();
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'oklch(0.1 0.01 265)' }}>
      {/* Header */}
      <header
        className="w-full py-4 px-6 flex items-center justify-center relative"
        style={{
          borderBottom: '1px solid oklch(0.22 0.04 265)',
          background: 'oklch(0.12 0.015 265)',
        }}
      >
        {/* Glow line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, transparent, oklch(0.82 0.18 195), oklch(0.75 0.22 330), oklch(0.88 0.2 85), transparent)',
          }}
        />
        <div className="flex items-center gap-4">
          <img
            src="/assets/generated/puzzle-logo.dim_256x256.png"
            alt="1-2 Puzzle Logo"
            className="w-12 h-12 rounded"
            style={{
              filter: 'drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.7))',
            }}
          />
          <div>
            <h1
              className="font-pixel text-lg leading-tight"
              style={{
                color: 'oklch(0.82 0.18 195)',
                textShadow: '0 0 12px oklch(0.82 0.18 195 / 0.8), 0 0 30px oklch(0.82 0.18 195 / 0.4)',
              }}
            >
              1-2 PUZZLE
            </h1>
            <p
              className="font-mono-tech text-xs mt-0.5"
              style={{ color: 'oklch(0.5 0.04 220)' }}
            >
              15-tile sliding puzzle
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-lg">
          <Tabs defaultValue="game" className="w-full">
            {/* Tab navigation */}
            <TabsList
              className="w-full mb-6 p-1 rounded"
              style={{
                background: 'oklch(0.16 0.02 265)',
                border: '1px solid oklch(0.28 0.04 265)',
              }}
            >
              <TabsTrigger
                value="game"
                className="flex-1 font-pixel text-xs data-[state=active]:text-[oklch(0.82_0.18_195)] data-[state=active]:bg-[oklch(0.2_0.04_265)]"
                style={{ fontSize: '0.6rem' }}
              >
                GAME
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="flex-1 font-pixel text-xs data-[state=active]:text-[oklch(0.88_0.2_85)] data-[state=active]:bg-[oklch(0.2_0.04_265)]"
                style={{ fontSize: '0.6rem' }}
              >
                LEADERBOARD
              </TabsTrigger>
              <TabsTrigger
                value="howto"
                className="flex-1 font-pixel text-xs data-[state=active]:text-[oklch(0.75_0.22_330)] data-[state=active]:bg-[oklch(0.2_0.04_265)]"
                style={{ fontSize: '0.6rem' }}
              >
                HOW TO PLAY
              </TabsTrigger>
            </TabsList>

            {/* Game Tab */}
            <TabsContent value="game" className="space-y-4 animate-slide-in">
              {/* Controls */}
              <GameControls
                moveCount={moveCount}
                elapsedSeconds={elapsedSeconds}
                onNewGame={newGame}
                isWon={isWon}
              />

              {/* Puzzle Grid */}
              <div className="flex justify-center">
                <PuzzleGrid
                  tiles={tiles}
                  onTileClick={slideTile}
                  isWon={isWon}
                />
              </div>

              {/* Hint */}
              {!isWon && (
                <p
                  className="text-center font-mono-tech text-xs"
                  style={{ color: 'oklch(0.4 0.02 220)' }}
                >
                  Click a tile next to the empty space to slide it
                </p>
              )}
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="animate-slide-in">
              <Leaderboard />
            </TabsContent>

            {/* How to Play Tab */}
            <TabsContent value="howto" className="animate-slide-in">
              <div
                className="rounded p-6 space-y-5"
                style={{
                  background: 'oklch(0.14 0.015 265)',
                  border: '1px solid oklch(0.28 0.04 265)',
                }}
              >
                <h2
                  className="font-pixel text-xs"
                  style={{
                    color: 'oklch(0.75 0.22 330)',
                    textShadow: '0 0 10px oklch(0.75 0.22 330 / 0.7)',
                  }}
                >
                  HOW TO PLAY
                </h2>
                <ol className="space-y-3">
                  {HOW_TO_PLAY.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="font-pixel text-xs shrink-0 w-5 h-5 flex items-center justify-center rounded"
                        style={{
                          background: 'oklch(0.2 0.06 330)',
                          border: '1px solid oklch(0.75 0.22 330 / 0.5)',
                          color: 'oklch(0.75 0.22 330)',
                          fontSize: '0.5rem',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="font-mono-tech text-sm leading-relaxed"
                        style={{ color: 'oklch(0.7 0.04 220)' }}
                      >
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div
                  className="mt-4 p-4 rounded"
                  style={{
                    background: 'oklch(0.18 0.04 195)',
                    border: '1px solid oklch(0.82 0.18 195 / 0.3)',
                  }}
                >
                  <p
                    className="font-pixel text-xs mb-2"
                    style={{ color: 'oklch(0.82 0.18 195)', fontSize: '0.55rem' }}
                  >
                    GOAL STATE
                  </p>
                  <div className="grid grid-cols-4 gap-1 max-w-[160px]">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0].map((n, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 flex items-center justify-center rounded font-pixel text-xs"
                        style={{
                          background: n === 0 ? 'oklch(0.1 0.01 265)' : 'oklch(0.2 0.08 195)',
                          border: n === 0 ? '1px dashed oklch(0.28 0.04 265)' : '1px solid oklch(0.82 0.18 195 / 0.5)',
                          color: 'oklch(0.82 0.18 195)',
                          fontSize: '0.5rem',
                        }}
                      >
                        {n !== 0 ? n : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="w-full py-4 px-6 text-center"
        style={{
          borderTop: '1px solid oklch(0.22 0.04 265)',
          background: 'oklch(0.12 0.015 265)',
        }}
      >
        <p className="font-mono-tech text-xs" style={{ color: 'oklch(0.4 0.02 220)' }}>
          © {new Date().getFullYear()} 1-2 Puzzle &nbsp;·&nbsp; Built with{' '}
          <Heart
            size={10}
            className="inline-block"
            style={{ color: 'oklch(0.75 0.22 330)', fill: 'oklch(0.75 0.22 330)' }}
          />{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'unknown-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'oklch(0.82 0.18 195)' }}
            className="hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Win Modal */}
      <WinModal
        open={isWon}
        moveCount={moveCount}
        elapsedSeconds={elapsedSeconds}
        onPlayAgain={newGame}
      />
    </div>
  );
}
