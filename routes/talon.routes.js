const {Router} = require('express');
const Talon = require('../models/Talon');
const User = require('../models/User')
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require("express-validator");

const router = Router();

// /api/talons/create
router.post('/create',
    [
      check('doctor', 'Doctor isn\'t selected').isMongoId(),
      check('dateOfBirth', 'Date of birth is required').isDate(),
      check('dateOfAppointment', 'Date of appointment is required').isDate(),
      check('firstName')
          .isAlpha().withMessage('Name must be a alphabetic')
          .isLength({ min: 3 }).withMessage('Name must be of 3 characters long'),
      check('lastName')
          .isAlpha().withMessage('Last name must be a alphabetic')
          .isLength({ min: 3 }).withMessage('Last name must be of 3 characters long'),
      check('firstName', 'Name is required').not().isEmpty(),
      check('lastName', 'Second name is required').not().isEmpty(),
    ],
    auth, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Указаны некорректные данные для регистрации'
      })
    }

    const {firstName, lastName, dateOfBirth, dateOfAppointment, doctor} = req.body;

    const existing = await Talon.findOne( {doctor, dateOfAppointment} );
    console.log(existing);

    if (existing) {
      return res.status(400).json( {message: "This talon time is ordered"} );
    }

    const talon = new Talon({
      firstName, lastName, dateOfBirth, dateOfAppointment, doctor, userOwner: req.user.userId
    })

    await talon.save();

    await User.findByIdAndUpdate(req.user.userId, { $push: { talons: talon._id }})
    await User.findByIdAndUpdate(doctor, { $push: { talons: talon._id } });

    // const doctorTalons = User.findOneAndUpdate({ _id: doctor }, { $push: { talons: talon._id } },
    //     function (err, suc) {
    //       if (err) {
    //         console.log('Err');
    //       } else {
    //         console.log('Succ');
    //       }
    //     });
    // await doctorTalons.save();

    res.status(201).json({talon});

    // User.update({ _id: req.user.userId },
    //     {
    //       firstName,
    //       lastName,
    //       dateOfBirth,
    //       dateOfAppointment,
    //       doctor,
    //       userOwner: req.user.userId
    // });
  } catch (e) {
    console.log(e.message);
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
