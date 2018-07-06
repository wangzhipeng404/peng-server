const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: String,
  _id: String,
  crate_time: {
    type: Date,
    default: Date.now,
  },
  members: [],
});

module.exports = mongoose.model('Group', GroupSchema);
