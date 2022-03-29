import React, { useState } from 'react';
import { BrowserRouter,
         Route,
         Routes,
         useNavigate } from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import { ForgotPassword } from "./login/ForgotPassword";
import { UsersList } from "./home/UsersList";
import { Button } from "@mui/material";
import { auth } from "./services/FirebaseService";
import { Services } from "./home/Services";
import "./style/HomePageRoutes.css";

const constants = require("./others/constants");
const { RecoverPassword } = require('./login/RecoverPassword');
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');

let getUser = () => {
    return auth.currentUser
};

function MyPageContent(props) {
    const navigate = useNavigate();

    const redirectUsersLists = (props) => {
        navigate(constants.USERS_URL);
    };

    const redirectServices = (props) => {
        navigate(constants.SERVICES_URL);
    }

    return (
            <nav className="container">
                <div className="links">
                    <Button className="homepage"
                            onClick={ redirectUsersLists }
                            variant="themed"
                    >Usuarios</Button>

                    <Button className="homepage"
                            variant="themed"
                    >Transacciones</Button>

                    <Button className="homepage"
                            onClick={ redirectServices }
                            variant="themed"
                    >Servicios</Button>

                    <Button className="homepage"
                            variant="themed"
                    >Métricas</Button>
                </div>
            </nav>
    );
}

function MyRouter(props) {
    return (
            <div>
            <Routes>
                <Route path="/" element={ <SignIn/> }> </Route>

                <Route exact path={ constants.SIGN_UP_URL }
                       element={ <SignUp/> }> </Route>

                <Route exact path={ constants.SIGN_UP_END_URL + "/:userId" }
                       element={ <SignUpEndWrapper/> }> </Route>

                <Route exact path={ constants.SIGN_IN_URL }
                       element={ <SignIn updateToken={props.updateToken}/> }> </Route>

                <Route exact path={ constants.FORGOT_PASSWORD_URL }
                       element={ <ForgotPassword/> }> </Route>

                <Route exact path={ constants.FORGOT_PASSWORD_URL + "/:userId" }
                       element={ <RecoverPassword/> }> </Route>

                <Route exact path={ constants.USERS_URL }
                       element={ <UsersList/> }> </Route>

                <Route exact path={ constants.SERVICES_URL }
                       element={ <Services/> }> </Route>
            </Routes>
            </div>
    );
}

function App() {
    const [token,
           setToken] = useState("");

    const updateToken = (idToken) => {
        setToken(idToken);
    }

    // Replace with condition over token
    if(true) {
        return (
            <BrowserRouter>
                <MyPageContent>
                </MyPageContent>

                <MyRouter updateToken={updateToken}>
                </MyRouter>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <MyRouter updateToken={updateToken}>
            </MyRouter>
        </BrowserRouter>
    );
}

export default App;
