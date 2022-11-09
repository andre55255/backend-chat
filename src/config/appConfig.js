const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const cors = require("cors");
const { connectMongo } = require("../domain/connectionMongo");
const userRouter = require("../config/routes/userRouter");
const accRouter = require("../config/routes/accountRouter");

const appConfig = (app) => {
    // Load DB
    connectMongo();

    // Middlewares Request
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Config Cors
    app.use(
        cors({
            origin: ["http://localhost:3000"],
        })
    );

    // Config swagger
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Routes
    app.use("/user", userRouter);
    app.use("/account", accRouter);
};

module.exports = { appConfig };
