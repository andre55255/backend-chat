const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    userSend: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    disabledAt: {
        type: Date,
        required: false,
        default: null
    },
});

module.exports = { chatSchema };
