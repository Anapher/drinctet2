import { ComponentMeta, Story } from '@storybook/react';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';
import CategorySlide from './Slide';

export default {
   title: 'Slides/Category',
   component: CategorySlide,
} as ComponentMeta<typeof CategorySlide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground slideFactory={slideFactory} state={state} />;
};

export const Primary = Template.bind({});
Primary.args = {
   startingPlayerName: 'Joaquine',
   textFragments: [{ type: 'plain', text: 'Cars' }],
   sips: 0,
};
