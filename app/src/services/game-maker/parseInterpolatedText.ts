import { GameContext } from '../../types';
import parseText, { TextFragment } from '../text-interpolation/text-parser';

export default function parseInterpolatedText(context: GameContext, text: string): TextFragment[] {
   const cacheKey = createKey(text);
   const cachedEntry = context.cache.get(cacheKey);
   if (cachedEntry) {
      return cachedEntry;
   }

   const parsed = parseText(text);
   context.cache.set(cacheKey, parsed);

   return parsed;
}

function createKey(text: string): string {
   return 'interpolatedText/' + text;
}
