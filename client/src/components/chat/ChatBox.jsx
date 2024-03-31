import { Stack, Box, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import CodeDisplay from "../CodeDisplay";
import { ChatContext } from "../../context/ChatContext";
import { TbFileDownload } from "react-icons/tb";
import { LuClipboardCopy } from "react-icons/lu";
import moment from "moment";

const ChatBox = () => {
  const [codeCopy, setCodeCopy] = useState(false);
  const { currentChat, messages, sendCodeMessage } = useContext(ChatContext);
  console.log("messages", messages);
  const handleCopyClipboard = useCallback((code) => {
    navigator.clipboard.writeText(code);
    setCodeCopy(true);
    setTimeout(() => {
      setCodeCopy(false);
    }, 3000);
  }, []);

  if (!currentChat) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet....
      </p>
    );
  }

  const cod = `const createMessage = async (req, res) => {
        try {
          const { chatId, senderId, text, 
            code, isCode, lang } = req.body;
      
          const message = 
          new messageModel({ chatId, senderId, text, code, isCode, lang });
      
        const response = await message.save();
      
          res.status(200).json(response);
        } catch (error) {
          res.status(500).json(error);
        }
      };`;

  const lan = `javascript`;

  return (
    <Stack sx={{ height: "100%" }}>
      <div
        style={{
          background: "#1e1e1e",
          padding: "10px",
          height: "4%",
          textAlign: "center",
          color: "#ffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Vx-Dev
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
        }}
      >
        {messages &&
          messages.map((msg, index) => {
            return (
              <Stack
                key={index}
                sx={{ background: "#5e606c", borderRadius: "6px" }}
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
                      background: "black",
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <Typography style={{ fontStyle: "italic" }}>
                      {msg.text}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: "12px" }}>
                        {"<Javascript/>"}
                      </Typography>
                      {codeCopy ? (
                        <Typography sx={{ fontSize: "12px" }}>
                          Copied!
                        </Typography>
                      ) : (
                        <LuClipboardCopy
                          title="Copy code!"
                          style={{ fontSize: "16px", cursor: "pointer" }}
                          onClick={() => handleCopyClipboard(cod)}
                        />
                      )}
                      <TbFileDownload
                        title="Download file!"
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <CodeDisplay code={msg.code} language={lan} />
                </Box>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
