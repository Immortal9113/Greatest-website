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
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

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

    if (!login || !password) {
      setShowAlert(true);
    }
    const user = { username: login, password: password };
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
              margin="normal"
              required
              fullWidth
              id="login"
              label="User login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={handleLoginChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
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
