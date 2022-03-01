require('dotenv').config( {
  path: `.env.${process.env
                       .NODE_ENV}`
} );

/* Frontend paths */

/* Backend hosts */
const USERS_HOST = process.env
                          .REACT_APP_USERS_HOST;

/* Backends paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";

const JSON_HEADER = {
  'Content-Type': 'application/json'
}

module.exports = {
  USERS_HOST,
  SIGN_UP_URL,
  SIGN_IN_URL,
  JSON_HEADER
}