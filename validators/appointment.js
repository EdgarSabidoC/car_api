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
	check("customer_firstname")
		.exists()
		.notEmpty()
		.isString()
		.isLength({ max: 80 }),
	check("customer_lastname_1")
		.exists()
		.notEmpty()
		.isString()
		.isLength({ max: 80 }),
	check("customer_lastname_2")
		.optional()
		.notEmpty()
		.isString()
		.isLength({ max: 80 }),
	check("email").optional().notEmpty().isString().isLength({ max: 80 }),
	check("telephone").optional().notEmpty().isString().isLength({ max: 20 }),
	check("appointment_date").exists().notEmpty().isDate(),
	check("appointment_time").exists().notEmpty().isTime(),
	check("dealership").exists().notEmpty().isInt(),
	check("car").exists().notEmpty().isString().isLength({ min: 17, max: 17 }),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

/**
 * Validador de obtención de elementos.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 */
const getItemsValidator = [
	check("date").exists().notEmpty().isDate(),
	check("time").exists().notEmpty().isTime(),
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
	check("appointmentId").exists().notEmpty().isInt(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator, getItemsValidator };
