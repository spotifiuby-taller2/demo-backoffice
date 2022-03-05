const crypto = require('crypto');

function getSHAOf(toHash) {
  return crypto.createHmac('SHA256', toHash)
               .digest('hex');
}

module.exports = {
  getSHAOf
}