const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handleEngineProperties");
const propertiesKey = getProperties();
/**
 * Takes a user object.
 * @param {*} user
 */
const signToken = async (user) => {
	const sign = jwt.sign(
		{
			// Payload.
			[propertiesKey.id]: user[propertiesKey.id],
			role: user.role,
		},
		JWT_SECRET,
		{
			// Expire date.
			expiresIn: "2h",
		}
	);
	return sign;
};

/**
 * Takes a session JWT token.
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
