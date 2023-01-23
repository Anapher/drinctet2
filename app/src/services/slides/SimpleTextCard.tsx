import { Box, Typography } from '@mui/material';
import { FilledTextFragment } from '../game-maker/fillTextFragments';
import RenderFragments from './RenderFragments';

type SimpleTextCardProps = {
   title?: string;
   textFragments: FilledTextFragment[];
   description: string;
};
function SimpleTextCard({ title, textFragments, description }: SimpleTextCardProps) {
   return (
      <Box display="flex" flexDirection="column" width="100%" height="100%" color="white">
         <Box flex={1} display={'flex'} flexDirection={'column'} alignItems="center" justifyContent={'flex-end'} pb={2}>
            {title && (
               <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={400}>
                  {title}
               </Typography>
            )}
         </Box>
         <Box mx={3}>
            <RenderFragments align="center" fontSize={{ xs: 22, md: 28 }} filledFragments={textFragments} />
         </Box>
         <Box flex={1} pt={2} px={3}>
            <Typography fontSize={{ xs: 12, sm: 16, lg: 20 }} align="center">
               {description}
            </Typography>
         </Box>
      </Box>
   );
}

export default SimpleTextCard;
