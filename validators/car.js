const { check, body } = require("express-validator");
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
	check("vin")
		.exists()
		.notEmpty()
		.matches(/^[A-HJ-NPR-Z\d]{8}[X\d][A-HJ-NPR-Z\d]{2}\d{6}$/),
	check("mileage").exists().notEmpty().isInt(),
	check("description").optional().notEmpty().isString(),
	check("purchase_price")
		.exists()
		.notEmpty()
		.isDecimal({ decimal_digits: "1,4" }),
	check("sale_price")
		.optional()
		.notEmpty()
		.isDecimal({ decimal_digits: "1,4" }),
	check("maintenance_cost")
		.optional()
		.notEmpty()
		.isDecimal({ decimal_digits: "1,4" }),
	check("model").exists().notEmpty().isInt(),
	check("ccondition").exists().notEmpty().isInt(),
	check("interior_color").exists().notEmpty().isInt(),
	check("exterior_color").exists().notEmpty().isInt(),
	check("dealership").exists().notEmpty().isInt(),
	check("sold").optional().notEmpty().isBoolean(),
	body("image")
		.optional()
		.custom((value, { req }) => {
			if (!value) {
				// Si no se proporciona una imagen, se considera válido
				return true;
			}
			// Verifica si el formato de la imagen es webp
			if (!value.match(/\.webp$/i)) {
				throw new Error("Invalid image format. Only webp format is allowed.");
			}
			return true;
		}),
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
	check("vin")
		.exists()
		.notEmpty()
		.matches(/^[A-HJ-NPR-Z\d]{8}[X\d][A-HJ-NPR-Z\d]{2}\d{6}$/),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
