import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');
// const { SignUpEnd } = require('./login/SignUpEnd');
const constants = require("./others/constants");

class App extends Component {
  render() {
    return (
     <BrowserRouter>
         <Routes>
           <Route path="/" element={ <SignIn/> }> </Route>
             <Route exact path={ constants.SIGN_UP_URL } element={ <SignUp/> }> </Route>

             <Route exact path={ constants.SIGN_UP_END_URL + "/:userId" } element={ <SignUpEndWrapper/> }> </Route>

             <Route exact path={ constants.SIGN_IN_URL } element={ <SignIn/> }> </Route>
         </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
