const {
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const err = new Error('Input Value Tidak Sesuai');
            err.errorStatus = 400;
            err.data = errors.array();
            throw err;
        };

        const {
            fullname,
            username,
            email,
            password
        } = req.body;
        const oldUser = await User.findOne({
            username
        });
        if (oldUser) {
            return res.status(409).json({
                status: res.statusCode,
                message: 'Username sudah digunakan.'
            })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(password, salt)

        const user = new User({
            fullname,
            username,
            email,
            hash: hashPassword,
        });

        user.save()
            .then((result) => {
                res.status(201).json({
                    status: res.statusCode,
                    message: 'Akun baru berhasil dibuat.',
                    data: result,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    status: res.statusCode,
                    message: 'Semua kolom wajib diisi.'
                })
            })

    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: 'Gagal membuat akun '
        })
    }
}

const login = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'Input tidak sesuai.',
            })
        }

        const {
            username,
            password
        } = req.body;
        await User.findOne({
                username,
            })
            .then(async (result) => {
                const user = result;

                if (!user) {
                    return res.status(400).json({
                        status: res.statusCode,
                        message: 'Username belum terdaftar.',
                    });
                }

                const validPassword = await bcrypt.compare(password, user.hash);
                if (!validPassword) {
                    return res.status(401).json({
                        status: res.statusCode,
                        message: 'password anda salah.'
                    });
                }

                const token = jwt.sign({
                    id: user._id,
                    username: user.username,
                }, process.env.PRIVATE_TOKEN, {
                    expiresIn: '8h'
                });

                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });

                return res.send({
                    message: 'success',
                });
            });
    } catch (error) {
        return res.status(500).json({
            message: 'gagal login',
            error,
        });
    }
}

const logout = async (req, res, next) => {
    res.cookie('jwt', '', {
        maxAge: 0
    })

    res.send({
        message: 'success'
    })
}

const getUser = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt'];
        const tokens = jwt.verify(cookie, process.env.PRIVATE_TOKEN);

        if (!tokens) {
            return res.status(401).send({
                message: 'token anda tidak valid.'
            });
        }

        const user = await User.findOne({
            username: tokens.username
        });
        const {
            hash,
            ...data
        } = await user.toJSON();

        res.send(data);
    } catch (error) {
        return res.status(401).send({
            message: 'Anda tidak memiliki token.',
        });
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser,
}