import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  CssBaseline,
  Box,
  Paper, createTheme
} from '@mui/material';
import { loginStyles } from "../style/signin/SignIn";
import { ThemeProvider } from "@emotion/react";
import logo from "../media/hexagon.png";
import constants from "../others/constants";
import {useState} from "react";
import {getSHAOf} from "../others/utils";

const SignIn = (props) => {
  const [theme] = useState( createTheme() );

  const [emailReference, setEmailReference] = useState("");

  const [passwordReference, setPasswordReference] = useState("");

  const handleEmailChange = (event) => {
    setEmailReference(event.target
                           .value);
  }

  const handlePasswordChange = (event) => {
    setPasswordReference(event.target
                              .value);
  }

  const handleSignIn = () => {
    const requestBody = {
      email: emailReference,

      password: passwordReference === ""
          ? ""
          : getSHAOf( getSHAOf( passwordReference ) ),

      link: "web"
    }

    // response.json() is a promise
    fetch(constants.USERS_HOST + constants.SIGN_IN_URL, {
          method: "POST",
          headers: constants.JSON_HEADER,
          body: JSON.stringify(requestBody)
        }
    ).then(response => response.json())
        .then(response => {
              if (response.error !== undefined) {
                alert(response.error);
              } else {
                props.navigate(constants.PROFILE_URL, { replace: true });
              }
            }
        );
  }

  return (
      <ThemeProvider theme={ theme }>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box sx={loginStyles.boxStyle}>
              <Paper variant="outlined">
                <img src={logo} alt={"logo"}/>
              </Paper>

              <div> <br /> </div>

              <Typography component="h1" variant="h5"
              >Bienvenido
              </Typography>

              <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange = { handleEmailChange }
                value = { emailReference }
                margin="normal"
                required
                fullWidth
                label="Correo"
                name="email"
                autoFocus
              />

              <TextField
                onChange = { handlePasswordChange }
                value = { passwordReference }
                margin="normal"
                required
                fullWidth
                name="password-field"
                label="Contraseña"
                type="password"
              />

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

              <Button
                onClick={ handleSignIn }
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >Ingresar
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href={constants.FORGOT_PASSWORD_URL} variant="body2">
                    Reestablecer contraseña
                  </Link>
                </Grid>

                <Grid item>
                  <Link href={constants.SIGN_UP_URL} variant="body2">
                    {"Registrarse"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

export {
  SignIn
};
