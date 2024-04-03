import { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Typography, Stack, TextField } from "@mui/material";
import { ChatContext } from "../../context/ChatContext";
import Autocomplete from "@mui/material/Autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "85%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function LanguageSelect() {
  return (
    <Autocomplete
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
          <img
            loading="lazy"
            width="20"
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${option.icon}/${option.icon}-original.svg`}
            alt={option.label}
          />
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
        />
      )}
    />
  );
}

const ShareCode = () => {
  const { openShareCode, updateOpenShareCode } = useContext(ChatContext);
  return (
    <div>
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
              You are sharing code to Selected recepient
            </Typography>
            <Stack
              sx={{ m: "15px", justifyContent: "space-between" }}
              direction={"row"}
            >
              <TextField
                sx={{ width: "65%" }}
                id="outlined-basic"
                label="Message/Component/Description"
                variant="outlined"
              />
              {LanguageSelect()}
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
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
  { label: "Objective-C", icon: "objectivec" },
  { label: "Assembly", icon: "assemblyx86" },
  { label: "Dart", icon: "dart" },
  { label: "Groovy", icon: "groovy" },
  { label: "Lua", icon: "lua" },
  { label: "Fortran", icon: "fortran" },
  { label: "Delphi", icon: "delphi" },
  { label: "MATLAB", icon: "matlab" },
  { label: "Solidity", icon: "solidity" },
  { label: "Apex", icon: "apex" },
  { label: "Others", icon: "others" },
];

export default ShareCode;
