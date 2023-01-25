import { hasLanguage, pipeChecks, textFragmentsFeasible } from '../../game-maker/card-validation';
import fillTextFragments, { FilledTextFragment } from '../../game-maker/fillTextFragments';
import selectCard from '../../game-maker/selectCard';
import selectPlayers from '../../game-maker/selectPlayers';
import selectSips from '../../game-maker/selectSips';
import SlideFactory from '../card-factory';
import Slide from './Slide';

export type State = {
   textFragments: FilledTextFragment[];
   sips: number;
   is: boolean;
   playerName: string;
   userDecision: boolean | 'outstanding';
};

const factory: SlideFactory<State> = {
   getBackgroundColor() {
      return 'linear-gradient(180deg, rgba(142, 68, 173,1.0) 0%, rgba(142, 68, 173,1.0) 100%)';
   },
   createState(context) {
      const [player] = selectPlayers(context.game);

      const card = selectCard(
         'fact',
         context,
         pipeChecks(
            hasLanguage((x) => x.text),
            textFragmentsFeasible((card, lang) => card.text[lang]),
         ),
      );

      const textFragments = fillTextFragments(card.data.text[context.lang], context, []);
      return {
         textFragments,
         sips: selectSips(),
         playerName: player.name,
         is: card.data.is,
         userDecision: 'outstanding',
      };
   },
   renderState(state, onChangeState) {
      const handleDissolve = (decision: boolean) => {
         onChangeState({ ...state, userDecision: decision });
      };

      return <Slide state={state} onDissolve={handleDissolve} />;
   },
};

export default factory;
