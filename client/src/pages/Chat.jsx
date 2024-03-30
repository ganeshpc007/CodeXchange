import { useContext, useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled, useTheme } from "@mui/material/styles";
import profileAvatar from "../assets/avatar.svg";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppDrawer from "../components/AppDrawer.jsx";
import UserChat from "../components/chat/UserChat.jsx";
import { ChatContext } from "../context/ChatContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import ChatBox from "../components/chat/ChatBox.jsx";

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
  const [tabValue, setTabValue] = useState("2");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { userChats, updateCurrentChat } = useContext(ChatContext);

  const theme = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container
      sx={{
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

      <Stack sx={{ height: "100%" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
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
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserChat chat={chat} user={user} />
              </div>
            );
          })}

          {/* <TabContext value={tabValue} sx={{width:"50%"}}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="PERSONAL" value="1" />
                <Tab label="ALL" value="2" />
                <Tab label="TEAMS" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">
              <UserChat/>
              <UserChat/>
              <UserChat/>
              <UserChat/>
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext> */}
        </Stack>
      </Stack>
      <Stack sx={{ height: "100%", width: "100%" }}>
        <ChatBox />
      </Stack>
    </Container>
  );
};

export default Chat;
