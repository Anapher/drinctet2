import { GameContext } from '../../types';

export default function selectCardLanguage<T = string>(text: Record<string, T>, context: GameContext) {
   if (text[context.lang]) return text[context.lang];
   if (context.game.config.alwaysShowEnglishCards && text['en']) return text['en'];

   throw new Error(
      'This card is not translated to the current language. Make sure to include the language check in the card selection call.',
   );
}
