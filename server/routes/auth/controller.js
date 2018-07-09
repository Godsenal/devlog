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
      imageUrl: userdata.imageUrl,
      tags: userdata.tags,
      followings: userdata.followings,
      bookmarks: userdata.bookmarks,
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
  const { username, password, nickname, imageUrl } = req.body;
  const user = new User({
    username,
    password,
    nickname,
    imageUrl,
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
  const { decoded } = req;
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
    imageUrl: user.imageUrl,
    tags: user.tags,
    followings: user.followings,
    bookmarks: user.bookmarks,
  });
  const error = (err) => res.status(403).json({ error: err });
  return User.findOne({ username: decoded.username }).exec()
    .then(check)
    .then(success)
    .catch(error);
};

exports.validate_post = (req, res) => {
  const { field, value } = req.body;

  const success = ({ isValid, message }) => res.json({
    isValid,
    message,
  });
  const error = (message) => res.status(403).json({ message });
  User.validateField(field, value)
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
