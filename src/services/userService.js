const userRepo = require("../repositories/userRepository");
const { hash } = require("bcrypt");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (userReq) => {
    try {
        const { firstname, lastname, login, password } = userReq;

        const userLoginExist = await userRepo.getByLogin(login);
        if (userLoginExist) {
            logger.error(
                "userService create - Já existe um usuário cadastrado com este login: " +
                    login
            );
            return buildResult(
                false,
                "Já existe um usuário com o login: " + login
            );
        }
        const hashPassword = await hash(password, 10);
        if (!hashPassword) {
            logger.error(
                "userService create - Falha ao encriptar senha de usuário: " +
                    login
            );
            return buildResult(
                false,
                "Falha ao tratar senha para criar usuário, " + login
            );
        }

        const userEntitySave = {
            firstname,
            lastname,
            login,
            password: hashPassword,
        };
        const resultCreated = await userRepo.create(userEntitySave);
        if (resultCreated.success) {
            logger.info("userService create - Usuário criado, login: " + login);
            return resultCreated;
        }
        logger.error(
            `userService create - Falha ao criar usuário, login ${login}, exceção: ${resultCreated.message}`
        );
        return buildResult(false, "Falha ao criar usuário");
    } catch (err) {
        logger.error("userService create - ex: " + err);
        return buildResult(false, "Falha ao inserir usuário na base de dados");
    }
};

module.exports = {
    create,
};
