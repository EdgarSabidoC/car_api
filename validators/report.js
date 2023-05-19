const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createReportValidator = [
	check("month").exists().notEmpty().isInt(),
	check("year").exists().notEmpty().isInt(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createReportValidator };
