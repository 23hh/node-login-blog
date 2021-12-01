const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const { Schema } = mongoose;
const commentsSchema = new Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  conmment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});
commentsSchema.plugin(autoIncrement.plugin, {
  model: "comments",
  field: "conmmentId",
  startAt: 1,
  Increment: 1
})

module.exports = mongoose.model('Comment', commentsSchema);