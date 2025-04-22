import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import logo from '../assets/logo2.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate('/chat');
    } else {
      alert('Veuillez entrer un identifiant et un mot de passe.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right top, #135c85, #265f8d, #376394, #47659b, #5668a1, #676ba6, #776dab, #886fae, #9e71b0, #b374b1, #c777af, #da7aab)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '100%', textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
        <Box sx={{ mb: 3 }}>
          <img src={logo} alt="Logo Looky" style={{ width: '160px', objectFit: 'contain' }} />
        </Box>
        <Typography
        variant="h5"
        component="h1"
        sx={{ color: '#416499', fontWeight: 'bold', mb: 1 }}
      >
        Connexion à Looky
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: '#6a6ba7', mb: 3 }}
      >
        Votre assistant intelligent pour les demandes ITSM
      </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Identifiant"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              background: 'linear-gradient(to right, #135c85, #2f6fa3)',

              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: '12px',
              padding: '12px 0',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#0e4b6e',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }
            }}
          >
            Se connecter
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
