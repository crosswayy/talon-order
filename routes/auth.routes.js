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
        check('email', 'Адрес почты указан неправильно').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 }),
        check('firstName', 'В имени могут содержать только буквы').isString(),
        check('lastName', 'В фамилии могут содержать только буквы').isString(),
        check('born', 'Неверно указана дата рождения').isInt()
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

        const {email, password, firstName, lastName, born} = req.body;

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
            born
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
        check('email', 'Адрес почты указан неверно').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Указаны некорректные данные для авторизации'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Указан неверный пароль' });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user.id });

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... Try again' });
    }
});

module.exports = router;
