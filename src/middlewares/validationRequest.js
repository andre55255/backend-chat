const { validationResult } = require("express-validator");
const { buildApiResponse } = require("../helpers/staticMethods");
const { logger } = require("./logger");

const validationRequest = async (req, res, next) => {
    try {
        const schemaErrors = validationResult(req);
        if (!schemaErrors.isEmpty()) {
            const message = schemaErrors
                .array({ onlyFirstError: true })
                .map((err) => {
                    return err.msg;
                })[0];
            return res.status(400).json(buildApiResponse(false, 400, message));
        }

        next();
    } catch (err) {
        logger.error(
            `Falha na validação da requisição, body: ${req.body}. Params: ${req.params}. Query: ${req.query}`
        );
    }
};

module.exports = {
    validationRequest,
};
