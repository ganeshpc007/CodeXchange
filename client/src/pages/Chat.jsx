import { useContext, useState } from "react";
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
} from "@mui/material";
import profileAvatar from "../assets/avatar.svg";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppDrawer from "../components/AppDrawer.jsx";
import UserChat from "../components/chat/UserChat.jsx";
import { ChatContext } from "../context/ChatContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import ChatBox from "../components/chat/ChatBox.jsx";
import ShareCode from "../components/chat/ShareCode.jsx";

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
  const { userChats, updateCurrentChat, alert, updateAlert } =
    useContext(ChatContext);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    updateAlert({ ...alert, open: false });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1rem",
        padding: "0px !important",
        width: "100%",
        height: "96vh",
      }}
    >
      <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      <ShareCode />
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
      <Stack sx={{ height: "100%", width: "30%" }}>
        <Stack
          direction="row"
          spacing={2}
          style={{
            display: "flex",

            alignItems: "center",
            width: "100%",
            height: "10%",
            justifyContent: "center",
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
            <Avatar
              alt="Profile Avatar "
              src={profileAvatar}
              sx={{ cursor: "pointer" }}
            />
          </StyledBadge>
          <Paper
            component="form"
            sx={{
              p: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search.."
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
          <Badge
            color="secondary"
            badgeContent={"10"}
            max={5}
            sx={{ cursor: "pointer" }}
          >
            <NotificationsIcon />
          </Badge>
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
          {userChats?.map((chat, index) => {
            console.log("index", index);
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
      </Stack>
      <Stack sx={{ height: "100%", width: "67%" }}>
        <ChatBox />
      </Stack>
    </div>
  );
};

export default Chat;
