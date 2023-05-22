const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Genera un token JWT firmado a partir de los datos de usuario proporcionados.
 * @param {Object} user - Objeto con los datos del usuario.
 * @param {string} user.googleId - Identificador único del usuario.
 * @param {string} user.user_role - Rol del usuario.
 * @returns {Promise<string>} Token JWT generado.
 */
const signToken = async (user) => {
	const sign = jwt.sign(
		{
			// Payload:
			id: user.googleId,
			role: user.user_role,
			email: user.email,
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
