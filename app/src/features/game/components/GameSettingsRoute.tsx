import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentContainer from '../../../components/ContentContainer';
import GameForm, { useGameForm } from '../../../components/GameForm';
import { GameConfig } from '../../../types';
import { selectGame } from '../selectors';
import { loadGame } from '../slice';

const Root = styled('div')({ flex: 1, display: 'flex', flexDirection: 'column' });

export default function GameSettingsRoute() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { t } = useTranslation();
   const game = useSelector(selectGame);

   const onSubmit = (config: GameConfig) => {
      if (!game) return;

      dispatch(loadGame({ ...game, config }));
      navigate('/game', { replace: true });
   };

   const handleCancel = () => {
      navigate('/game', { replace: true });
   };

   const gameForm = useGameForm(game?.config);

   const {
      handleSubmit,
      formState: { isValid },
   } = gameForm;

   return (
      <Root>
         <form onSubmit={handleSubmit(onSubmit)}>
            <AppBar position="static">
               <Toolbar>
                  <Button sx={{ color: '#fff' }} onClick={handleCancel}>
                     {t('cancel')}
                  </Button>
                  <Typography sx={{ flex: 1, textAlign: 'center' }}>Settings</Typography>
                  <Button sx={{ color: '#fff' }} type="submit" disabled={!isValid}>
                     {t('save')}
                  </Button>
               </Toolbar>
            </AppBar>

            <ContentContainer>
               <GameForm form={gameForm} />
            </ContentContainer>
         </form>
      </Root>
   );
}
