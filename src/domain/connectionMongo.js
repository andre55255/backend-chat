const mongoose = require("mongoose");
const { logger } = require("../middlewares/logger"); 

const MONGO_URI = process.env.MONGO_URI || "";

const connectMongo = () => {
    mongoose.connect(MONGO_URI)
            .then(() => logger.info("MongoDB connected successfully"))
            .catch(err => logger.error("Failed connect MongoDB, ex: " + err))
};

module.exports = { connectMongo };
