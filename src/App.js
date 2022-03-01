import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const { SignIn } = require('./components/login/SignIn');
const { SignUp } = require('./components/login/SignUp');
const { SIGN_UP_URL } = require("./others/constants");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<SignIn/>}> </Route>
           <Route exact path={ SIGN_UP_URL } element={<SignUp/>}> </Route>
         </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
