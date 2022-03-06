import constants from "./constants";

const crypto = require('crypto');

function getSHAOf(toHash) {
  return crypto.createHmac('SHA256', toHash)
               .digest('hex');
}

const postTo = (url, body, f) => {
  // response.json() is a promise
  fetch(url, {
        method: "POST",
        headers: constants.JSON_HEADER,
        body: JSON.stringify(body)
      }
  ).then(response => response.json()
  ).then(f);
}

const getTo = (url, f) => {
  fetch(url, {
        method: "GET",
        headers: constants.JSON_HEADER,
      }
  ).then(response => response.json()
  ).then(f);
}

export {
  getTo,
  getSHAOf
}