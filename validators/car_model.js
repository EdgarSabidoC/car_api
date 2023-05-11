const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("name").exists().notEmpty().isAlphanumeric(),
	check("year").optional().notEmpty().isNumeric(),
	check("factory_price")
		.optional()
		.notEmpty()
		.isDecimal({ decimal_digits: "1,4" }),
	check("transmission").exists().notEmpty().isNumeric(),
	check("color").exists().notEmpty().isNumeric(),
	check("category").exists().notEmpty().isNumeric(),
	check("maker").exists().notEmpty().isNumeric(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("carModelIdOrName").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
