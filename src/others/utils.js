const crypto = require('crypto');

export function getHashOf(toHash) {
  return crypto.createHmac('SHA256', toHash)
               .digest('hex');
}
