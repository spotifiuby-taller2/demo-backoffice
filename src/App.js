import React, {useMemo, useState} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import {ForgotPassword} from "./login/ForgotPassword";
import {UsersList} from "./home/UsersList";
import {Button, IconButton, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {Services} from "./home/Services";
import {Contents} from "./home/Contents";
import "./style/HomePageRoutes.css";
import {AuthContext, useContext} from "./services/AuthContext";
import {getFormatedDate} from "./others/utils";
import {RedirectToMetrics} from "./home/RedirectToMetrics";
import {UserProfile} from "./home/UserProfile";

const constants = require("./others/constants");
const {RecoverPassword} = require('./login/RecoverPassword');
const {SignIn} = require('./login/SignIn');
const {SignUp} = require('./login/SignUp');

function NavBar(props) {
  const navigate = useNavigate();
  const {removeToken} = useContext();
  const [focuses1, setFocuses1] = useState(true);
  const [focuses2, setFocuses2] = useState(false);
  const [focuses3, setFocuses3] = useState(false);
  const [focuses4, setFocuses4] = useState(false);
  const [focuses5, setFocuses5] = useState(false);
  const [focuses6, setFocuses6] = useState(false);

  const focus1 = () => {
    setFocuses1(true);
    setFocuses2(false);
    setFocuses3(false);
    setFocuses4(false);
    setFocuses5(false);
    setFocuses6(false);
  }

  const focus2 = () => {
    setFocuses1(false);
    setFocuses2(true);
    setFocuses3(false);
    setFocuses4(false);
    setFocuses5(false);
    setFocuses6(false);
  }

  const focus3 = () => {
    setFocuses1(false);
    setFocuses2(false);
    setFocuses3(true);
    setFocuses4(false);
    setFocuses5(false);
    setFocuses6(false);
  }

  const focus4 = () => {
    setFocuses1(false);
    setFocuses2(false);
    setFocuses3(false);
    setFocuses4(true);
    setFocuses5(false);
    setFocuses6(false);
  }

  const focus5 = () => {
    setFocuses1(true);
    setFocuses2(false);
    setFocuses3(false);
    setFocuses4(false);
    setFocuses5(true);
    setFocuses6(false);
  }

  const focus6 = () => {
    setFocuses1(false);
    setFocuses2(false);
    setFocuses3(false);
    setFocuses4(false);
    setFocuses5(false);
    setFocuses6(true);
  }

  const redirectUsersLists = () => navigate(constants.USERS_URL);

  const redirectMetrics = () => navigate(constants.METRICS_URL);

  const redirectServices = () => navigate(constants.SERVICES_URL);

  const redirectContent = () => navigate(constants.CONTENT_URL);

  const closeSession = () => removeToken()

  return (
    <nav className="container" style={{background: '#607D8B'}}>
      <div className="links" style={{color: 'white', flexDirection: 'row'}}>
        <Button className="homepage"
                onClick={redirectUsersLists}
                variant="themed"
                style={{color: focuses1 ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus1()}
        >Usuarios</Button>

        <Button className="homepage"
                onClick={redirectServices}
                variant="themed"
                style={{color: focuses2 ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus2()}
        >Servicios</Button>

        <Button className="homepage"
                variant="themed"
                style={{color: focuses3 ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus3()}
        >Transacciones</Button>

        <Button className="homepage"
                variant="themed"
                onClick={redirectContent}
                style={{color: focuses4 ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus4()}
        >Contenidos</Button>

        <Button className="homepage"
                variant="themed"
                style={{color: focuses5 ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus5()}
                onClick={redirectMetrics}
        >Métricas</Button>

        <Typography className="homepage"
                    style={{color: '#607D8B'}}
        ></Typography>

        <IconButton component="span"
                    className="homepage"
                    style={{color: focuses6 ? 'black' : 'white', verticalAlign:'top', marginLeft:250}}
                    onFocus={() => focus6()}
                    onClick={closeSession}>
          <LogoutIcon/>
        </IconButton>
      </div>
    </nav>
  );
}

function NotLoggedRouter(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn/>}> </Route>

        <Route exact path={constants.SIGN_UP_URL}
               element={<SignUp/>}> </Route>

        <Route exact path={constants.SIGN_UP_END_URL + "/:userId/:pin"}
               element={<SignUpEndWrapper/>}> </Route>

        <Route exact path={constants.SIGN_IN_URL}
               element={<SignIn/>}> </Route>

        <Route exact path={constants.FORGOT_PASSWORD_URL}
               element={<ForgotPassword/>}> </Route>

        <Route exact path={constants.FORGOT_PASSWORD_URL + "/:userId"}
               element={<RecoverPassword/>}> </Route>

        {/* Redirect */}
        <Route exact path={constants.USERS_URL}
               element={<SignIn/>}> </Route>

        <Route exact path={constants.SERVICES_URL}
               element={<SignIn/>}> </Route>
      </Routes>
    </div>
  );
}

function LoggedRouter(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UsersList/>}> </Route>
        <Route exact path={constants.USERS_URL} element={<UsersList/>}> </Route>
        <Route exact path={constants.SERVICES_URL} element={<Services/>}> </Route>
        <Route exact path={constants.METRICS_URL} element={<RedirectToMetrics/>}/>
        <Route exact path={constants.CONTENT_URL} element={<Contents/>}> </Route>
        <Route exact path={constants.PROFILE_URL + "/:userId"} element={<UserProfile/>}/>
      </Routes>
    </div>
  );
}

function DisplayApp() {
  const {
    isValidToken,
    checkIsValidToken
  } = useContext();

  return (
    <>
      {
        (checkIsValidToken() && isValidToken) ? (
          <BrowserRouter>
            <NavBar>
            </NavBar>

            <LoggedRouter>
            </LoggedRouter>
          </BrowserRouter>
        ) : (
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

  const context = useMemo(() => {
    return ({
      isValidToken,

      removeToken: () => {
        localStorage.removeItem('spoti-token');

        localStorage.removeItem('token-time');

        localStorage.removeItem('token-date')

        setIsValidToken(false);
      },

      checkIsValidToken: () => {
        const now = new Date();
        const tokenTime = parseInt(localStorage.getItem('token-time'));
        const tokenDate = localStorage.getItem('token-date');

        if (getFormatedDate(now) !== tokenDate
          || now.getTime()
            .toString() - tokenTime > constants.ONE_HOUR_DIFFERENCE) {
          return false;
        }

        return localStorage.getItem('spoti-token') !== "";
      },

      saveToken: (token) => {
        localStorage.setItem('spoti-token', token);

        const now = new Date();

        localStorage.setItem('token-time', now.getTime()
          .toString());

        localStorage.setItem('token-date', getFormatedDate(now));

        setIsValidToken(false);
        setIsValidToken(true);
      }
    });
  }, [isValidToken, setIsValidToken]);

  return (
    <AuthContext.Provider value={context}>
      <DisplayApp>
      </DisplayApp>
    </AuthContext.Provider>
  )
}

export default App;
