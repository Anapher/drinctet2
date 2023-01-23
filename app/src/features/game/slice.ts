import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CachedSlide, Game } from '../../types';

export type GameState = {
   game: Game | null;
};

const initialState: GameState = {
   game: null,
};

export const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {
      loadGame(state, { payload }: PayloadAction<Game>) {
         state.game = payload;
      },
      deleteGame(state) {
         state.game = null;
      },
      setIndex(state, { payload }: PayloadAction<number>) {
         if (!state.game) return;
         state.game.stackIndex = payload;
      },
      appendToStack(state, { payload }: PayloadAction<CachedSlide>) {
         if (!state.game) return;
         state.game.stack.push(payload);
      },
   },
});

export const { loadGame, setIndex, appendToStack, deleteGame } = gameSlice.actions;

export default gameSlice.reducer;
