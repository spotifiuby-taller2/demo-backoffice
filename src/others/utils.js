import constants from "./constants";

import sjcl from 'sjcl';

function getSHAOf(toHash) {
    const myBitArray = sjcl.hash.sha256.hash(toHash)
    return sjcl.codec.hex.fromBits(myBitArray);
}

// response.json() is a promise
const postToGateway = (body) => {
  body.apiKey = constants.MY_API_KEY;

  return fetch(constants.SERVICES_HOST + constants.CHECK_URL, {
        method: "POST",
        headers: constants.JSON_HEADER,
        body: JSON.stringify(body)
      }
  ).then(async r => {
       const gatewayResponse = await r.json();

       if (gatewayResponse.error !== undefined) {
           return gatewayResponse.error;
       }

      return await fetch(body.redirectTo, {
              method: "POST",
              headers: constants.JSON_HEADER,
              body: JSON.stringify(body)
          } )
             .then(async response => {
                 return await response.json();
             }).catch(err => {
                     return {
                         error: err.toString()
                     }
                 } );
  } ).catch(error => {
      return {
          error: error.toString()
      };
  } );
}

const getToGateway = (destiny,
                      redirectParams) => {
    const body = {}
    body.apiKey = constants.MY_API_KEY;

    const redirectParamsAux = redirectParams !== undefined ? redirectParams
                                                           : "";
    const redirectTo = destiny + redirectParamsAux;

    return fetch(constants.SERVICES_HOST + constants.CHECK_URL, {
            method: "POST",
            headers: constants.JSON_HEADER,
            body: JSON.stringify(body)
        }
    ).then(async r => {
        const gatewayResponse = await r.json();

        if (gatewayResponse.error !== undefined) {
            return gatewayResponse.error;
        }

        return await fetch(redirectTo, {
            method: "GET",
            headers: constants.JSON_HEADER
        } )
            .then(async response => {
                return await response.json();
            }).catch(err => {
                return {
                    error: err.toString()
                }
            } );
    } ).catch(error => {
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
  postToGateway,
  getFormatedDate,
  getToGateway
}