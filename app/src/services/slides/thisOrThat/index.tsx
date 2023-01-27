import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import { FilledTextFragment, fillMultipleTextFragments } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectCardLanguage from '../../game-maker/selectCardLanguage';
import selectSips from '../../game-maker/selectSips';
import SlideFactory from '../card-factory';
import Slide from './Slide';

export type State = {
   textFragments: [FilledTextFragment[], FilledTextFragment[]];
   sips: number;
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(230, 126, 34,1.0) 0%, rgba(230, 126, 34,1.0) 100%)';
   },
   createState(context) {
      const card = selectCard(
         'thisOrThat',
         context,
         pipeChecks(
            hasLanguage((x) => x.options),
            textFragmentsFeasible((card) => selectCardLanguage(card.options, context).join()),
         ),
      );

      const textFragments = fillMultipleTextFragments(selectCardLanguage(card.data.options, context), context) as [
         FilledTextFragment[],
         FilledTextFragment[],
      ];

      return { textFragments, sips: selectSips() };
   },
   renderState(state) {
      return <Slide state={state} />;
   },
};

export default factory;
