import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
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
   onDissolve: (decision: boolean) => void;
};

function ThisOrThatSlide({ state: { textFragments, playerName, is, sips, userDecision }, onDissolve }: Props) {
   const { t } = useTranslation();

   return (
      <CenteredCardContainer>
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
            {userDecision === 'outstanding' && (
               <Stack spacing={2} sx={{ color: 'rgba(255, 255, 255, 0.75)', mt: 2 }} direction="row">
                  <Button variant="outlined" color="inherit" sx={{ minWidth: 120 }} onClick={() => onDissolve(true)}>
                     {t('slides:fact.true')}
                  </Button>
                  <Button variant="outlined" color="inherit" sx={{ minWidth: 120 }} onClick={() => onDissolve(false)}>
                     {t('slides:fact.false')}
                  </Button>
               </Stack>
            )}
            {userDecision !== 'outstanding' && (
               <Typography align="center" fontSize={descriptionTextFontSize} sx={{ mt: 4 }}>
                  {is && t(userDecision ? 'slides:fact.true_right_text' : 'slides:fact.true_wrong_text')}
                  {!is && t(userDecision ? 'slides:fact.false_wrong_text' : 'slides:fact.false_right_text')}{' '}
                  <b>
                     {t(is === userDecision ? 'slides:fact.sips_share' : 'slides:fact.sips_drink', {
                        sips: t('game.sip', { count: sips }),
                     })}{' '}
                  </b>
               </Typography>
            )}
         </CardBottom>
      </CenteredCardContainer>
   );
}

export default ThisOrThatSlide;
