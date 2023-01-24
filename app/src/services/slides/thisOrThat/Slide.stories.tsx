import { ComponentMeta, Story } from '@storybook/react';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';
import Slide from './Slide';

export default {
   title: 'Slides/ThisOrThat',
   component: Slide,
} as ComponentMeta<typeof Slide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground slideFactory={slideFactory} state={state} />;
};

export const Primary = Template.bind({});
Primary.args = {
   textFragments: [
      [{ type: 'plain', text: 'Never eat chocolate again in your life.' }],
      [{ type: 'plain', text: 'Never eat pizza again in your life.' }],
   ],
   sips: 5,
};
