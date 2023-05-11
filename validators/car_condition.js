const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("type").exists().notEmpty().isString().isLength({ max: 30 }),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("conditionIdOrType").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
