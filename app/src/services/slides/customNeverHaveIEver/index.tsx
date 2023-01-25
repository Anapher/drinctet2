import selectPlayers from '../../game-maker/selectPlayers';
import selectSips from '../../game-maker/selectSips';
import SlideFactory from '../card-factory';
import Slide from './Slide';

export type State = {
   playerName: string;
   sips: number;
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(26, 188, 156,1.0) 0%, rgba(26, 188, 156,1.0) 100%)';
   },
   createState(context) {
      const [player] = selectPlayers(context.game);
      return { playerName: player.name, sips: selectSips() };
   },
   renderState(state) {
      return <Slide state={state} />;
   },
};

export default factory;
