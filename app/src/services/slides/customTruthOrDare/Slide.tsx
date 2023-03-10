import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { State } from '.';
import {
   CardBottom,
   CardHeader,
   CardContainer,
   descriptionTextFontSize,
   mainTextFontSize,
   titleTypographyProps,
} from '../styles';

type Props = {
   state: State;
};

function CustomTruthOrDareSlide({ state: { targetPlayer, questionPlayer } }: Props) {
   const { t } = useTranslation();

   return (
      <CardContainer>
         <CardHeader>
            <Typography {...titleTypographyProps}>{t('slides:customTruthOrDare.truthOrDare')}</Typography>
         </CardHeader>
         <Box mx={3}>
            <Typography align="center" fontSize={mainTextFontSize}>
               <b>{targetPlayer}</b>
            </Typography>
         </Box>
         <CardBottom>
            <Typography fontSize={descriptionTextFontSize} align="center">
               <b>{questionPlayer} </b>
               {t('slides:customTruthOrDare.description')}
            </Typography>
         </CardBottom>
      </CardContainer>
   );
}

export default CustomTruthOrDareSlide;
