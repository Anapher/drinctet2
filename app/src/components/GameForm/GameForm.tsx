import AddIcon from '@mui/icons-material/Add';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack } from '@mui/material';
import cuid from 'cuid';
import { KeyboardEvent, useState } from 'react';
import { Control, useFieldArray, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GameConfig, Player } from '../../types';
import AddPlayerRow from './AddPlayerRow';

type GameFormProps = {
   form: UseFormReturn<GameConfig>;
};

function GameForm({ form: { control } }: GameFormProps) {
   return (
      <List style={{ flex: 1, overflowY: 'auto', minHeight: 0 }} disablePadding>
         <ListItem divider disablePadding>
            <ListItemButton>
               <ListItemText primary="Card decks" secondary={'Not supported at the moment'} />
            </ListItemButton>
         </ListItem>
         <PlayerList control={control} />
         <ListItem divider disablePadding>
            <ListItemButton>
               <ListItemText primary="Advanced Config" />
            </ListItemButton>
         </ListItem>
      </List>
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
