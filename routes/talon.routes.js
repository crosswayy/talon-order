const {Router} = require('express');
const config = require('config');
const Talon = require('../models/Talon');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth.middleware');

const router = Router();

// /api/talons/create
router.post('/create', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const {firstName, lastName, dateOfBirth, dateOfAppointment, doctor} = req.body;

    const existing = await Doctor.findOne( {dateOfAppointment} );

    if (existing) {
      return res.status(400).json( {message: "This talon time is ordered"} );
    }

    const talon = new Talon({
      firstName, lastName, dateOfBirth, dateOfAppointment, doctor, userOwner: req.user.userId
    })

    await talon.save();
    res.status(201).json({talon});
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." })
  }
});

// /api/talons/

router.get('/', auth, async (req, res) => {
  try {
    const talons = await Talon.find( {userOwner: req.user.userId} );
    res.json(talons);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// /api/talons/:id

router.get('/:id', auth, async (req, res) => {
  try {
    const talon = Talon.findById(req.params.id);
    res.json({talon});
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

module.exports = router;
