import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
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

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://engineering-club.com/">
//         Engineering Club
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

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
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (value.length >= 8 && value.length <= 32) {
      setPasswordError("");
    } else {
      setPasswordError("Password must be at least 8 characters");
    }
  };

  const checkDisableTrigger = () => {
    if (emailError || passwordError || !password || !email) {
      return true;
    } else {
      return false;
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setShowAlert(false);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setShowAlert(false);
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
        setError(null);
      })
      .catch((error) => {
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
            />
            <FormControl
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={passwordError}
              helperText={passwordError}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                inputProps={{ maxLength: 32 }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={handlePasswordChange}
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
              <FormHelperText>{passwordError}</FormHelperText>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </FormControl>
            <Button
              disabled={checkDisableTrigger()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
            <div className="alert-container">
              <div className={showAlert ? "alert show" : "alert hide"}>
                <Alert severity="error" className="alert-content">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
