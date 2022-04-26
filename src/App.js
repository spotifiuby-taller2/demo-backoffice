import React, {useMemo, useState} from 'react';
import { BrowserRouter,
         Route,
         Routes,
         useNavigate } from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import { ForgotPassword } from "./login/ForgotPassword";
import { UsersList } from "./home/UsersList";
import { Button } from "@mui/material";
import { Services } from "./home/Services";
import "./style/HomePageRoutes.css";
import { AuthContext } from "./services/AuthContext";
import { useContext } from "./services/AuthContext";
import {getFormatedDate} from "./others/utils";
import {RedirectToMetrics} from "./home/RedirectToMetrics";

const constants = require("./others/constants");
const { RecoverPassword } = require('./login/RecoverPassword');
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');

function NavBar(props) {
    const navigate = useNavigate();
    const { removeToken } = useContext();

    const redirectUsersLists = (props) => {
        navigate(constants.USERS_URL);
    };

    const redirectMetrics = (props) => {
        navigate(constants.METRICS_URL);
    }

    const redirectServices = (props) => {
        navigate(constants.SERVICES_URL);
    }

    const closeSession = (props) => {
        removeToken();
    }

    return (
            <nav className="container">
                <div className="links">
                    <Button className="homepage"
                            onClick={ redirectUsersLists }
                            variant="themed"
                    >Usuarios</Button>

                    <Button className="homepage"
                            onClick={ redirectServices }
                            variant="themed"
                    >Servicios</Button>

                    <Button className="homepage"
                            variant="themed"
                    >Transacciones</Button>

                    <Button className="homepage"
                            variant="themed"
                    >Contenidos</Button>

                    <Button className="homepage"
                            variant="themed"
                            onClick={ redirectMetrics }
                    >Métricas</Button>

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
                <Route path="/" element={ <UsersList/> }> </Route>

                <Route exact path={ constants.USERS_URL }
                       element={ <UsersList/> }> </Route>

                <Route exact path={ constants.SERVICES_URL }
                       element={ <Services/> }> </Route>

                <Route exact path={ constants.METRICS_URL }
                       element={ <RedirectToMetrics/> }/>
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
                localStorage.removeItem('spoti-token');

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

                return localStorage.getItem('spoti-token') !== "";
            },

            saveToken: (token) => {
                localStorage.setItem('spoti-token', token);

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
