const express = require("express");
const app = express();
require("dotenv").config();
const { logger } = require("./middlewares/logger");

const PORT_SERVER = process.env.PORT || 8081;

// Middlewares Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Cors
const cors = require("cors");
app.use(cors());

// Config swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes

app.listen(PORT_SERVER, () => logger.info(`Listening in port ${PORT_SERVER}`));
