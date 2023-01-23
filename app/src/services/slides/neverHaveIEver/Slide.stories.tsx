import { ComponentMeta, Story } from '@storybook/react';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';
import NeverHaveIEverSlide from './Slide';

export default {
   title: 'Slides/NeverHaveIEver',
   component: NeverHaveIEverSlide,
} as ComponentMeta<typeof NeverHaveIEverSlide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground slideFactory={slideFactory} state={state} />;
};

export const Primary = Template.bind({});
Primary.args = {
   textFragments: [{ type: 'plain', text: '...kissed one of the other players in this round.' }],
   sips: 1,
};
