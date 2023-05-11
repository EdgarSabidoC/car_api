const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("concept").exists().notEmpty().isString().isLength({ max: 100 }),
	check("price").exists().notEmpty().isDecimal({ decimal_digits: "1,4" }),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("maintenanceTypeIdOrConcept").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
