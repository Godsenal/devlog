const jwt = require('jsonwebtoken');

const secret = 'MYSECRETKEY';

function jwtlogin(userdata) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: userdata._id,
        username: userdata.username,
        nickname: userdata.nickname,
      },
      secret,
      {
        expiresIn: '7d',
      }, (err, token) => {
        if (err) reject(err);
        resolve({ userdata, token }); // resolve can't take multiple argument. So resolve object.
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
