import { ComponentMeta, Story } from '@storybook/react';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';
import Slide from './Slide';

export default {
   title: 'Slides/Activity',
   component: Slide,
} as ComponentMeta<typeof Slide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground slideFactory={slideFactory} state={state} />;
};

export const Primary = Template.bind({});
Primary.args = {
   textFragments: [
      { type: 'player', player: { id: '1', gender: 'female', name: 'Sammy' } },
      { type: 'plain', text: ', do as many push ups as you can and give out 1 sip for each.' },
   ],
};
