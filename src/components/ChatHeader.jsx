import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';

export default function ChatHeader({ sidebarOpen, onToggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profil');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setOpenDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenDialog(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          color: '#135c85',
          px: 2,
          height: 64,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar disableGutters sx={{ width: '100%' }}>
          {!sidebarOpen && (
            <IconButton edge="start" onClick={onToggleSidebar} sx={{ color: '#135c85' }}>
              <MenuIcon />
            </IconButton>
          )}

          <Box component="img" src={logo} alt="logo" sx={{ height: 50, ml: 2 }} />
          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={handleMenuOpen} sx={{ color: '#B874B0', mr: 1 }}>
            <AccountCircle sx={{ fontSize: 28 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                backgroundColor: '#ffffff',
                color: '#416499',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <MenuItem onClick={handleProfile} sx={{ fontWeight: 500 }}>Profil</MenuItem>
            <MenuItem onClick={handleLogoutClick} sx={{ fontWeight: 500 }}>Déconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Dialog
        open={openDialog}
        onClose={handleLogoutCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1.5,
          }
        }}
      >
        <DialogTitle sx={{ color: '#416499' }}>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleLogoutCancel} sx={{ color: '#6A6BA7' }}>
            Annuler
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            sx={{
              backgroundColor: '#135C85',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#0e4b6e',
              },
            }}
          >
            Se déconnecter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


//sudo /opt/mssql/bin/mssql-conf setup