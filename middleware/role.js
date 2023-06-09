const { handleHttpError } = require("../utils/handleError");

/**
 * Middleware para verificar los roles de un usuario.
 *
 * @param {string[]} roles - Roles permitidos para acceder al recurso.
 * @returns {Function} Función middleware para verificar los roles.
 * @throws {Error} Si ocurre un error al verificar el rol.
 */
const checkRole = (roles) => (req, res, next) => {
	try {
		const newRoles = roles.map((str) => {
			if (str === "admin") {
				return 1;
			} else if (str === "capturist") {
				return 2;
			} else return 0;
		});
		const { user } = req;

		console.log("USER:", user.user_role, "ROLE: ", newRoles);

		// Se obtiene el rol del usuario:
		const userRole = user.user_role; // E.g. ["admin"]
		console.log("USER_ROLE: ", userRole);
		// Verifica si el usuario tiene los permisos:
		const checkValueRole = newRoles.some((role) => userRole === role); // Retorna true o false.

		if (!checkValueRole) {
			handleHttpError(res, "ERROR_THE_USER_HAS_NO_PERMISSIONS");
			return;
		}
		next();
	} catch (error) {
		handleHttpError(res, "ERROR_PERMISSIONS", 403);
	}
};

module.exports = { checkRole };
