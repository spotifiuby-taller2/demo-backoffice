require('dotenv').config();

/* Frontend paths */

/* Backend hosts */
const USERS_HOST = process.env
                          .REACT_APP_USERS_HOST;

const SERVICES_HOST = process.env
                             .REACT_APP_SERVICES_HOST;


/* Paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";
const SIGN_UP_END_URL = SIGN_UP_URL + "/end";
const FORGOT_PASSWORD_URL = "/forgotpassword";
const USERS_URL = "/users";
const SERVICES_URL = "/services";

const API_KEY_URL = "/apikeys";
const API_KEY_DOWN_URL = API_KEY_URL + "/down";
const API_KEY_UP_URL = API_KEY_URL + "/up";
const API_KEY_QUERY_PARAM = "apiKey=";

const JSON_HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

/* ====== Production vs Development config ====== */
const isDevelopment = process.env
                             .REACT_APP_PRODUCTION === "false";

let firebaseConfig;

if (isDevelopment) {
  firebaseConfig = {
    apiKey: "AIzaSyDlFbw1n3eqg7ogdwGuiTetV6isK4Uhqno",
    authDomain: "fir-firebase-acc6b.firebaseapp.com",
    projectId: "fir-firebase-acc6b",
    storageBucket: "fir-firebase-acc6b.appspot.com",
    messagingSenderId: "296878360901",
    appId: "1:296878360901:web:7987ce42ec0a406b1f162c"
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyCnDa9J7DKKtNv5crxZ4NrRGcW5c7nZTAg",
    authDomain: "fir-firebase-2-9eb22.firebaseapp.com",
    projectId: "fir-firebase-2-9eb22",
    storageBucket: "fir-firebase-2-9eb22.appspot.com",
    messagingSenderId: "701624425016",
    appId: "1:701624425016:web:6cb2157c5a2c0a34e1a4cd"
  };
}

const PASSWORD_MIN_LEN = 10;

const FIREBASE_ISSUES = false;

const MY_API_KEY = "645d293cdffe45a8674aa17b58157181a1a3127c3db705d9021307b678e7856b";

module.exports = {
  USERS_HOST,
  SIGN_UP_URL,
  SIGN_IN_URL,
  JSON_HEADER,
  SIGN_UP_END_URL,
  FORGOT_PASSWORD_URL,
  USERS_URL,
  isDevelopment,
  firebaseConfig,
  PASSWORD_MIN_LEN,
  FIREBASE_ISSUES,
  SERVICES_URL,
  SERVICES_HOST,
  MY_API_KEY,
  API_KEY_DOWN_URL,
  API_KEY_QUERY_PARAM,
  API_KEY_UP_URL
}
