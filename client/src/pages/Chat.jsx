import { useContext, useEffect, useState } from "react";
import {
  Stack,
  Alert,
  Badge,
  Avatar,
  styled,
  InputBase,
  IconButton,
  Paper,
  Snackbar,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IoPersonAdd } from "react-icons/io5";
import AppDrawer from "../components/AppDrawer.jsx";
import UserChat from "../components/chat/UserChat.jsx";
import ChatBox from "../components/chat/ChatBox.jsx";
import ShareCode from "../components/chat/ShareCode.jsx";
import { FaUserCircle } from "react-icons/fa";
import NewChat from "../components/NewChat.jsx";
import Notification from "../components/Notification.jsx";

import { ChatContext } from "../context/ChatContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Chat = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    userChats,
    updateCurrentChat,
    alert,
    updateAlert,
    updateOpenNewChat,
  } = useContext(ChatContext);

  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    setFilteredChats(userChats);
  }, [userChats]);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    updateAlert({ ...alert, open: false });
  };

  const handleChatSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      const filteredChats = userChats?.filter((c) => {
        if (c?.recipients.length > 1) {
          const teamName = c?.teamName.toLowerCase();
          if (teamName.includes(searchTerm)) {
            return true;
          }
          return false;
        } else {
          const recipientName = c?.recipients[0]?.name.toLowerCase();
          if (recipientName.includes(searchTerm)) {
            return true;
          }
          return false;
        }
      });
      setFilteredChats(filteredChats);
    } else {
      setFilteredChats(userChats);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // gap: "1rem",
        padding: "0px !important",
        width: "100%",
        height: "96vh",
        position: "relative",
      }}
    >
      <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      <ShareCode />
      <NewChat />
      <Snackbar
        open={alert?.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert?.text}
        </Alert>
      </Snackbar>
      <Box sx={{ position: "absolute", top: "20px", right: "20px", zIndex: 1 }}>
        <span className="title extra-sm-title highlighted-text">
          Code
          <span style={{ color: "red" }}>X</span>
          change
        </span>
      </Box>
      <Stack sx={{ height: "100%", width: "30%", position: "relative" }}>
        <Stack
          direction="row"
          spacing={2}
          style={{
            display: "flex",

            alignItems: "center",
            width: "100%",
            height: "10%",
            justifyContent: "space-around",
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClick={toggleDrawer(true)}
          >
            {/* <Avatar
              alt="Profile Avatar "
              src={<FaUserCircle />}
              sx={{ cursor: "pointer" }}
            /> */}
            <IconButton color="primary" size="large">
              <FaUserCircle style={{ color: "black" }} />
            </IconButton>
          </StyledBadge>
          <Paper
            component="form"
            sx={{
              p: "2px",
              display: "flex",
              alignItems: "center",
              width:"70%"
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search.."
              onChange={handleChatSearch}
              // inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", cursor: "pointer" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Notification />
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
            height: "90%",
            overflowY: "scroll",
            padding: "10px",
            "&::-webkit-scrollbar": {
              width: "8px", // Width of the scrollbar
              height: "8px", // Height of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1", // Color of the scrollbar track
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888", // Color of the scrollbar thumb
              borderRadius: "4px", // Rounded corners for the scrollbar thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555", // Color of the scrollbar thumb on hover
            },
          }}
        >
          {filteredChats.length === 0
            ? "No chats history at this moment!"
            : filteredChats?.map((chat, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => updateCurrentChat(chat)}
                    style={{ width: "100%" }}
                  >
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
        </Stack>
        <div style={{ position: "absolute", bottom: "30px", right: "30px" }}>
          <IconButton
            color="primary"
            size="large"
            onClick={() => updateOpenNewChat(true)}
          >
            <IoPersonAdd style={{ color: "black" }} />
          </IconButton>
        </div>
      </Stack>
      <Stack sx={{ height: "100%", width: "70%" }}>
        <ChatBox />
      </Stack>
    </div>
  );
};

export default Chat;
