const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nickName: String,
  avatarUrl: String,
  country: String,
  province: String,
  city: String,
  language: String,
  gender: Number,
  openid: String,
  create_time: {
    type: Date,
    default: Date.now,
  },
  friends: [String],
  groups: [String],
});

module.exports = mongoose.model('User', UserSchema);
