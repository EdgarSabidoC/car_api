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
	check("googleId").optional().notEmpty().isString().isLength({ max: 255 }),
	check("first_name").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_1").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_2").optional().notEmpty().isString().isLength({ max: 75 }),
	check("email").exists().notEmpty().isEmail(),
	check("dealership").optional().notEmpty().isInt(),
	check("user_role").optional().notEmpty().isInt(),
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
	check("userIdOrEmail").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
