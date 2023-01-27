import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import { FilledTextFragment, fillMultipleTextFragments } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectCardLanguage from '../../game-maker/selectCardLanguage';
import SlideFactory from '../card-factory';
import Slide from './Slide';

export type State = {
   miniGame: {
      title: FilledTextFragment[];
      shortExplanation: FilledTextFragment[];
      explanation: FilledTextFragment[] | undefined;
   };
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(41, 128, 185,1.0) 0%, rgba(41, 128, 185,1.0) 100%)';
   },
   createState(context) {
      const card = selectCard(
         'miniGame',
         context,
         pipeChecks(
            hasLanguage((x) => x.content),
            textFragmentsFeasible((card) => Object.values(selectCardLanguage(card.content, context)).join()),
         ),
      );

      const cardTexts = selectCardLanguage(card.data.content, context);

      const textFragments = fillMultipleTextFragments(
         [cardTexts.title, cardTexts.shortExplanation, cardTexts.explanation || ''],
         context,
      ) as [FilledTextFragment[], FilledTextFragment[], FilledTextFragment[]];

      return {
         miniGame: {
            title: textFragments[0],
            shortExplanation: textFragments[1],
            explanation: textFragments[2].length === 0 ? undefined : textFragments[2],
         },
      };
   },
   renderState(state) {
      return <Slide state={state} />;
   },
};

export default factory;
