const { verify } = require("jsonwebtoken");
const { logger } = require("../middlewares/logger");

const buildApiResponse = (success, statusCode, message, object) => {
    return {
        success,
        statusCode,
        message,
        object,
    };
};

const buildResult = (success, message, object) => {
    return {
        success,
        message,
        object,
    };
};

const verifyToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET || "";
        const decoded = verify(token, secret);

        if (decoded) {
            return {
                id: decoded.id,
                login: decoded.login,
            };
        }

        return null;
    } catch (err) {
        logger.error("staticMethods verifyToken - Exceção: " + err);
        return null;
    }
};

module.exports = {
    buildApiResponse,
    buildResult,
    verifyToken
};
