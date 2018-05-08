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
const tagSchema = new Schema({
  name: String,
  count: Number,
  description: String,
});

module.exports = mongoose.model('Tag', tagSchema);
