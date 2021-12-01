const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const { Schema } = mongoose;
const postsSchema = new Schema({
  postId: {
    type: Number,
    unique: true,
  },
  userId: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});

postsSchema.plugin(autoIncrement.plugin, {
  model: "Posts",
  field: "postId",
  startAt: 1,
  Increment: 1
})
module.exports = mongoose.model('Posts', postsSchema);