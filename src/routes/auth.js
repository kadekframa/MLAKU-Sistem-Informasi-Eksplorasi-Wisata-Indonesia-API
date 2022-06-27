const express = require("express");
const authController = require('../controllers/auth');
const {
    body
} = require('express-validator');
const verifyToken = require('../middleware/verifyToken');
const user = require("../models/user");

const router = express.Router();
const validation = [
    body('fullname')
    .isLength({
        min: 5
    })
    .withMessage('Fullname kurang dari 5 karakter'),
    body('username')
    .isLength({
        min: 4
    })
    .withMessage('Username kurang dari 4 karakter'),
    body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong'),
    body('password')
    .notEmpty()
    .withMessage('Password tidak boleh kosong'),
];

router.post('/register', validation, authController.register);
router.post('/login', validation, authController.login);
router.post('/logout', verifyToken, authController.logout);
router.get('/user', authController.getUser);

module.exports = router;