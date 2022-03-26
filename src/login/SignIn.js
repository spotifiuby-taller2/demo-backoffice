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
import { useState } from "react";
import { areAnyUndefined, getSHAOf } from "../others/utils";
import { auth } from "../services/FirebaseService";
import { useNavigate } from 'react-router-dom';
const firebaseAuth = require("firebase/auth");

const SignIn = (props) => {
  const navigate = useNavigate();

  const [theme] = useState(createTheme());

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

  async function handleSignIn() {
    if ( areAnyUndefined([emailReference,
                          passwordReference]) ) {
      alert("Por favor complete todos los campos.");

      return;
    }

    const password = getSHAOf( getSHAOf( passwordReference ) );

    const response = await firebaseAuth.signInWithEmailAndPassword(auth,
                                                                  emailReference,
                                                                  password)
        .catch((error) => {
          return error.toString()
        } );

    if (response.user === undefined) {
      alert("No se encontro ningun usuario con ese mail y/ o contraseña");

      return;
    }

    const idToken = await auth.currentUser
                              .getIdToken();

    // Not working...
    // props.updateToken(idToken);

    const requestBody = {
      email: emailReference,

      password: password,

      idToken: idToken,

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
                localStorage.setItem("token",
                                     idToken);

                navigate(constants.USERS_URL);
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
