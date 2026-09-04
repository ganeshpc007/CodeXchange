import { useContext, useState, useEffect } from "react";
import React from "react";
import {
  Avatar,
  InputAdornment,
  Button,
  IconButton,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

import { AuthContext } from "../context/AuthContext.jsx";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://ganesh-p-c.vercel.app/"
        target="_blanck"
      >
        Ganesh P C
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SignIn = () => {
  const {
    signInError,
    signInInfo,
    isSignInLoading,
    updateSignInInfo,
    signInUser,
  } = useContext(AuthContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/1200/800");
        setRandomImage(response.url);
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    };
  
    fetchRandomImage();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  // Set VITE_GUEST_EMAIL / VITE_GUEST_PASSWORD in your .env file (see .env.example)
  // to enable the guest demo login. Button is a no-op if unset.
  const getGuestCredentials = () => {
    const guestEmail = import.meta.env.VITE_GUEST_EMAIL;
    const guestPassword = import.meta.env.VITE_GUEST_PASSWORD;

    if (!guestEmail || !guestPassword) {
      setSnackbarContent("Guest login is not configured.");
      setSnackbarOpen(true);
      return;
    }

    updateSignInInfo({
      email: guestEmail,
      password: guestPassword,
    });
  };

  useEffect(() => {
    if (signInError?.error) {
      setSnackbarContent(signInError?.message);
      setSnackbarOpen(true);
    }
  }, [signInError]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://picsum.photos/1200/800)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ m: "0 0 10px 0" }}>
              <span className="title small-title highlighted-text">
                Code
                <span style={{ color: "red" }}>X</span>
                change
              </span>
            </Box>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={signInUser}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={signInInfo.email}
                onChange={(e) => {
                  updateSignInInfo({
                    ...signInInfo,
                    email: e.target.value.toLowerCase(),
                  });
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={signInInfo.password} // Assuming signInInfo.password is the current password value
                onChange={(e) =>
                  updateSignInInfo({ ...signInInfo, password: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSignInLoading}
              >
                {isSignInLoading ? "One Moment, Please..." : "Sign In"}
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
                onClick={() => getGuestCredentials()}
              >
                Get Guest User Credentials
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarContent}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default SignIn;
