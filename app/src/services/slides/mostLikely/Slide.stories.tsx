import { ComponentMeta, Story } from '@storybook/react';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';
import MostLikelySlide from './Slide';

export default {
   title: 'Slides/MostLikely',
   component: MostLikelySlide,
} as ComponentMeta<typeof MostLikelySlide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground slideFactory={slideFactory} state={state} />;
};

export const Primary = Template.bind({});
Primary.args = {
   textFragments: [{ type: 'plain', text: 'Who is most likely to forget to return an borrowed item?' }],
   sips: 3,
};
