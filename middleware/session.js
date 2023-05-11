const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { User } = require("../models/index"); // Modelo de sequelize de la tabla User.
const ENGINE_DB = process.env.ENGINE_DB;

const authMiddleware = async (req, res, next) => {
	try {
		// Si no existe la cookie token:
		if (!req.cookies.token) {
			handleHttpError(res, "TOKEN_NOT_FOUND", 401);
			return;
		}

		const token = req.cookies.token; //  Obtiene el token de la cookie.
		const tokenData = await verifyToken(token);

		if (!tokenData) {
			handleHttpError(res, "PAYLOAD_DATA_NOT_FOUND", 401);
			return;
		}

		const query = {
			id: tokenData.id,
		};
		const user = await User.findOne({ where: query });
		req.user = user;
		next();
	} catch (err) {
		handleHttpError(res, "SESSION_NOT_FOUND", 401);
	}
};

module.exports = { authMiddleware };
