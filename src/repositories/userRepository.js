const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");
const { userModel } = require("../domain/models/index");
const moment = require("moment");

const getByLogin = async (login) => {
    try {
        const userSave = await userModel.findOne({ login, disabledAt: null });
        if (!userSave) {
            return null;
        }

        return userSave;
    } catch (err) {
        logger.error("userRepository getByLogin - Exceção: " + err);
        return null;
    }
};

const getById = async (id) => {
    try {
        const userSave = await userModel.findById({ id, disabledAt: null });
        if (!userSave) {
            return null;
        }

        return userSave;
    } catch (err) {
        logger.error("userRepository getById - Exceção: " + err);
        return null;
    }
};

const create = async (user) => {
    try {
        const userCreated = await userModel.create(user);
        if (!userCreated || !userCreated._id) {
            return buildResult(false, "Falha ao criar usuário na coleção");
        }
        return buildResult(true, "Usuário criado com sucesso", userCreated);
    } catch (err) {
        logger.error("userRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar usuário");
    }
};

const setRefreshToken = async (id, refresh) => {
    try {
        const result = await userModel.findByIdAndUpdate(id, {
            refresh,
            updatedAt: moment()
        });
        if (!result) {
            return buildResult(false, "Falha ao setar refresh token de usuário, id: " + id);
        }
        return buildResult(true, "Refresh token setado com sucesso para usuário, id: " + id);
    } catch (err) {
        logger.error("userRepository setRefreshToken - ex: " + err);
        return buildResult(false, "Falha ao salvar refresh token de usuário");
    }
}

module.exports = {
    getByLogin,
    getById,
    create,
    setRefreshToken
};
