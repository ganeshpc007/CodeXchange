import { Backdrop, Box, Modal, Fade, Button, Stack } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { useContext, useState, useCallback } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const NewChat = () => {
  const [email, setEmail] = useState("");
  const { openNewChat, updateOpenNewChat, findUserByEmail } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleEmailSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();

    if (emailRegex.test(trimmedEmail)) {
      const response = await findUserByEmail(trimmedEmail, user);
      if (!response) {
        alert("User not found for given email..");
      } else {
        setEmail("");
        updateOpenNewChat(false);
      }
    } else {
      alert("Enter valid email!");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEmailSubmit();
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openNewChat}
      onClose={() => updateOpenNewChat(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openNewChat}>
        <Box sx={style}>
          <Typography sx={{ m: 1, fontSize: "26px" }}>New Contact</Typography>
          <Stack
            sx={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "75%" }}
              label="Email of Reciepent"
              variant="outlined"
              autoComplete="off"
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="contained"
              endIcon={<MdOutlinePersonSearch />}
              onClick={() => handleEmailSubmit()}
            >
              Find
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewChat;
