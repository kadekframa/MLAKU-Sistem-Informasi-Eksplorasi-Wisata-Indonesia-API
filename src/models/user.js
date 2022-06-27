const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const User = new Schema({
    fullname: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
        unique: true,
    },

    username: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);