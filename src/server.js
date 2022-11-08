require("dotenv").config();

const { logger } = require("./middlewares/logger");
const { appConfig } = require("./config/appConfig");

const express = require("express");
const app = express();
appConfig(app);

const PORT_SERVER = process.env.PORT || 8081;

app.listen(PORT_SERVER, () => logger.info(`Listening in port ${PORT_SERVER}`));
