import { useState, useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 4;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const SOLVED_STATE = [...Array(TOTAL_TILES - 1).keys()].map(i => i + 1).concat([0]);

function isSolvable(tiles: number[]): boolean {
  const arr = tiles.filter(t => t !== 0);
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inversions++;
    }
  }
  const emptyRow = Math.floor(tiles.indexOf(0) / GRID_SIZE);
  const emptyFromBottom = GRID_SIZE - emptyRow;
  if (GRID_SIZE % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    if (emptyFromBottom % 2 === 0) return inversions % 2 === 1;
    else return inversions % 2 === 0;
  }
}

function shuffleTiles(): number[] {
  let tiles: number[];
  do {
    tiles = [...SOLVED_STATE];
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles) || isWon(tiles));
  return tiles;
}

function isWon(tiles: number[]): boolean {
  return tiles.every((val, idx) => val === SOLVED_STATE[idx]);
}

export interface PuzzleGameState {
  tiles: number[];
  moveCount: number;
  elapsedSeconds: number;
  isWon: boolean;
  isStarted: boolean;
  slideTile: (index: number) => void;
  newGame: () => void;
}

export function usePuzzleGame(): PuzzleGameState {
  const [tiles, setTiles] = useState<number[]>(() => shuffleTiles());
  const [moveCount, setMoveCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [won, setWon] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wonRef = useRef(false);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const slideTile = useCallback((index: number) => {
    if (wonRef.current) return;

    setTiles(prev => {
      const emptyIdx = prev.indexOf(0);
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;
      const emptyRow = Math.floor(emptyIdx / GRID_SIZE);
      const emptyCol = emptyIdx % GRID_SIZE;

      const isAdjacent =
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1);

      if (!isAdjacent) return prev;

      const next = [...prev];
      [next[index], next[emptyIdx]] = [next[emptyIdx], next[index]];

      setMoveCount(m => m + 1);

      if (isWon(next)) {
        wonRef.current = true;
        setWon(true);
        stopTimer();
      }

      return next;
    });

    setIsStarted(prev => {
      if (!prev) {
        startTimer();
        return true;
      }
      return prev;
    });
  }, [startTimer, stopTimer]);

  const newGame = useCallback(() => {
    stopTimer();
    wonRef.current = false;
    setTiles(shuffleTiles());
    setMoveCount(0);
    setElapsedSeconds(0);
    setIsStarted(false);
    setWon(false);
  }, [stopTimer]);

  return {
    tiles,
    moveCount,
    elapsedSeconds,
    isWon: won,
    isStarted,
    slideTile,
    newGame,
  };
}
