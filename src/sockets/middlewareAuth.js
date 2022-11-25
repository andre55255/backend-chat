const { logger } = require("../middlewares/logger");
const { verifyToken } = require("../helpers/staticMethods");

const middlewareAuth = (io) => {
    try {
        io.use((socket, next) => {
            const token = socket.handshake.headers.token;
            const isValid = verifyToken(token);
            if (!isValid) {
                logger.error("sockets middlewareAuth - Falha de autenticação, token: " + token);
                next(new Error("Falha de autenticação"));
            } 
            socket.user = isValid;
            next();
        });
    } catch (err) {
        logger.error("sockets middlewareAuth - Exceção: " + err);
        next(new Error(err));
    }
};

module.exports = { middlewareAuth };
