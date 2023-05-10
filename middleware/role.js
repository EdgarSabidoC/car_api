const { handleHttpError } = require("../utils/handleError");

/**
 * Takes an array with the roles.
 * @param {*} roles
 * @returns
 */
const checkRole = (roles) => (req, res, next) => {
	try {
		const { user } = req;
		console.log({ user });
		const rolesByUser = user.role; // E.g. ["user"]
		// Checks if a role have the permissions:
		const checkValueRole = roles.some((role) => rolesByUser.includes(role)); // Returns true or false

		if (!checkValueRole) {
			handleHttpError(res, "THE_USER_HAS_NO_PERMISSIONS");
			return;
		}

		next();
	} catch (error) {
		handleHttpError(res, "ERROR_PERMISSIONS", 403);
	}
};

module.exports = { checkRole };
