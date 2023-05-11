const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("hour").exists().notEmpty().isTime(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("scheduleIdOrHour").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
