require('dotenv').config();

/* Frontend paths */

/* Backend hosts */
const BACK_HOST = process.env
                          .REACT_APP_BACK_HOST;

/* Paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";
const SIGN_UP_END_URL = SIGN_UP_URL + "/end";
const FORGOT_PASSWORD_URL = "/forgotpassword";
const RESTAURANTS_URL = "/restaurants";
const RESTAURANT_URL = "/restaurant";
const PLATES_URL = "/plates";
const RESTAURANTS_LIST_URL = RESTAURANTS_URL + "/list";
const RESTAURANTS_NEW_URL = RESTAURANTS_URL + "/new";

const JSON_HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

/* ====== Production vs Development config ====== */
const isDevelopment = process.env
                             .REACT_APP_PRODUCTION === "false";

const PASSWORD_MIN_LEN = 10;

const FIREBASE_ISSUES = false;

const ONE_HOUR_DIFFERENCE = 3600000;

module.exports = {
  BACK_HOST,
  SIGN_UP_URL,
  SIGN_IN_URL,
  JSON_HEADER,
  SIGN_UP_END_URL,
  FORGOT_PASSWORD_URL,
  isDevelopment,
  PASSWORD_MIN_LEN,
  FIREBASE_ISSUES,
  ONE_HOUR_DIFFERENCE,
  RESTAURANTS_NEW_URL,
  RESTAURANTS_LIST_URL,
  RESTAURANT_URL,
  PLATES_URL
}
