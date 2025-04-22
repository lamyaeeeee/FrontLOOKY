import React from "react";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import { Chat as ChatIcon, TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import MessageInput from "./MessageInput";

const WelcomeScreen = ({ onPromptClick, value, setValue, onSend }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        backgroundColor: "#f4f8fb", 
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 5,
          fontWeight: 700,
          color: "#135c85",
        }}
      >
        Comment puis-je vous aider ?
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={
            <ChatIcon sx={{ color: "#6A6BA7" }} />
          }
          onClick={() => onPromptClick("Je souhaite un rapport sur ...")}
          sx={{
            borderRadius: "2rem",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          Rapport
        </Button>

        <Button
          variant="outlined"
          startIcon={
            <TrendingUpIcon sx={{ color: "#B874B0" }} />
          }
          onClick={() =>
            onPromptClick("Quelles sont les tendances d'incidents concernant ...")
          }
          sx={{
            borderRadius: "2rem",
            px: 3,
            py: 1.5,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          Tendances
        </Button>
      </Stack>

      <Box sx={{ width: "100%", maxWidth: 700 }}>
  <MessageInput onSend={onSend} value={value} setValue={setValue} />
</Box>

    </Box>
  );
};

export default WelcomeScreen;
