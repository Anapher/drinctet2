import GameForm from './GameForm';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Play/GameForm',
   component: GameForm,
   argTypes: { onCreateGame: { action: 'onCreateGame' } },
} as ComponentMeta<typeof GameForm>;

const Template: ComponentStory<typeof GameForm> = (args) => <GameForm {...args} />;

export const Large = Template.bind({});
Large.args = {};
