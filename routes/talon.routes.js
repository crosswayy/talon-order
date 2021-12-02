const {Router} = require('express');
const Talon = require('../models/Talon');
const User = require('../models/User')
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require("express-validator");

const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const router = Router();

// /api/talons/create
router.post('/create',
    [
        check('doctor', 'Doctor isn\'t selected').isMongoId(),
        check('dateOfBirth', 'Date of birth is required').not().isEmpty(),
        check('dateOfAppointment', 'Date of appointment is required').not().isEmpty(),
        check('firstName')
            .isAlpha().withMessage('Name must be a alphabetic')
            .isLength({min: 3}).withMessage('Name must be of 3 characters long'),
        check('lastName')
            .isAlpha().withMessage('Last name must be a alphabetic')
            .isLength({min: 3}).withMessage('Last name must be of 3 characters long'),
        check('firstName', 'Name is required').not().isEmpty(),
        check('lastName', 'Second name is required').not().isEmpty(),
        check('complaints', 'Complaints field is required').not().isEmpty()
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

            const {firstName, lastName, dateOfBirth, dateOfAppointment, doctor, complaints} = req.body;

            const existing = await Talon.findOne({doctor, dateOfAppointment});

            if (existing) {
                return res.status(400).json({message: "This talon time is ordered"});
            }

            const talon = new Talon({
                firstName, lastName, dateOfBirth, dateOfAppointment, complaints, doctor, userOwner: req.user.userId
            })

            await talon.save();

            await User.findByIdAndUpdate(req.user.userId, {$push: {talons: talon._id}})
            await User.findByIdAndUpdate(doctor, {$push: {talons: talon._id}});

            res.status(201).json(talon);

        } catch (e) {
            console.log(e.message);
            res.status(500).json({message: "Something went wrong..."})
        }
    });

// /api/talons/

router.get('/', auth, async (req, res) => {
    try {
        const data = await User.findById(req.user.userId, 'talons').populate({
            path: 'talons',
            select: '-userOwner -__v',
            populate: {
                path: 'doctor',
                select: '-password -isDoctor -__v -_id'
            }
        });
// locale('ru').format('DD.MM.YYYY HH:MM')
        const talons = data.talons.map(({_doc: data}) => ({
            ...data,
            dateOfBirth: dayjs(data.dateOfBirth).format('L LT'),
            dateOfAppointment: dayjs(data.dateOfAppointment).format('L LT')
        }));

        res.json(talons);
    } catch (e) {
        res.status(500).json({message: "Something went wrong...", error: e.message});
    }
});

// /api/talons/:id

router.get('/:id', auth, async (req, res) => {
    try {
        const talon = await Talon.findById(req.params.id, '-__v').populate({
            path: 'doctor',
            select: '-password -__v -_id -talons -isDoctor'
        });

        res.json(talon);
    } catch (e) {
        res.status(500).json({message: "Something went wrong..."});
    }
});

// /api/talons/:id

router.delete('/:id', auth, async (req, res) => {
    try {
        const talon = await Talon.findById(req.params.id, 'userOwner').populate({
            path: 'doctor',
            select: '_id'
        });

        if (!talon) {
            res.status(404).json( {message: 'Talon doesn\'t exist'} );
        }

        const doctor = await User.findByIdAndUpdate(talon.doctor._id, {
            $pull: {
                talons: talon._id
            }
        });

        const user = await User.findByIdAndUpdate(talon.userOwner, {
            $pull: {
                talons: talon._id
            }
        });

        await Talon.findByIdAndDelete(req.params.id);

        res.status(200).json({status: 200, message: 'Talon has been canceled'});
    } catch (e) {
        res.status(500).json({message: "Something went wrong..."} );
    }
});

module.exports = router;
