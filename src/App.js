import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<Login/>}>
           </Route>
         </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
