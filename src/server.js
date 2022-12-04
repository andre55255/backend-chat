require("dotenv").config();

const { logger } = require("./middlewares/logger");
const { appConfig } = require("./config/appConfig");

// Config server http
const express = require("express");
const app = express();
appConfig(app);

// Config server sockets
const serverWs = require("http").createServer(app);
const { Server } = require("socket.io");
const urlCors = process.env.URL_CORS || "";
const io = new Server(serverWs, {
    cors: {
        origin: urlCors,
    },
});

// Handle Sockets
const { middlewareAuth } = require("./sockets/middlewareAuth");
middlewareAuth(io);

const { handleConnection } = require("./sockets/handleConnection");
handleConnection(io);

const PORT_SERVER = process.env.PORT || 8080;

serverWs.listen(PORT_SERVER, () =>
    logger.info(`Listening in port ${PORT_SERVER}`)
);
