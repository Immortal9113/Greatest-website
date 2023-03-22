import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import "../App.css";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://engineering-club.com/">
        Engineering Club
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "error",
        },
      },
    },
  },
});

export default function SignIn() {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateEmail();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword();
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const signInDisabled = () => {
    if (emailError || passwordError) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmitValid = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    signInDisabled();
    // Handle form submission logic here
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setShowAlert(true);
    }
    const user = { username: email, password: password };
    axios
      .post("http://192.168.68.185:5000/api/auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setResponse(response.data);
        setError(null);
      })
      .catch((error) => {
        setResponse(null);
        if (error.response) {
          if (error.response.status >= 400) {
            setError("Incorrect user data.");
          } else if (error.response.status >= 500) {
            setError("Server side error");
          } else {
            setError("Unknown error");
          }
          setShowAlert(true);
          document.getElementById("password").value = "";
        } else {
          setError(error.message);
        }
      });

    const onChangeEmail = () => {};
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={emailError}
              helperText={emailError}
              margin="normal"
              required
              fullWidth
              id="login"
              label="User login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={handleEmailChange}
              onBlur={validateEmail}
            />
            <TextField
              error={passwordError}
              helperText={passwordError}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
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
                }
                label="Password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </FormControl>
            <Button
              disabled={signInDisabled()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div className="alert-container">
              {showAlert && (
                <Alert severity="error" className="alert">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
            </div>
            <Grid container>
              <Grid item xs>
                Forgot password?
              </Grid>
              <Grid item>
                <li>
                  <Link href="/SignUp">Sign up</Link>
                </li>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
