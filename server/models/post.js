const mongoose = require('mongoose');

const { Schema } = mongoose;
/**
 * md: markdown
 * text: pure text
 * author: post author
 * created: date
 * tags: array of tag
 * star: number of star
 */
const postSchema = new Schema({
  md: String,
  text: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  tags: [String],
  star: Number,
});

module.exports = mongoose.model('Post', postSchema);
