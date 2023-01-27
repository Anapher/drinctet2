import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import fillTextFragments, { FilledTextFragment } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectCardLanguage from '../../game-maker/selectCardLanguage';
import selectPlayers from '../../game-maker/selectPlayers';
import selectSips from '../../game-maker/selectSips';
import SlideFactory from '../card-factory';
import CategorySlide from './Slide';

export type State = {
   textFragments: FilledTextFragment[];
   startingPlayerName: string;
   sips: number;
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(21,134,255,1) 0%, rgba(84,149,255,1) 100%)';
   },
   createState(context) {
      const [player] = selectPlayers(context.game);
      const card = selectCard(
         'category',
         context,
         pipeChecks(
            hasLanguage((x) => x.category),
            textFragmentsFeasible((card) => selectCardLanguage(card.category, context)),
         ),
      );

      const textFragments = fillTextFragments(selectCardLanguage(card.data.category, context), context);
      return { startingPlayerName: player.name, textFragments, sips: selectSips() };
   },
   renderState(state) {
      return <CategorySlide state={state} />;
   },
};

export default factory;
