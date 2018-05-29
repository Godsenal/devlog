const mongoose = require('mongoose');

const { Schema } = mongoose;
/**
 * text: plain text
 * content: Draft content Object
 * code_type: 'Editor or Frame'
 * code: code text
 * language: code language
 * frame_src: src of iframe
 * frame_type: jsfiddle or ...
 * author_id: ObjectId of author
 * author_nickname: nickname of author
 * created: date
 * tags: array of tag
 * star: number of star
 */
const logSchema = new Schema({
  text: String,
  content: Object,
  has_code: { type: Boolean, defalut: false },
  code_type: String,
  code: String,
  language: String,
  frame_src: String,
  frame_type: String,
  author_id: { type: Schema.Types.ObjectId, ref: 'User' },
  author_nickname: String,
  created: { type: Date, default: Date.now },
  tags: [String],
  star: Number,
});

module.exports = mongoose.model('Log', logSchema);
