import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const { SignIn } = require('./login/SignIn');
const { SignUp } = require('./login/SignUp');
const { SignUpEnd } = require('./login/SignUpEnd');
const { SIGN_UP_URL, SIGN_UP_END_URL } = require("./others/constants");

class App extends Component {
  render() {
    return (
     <BrowserRouter>
         <Routes>
           <Route path="/" element={ <SignIn/> }> </Route>
           <Route exact path={ SIGN_UP_URL } element={ <SignUp/> }> </Route>
           <Route exact path={ SIGN_UP_END_URL + "/:userId" } element={ <SignUpEnd/> }> </Route>
         </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
