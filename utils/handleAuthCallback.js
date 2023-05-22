const { signToken } = require("../utils/handleJwt");
const HOME_URL = process.env.HOME_URL;
const FAILURE_URL = process.env.FAILURE_URL;

/**
 * Maneja la devolución de llamada de autenticación.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} Promesa que indica la finalización del middleware.
 * @throws {Error} Si ocurre un error.
 */
const handleAuthCallback = async (req, res, next) => {
	try {
		// Se obtiene el usuario que inició sesión:
		const user = req.user;

		// Se verifica si está en modo desarrollador:
		const dev = process.env.NODE_ENV !== "development";

		// Se genera el token:
		const data = await signToken(user);

		// Configuramos la cookie con el token
		res.cookie("token", data, {
			httpOnly: dev,
			secure: dev,
			maxAge: 3600000,
		}); // La cookie dura 1h.

		// Se almacena el rol del usuario en la sesión:
		const role = user.user_role;
		req.session.role = role;

		if (role === 1 || role === 2) {
			// Si es admin:
			res.redirect(`${HOME_URL}`);
		}

		// Si no es un usuario:
		// res.redirect(`${FAILURE_URL}`);
	} catch (error) {
		console.error(error);
	}
};

module.exports = handleAuthCallback;
