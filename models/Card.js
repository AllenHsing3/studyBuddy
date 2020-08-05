const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   categoryName: {
      type: String,
      required: true,
   },
   cards: [
      {
         front: {
            type: String,
            required: true,
         },
         back: {
            type: String,
            required: true,
         },
         markedForDeletion: {
            type: Boolean,
            default: false,
         },
      },
   ],
});

module.exports = Card = mongoose.model('card', CardSchema);
