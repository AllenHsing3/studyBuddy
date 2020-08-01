const mongoose = require('mongoose');
const config = require('config');

const connectDB = async (req, res) => {
   const db = config.get('mongoURI');
   try {
      await mongoose.connect(db, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

module.exports = connectDB;
