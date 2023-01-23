import selectPlayers from '../../game-maker/selectPlayers';
import SlideFactory from '../card-factory';
import CustomTruthOrDareSlide from './Slide';

export type State = {
   playerName: string;
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(211,9,225,1) 0%, rgba(255,0,140,1) 100%)';
   },
   createState({ game }) {
      const [player] = selectPlayers(game);
      return { playerName: player.name };
   },
   renderState(state) {
      return <CustomTruthOrDareSlide state={state} />;
   },
};

export default factory;
