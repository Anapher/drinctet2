import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import fillTextFragments, { FilledTextFragment } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
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
            textFragmentsFeasible((card, lang) => card.question[lang]),
         ),
      );

      const textFragments = fillTextFragments(card.data.question[context.lang], context);
      return { textFragments, sips: selectSips() };
   },
   renderState(state) {
      return <MostLikelySlide state={state} />;
   },
};

export default factory;
