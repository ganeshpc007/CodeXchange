import { Stack, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import CodeDisplay from "../CodeDisplay";
import { ChatContext } from "../../context/ChatContext";
import { TbFileDownload } from "react-icons/tb";

const ChatBox = () => {
  const { currentChat } = useContext(ChatContext);

  if (!currentChat) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet....
      </p>
    );
  }

  const cod = `const createMessage = async (req, res) => {
        try {
          const { chatId, senderId, text, code, isCode, lang } = req.body;
      
          const message = new messageModel({ chatId, senderId, text, code, isCode, lang });
      
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
      <Stack sx={{ height: "95%", padding: "15px", background: "#EEEEEE" }}>
        <Stack sx={{ background: "#5e606c", borderRadius: "6px" }}>
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
              {"30-03-2024"}
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
                {"User chat box component.."}
              </Typography>
              <div style={{ display: "flex", gap: "10px" }}>
                <Typography sx={{ fontSize: "12px" }}>
                  {"<Javascript/>"}
                </Typography>
                <Typography title="Copy code!" sx={{ fontSize: "12px", cursor: "pointer" }}>
                  {"Copy"}
                </Typography>
                <TbFileDownload
                  title="Download file!"
                  style={{ fontSize: "18px", cursor: "pointer" }}
                />
              </div>
            </div>
            <CodeDisplay code={cod} language={lan} />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
