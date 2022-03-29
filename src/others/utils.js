import constants from "./constants";

import sjcl from 'sjcl';

function getSHAOf(toHash) {
    const myBitArray = sjcl.hash.sha256.hash(toHash)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    return myHash;
}


const postTo = (url, body) => {
  fetch(url, {
        method: "POST",
        headers: constants.JSON_HEADER,
        body: JSON.stringify(body)
      }
  ).catch(error => {
      return {
          error: error.toString()
      };
  } );
}

const getTo = (url, f) => {
  fetch(url, {
        method: "GET",
        headers: constants.JSON_HEADER,
      }
  ).then(response => response.json()
  ).then(response => f(response));
}

function areAnyUndefined(list) {
    return list.filter( (element) => {
        return element === undefined
            || element.length === 0
    } ).length > 0;
}

export {
  getTo,
  getSHAOf,
  areAnyUndefined,
  postTo
}