import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { State } from '.';
import RenderFragments from '../RenderFragments';
import { CardBottom, CardContainer, CardHeader, descriptionTextFontSize, mainTextFontSize } from '../styles';

type Props = {
   state: State;
};

function ThisOrThatSlide({ state: { textFragments, sips } }: Props) {
   const { t } = useTranslation();
   return (
      <CardContainer>
         <CardHeader>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={textFragments[0]} />
            </Typography>
         </CardHeader>
         <Box mx={3}>
            <Typography align="center">{t('slides:thisOrThat.or')}</Typography>
         </Box>
         <CardBottom>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={textFragments[1]} />
            </Typography>
            <Typography sx={{ mt: 4 }} fontSize={descriptionTextFontSize} align="center">
               {t('slides:thisOrThat.description', { sips: t('game.sip', { count: sips }) })}
            </Typography>
         </CardBottom>
      </CardContainer>
   );
}

export default ThisOrThatSlide;
