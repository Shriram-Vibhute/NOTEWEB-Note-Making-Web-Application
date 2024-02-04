const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'note'
  }, 
  // user -> note.user is a foregion key which connets both user and his/her notes ->
  // Why we are created this -> The user only have access of his/her notes not others
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now // Dont call this function like -> Date.now()
  }
});

module.exports = mongoose.model('note', UserSchema);
// Arguments -> 1st arg : Name of model | 2nd arg : Name of schema