const mongoose = requiser("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  }, 
  email: {
    tupe: String, 
    required: true
  }, 
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', UserSchema); 

module.exports = User;