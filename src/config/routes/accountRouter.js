const router = require("express").Router();
const { validationLogin } = require("../validationsRequest/login/login");
const { validationRefresh } = require("../validationsRequest/refresh/refresh");
const { validationRequest } = require("../../middlewares/validationRequest");
const accController = require("../../controllers/accountController");
const { authorize } = require("../../middlewares/authorize");

router.post("/login", validationLogin, validationRequest, accController.login);

router.post(
    "/refresh",
    authorize,
    validationRefresh,
    validationRequest,
    accController.refresh
);

router.get("/userInfo", authorize, accController.userInfo);

module.exports = router;
