import { MoreVert } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

function GameMenuButton() {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleGoBack = () => {
      navigate('/');
      handleClose();
   };

   const handleGoToSettings = () => {
      navigate('/game/settings');
      handleClose();
   };

   return (
      <>
         <IconButton
            id="game-open-menu-button"
            sx={{ color: 'white' }}
            aria-controls={open ? 'game-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         >
            <MoreVert />
         </IconButton>
         <Menu
            id="game-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'game-open-menu-button',
            }}
         >
            <MenuItem onClick={handleGoBack}>
               <ListItemIcon>
                  <ArrowBackIcon />
               </ListItemIcon>
               <ListItemText>{t('game.menu.go_back')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleGoToSettings}>
               <ListItemIcon>
                  <SettingsIcon />
               </ListItemIcon>
               <ListItemText>{t('settings.label')}</ListItemText>
            </MenuItem>
         </Menu>
      </>
   );
}

export default GameMenuButton;
