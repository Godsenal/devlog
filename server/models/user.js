const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT_ROUND = 10; // hashing round
const VALID_REG = {
  username: '^[a-z0-9_]{6,15}$',
  password: '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
  nickname: '^[a-zA-Z0-9_]{6,15}$',
};
/**
 * following: oid of another users
 * pins: oid of pinned posts
 */
const userSchema = new Schema({
  nickname: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  followings: [{ type: Schema.Types.ObjectId, ref: 'users' }], // mongoose populate api
  tags: [{ type: Schema.Types.ObjectId, ref: 'tags' }],
  pins: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
});
/*
  hashing password before save.
*/
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.password.match(VALID_REG.password)) {
    return next('Invalid Password');
  }

  if (!user.nickname.match(VALID_REG.nickname)) {
    return next('Invalid Nickname');
  }
  // only hash the password if it has been modfiied or new
  if (!user.isModified('password')) {
    return next('Invalid Password');
  }
  /* use constructor to call static function inside model */
  user.constructor.validateUsername(user.username)
    .then(() => {
      bcrypt.genSalt(SALT_ROUND, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) return next(error);
          user.password = hash;
          return next(null, user);
        });
      });
    })
    .catch((err) => next(err));
});
/*
  Custom method for userSchema.
*/

// compare hashed password.
userSchema.methods.comparePassword = function(password) {
  /*
    password - typing password.
    this.password - password from User Schema
  */
  return bcrypt.compareSync(password, this.password);
};

// validate requested username.
userSchema.statics.validateUsername = function(username) {
  return new Promise((resolve, reject) => {
    if (!username.match(VALID_REG.username)) {
      reject('Username must be 6-15 length without any special character.');
      return;
    }
    this.findOne({ username }, (err, result) => {
      if (err) {
        reject('Fail to validate username. Try again.');
        return;
      }
      if (result) {
        reject('Someone already use this name.');
        return;
      }
      resolve('Good username!');
    });
  });
};
module.exports = mongoose.model('User', userSchema);
