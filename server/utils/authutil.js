const jwt = require('jsonwebtoken');

const secret = 'MYSECRETKEY';

function jwtlogin(_id, username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id,
        username,
      },
      secret,
      {
        expiresIn: '7d',
      }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
  });
}
function jwtverify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
  });
}

module.exports = {
  jwtlogin,
  jwtverify,
};
