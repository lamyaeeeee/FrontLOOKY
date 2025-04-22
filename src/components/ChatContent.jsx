import { Box, Stack, Typography } from '@mui/material';
import MessageInput from './MessageInput';

export default function ChatContent({ messages, value, setValue, onSend }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 3,
          width: '78%',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <Stack spacing={3}>
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    px: isUser ? 2 : 3, 
                    py: 1,
                    maxWidth: '75%',
                    bgcolor: isUser ? '#f8f3ff' : 'transparent',  
                    border: isUser ? '1px solid #e5e5e5' : 'none',  
                    borderRadius: '15px', 
                    color: '#333',
                  }}
                >
                  <Typography sx={{ whiteSpace: 'pre-line', fontSize: '1rem', color: isUser ? '#333' : '#000' }}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 2,
          borderTop: '1px solid #ddd',
          backgroundColor: '#f0f4f8',
        }}
      >
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <MessageInput onSend={onSend} value={value} setValue={setValue} />
        </Box>
      </Box>
    </Box>
  );
}
