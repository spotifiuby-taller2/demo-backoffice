import {Component, createRef} from 'react';
import {ThemeProvider} from "@emotion/react";
import {Box, Button, Container, createTheme, CssBaseline, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import constants from "../others/constants";
import {loginStyles} from "../style/signin/SignIn";
import {getTo} from "../others/utils";

function HandleRedirect() {
    const navigate = useNavigate();
    navigate(constants.SIGN_IN_URL, { replace: true });
}

class SignUpEnd extends Component {
    constructor(props) {
        super(props);

        this.theme = createTheme();

        this.text = createRef();
    }

    /*
    componentDidMount() {
        const userId = window.location
                             .href
                             .split(constants.SIGN_UP_END_URL + "/")[1];

        getTo(constants.USERS_HOST
              + constants.SIGN_UP_END_URL
              + "/"
              + userId,
            (response) => {
                console.log(response);
            } );
    }*/

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={loginStyles.boxStyle}>
                        <Typography component="h1"
                                    variant="h5"
                        > Confirmando cuenta...
                        </Typography>
                            <Button
                                fullWidth
                                onClick = { HandleRedirect }
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >Ir al ingreso
                            </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }
}

export {
    SignUpEnd
};
