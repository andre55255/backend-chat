const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    room: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userSend: {
        type: String,
        required: true,
    },
    userSendUsername: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    destinationUsername: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    disabledAt: {
        type: Date,
        required: false,
        default: null,
    },
});

module.exports = { chatSchema };
