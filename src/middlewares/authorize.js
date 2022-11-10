const { verify } = require("jsonwebtoken");
const { buildApiResponse } = require("../helpers/staticMethods");

const authorize = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json(
                buildApiResponse(false, 401, "Token não informado")
            );
            return;
        }
        const secret = process.env.JWT_SECRET || "";
        const decoded = verify(token.split(" ")[1], secret);
        req.user = decoded;

        return next();
    } catch (err) {
        console.log(err);
        res.status(401).json(buildApiResponse(false, 401, "Não autorizado"));
        return;
    }
};

module.exports = { authorize };
