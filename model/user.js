const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  openid: String,
  crate_time: {
    type: Date,
    default: Date.now,
  },
  friends: [String],
  groups: [String],
});

module.exports = mongoose.model('User', UserSchema);
