import { ComponentMeta, Story } from '@storybook/react';
import CustomTruthOrDareSlide from './Slide';
import slideFactory, { State } from '.';
import '../../../services/i18n';
import { RenderSlideWithBackground } from '../slide-story-utils';

export default {
   title: 'Slides/CustomTruthOrDare',
   component: CustomTruthOrDareSlide,
} as ComponentMeta<typeof CustomTruthOrDareSlide>;

const Template: Story<State> = (state) => {
   return <RenderSlideWithBackground state={state} slideFactory={slideFactory} />;
};

export const Primary = Template.bind({});
Primary.args = {
   targetPlayer: 'Joaquine',
   questionPlayer: 'Sammy',
};
