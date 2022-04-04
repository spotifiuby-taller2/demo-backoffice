import React, { useState } from "react";
import { Box,
    Container,
    createTheme,
    CssBaseline,
    Typography } from "@mui/material";
import { loginStyles } from "../style/signin/SignIn";
import { ThemeProvider } from "@emotion/react";
import {auth} from "../services/FirebaseService";
//import { useNavigate } from "react-router-dom";

const UsersList = (props) => {
    const [theme] = useState( createTheme() );

    // const navigate = useNavigate();

    return (
        <ThemeProvider theme={ theme }>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={loginStyles.boxStyle}>
                    <Typography component="h1" variant="h5"
                    >Lista de usuarios
                    </Typography>

                    <div> <br /> </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export {
    UsersList
}
