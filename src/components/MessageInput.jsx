import React from "react";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = ({ onSend, value, setValue }) => {
  const handleSend = () => {
    if (value.trim() !== "") {
      onSend(value.trim());
      if (setValue) setValue("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1,
        borderRadius: 5,
        boxShadow: 1,
      }}
    >
      <InputBase
        sx={{ flex: 1 }}
        placeholder="Écrivez votre message ici..."
        value={value}
        onChange={(e) => setValue?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default MessageInput;
