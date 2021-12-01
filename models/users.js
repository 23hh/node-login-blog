const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const usersSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
usersSchema.plugin(autoIncrement.plugin, {
  model: "Users",
  field: "userId",
  startAt: 1,
  Increment: 1
})

module.exports = mongoose.model('Users', usersSchema);