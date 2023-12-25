const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

// router.use(express.json());


router.post('/reg', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Проверка наличия всех необходимых данных
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Необходимо заполнить все поля' });
        }

        // Проверка, существует ли пользователь с таким email
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await User.createUser(newUser);
        res.status(201).json({ message: 'Регистрация успешна' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка 500' });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const isMatch = await User.comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }

        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при аутентификации' });
    }
});



router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('кабинет пользователя')
  res.send('кабинет пользователя')
});


module.exports = router;