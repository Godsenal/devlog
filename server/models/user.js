const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT_ROUND = 10; // hashing round
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
  followings: [{ type: Schema.Types.ObjectId, ref: 'User' }], // mongoose populate api
  tags: [String],
  pins: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});
/*
  hashing password before save.
*/
userSchema.pre('save', function(next) {
  const user = this;
  // only hash the password if it has been modfiied or new
  if (!user.isModified('password')) {
    return next;
  }
  return bcrypt.genSalt(SALT_ROUND, (err, salt) => {
    if (err) return next(err);
    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      return next();
    });
  });
});
/*
  Custom method for userSchema.
  compare hashed password.
*/

userSchema.methods.comparePassword = function(password) {
  /*
    password - typing password.
    this.password - password from User Schema
  */
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
