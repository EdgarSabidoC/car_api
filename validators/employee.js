const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * Validador de creación de elemento.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 */
const createItemValidator = [
	check("first_name").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_1").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_2").optional().notEmpty().isString().isLength({ max: 75 }),
	check("dealership").exists().notEmpty().isInt(),
	check("email").exists().notEmpty().isEmail(),
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
	check("employeeIdOrName").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
