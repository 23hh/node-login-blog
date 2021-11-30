const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  nickname: String,
  title: String,
  comment: String,
  date: String,
});
CommentSchema.virtual('Id').get(function () {
  return this._id.toHexString();
});
CommentSchema.set('toJSON', {
  virtuals: true,
});
module.exports = mongoose.model('Comment', CommentSchema);