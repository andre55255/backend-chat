const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    login: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        maxLength: 512,
    },
    refresh: {
        type: String,
        required: false,
        maxLength: 512,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    disabledAt: {
        type: Date,
        required: false,
        default: null
    },
});

module.exports = { userSchema };
