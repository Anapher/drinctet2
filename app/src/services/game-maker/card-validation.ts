import { TextFragment } from '../text-interpolation/text-parser';
import checkTextFragmentsFillable from './checkTextFragmentsFillable';
import parseInterpolatedText from './parseInterpolatedText';
import { GameCardValidator } from './selectCard';

export function pipeChecks<TCard>(...validators: GameCardValidator<TCard>[]): GameCardValidator<TCard> {
   return (game, card) => {
      return !validators.find((x) => !x(game, card));
   };
}

export function hasLanguage<TCard>(textSelector: (card: TCard) => Record<string, any>): GameCardValidator<TCard> {
   return (context, card) => Boolean(textSelector(card)[context.lang]);
}

export function textFragmentsFeasible<TCard>(
   textSelector: (card: TCard, lang: string) => string,
): GameCardValidator<TCard> {
   return (context, card) => {
      let fragments: TextFragment[];
      try {
         fragments = parseInterpolatedText(context, textSelector(card, context.lang));
      } catch (error) {
         return false;
      }

      return checkTextFragmentsFillable(fragments, context.game);
   };
}
