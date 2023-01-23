import { GameContext, Player } from '../../types';
import { selectRandomWeighted } from '../../utils/random-utils';
import { PlainTextFragment, PlayerFragment, TextFragment } from '../text-interpolation/text-parser';
import parseInterpolatedText from './parseInterpolatedText';
import selectPlayers from './selectPlayers';
import selectSips from './selectSips';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function fillTextFragments(
   text: string,
   context: GameContext,
   pickedPlayers?: Player[],
): FilledTextFragment[] {
   const parsed = parseInterpolatedText(context, text);

   const playerIndexes = getUniquePlayerIndexes(parsed);
   if (pickedPlayers) {
      for (let i = 1; i <= pickedPlayers.length; i++) {
         playerIndexes.delete(i);
      }
   }

   const selectedPlayers = selectPlayers(
      context.game,
      playerIndexes.size,
      pickedPlayers?.map((x) => x.id),
   );

   const players = Object.fromEntries(Array.from(playerIndexes.keys()).map((index, i) => [index, selectedPlayers[i]]));

   if (pickedPlayers) {
      for (let i = 1; i <= pickedPlayers.length; i++) {
         players[i] = pickedPlayers[i - 1];
      }
   }

   let lastMentionedPlayerIndex = 1;

   return parsed.map<FilledTextFragment>((fragment) => {
      switch (fragment.type) {
         case 'plain':
            return fragment;
         case 'player':
            lastMentionedPlayerIndex = fragment.index;
            return { type: 'player', player: players[fragment.index] };
         case 'sips':
            return { type: 'sips', amount: selectSips(fragment.min) };
         case 'random-selection-number':
            return {
               type: 'selection',
               text: String(Math.round(Math.random() * (fragment.max - fragment.min) + fragment.min)),
            };
         case 'random-selection':
            return {
               type: 'selection',
               text: selectRandomWeighted(fragment.options, () => 1)!,
            };
         case 'random-selection-letter':
            return {
               type: 'selection',
               text: selectRandomWeighted(alphabet, () => 1)!.toUpperCase(),
            };
         case 'gendered':
            return {
               type: 'plain',
               text: fragment[players[lastMentionedPlayerIndex].gender],
            };
      }
   });
}

export function getUniquePlayerIndexes(fragments: TextFragment[]) {
   return new Set(fragments.filter((x): x is PlayerFragment => x.type === 'player').map((x) => x.index));
}

export type FilledPlayerFragment = {
   type: 'player';
   player: Player;
};

export type FilledSipsFragment = {
   type: 'sips';
   amount: number;
};

export type FilledSelectionFragment = {
   type: 'selection';
   text: string;
};

export type FilledTextFragment =
   | FilledPlayerFragment
   | PlainTextFragment
   | FilledSipsFragment
   | FilledSelectionFragment;
