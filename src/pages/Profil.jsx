import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Typography,
    TextField,
    Container,
    Paper,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogActions,
    Button
  } from '@mui/material';
  import AccountCircle from '@mui/icons-material/AccountCircle';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import logo from '../assets/logo2.png';
  
  export default function ProfilPage() {
    const navigate = useNavigate();
  
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
  
    const [user] = useState({
      nom: 'OULAD ALI',
      prenom: 'Lamyae',
      identifiant: 'lamyae.ouali',
      motDePasse: '********',
    });
  
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
        {/* Header */}
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
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{ height: 50, ml: 2, cursor: 'pointer' }}
              onClick={() => navigate('/chat')}
            />
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
  
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f4f8', py: 4 }}>
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ color: '#135c85', mb: 3, fontWeight: 'bold' }}>
                Bonjour {user.prenom}
              </Typography>
  
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: '#d2f5ff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                    color: '#135c85',
                    fontWeight: 'bold',
                  }}
                >
                  {user.prenom[0]}
                </Box>
              </Box>
  
              <TextField
                fullWidth
                label="Nom"
                value={user.nom}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Prénom"
                value={user.prenom}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Identifiant"
                value={user.identifiant}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Mot de passe"
                value={user.motDePasse}
                type="password"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
  
              <Typography variant="caption" color="error">
                Les champs sont non modifiables à partir du chatbot.  
                Pour les changer, veuillez passer par la plateforme SUSI.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </>
    );
  }
