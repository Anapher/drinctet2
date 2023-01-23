import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GameCard } from '../../types';

export const selectGame = (state: RootState) => state.game.game;

export const selectGameWithCards = createSelector(
   selectGame,
   (state: RootState, cards: GameCard[]) => cards,
   (game, cards) => {
      return {
         ...game,
         cards,
      };
   },
);

export const selectIsGameActive = (state: RootState) => Boolean(selectGame(state));
