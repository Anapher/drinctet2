import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { State } from '.';
import RenderFragments from '../RenderFragments';
import {
   CardBottom,
   CardContainer,
   CardHeader,
   descriptionTextFontSize,
   mainTextFontSize,
   titleTypographyProps,
} from '../styles';

type Props = {
   state: State;
};

function CategorySlide({ state: { startingPlayerName, textFragments, sips } }: Props) {
   const { t } = useTranslation();

   return (
      <CardContainer>
         <CardHeader>
            <Typography {...titleTypographyProps}>{t('slides:category.title')}</Typography>
         </CardHeader>
         <Box mx={3}>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={textFragments} />
            </Typography>
         </Box>
         <CardBottom>
            <Typography fontSize={descriptionTextFontSize} align="center">
               {t('slides:category.description', {
                  player: startingPlayerName,
                  sips: t('game.sip', { count: sips }),
               })}
            </Typography>
         </CardBottom>
      </CardContainer>
   );
}

export default CategorySlide;
