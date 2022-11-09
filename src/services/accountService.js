const userRepo = require("../repositories/userRepository");
const { compare, hash } = require("bcrypt");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");
const { authConfigJwt } = require("../helpers/constants");
const { sign } = require("jsonwebtoken");
const moment = require("moment");

const login = async (loginReq) => {
    try {
        const { login, password } = loginReq;

        const user = await userRepo.getByLogin(login);
        if (!user) {
            logger.error(
                "userService login - Usuário não encontrado: " + login
            );
            return buildResult(false, "Usuário não encontrado");
        }

        const verifyPass = await compare(password, user.password);
        if (!verifyPass) {
            logger.error(
                "userService login - Senha incorreta, login: " + login
            );
            return buildResult(false, "Senha incorreta");
        }

        const claimsPayload = {
            id: user._id,
            login: user.login
        };

        const secret = process.env.JWT_SECRET || "";

        const accessToken = sign(claimsPayload, secret, authConfigJwt);
        if (!accessToken) {
            logger.error(
                "userService login - Falha ao criar token de acesso, login: " +
                    login
            );
            return buildResult(false, "Falha ao criar token de acesso");
        }

        const refreshToken = await hash(login + moment(), 2);
        if (!refreshToken) {
            logger.error(
                "userService login - Falha ao gerar refresh token, login: " +
                    login
            );
            return buildResult(false, "Falha ao gerar refresh token");
        }

        const resultSetRefresh = await userRepo.setRefreshToken(
            user._id,
            refreshToken
        );
        if (!resultSetRefresh) {
            logger.error(resultSetRefresh.message);
            return buildResult(resultSetRefresh.message);
        }

        logger.info(`Usuário logado com sucesso, login ${login}`);
        return buildResult(true, "Login efetuado com sucesso", {
            accessToken,
            refreshToken,
        });
    } catch (err) {
        logger.error("userService login - ex: " + err);
        return buildResult(
            false,
            "Falha ao realizar login de usuário na base de dados"
        );
    }
};

module.exports = {
    login,
};
