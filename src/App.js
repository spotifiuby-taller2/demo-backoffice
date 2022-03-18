import React from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import {Profile} from "./profile/Profile";
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');
const constants = require("./others/constants");

function MyRouter() {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={ <SignIn/> }> </Route>

            <Route exact path={ constants.SIGN_UP_URL }
                   element={ <SignUp navigate={navigate}/> }> </Route>

            <Route exact path={ constants.SIGN_UP_END_URL + "/:userId" }
                   element={ <SignUpEndWrapper/> }> </Route>

            <Route exact path={ constants.SIGN_IN_URL }
                   element={ <SignIn navigate={navigate}/> }> </Route>

            <Route exact path={ constants.PROFILE_URL }
                   element={ <Profile navigate={navigate}/> }> </Route>
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
