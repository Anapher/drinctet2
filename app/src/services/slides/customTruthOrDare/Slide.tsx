import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { State } from '.';

const CenteredContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   height: '100%',
   width: '100%',
   color: 'white',
});

type Props = {
   state: State;
};

function CustomTruthOrDareSlide({ state: { playerName } }: Props) {
   const { t } = useTranslation();
   return (
      <CenteredContainer>
         <div>
            <Typography variant="h5" fontWeight="bold">
               {t('slides:customTruthOrDare.truthOrDare')}
            </Typography>
            <Typography align="center">{playerName}</Typography>
         </div>
      </CenteredContainer>
   );
}

export default CustomTruthOrDareSlide;
