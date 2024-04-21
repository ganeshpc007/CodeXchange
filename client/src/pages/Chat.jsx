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
  Menu,
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
import { unReadNotificationsFunc } from "../utils/unReadNotifications.js";
import moment from "moment";
import { IoPersonAdd } from "react-icons/io5";
import NewChat from "../components/NewChat.jsx";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user } = useContext(AuthContext);
  const {
    userChats,
    updateCurrentChat,
    alert,
    updateAlert,
    notifications,
    allUsers,
    markNotificationAsRead,
    markAllNotificationAsRead,
    updateOpenNewChat,
  } = useContext(ChatContext);

  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    setFilteredChats(userChats);
  }, [userChats]);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const unReadNotifications = unReadNotificationsFunc(notifications);
  const modifiedNotifications = notifications?.map((n) => {
    const sender = allUsers?.find((u) => u?._id === n?.senderId);
    return { ...n, senderName: sender?.name };
  });

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

  const notificationMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="notifications-box">
          <div className="notifications-header">
            <div style={{ fontWeight: "700", fontSize: "20px" }}>
              Notifications
            </div>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationAsRead(notifications)}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className="notification">No notifications yet..</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                  onClick={() => {
                    markNotificationAsRead(n, userChats, notifications);
                    handleClose();
                  }}
                >
                  <span>{n.senderName} sent you new message</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      </Menu>
    );
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
      <Stack sx={{ height: "100%", width: "30%", position: "relative" }}>
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
          <Badge
            color="secondary"
            badgeContent={unReadNotifications?.length}
            max={5}
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <NotificationsIcon />
          </Badge>
          {notificationMenu()}
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
          {filteredChats?.map((chat, index) => {
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
      <Stack sx={{ height: "100%", width: "67%" }}>
        <ChatBox />
      </Stack>
    </div>
  );
};

export default Chat;
