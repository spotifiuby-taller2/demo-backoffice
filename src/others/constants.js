require('dotenv').config();

/* Frontend paths */

/* Backend hosts */
const USERS_HOST = process.env
                          .REACT_APP_USERS_HOST;

/* Backends paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";
const SIGN_UP_END_URL = SIGN_UP_URL + "/end";
const USER_URL = "/user";
const PROFILE_URL = USER_URL + "/profile";

const JSON_HEADER = {
  'Content-Type': 'application/json'
}

module.exports = {
  USERS_HOST,
  SIGN_UP_URL,
  SIGN_IN_URL,
  JSON_HEADER,
  SIGN_UP_END_URL,
  PROFILE_URL
}
