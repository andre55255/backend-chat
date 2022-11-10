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

        const accessToken = generateJwt(user);
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

const generateJwt = (user) => {
    try {
        const claimsPayload = {
            id: user._id,
            login: user.login,
        };

        const secret = process.env.JWT_SECRET || "";

        const accessToken = sign(claimsPayload, secret, authConfigJwt);

        return accessToken;
    } catch (err) {
        logger.error("userService generateJwt - ex: " + err);
        return null;
    }
};

const refresh = async (tokensReq, idUser) => {
    try {
        const { refreshToken } = tokensReq;

        const userSave = await userRepo.getById(idUser);
        if (!userSave) {
            logger.error("userService refresh - Usuário não encontrado");
            return buildResult(false, "Usuário não encontrado");
        }

        if (userSave.refresh == refreshToken) {
            logger.info(
                "userService refresh - Refresh token realizado com sucesso, userId: " +
                    idUser
            );
            const accessToken = generateJwt(userSave);
            if (!accessToken) {
                logger.error(
                    "userService refresh - Falha ao criar novo token de acesso, login: " +
                        userSave.login
                );
                return buildResult(
                    false,
                    "Falha ao criar novo token de acesso"
                );
            }

            const refreshToken = await hash(login + moment(), 2);
            if (!refreshToken) {
                logger.error(
                    "userService refresh - Falha ao gerar novo refresh token, login: " +
                        login
                );
                return buildResult(false, "Falha ao gerar novo refresh token");
            }

            const resultSetRefresh = await userRepo.setRefreshToken(
                userSave._id,
                refreshToken
            );
            if (!resultSetRefresh) {
                logger.error(resultSetRefresh.message);
                return buildResult(resultSetRefresh.message);
            }

            return buildResult(true, "Refresh token realizado com sucesso", {
                accessToken,
                refreshToken,
            });
        }

        logger.error(
            `userService refresh - Refresh token incorreto, login: ${userSave.login}. Banco: ${userSave.refresh}, Informado: ${refreshToken}`
        );
        return buildResult(false, "Refresh token incorreto para o usuário, login: " + userSave.login);
    } catch (err) {
        logger.error("userService refresh - ex: " + err);
        return buildResult(false, "Falha ao realizar login refresh token");
    }
};

module.exports = {
    login,
    refresh
};
