const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  creator: {
    nickName: String,
    _id: String,
    avatarUrl: String,
  },
  moment_id: String,
  content: {
    text: String,
    images: {
      type: Array,
      defualt: [],
    }
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
