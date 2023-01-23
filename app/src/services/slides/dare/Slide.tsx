import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { State } from '.';
import RenderFragments from '../RenderFragments';
import { CardBottom, CardContainer, CardHeader } from '../styles';

type Props = {
   state: State;
};

function DareSlide({ state: { textFragments, playerName } }: Props) {
   const { t } = useTranslation();
   return (
      <CardContainer>
         <CardHeader>
            <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={400}>
               {t('slides:dare.title')}
            </Typography>
         </CardHeader>
         <Box mx={3}>
            <Typography align="center" fontSize={{}}>
               <b>{playerName}: </b>
               <RenderFragments filledFragments={textFragments} />
            </Typography>
         </Box>
         <CardBottom>
            <Typography fontSize={{ xs: 10, sm: 12, lg: 14 }} sx={{ opacity: 0.75 }} align="center">
               {t('slides:dare.penalty')}
            </Typography>
         </CardBottom>
      </CardContainer>
   );
}

export default DareSlide;
