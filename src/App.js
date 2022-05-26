import React, {useEffect, useMemo, useState} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import SignUpEndWrapper from "./login/SignUpEndWrapper";
import {ForgotPassword} from "./login/ForgotPassword";
import {UsersList} from "./home/UsersList";
import {Button, IconButton} from "@mui/material";
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

  const {focus1, isFocus1,
    focus2, isFocus2,
    focus3, isFocus3,
    focus4, isFocus4,
    focus5, isFocus5,
    focus6, isFocus6,
    removeToken} = useContext();

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
                style={{color: isFocus1() ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus1()}
        >Usuarios</Button>

        <Button className="homepage"
                onClick={redirectServices}
                variant="themed"
                style={{color: isFocus2() ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus2()}
        >Servicios</Button>

        <Button className="homepage"
                variant="themed"
                style={{color: isFocus3() ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus3()}
        >Transacciones</Button>

        <Button className="homepage"
                variant="themed"
                onClick={redirectContent}
                style={{color: isFocus4() ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus4()}
        >Contenidos</Button>

        <Button className="homepage"
                variant="themed"
                style={{color: isFocus5() ? 'black' : '', verticalAlign:'top'}}
                onFocus={() => focus5()}
                onClick={redirectMetrics}
        >Métricas</Button>

        { /* <Typography className="homepage"
                    style={{color: '#607D8B'}}
        ></Typography> */ }

        <IconButton component="span"
                    className="homepage"
                    style={{color: isFocus6() ? 'black' : 'white', verticalAlign:'top', marginLeft:250}}
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

      isFocus1: () => {
        return localStorage.getItem('focus1') === "true";
      },

      isFocus2: () => {
        return localStorage.getItem('focus2') === "true";
      },

      isFocus3: () => {
        return localStorage.getItem('focus3') === "true";
      },

      isFocus4: () => {
        return localStorage.getItem('focus4') === "true";
      },

      isFocus5: () => {
        return localStorage.getItem('focus5') === "true";
      },

      isFocus6: () => {
        return localStorage.getItem('focus6') === "true";
      },

      focus1: () => {
        localStorage.setItem('focus1', "true");
        localStorage.setItem('focus2', "false");
        localStorage.setItem('focus3', "false");
        localStorage.setItem('focus4', "false");
        localStorage.setItem('focus5', "false");
        localStorage.setItem('focus6', "false");
      },

      focus2: () => {
        localStorage.setItem('focus1', "false");
        localStorage.setItem('focus2', "true");
        localStorage.setItem('focus3', "false");
        localStorage.setItem('focus4', "false");
        localStorage.setItem('focus5', "false");
        localStorage.setItem('focus6', "false");
      },

      focus3: () => {
        localStorage.setItem('focus1', "false");
        localStorage.setItem('focus2', "false");
        localStorage.setItem('focus3', "true");
        localStorage.setItem('focus4', "false");
        localStorage.setItem('focus5', "false");
        localStorage.setItem('focus6', "false");
      },

      focus4: () => {
        localStorage.setItem('focus1', "false");
        localStorage.setItem('focus2', "false");
        localStorage.setItem('focus3', "false");
        localStorage.setItem('focus4', "true");
        localStorage.setItem('focus5', "false");
        localStorage.setItem('focus6', "false");
      },

      focus5: () => {
        localStorage.setItem('focus1', "false");
        localStorage.setItem('focus2', "false");
        localStorage.setItem('focus3', "false");
        localStorage.setItem('focus4', "false");
        localStorage.setItem('focus5', "true");
        localStorage.setItem('focus6', "false");
      },

      focus6: () => {
        localStorage.setItem('focus1', "true");
        localStorage.setItem('focus2', "false");
        localStorage.setItem('focus3', "false");
        localStorage.setItem('focus4', "false");
        localStorage.setItem('focus5', "false");
        localStorage.setItem('focus6', "false");
      },

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
  }, [isValidToken,
      setIsValidToken]);

  useEffect( () => {
  }, [] );

  return (
    <AuthContext.Provider value={context}>
      <DisplayApp>
      </DisplayApp>
    </AuthContext.Provider>
  )
}

export default App;
