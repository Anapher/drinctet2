import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import fillTextFragments, { FilledTextFragment } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectCardLanguage from '../../game-maker/selectCardLanguage';
import SlideFactory from '../card-factory';
import Slide from './Slide';

export type State = {
   textFragments: FilledTextFragment[];
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(41, 128, 185,1.0) 0%, rgba(41, 128, 185,1.0) 100%)';
   },
   createState(context) {
      const card = selectCard(
         'activity',
         context,
         pipeChecks(
            hasLanguage((x) => x.content),
            textFragmentsFeasible((card) => selectCardLanguage(card.content, context)),
         ),
      );

      const textFragments = fillTextFragments(selectCardLanguage(card.data.content, context), context, []);

      return { textFragments };
   },
   renderState(state) {
      return <Slide state={state} />;
   },
};

export default factory;
