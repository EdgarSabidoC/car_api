const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Validador de obtención de un elemento.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 */
const getItemValidator = [
	check("id").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { getItemValidator };
