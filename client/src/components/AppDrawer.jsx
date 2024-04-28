import { useContext, useState } from "react";
import {
  Box,
  Drawer,
  Button,
  styled,
  Badge,
  Avatar,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import profileAvatar from "../assets/avatar.svg";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

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

const AppDrawer = ({ open, toggleDrawer }) => {
  const [logoutModelOpen, setLogoutModelOpen] = useState(false);
  const { user, siginOut } = useContext(AuthContext);

  const handleClicklogoutModelOpen = () => {
    setLogoutModelOpen(true);
  };

  const handleClicklogoutModelClose = () => {
    setLogoutModelOpen(false);
  };

  const LogoutConfirm = (
    <Dialog
      open={logoutModelOpen}
      onClose={handleClicklogoutModelOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to sign out?"}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClicklogoutModelClose}>Cancel</Button>
        <Button onClick={siginOut} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      role="presentation"
    >
      <Stack sx={{ width: "100%", alignItems: "center", marginTop: 2 }}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {/* <Avatar
            alt="Profile Avatar"
            src={profileAvatar}
            sx={{ cursor: "pointer", width: 80, height: 80, padding: 2 }}
          /> */}

          <IconButton color="primary" sx={{fontSize:"50px"}}>
            <FaUserCircle style={{ color: "black" }} />
          </IconButton>

        </StyledBadge>
        <Typography variant="h6" component="div" sx={{ marginTop: 1 }}>
          {user?.name && user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email && user.email}
        </Typography>
      </Stack>
      <Stack sx={{ justifyContent: "center", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span className="title small-title highlighted-text">
            Code
            <span style={{ color: "red" }}>X</span>
            change
          </span>
          <Button
            href="https://www.linkedin.com/in/ganesh-p-c/"
            target="_blank"
            typography="body2"
            sx={{
              fontSize: 11,
              textTransform: "none",
            }}
          >
            Dev Outreach Channel
          </Button>
        </Box>
        <Button
          sx={{ bgcolor: "lightgray", p: 1, borderRadius: 1 }}
          startIcon={<LogoutIcon />}
          // variant="contained"
          color="error"
          onClick={handleClicklogoutModelOpen}
        >
          Sign out
        </Button>
      </Stack>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      {LogoutConfirm}
    </div>
  );
};

export default AppDrawer;
