import { useCallback, useContext, useEffect, useState } from "react";
import { Backdrop, Box, Modal, Fade, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import {
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ChatContext } from "../../context/ChatContext";
import Autocomplete from "@mui/material/Autocomplete";
import Editor from "@monaco-editor/react";
import { AuthContext } from "../../context/AuthContext";
import { useFetchRecipients } from "../../hooks/useFetchRecipients";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ShareCode = () => {
  const [language, setLanguage] = useState(null);
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");
  const [keepWindowClosed, setKeepWindowClosed] = useState(false);
  const {
    openShareCode,
    updateOpenShareCode,
    currentChat,
    sendMessage,
    isMessageSending,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const { recipientUsers, loading } = useFetchRecipients(currentChat, user);

  useEffect(() => {
    const storedData = localStorage.getItem("keepWindowClosed");
    if (storedData !== null) {
      setKeepWindowClosed(JSON.parse(storedData));
    }
  }, []);

  const handleCheckboxChange = useCallback((event) => {
    const isChecked = event.target.checked;
    setKeepWindowClosed(isChecked);
    localStorage.setItem("keepWindowClosed", JSON.stringify(isChecked));
  }, []);

  // console.log("message", message);
  // console.log("language", language);
  // console.log("code", code);

  const handleLanguageChange = useCallback((event, value) => {
    setLanguage(value);
  }, []);

  const handleCodeChange = useCallback((value) => {
    setCode(value);
  }, []);

  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const getChatNeme = () => {
    if (currentChat?.members?.length > 2) {
      return currentChat.teamName;
    }
    return recipientUsers[0]?.name;
  };

  const clearForm = useCallback(() => {
    setMessage("");
    setCode(null);
    setLanguage(null);
  });

  const handleSendMessage = useCallback(async () => {
    if (message && code && language && user) {
      const messageSentSuccessful = await sendMessage(
        currentChat?._id,
        user?._id,
        message,
        code,
        language.icon
      );
      if (messageSentSuccessful) {
        updateOpenShareCode(!keepWindowClosed);
        clearForm();
      }
    } else {
      alert("All feild are required..");
    }
  });

  function LanguageSelect() {
    return (
      <Autocomplete
        value={language}
        required
        onChange={handleLanguageChange}
        sx={{ width: 300 }}
        options={languages}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.label !== "Others" && (
              <img
                loading="lazy"
                width="20"
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${option.icon}/${option.icon}-original.svg`}
                alt={option.label}
              />
            )}

            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a programming language"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            autoComplete="off"
          />
        )}
      />
    );
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openShareCode}
      onClose={() => updateOpenShareCode(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openShareCode}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {loading ? (
              "Loading.."
            ) : (
              <>
                You Are Sending Code To{" "}
                <b>
                  <i>{getChatNeme(currentChat)}</i>{" "}
                </b>
              </>
            )}
          </Typography>

          <Stack
            sx={{ m: "15px 0", justifyContent: "space-between" }}
            direction={"row"}
          >
            <TextField
              sx={{ width: "70%" }}
              label="Message/Component/Description"
              variant="outlined"
              autoComplete="off"
              required
              value={message}
              onChange={handleMessageChange}
            />
            {LanguageSelect()}
          </Stack>
          <Editor
            height="76%"
            language={language?.icon}
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
            options={{
              inlineSuggest: true,
              fontSize: "14px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { scale: 10 },
              autoIndent: "full",
              contextmenu: true,
              fontFamily: "monospace",
            }}
          />
          <Box
            sx={{
              padding: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={keepWindowClosed}
                  onChange={handleCheckboxChange}
                />
              }
              label="Close Window On Send"
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleSendMessage()}
              disabled={isMessageSending}
            >
              {isMessageSending ? "Sending" : "Send"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

const languages = [
  { label: "JavaScript", icon: "javascript" },
  { label: "Python", icon: "python" },
  { label: "Java", icon: "java" },
  { label: "C++", icon: "cplusplus" },
  { label: "C#", icon: "csharp" },
  { label: "Ruby", icon: "ruby" },
  { label: "Swift", icon: "swift" },
  { label: "Go", icon: "go" },
  { label: "Rust", icon: "rust" },
  { label: "TypeScript", icon: "typescript" },
  { label: "PHP", icon: "php" },
  { label: "Kotlin", icon: "kotlin" },
  { label: "Scala", icon: "scala" },
  { label: "Bash", icon: "bash" },
  { label: "R", icon: "r" },
  { label: "Perl", icon: "perl" },
  { label: "Clojure", icon: "clojure" },
  { label: "Elixir", icon: "elixir" },
  { label: "Erlang", icon: "erlang" },
  { label: "Haskell", icon: "haskell" },
  { label: "SQL", icon: "mysql" },
  { label: "Dart", icon: "dart" },
  { label: "Groovy", icon: "groovy" },
  { label: "Lua", icon: "lua" },
  { label: "Fortran", icon: "fortran" },
  { label: "MATLAB", icon: "matlab" },
  { label: "Solidity", icon: "solidity" },
  { label: "HTML5", icon: "html5" },
  { label: "CSS3", icon: "css3" },
  { label: "Others", icon: "others" },
];

export default ShareCode;
