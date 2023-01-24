import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { State } from '.';
import RenderFragments from '../RenderFragments';
import {
   CardBottom,
   CardHeader,
   CardMainContent,
   CenteredCardContainer,
   descriptionTextFontSize,
   mainTextFontSize,
   titleTypographyProps,
} from '../styles';

type Props = {
   state: State;
   onDissolve: () => void;
};

function ThisOrThatSlide({ state: { textFragments, playerName, is, sips, dissolved }, onDissolve }: Props) {
   const { t } = useTranslation();

   return (
      <CenteredCardContainer onClick={onDissolve} sx={{ cursor: 'pointer' }}>
         <CardHeader>
            <Typography {...titleTypographyProps} align="center">
               <b>{playerName}</b>
               {t('slides:fact.title')}
            </Typography>
         </CardHeader>
         <CardMainContent>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={textFragments} />
            </Typography>
         </CardMainContent>
         <CardBottom>
            {!dissolved ? (
               <Typography align="center" fontSize={descriptionTextFontSize} sx={{ opacity: 0.5, mt: 4 }}>
                  {t('slides:fact.tap_to_dissolve')}
               </Typography>
            ) : (
               <Typography align="center" fontSize={descriptionTextFontSize} sx={{ mt: 4 }}>
                  <b>{t(is ? 'slides:fact.true_text' : 'slides:fact.false_text')} </b>
                  {t('slides:fact.sips_description', { sips: t('game.sip', { count: sips }) })}
               </Typography>
            )}
         </CardBottom>
      </CenteredCardContainer>
   );
}

export default ThisOrThatSlide;
