import React, {useEffect,
               useState} from "react";
import * as constants from "../others/constants";
import { getToGateway } from "../others/utils";
import {Box,
        Container,
        createTheme,
        CssBaseline,
        Typography} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {loginStyles} from "../style/signin/SignIn";
import {TextRow} from "./components/TextRow";

const getProfileOf = async (id) => {
    const response = await getToGateway(constants.USERS_HOST + constants.PROFILE_URL,
        "?" + constants.USER_ID_QUERY_PARAM
            + id
            + "&"
            + constants.USER_PROFILE_ADM_REQUEST
            + "adminRequest");

    if (response.error !== undefined) {
        alert(response.error);
    }

    return response;
}

const UserProfile = (props) => {
    const userId = window.location
                         .href
                         .split(constants.PROFILE_URL + "/")[1];

    const [user, setUser] = useState({});

    const [theme] = useState( createTheme() );

    useEffect( () => {
        ( async () => {
            const response = await getProfileOf(userId)
            setUser(response);
        } )();

        return () => {
        };
    }, [userId]);

    return (
        <ThemeProvider theme={ theme }>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={loginStyles.boxStyle}>
                    <Typography component="h1"
                                variant="h3">{user.name + " "
                                                        + user.surname}
                    </Typography>

                    <div>
                        <br />
                    </div>

                    <img src={user.photoUrl}
                         alt="Sin Imagen">
                    </img>

                    <div>
                        <br />
                    </div>

                    <TextRow text={"Email: " + user.email}/>

                    <TextRow text={"Teléfono: " + user.phoneNumber}/>

                    <div>
                        <br />
                    </div>

                    <div>
                        { (user.isArtist) && (
                            <div>
                                <Typography component="h1"
                                            variant="h5">{
                                    "Suscriptores: " +
                                    user.nFollowers}
                                </Typography>

                                <div>
                                    <br/>
                                </div>
                            </div>
                            )
                        }
                    </div>

                    <div>
                        { (user.isArtist) && (user.verificationVideoUrl !== null)
                                          && (! user.isVerified)
                                          && (
                            <div>
                                <Typography component="h1"
                                            variant="h5">{
                                                "Video de verificación: " +
                                                user.verificationVideoUrl}
                                </Typography>

                                <div>
                                    <br/>
                                </div>
                            </div>
                            )
                        }
                    </div>

                    <div>
                        <br />
                    </div>

                    <div>
                        { (user.isListener) && (
                            <TextRow text="Intereses musicales:"/> )
                        }
                    </div>

                    <div> {
                            (user.metal) && (
                                <TextRow text="Metal"/>
                            )
                        }
                    </div>

                    <div> {
                        (user.rap) && (
                            <TextRow text="Rap"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.pop) && (
                            <TextRow text="Pop"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.classic) && (
                            <TextRow text="Clásica"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.electronic) && (
                            <TextRow text="Electrónica"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.jazz) && (
                            <TextRow text="Jazz"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.reggeaton) && (
                            <TextRow text="Reggeaton"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.indie) && (
                            <TextRow text="Indie"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.punk) && (
                            <TextRow text="Punk"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.salsa) && (
                            <TextRow text="Salsa"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.blues) && (
                            <TextRow text="Blues"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.rock) && (
                            <TextRow text="Rock"/>
                        )
                    }
                    </div>

                    <div> {
                        (user.other) && (
                            <TextRow text="Other"/>
                        )
                    }
                    </div>
                    <div>
                        <br />
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export {
    UserProfile
}
