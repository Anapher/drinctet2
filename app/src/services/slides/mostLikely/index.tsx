import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import fillTextFragments, { FilledTextFragment } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectCardLanguage from '../../game-maker/selectCardLanguage';
import selectSips from '../../game-maker/selectSips';
import SlideFactory from '../card-factory';
import MostLikelySlide from './Slide';

export type State = {
   textFragments: FilledTextFragment[];
   sips: number;
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(39,174,96,1) 0%, rgba(32,205,105,1) 100%)';
   },
   createState(context) {
      const card = selectCard(
         'mostLikely',
         context,
         pipeChecks(
            hasLanguage((x) => x.question),
            textFragmentsFeasible((card) => selectCardLanguage(card.question, context)),
         ),
      );

      const textFragments = fillTextFragments(selectCardLanguage(card.data.question, context), context);
      return { textFragments, sips: selectSips() };
   },
   renderState(state) {
      return <MostLikelySlide state={state} />;
   },
};

export default factory;
