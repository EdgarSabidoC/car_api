const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("sold_price").exists().notEmpty().isDecimal(),
	check("appointment").exists().notEmpty().isDecimal(),
	check("car").exists().notEmpty().isAlphanumeric(),
	check("employee").exists().notEmpty().isDecimal(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("sellId").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
