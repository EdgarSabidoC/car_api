const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
	try {
		if (!req.cookies.token) {
			handleHttpError(res, "ERROR_TOKEN_NOT_FOUND", 401);
			return;
		}

		const token = req.cookies.token; //  Obtiene el token de la cookie httpOnly
		const tokenData = await verifyToken(token);

		if (!tokenData) {
			handleHttpError(res, "ERROR_PAYLOAD_DATA_NOT_FOUND", 401);
			return;
		}

		const query = { googleId: tokenData.id };
		const user = await User.findOne({ where: query });
		req.user = user;
		next();
	} catch (err) {
		handleHttpError(res, "ERROR_SESSION_NOT_FOUND", 401);
	}
};

module.exports = { authMiddleware };
