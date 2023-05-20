// Se obtiene la API_KEY de las variables de entorno:
const API_KEY = process.env.API_KEY;

/**
 * Middleware para validar una clave de API en los encabezados de la solicitud.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 * @throws {Error} Si ocurre un error al validar la clave de API.
 */
const customHeader = (req, res, next) => {
	try {
		const apiKey = req.headers.api_key;

		// Validación:
		if (apiKey === API_KEY) {
			next();
		} else {
			res.status(403);
			res.send({ errors: "API_KEY_NOT_VALID" });
		}
	} catch (err) {
		res.status(403);
		res.send({ errors: "SOMETHING_WENT_WRONG_WITH_CUSTOM_HEADER" });
	}
};

module.exports = customHeader;
