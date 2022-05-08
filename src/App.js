import React, {useMemo, useState} from 'react';
import { BrowserRouter,
         Route,
         Routes,
         useNavigate } from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import { ForgotPassword } from "./login/ForgotPassword";
import { RestaurantsList } from "./home/RestaurantsList";
import {Button, Typography} from "@mui/material";
import "./style/HomePageRoutes.css";
import { AuthContext } from "./services/AuthContext";
import { useContext } from "./services/AuthContext";
import {getFormatedDate} from "./others/utils";

const constants = require("./others/constants");
const { RecoverPassword } = require('./login/RecoverPassword');
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');

function NavBar(props) {
    const navigate = useNavigate();

    const { removeToken } = useContext();

    const [focused, setFocused] = useState(true);

    const [focused2, setFocused2] = useState(false);

    const redirectRestaurantList = (props) => {
        navigate(constants.RESTAURANTS_LIST_URL);
    };

    const closeSession = (props) => {
        removeToken();
        navigate("/");
    }

    const focus1 = () => {
        setFocused(true);
        setFocused2(false);
    }

    const focus2 = () => {
        setFocused(false);
        setFocused2(true);
    }

    return (
            <nav className="container"
                 style={{background: 'black'}}>
                <div className="links"
                     style={{color: 'white'}}>
                    <Button className="homepage"
                            onClick={ redirectRestaurantList }
                            style={{color: focused ? 'red' : ''}}
                            variant="themed"
                            onFocus={() => focus1()}
                    >Restaurantes</Button>

                    <Button className="homepage"
                            onClick={ redirectRestaurantList }
                            style={{color: focused2 ? 'red' : ''}}
                            variant="themed"
                            onFocus={() => focus2()}
                    >Otra cosa</Button>

                    {/* Very untidy way of moving away sign out button */}
                    <Typography className="homepage"
                               style={{color: 'black'}}
                    >...............................................................
                        ............................................................
                        ............................................................
                        ..............</Typography>

                    <Button className="homepage"
                            variant="themed"
                            onClick={ closeSession }
                    >Cerrar Sesión</Button>
                </div>
            </nav>
    );
}

function NotLoggedRouter(props) {
    return (
            <div>
            <Routes>
                <Route path="/" element={ <SignIn/> }> </Route>

                <Route exact path={ constants.SIGN_UP_URL }
                       element={ <SignUp/> }> </Route>

                <Route exact path={ constants.SIGN_UP_END_URL + "/:userId/:pin" }
                       element={ <SignUpEndWrapper/> }> </Route>

                <Route exact path={ constants.SIGN_IN_URL }
                       element={ <SignIn/> }> </Route>

                <Route exact path={ constants.FORGOT_PASSWORD_URL }
                       element={ <ForgotPassword/> }> </Route>

                <Route exact path={ constants.FORGOT_PASSWORD_URL + "/:userId" }
                       element={ <RecoverPassword/> }> </Route>

                {/* Redirect */}
                <Route exact path={ constants.USERS_URL }
                       element={ <SignIn/> }> </Route>

                <Route exact path={ constants.SERVICES_URL }
                       element={ <SignIn/> }> </Route>
            </Routes>
            </div>
    );
}

function LoggedRouter(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <RestaurantsList/> }> </Route>

                <Route exact path={ constants.RESTAURANTS_LIST_URL }
                       element={ <RestaurantsList/> }> </Route>
            </Routes>
        </div>
    );
}

function DisplayApp() {
    const { isValidToken,
            checkIsValidToken } = useContext();

    return (
        <>
            {
                ( checkIsValidToken() && isValidToken ) ? (
                    <BrowserRouter>
                        <NavBar>
                        </NavBar>

                        <LoggedRouter>
                        </LoggedRouter>
                    </BrowserRouter>
                ):(
                    <BrowserRouter>
                        <NotLoggedRouter>
                        </NotLoggedRouter>
                    </BrowserRouter>
                )
            }
        </>
    );
}

function App() {
    // State can be used to save the session because it is lost on refresh.
    // Nevertheless, is is necessary for UseMemo to update dynamically.
    // Therefore, it is used as a stub.
    const [isValidToken,
          setIsValidToken] = useState(true);

    const context = useMemo( () => {
        return ( {
            isValidToken,

            removeToken: () => {
                localStorage.removeItem('my-token');

                localStorage.removeItem('token-time');

                localStorage.removeItem('token-date')

                setIsValidToken(false);
            },

            checkIsValidToken: () => {
                const now = new Date();
                const tokenTime = parseInt( localStorage.getItem('token-time') );
                const tokenDate = localStorage.getItem('token-date');

                if ( getFormatedDate(now) !== tokenDate
                   || now.getTime()
                         .toString() - tokenTime > constants.ONE_HOUR_DIFFERENCE ) {
                    return false;
                }

                return localStorage.getItem('my-token') !== "";
            },

            saveToken: (token) => {
                localStorage.setItem('my-token', token);

                const now = new Date();

                localStorage.setItem( 'token-time', now.getTime()
                                                       .toString() );

                localStorage.setItem( 'token-date', getFormatedDate(now) );

                setIsValidToken(false);

                setIsValidToken(true);
            }
        } );
    }, [isValidToken, setIsValidToken]);

    return (
        <AuthContext.Provider value={context}>
            <DisplayApp>
            </DisplayApp>
        </AuthContext.Provider>
    )
}

export default App;
