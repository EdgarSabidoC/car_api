/**
 * Middleware para verificar si el usuario ha iniciado sesión.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 */
const isLoggedIn = (req, res, next) => {
	req.cookies.token ? res.send(true) : res.send(false);
};

module.exports = { isLoggedIn };
