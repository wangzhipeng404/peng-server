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
  create_time: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Moment', MomentSchema);
