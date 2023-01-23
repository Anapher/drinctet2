import styled from '@emotion/styled';
import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsGameActive } from '../../game/selectors';
import { deleteGame } from '../../game/slice';

const Container = styled('div')({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
});

type Props = {
   children?: React.ReactNode;
};

function HeaderLayout({ children }: Props) {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const gameActive = useSelector(selectIsGameActive);

   const handleGoToActiveGame = () => {
      navigate('/game');
   };

   const handleDeleteActiveGame = () => {
      dispatch(deleteGame());
   };

   return (
      <Container>
         <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row" sx={{ my: 2 }}>
            <Box flex={1} />
            <Typography align="center" fontWeight="bold">
               {t('app_name')}
            </Typography>
            <Box flex={1} display="flex" justifyContent="flex-end">
               {gameActive && (
                  <Chip
                     sx={{ mr: 2 }}
                     size="small"
                     label={t('layout.active_game')}
                     clickable
                     onClick={handleGoToActiveGame}
                     onDelete={handleDeleteActiveGame}
                  />
               )}
            </Box>
         </Box>
         {children}
      </Container>
   );
}

export default HeaderLayout;
