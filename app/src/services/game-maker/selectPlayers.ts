import { Game, Player } from '../../types';
import { selectRandomWeighted } from '../../utils/random-utils';

export default function selectPlayers(game: Game, amount = 1): Player[] {
   const result = new Array<Player>();
   for (let i = 0; i < amount; i++) {
      const p = selectRandomWeighted(game.config.players, (x) => getPlayerWeight(x, result, game))!;
      result.push(p);
   }

   return result;
}

function getPlayerWeight(player: Player, selected: Player[], game: Game): number {
   if (!selected) return 1;
   if (
      selected.find((x) =>
         game.config.couples?.find((couple) => isPlayerInCouple(x, couple) && isPlayerInCouple(player, couple)),
      )
   )
      return 2;

   return 1;
}

function isPlayerInCouple(player: Player, couple: [string, string]) {
   return couple[0] === player.id && couple[1] === player.id;
}
