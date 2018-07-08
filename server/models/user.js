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
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
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
  followings: [{ type: Schema.Types.ObjectId, ref: 'User' }], // mongoose populate api
  tags: [{ type: Schema.Types.ObjectId, ref: 'tags' }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Log' }],
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

// validate requested field.
userSchema.statics.validateField = function(field, value) {
  return new Promise((resolve, reject) => {
    if (!value.match(VALID_REG[field])) {
      resolve({
        isValid: false,
        message: `${field} must be 6-15 length without any special character.`,
      });
      return;
    }
    this.findOne({ [field]: value }, (err, result) => {
      if (err) {
        reject(`Fail to validate ${field}. Try again.`);
        return;
      }
      if (result) {
        resolve({
          isValid: false,
          message: `Someone already use this ${field}.`,
        });
        return;
      }
      resolve({
        isValid: true,
        message: '',
      });
    });
  });
};
module.exports = mongoose.model('User', userSchema);
