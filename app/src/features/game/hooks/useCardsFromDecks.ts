import { GameCard } from '../../../types';
import cardDecks from '../../../assets/card-decks';

export default function useCardsFromDecks(deckIds?: string[]): { cards: GameCard[]; error?: string; loading: boolean } {
   return {
      cards: Object.entries(cardDecks)
         .filter(([id]) => deckIds?.includes(id))
         .flatMap<GameCard>(([id, cards]) => cards.map<GameCard>((data, index) => ({ id: `${id}/${index}`, data }))),
      loading: false,
   };
}
