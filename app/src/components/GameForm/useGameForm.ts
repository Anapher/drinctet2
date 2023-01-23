import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { GameConfig, GameConfigSchema } from '../../types';

const removeEmptyPlayers: (config: GameConfig) => GameConfig = (config) => ({
   ...config,
   players: config?.players?.filter((x) => !!x.name),
});
const ignoreEmptyPlayersSchema = z.preprocess(removeEmptyPlayers as any, GameConfigSchema);

export default function useGameForm(defaultValues: UseFormProps<GameConfig>['defaultValues']) {
   return useForm<GameConfig>({
      resolver: zodResolver(ignoreEmptyPlayersSchema),
      defaultValues,
      mode: 'onChange',
   });
}
