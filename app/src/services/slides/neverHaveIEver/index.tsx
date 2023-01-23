import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import fillTextFragments, { FilledTextFragment } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectSips from '../../game-maker/selectSips';
import SlideFactory from '../card-factory';
import NeverHaveIEverSlide from './Slide';

export type State = {
   textFragments: FilledTextFragment[];
   sips: number;
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(255,164,21,1) 0%, rgba(250,205,10,1) 100%)';
   },
   createState(context) {
      const card = selectCard(
         'neverHaveIEver',
         context,
         pipeChecks(
            hasLanguage((x) => x.statement),
            textFragmentsFeasible((card, lang) => card.statement[lang]),
         ),
      );

      const textFragments = fillTextFragments(card.data.statement[context.lang], context);
      return { textFragments, sips: selectSips() };
   },
   renderState(state) {
      return <NeverHaveIEverSlide state={state} />;
   },
};

export default factory;
