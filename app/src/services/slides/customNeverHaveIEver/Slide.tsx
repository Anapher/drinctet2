import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { State } from '.';
import {
   CardBottom,
   CardHeader,
   CardMainContent,
   CenteredCardContainer,
   descriptionTextFontSize,
   mainTextFontSize,
} from '../styles';

type Props = {
   state: State;
};

function ThisOrThatSlide({ state: { playerName, sips } }: Props) {
   const { t } = useTranslation();

   return (
      <CenteredCardContainer>
         <CardHeader />
         <CardMainContent>
            <Typography align="center" fontSize={mainTextFontSize}>
               <b>{playerName}</b>
               {t('slides:customNeverHaveIEver.main_text')}
            </Typography>
         </CardMainContent>
         <CardBottom>
            <Typography fontSize={descriptionTextFontSize} align="center">
               {t('slides:customNeverHaveIEver.description', {
                  sips: t('game.sip', { count: sips }),
               })}
            </Typography>
         </CardBottom>
      </CenteredCardContainer>
   );
}

export default ThisOrThatSlide;
