const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("concept").exists().notEmpty().isString().isLength({ max: 350 }),
	check("percentage").exists.notEmpty().isInt(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("priceIdOrConcept").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
