const { check } = require("express-validator");

const validationLogin = [
    check("login")
        .notEmpty()
        .withMessage("Login não informado")
        .isString()
        .withMessage("Login inválido")
        .isLength({ min: 3, max: 50 })
        .withMessage("Login deve ter entre 3 e 50 caracteres"),
    check("password")
        .notEmpty()
        .withMessage("Senha não informada")
        .isString()
        .withMessage("Senha inválida")
        .isLength({ min: 3, max: 10 })
        .withMessage("Senha deve ter entre 3 e 10 caracteres"),
];

module.exports = { validationLogin };
