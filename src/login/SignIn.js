import {
  Grid,
  TextField,
  Button,
  Link,
  Container,
  CssBaseline,
  Box,
  createTheme
} from '@mui/material';
import { loginStyles } from "../style/signin/SignIn";
import { ThemeProvider } from "@emotion/react";
import logo from "../media/logo.png";
import constants from "../others/constants";
import {useEffect, useState} from "react";
import {areAnyUndefined, getSHAOf, postTo} from "../others/utils";
import { useNavigate } from 'react-router-dom';
import { useContext } from "../services/AuthContext";

const SignIn = (props) => {
  const navigate = useNavigate();

  const [theme] = useState( createTheme() );

  const { saveToken } = useContext();

  const [emailReference,
         setEmailReference] = useState("");

  const [passwordReference,
         setPasswordReference] = useState("");

  useEffect(() => {
    document.body
            .style
            .backgroundColor = '#f9f6f4';
  }, []);

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

    const password = getSHAOf( getSHAOf(passwordReference) );

    const requestBody = {
      email: emailReference,

      password: password,

      link: "web",
    }

    const response = await postTo(requestBody,
        constants.BACK_HOST + constants.SIGN_IN_URL);

    if (response.error !== undefined) {
      alert(response.error);
    } else {
      // This would be a Firebase token
      saveToken(response.email);

      navigate(constants.RESTAURANTS_LIST_URL);
    }
  }

  return (
      <ThemeProvider theme={ theme }>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box sx={loginStyles.boxStyle}>
              <img src={logo}
                     alt={"logo"}/>

              <div>
                <br />
                <br />
              </div>

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
