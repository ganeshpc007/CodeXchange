import { Avatar, Box, Stack, Typography, Badge } from "@mui/material";
import { useFetchRecipients } from "../../hooks/useFetchRecipients";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unReadNotificationsFunc } from "../../utils/unReadNotifications";

const UserChat = ({ chat, user }) => {
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const { recipientUsers, loading } = useFetchRecipients(chat, user);
  const { latestMessage } = useFetchLatestMessage(chat);

  if (loading) {
    return <div>Loading...</div>;
  }

  const unreadNotifications = unReadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.chatId === chat?._id
  );
  const isOnline = onlineUsers?.some(
    (u) => recipientUsers[0]?._id === u.userId
  );

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name) => {
    const words = name.split(/[ -]/);

    let letters = "";
    if (words.length === 1) {
      letters = words[0].charAt(0).toUpperCase();
    } else {
      letters =
        words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: letters,
    };
  };

  const getAvatar = () => {
    if (chat?.members?.length > 2) {
      return (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <span
              style={{
                argin: "1px",
                borderRadius: "50%",
                backgroundColor: "black",
                color: "white",
                padding: "1px",
                height: "13px",
                width: "13px",
                fontSize: "7px",
                lineHeight: "13px",
                textAlign: "center",
              }}
            >
              TM
            </span>
          }
        >
          {chat?.teamName && (
            <Avatar
              sx={{ width: 33, height: 33 }}
              {...stringAvatar(chat?.teamName)}
            />
          )}
        </Badge>
      );
    }
    return (
      recipientUsers[0]?.name && (
        <Avatar
          sx={{ width: 33, height: 33, border: "4px solid green" }}
          {...stringAvatar(recipientUsers[0]?.name)}
        />
      )
    );
  };

  const getChatNeme = () => {
    if (chat?.members?.length > 2) {
      return chat.teamName;
    }
    return recipientUsers[0]?.name;
  };

  const truncateText = (text) => {
    return text?.length > 20 ? text.substr(0, 20) + "..." : text;
  };

  return (
    <Box
      onClick={() => {
        if (thisUserNotifications.length > 0) {
          markThisUserNotificationsAsRead(chat?._id, notifications);
        }
      }}
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "90%",
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
          width: "65%",
          alignItems: "center",
        }}
      >
        {getAvatar()}
        <Box>
          <Typography variant="subtitle2">{getChatNeme()}</Typography>
          <Typography variant="body2" sx={{ color: "rgb(96, 92, 92)" }}>
            {latestMessage?.text
              ? truncateText(latestMessage?.text)
              : "Start conversation.."}
          </Typography>
        </Box>
      </Stack>
      <Stack
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "12px" }}
        >
          {latestMessage?.createdAt &&
            moment(latestMessage?.createdAt).calendar()}
        </Typography>
        {thisUserNotifications.length > 0 && (
          <div className="this-user-notifications">
            {thisUserNotifications.length}
          </div>
        )}
        <span className={isOnline ? "user-online" : ""}></span>
      </Stack>
    </Box>
  );
};

export default UserChat;
