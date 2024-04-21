import { useContext, useEffect, useState } from "react";
import { Avatar, InputAdornment, Button, IconButton } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../context/AuthContext";

const Copyright = (props) => {
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
};

const defaultTheme = createTheme();

const SignUp = () => {
  const {
    signUpInfo,
    updateSignUpInfo,
    signUpError,
    isSignUpLoding,
    signUpUser,
  } = useContext(AuthContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    if (signUpError?.error) {
      setSnackbarContent(signUpError?.message);
      setSnackbarOpen(true);
    }
  }, [signUpError]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={signUpUser} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  label="Your Name"
                  autoFocus
                  onChange={(e) => {
                    updateSignUpInfo({ ...signUpInfo, name: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    updateSignUpInfo({
                      ...signUpInfo,
                      email: e.target.value.toLowerCase(),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={signUpInfo.password} // Assuming signUpInfo.password is the current password value
                  onChange={(e) =>
                    updateSignUpInfo({
                      ...signUpInfo,
                      password: e.target.value,
                    })
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSignUpLoding}
            >
              {isSignUpLoding ? "Almost There.." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
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
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
