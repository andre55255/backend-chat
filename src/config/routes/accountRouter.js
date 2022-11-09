const router = require("express").Router();
const { validationSave } = require("../validationsRequest/login/login");
const { validationRequest } = require("../../middlewares/validationRequest");
const accController = require("../../controllers/accountController");

router.post("/login", validationSave, validationRequest, accController.login);

module.exports = router;