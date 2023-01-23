import AddPlayerRow from './AddPlayerRow';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Play/AddPlayerRow',
   component: AddPlayerRow,
} as ComponentMeta<typeof AddPlayerRow>;

const Template: ComponentStory<typeof AddPlayerRow> = (args) => <AddPlayerRow {...args} />;

export const Large = Template.bind({});
Large.args = {
   name: 'Vincent',
   gender: 'male',
};
