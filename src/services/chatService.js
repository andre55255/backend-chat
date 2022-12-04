const chatRepo = require("../repositories/chatRepository");
const userRepo = require("../repositories/userRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const createMessage = async (model) => {
    try {
        const { room, userSend, destination, message } = model;
        const userSendExist = await userRepo.getById(userSend);
        if (!userSendExist) {
            logger.error(
                "chatService createMessage - Usuário que enviou a mensagem não localizado, id: " +
                    userSend
            );
            return buildResult(
                false,
                "Usuário que enviou a mensagem não localizado"
            );
        }
        if (destination != "*") {
            const userDestExist = await userRepo.getById(destination);
            if (!userDestExist) {
                logger.error(
                    "chatService createMessage - Usuário de destino da mensagem não localizado, id: " +
                        destination
                );
                return buildResult(
                    false,
                    "Usuário de destino da mensagem não localizado"
                );
            }
        }
        const resultCreateMsg = await chatRepo.createMessage({
            room,
            message,
            userSend,
            userSendUsername:
                userSendExist.firstname + " " + userSendExist.lastname,
            destination,
            destinationUsername:
                destination != "*"
                    ? userDestExist.firstname + " " + userDestExist.lastname
                    : "*",
        });
        if (!resultCreateMsg.success) {
            logger.error(
                "chatService createMessage - Falha ao inserir mensagem na base de dados. Obj: " +
                    model
            );
            return buildResult(
                false,
                "Falha ao inserir mensagem na base de dados"
            );
        }
        logger.info(
            "Mensagem inserida com sucesso, obj: " + JSON.stringify(model)
        );
        return buildResult(true, "Mensagem inserida com sucesso", resultCreateMsg.object);
    } catch (err) {
        logger.error("chatService createMessage - ex: " + err);
        return buildResult(false, "Falha ao inserir mensagem na base de dados");
    }
};

const getAllMessagesByRoom = async (room) => {
    try {
        const messages = await chatRepo.getAllMessagesByRoom(room);
        if (messages == null) {
            logger.error(
                "chatService getAllMessagesByRoom - Falha ao buscar mensagens na base de dados, sala: " +
                    room
            );
            return buildResult(
                false,
                "Falha ao buscar mensagens, sala: " + room
            );
        }
        return buildResult(true, "Mensagens listadas com sucesso", messages);
    } catch (err) {
        logger.error("chatService getAllMessagesByRoom - ex: " + err);
        return buildResult(
            false,
            "Falha ao pegar mensagens na base de dados, sala: " + room
        );
    }
};

module.exports = {
    createMessage,
    getAllMessagesByRoom,
};
