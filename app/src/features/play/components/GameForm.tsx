import { Button, Divider, IconButton, List, ListItem, ListItemText, ListSubheader, Stack } from '@mui/material';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import { GameConfig, GameConfigSchema, Player } from '../../../types';
import AddIcon from '@mui/icons-material/Add';
import AddPlayerRow from './AddPlayerRow';
import { useTranslation } from 'react-i18next';
import cuid from 'cuid';
import { KeyboardEvent, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import createNewGame from '../../../services/game-maker/createNewGame';
import { loadGame } from '../../game/slice';
import globalConfig from '../../../global-config';

const removeEmptyPlayers: (config: GameConfig) => GameConfig = (config) => ({
   ...config,
   players: config?.players?.filter((x) => !!x.name),
});
const ignoreEmptyPlayersSchema = z.preprocess(removeEmptyPlayers as any, GameConfigSchema);

function GameForm() {
   const dispatch = useDispatch();
   const { t } = useTranslation();
   const navigate = useNavigate();

   const {
      handleSubmit,
      control,
      formState: { isValid },
   } = useForm<GameConfig>({
      resolver: zodResolver(ignoreEmptyPlayersSchema),
      defaultValues: { cardDeckIds: [12, 1], slideTypeWeights: globalConfig.defaultSlideWeights },
      mode: 'onChange',
   });

   const onSubmit = (config: GameConfig) => {
      const game = createNewGame({ ...config });
      dispatch(loadGame(game));
      navigate('/game');
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
         <List style={{ flex: 1, overflowY: 'auto', minHeight: 0 }} disablePadding>
            <ListItem button divider>
               <ListItemText primary="Card decks" secondary={'Loading...'} />
            </ListItem>
            <PlayerList control={control} />
            <ListItem button divider>
               <ListItemText primary="Advanced Config" />
            </ListItem>
         </List>
         <Button variant="contained" style={{ margin: 8, marginTop: 16 }} type="submit" disabled={!isValid}>
            {t('play.lets_play')}
         </Button>
      </form>
   );
}

type PlayerListProps = {
   control: Control<GameConfig>;
};
function PlayerList({ control }: PlayerListProps) {
   const { t } = useTranslation();
   const { append, remove, update, fields } = useFieldArray({ control, name: 'players', keyName: '_id' });
   const [latestAddedId, setLatestAddedId] = useState<string | undefined>();

   const handleAddNewPlayer = () => {
      const id = cuid.slug();
      setLatestAddedId(id);
      append({ name: '', id, gender: 'male' }, { shouldFocus: true });
   };

   const handleKeyDown = (ev: KeyboardEvent<HTMLDivElement>, player: Player, i: number) => {
      if (ev.key === 'Enter') {
         handleAddNewPlayer();
         ev.preventDefault();
      }

      if (ev.key === 'Backspace' && !player.name) {
         remove(i);
      }
   };

   return (
      <>
         <ListSubheader>
            <Stack direction="row" justifyContent="space-between">
               {t('play.players')}
               <IconButton edge="end" aria-label={t<string>('play.add_player')} onClick={handleAddNewPlayer}>
                  <AddIcon />
               </IconButton>
            </Stack>
         </ListSubheader>

         {fields.map((player, i) => (
            <List component="div" disablePadding key={player.id}>
               <ListItem>
                  <AddPlayerRow
                     name={player.name}
                     gender={player.gender}
                     onChangeGender={(newGender) => update(i, { ...player, gender: newGender })}
                     onChangeName={(newName) => update(i, { ...player, name: newName })}
                     onRemove={() => remove(i)}
                     onPressEnter={handleAddNewPlayer}
                     textFieldProps={{
                        onKeyDown: (ev) => handleKeyDown(ev, player, i),
                        autoFocus: latestAddedId === player.id,
                     }}
                  />
               </ListItem>
            </List>
         ))}
         <Divider />
      </>
   );
}

export default GameForm;
