const userService = require("../services/userService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /user");
        const user = req.body;

        const result = await userService.create(user);
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
        logger.error("userController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar usuário"));
    }
};

module.exports = {
    create
}