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
      // throw new Error will return { name: Error, message: 'Incorrect ...'}
      throw new Error('Incorrect Username or Password.');
    }
    else if (userdata.comparePassword(password)) {
      return authutil.jwtlogin(userdata);
    }
    throw new Error('Incorrect Username or Password.');
  };
  /*
    response created token.
    Use object destructing for multiple argument of resolve.
  */
  const success = ({ userdata, token }) => (
    res.json({
      token,
      _id: userdata._id,
      username: userdata.username,
      nickname: userdata.nickname,
    })
  );
  // send error message. Anauthorized
  const error = (err) => res.status(401).json({ error: err.message });
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
      return res.status(401).json({
        error: err,
      });
    }
    return res.json({
      username: userdata.username,
      nickname: userdata.nickname,
    });
  });
};

exports.verify_get = (req, res) => {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'INVALID STATUS',
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      error: 'INVALID STATUS',
    });
  }
  const checkUser = (decoded) => User.findOne({ username: decoded.username }).exec();
  const check = (user, err) => {
    if (err) {
      throw new Error('Cannot find user');
    }
    return user;
  };
  const success = (user) => res.json({
    _id: user._id,
    username: user.username,
    nickname: user.nickname,
  });
  const error = (err) => res.status(403).json({ error: err });
  return authutil.jwtverify(token)
    .then(checkUser)
    .then(check)
    .then(success)
    .catch(error);
};

exports.validate_post = (req, res) => {
  const { username } = req.body;

  const success = (message) => res.json({
    message,
  });
  const error = (message) => res.status(403).json({ message });
  User.validateUsername(username)
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
