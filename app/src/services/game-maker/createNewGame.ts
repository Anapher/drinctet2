import { Game, GameConfig } from '../../types';

export default function createNewGame(config: GameConfig) {
   const game: Game = {
      config,
      stack: [],
      stackIndex: 0,
   };

   return game;
}
