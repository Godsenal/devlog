const jwt = require('jsonwebtoken');

const config = require('../config');

function jwtlogin(userdata) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: userdata._id,
        username: userdata.username,
        nickname: userdata.nickname,
      },
      config.jwtSecret,
      {
        expiresIn: '7d',
      }, (err, token) => {
        if (err) reject(err);
        resolve({ userdata, token }); // resolve can't take multiple argument. So resolve object.
      });
  });
}

module.exports = {
  jwtlogin,
};
