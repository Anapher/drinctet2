import { ComponentMeta, Story } from '@storybook/react';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';
import Slide from './Slide';

export default {
   title: 'Slides/CustomNeverHaveIEver',
   component: Slide,
} as ComponentMeta<typeof Slide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground slideFactory={slideFactory} state={state} />;
};

export const Primary = Template.bind({});
Primary.args = {
   playerName: 'Sammy',
   sips: 3,
};
