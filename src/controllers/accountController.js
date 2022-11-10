const accService = require("../services/accountService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const login = async (req, res) => {
    try {
        logger.info("Acessado POST /account/login");
        const login = req.body;

        const result = await accService.login(login);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(
                    buildApiResponse(false, 400, result.message, result.object)
                );
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("accountController login - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao realizar login"));
    }
};

const refresh = async (req, res) => {
    try {
        logger.info("Acessado POST /account/refresh");
        const refresh = req.body;
        const { id } = req.user;

        const result = await accService.refresh(refresh, id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(
                    buildApiResponse(false, 400, result.message, result.object)
                );
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("accountController refresh - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao realizar refresh token"));
    }
};

module.exports = {
    login,
    refresh
}