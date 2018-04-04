const mongoose = require('mongoose');

const { Schema } = mongoose;
/**
 * following: oid of another users
 * pins: oid of pinned posts
 */
const userSchema = new Schema({
  username: String,
  nickname: String,
  password: String,
  followings: [{ type: Schema.Types.ObjectId, ref: 'User' }], // mongoose populate api
  tags: [String],
  pins: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('User', userSchema);
