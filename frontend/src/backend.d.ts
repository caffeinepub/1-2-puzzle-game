import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScoreEntry {
    moveCount: bigint;
    timeInSeconds: bigint;
    timestamp: bigint;
    playerName: string;
}
export interface backendInterface {
    clearScores(): Promise<void>;
    getTopScores(): Promise<Array<ScoreEntry>>;
    saveScore(playerName: string, moveCount: bigint, timeInSeconds: bigint, timestamp: bigint): Promise<void>;
}
