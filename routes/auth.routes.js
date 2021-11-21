const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is incorrect').isEmail(),
        check('password', 'Password must consist more than 6 symbols').isLength({ min: 6 }),
        check('firstName')
            .isAlpha().withMessage('Name must be a alphabetic')
            .isLength({ min: 3 }).withMessage('Name must be of 3 characters long'),
        check('lastName')
            .isAlpha().withMessage('Last name must be a alphabetic')
            .isLength({ min: 3 }).withMessage('Last name must be of 3 characters long'),
        check('firstName', 'Name is required').not().isEmpty(),
        check('lastName', 'Second name is required').not().isEmpty(),
    ],
    async (req, res) => {
    try {
        console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Указаны некорректные данные для регистрации'
            })
        }

        const {email, password, firstName, lastName} = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'This email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 7);
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        await user.save();

        res.status(201).json({ message: 'User was created' })

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... Try again' });
    }
});


// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Email is incorrect').normalizeEmail().isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Authorization data is incorrect'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Account does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user.id, message: 'Correct! Signing in...' });

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... Try again' });
    }
});

module.exports = router;
