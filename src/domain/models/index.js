const mongoose = require("mongoose");

const { chatSchema } = require("./chatSchema");
const { userSchema } = require("./userSchema");

const chatModel = mongoose.model("chats", chatSchema);
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
