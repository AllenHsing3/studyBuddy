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
   decks: [
      {
         deckName: {
            type: String,
            required: true,
         },
         flashCard: [
            {
               front: {
                  type: String,
                  required: true,
               },
               back: {
                  type: String,
                  required: true,
               },
               markedForDeletion: Boolean,
            },
         ],
      },
   ],
});

module.exports = User = mongoose.model('user', UserSchema);