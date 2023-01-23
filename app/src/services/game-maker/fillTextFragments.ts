import { GameContext, Player } from '../../types';
import { selectRandomWeighted } from '../../utils/random-utils';
import { PlainTextFragment, PlayerFragment, TextFragment } from '../text-interpolation/text-parser';
import parseInterpolatedText from './parseInterpolatedText';
import selectPlayers from './selectPlayers';
import selectSips from './selectSips';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function fillTextFragments(text: string, context: GameContext): FilledTextFragment[] {
   const parsed = parseInterpolatedText(context, text);

   const playerIndexes = getUniquePlayerIndexes(parsed);
   const selectedPlayers = selectPlayers(context.game, playerIndexes.size);

   const players = Object.fromEntries(new Array(playerIndexes.keys()).map((index, i) => [index, selectedPlayers[i]]));

   return parsed.map<FilledTextFragment>((fragment) => {
      switch (fragment.type) {
         case 'plain':
            return fragment;
         case 'player':
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
         default:
            throw new Error('Unknown text fragment');
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
