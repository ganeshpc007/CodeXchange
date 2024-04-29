import { useContext, useState } from "react";
import { Badge, Menu } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ChatContext } from "../context/ChatContext";
import { unReadNotificationsFunc } from "../utils/unReadNotifications.js";
import moment from "moment";

const Notification = () => {
  const {
    userChats,
    notifications,
    allUsers,
    markNotificationAsRead,
    markAllNotificationAsRead,
  } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const unReadNotifications = unReadNotificationsFunc(notifications);
  const modifiedNotifications = notifications?.map((n) => {
    const sender = allUsers?.find((u) => u?._id === n?.senderId);
    return { ...n, senderName: sender?.name };
  });

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
    <>
      <Badge
        color="secondary"
        badgeContent={unReadNotifications?.length}
        max={5}
        sx={{ cursor: "pointer", marginLeft:"0 !important"  }}
        onClick={handleClick}
      >
        <NotificationsIcon />
      </Badge>
      {notificationMenu()}
    </>
  );
};

export default Notification;
