import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { State } from '.';
import RenderFragments from '../RenderFragments';
import {
   CardBottom,
   CardHeader,
   CardMainContent,
   CenteredCardContainer,
   mainTextFontSize,
   titleTypographyProps,
} from '../styles';

type Props = {
   state: State;
};

function ThisOrThatSlide({
   state: {
      miniGame: { title, shortExplanation, explanation },
   },
}: Props) {
   const { t } = useTranslation();
   const [showExplanation, setShowExplanation] = useState(false);

   return (
      <CenteredCardContainer>
         <CardHeader>
            <Typography {...titleTypographyProps}>
               <b>{t('slides:miniGame.title')}</b>: <RenderFragments filledFragments={title} />
            </Typography>
         </CardHeader>
         <CardMainContent>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={shortExplanation} />
            </Typography>
         </CardMainContent>
         <CardBottom>
            {explanation && !showExplanation && (
               <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ minWidth: 120 }}
                  onClick={() => setShowExplanation(true)}
               >
                  {t('slides:miniGame.explanation')}
               </Button>
            )}
            {explanation && showExplanation && (
               <Typography align="center" sx={{ maxWidth: 1200 }}>
                  <RenderFragments filledFragments={explanation} />
               </Typography>
            )}
         </CardBottom>
      </CenteredCardContainer>
   );
}

export default ThisOrThatSlide;
