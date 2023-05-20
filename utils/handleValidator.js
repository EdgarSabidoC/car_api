const { validationResult } = require("express-validator");

/**
 * Valida los resultados de la solicitud utilizando express-validator.
 * Si no se cumplen las validaciones, envía una respuesta con los errores correspondientes.
 * Si las validaciones son exitosas, pasa al siguiente controlador.
 *
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función de siguiente controlador.
 */
const validateResults = (req, res, next) => {
	try {
		validationResult(req).throw();
		return next(); // Continúa hacia el controlador.
	} catch (err) {
		res.status(403);
		res.send({ errors: err.array() });
	}
};

module.exports = validateResults;
