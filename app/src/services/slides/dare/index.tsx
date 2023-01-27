import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import fillTextFragments, { FilledTextFragment } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectCardLanguage from '../../game-maker/selectCardLanguage';
import selectPlayers from '../../game-maker/selectPlayers';
import SlideFactory from '../card-factory';
import DareSlide from './Slide';

export type State = {
   textFragments: FilledTextFragment[];
   playerName: string;
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(52, 73, 94,1.0) 0%, rgba(52, 73, 94,1.0) 100%)';
   },
   createState(context) {
      const [player] = selectPlayers(context.game);

      const card = selectCard(
         'dare',
         context,
         pipeChecks(
            hasLanguage((x) => x.dare),
            textFragmentsFeasible((card) => selectCardLanguage(card.dare, context)),
         ),
      );

      const textFragments = fillTextFragments(selectCardLanguage(card.data.dare, context), context, [player]);
      return { textFragments, playerName: player.name };
   },
   renderState(state) {
      return <DareSlide state={state} />;
   },
};

export default factory;
