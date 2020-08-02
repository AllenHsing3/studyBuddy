const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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

module.exports = Profile = mongoose.model('profile', ProfileSchema);
