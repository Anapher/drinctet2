import { Game } from '../../types';
import { PlayerFragment, TextFragment } from '../text-interpolation/text-parser';

export default function checkTextFragmentsFillable(fragments: TextFragment[], game: Game) {
   const playerAmount = game.config.players.length;
   const requiredPlayers = new Set(
      fragments.filter((x): x is PlayerFragment => x.type === 'player').map((x) => x.index),
   ).size;

   return playerAmount >= requiredPlayers;
}
