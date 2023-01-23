import { GameCard } from '../../../types';
import niceDeck from '../../../assets/card-decks/nice.json';
import { GameCardData } from '../../../card-schemas';

const decks: { [key: string]: GameCardData[] } = {
   niceDeck,
} as any;

export default function useCardsFromDecks(deckIds?: string[]): { cards: GameCard[]; error?: string; loading: boolean } {
   return {
      cards: Object.entries(decks)
         .filter((x) => true)
         .flatMap<GameCard>(([id, cards]) => cards.map<GameCard>((data, index) => ({ id: `${id}/${index}`, data }))),
      loading: false,
   };
}
