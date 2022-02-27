import { Component, createRef } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  createTheme,
  Container,
  CssBaseline,
  Box,
  Paper
} from '@mui/material';
import { signUpUrl } from "../../others/constants";
import { auth }  from "../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginStyles } from "../../style/signin/SignIn";
import { ThemeProvider } from "@emotion/react";
import logo from "../../media/hexagon.png";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.theme = createTheme();

    this.emailReference = createRef();

    this.passwordReference = createRef();

    this.handleSignIn = this.handleSignIn
                            .bind(this);
  }

  handleSignIn() {
    signInWithEmailAndPassword(
      auth,
      this.emailReference.current.toString(),
      this.passwordReference.current.toString()
    )
      .then(response => {
        console.log(response);
      }
    ).catch(err => {
      console.log("*********");
      console.log(err);
    } );
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
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
                ref = { this.emailReference }
                margin="normal"
                required
                fullWidth
                label="Correo"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                ref = { this.passwordReference }
                margin="normal"
                required
                fullWidth
                name="password-field"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
              />

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

              <Button
                onClick={this.handleSignIn}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >Ingresar
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Reestablecer contraseña
                  </Link>
                </Grid>

                <Grid item>
                  <Link href={signUpUrl} variant="body2">
                    {"Registrarse"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
  }
}

export {
  SignIn
}
