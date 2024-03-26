import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const UserChat = ({ chat, user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "380px",
        justifyContent: "space-between",
        margin: "15px 5px 0",
        borderBottom: "1px solid rgb(192, 189, 189)",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        borderRadius: 1,
        "&:hover": {
          backgroundColor: "whitesmoke",
          transition: "background-color 0.3s ease",
        },
      }}
      role="button"
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "90%",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 33, height: 33 }}>H</Avatar>
        <Box>
          <Typography variant="subtitle2">Ashii</Typography>
          <Typography variant="body2" sx={{ color: "rgb(96, 92, 92)" }}>
            Hi appi chekc out this code
          </Typography>
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        12/03/2024
      </Typography>
    </Box>
  );
};

export default UserChat;
