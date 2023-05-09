const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;

const createItemValidator = [
	check("name").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("colorIdOrName").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
