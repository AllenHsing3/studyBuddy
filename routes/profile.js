const express = require('express')
const auth = require('../middleware/auth')
const Profile = require('../models/Profile')
const { check, validationResult  } = require('express-validator')

const router = express.Router()

// @route    GET profile/
// @desc     Get current user's profile
// @access   Private
router.get('/', auth ,async(req, res) =>{
    try {
        const card = await Card.findById(req.user.id)
        if(!card){
            return res.status(400).json({msg: "You don't have any cards"})
        }
        res.json(card)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route    POST profile/
// @desc     Create new profile or update 
// @access   Private
router.post('/', auth, async(req, res) =>{
    
})

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private

module.exports = router