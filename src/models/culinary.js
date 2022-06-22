const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Culinary = new Schema({
    culinary_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    open_time: {
        type: String,
        required: true,
    },
    open_day: {
        type: String,
        required: true,
    },
    contact_number: {
        type: String,
        required: true,
    },
    author: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Culinary', Culinary);