const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  nickName: String,
  avatarUrl: String,
  intro: String,
  creator: String,
  create_time: {
    type: Date,
    default: Date.now,
  },
  members: [],
});

module.exports = mongoose.model('Group', GroupSchema);
