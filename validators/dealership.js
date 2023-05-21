const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Validador de creación de elemento.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 */
const createItemValidator = [
	check("name").exists().notEmpty().isString().isLength({ max: 50 }),
	check("description").optional().notEmpty().isString().isLength({ max: 300 }),
	check("street").exists().notEmpty().isString().isLength({ max: 50 }),
	check("exterior_number").exists().notEmpty().isString().isLength({ max: 10 }),
	check("neighborhood").exists().notEmpty().isString().isLength({ max: 50 }),
	check("postal_code").exists().notEmpty().isInt(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

/**
 * Validador de obtención de un elemento.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 */
const getItemValidator = [
	check("dealershipIdOrName").exists().notEmpty().isString(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
