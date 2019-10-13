const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: {
    hash: String,
    salt: String,
    keyLength: Number,
    hashMethod: String,
    iterations: Number,
  },
  OTP: String,
  role: { type: String, default: 'user' },
});

module.exports = mongoose.model('User', UserSchema);
