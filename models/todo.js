/*eslint-disable*/
const mongoose = require('mongoose');
var moment = require('moment');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }, 
  date: {
    type: String
  }, 
  link: {
    type: String
  }
});

module.exports = mongoose.model('Todo', todoSchema);