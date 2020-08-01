const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();

const User = require('../models/User');

// @route    POST user/register
// @desc     Register User
// @access   Public
router.post(
   '/register',
   [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please enter valid email').isEmail(),
      check('password', 'Password must be a min of 6 characters').isLength({
         min: 6,
      }),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
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
   }
);

// @route    POST user/login
// @desc     Login User
// @access   Public
router.post(
   '/login',
   [
      check('email', 'Please enter valid email').isEmail(),
      check('password', 'Password is required').exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
         let user = await User.findOne({ email });
         if (!user) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Invalid Credentials' }] });
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Invalid Credentials' }] });
         }

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
   }
);

// @route    GET user/register
// @desc     Register User
// @access   Public
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id);
      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

module.exports = router;
