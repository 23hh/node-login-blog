var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const { Schema } = mongoose;
const postsSchema = new Schema({
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

postsSchema.plugin(autoIncrement.plugin, "postId");
module.exports = mongoose.model('Posts', postsSchema);