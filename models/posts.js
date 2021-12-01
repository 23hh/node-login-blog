const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const { Schema } = mongoose;
const postsSchema = new Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
  },
  content: {
    type: String,
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