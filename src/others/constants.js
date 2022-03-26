require('dotenv').config();

/* Frontend paths */

/* Backend hosts */
const USERS_HOST = process.env
                          .REACT_APP_USERS_HOST;

/* Paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";
const SIGN_UP_END_URL = SIGN_UP_URL + "/end";
const FORGOT_PASSWORD_URL = "/forgotpassword";
const USERS_URL = "/users";

const JSON_HEADER = {
  'Content-Type': 'application/json'
}

/* ====== Production vs Development config ====== */
const isDevelopment = process.env
                             .PRODUCTION === undefined;

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
  PASSWORD_MIN_LEN
}
