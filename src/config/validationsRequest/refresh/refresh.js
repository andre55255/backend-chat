const { check } = require("express-validator");

const validationRefresh = [
    check("refreshToken")
        .notEmpty()
        .withMessage("Refresh token não informada")
        .isString()
        .withMessage("Refresh token inválida")
];

module.exports = { validationRefresh };
