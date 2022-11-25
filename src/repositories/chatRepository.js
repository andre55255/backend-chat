const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");
const { chatModel } = require("../domain/models/index");

const getAllMessagesByRoom = async (room) => {
    try {
        const messages = await chatModel.find({ room, disabledAt: null });
        if (!messages) {
            return null;
        }

        return messages;
    } catch (err) {
        logger.error("chatRepository getAllMessagesByRoom - Exceção: " + err);
        return null;
    }
};

const createMessage = async (message) => {
    try {
        const messageCreated = await chatModel.create(message);
        if (!messageCreated || !messageCreated._id) {
            return buildResult(false, "Falha ao criar mensagem na coleção");
        }
        return buildResult(true, "Mensagem criada com sucesso", messageCreated);
    } catch (err) {
        logger.error(
            "chatRepository createMessage - Exceção: " +
                err +
                ". Obj: " +
                message
        );
        return buildResult(false, "Falha ao criar mensagem, obj: " + message);
    }
};

module.exports = {
    getAllMessagesByRoom,
    createMessage,
};
