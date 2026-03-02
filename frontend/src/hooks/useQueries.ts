import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ScoreEntry } from '../backend';

export function useGetTopScores() {
  const { actor, isFetching } = useActor();

  return useQuery<ScoreEntry[]>({
    queryKey: ['topScores'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopScores();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSaveScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      playerName,
      moveCount,
      timeInSeconds,
    }: {
      playerName: string;
      moveCount: number;
      timeInSeconds: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      const timestamp = BigInt(Date.now());
      await actor.saveScore(
        playerName,
        BigInt(moveCount),
        BigInt(timeInSeconds),
        timestamp
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topScores'] });
    },
  });
}
