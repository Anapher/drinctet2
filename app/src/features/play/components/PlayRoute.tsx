import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GameForm, { useGameForm } from '../../../components/GameForm';
import globalConfig from '../../../global-config';
import createNewGame from '../../../services/game-maker/createNewGame';
import { GameConfig } from '../../../types';
import { loadGame } from '../../game/slice';
import HeaderLayout from './HeaderLayout';
import cardDecks from '../../../assets/card-decks';

export default function PlayRoute() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { t } = useTranslation();

   const gameForm = useGameForm({
      cardDeckIds: Object.keys(cardDecks),
      slideTypeWeights: globalConfig.defaultSlideWeights,
   });

   const {
      handleSubmit,
      formState: { isValid },
   } = gameForm;

   const onSubmit = (config: GameConfig) => {
      const game = createNewGame({ ...config });
      dispatch(loadGame(game));
      navigate('/game');
   };

   return (
      <HeaderLayout>
         <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
         >
            <GameForm form={gameForm} />
            <Button variant="contained" style={{ margin: 8, marginTop: 16 }} type="submit" disabled={!isValid}>
               {t('play.lets_play')}
            </Button>
         </form>
      </HeaderLayout>
   );
}
