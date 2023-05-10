const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models/index");
const getProperties = require("../utils/handleEngineProperties");
const propertiesKey = getProperties();
const ENGINE_DB = process.env.ENGINE_DB;

const authMiddleware = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			handleHttpError(res, "TOKEN_NOT_FOUND", 401);
			return;
		}

		const token = req.headers.authorization.split(" ").pop(); //  Obtiene solo el token porque contiene "Bearer" y el token.
		const tokenData = await verifyToken(token);

		if (!tokenData) {
			handleHttpError(res, "PAYLOAD_DATA_NOT_FOUND", 401);
			return;
		}

		const query = {
			[propertiesKey.id]: tokenData[propertiesKey.id],
		};
		const user = usersModel.findOne({ where: query });
		req.user = user;
		next();
	} catch (err) {
		handleHttpError(res, "SESSION_NOT_FOUND", 401);
	}
};

module.exports = { authMiddleware };
