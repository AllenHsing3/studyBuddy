const express = require('express');
const auth = require('../middleware/auth');
const Card = require('../models/Card');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route    GET card/
// @desc     Get all user's categories
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id });
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
      categoryName: req.body.categoryName,
    });
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE card/category/:_id
// @desc     Delete category
// @access   Private
router.delete('/category/:_id', auth, async (req, res) => {
  try {
    const category = await Card.findByIdAndRemove(req.params._id);
    res.status(201).json({ msg: 'Category Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET card/category/:id
// @desc     Get category by ID
// @access   Private
router.get('/category/:id', auth, async (req, res) => {
  try {
    const category = await Card.findById({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST card/category/:id
// @desc     Create new card
// @access   Private
router.post('/category/:id', auth, async (req, res) => {
  try {
    const category = await Card.findById({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    const newCard = {
      front: req.body.front,
      back: req.body.back,
    };
    category.cards.push(newCard);
    category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE card/category/:id/:card_id
// @desc     Delete Card
// @access   Private
router.delete('/category/:id/:cardId', auth, async (req, res) => {
  try {
    let category = await Card.findById({ _id: req.params.id });
    // const removeIndex = category.cards.findIndex(card => card._id == req.params.cardId)
    const removeIndex = category.cards.findIndex(
      (card) => card._id == req.params.cardId
    );
    category.cards.splice(removeIndex, 1);
    await category.save();
    res.send(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT card/category/:id/:card_id
// @desc     Edit Card
// @access   Private
router.put('/category/:id/:cardId', auth, async (req, res) => {
    const { editFront, editBack} = req.body
    
  try {
    let category = await Card.findById({ _id: req.params.id });
    const removeIndex = category.cards.findIndex(
      (card) => card._id == req.params.cardId
    );
    category.cards[removeIndex].front = editFront
    category.cards[removeIndex].back = editBack
    await category.save();
    res.send(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT card/flag/:id/:card_id
// @desc     Flag Card
// @access   Private
router.put('/flag/:id/:cardId', auth, async (req, res) => {  
try {
  let category = await Card.findById({ _id: req.params.id });
  const flagIndex = category.cards.findIndex(
    (card) => card._id == req.params.cardId
  );
  category.cards[flagIndex].markedForDeletion = !category.cards[flagIndex].markedForDeletion
  await category.save();
  res.send(category);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
});
module.exports = router;
