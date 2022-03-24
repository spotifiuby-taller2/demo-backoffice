import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import { Profile } from "./profile/Profile";
import { ForgotPassword } from "./login/ForgotPassword";
const { RecoverPassword } = require('./login/RecoverPassword');
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');
const constants = require("./others/constants");

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

            <Route exact path={ constants.PROFILE_URL }
                   element={ <Profile/> }> </Route>

            <Route exact path={ constants.FORGOT_PASSWORD_URL }
                   element={ <ForgotPassword/> }> </Route>

            <Route exact path={ constants.FORGOT_PASSWORD_URL + "/:userId" }
                   element={ <RecoverPassword/> }> </Route>
        </Routes>
    );
}

function App () {
    return (
    <BrowserRouter>
         <MyRouter/>
     </BrowserRouter>
    );
}

export default App;
