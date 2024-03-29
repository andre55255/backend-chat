const { logger } = require("../middlewares/logger");
const { emitMessageBroadcast, previousMessageBroadcast } = require("../sockets/messagesBroadcast");
const { eventsSockets } = require("../helpers/constants");

const handleConnection = (io) => {
    try {
        io.on(eventsSockets.connection, async (socket) => {
            await previousMessageBroadcast(socket);
            await emitMessageBroadcast(socket);
        });
    } catch (err) {
        logger.error("sockets handleConnection - Exceção: " + err);
        return;
    }
};

module.exports = { handleConnection };
