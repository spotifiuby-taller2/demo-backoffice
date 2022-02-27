import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  TextField,
  Typography
} from "@mui/material";
import { createRef, Component } from "react";
import { auth } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ThemeProvider } from "@emotion/react";
import { loginStyles } from "../../style/signin/SignIn";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.theme = createTheme();

    this.emailReference = createRef();

    this.passwordReference = createRef();

    this.handleSignUp = this.handleSignUp
                            .bind(this);
  }

  handleSignUp() {
    createUserWithEmailAndPassword(
        auth,
        this.emailReference.current.toString(),
        this.passwordReference.current.toString()
    ).then(response => {
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
            <Typography component="h1" variant="h5"
            >Registrarse
            </Typography>

            <div> <br /> </div>

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

export {
  SignUp
}
