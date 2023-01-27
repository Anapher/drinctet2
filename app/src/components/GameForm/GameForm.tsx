import AddIcon from '@mui/icons-material/Add';
import {
   Checkbox,
   Dialog,
   DialogTitle,
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   ListSubheader,
   Stack,
} from '@mui/material';
import cuid from 'cuid';
import { KeyboardEvent, useEffect, useState } from 'react';
import { Control, Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../services/i18n';
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
         <LanguageMenuItem control={control} />
      </List>
   );
}

type LanguageMenuItemProps = {
   control: Control<GameConfig>;
};
function LanguageMenuItem({ control }: LanguageMenuItemProps) {
   const { i18n } = useTranslation();
   const [dialogOpen, setDialogOpen] = useState(false);
   const { t } = useTranslation();

   const handleOpenDialog = () => setDialogOpen(true);
   const handleCloseDialog = () => setDialogOpen(false);

   const handleChangeLanguage = (lang: string) => {
      i18n.changeLanguage(lang);
      setDialogOpen(false);
   };

   return (
      <>
         <ListItem divider disablePadding>
            <ListItemButton onClick={handleOpenDialog}>
               <ListItemText
                  primary={t('play.language')}
                  secondary={
                     supportedLanguages.find((x) => x.id === i18n.resolvedLanguage)?.name || i18n.resolvedLanguage
                  }
               />
            </ListItemButton>
         </ListItem>
         <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <DialogTitle>{t('play.select_language')}</DialogTitle>
            <List sx={{ pt: 0 }}>
               {supportedLanguages.map((x) => (
                  <ListItem disableGutters key={x.id}>
                     <ListItemButton
                        onClick={() => handleChangeLanguage(x.id)}
                        selected={i18n.resolvedLanguage === x.id}
                     >
                        <ListItemText primary={x.name} />
                     </ListItemButton>
                  </ListItem>
               ))}
               <Divider />
               <Controller
                  control={control}
                  name="alwaysShowEnglishCards"
                  defaultValue={true}
                  render={({ field: { value, onChange } }) => (
                     <ListItem disableGutters>
                        <ListItemButton onClick={() => onChange(!value)}>
                           <ListItemIcon>
                              <Checkbox edge="start" tabIndex={-1} disableRipple checked={value} />
                           </ListItemIcon>
                           <ListItemText primary={t('play.always_show_english')} />
                        </ListItemButton>
                     </ListItem>
                  )}
               />
            </List>
         </Dialog>
      </>
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

   useEffect(() => {
      if (fields.length === 0) {
         handleAddNewPlayer();
      }
   }, []);

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
