import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  CssBaseline,
  Box,
  Paper
} from '@mui/material';
import { SIGN_UP_URL } from "../../others/constants";
import { loginStyles } from "../../style/signin/SignIn";
import { ThemeProvider } from "@emotion/react";
import logo from "../../media/hexagon.png";
import Constants from "../../others/constants";
import { SignComponent } from "./SignComponent";

class SignIn extends SignComponent {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn
                            .bind(this);
  }

  handleSignIn() {
    fetch(Constants.USERS_HOST + Constants.SIGN_IN_URL, {
        method: "POST",
        headers: Constants.JSON_HEADER,
        body: {
          email: this.emailReference
            .current,
          password: this.passwordReference
            .current
        }
      }
    ).then(response => {
        console.log(response);
      }
    ).catch(error => {
        console.log("==========");
        console.log(error);
      }
    );
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
                onChange = { this.handleEmailChange.bind(this) }
                margin="normal"
                required
                fullWidth
                label="Correo"
                name="email"
                autoFocus
              />

              <TextField
                onChange = { this.handlePasswordChange.bind(this) }
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
                  <Link href={SIGN_UP_URL} variant="body2">
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

export { SignIn };
