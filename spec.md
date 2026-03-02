# Specification

## Summary
**Goal:** Build a classic 15-puzzle (4x4 sliding tile) game with a leaderboard backend, arcade-retro neon visual theme, and a custom logo.

**Planned changes:**
- Backend Motoko actor with `saveScore`, `getLeaderboard`, and `clearLeaderboard` functions; scores persist across upgrades and leaderboard returns top 10 sorted by fewest moves
- 4x4 grid frontend with tiles 1–15 and one empty space; tiles adjacent to the empty space are clickable and slide into position
- Randomized shuffled starting state, move counter, elapsed timer (starts on first move, stops on win), and win detection when tiles are in order 1–15 with empty space at bottom-right
- Congratulations modal on win prompting player to enter name and save score to backend
- New Game button to reset and reshuffle the board
- Leaderboard tab/section displaying top 10 scores fetched from backend
- Dark background with neon accent colors, glowing tile effects, smooth CSS slide transitions, and bold arcade/monospace typography; centered desktop layout
- Custom logo image displayed in the app header

**User-visible outcome:** Players can play the 15-puzzle, track their moves and time, save their score to a persistent leaderboard, and view the top 10 scores — all within a styled arcade-retro interface.
