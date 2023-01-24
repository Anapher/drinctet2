import { Box, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../app/store';
import createNextSlideState from '../../../services/game-maker/createNextSlideState';
import { getSlideFactory } from '../../../services/game-maker/getSlideFactory';
import { Game, GameCard, GameContext } from '../../../types';
import ScrollContainer from '../../../components/ScrollContainer';
import useCardsFromDecks from '../hooks/useCardsFromDecks';
import { selectGame } from '../selectors';
import { appendToStack, setIndex } from '../slice';
import GameMenuButton from './GameMenuButton';

function GameRoute() {
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
   const game = useSelector(selectGame);
   const { i18n } = useTranslation();

   useEffect(() => {
      if (!game) {
         navigate('/');
      }
   }, [game]);

   useEffect(() => {
      const preventDefault = (e: TouchEvent) => e.preventDefault();

      document.body.addEventListener('touchmove', preventDefault, { passive: false });
      document.body.scrollTop = 0;

      return () => {
         document.body.removeEventListener('touchmove', preventDefault);
      };
   }, []);

   const { cards, loading, error } = useCardsFromDecks(game?.config.cardDeckIds);
   const cache = useRef(new Map<string, any>()).current;

   const getGameContext = (game: Game, cards: GameCard[]) => {
      const gameContext: GameContext = {
         game,
         cards,
         cache,
         lang: i18n.resolvedLanguage,
      };

      return gameContext;
   };

   useEffect(() => {
      if (!game || !cards) return;

      if (game.stack.length < 2) {
         dispatch(appendToStack(createNextSlideState(getGameContext(game, cards))));
         dispatch(appendToStack(createNextSlideState(getGameContext(game, cards))));
      }
   }, [game && game.stack.length === 0, cards]);

   if (!game) {
      return null;
   }

   if (cards === undefined || loading) {
      return <Typography>Loading</Typography>;
   }

   if (error) {
      return <Typography>{error}</Typography>;
   }

   if (game.stack.length === 0) {
      return <Typography>Initializing game</Typography>;
   }

   const getBackgroundColor = (index: number) => {
      const slide = game.stack[index];
      const factory = getSlideFactory(slide.type);
      return factory.getBackgroundColor(slide.state);
   };

   const handleChangeIndex = (index: number) => {
      dispatch(setIndex(index));
      if (index === game.stack.length - 1) {
         dispatch(appendToStack(createNextSlideState(getGameContext(game, cards))));
      }
   };

   const handleRenderItem = (index: number) => {
      const slide = game.stack[index];
      const factory = getSlideFactory(slide.type);
      const handleChangeState = (state: any) => {
         console.log('update', state);
      };

      return factory.renderState(slide.state, handleChangeState, getGameContext(game, cards));
   };

   return (
      <Box position="relative" width="100%" height="100%" color="white" style={{ overflow: 'hidden' }}>
         <Box position="absolute" top={8} right={8}>
            <GameMenuButton />
         </Box>
         <ScrollContainer
            items={game.stack}
            index={game.stackIndex}
            endOfScrollColor="linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(46,46,46,1) 100%)"
            getBackgroundColor={getBackgroundColor}
            onChangeIndex={handleChangeIndex}
            renderItem={handleRenderItem}
         />
      </Box>
   );
}

export default GameRoute;
