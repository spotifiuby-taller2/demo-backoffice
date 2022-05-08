import constants from "./constants";

import sjcl from 'sjcl';

function getSHAOf(toHash) {
    const myBitArray = sjcl.hash.sha256.hash(toHash)
    return sjcl.codec.hex.fromBits(myBitArray);
}

// response.json() is a promise
const postTo = (body,
                url) => {
  return fetch(url, {
        method: "POST",
        headers: constants.JSON_HEADER,
        body: JSON.stringify(body)
      }
  ).then(response =>
          response.json()
  ).catch(error => {
      return {
          error: error.toString()
      };
  } );
}

const getTo = (url) => {
    return fetch(url, {
            method: "GET",
            headers: constants.JSON_HEADER
        }
    ).then(response =>
        response.json()
    ).catch(error => {
        return {
            error: error.toString()
        };
    } );
}

function getFormatedDate(dateNow) {
    return dateNow.getDate() + "/"
        + parseInt(dateNow.getMonth() + 1)
        + "/"
        + dateNow.getFullYear();
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
  postTo,
  getFormatedDate
}