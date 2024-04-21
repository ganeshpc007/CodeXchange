import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import CodeDisplay from "../CodeDisplay";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { TbFileDownload } from "react-icons/tb";
import { LuClipboardCopy } from "react-icons/lu";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import moment from "moment";
import { GrSend } from "react-icons/gr";
import { useFetchRecipients } from "../../hooks/useFetchRecipients";

const ChatBox = () => {
  const [codeCopy, setCodeCopy] = useState("");
  const { currentChat, messages, updateOpenShareCode, onlineUsers } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { recipientUsers, loading } = useFetchRecipients(currentChat, user);

  const handleCopyClipboard = useCallback((code, msgId) => {
    navigator.clipboard.writeText(code);
    setCodeCopy(msgId);
    setTimeout(() => {
      setCodeCopy("");
    }, 3000);
  }, []);

  if (!currentChat) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No chat selected yet....
      </p>
    );
  }

  const getChatNeme = () => {
    if (currentChat?.members?.length > 2) {
      return currentChat.teamName;
    }
    return recipientUsers[0]?.name;
  };

  const isOnlineUser = () => {
    if (currentChat?.members?.length > 2) return false;
    const recipientsId = currentChat?.members.filter((id) => id !== user?._id);
    return onlineUsers?.some((u) => recipientsId[0] === u.userId);
  };

  return (
    <Stack sx={{ height: "100%", position: "relative" }}>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          right: "5%",
          bottom: "4%",
        }}
        onClick={() => {
          updateOpenShareCode(true);
        }}
        startIcon={<GrSend style={{ fontSize: "24px" }} />}
      >
        Share
      </Button>
      <div
        style={{
          background: "#1e1e1e",
          padding: "10px",
          height: "6%",
          textAlign: "center",
          color: "#ffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <label style={{ fontSize: "20px" }}>{getChatNeme()}</label>
        {isOnlineUser() ? (
          <label style={{ fontSize: "12px", color: "rgb(0, 219, 0)" }}>
            Online
          </label>
        ) : (
          ""
        )}
      </div>
      <Stack
        sx={{
          height: "95%",
          padding: "15px",
          background: "#EEEEEE",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          gap: 2,
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
        {messages &&
          messages.map((msg, index) => {
            return (
              <Stack
                key={index}
                sx={{
                  background: "#5e606c",
                  borderRadius: "6px",
                }}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "white",
                    padding: "6px 10px",
                  }}
                >
                  <Typography>Ganesh p c</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      alignItems: "center",
                      display: "flex",
                      color: "#c5c5c5",
                    }}
                  >
                    {moment(msg.createdAt).calendar()}
                  </Typography>
                </Box>
                <Box sx={{ background: "black", color: "white" }}>
                  <div
                    style={{
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <Typography style={{ fontStyle: "italic" }}>
                      {msg.text}
                    </Typography>
                    {msg.code && (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ display: "flex" }}>
                          {msg?.lang !== "others" ? (
                            <img
                              loading="lazy"
                              width="18"
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${msg.lang}/${msg.lang}-original.svg`}
                              alt={msg.lang}
                            />
                          ) : (
                            "Others"
                          )}
                        </Typography>
                        {codeCopy === msg._id ? (
                          <HiOutlineClipboardCheck
                            style={{ fontSize: "22px" }}
                          />
                        ) : (
                          <LuClipboardCopy
                            title="Copy code!"
                            style={{ fontSize: "20px", cursor: "pointer" }}
                            onClick={() =>
                              handleCopyClipboard(msg.code, msg._id)
                            }
                          />
                        )}
                        <TbFileDownload
                          title="Download file!"
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </div>
                    )}
                  </div>
                  {msg.code && (
                    <CodeDisplay code={msg.code} language={msg.lang} />
                  )}
                </Box>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
