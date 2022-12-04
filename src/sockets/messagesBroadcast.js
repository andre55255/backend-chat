const { eventsSockets } = require("../helpers/constants");
const { logger } = require("../middlewares/logger");
const {
    createMessage,
    getAllMessagesByRoom,
} = require("../services/chatService");

const previousMessageBroadcast = async (socket) => {
    try {
        const room = socket.handshake.headers.room;
        const resultGetMsg = await getAllMessagesByRoom(room);
        if (!resultGetMsg.success) {
            throw new Error(resultGetMsg.message);
        }
        let messages = [];
        if (resultGetMsg.object) {
            messages = resultGetMsg.object.map((msg) => {
                return {
                    id: msg._id,
                    message: msg.message,
                    userSend: msg.userSendUsername,
                    userDest: msg.destinationUsername,
                    createdAt: msg.createdAt,
                };
            });
        }
        socket.emit(eventsSockets.previousMessagesBroadcast, messages);
    } catch (err) {
        logger.error("sockets previousMessageBroadcast - Exceção: " + err);
        return;
    }
};

const emitMessageBroadcast = (socket) => {
    try {
        socket.on(eventsSockets.sendMessageBroadcast, async ({ message }) => {
            const resultCreateMsg = await createMessage({
                room: "*",
                userSend: socket.user.id,
                destination: "*",
                message,
            });
            if (!resultCreateMsg.success) {
                throw new Error(resultCreateMsg.message);
            }

            socket.broadcast.emit(eventsSockets.receiveMessageBroadcast, resultCreateMsg.object);
        });
    } catch (err) {
        logger.error("sockets sendMessageBroadcast - Exceção: " + err);
        return;
    }
};

module.exports = { previousMessageBroadcast, emitMessageBroadcast };
