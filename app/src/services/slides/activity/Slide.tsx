import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { State } from '.';
import RenderFragments from '../RenderFragments';
import { CardBottom, CardContainer, CardHeader, mainTextFontSize } from '../styles';

type Props = {
   state: State;
};

function ThisOrThatSlide({ state: { textFragments } }: Props) {
   return (
      <CardContainer>
         <CardHeader />
         <Box mx={3}>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={textFragments} />
            </Typography>
         </Box>
         <CardBottom />
      </CardContainer>
   );
}

export default ThisOrThatSlide;
