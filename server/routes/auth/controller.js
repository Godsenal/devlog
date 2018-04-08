const User = require('../../models/user');

const authutil = require('../../utils/authutil'); // jwt verification util functions.

exports.login_post = (req, res) => {
  const { username, password } = req.body;
  /*
    check length .. special character..
  */
  // check password and create token
  const check = (userdata) => {
    if (!userdata) {
      throw new Error('Incorrect ID or Password.');
    }
    else if (userdata.comparePassword(password)) {
      return authutil.jwtlogin(userdata._id, userdata.username);
    }
    throw new Error('Incorrect ID or Password.');
  };
  // response created token
  const success = (decoded) => res.json({ token: decoded, isValid: true });
  // send error message
  const error = (err) => res.json({ err });
  // promise chainning.
  User.findOne({ username }).exec()
    .then(check)
    .then(success)
    .catch(error);
};

exports.signup_post = (req, res) => {
  const { username, password, nickname } = req.body;
  const user = new User({
    username,
    password,
    nickname,
  });
  user.save((err, userdata) => {
    if (err) {
      // handle error
    }
    res.json(userdata);
  });
};

exports.verify_get = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  if (!token) {
    return res.status(403).json({
      // handle error
    });
  }
  const success = (decoded) => res.json({ token: decoded });
  const error = (err) => res.status(403).json({ error: err });
  return authutil.jwtverify(token)
    .then(success)
    .catch(error);
};

exports.pins_put = function pins_put(req, res) {
  res.json({

  });
};

exports.followings_put = function followings_put(req, res) {
  res.json({

  });
};
