import React from 'react';
import { BrowserRouter,
         Route,
         Routes,
         useNavigate } from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import { ForgotPassword } from "./login/ForgotPassword";
import { UsersList } from "./home/UsersList";
import {Navbar} from "react-bootstrap";
import {Button} from "@mui/material";
const constants = require("./others/constants");
const { RecoverPassword } = require('./login/RecoverPassword');
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');

function MyNavbar() {
    const navigate = useNavigate();

    const redirectUsersLists = (props) => {
        navigate(constants.USERS_URL,
            { replace: true });
    };

    return (
        <Navbar bg="light">
            <Button
                onClick={ redirectUsersLists }
                variant="themed">Usuarios
            </Button>

            <Button
                onClick={ navigate(constants.USERS_URL,
                    { replace: true } ) }
                variant="themed">Transacciones
            </Button>

            <Button
                onClick={ navigate(constants.USERS_URL,
                    { replace: true } ) }
                variant="themed">Servicios
            </Button>

            <Button
                onClick={ navigate(constants.USERS_URL,
                    { replace: true } ) }
                variant="themed">Métricas
            </Button>
        </Navbar>
    );
}

function MyRouter() {
    return (
            <Routes>
                <Route path="/" element={ <SignIn/> }> </Route>

                <Route exact path={ constants.SIGN_UP_URL }
                       element={ <SignUp/> }> </Route>

                <Route exact path={ constants.SIGN_UP_END_URL + "/:userId" }
                       element={ <SignUpEndWrapper/> }> </Route>

                <Route exact path={ constants.SIGN_IN_URL }
                       element={ <SignIn/> }> </Route>

                <Route exact path={ constants.FORGOT_PASSWORD_URL }
                       element={ <ForgotPassword/> }> </Route>

                <Route exact path={ constants.FORGOT_PASSWORD_URL + "/:userId" }
                       element={ <RecoverPassword/> }> </Route>

                <Route exact path={ constants.USERS_URL }
                       element={ <UsersList/> }> </Route>
            </Routes>
    );
}

function App () {
    return (
    <BrowserRouter>
        <MyNavbar/>

        <MyRouter/>
     </BrowserRouter>
    );
}

export default App;
