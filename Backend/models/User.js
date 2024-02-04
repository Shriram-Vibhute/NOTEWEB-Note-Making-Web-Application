const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true // cheak require
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // Dont call this function like -> Date.now()
  }
});

module.exports = mongoose.model('user', UserSchema);
// Arguments -> 1st arg : Name of model | 2nd arg : Name of schema