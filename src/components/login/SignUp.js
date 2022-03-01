import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { loginStyles } from "../../style/signin/SignIn";
import { getHashOf } from "../../others/utils";
import { SignComponent } from "./SignComponent";
import Constants from "../../others/constants";

class SignUp extends SignComponent {
  constructor(props) {
    super(props);

    this.handleSignUp = this.handleSignUp
                            .bind(this);

    this.handleSignUpError = this.handleSignUpError
                                 .bind(this);
  }

  handleSignUpError(error) {
    alert(error);
  }

  handleSignUp() {
    const requestBody = {
      email: this.emailReference
        .current,

      password: getHashOf(getHashOf(
        this.passwordReference
          .current))
    }

    // response.json() is a promise
    fetch(Constants.USERS_HOST + Constants.SIGN_UP_URL, {
        method: "POST",
        headers: Constants.JSON_HEADER,
        body: JSON.stringify(requestBody)
      }
    ).then(response => response.json())
      .then(response => {
          if (response.error !== undefined) {
            this.handleSignUpError(response.error);
          }
        }
      );
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={loginStyles.boxStyle}>
            <Typography component="h1" variant="h5"
            >Registrarse
            </Typography>

            <div> <br /> </div>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange = { this.handleEmailChange.bind(this) }
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
                onChange = { this.handlePasswordChange.bind(this) }
                ref = { this.passwordReference }
                margin="normal"
                required
                fullWidth
                name="password-field"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
              />

              <Button
                onClick={this.handleSignUp}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >Registrarse
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
  }
}

export { SignUp }