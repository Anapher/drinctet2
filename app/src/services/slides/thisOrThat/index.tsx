import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import { FilledTextFragment, fillMultipleTextFragments } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectPlayers from '../../game-maker/selectPlayers';
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
      const [player] = selectPlayers(context.game);

      const card = selectCard(
         'thisOrThat',
         context,
         pipeChecks(
            hasLanguage((x) => x.option1),
            hasLanguage((x) => x.option2),
            textFragmentsFeasible((card, lang) => card.option1[lang] + card.option2[lang]),
         ),
      );

      const textFragments = fillMultipleTextFragments(
         [card.data.option1[context.lang], card.data.option2[context.lang]],
         context,
         [player],
      ) as [FilledTextFragment[], FilledTextFragment[]];

      return { textFragments, sips: selectSips() };
   },
   renderState(state) {
      return <Slide state={state} />;
   },
};

export default factory;
