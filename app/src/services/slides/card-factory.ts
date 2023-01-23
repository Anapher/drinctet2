import React from 'react';
import { GameContext } from '../../types';

export default interface SlideFactory<TState> {
   createState: (game: GameContext) => TState;
   renderState: (state: TState, onChangeState: (state: TState) => void, game: GameContext) => React.ReactNode;
   getBackgroundColor: (state: TState) => string;
}

export interface CardRegistry {
   fetchFeasibleCard: (type: string) => Card;
}

export type Card = {
   id: string;
   type: string;
};
