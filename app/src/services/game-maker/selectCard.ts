import { GameCardData } from '../../card-schemas';
import { GameCard, GameContext } from '../../types';
import { selectRandomWeighted } from '../../utils/random-utils';

type NarrowAction<T, N> = T extends { type: N } ? T : never;

export type GameCardValidator<T> = (game: GameContext, card: T) => boolean;

export default function selectCard<K extends GameCardData['type']>(
   type: K,
   context: GameContext,
   cardValidator?: GameCardValidator<NarrowAction<GameCardData, K>>,
): GameCard<NarrowAction<GameCardData, K>> {
   let viableCards = context.cards.filter((x) => x.data.type === type) as GameCard<NarrowAction<GameCardData, K>>[];
   if (cardValidator) {
      viableCards = viableCards.filter((x) => cardValidator(context, x.data));
   }

   if (viableCards.length === 0) {
      throw new NoCardFoundError('no cards available');
   }

   return selectRandomWeighted(viableCards, () => 1)!;
}

export class NoCardFoundError extends Error {
   constructor(message: string) {
      super(message);
   }
}
