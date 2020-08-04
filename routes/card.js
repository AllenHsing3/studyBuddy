const express = require('express');
const auth = require('../middleware/auth');
const Card = require('../models/Card');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route    GET card/
// @desc     Get current user's cards
// @access   Private
router.get('/', auth, async (req, res) => {
   try {
      const cards = await Card.findById(req.user.id);
      if (!cards) {
         return res.status(400).json({ msg: "You don't have any cards" });
      }
      res.json(cards);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

// @route    POST card/category
// @desc     Create new category
// @access   Private
router.post('/category', auth, async (req, res) => {
    try {
        const newCategory = new Card({
            userId: req.user.id,
            category: req.body.category,

        })
        await newCategory.save();
        res.status(201).send(newCategory)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route    GET card/category/:id
// @desc     Get category by ID
// @access   Private
router.get('/category/:id', auth, async(req, res) => {
    try {
        const category = await Card.find({_id: req.params.id})
        if(!category){
            return res.status(404).json({msg: 'Category not found'})
        }
        res.json(category)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route    POST card/category/:id
// @desc     Create new card
// @access   Private
router.post('/category/:id', auth, async(req, res) => {
    try {
        const category = await Card.findById({_id:req.params.id})
        if(!category){
            return res.status(404).json({msg: 'Category not found'})
        }
        const newCard = {
            front: req.body.front,
            back: req.body.back
        }
        category.cards.push(newCard);
        category.save();
        res.json(category)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route    DELETE card/category/:id
// @desc     Delete Card
// @access   Private

module.exports = router;
