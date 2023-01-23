import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ScrollContainer from './ScrollContainer';

export default {
   title: 'Game/ScrollContainer',
   component: ScrollContainer,
} as ComponentMeta<typeof ScrollContainer>;

export const Primary: ComponentStory<typeof ScrollContainer> = () => {
   const [index, setIndex] = useState(2);
   const testItems = ['1', '2', '3', '4'];

   const bgs = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0,0,255)', 'rgb(100, 0, 100)'];

   const getBackgroundColor = (index: number) => bgs[index];

   return (
      <Box height={600} width={200}>
         <ScrollContainer
            index={index}
            items={testItems}
            onChangeIndex={setIndex}
            getBackgroundColor={getBackgroundColor}
            endOfScrollColor={'rgb(0, 0, 0)'}
            renderItem={(index) => (
               <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="h5">{testItems[index]}</Typography>
               </Box>
            )}
         />
      </Box>
   );
};
