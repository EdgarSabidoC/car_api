const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;

const createItemValidator = [
	check("first_name").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_1").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_2").optional().notEmpty().isString().isLength({ max: 75 }),
	check("dealership").exists().notEmpty().isInt(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("employeeIdOrName").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
