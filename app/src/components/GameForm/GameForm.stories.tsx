import GameForm from './GameForm';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import useGameForm from './useGameForm';

export default {
   title: 'Play/GameForm',
   component: GameForm,
   argTypes: { onCreateGame: { action: 'onCreateGame' } },
} as ComponentMeta<typeof GameForm>;

const Template: ComponentStory<typeof GameForm> = () => {
   const gameForm = useGameForm({});
   return <GameForm form={gameForm} />;
};

export const Large = Template.bind({});
Large.args = {};
