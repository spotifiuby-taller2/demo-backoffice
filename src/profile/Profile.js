import {
  Container, createTheme,
  CssBaseline,
  Typography
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";

const Profile = (props) => {
  const [theme] = useState( createTheme() );

    return (
      <ThemeProvider theme={ theme }>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Typography component="h1" variant="h5"
            >Perfil
            </Typography>

        </Container>
      </ThemeProvider>
    );
}

export {
  Profile
};
