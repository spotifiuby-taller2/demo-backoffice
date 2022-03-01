const crypto = require('crypto');

function getHashOf(toHash) {
  return crypto.createHmac('SHA256', toHash)
               .digest('hex');
}

export {
  getHashOf
}
