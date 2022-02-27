import React, { Component } from 'react';
import { signUpUrl } from "./others/constants";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/signin/SignIn';
import { SignUp } from './components/signin/SignUp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<SignIn/>}> </Route>
           <Route exact path={ signUpUrl } element={<SignUp/>}> </Route>
         </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
