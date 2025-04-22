import { Box, Typography, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router-dom';

  
const mockConversations = {
  today: [
    { id: 1, title: 'Rapport sur incidents critiques' },
    { id: 2, title: "Tendances d'accès VPN" },
  ],
  yesterday: [
    { id: 3, title: 'résolution d"incident critique' },
  ],
};


export default function Sidebar({ onClose, onSelect }) {
  const navigate = useNavigate();
  const handleNewConversation = () => {
    navigate('/chat');
    window.location.assign('/chat');
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #135C85, #DA7AAB)',
        color: '#ffffff',
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle1" fontWeight={600}>
          Conversations
        </Typography>
        <IconButton  onClick={handleNewConversation} sx={{ color: '#ffffff' }}>
          <AddIcon />
        </IconButton>
      </Box>
 
      <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
        <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8, mb: 1, display: 'block' }}>
          Aujourd’hui
        </Typography>
        {mockConversations.today.map((conv) => (
          <Box
            key={conv.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1.2,
              borderRadius: 3,
              mb: 1.2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.01)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography onClick={() => onSelect(conv)} sx={{ flex: 1 }}>
              {conv.title}
            </Typography>
            <IconButton size="small" sx={{ color: '#ffffff' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8, mt: 3, mb: 1, display: 'block' }}>
          Hier
        </Typography>
        {mockConversations.yesterday.map((conv) => (
          <Box
            key={conv.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1.2,
              borderRadius: 3,
              mb: 1.2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.01)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography onClick={() => onSelect(conv)} sx={{ flex: 1 }}>
              {conv.title}
            </Typography>
            <IconButton size="small" sx={{ color: '#ffffff' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
