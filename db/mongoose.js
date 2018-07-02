const mongoose = require('mongoose');
// const DB_URL = 'mongodb://localhost:27017/peng';
const DB_URL = require('../dbconfig');

mongoose.connect(DB_URL);

mongoose
  .connection
  .on('connected', () => {
    console.log('Mongoose connection open to ' + DB_URL);
  });

mongoose
  .connection
  .on('error', err => {
    console.log('Mongoose connection error: ' + err);
  });

mongoose
  .connection
  .on('disconnected', () => {
    console.log('Mongoose connection disconnected');
  });

module.exports = mongoose;
