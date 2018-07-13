const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const MomentSchema = new Schema({
  creator: {
    nickName: String,
    _id: String,
    avatarUrl: String,
  },
  group: {
    nickName: String,
    _id: String,
    avatarUrl: String,
  },
  content: String,
  images: {
    type: Array,
    default: [],
  },
  share: {
    type: Object,
    default: {},
  },
  crate_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Moment', MomentSchema);
