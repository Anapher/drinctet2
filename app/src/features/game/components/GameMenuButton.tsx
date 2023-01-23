import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
            <MenuItem onClick={handleGoBack}>{t('game.menu.go_back')}</MenuItem>
         </Menu>
      </>
   );
}

export default GameMenuButton;
