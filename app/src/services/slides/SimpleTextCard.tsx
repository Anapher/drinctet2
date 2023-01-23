import { Box, Typography } from '@mui/material';
import { FilledTextFragment } from '../game-maker/fillTextFragments';
import RenderFragments from './RenderFragments';
import {
   CardBottom,
   CardContainer,
   CardHeader,
   descriptionTextFontSize,
   mainTextFontSize,
   titleTypographyProps,
} from './styles';

type SimpleTextCardProps = {
   title?: string;
   textFragments: FilledTextFragment[];
   description: string;
};

function SimpleTextCard({ title, textFragments, description }: SimpleTextCardProps) {
   return (
      <CardContainer>
         <CardHeader>
            <Typography {...titleTypographyProps}> {title}</Typography>
         </CardHeader>
         <Box mx={3}>
            <Typography align="center" fontSize={mainTextFontSize}>
               <RenderFragments filledFragments={textFragments} />
            </Typography>
         </Box>
         <CardBottom>
            <Typography fontSize={descriptionTextFontSize} align="center">
               {description}
            </Typography>
         </CardBottom>
      </CardContainer>
   );
}

export default SimpleTextCard;
