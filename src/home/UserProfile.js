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
import {profileStyles} from '../style/profileStyles'
import defaultImage from '../media/default.png'

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
        <div style={{backgroundColor: '#607D8B', height: '91vh'}}>
            <ThemeProvider theme={ theme }>                        
                <div style={{flex: 1, flexDirection: 'row', justifyContent: 'center',display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{flex: 1, alignItems: 'center'}}>
                        <Container component="main" maxWidth="sx" style={{width: 700,}}>
                            <CssBaseline />
                            <Box sx={loginStyles.boxStyle}>

                                <div>
                                    <img 
                                        src={user.photoUrl ? user.photoUrl : defaultImage}
                                        style={{height: 250, width: 250, borderRadius: '50%',}}
                                        alt="Sin Imagen">
                                    </img>
                                </div>
                                <Typography 
                                    component="h1"
                                    variant="h3">{user.name + " "+ user.surname}
                                </Typography>

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
                            </Box>
                        </Container>
                    </div>
                    
                    {
                        (user.isListener) && (
                            <div style={{flex: 1,}}>
                            <Container component="main" maxWidth="sx" style={{width: 400}}>
                                <CssBaseline />
                                <Box sx={loginStyles.boxStyle}>
                                    
                                    <div>
                                        {  
                                            <TextRow text="Intereses musicales:" style={{color: 'lightblue'}}/>
                                        }
                                    </div>
                                    
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>

                                    <div> {
                                            (user.metal) && (
                                                <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                    <TextRow text="Metal"/>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div> {
                                        (user.rap) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Rap"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.pop) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Pop"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.classic) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Clásica"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.electronic) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Electrónica"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.jazz) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Jazz"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.reggeaton) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Reggeaton"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.indie) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Indie"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.punk) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Punk"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.salsa) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Salsa"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.blues) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Blues"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.rock) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Rock"/>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div> {
                                        (user.other) && (
                                            <div style={{height: 33, width: 135, backgroundColor: 'lightblue', borderRadius: 10, textAlign: 'center', margin: 3}}>
                                                <TextRow text="Other"/>
                                            </div>
                                        )
                                    }
                                    </div>
                                    </div>
                                </Box>
                            </Container>
                        </div>)
                    }
                    
                </div>
            </ThemeProvider>
        </div>
    );
}

export {
    UserProfile
}
