const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

// @route    Post user/register
// @desc     Register User
// @access   Public
router.post('/register', async (req, res) => {
   const { name, email, password } = req.body;
   try {
      let user = await User.findOne({ email });
      if (user) {
         return res
            .status(400)
            .json({ errors: [{ msg: 'Email is already registered' }] });
      }
      user = new User({
         name,
         email,
         password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.save();

      // Return JWT
      const payload = {
         user: {
            id: user.id,
         },
      };

      jwt.sign(
         payload,
         config.get('jwtSecret'),
         { expiresIn: 36000 },
         (err, token) => {
            if (err) throw err;
            res.json({ token });
         }
      );
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

module.exports = router;
