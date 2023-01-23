import { Container } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../../types';
import { loadGame } from '../../game/slice';
import GameForm from './GameForm';
import HeaderLayout from './HeaderLayout';

export default function PlayRoute() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleCreateGame = (game: Game) => {
      dispatch(loadGame(game));
      navigate('/game');
   };

   return (
      <HeaderLayout>
         <GameForm onCreateGame={handleCreateGame} />
      </HeaderLayout>
   );
}
