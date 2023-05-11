const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("appointment").exists().notEmpty().isInt(),
	check("employee").exists().notEmpty().isInt(),
	check("sold_price").exists().notEmpty().isDecimal({ decimal_digits: "1,4" }),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("appointment").exists().notEmpty().isInt(),
	check("employee").exists().notEmpty().isInt(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
