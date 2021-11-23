const {Router} = require('express');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const Talon = require("../models/Talon");

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findOne( {_id: req.user.userId} );

    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    res.status(200).json({firstName: user.firstName, lastName: user.lastName, talons: user.talons});
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

module.exports = router;
