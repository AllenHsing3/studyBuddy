const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: {
      required: true,
      type: String,
   },
   email: {
      required: true,
      type: String,
      unique: true,
   },
   password: {
      require: true,
      type: String,
   },
});

module.exports = User = mongoose.model('user', UserSchema);
