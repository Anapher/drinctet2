import { ComponentMeta, Story } from '@storybook/react';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';
import Slide from './Slide';

export default {
   title: 'Slides/MiniGame',
   component: Slide,
} as ComponentMeta<typeof Slide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground slideFactory={slideFactory} state={state} />;
};

export const Primary = Template.bind({});
Primary.args = {
   miniGame: {
      title: [{ type: 'plain', text: 'Autobahn' }],
      shortExplanation: [
         { type: 'player', player: { id: '1', name: 'Sammy', gender: 'female' } },
         { type: 'plain', text: ' starts and drives clockwise. Looser drinks 5 sips.' },
      ],
      explanation: [
         {
            type: 'plain',
            text: "The first player pretends to be driving a car. They can pretend to turn either left, right or honk. For left they steer to the left, making a 'brumm' sound. For right they steer to the right, making a 'wneww' sound. Their neighbour is then the driver. If they honk, they pretend to honk at someone in the group. That person is then the driver. First one to miss their turn looses.",
         },
      ],
   },
};
