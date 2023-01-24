import { Typography } from '@mui/material';
import { State } from '.';
import RenderFragments from '../RenderFragments';
import { CardBottom, CardHeader, CardMainContent, CenteredCardContainer, mainTextFontSize } from '../styles';

type Props = {
   state: State;
};

function ThisOrThatSlide({ state: { textFragments } }: Props) {
   return (
      <CenteredCardContainer>
         <CardHeader />
         <CardMainContent>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={textFragments} />
            </Typography>
         </CardMainContent>
         <CardBottom />
      </CenteredCardContainer>
   );
}

export default ThisOrThatSlide;
