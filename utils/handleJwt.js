const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handleEngineProperties");
const propertiesKey = getProperties();
/**
 * Genera un token JWT a partir de los datos de usuario proporcionados.
 * @param {Object} user - Objeto con los datos del usuario.
 * @param {string} user.id - Identificador único del usuario.
 * @param {string} user.role - Rol del usuario.
 * @returns {Promise<string>} Token JWT generado.
 */
const signToken = async (user) => {
	const sign = jwt.sign(
		{
			// Payload:
			id: user.id,
			role: user.role,
		},
		JWT_SECRET,
		{
			// Tiempo de expiración del token:
			expiresIn: "1h",
		}
	);
	return sign;
};

/**
 * Toma el JWT de sesión.
 * @param {*} jwtToken
 * @returns
 */
const verifyToken = async (jwtToken) => {
	try {
		return jwt.verify(jwtToken, JWT_SECRET);
	} catch (err) {
		return null;
	}
};

module.exports = { signToken, verifyToken };
